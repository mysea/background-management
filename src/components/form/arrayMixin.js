export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    index: Number,
    item: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataValue: []
    }
  },
  mounted () {
    this.dataValue = this.value
  },
  watch: {
    value: function (val) {
      this.dataValue = val
    }
  },
  methods: {
    valueChange (val) {
      this.$emit('value-change', {
        index: this.index,
        value: val
      })
    }
  }
}
