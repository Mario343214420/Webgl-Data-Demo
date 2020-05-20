<template>
  <div class="error-page">
    <div class="wrap">
      <div class="pic">
        <img class="pic__parent" src="../../assets/images/error-page/401.png" alt="401">
        <img class="pic__child left" src="../../assets/images/error-page/cloud.png" alt="cloud">
        <img class="pic__child mid" src="../../assets/images/error-page/cloud.png" alt="cloud">
        <img class="pic__child right" src="../../assets/images/error-page/cloud.png" alt="cloud">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">401</div>
        <div class="bullshit__info">Copyright © 2019-present wang bin</div>
        <div class="bullshit__headline">对不起，您没有权限访问此页面</div>
        <div class="bullshit__info">您可以选择如下操作</div>
        <a href="#" @click.stop.prevent="back" class="bullshit__return-home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Page401',
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
