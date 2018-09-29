<template>
    <content-layout ref="content" @pageChange="fetchData()" @limitChange="fetchData()">
      <form-box slot="formSearch" @add="addSubmit($event)" @del="delSubmit($event)" @download="download($event)" @upload="upload($event)"></form-box>
      <table-list ref="personTable" :loading="loading" :tableList="personTableList" :tableNameList="tableNameList" :btnList="btnList" @changeItem="changeInfo($event)" @toRoute="toRoute($event)" slot="tbCont"></table-list>
      <dialog-panel ref="dialogPanel" :current-op="currentOp" @complete="currentOp === 'add' ? fetchData(1) : fetchData()"/>
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
      currentOp: 'add',
      personTableList: [],
      tableNameList: [
        { id: 'xm', name: '姓名' },
        { id: 'xb', name: '性别' },
        { id: 'sfzjlx', name: '身份证类型' },
        { id: 'sfzjhm', name: '身份证件号码' },
        { id: 'lxdh', name: '联系电话' },
        { id: 'adminArea', name: '所属单位' },
        { id: 'rwkssj', name: '押运日期' },
        { id: 'timeSlot', name: '押运时间段' },
        { id: 'cfddz', name: '行程起始地址' },
        { id: 'mdddz', name: '行程目的地址' },
        { id: 'cph', name: '车牌号' },
        { id: 'cx', name: '车型' },
        { id: 'carNumber', name: '车辆编号' }
      ],
      btnList: {
        edit: true,
        plan: true,
        width: 150
      }
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
    changeInfo(msg) { // 修改
      this.currentOp = 'edit'
      this.$refs.dialogPanel.show(msg)
    },
    download(msg) { // 下载
      window.open('/sjgzxt/sjysrwxx/downloadExcel')
    },
    delSubmit(msg) { // 删除
      const info = this.$refs.personTable.handleSelectionChange() // 拿到选中的数据
      if (info) {
        const ids = []
        info.forEach(element => {
          ids.push(element.id)
        })
        const exam = {
          ids: ids.join(',')
        }
        this.$store.dispatch('DelectPersonCar', exam).then((result) => {
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
    upload(msg) { // 上传成功
      this.fetchData()
    },
    toRoute(msg) { // 行程跳转
      this.$router.push({ name: 'sjgzyyxcgh', params: { info: msg }})
    },
    fetchData(page) { // 获取数据
      if (page) {
        this.$refs.content.setPage(page)
      }
      this.loading = true
      this.personTableList = []
      const pageInfo = { pageNo: !page ? this.$refs.content.getPage() : page, pageSize: this.$refs.content.getLimit() }
      this.$store.dispatch('GetPersonInfo', pageInfo).then((result) => {
        result.data.list.forEach(element => {
          element.xm = element.sjyyryxxbEntity.xm
          element.xb = element.sjyyryxxbEntity.xb
          element.sfzjhm = element.sjyyryxxbEntity.sfzjhm
          element.sfzjlx = element.sjyyryxxbEntity.sfzjlx
          element.mdddz = element.sjysmddEntity.mdddz
          element.cph = element.sjclxxEntity.cph
          element.cx = element.sjclxxEntity.cx
          element.carNumber = element.sjclxxEntity.carNumber
          switch (element.timeSlot) {
            case 0:
              element.timeSlot = '全天'
              break
            case 1:
              element.timeSlot = '上午'
              break
            case 2:
              element.timeSlot = '下午'
              break
          }
          this.personTableList.push(element)
        })
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
