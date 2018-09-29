<template>
  <content-layout class="role-manager" ref="content" @pageChange="fetchData()" @limitChange="fetchData()">
    <template slot="formSearch">
      <el-form :inline="true" :model="formInline" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData(1)">查询</el-button>
        </el-form-item>
        <el-form-item v-if="checkAuth('jsgladd')">
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
          prop="roleName"
          :show-overflow-tooltip="true"
          label="权限名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          :show-overflow-tooltip="true"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="description"
          :show-overflow-tooltip="true"
          label="描述">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          :width="62*checkAuthsLength(['jsglupdate','jsgldelete'])"
          v-if="checkAuthsSome(['jsglupdate','jsgldelete'])">
          <template slot-scope="scope">
            <el-button v-if="checkAuth('jsglupdate')" @click="itemEdit(scope.row)" type="primary"
                       icon="el-icon-edit">
            </el-button>
            <el-button v-if="checkAuth('jsgldelete')" @click="itemDelete(scope.row)" type="primary"
                       icon="el-icon-delete">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <dialog-panel ref="dialogPanel" :current-op="currentOp"
                  @complete="currentOp === 'add' ? fetchData(1) : fetchData()"/>
  </content-layout>
</template>

<script>
  import * as dm from '@/api/roleManager'
  import DialogPanel from './DialogPanel'
  import { ContentLayout } from '@/components/ContentLayout'

  export default {
    name: 'RoleManager',
    data() {
      return {
        formInline: {
          name: ''
        },
        tbData: [],
        loading: false,
        currentOp: 'add'
      }
    },
    components: {
      DialogPanel,
      ContentLayout
    },
    computed: {},
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
        this.$refs.dialogPanel.show(row.id)
      },
      itemDelete(row) {
        dm.deleteRole(row.id).then((resp) => {
          this.showSuccessInfo(resp.message)
          this.fetchData(1)
        })
      },
      fetchData(page) {
        if (page) {
          this.$refs.content.setPage(page)
        }
        this.loading = true
        dm.getRoleTable(!page ? this.$refs.content.getPage() : page, this.$refs.content.getLimit(), this.formInline.name).then((resp) => {
          this.tbData = [...resp.data.rows]
          this.$refs.content.setTotal(resp.data.total)
        }).finally((e) => {
          this.loading = false
        })
      }
    }
  }
</script>
