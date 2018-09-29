<template>
  <div>
    <el-dialog :center="true" class="user-add" :title="title" :visible.sync="roleShow">
      <div class="form-body">
        <el-form :model="roleadd" ref="roleadd" :rules="rules" label-width="135px"
                 label-position="right">
          <div class="item">
            <el-col :span="12">
              <el-form-item label="角色名称" prop="jsmc">
                <el-input v-model="roleadd.jsmc" placeholder="角色名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权限" prop="qx">
                <el-input @click.native="showPermissions" :readonly="true" v-model="roleadd.qx"
                          placeholder="权限"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="描述" prop="ms">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="roleadd.ms">
                </el-input>
              </el-form-item>
            </el-col>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
        <el-button @click="roleShow = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="所属权限"
      :visible.sync="qxShow"
      :center="true"
      width="400px"
      height="300px">
      <div class="myTree">
        <el-tree
          :props="{children: 'children',label: 'name', id: 'id'}"
          :data="roleadd.qxData"
          :default-expand-all="true"
          show-checkbox
          :check-strictly="true"
          node-key="id"
          :default-checked-keys="roleadd.qxSelected"
          ref="qxTree">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="qxSelectedHandler">确 定</el-button>
         <el-button @click="qxShow=false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as dm from '@/api/roleManager'
  import axios from 'axios'
  import { rules } from '@/utils/validate'

  export default {
    name: 'DialogPanel',
    data() {
      return {
        title: '',
        roleShow: false,
        rules: {
          qx: [
            { required: true, message: '请选择角色所属权限', trigger: 'change' }
          ],
          jsmc: [
            { required: true, message: '必填', trigger: 'blur' },
            { validator: rules.name, message: '权限名称不能包含非法字符', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        },
        roleadd: {
          id: '',
          jsmc: '',
          qx: '',
          qxData: [],
          qxSelected: [],
          ms: ''
        },
        qxShow: false,
        origin: null
      }
    },
    props: {
      currentOp: String
    },
    watch: {
      currentOp(newVal, oldVal) {
        if (newVal === 'edit') {
          this.title = '角色信息编辑'
        } else {
          this.title = '角色信息新增'
        }
      },
      roleShow(newVal, oldVal) {
        if (newVal) {
          this.origin = JSON.stringify(this.roleadd)
        } else {
          this.roleadd = JSON.parse(this.origin)
        }
        this.$nextTick(function() {
          this.$refs.roleadd.clearValidate()
        })
      }
    },
    methods: {
      loadInfo(roleId) {
        const rolePromise = dm.getRoleDetail(roleId)
        const permissionPromise = dm.getAllPower()
        axios.all([rolePromise, permissionPromise])
          .then(axios.spread((roles, permissions) => {
            this.roleadd.id = roles.data.id
            this.roleadd.qxSelected = roles.data.functionList_id
            this.roleadd.ms = roles.data.description
            this.roleadd.jsmc = roles.data.roleName
            const tmp = permissions.data.rows.map((v) => {
              if (roles.data.functionList_id.includes(v.id)) {
                return v.systemFuncName
              }
            })
            this.roleadd.qx = tmp.filter((v) => {
              return v
            }).join(',')
          }))
      },
      show(roleId) {
        if (roleId) {
          this.loadInfo(roleId)
        } else {
          this.roleadd.id = ''
        }
        this.loadPermissions()
        this.roleShow = true
      },
      submitAddForm() {
        this.$refs.roleadd.validate(result => {
          if (result) {
            dm.saveRole({
              roleName: this.roleadd.jsmc,
              typeNum: 0,
              description: this.roleadd.ms,
              id: this.roleadd.id,
              functionList_id: JSON.stringify(this.roleadd.qxSelected)
            }).then((resp) => {
              this.showSuccessInfo(resp.message)
              this.roleShow = false
              this.$emit('complete')
            })
          }
        })
      },
      showPermissions() {
        this.qxShow = true
      },
      loadPermissions() {
        dm.getPower().then((resp) => {
          this.roleadd.qxData = [...resp.data]
        })
      },
      qxSelectedHandler() {
        const selectedNodes = this.$refs.qxTree.getCheckedNodes()
        const tmpId = []
        const tmpName = []
        selectedNodes.forEach((v) => {
          tmpId.push(v.id)
          tmpName.push(v.name)
        })
        this.roleadd.qxSelected = tmpId
        this.roleadd.qx = tmpName.join(',')
        this.qxShow = false
      }
    }
  }
</script>

<style scoped>

</style>
