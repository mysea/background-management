<template>
  <transition name="opacity-fade">
    <div class="c-view" :style="{ 'background-color': backgroundColor, 'padding': padding + ' 0', 'z-index': zIndex }">
      <el-card v-loading="loading"
        class="create-card-container"
        :style="{ 'width': width }"
        :body-style="bodyStyle">
        <slot name="header"></slot>
        <slot></slot>
      </el-card>
    </div>
  </transition>
</template>

<script>
import { getMaxIndex } from '@/utils/index'
export default {
  data () {
    return {
      zIndex: getMaxIndex(),
      loadingObj: null
    }
  },
  props: {
    bodyStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#F5F6F9'
    },
    width: {
      type: String,
      default: '700px'
    },
    padding: {
      type: String,
      default: '40px'
    }
  }
}
</script>

<style lang="scss" scoped>
.opacity-fade-enter-active,
.opacity-fade-leave-active {
  transition: all 0.2s;
}
.opacity-fade-enter,
.opacity-fade-leave-to {
  opacity: 0;
}
/** 容器布局 */
.c-view {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.create-card-container {
  margin: 0 auto;
  height: 100%;
}
</style>
