<template>
  <el-select style="width: 100%"
    v-model="dataValue"
    :disabled="disabled"
    @change="valueChange"
    placeholder="请选择"
    multiple>
    <el-option v-for="(item, index) in option"
      :key="index"
      :label="item.name"
      :value="item.value"></el-option>
    </el-select>
</template>

<script>
import arrayMixin from './arrayMixin'
export default {
  mixins: [arrayMixin],
  computed: {
    option () {
      var array = []
      return array
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
