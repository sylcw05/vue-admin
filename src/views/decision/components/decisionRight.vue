<template>
    <div class="container-decision-right">
        <div class="box-decision-right">
            <div class="icon-left-big"></div>
            <div class="icon-right-big"></div>
            <Maps ref="map" :prePoint="prePoint" :prePointAddress="prePointAddress" :drivingInfo="drivingInfo" :prePointIds="prePointIds"></Maps>
            <decision-info v-if="!showItemInfo" @toItem="toItem($event)"></decision-info>
            <decision-item-info v-if="showItemInfo" :userCarInfo="userCarInfo" @backIndex="backIndex($event)"></decision-item-info>
            <div class="icon-bigger"></div>
        </div>
    </div>
</template>
<script>
import Maps from './map/index'
import DecisionInfo from './decisionInfo'
import DecisionItemInfo from './decisionItemInfo'

export default {
  data() {
    return {
      escortType: {
        value: '正在押运行程',
        show: true,
        options: [
          { value: '正在押运行程', alert: '正在押运行程' },
          { value: '历史押运行程', alert: '历史押运行程' }
        ]
      },
      province: {
        value: '广东省',
        show: true,
        options: []
      },
      city: {
        value: '',
        show: true,
        options: []
      },
      area: {
        value: '',
        show: true,
        options: []
      },
      car: {
        value: '',
        options: []
      },
      showItemInfo: false, // 显示详情
      userCarInfo: {}, // 用户车辆信息
      prePoint: [], // 获取实时完成轨迹点
      prePointAddress: [], // 获取实时完成轨迹点信息
      prePointIds: {}, // id的位置
      drivingInfo: [] // 预设轨迹起终点
    }
  },
  components: {
    Maps, DecisionInfo, DecisionItemInfo
  },
  mounted() {
  },
  methods: {
    async toItem(msg) { // 显示详情
      if (msg.showItemInfo) { // 单条轨迹
        const index = 0
        this.prePointIds[msg.carId] = 0
        this.getDecisionRouteInfo(msg.carId, index)
        this.getDecisionRoute(msg.carId, index, 0)
      } else { // 多条轨迹
        for (let i = 0; i < msg.carIds.length; i++) {
          const element = msg.carIds[i]
          const index = i
          this.prePointIds[element.id] = index
          await this.getDecisionRouteInfo(element.id, index)
          await this.getDecisionRoute(element.id, index, (msg.carIds.length - 1))
        }
      }
      this.showItemInfo = msg.showItemInfo
    },
    backIndex(msg) { // 返回首页
      this.showItemInfo = msg.showItemInfo
      this.prePointIds = {}
      this.$refs.map.stopListener()
    },
    async getDecisionRoute(sjysrwxxId, index, lengths) { // 获取轨迹点
      await this.$store.dispatch('GetDecisionRoute', sjysrwxxId).then(result => {
        this.prePoint[index] = {
          name: sjysrwxxId,
          path: []
        }
        this.prePointAddress[index] = {
          info: []
        }
        result.data.forEach(element => {
          const item = [element.jd, element.wd]
          this.prePoint[index].path.push(item)
          this.prePointAddress[index].info.push(element)
        })
        console.log(index)
        console.log(lengths)
        if (index === lengths) {
          console.log('xxx')
          this.$refs.map.renderRoute()
          this.$refs.map.sendMessage()
        }
      })
    },
    async getDecisionRouteInfo(id, index) { // 获取轨迹人员车辆信息
      await this.$store.dispatch('GetDecisionRouteInfo', id).then(result => {
        this.userCarInfo = result.data
        const info = { id: id, info: [{ keyword: result.data.routePogrammeEntityList[0].coordinatesList[0].address }, { keyword: result.data.routePogrammeEntityList[0].coordinatesList[1].address }] }
        this.drivingInfo[index] = info
      })
    }
  }
}
</script>
<style lang="scss">
.container-decision-right{
    box-sizing: border-box;
    height: 100%;
    flex:1;
    padding: 15px 0 13px 16px;
}
.box-decision-right{
    border: solid 2px #053663;
    height: 100%;
    box-sizing: border-box;
    position: relative;
}
.icon-left-big:before, .icon-left-big:after,.icon-right-big:before, .icon-right-big:after{
    content: '';
    width: 18px;
    height: 18px;
    position: absolute;
}
.icon-left-big:before{
    left: -3px;
    top: -3px;
    background: url(../../../assets/img/letfTop.png) no-repeat;
    background-size: 100% 100%;
}
.icon-left-big:after{
    left: -3px;
    bottom: -3px;
    background: url(../../../assets/img/bottomLeft.png) no-repeat;
    background-size: 100% 100%;
}
.icon-right-big:before{
    right: -3px;
    top: -3px;
    background: url(../../../assets/img/rightTop.png) no-repeat;
    background-size: 100% 100%;
}
.icon-right-big:after{
    right: -3px;
    bottom: -3px;
    background: url(../../../assets/img/bottomRightBig.png) no-repeat;
    background-size: 100% 100%;
}
.icon-bigger{
  width: 58px;
  height: 40px;
  background: url(../../../assets/img/allInfo.png) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>

