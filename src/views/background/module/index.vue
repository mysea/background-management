<template>
  <div class="wrapper">
    <div class="container">
      <!-- 左边导航 -->
      <div class="nav" v-loading="navLoading">
        <el-tree
          :data="treeList"
          node-key="id"
          @node-click="handleNodeClick"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current>
          <flexbox class="node-data" slot-scope="{ node, data }">
            <div class="node-label">{{ node.label }}</div>
            <div class="node-label-set">
              <el-button type="text" size="mini" @click="() => append(node, data)">
                <i class="el-icon-plus"></i>
              </el-button>
              <!-- 根节点是站点名字，只能新建，可以根据node.level === 1或data.id是否为null进行判断 -->
              <el-button type="text" size="mini" @click="() => edit(node, data)" v-show="data.id">
                <i class="el-icon-edit"></i>
              </el-button>              
              <el-button type="text" size="mini" @click="() => remove(node, data)" v-show="data.id">
                <i class="el-icon-close"></i>  
              </el-button>              
            </div>
          </flexbox>  
        </el-tree>
      </div>

      <!-- 右边内容 -->
      <div class="content">
        <div class="table-top">
          <el-input placeholder="搜索权限名称" v-model="searchInput" class="search" clearable @clear="getList">
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
          <el-button type="primary" class="table-top-button" @click="newAuth">新建权限</el-button>
        </div>
        <el-table
          v-loading="loading"
          ref="table"
          :data="list"
          :height="tableHeight">
          <el-table-column prop="name" show-overflow-tooltip label="权限名称"></el-table-column>
          <el-table-column prop="type" show-overflow-tooltip label="权限标识"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="handleClick('delete', scope.row)" type="text" size="small">删除</el-button>
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
    </div>

    <!-- 模块 -->
    <el-dialog :title="dialogTitle"
      :visible.sync="isShowDialog"
      width="40%"
      v-loading="dialogLoading"
      :close-on-click-modal="false"
      @close="closeDialog">
      <el-form
        :model="moduleForm"
        :rules="moduleFormRules"
        ref="moduleForm"
        label-width="80px"
        label-position="right">
        <el-form-item label="模块名称" prop="name">
          <el-input v-model="moduleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="模块标识" prop="code">
          <el-input v-model="moduleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="模块路径" prop="url">
          <el-input v-model="moduleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="模块图标" prop="icon_name">
          <div class="icons-box">
            <div class="select-icon">
              <i :class="['grg grg-' + moduleForm.icon_name]"></i>
            </div>
            <Icons @save="selectIcon"></Icons>
          </div>
        </el-form-item>
        <el-form-item label="排序号" prop="sort_num">
          <el-input v-model="moduleForm.sort_num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitForm('moduleForm')">保 存</el-button>
        <el-button @click="isShowDialog = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 权限 -->
    <el-dialog title="新建"
      :visible.sync="isShowAuthDialog"
      width="40%"
      v-loading="dialogLoading"
      :close-on-click-modal="false"
      @close="closeAuthDialog">
      <el-form
        :model="priviledgeForm"
        :rules="priviledgeFormRules"
        ref="priviledgeForm"
        label-width="80px"
        label-position="right">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="priviledgeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="type">
          <el-input v-model="priviledgeForm.type"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitForm('priviledgeForm')">保 存</el-button>
        <el-button @click="isShowAuthDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getModules,
  addModule,
  updateModule,
  deleteModule,
  addPrivilege,
  updatePrivilege,
  deletePrivilege
  } from '@/api/background'
import {
  saveSuccessToast,
  deleteSuccessToast,
  deleteConfirm
  } from '@/utils/toast'
import Icons from '@/components/icons'
import { mapGetters } from 'vuex'
import table from '../mixins/table'
export default {
  mixins: [table],
  components: {
    Icons
  },
  data () {
    return {
      type: 'priviledge',
      // 左侧导航
      navLoading: false,
      treeList: [],
      module_id: '',
      // 模块表单
      dialogTitle: '',
      isShowDialog: false,
      dialogLoading: false,
      moduleForm: {
        name: '',
        code: '',
        url: '',
        icon_name: '',
        sort_num: 0,
        parent_id: ''
      },
      moduleFormRules: {
        name: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入模块标识', trigger: 'blur' }
        ]
        // url: [
        //   { required: true, message: '请输入模块路径', trigger: 'blur' }
        // ]
      },
      // 权限表单
      isShowAuthDialog: false,
      priviledgeForm: {
        name: '',
        type: ''
      },
      priviledgeFormRules: {
        name: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入权限标识', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getModuleList()
  },
  computed: {
    ...mapGetters([
      'website'
    ])
  },
  watch: {
    website () {
      this.getModuleList()
    }
  },
  methods: {
    // 模块树数据
    getModuleList () {
      let data = {
        pageIndex: 1,
        pagesize: 1000,
        website_id: this.website.value
      }
      this.navLoading = true
      getModules(data).then(res => {
        let data = res.list
        // 根节点是站点名字
        data.push({ name: this.website.label, id: null, parent_id: '0' })
        this.treeList = this.createTree(data, '0')
        this.navLoading = false
      })
    },
    createTree (data, pid) {
      const treeList = []
      data.map(item => {
        if (item.parent_id === pid) {
          item.children = this.createTree(data, item.id)
          treeList.push({
            id: item.id,
            label: item.name,
            children: item.children,
            orignData: item
          })
        }
      })
      return treeList
    },
    // 模块树操作
    handleNodeClick (data) {
      if (data.id) { // 点击的是非根节点时才去获取权限列表
        this.module_id = data.id
        this.getList()
      }
    },
    append (node, data) {
      this.isShowDialog = true
      this.dialogTitle = '新建'
      this.moduleForm['parent_id'] = data.id
    },
    edit (node, data) {
      this.isShowDialog = true
      this.dialogTitle = '编辑'
      console.log(node)
      console.log(data)
      this.moduleForm = data.orignData
    },
    remove (node, data) {
      deleteConfirm().then(() => {
        deleteModule(data.id).then(res => {
          if (res) {
            deleteSuccessToast()
            const parent = node.parent
            const children = parent.data.children || parent.data
            const index = children.findIndex(d => d.id === data.id)
            children.splice(index, 1)
          }
        })
      }).catch(() => {})
    },
    // 权限操作
    newAuth () {
      if (!this.module_id) {
        this.$message.warning('请先选择模块')
        return
      }
      this.isShowAuthDialog = true
    },
    handleClick (type, row) {
      if (type === 'delete') {
        deleteConfirm().then(() => {
          deletePrivilege(row.id).then(res => {
            if (res) {
              deleteSuccessToast()
              this.getList()
            }
          })
        }).catch(() => {})
      }
    },
    // 表单操作
    submitForm (formName) {
      var _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === 'moduleForm') {
            if (_this.dialogTitle === '新建') {
              _this.dialogLoading = true
              _this.moduleForm.website_id = _this.website.value
              addModule(_this.moduleForm).then(res => {
                _this.dialogLoading = false
                if (res) {
                  _this.isShowDialog = false
                  saveSuccessToast()
                  _this.getModuleList()
                }
              })
            } else {
              _this.dialogLoading = true
              updateModule(_this.moduleForm.id, _this.moduleForm).then(res => {
                _this.dialogLoading = false
                if (res) {
                  _this.isShowDialog = false
                  saveSuccessToast()
                  _this.getModuleList()
                }
              })
            }
          } else {
            if (_this.module_id) { 
              _this.priviledgeForm.module_id = _this.module_id
              addPrivilege(_this.priviledgeForm).then(res => {
                if (res) {
                  _this.isShowAuthDialog = false
                  saveSuccessToast()
                  _this.getList()
                }
              })
            }
          }
        } else {
          return false
        }
      })
    },
    closeDialog () {
      this.isShowDialog = false
      this.resetForm('moduleForm')
    },
    closeAuthDialog () {
      this.isShowAuthDialog = false
      this.resetForm('priviledgeForm')
    },
    resetForm (formName) {
      if (formName === 'moduleForm') {  
        this.moduleForm = {
          name: '',
          code: '',
          url: '',
          icon_name: '',
          sort_num: 0,
          parent_id: ''
        }
      } else {
        this.priviledgeForm = {
          name: '',
          type: ''
        }
      }
      this.$refs[formName].resetFields()
    },
    selectIcon (iconName) {
      this.moduleForm.icon_name = iconName
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
}

.icons-box {
  display: flex;
  align-items: center;
  .select-icon {
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border: 1px dashed #999;
    border-radius: 4px;
    margin-right: 10px;
    i {
      font-size: 20px;
    }
  }
}

/** 树形结构 */
.el-tree /deep/ .el-tree-node__content {
  height: 30px;
  .node-data {
    .node-label {
      margin-right: 8px;
    }
    .node-label-set {
      display: none;
    }
  }
  .node-data:hover .node-label-set {
    display: block;
  }
}
.el-tree /deep/ .el-tree-node.is-current > .el-tree-node__content {
  background-color: #ebf3ff;
  // border-right: 2px solid #46cdcf;
  .node-label-set {
    display: block;
  }
}
</style>
