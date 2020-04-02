<template>
  <div class="navbar">
    <img class="logo" src="@/assets/img/logo_color.png"/>

    <div class="nav-items-container">
      <flexbox style="width: auto;">
        <router-link
          v-for="(item, index) in items"
          :key="index"
          @click.native="navItemsClick(item.type)"
          class="nav-item"
          :style="{ 'color' : item.type == navIndexChild ? '#3E84E9' : '#333333' }"
          :to="item.path">
          <i class="grg"
             :class="'grg-' + item.icon"
             style="margin-right: 10px;"
             :style="{ 'color': item.type == navIndexChild ? '#3E84E9' : '#333333'}"></i>
          <div class="nav-item-title">{{ item.title }}</div>
        </router-link>
      </flexbox>
    </div>

    <div class="lang">
      <Website></Website>
    </div>

    <div class="lang">
      <Lang></Lang>
    </div>

    <el-popover
      placement="bottom"
      :visible-arrow="false"
      popper-class="no-padding-popover"
      width="200"
      trigger="hover">
      <div class="handle-items">
        <div class="handle-item" @click="handleClick('password')">
          <i class="grg grg-password"></i>{{ '修改密码' }}
        </div>
        <div class="handle-item" @click="handleClick('goout')">
          <i class="grg grg-logout"></i>{{ '退出登录' }}
        </div>
      </div>
      <div slot="reference" class="user-container">
        <div class="user-img">李文</div>
        <i class="el-icon-caret-bottom mark"></i>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Lang from '@/components/lang'
import Website from '@/components/website'
export default {
  components: {
    Lang,
    Website
  },
  data () {
    return {
      avator: '',
      navIndexChild: 0
    }
  },
  props: {
    navIndex: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    ...mapGetters([
      'background'
    ]),
    items () {
      var tempItems = []
      // if (this.filterAuth(this.background)) {
      if (this.background) {
        tempItems.push({
          title: '后台管理',
          type: 3,
          path: '/background',
          icon: 'background'
        })
      }
      return tempItems.length <= 1 ? [] : tempItems
    }
  },
  mounted () {
    this.navIndexChild = this.navIndex
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    filterAuth (authInfo) {
      var result = false
      for (var i in authInfo) {
        if (authInfo[i].length) {
          result = true
          break
        }
      }
      return result
    },
    navItemsClick (type) {
      this.navIndexChild = type
      this.$store.commit('SET_NAV_ACTIVE_INDEX', type)
      this.$emit('nav-items-click', type)
    },
    handleClick (type) {
      var _this = this
      if (type === 'goout') {
        _this.$confirm('退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.logout()
          location.reload()
        }).catch(() => {})
      } else if (type === 'password') {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  min-height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 30px;
}

.logo {
  width: 150px;
  display: block;
  flex-shrink: 0;
  margin-right: 15px;
}

.nav-items-container {
  flex: 1;
  display: flex;
  min-width: 500px;
  height: 100%;
  overflow-x: auto;
  line-height: 60px;
  font-size: 15px;
}

.nav-item {
  padding: 0 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .nav-item-img {
    display: block;
    width: 32px;
    min-width: 32px;
    min-height: 32px;
    height: 32px;
    margin-right: 8px;
    border-radius: 50%;
  }
}

.lang {
  margin-right: 30px;
}

.handle-items {
  padding: 10px 0 10px 0;
  .handle-item {
    padding: 5px 20px;
    font-size: 14px;
    color: #aaa;
    cursor: pointer;
    i {
      margin-right: 8px;
      font-size: 15px;
    }
  }
  .handle-item:hover {
    background-color: #f7f8fa;
    color: #3e84e9;
  }
}

.user-container {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  .user-img {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: #3E84E9;
    color: #fff;
  }
  .mark {
    font-size: 15px;
    color: #aaa;
  }
}

.user-container:hover {
  .mark {
    color: #2486e4;
  }
}
</style>
