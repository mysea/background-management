<template>
  <div class="wrapper">
    <div class="container">
      <div class="content">
        <div class="table-top">
          <el-input placeholder="搜索字典标识" v-model="searchInput" class="search" clearable @clear="getList">
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
          <el-button type="primary" class="table-top-button" @click="newDictionary">新建字典</el-button>
        </div>
        <el-table
          v-loading="loading"
          ref="table"
          :data="list"
          :height="tableHeight">
          <el-table-column prop="group" show-overflow-tooltip label="组"></el-table-column>
          <el-table-column prop="type" show-overflow-tooltip label="组类型"></el-table-column>
          <el-table-column prop="code" show-overflow-tooltip label="字典标识"></el-table-column>
          <el-table-column prop="remark" show-overflow-tooltip label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
              <el-button @click="handleClick('edit', scope.row)" type="text" size="small">编辑</el-button>
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

    <!-- 新建或编辑 -->
    <el-dialog :title="dialogTitle"
      :visible.sync="isShowDialog"
      width="40%"
      v-loading="dialogLoading"
      :close-on-click-modal="false"
      @close="closeDialog">
      <el-form
        :model="dictionaryForm"
        :rules="dictionaryFormRules"
        ref="dictionaryForm"
        label-width="80px"
        label-position="right">
        <el-form-item label="组" prop="group">
          <el-input v-model="dictionaryForm.group"></el-input>
        </el-form-item>
        <el-form-item label="组类型" prop="type">
          <el-input v-model="dictionaryForm.type"></el-input>
        </el-form-item>
        <el-form-item label="字典标识" prop="code">
          <el-input v-model="dictionaryForm.code"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dictionaryForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="submitForm('dictionaryForm')">保 存</el-button>
        <el-button @click="isShowDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addDictionary,
  updateDictionary,
  deleteDictionary
  } from '@/api/background'
import {
  saveSuccessToast,
  deleteSuccessToast,
  deleteConfirm
  } from '@/utils/toast'
import table from '../mixins/table'
export default {
  mixins: [table],
  data () {
    return {
      type: 'dictionary',
      dialogTitle: '',
      isShowDialog: false,
      dialogLoading: false,
      dictionaryForm: {
        code: '',
        group: '',
        type: '',
        remark: ''
      },
      dictionaryFormRules: {
        code: [
          { required: true, message: '请输入字典标识', trigger: 'blur' }
        ],
        group: [
          { required: true, message: '请输入组', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入组类型', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    newDictionary () {
      this.isShowDialog = true
      this.dialogTitle = '新建'
    },
    handleClick (type, row) {
      if (type === 'edit') {
        this.isShowDialog = true
        this.dialogTitle = '编辑'
        this.dictionaryForm = JSON.parse(JSON.stringify(row))
      } else {
        deleteConfirm().then(() => {
          deleteDictionary(row.id).then(res => {
            if (res) {        
              deleteSuccessToast()
              this.getList()
            }
          })
        }).catch(() => {})
      }
    },
    submitForm (formName) {
      var _this = this
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.dialogTitle === '新建') {
            _this.dialogLoading = true  
            addDictionary(_this.dictionaryForm).then(res => {
              _this.dialogLoading = false
              if (res) {
                _this.isShowDialog = false
                saveSuccessToast()
                _this.getList()
              }
            })
          } else {
            _this.dialogLoading = true
            updateDictionary(_this.dictionaryForm.id, _this.dictionaryForm).then(res => {
              _this.dialogLoading = false
              if (res) {
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
    closeDialog () {
      this.isShowDialog = false
      this.resetForm('dictionaryForm')
    },
    resetForm (formName) {
      this.dictionaryForm = {
        code: '',
        group: '',
        type: '',
        remark: ''
      }
      this.$refs[formName].resetFields()
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
.content {
  background: #fff;
  border: 1px solid #e6e6e6;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
