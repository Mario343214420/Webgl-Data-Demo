<template>
  <div id="app" v-cloak>
    <div v-if="this.$route.path !== '/home'" class="page-title-wrapper">
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
          case '/channel1':
            return '孔道模型1'
          case '/channel2':
            return ''
          case '/channel3':
            return '孔道模型3'
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
