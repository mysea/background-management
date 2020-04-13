<template>
  <div v-el-select-loadmore="getList">
    <el-input
      placeholder="搜索用户名"
      size="small"
      v-model="searchInput"
      clearable
      @clear="searchChange">
      <el-button slot="append" icon="el-icon-search" @click="searchChange"></el-button>
    </el-input>
    <!-- <el-input
      placeholder="搜索用户名"
      size="small"
      v-model="searchInput"
      suffix-icon="el-icon-search"
      @input="searchChange"></el-input> -->
    <div class="item-list">
      <div v-for="(item, index) in list" :key="index">
        <div class="item"
          :class="[item.checked ? 'checked' : '']"
          @click="toggleItem(index)">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.id }}</span>
        </div>
      </div>
      <div class="list-finish-text" v-if="finished">没有更多了</div>
      <div v-loading="loading" style="height: 40px" v-else></div>
    </div>  
  </div>
</template>

<script>
import { getUsers } from '@/api/user'
export default {
  props: {
    radio: {
      type: Boolean,
      default: false
    },
    checkedList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      searchInput: '',
      // 列表相关
      loading: false,
      finished: false,
      pageIndex: 0,
      list: [],
      // 保存选中项
      checkedItems: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      var _this = this

      if (_this.finished) return

      let data = {
        employeename: _this.searchInput,
        pageIndex: ++_this.pageIndex,
        pagesize: 100
      }
      _this.loading = true
      getUsers(data).then(res => {
        _this.loading = false
        if (res.list.length === 0) {
          _this.finished = true
        }
        // 通过checked属性控制选中状态
        var tempList = res.list.map((item, index) => {
          var tempObj = {
            id: item['employeeid'],
            name: item['employeename'],
            checked: false,
            index: index
          }
          if (_this.checkedList.length) {
            for (let i = 0; i < _this.checkedList.length; i++) {
              if (item['employeeid'] === _this.checkedList[i]['id']) {
                tempObj['checked'] = true
              }
            }
          }
          return tempObj
        })
        _this.list = _this.list.concat(tempList)
      })
    },
    searchChange (val) {
      this.pageIndex = 0
      this.list = []
      this.finished = false
      this.getList()
    },
    toggleItem (index) {
      var _this = this
      const element = _this.list[index]
      if (element['checked']) { // 取消已经选中的项
        let index = -1
        _this.checkedItems.forEach((item, i) => {
          if (item.id === element.id) {
            index = i
          }
        })
        _this.checkedItems.splice(index, 1)
      } else {
        _this.checkedItems.push(element)
      }
      _this.$emit('checkedChange', { data: _this.checkedItems })
      element['checked'] = !element['checked']
    },
    resetData () {
      this.searchInput = ''
      this.finished = false
      this.pageIndex = 0
      this.list = []
      this.checkedItems = []
    }
  },
  directives: {
    'el-select-loadmore': {
      bind: function (el, binding) {
        var WRAP_DOM = el.querySelector('.item-list')
        WRAP_DOM.addEventListener('scroll', function () {
          var condition = this.scrollHeight - this.scrollTop <= this.clientHeight
          if (condition) {
            setTimeout(() => {
              binding.value()
            }, 3000)
          }
        })
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
.item {
  padding: 6px 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  .name {  
    font-size: 13px;
    color: #333;
  }
  .id {
    font-size: 12px;
    color: #909399;
    margin-top: 3px
  }
}
.item:hover {
  background-color: #f5f7fa;
}
.checked {
  color: #409eff;
  background-color: #fff;
  font-weight: 700px;
}
.checked::after {
  position: absolute;
  right: 20px;
  font-family: "element-icons";
  content: "\e6da";
  font-size: 12px;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
}

.list-finish-text {
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  color: #999;
}
</style>
