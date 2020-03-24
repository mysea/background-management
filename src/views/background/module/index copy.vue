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
              <el-button type="text" size="mini" @click="() => edit(node, data)">
                <i class="el-icon-edit"></i>
              </el-button>              
              <el-button type="text" size="mini" @click="() => remove(node, data)">
                <i class="el-icon-close"></i>  
              </el-button>              
            </div>
          </flexbox>  
        </el-tree>
      </div>

      <!-- 右边内容 -->
      <div class="content">
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
        <el-form-item label="图标类名" prop="icon_name">
          <el-input v-model="moduleForm.icon_name"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="sort_no">
          <el-input v-model="moduleForm.sort_no"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitDialog">保 存</el-button>
        <el-button @click="isShowDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let id = 100
import {
  getModules,
  addModule,
  updateModule,
  deleteModule
  } from '@/api/background'
import { createTree } from '@/utils'
export default {
  data () {
    return {
      navLoading: false,
      treeList: [],
      currentNodeData: {},
      parentNodeData: {},
      // 新建或编辑
      dialogTitle: '',
      isShowDialog: false,
      dialogLoading: false,
      moduleForm: {
        name: '',
        code: '',
        url: '',
        icon_name: '',
        sort_no: '',
        parent_id: ''
      },
      moduleFormRules: {
        name: [
          { required: true, message: '请输入模块名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入模块标识', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入模块路径', trigger: 'blur' }
        ]
      }

    }
  },
  created () {
    this.getModuleList()
  },
  methods: {
    getModuleList () {
      let data = {
        pageIndex: 1,
        pagesize: 10
      }
      this.navLoading = true
      getModules(data).then(res => {
        let data = res
        data.push({ name: '项目协同平台', id: null, parent_id: '0' })
        this.treeList = createTree(data, '0')
        this.navLoading = false
      })
    },
    handleNodeClick (data) {
      // console.log(data)
    },
    append (node, data) {
      this.isShowDialog = true
      this.dialogTitle = '新建'
      // this.currentNodeData = data
      // this.parentNodeData = node.parent.data
      this.moduleForm['parent_id'] = data.id
    },
    edit (node, data) {
      this.isShowDialog = true
      this.dialogTitle = '编辑'
      // this.currentNodeData = data
      // this.parentNodeData = node.parent.data
      this.moduleForm = data.orignData
    },
    remove (node, data) {
      this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteModule(data.id).then(res => {
            if (res) {        
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              const parent = node.parent
              const children = parent.data.children || parent.data
              const index = children.findIndex(d => d.id === data.id)
              children.splice(index, 1)
            }
          })
        }).catch(() => {})
    },
    // 新建或编辑
    submitDialog () {
      var _this = this
      _this.$refs.moduleForm.validate(valid => {
        if (valid) {
          if (_this.dialogTitle === '新建') {
            _this.dialogLoading = true  
            addModule(_this.moduleForm).then(res => {
              _this.dialogLoading = false
              if (res) {
                _this.isShowDialog = false
                _this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
                _this.getModuleList()
                // if (!_this.currentNodeData.children) {
                //   _this.$set(_this.currentNodeData, 'children', [])
                // }
                // _this.currentNodeData.children.push({
                //   id: id++,
                //   label: _this.moduleForm.name,
                //   children: []
                // })
              }
            })
          } else {
            _this.dialogLoading = true
            updateModule(_this.moduleForm.id, _this.moduleForm).then(res => {
              _this.dialogLoading = false
              if (res) {
                _this.isShowDialog = false
                _this.$message({
                  type: 'success',
                  message: '保存成功!'
                })
                _this.getModuleList()
                // const children = _this.parentNodeData.children || []
                // const index = children.findIndex(d => d.id === _this.currentNodeData.id)
                // _this.currentNodeData.label = _this.moduleForm.name
                // children.splice(index, 1, _this.currentNodeData)
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
