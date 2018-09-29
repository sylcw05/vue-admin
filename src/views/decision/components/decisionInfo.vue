<template>
    <div class="container-decision-info">
        <div class="decision-info-search">
            <div class="search-exam">
                <span class="search-exam-lable">考试计划</span>
                <el-select v-model="exam.value" placeholder="请选择考试场次" class="select-exam">
                    <el-option
                    v-for="item in exam.options"
                    :key="item.kslb"
                    :label="item.kslb"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="search-city">
                <choose-city :escortType="escortType" :province="province" :city="city" :area="area" :car="car" @changeId="changeId($event)" @toSearch="toSearch"></choose-city>
            </div>
        </div>
        <div class="decision-info-warning">
            <span class="decision-warning-title">预警信息：</span>
            <el-select v-model="warning.value" placeholder="" class="decision-select-warning">
                <el-option
                v-for="item in warning.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="decision-info-count">
            <div class="item-info">
                <div class="item-info-title">今天正在押运数量(个)</div>
                <div class="item-num">52</div>
            </div>
            <div class="item-info">
                <div class="item-info-title">今日已完成规划数量(个)</div>
                <div class="item-num">12</div>
            </div>
            <div class="item-info">
                <div class="item-info-title">本次考试已完成押运规划总数(个)</div>
                <div class="item-num">108</div>
            </div>
        </div>
    </div>
</template>
<script>
import ChooseCity from './chooseCity'

export default {
  data() {
    return {
      exam: { // 考试类别
        value: '',
        options: []
      },
      warning: {
        value: '异常消息1',
        index: 0,
        options: [
          { value: '异常消息1', lable: '异常1' },
          { value: '异常消息2', lable: '异常2' },
          { value: '异常消息3', lable: '异常3' },
          { value: '异常消息4', lable: '异常4' }
        ]
      },
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
    ChooseCity
  },
  mounted() {
    this.getExamList()
    this.changeWarning()
    this.getCity()
  },
  methods: {
    getExamList() { // 获取考试列表数据
      this.$store.dispatch('GetExamList').then(result => {
        this.exam.value = result.data.list[0].id
        this.exam.options = result.data.list
      })
    },
    changeWarning() { // 预警轮播
      setInterval(() => {
        if (this.warning.index === this.warning.options.length) {
          this.warning.index = 0
        }
        this.warning.value = this.warning.options[this.warning.index].value
        this.warning.index++
      }, 2000)
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
          this.car.value = ''
          this.car.options = []
          break
        case '3': { // 获取相关车辆
          const info = {
            ksjhId: this.exam.value,
            areaNumber: this.area.value.addressCode
          }
          this.getAboutCar(info, false)
          break
        }
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
    getAboutCar(info, toItem) { // 获取相关车辆
      this.$store.dispatch('GetCar', info).then(result => {
        this.car.value = ''
        this.car.options = result.data
        console.log(toItem)
        if (toItem) {
          const carInfo = {
            carIds: result.data,
            showItemInfo: false
          }
          this.$emit('toItem', carInfo)
        }
      })
    },
    toSearch() { // 查询
      if (this.car.value !== '') {
        const info = {
          carId: this.car.value,
          showItemInfo: true
        }
        this.$emit('toItem', info)
      } else if (this.area.value !== '') {
        const info = {
          ksjhId: this.exam.value,
          areaNumber: this.area.value.addressCode
        }
        this.getAboutCar(info, true)
        /* const info = {
          carIds: this.area.value,
          showItemInfo: false
        }
        this.$emit('toItem', info) */
      } else if (this.city.value !== '') {
        const info = {
          ksjhId: this.exam.value,
          areaNumber: this.city.value.addressCode
        }
        this.getAboutCar(info, true)
      } /* else if (this.province.value !== '') {
      } */
    }
  }
}
</script>
<style lang="scss">
.container-decision-info{
    position: absolute;
    top: 32px;
    left: 20px;
}
.search-exam{
    display: flex;
    font-size: 14px;
}
.search-exam-lable{
    width: 100px;
    line-height: 37px;
    background: #157cac;
    color: #fff;
    display: inline-block;
    text-align: center;
    border-radius: 3px 0 0 3px;
}
.select-exam input{
    border: solid 2px #157cac;
    border-radius: 0 3px 3px 0;
    background: none;
    color: #fff;
    box-sizing: content-box;
    width: 150px;
}
.decision-info-search{
    display: flex;
    align-items: center;
}
.search-city{
    border-radius: 30px;
    margin-left: 20px;
}
.decision-info-warning{
    color: #fff;
    margin-top: 30px;
}
.decision-warning-title{
    display: block;
    position: relative;
    padding-left: 17px;
    margin-bottom: 20px;
}
.decision-warning-title::before{
    content: "";
    width: 4px;
    height: 16px;
    background: #157cac;
    position: absolute;
    left: 0;
}
.decision-select-warning{
    width: 300px;
    height: 36px;
    position: relative;
    margin-bottom: 17px;
}
.decision-select-warning::before{
    width: 18px;
    height: 18px;
    content: "";
    background: url(../../../assets/img/warning.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 10px;
    top: 8px;
}
.decision-select-warning input{
    background: none;
    color: #fff;
    padding-left: 40px;
}
.decision-info-count{
    font-family: 微软雅黑;
}
.item-info-title{
    color: #3fd1ff;
    font-size: 18px;
    position: relative;
}
.item-info-title::after{
    content: "";
    background: linear-gradient(to right, rgba(63,209,255,0.6) , rgba(63,209,255,0.1));
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 255px;
    height: 2px;
}
.item-num{
    margin-top: 16px;
    margin-bottom: 20px;
    color: #19d9c4;
    font-size: 32px;
    line-height: 36px;
    width: 255px;
    padding-left: 24px;
    box-sizing: border-box;
    background: linear-gradient(to right, rgba(63,209,255,0.6) , rgba(63,209,255,0.1));
    font-family: Arial;
}
</style>
