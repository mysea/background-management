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
import { resetPassword } from '@/api/user'
import { saveSuccessToast } from '@/utils/toast'
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
  },
  data () {
    return {
      showDialog: false,
      loading: false,
      passwordForm: {
        newPassword: ''
      },
      passwordFormRules: {
        newPassword: { required: true, message: '请输入新密码', trigger: 'change' }
      }
    }
  },
  methods: {
    closeDialog () {
      this.passwordForm = {
        newPassword: ''
      }
      this.$refs['passwordForm'].resetFields()
      this.$emit('close')
    },
    submitForm () {
      this.$refs['passwordForm'].validate((valid) => {
        if (valid) {
          if (this.value) {
            resetPassword(this.value, this.passwordForm.newPassword).then(res => {
              if (res) {
                saveSuccessToast()
                this.$emit('close')
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
