<template>
  <div class="nav-box" v-loading="navLoading">
    <el-tree
      lazy
      ref="tree"
      :props="props"
      :load="loadNode"
      node-key="id"
      @node-click="handleNodeClick"
      show-checkbox
      :check-strictly="checkStrickly"
      @check-change="handleCheckChange"
      highlight-current></el-tree>
  </div>
</template>

<script>
import { getOrgs } from '@/api/background'
import { getTree } from '@/utils'
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
      this.$emit('click', { id: data.id, checked: true })
    },
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        this.$emit('click', { id: data.id, checked: false })
      }
    },
    loadNode (node, resolve) {
      let data = {
        pageIndex: 1,
        pagesize: 10000,
        parentid: node.level === 0 ? 1 : node.data.id
      }
      getOrgs(data).then(res => {
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
