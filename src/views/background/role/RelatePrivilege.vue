<template>
  <div>
    <div class="table-top">
      <el-button type="primary" class="table-top-button" @click="save">保存</el-button>
    </div>
    <div style="padding: 0 17px;">
      <el-tree
        ref="tree"
        node-key="id"
        :data="tree"
        show-checkbox
        :check-strictly="checkStrickly"
        @check-change="checkChange"
        default-expand-all
        :expand-on-click-node="false">
        <div class="action-group" slot-scope="{ node, data }">
          <div class="action-text" :style="{ width: (4 - data.level) * 18 + 50 + 'px'}">{{ data.label }}</div>
          <div class="action-item">
            <el-checkbox
              v-for="(item, index) in data.privileges"
              :key="index"
              v-model="item.checked"
              @change="itemChange($event, node)">{{ item.name }}</el-checkbox>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { getModules } from '@/api/background'
import { mapGetters } from 'vuex'
export default {
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
    // 选中左侧复选框时，设置右侧所有复选框的选中状态
    checkChange (node, selected) {
      node.privileges.forEach(item => {
        this.$set(item, 'checked', selected)
      })
    },
    // 选中右侧复选框时，判断是否全选来设置左侧复选框
    itemChange (event, node) {
      let allChecked = node.data.privileges.every(item => {
        return item.checked
      })
      let someChecked = node.data.privileges.some(item => {
        return item.checked
      })
      if (allChecked) {
        node.checked = true
        node.indeterminate = false
      } else if (someChecked) {
        node.indeterminate = true
      } else {
        node.checked = false
        node.indeterminate = false
      }
    },
    // 遍历每个节点的权限列表，如果在已有的权限中，则设置为选中
    filterTree (list) {
      list.map(item => {
        if (item.privileges.length) {  
          let allChecked = true
          item.privileges.forEach(item => {
            if (this.privilegeList.indexOf(item.id) !== -1) {
              this.$set(item, 'checked', true)
            } else {
              allChecked = false
              this.$set(item, 'checked', false)
            }
          })
          this.$refs.tree.setChecked(item.id, allChecked, false)
        }
        if (item.children && item.children.length) {
          this.filterTree(item.children)
        }
      })
    },
    // 保存时遍历树形列表，过滤选中权限的id
    filterPrivilege (list) {
      list.map(item => {
        let checkedItemList = item.privileges.filter(i => {
          return i.checked
        })
        checkedItemList.map(j => {
          this.privilegeList.push(j.id)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.action-group {
  width: 100%;
  display: flex;  
  .action-text {
    margin-right: 10px;
    .action-item {
      flex: 1;
    }
  }
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
