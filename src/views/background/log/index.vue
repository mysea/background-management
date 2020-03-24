<template>
  <div>
    <select-website @change="websiteChange"></select-website>

    <div class="table-container">
      <div class="search-content">
        <div class="search-item">
          <label class="label">模块</label>
          <div class="item">
            <el-select v-model="logModule" placeholder="请选择" @change="logModuleChange">
              <el-option
                v-for="item in logModuleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search-item">
          <label class="label">模块列表</label>
          <div class="item">
            <el-select v-model="logSubModule" placeholder="请选择">
              <el-option
                v-for="item in logSubModuleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="search-item">
          <label class="label">操作对象</label>
          <div class="item">
            <el-input v-model="operation" placeholder="请输入操作对象"></el-input>
          </div>
        </div>
        <div class="search-item">
          <div class="button">
            <div>
              <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="select-box">
        <div class="select-group">
          <label>模块</label>
          <el-select v-model="logModule" placeholder="请选择" @change="logModuleChange">
            <el-option
              v-for="item in logModuleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select-group">
          <label>模块列表</label>
          <el-select v-model="logSubModule" placeholder="请选择">
            <el-option
              v-for="item in logSubModuleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="select-group">
          <label>操作对象</label>
          <el-input v-model="operation" placeholder="请输入操作对象"></el-input>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </div>
      </div> -->
      <el-table
        v-loading="loading"
        ref="table"
        :data="list"
        :height="tableHeight"
        @row-click="handleRowClick"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
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
</template>

<script>
import table from '../mixins/table'
// import { getLogModule } from '@/api/background'
export default {
  mixins: [table],
  data () {
    return {
      type: 'log',
      websiteid: '',
      logModule: '',
      logModuleOptions: [],
      logSubModule: '',
      logSubModuleOptions: [],
      operation: ''
    }
  },
  methods: {
    websiteChange (websiteid) {
      this.websiteid = websiteid
      this.getLogModules()
      this.getList()
    },
    getLogModules () {
      let params = {
        'page_number': 1,
        'page_size': 9999,
        'websiteid': this.websiteid
      }
      // getLogModule(params).then(res => {
      //   let data = res.data
      //   data.map(item => {
      //     this.logModuleOptions.push({
      //       'label': item['module'],
      //       'value': item['Id'],
      //       'moduleid': item['moduleid']
      //     })
      //   })
      // })
    },
    logModuleChange (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/table.scss';
.select-box {
  display: flex;
  flex-flow: row wrap;
  justify-content: left;
  margin: 20px 15px;
  .select-group {
    display: flex;
    align-items: center;
    margin-right: 15px;
    label {
      color: #999;
      margin-right: 10px;
    }
    /deep/ {
      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.search-content {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  .search-item {
    padding-left: 0px;
    padding-right: 25px;
    -ms-flex-negative: 0;
    padding-bottom: 10px;
    .label {
      line-height: normal;
      font-size: 13px;
      color: #333;
      position: relative;
      padding-bottom: 0;
    }
    .item {
      line-height: 40px;
      position: relative;
      font-size: 14px;
    }
    .button {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
</style>
