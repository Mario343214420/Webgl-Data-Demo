<template>
  <div class="side-menu-wrapper">
    <b-menu @on-select="handleMenuSelect" :theme="theme" class="aside-menu" v-show="sidebar"
            :active-name="activeMenu" accordion ref="sideMenu">
      <template v-for="(menu, menuIndex) in asideMenu">
        <menu-item v-if="!menu.children" :menu="menu" :key="menuIndex" :base-path="menu.path"></menu-item>
        <submenu v-else :menu="menu" :key="menuIndex"></submenu>
      </template>
    </b-menu>
    <div v-show="!sidebar" class="menu-collapsed">
      <template v-for="menu in asideMenu">
        <collapsed-menu v-if="menu.children && menu.children.length > 0" :key="`drop-menu-${menu.path}`"
                        :menu="menu" :base-path="menu.path" hide-title @on-click="handleSelect"
        ></collapsed-menu>
        <!--如果只有一级则需要显示提示-->
        <b-tooltip append-to-body v-else :content="menu.title" theme="dark"
                   placement="right" :key="`drop-menu-${menu.path}`">
          <a class="drop-menu-a" @click="handleSelect(menu.path)">
            <b-icon :name="menu.icon" size="20"></b-icon>
          </a>
        </b-tooltip>
      </template>
    </div>

    <div v-if="asideMenu.length===0" class="no-aside-menu" flex="dir:top main:center cross:center"
         :style="{height:sidebar?'160px':'50px'}">
      <b-icon name="ios-laptop"></b-icon>
      <transition name="zoom-in-center">
        <div v-show="sidebar" class="label">没有侧栏菜单</div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MenuItem from './MenuItem'
  import Submenu from './Submenu'
  import CollapsedMenu from './CollapsedMenu'

  export default {
    name: 'AsideMenu',
    data () {
      return {
        activeMenu: ''
      }
    },
    computed: {
      ...mapGetters(['asideMenu', 'sidebar', 'theme'])
    },
    watch: {
      $route: {
        handler: function (val) {
          this.$nextTick(() => {
            this.activeMenu = val.path
          })
        },
        immediate: true
      }
    },
    methods: {
      handleSelect (name) {
        this.handleMenuSelect(name)
      },
      handleMenuSelect (index) {
        if (index === this.$route.path) {
          return
        }
        this.$router.push({ path: index })
      },
      resetActiveMenu (index) {
        // 如果目标路径包含，则设置开启菜单为route
        const { path } = this.$route
        this.activeMenu = path.indexOf(index) === 0 ? path : ''
      }
    },
    components: { Submenu, MenuItem, CollapsedMenu }
  }
</script>
