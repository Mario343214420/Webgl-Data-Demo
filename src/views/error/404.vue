<template>
  <div class="error-page">
    <div class="wrap">
      <div class="pic">
        <img class="pic__parent" src="../../assets/images/error-page/404.png" alt="404">
        <img class="pic__child left" src="../../assets/images/error-page/cloud.png" alt="cloud">
        <img class="pic__child mid" src="../../assets/images/error-page/cloud.png" alt="cloud">
        <img class="pic__child right" src="../../assets/images/error-page/cloud.png" alt="cloud">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">404</div>
        <div class="bullshit__info">Copyright © 2019-present wang bin</div>
        <div class="bullshit__headline">页面找不到了~~~</div>
        <div class="bullshit__info">请检查您输入的链接是否正确~~~</div>
        <a href="#" @click.stop.prevent="back" class="bullshit__return-home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Page404',
    methods: {
      back () {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "error.styl"
</style>
