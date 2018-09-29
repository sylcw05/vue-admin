<template>

  <content-layout class="sysfunc-manager" ref="content" @pageChange="fetchData()" @limitChange="fetchData()">
    <template slot="formSearch">
      <el-form :inline="true" :model="formInline" label-width="80px">
        <el-form-item label="权限名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData(1)">查询</el-button>
        </el-form-item>
        <el-form-item v-if="checkAuth('qxgladd')">
          <el-button type="primary" @click="addSubmit">新增</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template slot="tbCont">
      <el-table
        :data="tbData"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        border
        stripe
        height="100%"
        style="width:100%;">
        <el-table-column
          prop="systemFuncName"
          :show-overflow-tooltip="true"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="className"
          :show-overflow-tooltip="true"
          label="权限缩写">
        </el-table-column>
        <el-table-column
          prop="icon"
          :show-overflow-tooltip="true"
          label="权限图标">
        </el-table-column>
        <el-table-column
          prop="indexNum"
          :show-overflow-tooltip="true"
          label="排列序号">
        </el-table-column>
        <el-table-column
          prop="menuType"
          :show-overflow-tooltip="true"
          label="菜单类型">
        </el-table-column>
        <el-table-column
          prop="parent"
          :show-overflow-tooltip="true"
          :formatter="parentFormatter"
          label="上级权限">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          :width="62*checkAuthsLength(['qxglupdate','qxgldelete'])" v-if="checkAuthsSome(['qxglupdate','qxgldelete'])">
          <template slot-scope="scope">
            <el-button v-if="checkAuth('qxglupdate')" @click="itemEdit(scope.row)" type="primary"
                       icon="el-icon-edit">
            </el-button>
            <el-button v-if="checkAuth('qxgldelete')" @click="itemDelete(scope.row)" type="primary"
                       icon="el-icon-delete">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <dialog-panel ref="dialogPanel" :current-op="currentOp" @complete="currentOp==='add' ? fetchData(1):fetchData()"/>
  </content-layout>
</template>

<script>
  import DialogPanel from './DialogPanel'
  import * as dm from '@/api/sysfuncManager'
  import { ContentLayout } from '@/components/ContentLayout'

  export default {
    name: 'SysfuncManager',
    data() {
      return {
        tbData: [],
        loading: false,
        formInline: {
          name: ''
        },
        currentOp: 'add'
      }
    },
    components: {
      DialogPanel,
      ContentLayout
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      addSubmit() {
        this.currentOp = 'add'
        this.$refs.dialogPanel.show()
      },
      itemEdit(row) {
        this.currentOp = 'edit'
        this.$refs.dialogPanel.show(row)
      },
      itemDelete(row) {
        dm.deleteSys(row.id).then(resp => {
          this.showSuccessInfo(resp.message)
          this.fetchData(1)
        })
      },
      parentFormatter(row, column, cellValue) {
        if (cellValue) {
          return cellValue['systemFuncName']
        } else {
          return ''
        }
      },
      fetchData(page) {
        if (page) {
          this.$refs.content.setPage(page)
        }
        this.loading = true
        dm.getSysList(this.formInline.name, !page ? this.$refs.content.getPage() : page, this.$refs.content.getLimit()).then((resp) => {
          this.tbData = [...resp.data.rows]
          this.$refs.content.setTotal(resp.data.total)
        }).finally((e) => {
          this.loading = false
        })
      }
    }
  }

</script>
