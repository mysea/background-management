<template>
  <div class="wrapper">
    <div class="container">
      <!-- 左边导航 -->
      <div class="nav" v-loading="navLoading">
        <div class="nav-new-btn">
          <el-button size="medium" @click="newRole">新建角色</el-button>
        </div>
        <div class="nav-box">
          <div class="item"
            v-for="(item, index) in roleList"
            :key="index"
            @click="selectRole(item)"
            :class="{ 'item-hover' : item.id === activeRole.id}">
            {{ item.name }}
            <div class="item-dropdown">
              <el-dropdown trigger="click" @command="handleRoleClick">
                <i class="el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>

      <!-- 右边内容 -->
      <div class="content">
        <el-tabs v-model="mainMenuIndex">
          <el-tab-pane label="角色权限" name="auth">
            <div class="auth-box" v-loading="ruleLoading">
              <module-tree :value="privilegeList" @save="saveUsePrivileges"></module-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane label="角色用户" name="user">
            <div class="user-box" v-loading="userLoading">
              <el-button type="primary" class="table-top-button" @click="relateUser">关联用户</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 新建或编辑 -->
    <el-dialog :title="dialogTitle"
      :visible.sync="isShowDialog"
      v-if="isShowDialog"
      width="40%"
      :close-on-click-modal="false"
      :modal-append-to-body="true"
      v-loading="dialogLoading"
      :append-to-body="true"
      :before-close="closeDialog">
      <el-form
        :model="roleForm"
        :rules="roleFormRules"
        ref="roleForm"
        label-width="80px"
        label-position="right">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitForm('roleForm')">保 存</el-button>
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
  getRoles,
  addRole,
  updateRole,
  deleteRole,
  getModules
} from '@/api/background'
import {
  saveSuccessToast,
  deleteSuccessToast,
  deleteConfirm
  } from '@/utils/toast'
import { XUserCell } from '@/components/form'
import ModuleTree from './ModuleTree'
export default {
  components: {
    XUserCell,
    ModuleTree
  },
  data () {
    return {
      navLoading: false,
      userLoading: false,
      ruleLoading: false,
      mainMenuIndex: 'auth',
      roleList: [],
      activeRole: {},
      // 角色表单
      dialogTitle: '',
      isShowDialog: false,
      dialogLoading: false,
      roleForm: {
        name: ''
      },
      roleFormRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      // 关联权限
      privilegeList: [1, 2, 5, 8],
      // 关联用户
      visible: false,
      selectedUsers: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    getRoleList () {
      let data = {
        pageIndex: 1,
        pagesize: 1000
      }
      this.navLoading = true
      getRoles(data).then(res => {
        this.navLoading = false
        this.roleList = res.list
      })
    },
    selectRole (item) {
      this.activeRole = item
      this.getUserPrivileges()
    },
    newRole () {
      this.isShowDialog = true
      this.dialogTitle = '新建'
    },
    handleRoleClick (command) {
      var role = this.activeRole
      if (role.id) {
        if (command === 'edit') {
          this.isShowDialog = true
          this.dialogTitle = '编辑'
          this.roleForm = JSON.parse(JSON.stringify(role))
        } else {
          deleteConfirm().then(() => {
            deleteRole(role.id).then(res => {
              if (res) {        
                deleteSuccessToast()
                this.getRoleList()
              }
            })
          }).catch(() => {})
        }
      }
    },
    // 新建或编辑
    submitForm (formName) {
      var _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.dialogTitle === '新建') {
            _this.dialogLoading = true
            addRole(_this.roleForm).then(res => {
              _this.dialogLoading = false
              if (res) {
                _this.isShowDialog = false
                _this.resetForm('roleForm')
                saveSuccessToast()
                _this.getRoleList()
              }
            })
          } else {
            _this.dialogLoading = true
            updateRole(_this.roleForm.id, _this.roleForm).then(res => {
              _this.dialogLoading = false
              if (res) {
                _this.isShowDialog = false
                _this.resetForm('roleForm')
                saveSuccessToast()
                _this.getRoleList()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    closeDialog () {
      this.isShowDialog = false
    },
    resetForm (formName) {
      this.roleForm = {
        name: ''
      }
      this.$refs[formName].resetFields()
    },
    // 关联权限
    getUserPrivileges () {
      getModules({}).then(res => {
        console.log(res)
      })
    },
    saveUsePrivileges (data) {
      this.privilegeList = data
    },
    // 关联用户
    relateUser () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleConfirm () {
      console.log(this.selectedUsers)
      this.visible = false
    },
    checkoutChange (data) {
      this.selectedUsers = data.value
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.container {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.nav {
  width: 200px;
  height: 100%;
  overflow: auto;
  padding-top: 10px;
  background: #fff;
  border: 1px solid #e6e6e6;
}
.content {
  background: #fff;
  border: 1px solid #e6e6e6;
  position: absolute;
  top: 0;
  left: 210px;
  bottom: 0;
  right: 0;
  .auth-box {
    padding: 0 17px;
  }
  .user-box {
    overflow: hidden;
  }
}

.nav-new-btn {
  text-align: center;
  padding-top: 15px;
  padding-bottom: 15px;
}
.nav-new-btn .el-button {
  background: #4ab8b8;
  border-color: #4ab8b8;
  color: #fff;
  width: 140px;
  border-radius: 2px;
}
.nav-box {
  line-height: 30px;
  overflow-y: auto;
  padding: 5px 0 20px 0;
  height: calc(100% - 65px);
  .item {
    color: #333;
    font-size: 13px;
    padding-left: 30px;
    height: 40px;
    line-height: 40px;
    border-right: 2px solid transparent;
    cursor: pointer;
    position: relative;
    .item-dropdown {
      position: absolute;
      top: 0;
      right: 8px;
      z-index: 1;
    }
  }
  .item:hover {
    background: #ebf3ff;
    border-right-color: #46cdcf;
  }
  .item-hover {
    background: #ebf3ff;
    border-right: 2px solid #46cdcf;
  }
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

.el-tabs /deep/ .el-tabs__header {
  padding: 0 17px;
  margin: 0 0 15px !important;
}
.el-tabs /deep/ .el-tabs__item {
  font-size: 13px !important;
  height: 40px !important;
  line-height: 40px !important;
}
</style>
