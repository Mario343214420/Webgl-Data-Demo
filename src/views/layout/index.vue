<template>
  <div class="app-wrapper">
    <div class="sidebar-container" :style="{width:isCollapseLeft}">
      <div class="logo" flex="main:center cross:center">
        <img class="icon" src="../../assets/images/logo-small.png" alt="logo-small"/>
        <h1 v-show="sidebar">公共信用信息共享平台</h1>
      </div>
      <div class="aside">
        <b-scrollbar style="height:100%;">
          <aside-menu ref="asideMenu"></aside-menu>
        </b-scrollbar>
      </div>
    </div>
    <div class="main-container" :style="{marginLeft:isCollapseLeft}">
      <!--通用头部-->
      <global-header>
        <header-menu v-if="menuType==='header'" just-root @on-change-aside-menu="changeAsideMenu"></header-menu>
        <v-breadcrumb v-else></v-breadcrumb>
      </global-header>
      <!--标签栏-->
      <tags-view></tags-view>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GlobalHeader from './global-header'
  import HeaderMenu from './nav-menu/HeadMenu'
  import AsideMenu from './nav-menu/AsideMenu'
  import TagsView from './TagsView'

  export default {
    name: 'Layout',
    computed: {
      ...mapGetters(['sidebar', 'menuType']),
      isCollapseLeft () {
        if (this.sidebar) {
          return '240px'
        }
        return '64px'
      }
    },
    watch: {
      $route: {
        handler: function (val) {
          if (this.menuType === 'header') {
            this.$store.dispatch('setAsideMenu', val.path)
          }
        },
        immediate: true
      }
    },
    methods: {
      changeAsideMenu (path) {
        this.$refs.asideMenu.resetActiveMenu(path)
      }
    },
    components: {
      GlobalHeader,
      HeaderMenu,
      TagsView,
      AsideMenu
    }
  }
</script>

<style lang="stylus">
  @import "../../assets/styles/theme/register.styl"
</style>
