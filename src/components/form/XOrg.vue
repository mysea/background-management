<template>
  <div>
    <el-input
      placeholder="搜索部门名"
      size="small"
      v-model="searchInput"
      suffix-icon="el-icon-search"
      @input="searchChange"></el-input>
    <div v-loading="loading" class="item-list">
      <el-breadcrumb style="padding: 5px 0;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="index">
          <a href="javascript:;" @click="breadcrumbBtn(item, index)">{{ item.label }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <flexbox
        v-for="(item, index) in showList"
        :key="index"
        class="org-list">
        <el-checkbox
          class="org-check"
          v-model="item.checked"
          @change="checkChange(item, index)"></el-checkbox>
          <div @click="enterChildren(item)"
            class="org-name">
            {{ item.label }}  
          </div>
          <div class="el-icon-arrow-right org-enter" v-if="item.children.length"></div>
      </flexbox>
    </div>  
  </div>
</template>

<script>
import { getOrgs } from '@/api/background'
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      searchInput: '',
      loading: false,
      checkedList: [], // 选择项
      showList: [], // 展示项
      orgList: [],
      breadcrumbList: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      var _this = this
      let data = {
        pageIndex: 1,
        pagesize: 10000
      }
      _this.loading = true
      getOrgs(data).then(res => {
        _this.loading = false

        var tempList = res.list
        tempList.unshift({ departmentname: '广电运通（集团）', departmentid: 1, parentid: 0 })
        this.showList = this.orgList = this.addShowList(this.getTree(tempList, 1))

        _this.breadcrumbList.push({ label: '全部', data: this.showList })
      })
    },
    getTree (data, pid) {
      const treeList = []
      data.map(item => {
        if (item.parentid === pid) {
          item.children = this.getTree(data, item.departmentid)
          treeList.push({
            id: item.departmentid,
            label: item.departmentname,
            children: item.children
          })
        }
      })
      return treeList
    },
    addShowList (list) {
      return list.map(item => {
        item.checked = false
        item.show = true
        return item
      })
    },
    searchChange (val) {
      this.list = this.list.map(item => {
        if (item['name'].indexOf(val) !== -1) {
          item['show'] = true
        } else {
          item['show'] = false
        }
        return item
      })
    },
    // 面包屑点击事件
    breadcrumbBtn (item, index) {

    },
    checkChange (item, index) {
    },
    enterChildren (item) {
      if (item.children) {
        this.showList = []
        this.showList = item.children
        this.breadcrumbList.push({ label: item.label, data: this.showList })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-list {
  margin-top: 5px;
  height: 248px;
  overflow: auto;
}
.org-list {
  padding: 5px;
  font-size: 13px;
  .org-check {
    margin-right: 8px;
  }
  .org-name {
    flex: 1;
  }
  .org-enter {
    margin-right: 8px;
  }
}
</style>
