import {
  getPrivileges,
  getDictionarys,
  getRoleUsers,
  getWebsites
} from '@/api/background'
import { getUsers } from '@/api/user'
export default {
  data () {
    return {
      loading: false,
      tableHeight: document.documentElement.clientHeight - this.getConstHeight(),
      list: [],
      selectionsList: [],
      total: 0,
      pageSize: 50,
      pageSizes: [100, 50, 30, 10],
      currentPage: 1,
      sortKey: '',
      sortOrder: ''
    }
  },
  mounted () {
    window.onresize = () => {
      this.updateTableHeight()
    }
  },
  methods: {
    search () {
      this.currentPage = 1
      this.getList()
    },
    reset () {
      this.sortKey = ''
      this.sortOrder = ''
      this.currentPage = 1
      this.pageSize = 50
      this.getList()
    },
    getList () {
      var _this = this
      _this.loading = true
      var params = {
        pageIndex: _this.currentPage,
        pagesize: _this.pageSize
      }
      var request = null
      if (_this.type === 'dictionary') {
        request = getDictionarys(params)
      } else if (_this.type === 'user') {
        params.departmentid = this.departmentid
        params.showNodes = this.showNodes
        request = getUsers(params)
      } else if (_this.type === 'priviledge') {
        params.module_id = this.module_id
        request = getPrivileges(params)
      } else if (_this.type === 'roleUser') {
        request = getRoleUsers(this.role.id)
      } else if (_this.type === 'website') {
        request = getWebsites(params)
      }
      if (_this.type === 'roleUser') {
        request.then(res => {
          _this.loading = false
          _this.list = res
          _this.total = res.length
        })
      } else {
        request.then(res => {
          _this.loading = false
          _this.list = res.list
          _this.total = res.paginationMetadata.totalCount
        })
      }
    },
    exportList () {},
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      if (column.property === 'module') {
        return { color: '#3E84E9', cursor: 'pointer' }
      } else {
        return ''
      }
    },
    handleRowClick (row, column, event) {
      console.log(column.property, column.label)
    },
    handleSelectionChange (val) {
      this.selectionsList = val
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(function (row) {
          this.$refs.table.toggleSelection(row)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    sortChange ({ column, prop, order }) {
      if (prop && order) {
        this.currentPage = 1
        this.sortKey = prop
        this.sortOrder = order
        this.getList()
      } else {
        this.currentPage = 1
        this.sortKey = ''
        this.sortOrder = ''
        this.getList()
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getList()
    },
    getConstHeight () {
      let constHeight = 0
      if (this.type === 'roleUser') {
        constHeight = 235
      } else {
        constHeight = 184
      }
      return constHeight
    },
    updateTableHeight () {
      this.tableHeight = document.documentElement.clientHeight - this.getConstHeight()
    }
  }
}
