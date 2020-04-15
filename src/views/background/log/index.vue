<template>
  <div>
    <h1>{{ $route.meta.title }}</h1>
    <el-button type="primary" @click="createClick">新建</el-button>
    <el-button type="primary" @click="detailClick">详情</el-button>
    <create-view
      v-if="isCreate"
      :type="type"
      :info="createInfo"
      @hiden-view="isCreate = false"></create-view>
    <detail-view
      v-if="showDetail"
      @hide-view="showDetail = false"></detail-view>
  </div>
</template>

<script>
import createView from './createView'
import detailView from './detailView'
export default {
  components: {
    createView,
    detailView
  },
  data () {
    return {
      type: 'log',
      isCreate: false,
      createInfo: { type: 'save' },
      showDetail: false
    }
  },
  methods: {
    createClick () {
      this.createInfo = { type: 'save' }
      this.isCreate = !this.isCreate
    },
    detailClick () {
      this.showDetail = !this.showDetail
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
