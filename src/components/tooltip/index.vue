<template>
  <el-tooltip v-if="value"
              effect="dark"
              :content="value"
              placement="top">
    <i class="grg grg-tooltip"></i>>
  </el-tooltip>  
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  cursor: pointer;
  margin-left: 5px;
  color: #dcdfe6;
}
i:hover {
  color: #3E84E9;
}
</style>
