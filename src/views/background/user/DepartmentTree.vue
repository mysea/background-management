<template>
  <div class="nav-box" v-loading="navLoading">
    <el-tree
      :data="treeList"
      node-key="id"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
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
      treeList: []
    }
  },
  mounted () {
    this.getOrgList()
  },
  methods: {
    getOrgList () {
      let data = {
        pageIndex: 1,
        pagesize: 10000
      }
      this.navLoading = true
      getOrgs(data).then(res => {
        let data = res.list
        data.unshift({ departmentname: '广电运通（集团）', departmentid: 1, parentid: 0 })
        this.treeList = getTree(data, 1)
        this.navLoading = false
      })
    },
    handleNodeClick (data) {
      this.$emit('click', data.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
