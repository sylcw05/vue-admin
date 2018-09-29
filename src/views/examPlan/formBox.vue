<template>
    <el-form :inline="true" :model="formInline" label-width="80px">
        <el-form-item label="考试名称">
            <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="fetchData(1)">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addSubmit">新增</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="delSubmit">删除</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        name: ''
      }
    }
  },
  methods: {
    addSubmit() { // 添加
      this.$emit('add', 'add')
    },
    delSubmit() { // 删除
      this.$emit('del', 'del')
    },
    fetchData() { // 查询
    }
  }
}
</script>
