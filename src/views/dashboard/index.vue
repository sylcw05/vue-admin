<template>
  <div class="dashboard-container">
    <div class="dashboard-menu">
      <template v-for="item in menuList">
        <fast-menu :item="item" :key="item.name"></fast-menu>
      </template>
        
    </div>
    <db-header :attr="attr">
        <div class="content">
             <div class="left">
                   <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>当前考试计划</span>
                      <el-button style="float: right; padding: 3px 0" type="text">查看全部</el-button>
                    </div>
                    <div class="exam-list">
                         <div class="exam-item">
                              <dl>
                                <dt>考试时间：</dt>
                                <dd>2018年10月20日-21日</dd>
                              </dl>
                              <dl>
                                <dt>考试类别：</dt>
                                <dd>高等教育自学考试</dd>
                              </dl>
                              <dl>
                                <dt>试卷跟踪开始时间：</dt>
                                <dd>2018年10月15日</dd>
                              </dl>
                              <dl>
                                <dt>试卷跟踪结束时间：</dt>
                                <dd>2018年10月26日</dd>
                              </dl>
                         </div>
                    </div>
                  </el-card>
             </div>
             <div class="right">
                  <div class="echarts">
                       <IEcharts :option="options" :style="{width: '100%', height: '300px'}"></IEcharts>
                  </div>
             </div>
        </div>
    </db-header>
    <db-header :attr="task">
        <div class="content">
              <el-carousel indicator-position="outside" height="500px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                    <table-charts :options="options" :tableNameList="tableNameList" :tableList="tableList"></table-charts>
                </el-carousel-item>
              </el-carousel>
        </div>
    </db-header>

    <div class="test">1</div>
  </div>
</template>
<script>
import FastMenu from './FastMenu'
import DbHeader from './components/header'
import TableCharts from './components/tablecharts'
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  name: 'dashboard',
  data() {
    return {
      menuList: [
        {
          title: '任务编排',
          name: 'abc',
          theme: {
            icon: 'bpgl',
            color: 'menu-yellow'
          }
        },
        {
          title: '试卷跟踪',
          name: 'abc',
          theme: {
            icon: 'sjyy',
            color: 'menu-green'
          }
        },
        {
          title: '综合统计',
          name: 'abc',
          theme: {
            icon: 'count',
            color: 'menu-blue'
          }
        }
      ],
      tableNameList: [
        {
          title: '所属单位',
          field: 'name'
        },
        {
          title: '押运人员数',
          field: 'peoples'
        },
        {
          title: '押运车辆数',
          field: 'cars'
        },
        {
          title: '任务规划数量',
          field: 'tasks'
        }
      ],
      tableList: [
        {
          name: '广州市招生办',
          peoples: '24',
          cars: '12',
          tasks: '12',
          plan: '323'
        },
        {
          name: '深圳市招生办',
          peoples: '24',
          cars: '12',
          tasks: '12',
          plan: '323'
        }
      ],
      attr: {
        theme: {
          icon: 'count',
          color: 'menu-green',
          class: 'medium',
          title: '当前考试押运任务上报情况'
        }
      },
      task: {
        theme: {
          icon: 'count',
          color: 'menu-green',
          class: 'medium',
          title: '各地市具体数据统计'
        }
      },
      options: {
        title: {
          text: '各地市押运任务上报情况',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['未上报', '已上报']
        },
        series: [
          {
            name: '数据统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '未上报' },
              { value: 310, name: '已上报' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}个  {per|{d}%}',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center',
                    backgroundColor: '#ebefef'
                  },
                  abg: {
                    backgroundColor: '#ebefef',
                    width: '100%',
                    align: 'right',
                    height: 22,
                    borderRadius: [4, 4, 0, 0]
                  },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#333',
                    backgroundColor: '#ebefef',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            }
          }
        ],
        color: ['#f52d2d', '#67c23a']
      }
    }
  },
  computed: {},
  components: {
    FastMenu,
    DbHeader,
    IEcharts,
    TableCharts
  },
  mounted() {
    this.tableList = [
      {
        name: '广州市招生办',
        peoples: '24',
        cars: '12',
        tasks: '12',
        plan: '323'
      },
      {
        name: '深圳市招生办',
        peoples: '24',
        cars: '12',
        tasks: '12',
        plan: '323'
      }
    ]
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-menu {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.content {
  padding: 10px 20px;
  .left {
    width: 40%;
  }
  .right {
    width: 55%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .exam-item {
    dl {
      line-height: 30px;
      font-size: 14px;
      dt {
        display: inline-block;
      }
      dd {
        display: inline-block;
      }
    }
  }
}
.test {
  width: 50px;
  height: 100px;
  background-color: linear-gradient(180deg, #fff, #2f60e0);
  font-weight: 500;
  position: relative;
  line-height: 100px;
  font-size: 40px;
  text-align: center;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
