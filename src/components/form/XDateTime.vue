<template>
  <el-date-picker style="width: 100%;"
    v-model="dataValue"
    type="datetime"
    value-format="yyyy-MM-dd HH:mm:ss"
    @change="valueChange"
    placeholder="选择日期"
    :disabled="disabled"></el-date-picker>
</template>

<script>
import stringMixin from './stringMixin'
export default {
  mixins: [stringMixin]
}
</script>

<style lang="scss" scoped>
</style>
