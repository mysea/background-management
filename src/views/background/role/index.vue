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
            <div class="auth-box" v-loading="authLoading">
              <relate-privilege :value="privilegeList" @save="saveUsePrivileges"></relate-privilege>
            </div>
          </el-tab-pane>
          <el-tab-pane label="角色用户" name="user">
            <div class="user-box" v-loading="userLoading">
              <relate-user :value="activeRole"></relate-user>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 新建或编辑 -->
    <el-dialog :title="dialogTitle"
      :visible.sync="isShowDialog"
      width="40%"
      v-loading="dialogLoading"
      :close-on-click-modal="false"
      @close="closeDialog">
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
  </div>
</template>

<script>
import {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
  getRolePrivileges,
  addRolePrivilege
} from '@/api/background'
import { mapGetters } from 'vuex'
import {
  saveSuccessToast,
  deleteSuccessToast,
  deleteConfirm
  } from '@/utils/toast'
import RelatePrivilege from './RelatePrivilege'
import RelateUser from './RelateUser'
export default {
  components: {
    RelatePrivilege,
    RelateUser
  },
  data () {
    return {
      navLoading: false,
      userLoading: false,
      authLoading: false,
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
      privilegeList: []
    }
  },
  created () {
    this.getRoleList()
  },
  computed: {
    ...mapGetters([
      'website'
    ])
  },
  watch: {
    website () {
      this.getRoleList()
    }
  },
  methods: {
    getRoleList () {
      if (this.website.value) {
        let data = {
          pageIndex: 1,
          pagesize: 1000,
          website_id: this.website.value
        }
        this.navLoading = true
        getRoles(data).then(res => {
          this.navLoading = false
          this.roleList = res.list
        })
      }
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
            _this.roleForm.website_id = _this.website.value
            addRole(_this.roleForm).then(res => {
              _this.dialogLoading = false
              if (res) {
                _this.isShowDialog = false
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
      this.resetForm('roleForm')
    },
    resetForm (formName) {
      this.roleForm = {
        name: ''
      }
      this.$refs[formName].resetFields()
    },
    // 关联权限
    getUserPrivileges () {
      this.authLoading = true
      getRolePrivileges(this.activeRole.id).then(res => {
        this.authLoading = false
        var tempList = res.map(item => {
          return item.id
        })
        this.privilegeList = tempList
      })
    },
    saveUsePrivileges (data) {
      if (!this.activeRole.id) {
        this.$message.warning('请先选择角色')
        return
      }
      this.privilegeList = data
      this.authLoading = true
      addRolePrivilege(this.activeRole.id, this.privilegeList).then(res => {
        this.authLoading = false
        if (res) {
          saveSuccessToast()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
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
  }
  .user-box {
    overflow: hidden;
  }
  .org-container {
    min-height: 34px;
    margin: 3px 0;
    position: relative;
    border-radius: 3px;
    font-size: 12px;
    border: 1px solid #ddd;
    color: #333333;
    padding: 0.5px;
    line-height: 15px;
    overflow-y: auto;
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
