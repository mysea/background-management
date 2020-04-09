<template>
  <div class="module-container" :style="{ height: treeHeight + 'px' }">
    <div class="table-top">
      <el-button type="primary" class="table-top-button" @click="save">保存</el-button>
    </div>
    <module-tree :value="tree" class="tree-container"></module-tree>
  </div>
</template>

<script>
import { getModules } from '@/api/background'
import { mapGetters } from 'vuex'
import moduleTree from './moduleTree'
export default {
  components: {
    moduleTree
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    value (val) {
      this.privilegeList = val
      this.filterTree(this.tree)
    },
    website () {
      this.getModulePrivilegeList()
    }
  },
  data () {
    return {
      checkStrickly: true,
      tree: [],
      treeHeight: document.documentElement.clientHeight - 151,
      privilegeList: [] // 权限id列表
    }
  },
  computed: {
    ...mapGetters([
      'website'
    ])
  },
  created () {
    this.getModulePrivilegeList()
    window.onresize = () => {
      this.updateTreeHeight()
    }
  },
  mounted () {
    this.privilegeList = this.value
    this.filterTree(this.tree)
  },
  methods: {
    // 获取模块权限
    getModulePrivilegeList () {
      if (this.website.value) { 
        let params = {
          showPrivilege: true,
          website_id: this.website.value
        }
        getModules(params).then(res => {
          this.tree = this.getTree(res.list, null, 1)
        })
      }
    },
    // 初始化树形列表
    getTree (data, pid, index) {
      const treeList = []
      data.map(item => {
        if (item.parent_id === pid) {
          item.children = this.getTree(data, item.id, index+1)
          treeList.push({
            id: item.id,
            label: item.name,
            level: index,
            privileges: item.common_Privileges,
            children: item.children
          })
        }
      })
      return treeList
    },
    // 遍历每个节点的权限列表，如果在已有的权限中，则设置为选中
    filterTree (list) {
      list.map(item => {
        if (item.privileges.length) {
          item.privileges.forEach(item => {
            for (let i = 0; i < this.privilegeList.length; i++) {
              const privilege = this.privilegeList[i]
              if (privilege.id === item.id) {
                item.privilege_level = privilege.privilege_level
              }
            }
          })
        }
        if (item.children && item.children.length) {
          this.filterTree(item.children)
        }
      })
    },
    // 保存时遍历树形列表，过滤选中权限的id
    filterPrivilege (list) {
      list.map(item => {
        item.privileges.forEach(p => {
          if (p.privilege_level > 0) {
            this.privilegeList.push({
              privilegeid: p.id,
              privilege_level: p.privilege_level
            })
          }
        })
        if (item.children && item.children.length) {
          this.filterPrivilege(item.children)
        }
      })
    },
    save () {
      this.privilegeList = []
      this.filterPrivilege(this.tree)
      this.$emit('save', this.privilegeList)
    },
    updateTreeHeight () {
      this.treeHeight = document.documentElement.clientHeight - 151
    }
  }
}
</script>

<style lang="scss" scoped>
.module-container {
  position: relative;
}
.tree-container {
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: auto;
}
.table-top {
  height: 50px;
  .table-top-button {
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }
}
</style>
