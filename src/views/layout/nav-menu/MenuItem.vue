<template>
  <b-menu-item :name="resolvePath(menu.path)">
    <i v-if="menu.icon" :class="`iconfont icon-${menu.icon}`"></i>
    {{menu.title}}
  </b-menu-item>
</template>

<script>
  import path from 'path'

  export default {
    name: 'MenuItem',
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
