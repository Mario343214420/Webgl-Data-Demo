<template>
  <div class="subarea">
    <div class="title">
      <i class="iconfont" :class="iconfont"></i>
    </div>
    <div class="container">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Subarea',
    props: {
      iconfont: {
        type: String,
        default: 'ios-podium'
      }
    }
  }
</script>

<style lang="stylus" scoped>
.subarea
  .title
    font-weight: 700
    font-size: 18px
  .container
    background-color: #fff
    padding: 10px

</style>
