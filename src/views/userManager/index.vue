<template>
  <content-layout class="user-manager" ref="content" @pageChange="fetchData()" @limitChange="fetchData()">
    <template slot="formSearch">
      <el-form :inline="true" :model="formInline" label-width="60px">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select clearable v-model="formInline.role" placeholder="请选择">
            <el-option
              v-for="item in formInline.roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData(1)">查询</el-button>
        </el-form-item>
        <el-form-item v-if="checkAuth('yhgladd')">
          <el-button type="primary" @click="addSubmit">新增</el-button>
        </el-form-item>
        <el-form-item v-if="checkAuth('yhgldeletes')">
          <el-button type="danger" @click="deleteIds">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>

    <template slot="tbCont">
      <el-table
        :data="data"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
        border
        stripe
        @selection-change="handleSelectionChange"
        height="100%"
        style="width:100%;">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="userName"
          :show-overflow-tooltip="true"
          label="用户登录名">
        </el-table-column>
        <el-table-column
          prop="personName"
          :show-overflow-tooltip="true"
          label="真实姓名">
        </el-table-column>
        <el-table-column
          prop="roleName"
          :show-overflow-tooltip="true"
          label="用户角色">
        </el-table-column>
        <el-table-column
          prop="department"
          :show-overflow-tooltip="true"
          :formatter="dpFormatter"
          label="所属部门">
        </el-table-column>
        <el-table-column
          prop="email"
          :show-overflow-tooltip="true"
          label="电子邮箱">
        </el-table-column>
        <el-table-column
          prop="mobile"
          :show-overflow-tooltip="true"
          label="电话号码">
        </el-table-column>
        <el-table-column
          prop="personNumber"
          :show-overflow-tooltip="true"
          label="身份证号">
        </el-table-column>
        <el-table-column
          prop="userMold"
          :show-overflow-tooltip="true"
          :formatter="adminFormatter"
          label="是否管理员">
        </el-table-column>
        <el-table-column
          prop="zp"
          :show-overflow-tooltip="true"
          width="80px"
          label="照片">
          <template slot-scope="scope">
            <img :src='scope.row.picUrl? host+ scope.row.picUrl.split("8080")[1] : scope.row.picUrl'
                 alt="" style="width: 50px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          :width="62*checkAuthsLength(['yhglupdate','yhgldelete'])" v-if="checkAuthsSome(['yhglupdate','yhgldelete'])">
          <template slot-scope="scope">
            <el-button v-if="checkAuth('yhglupdate')" @click="itemEdit(scope.row)" type="primary"
                       icon="el-icon-edit"></el-button>
            <el-button v-if="checkAuth('yhgldelete')" @click="itemDelete(scope.row)" type="primary"
                       icon="el-icon-delete">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <dialog-panel ref="dialogPanel" :roles="formInline.roles" :current-op="currentOp"
                  @complete="currentOp=== 'add' ? fetchData(1) : fetchData()"/>
  </content-layout>
</template>

<script>
  import * as dm from '@/api/userManager'
  import DialogPanel from './DialogPanel'
  import { ContentLayout } from '@/components/ContentLayout'

  export default {
    name: 'UserManager',
    data() {
      return {
        host: 'http://' + window.location.hostname + ':8080',
        data: [],
        loading: false,
        formInline: {
          name: '',
          role: '',
          roles: []
        },
        currentOp: 'add',
        multipleSelection: []
      }
    },
    components: {
      DialogPanel,
      ContentLayout
    },
    mounted() {
      this.fetchData()
      this.fetchAllRoles()
    },
    methods: {
      handleSelectionChange: function(rows) {
        this.multipleSelection = rows
      },
      addSubmit() {
        this.currentOp = 'add'
        this.$refs.dialogPanel.show()
      },
      deleteIds() {
        const rowIds = this.multipleSelection.map((v) => {
          return v.id
        })
        if (rowIds.length) {
          dm.delAllUser(JSON.stringify(rowIds)).then((resp) => {
            this.showSuccessInfo(resp.message)
            this.fetchData(1)
          })
        }
      },
      itemEdit(row) {
        this.currentOp = 'edit'
        this.$refs.dialogPanel.show(row.id)
      },
      itemDelete(row) {
        dm.deleteUser(row.id).then((resp) => {
          this.fetchData(1)
        })
      },
      fetchAllRoles() {
        dm.getAllRoles().then(resp => {
          this.formInline.roles = resp.data
        })
      },
      fetchData(page) {
        if (page) {
          this.$refs.content.setPage(page)
        }
        this.loading = true
        dm.findUser({
          page: !page ? this.$refs.content.getPage() : page,
          rows: this.$refs.content.getLimit(),
          likeName: this.formInline.name,
          roleId: this.formInline.role
        }).then((resp) => {
          this.data = [...resp.data.rows]
          this.$refs.content.setTotal(resp.data.total)
        }).finally((e) => {
          this.loading = false
        })
      },
      dpFormatter(row, column, cellValue) {
        if (cellValue) {
          return cellValue['dpName']
        } else {
          return ''
        }
      },
      adminFormatter(row, column, cellValue) {
        return cellValue === 0 ? '否' : '是'
      }
    }
  }
</script>
