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
            return 'channel2'
          case '/channel3':
            return 'channel3'
          case '/channel4':
            return 'channel4'
          case '/channel5':
            return 'channel5'
        }
      }
    }
  }
</script>
<style lang="stylus">
[v-cloak] {
  display: none;
}
html, body, div {
  margin: 0;
  padding: 0
}
.page-title-wrapper{
  position absolute
  top: 0
  left: 0
  z-index 10
  a{
    color: #fff
  }
}
#app, html, body{
  width: 100%
  height: 100%
}
</style>
