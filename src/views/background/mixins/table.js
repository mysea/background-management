import {
  getPrivileges,
  getDictionarys,
  getRoleUsers,
  getWebsites,
  getLocales
} from '@/api/background'
import { getUsers } from '@/api/user'
export default {
  data () {
    return {
      loading: false,
      searchInput: '', // 搜索框文本
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
        params.code = this.searchInput
        request = getDictionarys(params)
      } else if (_this.type === 'user') {
        params.employeename = this.searchInput
        params.departmentid = this.departmentid
        params.showNodes = this.showNodes
        request = getUsers(params)
      } else if (_this.type === 'priviledge') {
        params.name = this.searchInput
        params.module_id = this.module_id
        request = getPrivileges(params)
      } else if (_this.type === 'roleUser') {
        request = getRoleUsers(this.role.id)
      } else if (_this.type === 'website') {
        params.name = this.searchInput
        request = getWebsites(params)
      } else if (_this.type === 'locale') {
        params.showLocalizedLabel = true
        request = getLocales(params)
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
        constHeight = 239
      } else {
        constHeight = 188
      }
      return constHeight
    },
    updateTableHeight () {
      this.tableHeight = document.documentElement.clientHeight - this.getConstHeight()
    }
  }
}
