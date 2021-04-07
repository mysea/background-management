<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ lang }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in langList"
          :key="index"
          @click.native="switchLang(item)">{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lang: '',
      langList: [
        {
          label: '中文',
          value: 'zh'
        },
        {
          label: 'English',
          value: 'en'
        }
      ]
    }
  },
  created () {
    this.lang = this.$i18n.locale === 'zh' ? '中文' : 'English'
  },
  methods: {
    switchLang (item) {
      this.lang = item.label
      this.$i18n.locale = item.value
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
