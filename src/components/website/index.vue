<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ websiteName }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in websiteList"
          :key="index"
          @click.native="switchwebsite(item)">{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {
  getWebsites
} from '@/api/background'
export default {
  data () {
    return {
      websiteName: '',
      websiteList: []
    }
  },
  created () {
    this.getWebsiteList()
    // 站点管理新建站点后刷新数据
    this.$bus.on('updateWebsite', this.getWebsiteList)
  },
  beforeDestroy () {
    this.$bus.off('updateWebsite', this.getWebsiteList)
  },
  methods: {
    getWebsiteList () {
      var params = {
        pageIndex: 1,
        pagesize: 10000
      }
      getWebsites(params).then(res => {
        this.websiteList = res.list.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        this.websiteName = this.websiteList[0]['label']
        this.$store.commit('SET_WEBSITE', this.websiteList[0])
      })
    },
    switchwebsite (item) {
      this.websiteName = item.label
      this.$store.commit('SET_WEBSITE', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
