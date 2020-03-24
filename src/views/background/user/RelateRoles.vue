<template>
  <el-dialog title="分配角色"
          :visible.sync="showDialog"
          width="500px"
          v-loading="loading"
          :before-close="closeDialog">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="(item, index) in roleList" :key="index" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">保 存</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoles } from '@/api/background'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    show (val) {
      this.showDialog = val
    },
    value (val) {
      this.checkList = val
    }
  },
  created () {
    this.getRoleList()
  },
  data () {
    return {
      showDialog: false,
      loading: false,
      checkList: [],
      roleList: []
    }
  },
  methods: {
    getRoleList () {
      let data = {
        pageIndex: 1,
        pagesize: 1000
      }
      getRoles(data).then(res => {
        const tempList = res.list
        this.roleList = tempList.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
      })
    },
    closeDialog () {
      this.checkList = []
      this.$emit('close')
    },
    submitForm () {
      if (this.checkList.length) {
        this.$emit('save', this.checkList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__body /deep/ {
  padding: 5px 20px;
}
.el-checkbox-group {
  .el-checkbox /deep/ {
    display: block;
    margin: 10px 0;
  }
}
</style>
