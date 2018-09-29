<template>
  <div class="layout-decision">
    <div class="heading-decision" id="header">
      <top :userName="userName"></top>
    </div>
    <div class="container-decision" id="container">
      <decision-left></decision-left>
      <decision-right></decision-right>
    </div>
  </div>
</template>
<script>
import Top from './components/top'
import DecisionLeft from './components/decisionLeft'
import DecisionRight from './components/decisionRight'

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
    Top, DecisionLeft, DecisionRight
  },
  mounted() {
    this.renderLayout()
    this.getUserInfo()
  },
  methods: {
    renderLayout() { // 设置container高度
      const _height = document.body.clientHeight - document.getElementById('header').clientHeight
      document.getElementById('container').style.height = _height + 'px'
    },
    getUserInfo() { // 获取用户信息
      this.userName = this.$store.state.user.name
    }
  }
}
</script>
<style lang="scss">
@import 'index.scss';
</style>

