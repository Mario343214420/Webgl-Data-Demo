<template>
  <div class="panel">
    <slot name="outer"></slot>
    <div class="light-bg">
      <slot name="inner"></slot>
      <span class="light-corner"></span>
      <span class="light-corner"></span>
      <span class="light-corner"></span>
      <span class="light-corner"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Panel'
  }
</script>

<style lang="stylus">
  $lightBgc = rgba(5, 16, 40, 1)
  $lightBdc = rgba(2, 203, 255, .1)
  $lightShadowColor = rgba(180, 203, 255, .1)
  $fontColor = #02cbff
  $bdw = 2px
  $bdh = 2px
  .panel
    display flex
    padding 0 20px
    width: 100%
    height: 960px
    box-sizing border-box
    .light-bg
      flex 1
      background-color: $lightBgc
      border: 1px solid $lightBdc
      box-shadow 0 0 10px $lightShadowColor
      position relative
      padding 10px 20px
      animation shadowShine linear infinite 4s
      .light-corner
        content: ''
        display block
        position absolute
        width 8px
        height: 8px

        &:nth-of-type(1)
          top: 0
          left: 0
          border-top: $bdh solid $fontColor
          border-left: $bdw solid $fontColor
          -webkit-border-radius: 2px 0 0 0
          -moz-border-radius: 2px 0 0 0
          border-radius: 2px 0 0 0

        &:nth-of-type(2)
          top: 0
          right: 0
          border-top: $bdh solid $fontColor
          border-right: $bdw solid $fontColor
          -webkit-border-radius: 0 2px 0 0
          -moz-border-radius: 0 2px 0 0
          border-radius: 0 2px 0 0

        &:nth-of-type(3)
          bottom: 0
          left: 0
          border-bottom: $bdh solid $fontColor
          border-left: $bdw solid $fontColor
          -webkit-border-radius: 0 0 0 2px
          -moz-border-radius: 0 0 0 2px
          border-radius: 0 0 0 2px

        &:nth-of-type(4)
          bottom: 0
          right: 0
          border-bottom: $bdh solid $fontColor
          border-right: $bdw solid $fontColor
          -webkit-border-radius: 0 0 2px 0
          -moz-border-radius: 0 0 2px 0
          border-radius: 0 0 2px 0

  @keyframes shadowShine {
    0% {
      box-shadow: 0 0 10px $lightShadowColor, 0 0 10px $lightShadowColor inset;
    }
    50% {
      box-shadow: 0 0 2px $lightShadowColor, 0 0 2px $lightShadowColor inset;
    }
    100% {
      box-shadow: 0 0 10px $lightShadowColor, 0 0 10px $lightShadowColor inset;
    }
  }
</style>
