<template>
    <div class="container-left">
        <div class="item-left">
            <div class="item-left-box">
                <div class="icon-left"></div>
                <div class="icon-right"></div>
                <div class="chart-tile">各地区试卷押运进度</div>
                <div class="chart-box">
                    <IEcharts :option="pieOption" style="width: 100%;height:100%;">
                    </IEcharts>
                </div>
            </div>
        </div>
        <div class="item-left">
            <div class="icon-left"></div>
            <div class="icon-right"></div>
            <div class="item-left-box">
                <div class="chart-tile">各城市试卷流转进度</div>
                <div class="chart-box">
                  <IEcharts :option="barOption" style="width: 100%;height:100%;">
                  </IEcharts>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  data() {
    return {

    }
  },
  mounted() {
    console.log(document.getElementsByClassName('chart-box')[0].offsetHeight)
  },
  components: {
    IEcharts
  },
  computed: {
    pieOption() { // 圆饼图表
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['未开始押运的地市', '已押运到保密室的地市', '正在押运的地市'],
          textStyle: {
            color: '#fff'
          }
        },
        toolbox: {
          show: false
        },
        calculable: true,
        series: [
          {
            name: '押运进度',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data: [
              { value: 335, name: '未开始押运的地市' },
              { value: 310, name: '已押运到保密室的地市' },
              { value: 234, name: '正在押运的地市' }
            ]
          }
        ],
        color: ['#2f60e0', '#a429e5', '#f20e14']
      }
    },
    barOption() { // 柱状图表
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['已押运', '未押运']
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
        ],
        color: ['#008aff', '#21213f'],
        textStyle: {
          color: '#fff'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.container-left {
    width: 468px;
    height: 100%;
    padding-top: 16px;
    box-sizing: border-box;
}
.item-left {
    height: 50%;
    box-sizing: border-box;
    padding-bottom: 10px;
    position: relative;
}
.item-left-box{
    border: solid 2px #053663;
    height: 100%;
    box-sizing: border-box;
    padding: 14px 20px;
}
.icon-left:before, .icon-left:after,.icon-right:before, .icon-right:after{
    content: '';
    width: 18px;
    height: 18px;
    position: absolute;
}
.icon-left:before{
    left: -2px;
    top: -2px;
    background: url(../../../assets/img/letfTop.png) no-repeat;
    background-size: 100% 100%;
}
.icon-left:after{
    left: -2px;
    bottom: 9px;
    background: url(../../../assets/img/bottomLeft.png) no-repeat;
    background-size: 100% 100%;
}
.icon-right:before{
    right: -1px;
    top: -2px;
    background: url(../../../assets/img/rightTop.png) no-repeat;
    background-size: 100% 100%;
}
.icon-right:after{
    width: 30px;
    height: 30px;   
    right: -1px;
    bottom: 9px;
    background: url(../../../assets/img/bottomRight.png) no-repeat;
    background-size: 100% 100%;
}
.chart-tile{
    width: 190px;
    line-height: 45px;
    text-align: center;
    background: url(../../../assets/img/bgChartTitle.png) no-repeat;
    background-size: 100% 100%;
    color: #fff;
    position: relative;
    font-size: 18px;
    font-family: 宋体;
}
.chart-tile::before{
    content: "";
    width: 5px;
    height: 18px;
    background: #719af5;
    position: absolute;
    left: 6px;
    top: 12px;
    border-radius: 10px;
}
.chart-box{
  height: 350px;
  overflow: hidden;
}
</style>
