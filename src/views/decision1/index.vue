<template>
    <div class="layout-decision">
        <div class="decision-container">
            <div class="decision-container-left">
                <div class="decision-container-left-title">
                    <span class="icon-logo"></span>
                    <span class="decision-title">试卷跟踪系统</span>
                </div>
                <div class="decision-container-left-top">
                    <!-- <div class="chart-tile">各地区试卷押运进度</div> -->
                    <div class="chart-box">

                        <IEcharts :options="pieOption" style="width: 100%;height:100%;">
                        </IEcharts>
                    </div>
                </div>
                <div class="decision-container-left-bottom">
                    <!-- <div class="chart-bar-tile">各城市试卷流转进度</div> -->
                    <div class="chart-box">

                    </div>
                </div>
            </div>
            <div class="decision-container-right">
                <right-top :userName="userName"></right-top>
                <decision-info></decision-info>
                <choose-city :escortType="escortType" :province="province" :city="city" :area="area" :car="car" @changeId="changeId($event)" @toSearch="toSearch"></choose-city>
                <maps></maps>
            </div>
        </div>
    </div>
</template>
<script>
import Maps from '../map/index'
import RightTop from './components/rightTop'
import DecisionInfo from './components/decisionInfo'
import ChooseCity from './components/chooseCity'
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  data() {
    return {
      id: '',
      userName: '',
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
      }
    }
  },
  components: {
    Maps, RightTop, DecisionInfo, ChooseCity, IEcharts
  },
  mounted() {
    this.getUserInfo()
  },
  computed: {
    pieOption() { // 圆饼图表
      return {
        title: {
          text: '各地市试卷押运进度',
          x: 'center',
          y: 'bottom'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['未开始押运的地市', '已押运到保密室的地市', '正在押运的地市']
        },
        toolbox: {
          show: false
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '未开始押运的地市' },
              { value: 310, name: '已押运到保密室的地市' },
              { value: 234, name: '正在押运的地市' }
            ]
          }
        ]
      }
    },
    barOption() { // 柱状图表
      return {
        title: {
          text: '各地市试卷流转进度',
          x: 'center',
          y: 'bottom'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          show: false
        },
        calculable: true,
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['广州', '深圳', '惠州', '河源', '潮州', '汕头', '汕尾']
          }
        ],
        series: [
          {
            name: '已押运',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: true, position: 'insideRight' }}},
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '未押运',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: true, position: 'insideRight' }}},
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      }
    }
  },
  methods: {
    renderLayout() {
    },
    getUserInfo() { // 获取用户信息
      this.userName = this.$store.state.user.name
      this.getCity()
    },
    async getCity() { // 获取区域
      await this.getAboutCity('', this.getFirst)
      await this.getAboutCity(this.id, this.addAddress)
    },
    getFirst(that, result) { // 第一次进去获取ID
      that.id = result.data[0].id
    },
    addAddress(that, result) { // 第一次获取相关地址
      const options = result.data
      const department = this.$store.state.user.department
      const dpType = department.dpType
      switch (dpType) {
        case '1':
          this.province.value = department.addressName
          this.city.options = options
          break
        case '2':
          this.province.show = false
          this.city.value = department.addressName
          this.area.options = options
          break
        case '3':
          this.province.show = false
          this.city.show = false
          this.area.value = department.addressName
          break
      }
    },
    changeId(msg) { // 下拉列表修改
      this.dpType = msg.type
      this.id = msg.id
      this.getAboutCity(this.id, this.changeAddress)
    },
    changeAddress(that, result) { // 修改获取相关下拉列表
      const options = result.data
      switch (this.dpType) {
        case '1':
          this.city.value = ''
          this.city.options = options
          break
        case '2':
          this.area.value = ''
          this.area.options = options
          break
        case '3':
          break
      }
    },
    async getAboutCity(id, callback) { // 获取相关地区的下拉列表action
      const that = this
      const info = {
        id: id
      }
      await this.$store.dispatch('GetCity', info).then(result => {
        callback(that, result)
      }).catch(err => {
        console.log(err)
      })
    },
    toSearch() { // 查询
      console.log(this.province.value)
      console.log(this.city.value)
      console.log(this.area.value)
    }
  }
}
</script>
<style lang="scss">
@import '../../styles/variables.scss';
@import 'index.scss';
</style>

