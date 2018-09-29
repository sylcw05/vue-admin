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
      map: '',
      points: [], // 巡航器中的点
      endIdx: [],
      navg: {},
      keys: [],
      amq: ''
    }
  },
  props: {
    prePoint: Array,
    drivingInfo: Array,
    prePointAddress: Array,
    prePointIds: Object
  },
  mounted() {
    this.loadMap()
  },
  methods: {
    loadMap() {
      this.renderMap()
    },
    sendMessage() { // 推送消息
      const that = this
      this.amq = org.activemq.Amq
      this.amq.init({
        uri: '/sjgzxt/amq',
        logging: true,
        timeout: 20
        // clientId:(new Date()).getTime().toString()
      })
      var myHandler = {
        rcvMessage: function(message) {
          const info = JSON.parse(message.textContent)
          if (that.prePointIds[info.sjysrwxx_id] !== undefined) {
            const point = [info.jd, info.wd]
            that.prePoint[that.prePointIds[info.sjysrwxx_id]].path.push(point)
            window.pathSimplifierIns.setData(that.prePoint)
          }
        }
      }
      this.amq.addListener('realTimeTopic', 'topic://realTimeTopic', myHandler.rcvMessage)
    },
    stopListener() {
      this.amq.removeListener('realTimeTopic', 'topic://realTimeTopic')
      window.pathSimplifierIns.setData()
      this.driving.forEach(element => {
        element.address.clear()
      })
    },
    renderMap() { // 绘制地图
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
          this.driving[i].address.search(this.drivingInfo[i].info, function(status, result) {
          })
          if (i === this.drivingInfo.length - 1) {
            resolve()
          }
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
      const colors = ['#CC33CC', '#6699FF']
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
              return that.prePointAddress[pathIndex].info[pointIndex].street + '</br>' + that.prePointAddress[pathIndex].info[pointIndex].recordTime
            }
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
          },
          getPathStyle: function(pathItem, zoom) {
            const color = colors[pathItem.pathIndex % colors.length] // 依次取颜色
            const lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3)) // 线宽随zoom增大
            return {
              pathLineStyle: {
                strokeStyle: color,
                lineWidth: lineWidth
              }
            }
          }
        })

        window.pathSimplifierIns = pathSimplifierIns
        pathSimplifierIns.setData(that.prePoint)
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

