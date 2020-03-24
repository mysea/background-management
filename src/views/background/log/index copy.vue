<template>
  <div>
    <div class="table-container">
      <el-table class="n-table--border"
        v-loading="loading"
        ref="table"
        :data="list"
        style="width: 100%"
        stripe
        border
        highlight-current-row
        :height="tableHeight"
        :cell-style="cellStyle"
        @row-click="handleRowClick"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="module" label="模块" show-overflow-tooltip fixed></el-table-column>
        <el-table-column prop="submodule" label="子模块" show-overflow-tooltip></el-table-column>
        <el-table-column prop="operation_description" label="操作对象" show-overflow-tooltip></el-table-column>
        <el-table-column prop="operation_type" label="操作类型" show-overflow-tooltip width="80"></el-table-column>
        <el-table-column prop="field" label="字段" show-overflow-tooltip></el-table-column>
        <el-table-column prop="old_value" label="旧值" show-overflow-tooltip></el-table-column>
        <el-table-column prop="new_value" label="新值" show-overflow-tooltip></el-table-column>
        <el-table-column prop="owneridname" label="操作人" show-overflow-tooltip width="90"></el-table-column>
        <el-table-column prop="createdon" label="操作时间" show-overflow-tooltip width="150" sortable></el-table-column>
      </el-table>
      <div class="p-contianer">
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
</template>

<script>
import table from '../mixins/table'
export default {
  mixins: [table],
  data () {
    return {
      type: 'log'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
</style>
