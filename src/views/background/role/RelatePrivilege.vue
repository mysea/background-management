<template>
  <div>
    <div class="table-top">
      <el-button type="primary" class="table-top-button" @click="save">保存</el-button>
    </div>
    <div style="padding: 0 17px;">
      <el-tree
        @check-change="checkChange"
        :data="tree"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
        <div class="action-group" slot-scope="{ node, data }">
          <div class="action-text" :style="{ width: (4 - data.level) * 18 + 150 + 'px'}">{{ data.label }}</div>
          <div class="action-item">
            <el-checkbox
              v-for="(item, index) in data.privileges"
              :key="index"
              v-model="item.checked">{{ item.name }}</el-checkbox>
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
      let params = {
        showPrivilege: true,
        website_id: this.website.value
      }
      getModules(params).then(res => {
        this.tree = this.getTree(res.list, null, 1)
      })
    },
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
    checkChange (node, selected) {
      node.privileges.forEach(item => {
        this.$set(item, 'checked', selected)
      })
    },
    // 根据已有的权限对模块权限树对应的节点设置选中
    filterTree (list) {
      list.map(item => {
        item.privileges.forEach(item => {
          if (this.privilegeList.indexOf(item.id) !== -1) {
            this.$set(item, 'checked', true)
          } else {
            this.$set(item, 'checked', false)
          }
        })
        if (item.children && item.children.length) {
          this.filterTree(item.children)
        }
      })
    },
    // 将模块权限树中选中的权限的id过滤出来
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
