<template>
  <el-select style="width: 100%"
    v-model="dataValue"
    :disabled="disabled"
    @change="valueChange"
    placeholder="请选择">
    <el-option v-for="(item, index) in option"
      :key="index"
      :label="item.name"
      :value="item.value"></el-option>
    </el-select>
</template>

<script>
import stringMixin from './stringMixin'
export default {
  mixins: [stringMixin],
  data () {
    return {
      option: []
    }
  },
  watch: {
    item: {
      handler (val) {
        if (val && val.options) {
          var arr = val.options.split(',')
          this.option = arr
        }
      }
    },
    deep: true,
    immediate: true
  }
}
</script>

<style lang="scss" scoped>
</style>
