<template>
  <div class="nav-box" v-loading="navLoading">
    <el-tree
      lazy
      ref="tree"
      :props="props"
      :load="loadNode"
      node-key="id"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      show-checkbox
      :check-strictly="checkStrickly"
      @check="checkNode"
      highlight-current></el-tree>
  </div>
</template>

<script>
import { getOrgs } from '@/api/background'
export default {
  data () {
    return {
      navLoading: false,
      checkStrickly: true,
      props: {
        label: 'name',
        children: 'zones'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      this.$refs.tree.setCheckedNodes([])
      this.$emit('click', { id: data.id, checked: true })
    },
    checkNode (node, checkStatus) {
      this.$refs.tree.setCheckedNodes([node])
      this.$emit('click', { id: node.id, checked: false })
    },
    loadNode (node, resolve) {
      let data = {
        pageIndex: 1,
        pagesize: 10000,
        parentid: node.level === 0 ? 1 : node.data.id
      }
      if (node.level === 0) {
        this.navLoading = true
      }
      getOrgs(data).then(res => {
        this.navLoading = false
        let tempList = res.list.map(item => {
          return {
            name: item.departmentname,
            id: item.departmentid
          }
        })
        resolve(tempList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
