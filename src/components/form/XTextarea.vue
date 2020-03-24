<template>
  <el-input v-model="dataValue"
    type="textarea"
    resize="none"
    :rows="3"
    :maxlength="200"
    show-word-limit
    @input="valueChange"
    :disabled="disabled"></el-input>  
</template>

<script>
import stringMixin from './stringMixin'
export default {
  mixins: [stringMixin]
}
</script>

<style lang="scss" scoped>
.el-textarea /deep/ .el-textarea__inner {
  padding: 5px 8px;
  border-radius: 3px;
  border: 1px solid #ddd;
  color: #333;
}
.el-textarea /deep/ .el-textarea__inner:focus {
  outline: 0;
  border-color: #ddd;
}
</style>
