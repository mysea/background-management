<template>
  <div class="wrapper">
    <div class="container">
      <div class="content">
        <div class="table-top">
          <el-select v-model="language_id" placeholder="请选择语言" @change="languageChange">
            <el-option
              v-for="item in languageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" class="table-top-button" @click="submitForm">保存</el-button>
        </div>
        <el-table
          v-loading="loading"
          ref="table"
          :data="list"
          :height="tableHeight">
          <el-table-column prop="group" show-overflow-tooltip label="组"></el-table-column>
          <el-table-column prop="type" show-overflow-tooltip label="组类型"></el-table-column>
          <el-table-column prop="code" show-overflow-tooltip label="字典标识"></el-table-column>
          <el-table-column fixed="right" label="翻译" width="250">
            <template slot-scope="scope">
              <el-input v-model="scope.row.common_LocalizedLabels" placeholder="请输入内容"></el-input>
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
  </div>
</template>

<script>
import { addLocale } from '@/api/background'
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
      type: 'locale',
      language_id: 2052,
      languageOptions: [
        {
          label: '中文',
          value: 2052
        },
        {
          label: 'English',
          value: 1033
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    languageChange () {
      this.getList()
    },
    submitForm () {
      let language_id = this.language_id
      let tempList = this.list.map(item => {
        return {
          dictionary_id: item.id,
          language_id: language_id,
          label: item.common_LocalizedLabels
        }
      })
      addLocale(tempList).then(res => {
        if (res) {
          saveSuccessToast()
          this.getList()
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
