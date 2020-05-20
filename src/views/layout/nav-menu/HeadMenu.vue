<template>
  <b-menu class="header-menu" mode="horizontal" :active-name="activeMenu" @on-select="handleMenuSelect">
    <template v-for="(menu, menuIndex) in headerMenu">
      <template v-if="justRoot">
        <menu-item :menu="menu" :key="menuIndex" :base-path="menu.path"></menu-item>
      </template>
      <template v-else>
        <menu-item v-if="!menu.children" :menu="menu" :key="menuIndex" :base-path="menu.path"></menu-item>
        <submenu v-else :menu="menu" :key="menuIndex" :base-path="menu.path"></submenu>
      </template>
    </template>
  </b-menu>
</template>

<script>
  import { mapGetters } from 'vuex'
  import MenuItem from './MenuItem'
  import Submenu from './Submenu'

  export default {
    name: 'HeaderMenu',
    props: {
      justRoot: { // 只显示根
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['headerMenu']),
      activeMenu () {
        const route = this.$route
        const { meta, path } = route
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        if (this.justRoot) {
          let pathList = path.split('/')
          if (pathList.length > 0) {
            return '/' + pathList[1]
          }
        }
        return path
      }
    },
    methods: {
      handleMenuSelect (index) {
        if (index === this.$route.path) {
          return
        }
        if (this.justRoot) {
          if (index !== '/index') {
            this.$store.dispatch('setAsideMenu', index)
            this.$emit('on-change-aside-menu', index)
          } else {
            this.$router.push({ path: index })
          }
        } else {
          this.$router.push({ path: index })
        }
      }
    },
    components: { Submenu, MenuItem }
  }
</script>
