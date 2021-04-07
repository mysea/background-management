<template>
  <div class="content">
    <div class="table-top">
      <el-input placeholder="搜索站点名称" v-model="searchInput" class="search" clearable @clear="getList">
        <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
      </el-input>
      <el-button type="primary" class="table-top-button" @click="newWebsite">新建站点</el-button>
    </div>
    <el-table
      v-loading="loading"
      ref="table"
      :data="list"
      :height="tableHeight"
      @row-click="handleRowClick"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange">
      <el-table-column prop="name" label="站点名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="站点描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="home_url" label="首页url" show-overflow-tooltip></el-table-column>
      <el-table-column label="是否启用" width="150">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status === 1">启用</el-tag>
          <el-tag type="danger" size="small" v-else>停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick('edit', scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleClick('relateUser', scope.row)" type="text" size="small">关联用户</el-button>
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

    <!-- 新建或编辑 -->
    <el-dialog :title="dialogTitle"
      :visible.sync="isShowDialog"
      width="40%"
      v-loading="dialogLoading"
      :close-on-click-modal="false"
      @close="closeDialog">
      <el-form
        :model="websiteForm"
        :rules="websiteFormRules"
        ref="websiteForm"
        label-width="80px"
        label-position="right">
        <el-form-item label="站点名称" prop="name">
          <el-input v-model="websiteForm.name"></el-input>
        </el-form-item>
        <el-form-item label="站点描述" prop="description">
          <el-input v-model="websiteForm.description"></el-input>
        </el-form-item>
        <el-form-item label="首页url" prop="home_url">
          <el-input v-model="websiteForm.home_url"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch v-model="websiteForm.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitForm('websiteForm')">保 存</el-button>
        <el-button @click="isShowDialog = false">取 消</el-button>
      </span>
    </el-dialog>

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
  addWebsite,
  updateWebsite,
  deleteWebsite,
  addWebsiteUser
} from '@/api/background'
import {
  saveSuccessToast,
  deleteSuccessToast,
  deleteConfirm
  } from '@/utils/toast'
import table from '../mixins/table'
import { XUserCell } from '@/components/form'
export default {
  mixins: [table],
  components: {
    XUserCell
  },
  data () {
    return {
      type: 'website',
      //新建或编辑
      dialogTitle: '',
      isShowDialog: false,
      dialogLoading: false,
      websiteForm: {
        name: '',
        description: '',
        home_url: '',
        status: 0
      },
      websiteFormRules: {},
      // 关联用户
      websiteid: '',
      visible: false,
      selectedUsers: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    newWebsite () {
      this.isShowDialog = true
      this.dialogTitle = '新建'
    },
    handleClick (type, row) {
      if (type === 'edit') {
        this.isShowDialog = true
        this.dialogTitle = '编辑'
        this.websiteForm = JSON.parse(JSON.stringify(row))
        this.websiteForm.status = this.websiteForm.status === 1
      } else {
        this.visible = true
        this.websiteid = row.id
      }
    },
    closeDialog () {
      this.isShowDialog = false
      this.resetForm('websiteForm')
    },
    submitForm (formName) {
      var _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.websiteForm.status = _this.websiteForm.status ? 1 : 0
          if (_this.dialogTitle === '新建') {
            _this.dialogLoading = true
            addWebsite(_this.websiteForm).then(res => {
              _this.dialogLoading = false
              if (res) {
                // 通知选择站点组件更新数据
                _this.$bus.emit('updateWebsite', '')
                _this.isShowDialog = false
                saveSuccessToast()
                _this.getList()
              }
            })
          } else {
            _this.dialogLoading = true
            updateWebsite(_this.websiteForm.id, _this.websiteForm).then(res => {
              _this.dialogLoading = false
              if (res) {
                // 通知选择站点组件更新数据
                _this.$bus.emit('updateWebsite', '')
                _this.isShowDialog = false
                saveSuccessToast()
                _this.getList()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.websiteForm = {
        name: '',
        description: '',
        home_url: '',
        status: 0
      }
      this.$refs[formName].resetFields()
    },
    // 关联用户
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
        addWebsiteUser(this.websiteid, userIdList).then(res => {
          if (res) {
            saveSuccessToast()
            this.selectedUsers = []
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
.content {
  background: #fff;
  border: 1px solid #e6e6e6;
}

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
