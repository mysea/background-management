<template>
  <div>
    <div class="table-top">
      <el-button type="primary" class="table-top-button" @click="relateUser">关联用户</el-button>
    </div>
    <el-table
      stripe
      v-loading="loading"
      ref="table"
      :data="list"
      :height="tableHeight1">
      <el-table-column prop="employeeid" show-overflow-tooltip label="工号"></el-table-column>
      <el-table-column prop="employeename" show-overflow-tooltip label="姓名"></el-table-column>
      <el-table-column prop="sex" show-overflow-tooltip label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex === '2' ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" show-overflow-tooltip label="手机"></el-table-column>
      <el-table-column prop="email" show-overflow-tooltip label="邮箱"></el-table-column>
      <el-table-column prop="employeestatus" show-overflow-tooltip label="状态">
        <template slot-scope="scope">
          {{ scope.row.employeestatus === 0 ? '停用' : '启用' }}
        </template>
      </el-table-column>
    </el-table>
    <div class="p-container">
      <el-pagination class="p-bar"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 关联用户 -->
    <el-dialog
      title="关联用户"
      :visible="visible"
      @close="handleCancel"
      :append-to-body="true"
      width="600px">
      <div class="handle-box">
        <flexbox class="handle-item" align="stretch">
          <div class="handle-item-name" style="margin-top: 8px;">选择用户：</div>
          <x-user-cell
            ref="xUserCell"
            :value="selectedUsers"
            @value-change="checkoutChange"
            class="handle-item-content"></x-user-cell>
        </flexbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addRoleUser
  } from '@/api/background'
import {
  saveSuccessToast
  } from '@/utils/toast'
import { XUserCell } from '@/components/form'
import table from '../mixins/table'
export default {
  mixins: [table],
  components: {
    XUserCell
  },
  props: {
    value: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      type: 'roleUser',
      // 关联用户
      role: '',
      visible: false,
      selectedUsers: []
    }
  },
  watch: {
    value (val) {
      this.role = val
      if (this.role.id) {
        this.getList()
      }
    }
  },
  mounted () {
    this.role = this.value
    if (this.role.id) {
      this.getList()
    }
  },
  methods: {
    // 关联用户
    relateUser () {
      if (!this.role.id) {
        this.$message.warning('请先选择角色')
        return
      }
      this.visible = true
    },
    handleCancel () {
      this.visible = false
      if (this.$refs.xUserCell) {
        this.$refs.xUserCell.resetData()
      }
    },
    handleConfirm () {
      this.visible = false
      var userIdList = this.selectedUsers.map(item => {
        return item.id
      })
      if (userIdList.length) {
        addRoleUser(this.role.id, userIdList).then(res => {
          if (res) {
            saveSuccessToast()
            this.selectedUsers = []
            this.getList()
          }
        })
      }
    },
    checkoutChange (data) {
      this.selectedUsers = data.value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
.handle-box {
  color: #333;
  font-size: 12px;
  .handle-item {
    padding-bottom: 15px;
    .handle-item-name {
      flex-shrink: 0;
      width: 90px;
    }
    .handle-item-content {
      flex: 1;
    }
  }
}
</style>
