<template>
    <div class="home">
      <div class="particles-wrapper" id="particlesId">
        <canvas class="particles-js-canvas-el" width="1560" height="560" style="width: 100%; height: 100%;"></canvas>
      </div>
      <div class="position-center">
        <div class="title-wrapper">
          <img src="../../../assets/images/home-example/title.png" alt="">
        </div>
        <div class="links">
          <a href="javascript:;">系统概况专题</a>
          <a href="javascript:;">数据归集专题</a>
          <a href="javascript:;">双公示专题</a>
          <a href="javascript:;">联合奖惩专题</a>
          <a href="javascript:;">信用评级专题</a>
        </div>
        <div class="img-wrapper">
          <img src="../../../assets/images/home-example/circle1.png" alt="">
          <img src="../../../assets/images/home-example/circle2.png" alt="">
          <img src="../../../assets/images/home-example/circle3.png" alt="">
          <img src="../../../assets/images/home-example/circle3-2.png" alt="">
          <img src="../../../assets/images/home-example/circle4.png" alt="">
          <img src="../../../assets/images/home-example/circle5.png" alt="">
        </div>
      </div>
      <!--    <div class="cvs-wrapper" id="cvs"></div>-->
      <div class="scroll-earth">
        <img src="../../../assets/images/home-example/earth.png" alt="">
      </div>
    </div>
</template>
<script>
  import particles from 'particles.js'
  export default {
    name: 'Home',
    data: function() {
      return {
        particleJson: {
          'particles': {
            'number': {
              'value': 60, // 数量
              'density': {
                'enable': true, // 启用粒子的稀密程度
                'value_area': 800 // 区域散布密度大小
              }
            },
            'color': {
              'value': '#00aeff' // 原子的颜色
            },
            'shape': {
              'type': 'circle', // 原子的形状 "circle" ,"edge" ,"triangle" ,"polygon" ,"star" ,"image" ,["circle", "triangle", "image"]
              'stroke': {
                'width': 0, // 原子的宽度
                'color': '#362cff' // 原子颜色
              },
              'polygon': {
                'nb_sides': 5 // 原子的多边形边数
              },
              'image': {
                'src': 'img/github.svg', // 原子的图片可以使用自定义图片 "assets/img/yop.svg" , "http://mywebsite.com/assets/img/yop.png"
                'width': 100, // 图片宽度
                'height': 100 // 图片高度
              }
            },
            'opacity': {
              'value': 1, // 不透明度
              'random': true, // 随机不透明度
              'anim': {
                'enable': true, // 渐变动画
                'speed': 1, // 渐变动画速度
                'opacity_min': 0, // 渐变动画不透明度
                'sync': true
              }
            },
            'size': {
              'value': 3, // 原子大小
              'random': true, // 原子大小随机
              'anim': {
                'enable': false, // 原子渐变
                'speed': 4, // 原子渐变速度
                'size_min': 0.3,
                'sync': false
              }
            },
            'line_linked': {
              'enable': false, // 连接线
              'distance': 150, // 连接线距离
              'color': '#ffffff', // 连接线颜色
              'opacity': 0.4, // 连接线不透明度
              'width': 1 // 连接线的宽度
            },
            'move': {
              'enable': true, // 原子移动
              'speed': 1, // 原子移动速度
              'direction': 'none', // 原子移动方向   "none" ,"top" ,"top-right" ,"right" ,"bottom-right" ,"bottom" ,"bottom-left" ,"left" ,"top-left"
              'random': true, // 移动随机方向
              'straight': false, // 直接移动
              'out_mode': 'out', // 是否移动出画布
              'bounce': false, // 是否跳动移动
              'attract': {
                'enable': false, // 原子之间吸引
                'rotateX': 600, // 原子之间吸引X水平距离
                'rotateY': 600 // 原子之间吸引Y水平距离
              }
            }
          },
          'interactivity': {
            'detect_on': 'canvas', // 原子之间互动检测 "canvas", "window"
            'events': {
              'onhover': {
                'enable': true, // 悬停
                'mode': 'bubble' // 悬停模式      "grab"抓取临近的,"bubble"泡沫球效果,"repulse"击退效果,["grab", "bubble"]
              },
              'onclick': {
                'enable': false, // 点击效果
                'mode': 'repulse' // 点击效果模式   "push" ,"remove" ,"bubble" ,"repulse" ,["push", "repulse"]
              },
              'resize': true // 互动事件调整
            },
            'modes': {
              'grab': {
                'distance': 100, // 原子互动抓取距离
                'line_linked': {
                  'opacity': 0.8 // 原子互动抓取距离连线不透明度
                }
              },
              'bubble': {
                'distance': 250, // 原子抓取泡沫效果之间的距离
                'size': 4, // 原子抓取泡沫效果之间的大小
                'duration': 2, // 原子抓取泡沫效果之间的持续事件
                'opacity': 1, // 原子抓取泡沫效果透明度
                'speed': 1
              },
              'repulse': {
                'distance': 400, // 击退效果距离
                'duration': 0.4 // 击退效果持续事件
              },
              'push': {
                'particles_nb': 2 // 粒子推出的数量
              },
              'remove': {
                'particles_nb': 2
              }
            }
          },
          'retina_detect': true
        }
      }
    },
    mounted() {
      window.particlesJS('particlesId', this.particleJson)
    }
  }
</script>

<style lang="stylus" scoped>
.home
  width: 100%
  height: 100%
  position relative
  box-sizing border-box
  overflow hidden
  background-image: url('~@/assets/images/home-example/background.jpg')
  .position-center
    position absolute
    left: 50%
    top: 50%
    transform translate(-50%, -50%)
    width: 701px
    height: 701px
    z-index 15
    .img-wrapper
      position absolute
      left: 50%
      top: 50%
      transform translate(-50%, -50%)
      width: 100%
      height: 100%
      /*overflow hidden*/
      img
        position absolute
        display block
        left: 50%
        top: 50%
        transform translate(-50%, -50%)
        opacity .5
        &:nth-child(1)
          animation ease-in-out rotate1 infinite 5s
        &:nth-child(2)
          animation ease-in-out rotate2 infinite 4s
        &:nth-child(3)
          animation ease-in-out rotate3 infinite 3s
        &:nth-child(4)
          animation ease-in-out rotate1 infinite 5s
        &:nth-child(5)
          animation ease-in-out rotate2 infinite 4s
        &:nth-child(6)
          animation ease-in-out rotate3 infinite 3s

    .title-wrapper
      position absolute
      width: 100%
      top: 50%
      animation shine ease-in-out infinite 10s
      img
        width: 100%
      .star
        position absolute
        width: auto
        height: 36px
        left: 0
        top: 20%
        animation shine2 infinite 20s
    .links
      display flex
      width: 650px
      height: 40px
      justify-content space-between
      background-color: transparent
      position absolute
      top: 65%
      left: 50%
      transform translateX(-50%)
      z-index 20
      a
        height: 40px
        line-height: 40px
        text-align center
        width: 125px
        display block
        background-color: rgba(7,35,74,.7)
        color #fff
        transition background-color ease-in-out .4s
        &:hover
          background-color: rgba(15,74,139,1)

  .cvs-wrapper
    position absolute
    right: 0
    top: 0
    z-index 10
    opacity .4
  .particles-wrapper
    position absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index 12
  .scroll-earth
    width 4000px
    height: 4000px
    position absolute
    left: 75%;
    bottom: -90%;
    img
      width: 100%
      height: 100%
      opacity .6
      animation rotate4 linear infinite 360s
@keyframes rotate1{
  0%   {transform:translate(-50%, -50%) rotate(0);opcity:.4}
  100% {transform:translate(-50%, -50%) rotate(-360deg);opcity:.5}
  // 100% {transform:translate(-50%, -50%) rotate(0deg)}
}
@keyframes rotate2{
  0%   {transform:translate(-50%, -50%) rotate(-40deg)}
  100% {transform:translate(-50%, -50%) rotate(320deg)}
  // 100% {transform:translate(-50%, -50%) rotate(0deg)}
}
@keyframes rotate3{
  0%   {transform:translate(-50%, -50%) rotate(80deg)}
  100% {transform:translate(-50%, -50%) rotate(-280deg)}
}
@keyframes rotate4{
  0%   {transform: rotate(0);}
  25% {transform: rotate(90deg);}
  50% {transform: rotate(180deg);}
  75% {transform: rotate(270deg);}
  100% {transform: rotate(360deg);}
}
@keyframes shine{
  0% {opacity:1;transform translateY(-50%) scale(1.01)}
  25% {opacity:1;transform translateY(-50%) scale(1.0)}
  50% {opacity:1;transform translateY(-50%) scale(1.01)}
  75% {opacity:1;transform translateY(-50%) scale(1.0)}
  100% {opacity:1;transform translateY(-50%) scale(1.01)}
}
@keyframes shine2{
  0% {opacity:.1;transform translateX(0) scale(1.01)}
  50% {opacity:1;transform translateX(350px) scale(1.00)}
  100% {opacity:.1;transform translateX(700px) scale(1.01)}
}
</style>
