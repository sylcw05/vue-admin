<template>
  <div>
    <el-dialog :center="true" class="user-add" :title="title" :visible.sync="userShow">
      <div class="form-body">
        <el-form :model="useradd" ref="useradd" :rules="rules" label-width="135px"
                 label-position="right">
          <div class="item">
            <el-col :span="12">
              <el-form-item label="用户登录名" prop="yhdlm">
                <el-input v-model="useradd.yhdlm" placeholder="用户登录名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="真实姓名" prop="zsxm">
                <el-input v-model="useradd.zsxm" placeholder="真实姓名"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item" v-if="currentOp==='add'">
            <el-col :span="12">
              <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="useradd.pwd" placeholder="密码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="确认密码" prop="repwd">
                <el-input type="password" v-model="useradd.repwd" placeholder="确认密码"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="所属部门" prop="ssbm">
                <el-input @click.native="showDepartment" :readonly="true" v-model="useradd.ssbm"
                          placeholder="所属部门"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户角色" prop="yhjs">
                <el-select clearable v-model="useradd.yhjs" placeholder="请选择">
                  <el-option
                    v-for="item in roles"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="useradd.email" placeholder="电子邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="useradd.phone" placeholder="电话号码"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="决策指挥负责人" prop="bzhkcsl">
                <el-switch
                  v-model="useradd.isadmin">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="sfzh">
                <el-input v-model="useradd.sfzh" placeholder="身份证号"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="用户照片" prop="yhzp">
                <el-upload
                  ref="picUpload"
                  :auto-upload="false"
                  action=""
                  :on-change="listDataPicChange"
                  :on-remove="listDataPicRemove"
                  :file-list="useradd.zppic"
                  :multiple="false"
                  list-type="picture">
                  <el-button type="primary">用户照片</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
        <el-button @click="cancelAddForm">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="所属部门选择"
      :visible.sync="dpVisible"
      width="400px"
      height="300px">
      <div class="treebox">
        <el-tree
          :data="dps"
          node-key="id"
          ref="departmentTree"
          highlight-current
          :props="{children: 'children',label: 'name'}">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button @click="dpVisible = false">取 消</el-button>
           <el-button type="primary" @click="departmentTreeSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as dm from '@/api/userManager'
  import sha from '@/utils/sha1'
  import { rules } from '@/utils/validate'

  export default {
    name: 'DialogPanel',
    data() {
      const validPwd2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.useradd.pwd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        title: '',
        userShow: false,
        dps: [],
        rules: {
          yhdlm: [
            { required: true, message: '姓名只能包含中文英文数字下划线', validator: rules.username, trigger: 'blur' },
            { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur' }
          ],
          zsxm: [
            { required: true, message: '必填', trigger: 'blur' },
            { validator: rules.name, trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '必填', trigger: 'blur' },
            { validator: rules.validPwd, trigger: 'blur' }
          ],
          repwd: [
            { required: true, trigger: 'blur', validator: validPwd2 },
            { validator: rules.validPwd, trigger: 'blur' }
          ],
          yhjs: [
            { required: true, message: '必选', trigger: 'change' }
          ],
          ssbm: [
            { required: true, message: '请选择所属部门', trigger: 'change' }
          ]
        },
        useradd: {
          id: '',
          yhdlm: '',
          pwd: '',
          repwd: '',
          ssbm: '',
          ssbmSelected: [],
          zsxm: '',
          yhjs: '',
          email: '',
          phone: '',
          sfzh: '',
          isadmin: 0,
          zppic: []
        },
        dpVisible: false,
        origin: null
      }
    },
    props: {
      currentOp: String,
      currentRowId: String,
      roles: Array
    },
    watch: {
      currentOp(newVal, oldVal) {
        if (newVal === 'edit') {
          this.title = '用户信息编辑'
        } else {
          this.title = '用户信息新增'
        }
      },
      userShow(newVal, oldVal) {
        if (newVal) {
          this.origin = JSON.stringify(this.useradd)
        } else {
          this.useradd = JSON.parse(this.origin)
        }
        this.$nextTick(function() {
          this.$refs.useradd.clearValidate()
        })
      }
    },
    methods: {
      loadUser(userId) {
        dm.getuserDetail(userId).then((resp) => {
          this.useradd.id = resp.data.id
          this.useradd.yhdlm = resp.data.userName
          this.useradd.pwd = resp.data.password
          this.useradd.repwd = resp.data.password
          this.useradd.ssbm = resp.data.department.dpName
          this.useradd.ssbmSelected = [resp.data.department.id]
          this.useradd.zsxm = resp.data.personName
          this.useradd.email = resp.data.email
          this.useradd.yhjs = resp.data.roleId
          this.useradd.phone = resp.data.mobile
          this.useradd.isadmin = !!resp.data.userMold
          this.useradd.sfzh = resp.data.personNumber
          if (resp.data.picUrl.length) {
            this.useradd.zppic = [{
              url: resp.data.picUrl
            }]
          }
        })
      },
      show(userId) {
        this.userShow = true
        if (userId) {
          this.loadUser(userId)
        } else {
          this.useradd.id = ''
        }
        this.loadDepartment()
      },
      submitAddForm() {
        this.$refs.useradd.validate((validate) => {
          if (validate) {
            const User = {
              userName: this.useradd.yhdlm,
              personName: this.useradd.zsxm,
              userTypeNum: 2,
              email: this.useradd.email,
              department: { id: this.useradd.ssbmSelected[0] },
              roleId: this.useradd.yhjs,
              id: this.useradd.id,
              mobile: this.useradd.phone,
              personNumber: this.useradd.sfzh,
              userMold: this.useradd.isadmin ? 1 : 0
            }
            if (this.currentOp === 'add') {
              User['password'] = sha.hex_sha1(this.useradd.pwd)
            } else {
              User['password'] = this.useradd.pwd
            }
            const formData = new FormData()
            formData.append('User', JSON.stringify(User))
            if (this.useradd.zppic.length) {
              if (this.useradd.zppic[0].hasOwnProperty('raw')) {
                formData.append('picUrl2', this.useradd.zppic[0].raw)
              }
            }
            dm.saveUser(formData).then((resp) => {
              this.showSuccessInfo(resp.message)
              this.userShow = false
              this.$emit('complete')
            })
          }
        })
      },
      cancelAddForm() {
        this.userShow = false
      },
      showDepartment() {
        this.dpVisible = true
      },
      listDataPicChange(file, fileList) {
        this.useradd.zppic = fileList.slice(-1)
      },
      listDataPicRemove(file, fileList) {
        this.useradd.zppic = fileList
      },
      departmentTreeSubmit() {
        const node = this.$refs.departmentTree.getCurrentNode()
        if (node) {
          this.useradd.ssbm = node.name
          this.useradd.ssbmSelected = [node.id]
        } else {
          this.useradd.ssbm = ''
          this.useradd.ssbmSelected = []
        }
        this.dpVisible = false
      },
      loadDepartment() {
        dm.getAllDpTree().then(resp => {
          this.dps = [...resp.data]
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-dialog {

    .el-input {
      width: 80%;
    }

    .el-select {
      width: 80%;
    }

    .upload-loading {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      font-size: 25px;
      color: #409EFF;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .item:after {
      content: "";
      display: block;
      clear: both;
    }

  }
</style>
