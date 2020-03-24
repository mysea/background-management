<template>
  <div class="wrapper">
    <div class="container">
      <div class="content">
        <el-table
          v-loading="loading"
          ref="table"
          :data="list"
          :height="tableHeight">
          <el-table-column prop="code" show-overflow-tooltip label="字典标识"></el-table-column>
          <el-table-column prop="group" show-overflow-tooltip label="所属组"></el-table-column>
          <el-table-column prop="type" show-overflow-tooltip label="所属组类型"></el-table-column>
          <el-table-column prop="remark" show-overflow-tooltip label="备注"></el-table-column>
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
import {
  addDictionary,
  updateDictionary,
  deleteDictionary
  } from '@/api/background'
import table from '../mixins/table'
export default {
  mixins: [table],
  data () {
    return {}
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
.table-top {
  padding: 10px 0;
}
</style>
