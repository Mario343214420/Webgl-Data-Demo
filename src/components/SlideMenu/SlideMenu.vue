<template>
  <div class="slide-menu">
    <div class="slide-wrapper">
      <div class="slide-inner">
        <div class="slide-item-tip-active" :style="'top:'+ activeMenuFlag*50 + 'px'"></div>
        <div class="slide-item"
             @click="changeActiveMenu(index)"
             v-for="(item, index) in menuList"
             :key="index"
             flex="item:center">
          <span class="slide-item-tip"></span>
          <span class="slide-item-title">
          {{ item.title }}
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SlideMenu',
    data() {
      return {
        activeMenuFlag: 0
      }
    },
    props: {
      menuList: {
        type: Array,
        default() {
          return [
            {
              title: '缺省模拟列表标题1',
              url: 'www.baidu.com'
            },
            {
              title: '缺省模拟列表标题2',
              url: 'www.baidu.com'
            },
            {
              title: '缺省模拟列表标题3',
              url: 'www.baidu.com'
            }
          ]
        }
      }
    },
    methods: {
      changeActiveMenu(index) {
        if(this.activeMenuFlag !== index){
          this.activeMenuFlag = index
          this.$emit('change-active-menu',this.activeMenuFlag)
          // 处理切换页面后，渐隐
          // let views = document.getElementsByClassName('view')
          // console.log(views)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-menu
    animation ease-in init-hover 1s
  @keyframes init-hover{
    0%{opacity: 0}
    100%{opacity: 1}
  }
  $mainColor = #ffffff
  .slide-menu
    position absolute
    left: 50px
    top: 150px
    z-index 100
    .slide-item-tip-active
      -webkit-border-radius: 50%
      -moz-border-radius: 50%
      border-radius: 50%
      display block
      width: 20px
      height: 20px
      background-color: #008eff
      position absolute
      transition ease-in-out 0.5s
      margin-top: 10px
      border: 4px solid #fff
      z-index 10
      box-shadow 2px 2px 8px rgba(50,50,50,0.8)
    .slide-wrapper
      .slide-inner
        position relative
        &::after
          content: ''
          display block
          position absolute
          left: 12px
          top: 0
          height: 100%
          width 4px
          background-color: $mainColor
          box-shadow 2px 2px 8px rgba(50,50,50,0.8)
        .slide-item
          line-height: 50px
          height: 50px
          padding-left: 20px
          cursor pointer
          .slide-item-title
            color: $mainColor;
            font-size: 18px
            padding-left: 20px
            text-shadow 0 0 8px rgba(50,50,50,0.8)
</style>
