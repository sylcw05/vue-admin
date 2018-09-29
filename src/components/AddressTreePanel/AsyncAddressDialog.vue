<template>
  <div class="async-address-dialog">
    <el-dialog
      :title="title"
      :visible="true"
      :width="width"
      :height="height"
      :center="true"
      @close="close"
      >
      <div class="treebox">
        <async-address-tree :show-checkbox="showCheckbox" :check-strictly="showCheckbox" :default-checked-keys="defaultCheckedKeys" ref="tree"></async-address-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import AsyncAddressTree from './AsyncAddressTree'
  export default {
    name: 'AsyncAddressDialog',
    data() {
      return {}
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      width: {
        type: String,
        default: '400px'
      },
      height: {
        type: String,
        default: '300px'
      },
      showCheckbox: {
        type: Boolean,
        default: false
      },
      defaultCheckedKeys: Array
    },
    methods: {
      submit() {
        this.$emit('selected', this.$refs.tree.getSelectedNode())
        this.$emit('checkedSelected', this.$refs.tree.$children[0].getCheckedNodes())
        this.close()
      },
      close() {
        this.$emit('close')
      }
    },
    components: {
      AsyncAddressTree
    }
  }
</script>
