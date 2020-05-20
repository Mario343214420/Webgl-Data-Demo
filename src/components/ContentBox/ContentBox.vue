<template>
  <div class="content-box">
    <div class="title">
      <b-icon :class="icon" size="20" :color="iconColor"></b-icon>
      <i class="cb-title">{{ cbTitle }}</i>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContentBox',
    props: {
      icon: {
        type: String,
        default: 'icon-ios-podium'
      },
      cbTitle: {
        type: String,
        default: 'this is title'
      },
      iconColor: {
        type: String,
        default: '#3387e5'
      }
    }
  }
</script>

<style lang="stylus" scoped>
.title
  padding-left: 10px
.cb-title
  margin-left: 10px
  font-weight: 700
  line-height: 40px
  font-size: 16px
.content
  background-color: #fff
  padding: 10px
</style>
