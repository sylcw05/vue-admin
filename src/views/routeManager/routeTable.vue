<template>
    <el-table 
        :data="tableList"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        border
        stripe
        style="width:100%;">
        <el-table-column
          fixed="right"
          label="中间点"
          prop="address">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          :width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="check(scope)" type="primary" v-if="scope.row.mark!=='1'">修改</el-button>
            <el-badge value="默认" class="item" v-else>
              <el-button size="small" @click="check(scope)" type="primary">修改</el-button>
            </el-badge>
            <el-button size="small" @click="del(scope)" type="primary" v-if="scope.row.mark!=='1'">删除</el-button>
          </template>
        </el-table-column>    
    </el-table>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    tableList: Array
  },
  methods: {
    del(item) { // 删除中间点
      this.$emit('delCenter', item.row)
    },
    check(item) { // 查看中间点
      this.$emit('checkCenter', item)
    }
  }
}
</script>
