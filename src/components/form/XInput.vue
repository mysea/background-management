<template>
  <el-input v-model="dataValue"
    :type="type"
    :disabled="disabled"
    @input="valueChange"></el-input>
</template>

<script>
import stringMixin from './stringMixin'
export default {
  mixins: [stringMixin],
  computed: {
    type () {
      if (this.item && this.item.form_type === 'password') {
        return this.item.form_type
      } else {
        return 'text'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
