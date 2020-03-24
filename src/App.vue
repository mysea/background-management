<template>
  <div id="app" class="router-view">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route (to, from) {
      if (to.meta.menuIndex) {
        this.$store.commit('SET_ACTIVE_INDEX', to.meta.menuIndex)
      } else {
        this.$store.commit('SET_ACTIVE_INDEX', to.path)
      }
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
