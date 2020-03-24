<template>
  <div style="position: relative;">
    <flexbox class="t-section">
      <div class="t-name">{{ name }}</div>
      <el-button class="t-button" @click="handleTypeClick('edit')" type="primary">编辑</el-button>
      <el-button class="t-button" @click="handleTypeClick('delete')" type="primary">删除</el-button>
      <img @click="hideView" class="t-close" src="@/assets/img/close.png" />
    </flexbox>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '详情'
    }
  },
  methods: {
    handleTypeClick (type) {
      if (type === 'edit') {
        this.$emit('handle', { type: 'edit' })
      } else if (
        type === 'delete'
      ) {
        var message = ''
        if (type === 'delete') {
          message = '确定要删除吗？'
        }
        this.$confirm(message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmHandle(type)
        }).catch(() => {})
      }
    },
    confirmHandle (type) {
      this.$message({
        type: 'success',
        message: '操作成功'
      })
    },
    hideView () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.t-section {
  position: relative;
  padding: 10px 17px;
  min-height: 60px;
  .t-name {
    font-size: 14px;
    color: #333;
    flex: 1;
  }
  .t-button {
    padding: 5px 15px;
    margin-right: 10px;
  }
  .t-close {
    display: block;
    width: 40px;
    height: 40px;
    margin-left: 20px;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
