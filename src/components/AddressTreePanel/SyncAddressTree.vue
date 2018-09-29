<template>
  <el-dialog
    :title="title"
    :visible="true"
    :width="`${width}px`"
    :center="true"
    @close="close"
    :height="`${height}px`">
    <el-tree
      :data="data"
      node-key="id"
      ref="tree"
      highlight-current
      :props="{label: 'name'}">
    </el-tree>
    <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { getAddressTree } from '@/api/address'

  export default {
    name: 'SyncAddressTree',
    data() {
      return {
        data: []
      }
    },
    props: {
      title: {
        type: String,
        default: '地区选择'
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 300
      }
    },
    mounted() {
      getAddressTree().then((resp) => {
        this.data = resp.data
      })
    },
    methods: {
      close() {
        this.$emit('close')
      },
      submit() {
        const node = this.$refs.tree.getCurrentNode()
        this.$emit('selected', node)
        this.close()
      }
    }
  }
</script>
