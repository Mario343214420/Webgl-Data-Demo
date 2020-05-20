<template>
  <div class="card">
    <div class="card-title">
      <slot name="title"></slot>
    </div>
    <div class="count-wrapper">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card'
  }
</script>

<style lang="stylus" scoped>
  .card-title
    background-image: url('~@/assets/images/summary/t_bg.png')
    background-repeat: no-repeat
    background-position: left bottom
    height 36px
    margin-top: 6px

    span
      font-size: 18px
      font-weight: 700
      color #fff
      line-height: 28px
</style>
