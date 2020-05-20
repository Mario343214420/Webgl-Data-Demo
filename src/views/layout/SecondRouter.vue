<template>
  <div class="second-router" ref="contentWrapper">
    <transition name="fade-transverse" @enter="calcTableWidth">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Layout',
    computed: {
      ...mapGetters(['sidebar', 'menuType']),
      cachedViews () {
        return this.$store.state.tagsView.cachedViews
      },
      key () {
        return this.$route.fullPath
      },
      isCollapseLeft () {
        if (this.sidebar) {
          return '240px'
        }
        return '64px'
      }
    },
    mounted () {
      this.wrap = this.$refs.contentWrapper
      if (this.wrap) {
        this.$nextTick(() => {
          this.calcTableWidth()
        })
        window.addEventListener('resize', this.calcTableWidth)
        this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
        this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
      }
    },
    methods: {
      calcTableWidth () {
        let width = this.wrap ? this.wrap.clientWidth : 800
        // 全局通信，这里不缓存至vuex中，用于传递当前app-main宽度, mixin中监听此方法用于统一窗口宽度
        this.$EventBus.$emit('/layout/resize', width)
      },
      sidebarResizeHandler (e) {
        if (e.propertyName === 'width') {
          this.calcTableWidth()
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.calcTableWidth)
      if (this.sidebarElm) {
        this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)
      }
    }
  }
</script>
<style>
  .second-router {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
