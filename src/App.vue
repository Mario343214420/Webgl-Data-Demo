<template>
  <div id="app" v-cloak>
<!--    <div v-if="this.$route.path !== '/home' && this.$route.path !== '/home2'" class="page-title-wrapper">-->
<!--      <span class="page-title">-->
<!--        {{ returnRouteName() }}-->
<!--      </span>-->
<!--      <span class="to-home">-->
<!--          <router-link to="/home">返回</router-link>-->
<!--      </span>-->
<!--    </div>-->

    <SlideMenu :menu-list="pathList" @change-active-menu="test"></SlideMenu>
    <!--<SlideMenu :menu-list="menuList"></SlideMenu>-->
    <router-view/>
  </div>
</template>
<script>
  import SlideMenu from './components/SlideMenu/SlideMenu'
  export default {
    name: 'app',
    data(){
      return {
      }
    },
    computed:{
      pathList(){
        let routes = this.$router.options.routes
        routes.pop()
        return routes.map(item=>{
          return {
            path: item.path,
            title: item.title
          }
        })
      }
    },
    components: {
      SlideMenu
    },
    methods: {
      test(index){
        let routes = this.$router.options.routes
        routes = routes.map(item=>{return {path:item.path, replace: true}})
        this.$router.push(routes[index])
      },
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
  [v-cloak]
    display: none;
  [flex]
    display flex
  [flex~="dir:column"]
    flex-direction column
  [flex~="space:center"]
    justify-content center
  [flex~="space:around"]
    justify-content center
  [flex~="space:between"]
    justify-content center
  [flex~="wrap:nowrap"]
    flex-wrap nowrap
  [flex~="item:center"]
    align-items center
  #app
    background-color: #fbfbff
  .view
    animation ease-in init-hover 1s
  @keyframes init-hover{
    0%{opacity: 0}
    100%{opacity: 1}
  }
</style>
