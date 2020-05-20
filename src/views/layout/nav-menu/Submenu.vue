<template>
  <b-submenu :name="resolvePath(menu.path)">
    <template slot="title">
      <i v-if="menu.icon" :class="`iconfont icon-${menu.icon}`"></i>
      {{ menu.title }}
    </template>
    <template v-for="(child,childIndex) in menu.children">
      <menu-item v-if="!child.children" :menu="child" :key="childIndex"
                 :base-path="resolvePath(menu.path)"></menu-item>
      <submenu v-else :menu="child" :key="childIndex"
               :base-path="resolvePath(menu.path)"></submenu>
    </template>
  </b-submenu>
</template>

<script>
  import path from 'path'
  import MenuItem from './MenuItem'

  export default {
    name: 'Submenu',
    components: {
      MenuItem
    },
    props: {
      menu: {
        type: Object,
        required: false,
        default: () => {
        }
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    methods: {
      resolvePath (routePath) {
        return path.resolve(this.basePath, routePath)
      }
    }
  }
</script>
