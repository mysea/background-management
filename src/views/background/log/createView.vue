<template>
  <create-view
    :loading="loading"
    :body-style="{ height: '100%' }">
    <flexbox
      direction="column"
      align="stretch"
      class="create-container">
      <flexbox class="create-header">
        <div class="title">{{ title }}</div>
        <img @click="hidenView" class="close" src="@/assets/img/close.png"/>
      </flexbox>
      <div class="create-flex">
        <flexbox direction="column" align="stretch">
          <div class="create-body">
            <el-form
              ref="form"
              :model="form"
              label-position="top"
              class="create-box">
              <el-form-item
                v-for="(item, index) in fields"
                :key="index"
                class="create-item">
                <div slot="label" class="item">
                  <div class="label">{{ item.name }}</div>
                </div>
                <component :is="item.formType | typeToComponentName"
                  :index="index"
                  :item="item"
                  :disabled="item.disabled"
                  @value-change="fieldValueChange">
                </component>
                </el-form-item>
            </el-form>
          </div>
        </flexbox>
      </div>

      <div class="handle-bar">
        <el-button class="handle-button" @click="hidenView">取消</el-button>
        <el-button class="handle-button" type="primary">保存</el-button>
      </div>
    </flexbox>
  </create-view>
</template>

<script>
import CreateView from '@/components/CreateView'
import {
  XInput,
  XTextarea,
  XSelect,
  XMultipleSelect,
  XDate,
  XDateTime
} from '@/components/form'
export default {
  components: {
    CreateView,
    XInput,
    XTextarea,
    XSelect,
    XMultipleSelect,
    XDate,
    XDateTime
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      default: () => {
        return {
          type: 'save',
          id: '',
          data: {}
        }
      }
    }
  },
  data () {
    return {
      title: '',
      loading: false,
      fields: [
        { fieldId: 161, formType: "select", isNull: 0, name: "客户级别", options: "A（重点客户）,B（普通客户）,C（非优先客户）" },
        { fieldId: 2509, formType: "text", isNull: 0, name: "电话", options: null, isUnique: 0, inputTips: null },
        { fieldId: 2512, formType: "datetime", isNull: 0, name: "下次联系时间", options: null, isUnique: 0 },
        { fieldId: 2513, formType: "text", isNull: 0, name: "备注", options: null, isUnique: 0, inputTips: null },
        { fieldId: 2593, formType: "textarea", isNull: 0, name: "多行文本", options: null, isUnique: 0 }
      ],
      form: {
        name: '',
        year: ''
      }
    }
  },
  filters: {
    typeToComponentName (formType) {
      if (
        formType === 'text' ||
        formType === 'number' ||
        formType === 'floatnumber' ||
        formType === 'mobile' ||
        formType === 'email'
      ) {
        return 'XInput'
      } else if (formType === 'textarea') {
        return 'XTextarea'
      } else if (formType === 'select') {
        return 'XSelect'
      } else if (formType === 'checkbox') {
        return 'XMultipleSelect'
      } else if (formType === 'date') {
        return 'XDate'
      } else if (formType === 'datetime') {
        return 'XDateTime'
      }
    }
  },
  watch: {
    type: function (value) {
      this.title = this.getTitle()
    }
  },
  mounted () {
    this.title = this.getTitle()
  },
  methods: {
    getTitle () {
      if (this.type === 'website') {
        return this.info.type === 'save' ? '新建站点' : '编辑站点'
      }
    },
    hidenView () {
      this.$emit('hiden-view')
    },
    fieldValueChange (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.create-container {
  position: relative;
  height: 100%;
}
.create-header {
  height: 40px;
  margin-bottom: 20px;
  padding: 0 10px;
  flex-shrink: 0;
  .title {
    flex:1;
    font-size:17px;
    color:#333;
  }
  .close {
    display: block;
    width: 40px;
    height: 40px;
    margin-right: -10px;
    padding: 10px;
    cursor: pointer;
  }
}
.create-flex {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
}
.create-body {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
.create-box {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .item {
    display: inline-block;
    .label {
      margin: 5px 0;
      font-size: 12px;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
.create-item {
  flex: 0 0 50%;
  flex-shrink: 0;
  padding-bottom: 10px;
  padding-left: 0px;
  padding-right: 25px;
}
.create-block-item {
  flex: 0 0 100%;
  flex-shrink: 0;
  padding-bottom: 10px;
}

.handle-bar {
  position: relative;
  .handle-button {
    float: right;
    margin-top: 5px;
    margin-right: 20px;
  }
}

.el-form /deep/ .el-form-item {
  margin-bottom: 0px;
}
.el-form-item /deep/ .el-form-item__label {
  line-height: normal;
  font-size: 13px;
  color: #333333;
  position: relative;
  padding-left: 8px;
  padding-bottom: 0;
}
.el-form /deep/ .el-form-item.is-required .el-form-item__label:before {
  content: '*';
  color: #f56c6c;
  margin-right: 4px;
  position: absolute;
  left: 0;
  top: 5px;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
