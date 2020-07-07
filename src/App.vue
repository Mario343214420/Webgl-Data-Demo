<template>
  <div id="app" v-cloak>
    <div v-if="this.$route.path !== '/home' && this.$route.path !== '/home2'" class="page-title-wrapper">
      <span class="page-title">
        {{ returnRouteName() }}
      </span>
      <span class="to-home">
          <router-link to="/home">返回</router-link>
      </span>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app',
    methods: {
      returnRouteName() {
        let route = this.$route.path
        switch (route) {
          case '/overview':
            return '系统概况专题'
          case '/summary':
            return '数据归集专题'
          case '/public':
            return '双公示专题'
          case '/union':
            return '联合奖惩专题'
          case '/map':
            return '区域数据归集'
        }
      }
    }
  }
</script>
<style lang="stylus">
  [v-cloak] {
    display: none;
  }
</style>
