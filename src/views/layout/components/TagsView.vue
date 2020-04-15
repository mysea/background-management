<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="view in visitedViews"
        ref="tag"
        :key="view.path"
        :class="isActive(view) ? 'active' : ''"
        :to="{ path: view.path }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(view)"
        @contextmenu.prevent.native="openMenu(view, $event)">
        <span class="text">{{ view.meta.title }}</span>
        <span class="el-icon-close icon" @click.prevent.stop="closeSelectedTag(view)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left +'px', top: top + 'px' }" class="contextmenu">
      <!-- <li @click="refreshSelectedTag">刷新</li> -->
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ScrollPane from './ScrollPane'
export default {
  name: 'TagsView',
  components: { ScrollPane },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedView: {}
    }
  },
  watch: {
    $route () {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addTags()
  },
  computed: {
    ...mapGetters([
      'visitedViews'
    ])
  },
  methods: {
    ...mapActions([
      'addVisitedView',
      'delVisitedView',
      'delOthersVisitedViews',
      'delAllVisitedViews'
    ]),
    isActive (view) {
      return view.path === this.$route.path
    },
    toLastView (view) {
      const lastView = this.visitedViews.slice(-1)[0]
      if (lastView) {
        this.$router.push(lastView)
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            break
          }
        }
      })
    },
    addTags () {
      const { name, path, meta } = this.$route
      this.addVisitedView({
        name,
        path,
        meta
      })
    },
    refreshSelectedTag () {
      if (this.selectedView) {
        this.$router.replace(this.selectedView).catch(err => { })
      }
    },
    closeSelectedTag (view) {
      this.delVisitedView(view)
      if (this.visitedViews.length && this.isActive(view)) {
        this.toLastView(view)
      }
    },
    closeOthersTags() {
      this.$router.push(this.selectedView).catch(err => {})
      this.delOthersVisitedViews(this.selectedView)
      this.moveToCurrentTag()
    },
    closeAllTags (view) {
      this.delAllVisitedViews()
    },
    openMenu (view, e) {
      this.selectedView = view
      this.visible = true
      this.left = e.clientX + 15
      this.top = e.clientY + 5
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 40px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  background: #f0f0f0;
  .tags-view-wrapper {
    line-height: 40px;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin: 4px;
      border-radius: 2px;
      user-select: none;
      .text {
        margin-left: 3px;
      }
      .icon {
        margin-left: 5px;
      }
      &:first-of-type {
        margin-left: 8px;
      }
      &:last-of-type {
        margin-right: 8px;
      }
      &.active {
        background-color: #3e84e9;
        color: #fff;
        border-color: #3e84e9;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
