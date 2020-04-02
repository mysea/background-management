<template>
  <el-dialog title="修改密码"
             :visible.sync="showDialog"
             width="500px"
             v-loading="loading"
             @close="closeDialog">
    <el-form :model="passwordForm"
             :rules="passwordFormRules"
             ref="passwordForm"
             label-width="80px"
             label-position="right">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="passwordForm.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="passwordForm.newPassword"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">保 存</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show (val) {
      this.showDialog = val
    }
    // show: {
    //   handler(val) {
    //     this.showDialog = val
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  data () {
    return {
      showDialog: false,
      loading: false,
      passwordForm: {
        oldPassword: '',
        newPassword: ''
      },
      passwordFormRules: {}
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    submitForm () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
