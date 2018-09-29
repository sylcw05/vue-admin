<template>
  <div>
    <el-dialog :center="true" class="user-add" :title="title" :visible.sync="roleShow">
      <div class="form-body">
        <el-form :model="personItem" ref="personItem" :rules="rules" label-width="135px"
                 label-position="right">
          <div class="item">
            <el-col :span="12">
              <el-form-item label="姓名" prop="xm">
                <el-input v-model="personItem.xm" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="xb">
                <el-radio v-model="personItem.xb" label="1">男</el-radio>
                <el-radio v-model="personItem.xb" label="2">女</el-radio>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="身份证类型" prop="sfzjlx">
                <el-select v-model="personItem.sfzjlx" placeholder="身份证类型">
                  <el-option
                    v-for="item in sfzjlx"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证件号码" prop="sfzjhm">
                <el-input v-model="personItem.sfzjhm" placeholder="身份证件号码"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="联系电话" prop="lxdh">
                <el-input v-model="personItem.lxdh" placeholder="联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属单位" prop="adminArea">
                <el-select v-model="personItem.adminArea" placeholder="所属单位">
                  <el-option
                    v-for="item in adminArea"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="押运日期" prop="rwkssj">
                <el-date-picker v-model="personItem.rwkssj" type="date" placeholder="押运日期" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="押运时间段" prop="timeSlot">
                <el-radio v-model="personItem.timeSlot" label="1">上午</el-radio>
                <el-radio v-model="personItem.timeSlot" label="2">下午</el-radio>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="行程起始地址" prop="mdddz">
                <el-input v-model="personItem.cfddz" placeholder="行程起始地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行程目的地址" prop="mdddz">
                <el-input v-model="personItem.cfddz" placeholder="行程目的地址"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="车牌号" prop="cph">
                <el-input v-model="personItem.cph" placeholder="车牌号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车型" prop="cx">
                <el-input v-model="personItem.cx" placeholder="车型"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="车辆编号" prop="carNumber">
                <el-input v-model="personItem.carNumber" placeholder="车辆编号"></el-input>
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
  export default {
    name: 'DialogPanel',
    data() {
      return {
        title: '',
        roleShow: false,
        sfzjlx: [ // 身份证类型
          '居民身份证', '护照', '香港特区护照/身份证明', '澳门特区护照/身份证明', '台湾居民来往大陆通行证'
        ],
        adminArea: [
          '广州', '深圳'
        ],
        rules: {
          xm: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          xb: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          sfzjlx: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          sfzjhm: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          lxdh: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          adminArea: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          rwkssj: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          timeSlot: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          cfddz: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          mdddz: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          cph: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          cx: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          carNumber: [
            { required: true, message: '必填', trigger: 'blur' }
          ]
        },
        personItem: {
          xm: '',
          xb: '',
          sfzjlx: '',
          sfzjhm: '',
          lxdh: '',
          adminArea: '',
          rwkssj: '',
          timeSlot: '',
          cfddz: '',
          mdddz: '',
          cph: '',
          cx: '',
          carNumber: ''
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
          this.origin = JSON.stringify(this.personItem)
        } else {
          this.personItem = JSON.parse(this.origin)
        }
        this.$nextTick(function() {
          this.$refs.personItem.clearValidate()
        })
      }
    },
    methods: {
      loadInfo(roleId) { // 显示修改的内容
      },
      show(item) { // 弹出框显示
        this.roleShow = true
      },
      submitAddForm() { // 提交表单
        this.$refs.personItem.validate(result => {
          if (result) {
            if (this.currentOp === 'add') {
              this.$store.dispatch('AddOne', this.planpersonItemItem).then(result => { // 添加
                this.showSuccessInfo(result.message)
                this.roleShow = false
                this.$emit('complete')
              })
            } else {
              this.$store.dispatch('UpdateOne', this.personItem).then(result => { // 修改
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
<style lang="scss">
.item{
  overflow: hidden;
}
</style>

