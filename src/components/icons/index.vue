<template>
  <el-popover
    placement="right-start"
    width="400"
    trigger="hover">
    <div class="icon-box">
      <ul class="icon-list">
        <li @click="select(index)" v-for="(item, index) in icons" :key="index">
          <i :class="['grg grg-' + item, selectedIndex === index ? 'active' : '']"></i>
          <span class="icon-name">{{ item }}</span>
        </li>
      </ul>
    </div>
    <el-button type="text" slot="reference">选择图标</el-button>
  </el-popover>
</template>

<script>
export default {
  data () {
    return {
      selectedIndex: -1,
      icons: [
        '',
        // 协同平台
        'analysis',
        'momey',
        'message',
        'phone',
        'report',
        'competitor',
        'search',
        'customer',
        'order',
        'receivable',
        'workbench',
        'me',
        'price',
        'salesperson',
        'source',
        // 后台管理
        'tooltip',
        'locale',
        'dictionary',
        'role',
        'module',
        'user',
        'log',
        'deptment',
        'website',
        'personcenter',
        'logout',
        'password'
      ]
    }
  },
  methods: {
    select (index) {
      this.selectedIndex = index
      if (index !== -1) {
        this.$emit('save', this.icons[index])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-box {
  overflow: auto;
  max-height: 300px;
  .icon-list {
    li {
      float: left;
      width: 20%;
      text-align: center;
      height: 60px;
      font-size: 13px;
      margin-bottom: 10px;
      i {
        display: block;
        font-size: 26px;
        color: #606266;
      }
      .icon-name {
        display: inline-block;
        color: #99a9bf;
      }
    }
    li:hover {
      cursor: pointer;
      color: #409eff;
    }
    .active {
      color: #409eff;
    }
  }
}
</style>
