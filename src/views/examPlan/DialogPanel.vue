<template>
  <div>
    <el-dialog :center="true" class="user-add" :title="title" :visible.sync="roleShow">
      <div class="form-body">
        <el-form :model="planItem" ref="planItem" :rules="rules" label-width="135px"
                 label-position="right">
          <div class="item">
            <el-col :span="12">
              <el-form-item label="考试类别" prop="kslb">
                <el-input v-model="planItem.kslb" placeholder="考试类别"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="考试年份" prop="ksnf">
                <el-date-picker v-model="planItem.ksnf" type="year" placeholder="考试年份" value-format="yyyy"></el-date-picker>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="考试地区" prop="ksdq">
                <el-input v-model="planItem.ksdq" placeholder="考试地区" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="考试地区行政编码" prop="ksdqdz">
                <el-input v-model="planItem.ksdqdz" placeholder="考试地区行政编码" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col>
              <el-form-item label="考试时间" prop="kssj">
                <el-date-picker v-model="planItem.kssj" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col>
              <el-form-item label="考试跟踪时间" prop="ksgzsj">
                <el-date-picker v-model="planItem.ksgzsj" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
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
  </div>
</template>

<script>
  import { rules } from '@/utils/validate'

  export default {
    name: 'DialogPanel',
    data() {
      return {
        title: '',
        roleShow: false,
        ssdqFormShow: false, // 是否显示地区选择
        rules: {
          qx: [
            { required: true, message: '请选择角色所属权限', trigger: 'change' }
          ],
          jsmc: [
            { required: true, message: '必填', trigger: 'blur' },
            { validator: rules.name, message: '权限名称不能包含非法字符', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          kslb: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          ksnf: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          kssj: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          ksgzsj: [
            { required: true, message: '必填', trigger: 'blur' }
          ]
        },
        planItem: {
          id: '',
          kslb: '',
          ksnf: '',
          ksdq: '',
          ksdqdz: '',
          kssj: '',
          ksgzsj: ''
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
          this.origin = JSON.stringify(this.planItem)
        } else {
          this.planItem = JSON.parse(this.origin)
        }
        this.$nextTick(function() {
          this.$refs.planItem.clearValidate()
        })
      }
    },
    methods: {
      show(item) { // 弹出框显示
        if (item) {
          this.planItem = {
            id: item.id,
            kslb: item.kslb,
            ksnf: item.ksnf,
            ksdq: item.ksdq,
            ksdqdz: item.ksdqdz,
            kssj: [item.kskssj, item.ksjssj],
            ksgzsj: [item.sjgjkssj, item.sjgjjssj]
          }
        } else {
          this.planItem = {
            id: '',
            kslb: '',
            ksnf: '',
            ksdq: this.$store.state.user.department.addressName,
            ksdqdz: this.$store.state.user.department.addressCode,
            kssj: '',
            ksgzsj: ''
          }
        }
        this.roleShow = true
      },
      submitAddForm() { // 提交表单
        this.$refs.planItem.validate(result => {
          if (result) {
            if (this.currentOp === 'add') {
              this.$store.dispatch('AddOne', this.planItem).then(result => { // 添加
                this.showSuccessInfo(result.message)
                this.roleShow = false
                this.$emit('complete')
              })
            } else {
              this.$store.dispatch('UpdateOne', this.planItem).then(result => { // 修改
                this.showSuccessInfo(result.message)
                this.roleShow = false
                this.$emit('complete')
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
