<template>
  <el-popover
    placement="bottom"
    width="300"
    trigger="click">
    <x-user
      ref="xuser"
      v-if="showSelectView"
      :radio="radio"
      :checkedList = "dataValue"
      @checkedChange = "checkItems"></x-user>
      <div slot="reference">
        <flexbox @click.native="focusClick"
          wrap="wrap"
          class="user-container">
          <div v-for="(item, index) in dataValue"
            :key="index"
            @click.stop="deleteItem(item)"
            class="user-item">
            {{ item.name }}
            <i class="delete-icon el-icon-close"></i>
          </div>
          <div class="add-item">+{{ placeholder }}</div>
        </flexbox>
      </div>
  </el-popover>
</template>

<script>
import XUser from './XUser'
export default {
  components: { XUser },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    radio: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '添加'
    }
  },
  data () {
    return {
      dataValue: [],
      showSelectView: false
    }
  },
  watch: {
    value: function (val) {
      this.dataValue = val
    }
  },
  mounted () {
    this.dataValue = this.value
  },
  methods: {
    checkItems (data) {
      this.dataValue = data.data
      this.$emit('value-change', {
        value: data.data
      })
    },
    deleteItem (item) {
      if (this.$refs.xuser) {
        this.$refs.xuser.clickItem(item['index'])
      }
      // this.dataValue.splice(index, 1)
      // console.log(JSON.parse(JSON.stringify(this.dataValue)))
      this.$emit('value-change', {
        value: this.dataValue
      })
    },
    focusClick () {
      this.showSelectView = true
      this.$emit('forcus')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  min-height: 34px;
  margin: 3px 0;
  position: relative;
  border-radius: 3px;
  font-size: 12px;
  border: 1px solid #ddd;
  color: #333;
  padding: 0.5px;
  line-height: 15px;
  max-height: 105px;
  overflow-y: auto;
  .user-item {
    padding: 5px;
    background-color: #e2ebf9;
    border-radius: 3px;
    margin: 3px;
    cursor: pointer;
  }
  .add-item {
    padding: 5px;
    color: #3e84e9;
    cursor: pointer;
  }
  .delete-icon {
    color: #999;
    cursor: pointer;
  }
  &:hover {
    border-color: #c0c4cc;
  }
}
</style>
