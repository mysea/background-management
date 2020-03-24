<template>
  <slide-view @slide-close="hideView">
    <flexbox v-loading="loading"
      direction="column"
      align="stretch"
      class="d-container">
      <detail-head @handle="detailHeadHandle" @close="hideView"></detail-head>
      <div class="tabs">
        <el-tabs v-model="currentTabName">
          <el-tab-pane
            v-for="(item, index) in tabNames"
            :key="index"
            :label="item.label"
            :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="loading-content">
        <keep-alive>
          <component :is="tabName"></component>
        </keep-alive>
      </div>
    </flexbox>
  </slide-view>
</template>

<script>
import SlideView from '@/components/SlideView'
import DetailHead from '@/components/DetailHead'
import Record from './components/Record'
import Info from './components/Info'
import Attachment from './components/Attachment'
export default {
  components: {
    SlideView,
    DetailHead,
    Record,
    Info,
    Attachment
  },
  data () {
    return {
      loading: false,
      currentTabName: 'record',
      tabNames: [
        { label: '跟进记录', name: 'record' },
        { label: '基本信息', name: 'info' },
        { label: '附件', name: 'attachment' }
      ]
    }
  },
  computed: {
    tabName () {
      if (this.currentTabName === 'record') {
        return 'Record'
      } else if (this.currentTabName === 'info') {
        return 'Info'
      } else if (this.currentTabName === 'attachment') {
        return 'Attachment'
      }
    }
  },
  methods: {
    hideView () {
      this.$emit('hide-view')
    },
    detailHeadHandle (type) {
      console.log(type)
    }
  }
}
</script>

<style lang="scss" scoped>
.d-container {
  position: relative;
  height: 100%;
}
.loading-content {
  position: relative;
  overflow-y: scroll;
  flex: 1;
}

//客户相关详情 头部类似布局
.el-tabs /deep/ .el-tabs__nav-wrap::after {
  display: none !important;
}

.el-tabs /deep/ .el-tabs__header {
  background-color: #F5F6F9;
  padding: 0 17px;
  margin: 0 0 15px !important;
}

.el-tabs /deep/ .el-tabs__item {
  font-size: 13px !important;
  height: 40px !important;
  line-height: 40px !important;
}
</style>
