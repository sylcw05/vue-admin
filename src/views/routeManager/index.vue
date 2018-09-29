<template>
    <div class="content-manager">
      <table-list :loading="loading" :tableList="routeTableList" :tableNameList="tableNameList" :btnList="btnList"></table-list>
      <route-table :tableList="centerTableList" @delCenter="delCenter($event)" @checkCenter="checkCenter($event)"></route-table>
      <div class="route-tag-box">
        <el-tag
          :key="tag"
          v-for="tag in centerList"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag" 
          id="tipinput" 
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
        <el-button type="primary" size="small" @click="addRoute">行程规划确认</el-button>
      </div>
      <maps ref="map" class="container-map" :centerListCount="centerListCount" :centerPathList="centerPathList" @changeCenter="changeCenter($event)"></maps>
    </div>
</template>
<script>
import TableList from '@/components/TableList/index'
import AMap from 'AMap'
import Maps from './map'
import { Message } from 'element-ui'
import RouteTable from './routeTable'
export default {
  data() {
    return {
      loading: false,
      centerTableList: [], // 中间点表
      routeTableList: [],
      tableNameList: [
        { id: 'xm', name: '姓名' },
        { id: 'xb', name: '性别' },
        { id: 'lxdh', name: '联系电话' },
        { id: 'adminArea', name: '所属单位' },
        { id: 'rwkssj', name: '押运日期' },
        { id: 'timeSlot', name: '押运时间段' },
        { id: 'cfddz', name: '行程起始地址' },
        { id: 'mdddz', name: '行程目的地址' },
        { id: 'cph', name: '车牌号' },
        { id: 'cx', name: '车型' },
        { id: 'carNumber', name: '车辆编号' }
      ],
      centerList: [
      ],
      centerPathList: [
      ],
      btnList: {
        edit: false,
        plan: false
      },
      type: 'add', // 修改或添加
      editInfo: {}, // 修改行程信息
      centerListCount: 0,
      inputVisible: '', // 显示中间点添加
      inputValue: '',
      firstPoint: [], // 起点
      endPoint: [] // 终点
    }
  },
  components: {
    TableList, Maps, RouteTable
  },
  mounted() {
    this.setPoint()
    this.getRouteInfo()
  },
  methods: {
    setPoint() { // 设置起始坐标点
      this.centerList = []
      this.centerPathList = []
      this.routeTableList = []
      if (this.$route.params.info) {
        this.routeTableList.push(this.$route.params.info)
        this.geocoder = new AMap.Geocoder({
          radius: 1000 // 范围，默认：500
        })
        const that = this
        const firstPoint = {
          address: this.$route.params.info.cfddz,
          callback: (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              that.centerPathList[0] = result.geocodes[0].location
              that.firstPoint = result.geocodes[0].location
              that.centerListCount++
            } else {
              Message({
                message: '请输入详细地址',
                type: 'warning'
              })
            }
          }
        }
        const endPoint = {
          address: this.$route.params.info.mdddz,
          callback: (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              that.centerPathList[1] = result.geocodes[0].location
              that.endPoint = result.geocodes[0].location
              that.centerListCount++
            } else {
              Message({
                message: '请输入详细地址',
                type: 'warning'
              })
            }
          }
        }
        this.addressToPoint(firstPoint.address, firstPoint.callback)
        this.addressToPoint(endPoint.address, endPoint.callback)
      } else {
        this.$router.push({ 'name': 'sjgzryclbp' })
      }
    },
    getRouteInfo() { // 获取流程中间点
      const info = {
        id: this.routeTableList[0].id
      }
      this.$store.dispatch('GetRouteInfo', info).then(result => {
        this.centerTableList = []
        result.data.forEach(element => {
          const address = []
          const point = []
          element.coordinatesList.forEach(item => {
            address.push(item.address)
            point.push([item.jd, item.wd])
          })
          const info = {
            id: element.id,
            address: address.join('----'),
            point: point,
            mark: element.mark
          }
          this.centerTableList.push(info)
        })
      })
    },
    handleClose(tag) { // 取消中间点
      this.centerPathList.splice((this.centerList.indexOf(tag) + 1), 1)
      this.centerList.splice(this.centerList.indexOf(tag), 1)
      this.centerListCount--
    },
    showInput() { // 显示输入框
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() { // 提交
      const inputValue = this.inputValue
      if (inputValue === '') {
        return
      }
      const that = this
      const callback = function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          that.centerList.push(inputValue)
          that.centerPathList.splice(-1, 0, result.geocodes[0].location)
          that.inputVisible = false
          that.inputValue = ''
          that.centerListCount++
        } else {
          Message({
            message: '请输入详细地址',
            type: 'warning'
          })
        }
      }
      this.addressToPoint(inputValue, callback)
    },
    addressToPoint(address, callback) { // 地址转经纬度
      this.geocoder.getLocation(address, callback)
    },
    changeCenter(msg) { // 拖拽修改中间点
      this.centerPathList.splice(1, (this.centerPathList.length - 2))
      msg.unshift(1, 0) // 1 0 c
      Array.prototype.splice.apply(this.centerPathList, msg)
      const that = this
      that.centerList = []
      this.centerPathList.forEach((element, index) => {
        if (index > 0 && index < (this.centerPathList.length - 1)) {
          this.geocoder.getAddress(element, function(status, result) {
            console.log(result.regeocode.formattedAddress)
            if (status === 'complete' && result.info === 'OK') {
              that.centerList.push(result.regeocode.formattedAddress)
            }
          })
        }
      })
    },
    addRoute() { // 确认行程中间点
      const centerList = [this.routeTableList[0].cfddz, this.routeTableList[0].mdddz]
      this.centerList.unshift(1, 0)
      Array.prototype.splice.apply(centerList, this.centerList)
      const coordinatesList = []
      for (let i = 0; i < centerList.length; i++) {
        const info = {
          jd: this.centerPathList[i].lng,
          wd: this.centerPathList[i].lat,
          address: centerList[i]
        }
        coordinatesList.push(info)
      }
      const route = {
        routeStatus: 0,
        sjysrwxx_id: this.routeTableList[0].id,
        coordinatesList: coordinatesList
      }
      if (this.type === 'add') {
        const routePogrammeEntity = {
          routePogrammeEntity: JSON.stringify(route)
        }
        this.$store.dispatch('AddRoute', routePogrammeEntity).then(result => {
          Message({
            message: result.message,
            type: 'success'
          })
          this.setPoint()
          this.getRouteInfo()
        })
      } else {
        route.id = this.editInfo.id
        if (this.editInfo.mark === '1') {
          route.mark = this.editInfo.mark
        }
        const routePogrammeEntity = {
          routePogrammeEntity: JSON.stringify(route)
        }
        this.$store.dispatch('UpdateRoute', routePogrammeEntity).then(result => {
          Message({
            message: result.message,
            type: 'success'
          })
          this.setPoint()
          this.getRouteInfo()
          this.type = 'add'
        })
      }
    },
    delCenter(msg) { // 删除中间点
      const info = {
        ids: msg.id
      }
      this.$store.dispatch('DelCenter', info).then(result => {
        Message({
          message: result.message,
          type: 'success'
        })
        this.getRouteInfo()
      })
    },
    checkCenter(msg) { // 查看中间点
      this.editInfo = msg.row
      this.type = 'edit'
      if (msg.row.point[0][0] === 0 && msg.row.point[0][1] === 0) { // 第一次默认轨迹
        this.centerPathList = []
        this.centerPathList.push(this.firstPoint)
        this.centerPathList.push(this.endPoint)
      } else {
        this.centerPathList = msg.row.point
      }
      if (this.centerListCount === msg.$index) {
        this.centerListCount = -1
      } else {
        this.centerListCount = msg.$index
      }
    }
  }
}
</script>
<style lang="scss">
.container-map{
    width: 100%;
    height: 550px;
    margin-top: 10px;
}
.route-tag-box{
    margin: 10px 0;
}
.el-input{
    width: auto;
    margin-right: 5px;
}
.el-badge__content.is-fixed{
  top: 8px;
}
.item{
  overflow: initial !important;
}
</style>
