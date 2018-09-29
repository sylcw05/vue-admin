<template>
  <div>
    <el-dialog :center="true" class="user-add" :title="title" :visible.sync="funcShow">
      <div class="form-body">
        <el-form :model="funcadd" ref="funcadd" :rules="rules" label-width="135px"
                 label-position="right">
          <div class="item">
            <el-col :span="12">
              <el-form-item label="权限名称" prop="qxmc">
                <el-input v-model="funcadd.qxmc" placeholder="权限名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权限缩写" prop="qxsx">
                <el-input v-model="funcadd.qxsx" placeholder="权限缩写"></el-input>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="图标名称" prop="qxtb">
                <el-input v-model="funcadd.qxtb" placeholder="图标名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排列序号" prop="plxh">
                <el-select v-model="funcadd.plxh" filterable value-key="code">
                  <template v-for="item in indexNum">
                    <el-option
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </div>
          <div class="item">
            <el-col :span="12">
              <el-form-item label="上级权限" prop="sjqx">
                <el-input @click.native="showParent($event)" clearable :readonly="true" v-model="funcadd.sjqx"
                          placeholder="上级权限"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否显示" prop="isshow">
                <el-switch
                  v-model="funcadd.isshow">
                </el-switch>
              </el-form-item>
            </el-col>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
        <el-button @click="funcShow=false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="所属部门选择"
      :visible.sync="qxVisible"
      width="400px"
      height="300px">
      <div class="treebox">
        <el-tree
          :data="qxs"
          node-key="id"
          ref="qxTree"
          highlight-current
          :props="{children: 'children',label: 'name'}">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button @click="qxVisible = false">取 消</el-button>
           <el-button type="primary" @click="qxTreeSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as dm from '@/api/sysfuncManager'
  import { rules } from '@/utils/validate'

  export default {
    name: 'DialogPanel',
    data() {
      const funcadd = {
        id: '',
        qxmc: '',
        qxsx: '',
        qxtb: '',
        plxh: '',
        sjqx: '',
        sjqxId: '',
        isshow: false
      }
      return {
        title: '',
        funcShow: false,
        rules: {
          qxmc: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: rules.name, message: '权限名称不能包含非法字符', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }],
          qxsx: [{ required: true, message: '不能为空', trigger: 'blur' }],
          qxtb: [{ required: true, message: '不能为空', trigger: 'blur' }],
          plxh: [{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        indexNum: [
          { name: '1', code: '1' },
          { name: '2', code: '2' },
          { name: '3', code: '3' },
          { name: '4', code: '4' },
          { name: '5', code: '5' },
          { name: '6', code: '6' },
          { name: '7', code: '7' },
          { name: '8', code: '8' },
          { name: '9', code: '9' },
          { name: '10', code: '10' }],
        funcadd: funcadd,
        qxs: [],
        qxVisible: false,
        origin: JSON.stringify(funcadd)
      }
    },
    watch: {
      currentOp(newVal, oldVal) {
        if (newVal === 'edit') {
          this.title = '权限信息编辑'
        } else {
          this.title = '权限信息新增'
        }
      },
      funcShow(newVal, oldVal) {
        if (!newVal) {
          this.funcadd = JSON.parse(this.origin)
          this.$nextTick(function() {
            this.$refs.funcadd.clearValidate()
          })
        }
      }
    },
    methods: {
      show(row) {
        if (row) {
          this.funcadd.id = row['id']
          this.funcadd.qxmc = row['systemFuncName']
          this.funcadd.qxsx = row['className']
          this.funcadd.qxtb = row['icon']
          this.funcadd.plxh = row['indexNum']
          this.funcadd.sjqx = row['parent'] ? row['parent']['systemFuncName'] : ''
          this.funcadd.sjqxId = row['parent'] ? row['parent']['id'] : ''
          this.funcadd.isshow = row['showType'] !== '0'
        } else {
          this.funcadd.id = ''
        }
        this.loadQxTree()
        this.funcShow = true
      },
      loadQxTree() {
        dm.getDictSys('GB/T 2261.1').then((resp) => {
          this.qxs = [...resp.data]
        })
      },
      showParent(e) {
        const target = e.target
        if (target.classList.contains('el-input__clear')) {
          this.funcadd.sjqx = ''
          this.funcadd.sjqxId = ''
          return false
        }
        this.qxVisible = true
      },
      submitAddForm() {
        this.$refs.funcadd.validate((validate) => {
          if (validate) {
            const func = {
              parent: { id: this.funcadd.sjqxId },
              id: this.funcadd.id,
              systemFuncName: this.funcadd.qxmc,
              className: this.funcadd.qxsx,
              icon: this.funcadd.qxtb,
              indexNum: this.funcadd.plxh,
              showType: this.funcadd.isshow ? 1 : 0
            }
            dm.saveSys(JSON.stringify(func)).then(resp => {
              this.showSuccessInfo(resp.message)
              this.$emit('complete')
              this.funcShow = false
            })
          }
        })
      },
      qxTreeSubmit() {
        const selectedNodes = this.$refs.qxTree.getCurrentNode()
        if (selectedNodes) {
          this.funcadd.sjqx = selectedNodes['name']
          this.funcadd.sjqxId = selectedNodes['id']
        }
        this.qxVisible = false
      }
    }
  }
</script>
