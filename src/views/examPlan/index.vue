<template>
    <content-layout ref="content" @pageChange="fetchData()" @limitChange="fetchData()">
      <form-box slot="formSearch" @add="addSubmit($event)" @del="delSubmit($event)"></form-box>
      <table-list ref="examTable" :loading="loading" :tableList="examTableList" :tableNameList="tableNameList" :btnList="btnList" @changeItem="changeInfo($event)" slot="tbCont"></table-list>
      <dialog-panel ref="dialogPanel" :formInfo="examItem" :current-op="currentOp" @complete="currentOp === 'add' ? fetchData(1) : fetchData()"/>
    </content-layout>
</template>
<script>
import TableList from '@/components/TableList/index'
import FormBox from './formBox'
import { ContentLayout } from '@/components/ContentLayout'
import DialogPanel from './DialogPanel'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      loading: false,
      examTableList: [],
      tableNameList: [
        { id: 'kslb', name: '考试名称' },
        { id: 'ksnf', name: '考试年份' },
        { id: 'ksdq', name: '考试地区' },
        { id: 'ksdqdz', name: '考试地区行政代码' },
        { id: 'kskssj', name: '考试开始时间' },
        { id: 'ksjssj', name: '考试结束时间' },
        { id: 'sjgjkssj', name: '试卷跟踪开始时间' },
        { id: 'sjgjjssj', name: '试卷跟踪结束时间' }
      ],
      currentOp: 'add',
      btnList: {
        edit: true
      },
      examItem: {}, // 选中的考试
      delIds: [] // 要删除的id
    }
  },
  components: {
    TableList, FormBox, ContentLayout, DialogPanel
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    addSubmit(msg) { // 添加
      this.currentOp = msg
      this.$refs.dialogPanel.show()
    },
    delSubmit(msg) { // 删除
      const info = this.$refs.examTable.handleSelectionChange() // 拿到选中的数据
      if (info) {
        const ids = []
        info.forEach(element => {
          ids.push(element.id)
        })
        const exam = {
          ids: ids.join(',')
        }
        this.$store.dispatch('DeleteOneOrAll', exam).then((result) => {
          Message({
            message: result.message,
            type: 'success'
          })
          this.fetchData()
        }).catch((err) => {
          console.log(err)
        })
      } else {
        Message({
          message: '请选择要删除的考试',
          type: 'warning'
        })
      }
    },
    changeInfo(msg) { // 修改
      this.currentOp = 'edit'
      this.$refs.dialogPanel.show(msg)
    },
    fetchData(page) { // 获取数据
      if (page) {
        this.$refs.content.setPage(page)
      }
      this.loading = true
      const exam = { pageNo: !page ? this.$refs.content.getPage() : page, pageSize: this.$refs.content.getLimit() }
      this.$store.dispatch('GetExamPlan', exam).then((result) => {
        this.examTableList = result.data.list
        this.$refs.content.setTotal(result.data.total)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
