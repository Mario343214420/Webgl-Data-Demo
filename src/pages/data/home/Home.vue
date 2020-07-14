<template>
  <div class="home view">
    <div class="animation-wrapper">
      <img class="build" src="~@/assets/images/home-example/build.png" alt="">
      <img class="arrow arrow01" src="~@/assets/images/home-example/arrow01.png" alt="">
      <img class="arrow arrow02" src="~@/assets/images/home-example/arrow02.png" alt="">
      <img class="arrow arrow03" src="~@/assets/images/home-example/arrow03.png" alt="">
      <img class="arrow arrow04" src="~@/assets/images/home-example/arrow04.png" alt="">
      <img class="arrow arrow05" src="~@/assets/images/home-example/arrow05.png" alt="">
    </div>
    <div class="animation-title">大数据展示系统</div>
    <div class="main-wrapper" flex="dir:column item:center">

    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  // import EarthBackground from '../../../components/EarthBackground/EarthBackground'
  /* eslint-disable */
  export default {
    name: 'Home',
    data(){
      return {
      }
    },
    components: {
    },
    created() {
      // 初始化页面数据
      // this.$store.dispatch('getOverview').then(()=>{
      //   this.numChange(this.$store.state.overview.total)
      // })
    },
    mounted(){
      // this.numChange(this.$store.state.overview.total)
    },
    computed: {
      ...mapState({
        a: state => state.overview.a
      })
    },
    watch: {
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
.home
  height: 100%
.animation-wrapper
  position absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  overflow hidden
  img
    position absolute
  .arrow
    left: 0
  .arrow01
    top: 500px
    animation ease-in arrow-move-in 1s
  .arrow02
    top: 600px
    animation ease-in arrow-move-in 1s
  .arrow03
    top: 100px
    animation ease-in arrow-move-in 1s
  .arrow04
    height: 100%
    animation ease-in arrow04-move-in 1s
  .arrow05
    top: 0
    right: 0
    left: auto
    animation ease-in arrow05-move-in 1s
  .build
    right: 0
    bottom: 0
    animation ease-in build-move-in 1s
@keyframes arrow05-move-in{
  0%{right:-200px}
  100%{right:0}
}
@keyframes arrow04-move-in{
  0%{left:-300px}
  100%{left:0}
}
@keyframes arrow-move-in{
  0%{left:-200px}
  100%{left:0}
}
@keyframes build-move-in{
  0%{bottom:-600px}
  100%{bottom:0}
}
.animation-title{
  position absolute
  left: 50%
  top: 30%
  transform translate(-50%, -50%) scale(2.6)
  height: 100px
  line-height: 100px
  font-size: 30px
  letter-spacing 20px
  font-weight: 700
  color #ffffff
  text-shadow 0 0 8px rgba(50,50,50,0.4)
  background-size:200% 100%;
  animation:masked-animation 2s infinite linear;
}
@-webkit-keyframes masked-animation {
  100% {
    background-position:-100% 0;
  }
}
</style>
