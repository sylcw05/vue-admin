<template>
    <div class="container-decision-info">
        <div class="item-info">
            <span class="icon-cicle"></span>
            <span>今天正在押运数量：</span>
            <span class="item-num">52</span>
        </div>
        <div class="item-info">
            <span class="icon-cicle"></span>
            <span>今日已完成规划数量：</span>
            <span class="item-num">12</span>
        </div>
        <div class="item-info">
            <span class="icon-cicle"></span>
            <span>本次考试已完成押运规划总数 ：</span>
            <span class="item-num">108</span>
        </div>
        <div class="item-info">
            <span>预警信息：</span>
            <el-select v-model="warning.value" placeholder="请选择">
                <el-option
                v-for="item in warning.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      warning: {
        value: '异常消息1',
        index: 0,
        options: [
          { value: '异常消息1', lable: '异常1' },
          { value: '异常消息2', lable: '异常2' },
          { value: '异常消息3', lable: '异常3' },
          { value: '异常消息4', lable: '异常4' }
        ]
      }
    }
  },
  mounted() {
    this.changeWarning()
  },
  methods: {
    changeWarning() {
      setInterval(() => {
        if (this.warning.index === this.warning.options.length) {
          this.warning.index = 0
        }
        this.warning.value = this.warning.options[this.warning.index].value
        this.warning.index++
      }, 2000)
    }
  }
}
</script>
<style lang="scss">
@import '../../../styles/variables.scss';
.container-decision-info{
    position:absolute;
    top: 80px;
    left: 30px;
    right: 30px;
    background: #fff;
    border-radius: 5px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    height: 58px;
    padding-left: 30px;
    padding-right: 70px;
    align-items: center;
    font-size: 16px;
    color: #666;
    flex-wrap: nowrap;
}
.item-info{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
}
.icon-cicle{
    display: inline-block;
    width: 11px;
    height: 11px;
    background: $indexColor;
    border-radius: 50%;
    margin-right: 13px;
}
.item-num{
    font-size: 30px;
    color: $indexColor;
}
</style>
