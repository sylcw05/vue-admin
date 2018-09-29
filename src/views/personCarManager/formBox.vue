<template>
    <el-form :inline="true" :model="formInline" label-width="80px">
        <el-form-item label="考试名称">
            <el-select v-model="formInline.chooseExam" placeholder="请选择">
              <el-option
                v-for="item in formInline.examList"
                :key="item.id"
                :label="item.kslb"
                :value="item.id">
              </el-option>
            </el-select>
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
        <el-form-item>
            <el-button type="primary" @click="download">模板下载</el-button>
        </el-form-item>
        <el-upload
        ref="upload"
        class="upload-demo el-form-item el-form-item--small"
        type="primary"
        :action="'/sjgzxt/sjysrwxx/improtExcel?id='+formInline.chooseExam"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        multiple
        :limit="1">
        <el-button size="small" type="primary">批量导入</el-button>
        </el-upload>
    </el-form>
</template>
<script>
import { Message } from 'element-ui'

export default {
  data() {
    return {
      formInline: {
        chooseExam: '',
        examList: []
      }
    }
  },
  mounted() {
    this.getExamList()
  },
  methods: {
    getExamList() { // 获取考试列表数据
      this.$store.dispatch('GetExamList').then(result => {
        this.formInline.examList = result.data.list
      })
    },
    addSubmit() { // 添加
      this.$emit('add', 'add')
    },
    delSubmit() { // 删除
      this.$emit('del', 'del')
    },
    download() { // 下载
      this.$emit('download', 'download')
    },
    beforeUpload() { // 上传前
      if (this.formInline.chooseExam === '') {
        Message({
          message: '请选择考试类别',
          type: 'success'
        })
        return false
      }
    },
    handleSuccess(resp) { // 上传成功
      if (resp.result === 'SUCCESS') {
        this.$emit('upload', 'upload')
        Message({
          message: resp.message,
          type: 'success'
        })
      } else {
        Message({
          message: resp.message,
          type: 'error'
        })
      }
      this.$refs.upload.clearFiles()
    },
    fetchData() { // 查询
    }
  }
}
</script>
