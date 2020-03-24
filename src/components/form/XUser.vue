<template>
  <div>
    <el-input
      placeholder="输入用户名"
      size="small"
      v-model="searchInput"
      suffix-icon="el-icon-search"
      @input="searchChange"></el-input>
    <div v-loading="loading" class="item-list">
      <div v-for="(item, index) in list" :key="index">
        <div class="item"
          :class="[item.checked ? 'checked' : '']"
          v-if="item.show"
          @click="clickItem(index)">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.id }}</span>
        </div>
      </div>
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
      loading: false,
      list: [],
      checkedItems: []
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
        pagesize: 1000
      }
      _this.loading = true
      getUsers(data).then(res => {
        var tempList = res.list
        _this.list = tempList.map((item, index) => {
          var tempObj = {
            id: item['employeeid'],
            name: item['employeename'],
            checked: false,
            show: true,
            index: index
          }
          if (_this.checkedList.length) {
            for (let i = 0; i < _this.checkedList.length; i++) {
              if (item['id'] === _this.checkedList[i]['id']) {
                tempObj['checked'] = true
              }
            }
          }
          return tempObj
        })
        _this.loading = false
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
    clickItem (index) {
      var _this = this
      const element = this.list[index]
      if (element['checked']) { // 取消已经选中的项
        _this.cancelCheckItem(element)
      } else {
        _this.checkedItems.push(element)
      }
      _this.$emit('checkedChange', { data: _this.checkedItems })
      element['checked'] = !element['checked']
    },
    cancelCheckItem (item) {
      var index = -1
      for (let i = 0; i < this.checkedItems.length; i++) {
        if (this.checkedItems[i]['id'] === item['id']) {
          index = i
        }
      }
      this.checkedItems.splice(index, 1)
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
</style>
