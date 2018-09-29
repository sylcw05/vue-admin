<template>
    <div class="container">
        <div id="map" class="container-map"></div>
    </div>
</template>
<script>
import AMap from 'AMap'
import AV from 'AV'
import AMapUI from 'AMapUI'
import org from 'org'
export default {
  data() {
    return {
      push: '',
      driving: [
      ],
      drivingInfo: [
        { id: '5b2c6f029f5454003aaf4810', info: [{ keyword: '河源市源城区宝源西路52号靠近河源市源城区宝源学校(大世纪威尼斯花园南)', city: '河源市' }, { keyword: '河源市源城区公园东路靠近中国邮政储蓄银行(河源市分行)', city: '河源市' }] },
        { id: '5b2cba997f6fd3003528204e', info: [{ keyword: '河源市源城区文明西路55号靠近河源市房地产管理局', city: '河源市' }, { keyword: '河源市源城区教育局', city: '河源市' }] }
      ],
      map: '',
      points: [], // 巡航器中的点
      prePoint: [], // 已存在点数组
      endIdx: [],
      navg: {},
      keys: []
    }
  },
  mounted() {
    this.loadMap()
  },
  methods: {
    loadMap() {
      this.renderMap()
      this.renderRoute()
      this.sendMessage()
    },
    sendMessage() { // 推送消息
      var amq = org.activemq.Amq
      amq.init({
        uri: 'tcp://192.168.1.226:61616',
        logging: true,
        timeout: 20,
        clientId: '123'
        // clientId:(new Date()).getTime().toString()
      })
      var myHandler = {
        rcvMessage: function(message) {
          console.log(message.data)
          console.log(message.nodeValue)
          console.log(message.wholeText)
        }
      }
      amq.addListener('topic_js', 'topic://topic_js2', myHandler.rcvMessage)
    },
    renderMap() { // 绘制地图
      AV.initialize('wuIJIWJ4xANz1YL3132N1Ndc-gzGzoHsz', 'BdX7PHze5TalmUdhotUuzsPG')
      this.map = new AMap.Map('map', {
        resizeEnable: true,
        mapStyle: 'amap://styles/darkblue'
      })
    },
    renderRoute() { // 绘制预定轨迹
      const promise = new Promise(resolve => {
        for (let i = 0; i < this.drivingInfo.length; i++) {
          this.driving[i] = {}
          this.driving[i].address = new AMap.Driving({
            map: this.map
          })
          this.driving[i].id = this.drivingInfo[i].id
          this.driving[i].drivingInfo = this.drivingInfo[i]
          // 根据起终点名称规划驾车导航路线
          this.driving[i].address.search(this.driving[i].drivingInfo.info, function(status, result) {
          })
          const query = new AV.Query('EscortRecord')
          query.equalTo('escorterId', this.drivingInfo[i].id)
          query.find().then(result => {
            result.forEach((element, index) => {
              if (index === 0) {
                this.driving[i].point = {
                  name: this.driving[i].drivingInfo.id,
                  path: []
                }
                this.prePoint[i] = {
                  name: this.driving[i].drivingInfo.id,
                  path: []
                }
              }
              if (index > 30) {
                this.driving[i].point.path.push(element.attributes.position)
              } else {
                this.prePoint[i].path.push(element.attributes.position)
              }
            })
            this.points[i] = this.prePoint[i]
          }).then(() => {
            this.endIdx[i] = this.points[i].path.length - 10
            resolve()
          })
        }
      })

      promise.then(result => {
        this.renderNavg()
      }).catch(err => {
        console.log(err)
      })
    },
    renderNavg() { // 绘制巡航器
      const that = this
      AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }
        var pathSimplifierIns = new PathSimplifier({
          zIndex: 200,
          autoSetFitView: false,
          map: that.map, // 所属的地图实例

          getPath: function(pathData, pathIndex) {
            return pathData.path
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
            }

            return pathData.name + '，点数量' + pathData.path.length
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
          }
        })

        window.pathSimplifierIns = pathSimplifierIns
        pathSimplifierIns.setData(that.points)

        // 对第一条线路（即索引 0）创建一个巡航器
        /* for (let i = 0; i < that.points.length; i++) {
          that.navg[that.points[i].name] = pathSimplifierIns.createPathNavigator(i, {
            loop: false, // 循环播放
            speed: 100 // 巡航速度，单位千米/小时
          })
          that.keys.push(that.points[i].name)
          that.navg[that.points[i].name].start()
        } */

        function expandPath(navg1, n) {
          function doExpand(navg1, n) {
            that.endIdx[n]++
            if (that.endIdx[n] >= that.points[n].path.length) {
              return false
            }

            /* const cursor = navg1.getCursor().clone() // 保存巡航器的位置
            const status = navg1.getNaviStatus() */

            that.points[0].path = that.prePoint[n].path.slice(0, that.endIdx[n] + 1)
            pathSimplifierIns.setData(that.points) // 延展路径

            // 重新建立一个巡航器
            /* navg1 = pathSimplifierIns.createPathNavigator(n, {
              // loop: true, //循环播放
              speed: 600 // 巡航速度，单位千米/小时
            })

            if (status !== 'stop') {
              navg1.start()
            }

            // 恢复巡航器的位置
            if (cursor.idx >= 0) {
              navg1.moveToPoint(cursor.idx, cursor.tail)
            } */

            return true
          }

          doExpand(navg1, n)
          /* if (doExpand(navg1, n)) {
            setTimeout(expandPath, 5000, navg1, n)
          } */
        }

        /* for (let i = 0; i < that.keys.length; i++) {
          const n = that.keys[i]
          expandPath(that.navg[n], i)
        } */
        var num = 0

        setInterval(function() {
          if (num >= that.driving[0].point.length && num >= that.driving[1].point.length) {
            return false
          }
          if (num <= that.driving[0].point.path.length) {
            that.points[0].path.push(that.driving[0].point.path[num])
            expandPath(that.navg[that.points[0].name], 0)
          }
          /* if (num <= that.driving[1].point.path.length) {
            that.points[1].path.push(that.driving[1].point.path[num])
            expandPath(that.navg[that.points[1].name], 1)
          } */
          num++
        }, 1000)
      })
    },
    getPush() { // 推送
      this.push = AV.push({
        appId: 'wuIJIWJ4xANz1YL3132N1Ndc-gzGzoHsz',
        appKey: 'BdX7PHze5TalmUdhotUuzsPG'
      })
      this.push.open(function() { // 关注公共频道
        console.log('push is now working')
      }).subscribe(['location', 'live', 'adminLive'], function(data) {
        console.log('成功监听三个频道')
      })
      this.push.on('reuse', function() { // 监听网络异常
        console.log('异常')
      })
      this.push.on('message', function(data) { // 监听消息
        console.log(data)
      })
    }
  }
}
</script>
<style lang="scss">
.container{
    width: 100%;
    height: 100%;
}
.container-map{
    width: 100%;
    height: 100%;
}
</style>

