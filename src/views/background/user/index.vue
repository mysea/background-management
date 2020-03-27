<template>
  <div class="container">
    <!-- 左边导航 -->
    <div class="nav">
      <department-tree @click="clickDepartment"></department-tree>
    </div>

    <!-- 右边内容 -->
    <div class="content">
      <div class="table-top">
        <el-input placeholder="搜索姓名" v-model="searchInput" class="search" clearable @clear="getList">
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
      </div>
      <el-table
        stripe
        v-loading="loading"
        ref="table"
        :data="list"
        :height="tableHeight">
        <el-table-column prop="employeeid" show-overflow-tooltip label="工号"></el-table-column>
        <el-table-column prop="employeename" show-overflow-tooltip label="姓名"></el-table-column>
        <el-table-column prop="sex" show-overflow-tooltip label="性别"></el-table-column>
        <el-table-column prop="phone" show-overflow-tooltip label="手机"></el-table-column>
        <el-table-column prop="email" show-overflow-tooltip label="邮箱"></el-table-column>
        <el-table-column prop="employeestatus" show-overflow-tooltip label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick('password', scope.row)" type="text" size="small">修改密码</el-button>
            <el-button @click="handleClick('role', scope.row)" type="text" size="small">分配角色</el-button>
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
    </div>

    <change-password :value="currentUserId" :show.sync="showPasswordDiaolog" @close="showPasswordDiaolog = false"></change-password>
    <relate-roles :value.sync="roleList" :show.sync="showRoleDialog" @save="saveRoles" @close="showRoleDialog = false"></relate-roles>
  </div>
</template>

<script>
import ChangePassword from '@/components/ChangePassword'
import RelateRoles from './RelateRoles'
import DepartmentTree from './DepartmentTree'
import {
  getUserRoles,
  addUserRole
} from '@/api/user'
import {
  saveSuccessToast
  } from '@/utils/toast'
import table from '../mixins/table'
export default {
  mixins: [table],
  components: {
    ChangePassword,
    RelateRoles,
    DepartmentTree
  },
  data () {
    return {
      type: 'user',
      departmentid: '',
      showNodes: false,
      currentUserId: '',
      // 修改密码
      showPasswordDiaolog: false,
      // 分配角色
      showRoleDialog: false,
      roleList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    clickDepartment (data) {
      this.departmentid = data.id
      this.showNodes = data.checked
      this.getList()
    },
    handleClick (type, row) {
      this.currentUserId = row.employeeid
      if (type === 'password') {
        this.showPasswordDiaolog = true
      } else {
        this.getRoles()
      }
    },
    // 用户关联角色
    saveRoles (data) {
      addUserRole(this.currentUserId, data).then(res => {
        if (res) {
          this.roleList = []
          this.showRoleDialog = false
          saveSuccessToast()
        }
      })
    },
    // 获取用户已有角色
    getRoles () {
      getUserRoles(this.currentUserId).then(res => {
        this.roleList = []
        for (let i = 0; i < res.length; i++) {
          this.roleList.push(res[i]['id'])
        }
        this.showRoleDialog = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
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
.nav-box {
  line-height: 30px;
  overflow-y: auto;
  padding: 5px 0 20px 0;
  height: 100%;
}
.content {
  background: #fff;
  border: 1px solid #e6e6e6;
  position: absolute;
  top: 0;
  left: 210px;
  bottom: 0;
  right: 0;
}
</style>
