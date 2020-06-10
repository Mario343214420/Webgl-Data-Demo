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

  $lightBgc = rgba(1, 23, 58, .6)
  $lightBdc = rgba(2, 203, 255, .1)
  $lightShadowColor = rgba(2, 203, 255, .2)
  $fontColor = #02cbff
  $bgc = #050819
  .num
    color $fontColor
    font-weight: 400
    font-size: 22px

  .font
    color #fff
    font-size: 12px

  #app
    height: 100%;
    background-color: $bgc
    overflow-x auto
    overflow-y auto
  i
    font-style normal

  .page-title-wrapper
    background-image: url('~@/assets/images/overview/title_bg.png')
    background-repeat: no-repeat
    -webkit-background-size: auto 72px
    background-size: auto 72px
    background-position: top center
    width: 100%
    text-align center
    height: 80px;
    padding-top: 10px
    position relative

    .to-home
      position absolute
      right: 40px
      bottom 0
      background-color: #0d1b4d
      padding 4px 20px
      -webkit-border-radius: 18px
      -moz-border-radius: 18px
      border-radius: 18px
      cursor pointer

  .page-title
    background-image: -webkit-linear-gradient(bottom, #1fb9fc, #1d80d2, #1850a7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700
    font-size: 36px
    line-height: 40px
    padding 10px 0
    letter-spacing 10px
  .white-font
    color #fff
</style>
