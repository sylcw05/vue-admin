<template>
  <div class="async-address-tree">
    <el-tree
      node-key="id"
      :accordion="accordion"
      :expand-on-click-node="false"
      :default-expanded-keys="nodeExpanded"
      :load="loadNode"
      ref="tree"
      lazy
      highlight-current
      :show-checkbox="showCheckbox"
      :check-strictly="showCheckbox"
      :default-checked-keys="defaultCheckedKeys"
      @node-click="nodeSelected"
      :props="treeProp">
    </el-tree>
  </div>
</template>

<script>
  import * as dm from '@/api/address'
  export default {
    name: 'AsyncAddressTree',
    data() {
      return {
        nodeExpanded: [],
        nodeKey: 'id'
      }
    },
    props: {
      treeProp: {
        type: Object,
        default: () => {
          return {
            children: 'children',
            label: 'addressName'
          }
        }
      },
      accordion: {
        type: Boolean,
        default: false
      },
      showCheckbox: {
        type: Boolean,
        defalut: false
      },
      defaultCheckedKeys: Array
    },
    methods: {
      nodeSelected(data, node, component) {
        this.$emit('selected', data, node, component)
      },
      fetchNode(node, resolve) {
        dm.getAsyncAddress({
          id: node.data ? node.data.id : ''
        }).then(resp => {
          resolve(resp.data)
          if (node.level === 0) {
            resp.data.forEach(item => {
              this.nodeExpanded.push(item[this.nodeKey])
            })
            this.$emit('loaded', resp.data)
          }
        })
      },
      loadNode(node, resolve) {
        this.fetchNode(node, resolve)
      },
      getSelectedNode() {
        return this.$refs.tree.getCurrentNode()
      },
      setSelectedNode(node) {
        if (!node) {
          this.$refs.tree.setCurrentNode({})
        } else {
          this.$refs.tree.setCurrentNode(node)
        }
      }
    }
  }
</script>