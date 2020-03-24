<template>
  <div>
    <div style="text-align: right;margin-right: 80px;">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
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
            v-model="item.checked">{{item.name}}</el-checkbox>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
import { getModulePrivilege } from '@/api/background'
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
    }
  },
  data () {
    return {
      tree: [{
        id: 1,
        label: '一级 1',
        level: 1,
        privileges: [
          {
            id: 1,
            name: '查询'
          }
        ],
        children: [{
          id: 4,
          label: '二级 1-1',
          level: 2,
          privileges: [
            {
              id: 2,
              name: '查询'
            },
            {
              id: 3,
              name: '新建'
            }
          ],
          children: [{
            id: 9,
            label: '三级 1-1-1',
            level: 3,    
            privileges: [
              {
                id: 4,
                name: '查询'
              },
              {
                id:  5,
                name: '新建'
              }
            ]
          }, {
            id: 10,
            label: '三级 1-1-2',
            level: 3,    
            privileges: [
              {
                id: 6,
                name: '查询'
              },
              {
                id: 7,
                name: '新建'
              },
              {
                id: 8,
                name: '编辑'
              },
              {
                id: 9,
                name: '删除'
              }
            ]
          }]
        }]
      }],
      privilegeList: [] // 权限id列表
    }
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
      getModulePrivilege().then(res => {
        let tempList = res.list
      })
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
</style>
