<template>
    <div>
        <div class="table-cont">
            <el-table 
            :data="tableList" 
            v-loading="loading"
            element-loading-text="加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)"
            border
            stripe
            height="100%"
            style="width:100%;"
            >
            <el-table-column
            type="index"
            label="序号"
            width="55">
            </el-table-column>
            <el-table-column v-for="item in tableNameList" :key="item.field" :prop="item.field"
            :show-overflow-tooltip="true"
            :label="item.title"></el-table-column>
            <el-table-column
            fixed="right"
            label="详情"
            :width="100">
            <template slot-scope="scope">
                <el-button size="small"  @click="toRoute(scope)" type="primary">查看详情</el-button>
            </template>
            </el-table-column>        
            </el-table>
        </div>
        <div class="echarts">
            <IEcharts :option="options" :style="{width: '100%', height: '300px'}"></IEcharts>   
        </div>
    </div>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  data() {
    return {
      data: [{
        id: '222',
        name: '广州市招生办'
      }, {
        id: '223',
        name: '甚至市招生办'
      }]
    }
  },
  props: {
    tableList: { type: Array },
    tableNameList: { type: Array },
    loading: { type: Boolean },
    btnList: { type: Object },
    options: { type: Object }
  },
  components: {
    IEcharts
  },
  methods: {
    changeInfo(item) {
      this.$emit('changeItem', item.row)
    },
    handleSelectionChange(val) { // 多选
      if (val) {
        this.chooseItem = val
      } else {
        return this.chooseItem
      }
    },
    toRoute(item) {
      this.$emit('toRoute', item.row)
    }
  }
}
</script>
<style lang="scss" scoped>
 .table-cont{
     width: 50%;
     float: left;
 }
 .echarts{
     width: 40%;
     float: right;
 }
</style>


