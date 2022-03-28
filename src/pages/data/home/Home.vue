<template>
  <div class="home">
    <div class="particles-wrapper" id="particlesId">
      <canvas class="particles-js-canvas-el" width="1560" height="560" style="width: 100%; height: 100%;"></canvas>
    </div>
    <div class="bg-wrapper"></div>
    <div class="earth-wrapper">
      <div class="light">
        <div class="rotate">
          <img src="../../../assets/images/home-example/earth2.png" alt="">
          <!--<div class="star" v-for="(item,index) in starList"
               :style="{top:item.y+'px',left:item.x+'px',animationDelay:parseInt(index%8) + 's'}"></div>-->
        </div>
      </div>
    </div>
    <div class="center-wrapper">
      <div class="title">
<!--        <img src="../../../assets/images/home-example/title.png" alt="">-->
      </div>
      <div class="links">
        <router-link to="/overview">系统概况专题</router-link>
        <router-link to="/summary">数据归集专题</router-link>
        <router-link to="/public">双公示专题</router-link>
        <router-link to="/union">联合奖惩专题</router-link>
        <router-link to="/map">区域数据归集</router-link>
        <!--<a href="javascript:;">信用评级专题</a>-->
      </div>
    </div>
  </div>
</template>
<script>
  import particles from 'particles.js'
  import * as Three from 'three'
  /* eslint-disable */
  export default {
    name: 'Home',
    data: function () {
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
              'color': 'transparent', // 连接线颜色
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
        },
        starList: [
          {x:610,y:570},
          {x:440,y:600},
          {x:320,y:450},
          {x:260,y:350},
          {x:310,y:440},
          {x:420,y:510},
          {x:780,y:500},
          {x:680,y:640},
        ]
      }
    },
    mounted() {
      // this.createModel();
      for(var i = 0; i< 100; i++){
        var x = Math.random() * 600 + 200
        var y = Math.random() * 600 + 200
        this.starList.push({x,y})
      }
      window.particlesJS('particlesId', this.particleJson)
    }
  }
</script>

<style lang="stylus" scoped>
  canvas
    display block
    background-color: transparent

  .home
    width: 100%
    height: 100%

    .particles-wrapper
      position absolute
      background-color: transparent
      width: 100%
      height: 100%

    .bg-wrapper
      width: 100%
      height: 100%
      background-image: url('~@/assets/images/home-example/bg.min.png')
      -webkit-background-size: cover
      background-size: cover

    .earth-wrapper
      position absolute
      top: -500px
      right: -400px
      background-image: url('~@/assets/images/home-example/light2.png')
      background-position: left bottom;
      background-size: cover;
      .rotate
        position relative
        animation rotate linear infinite 60s
        img
          width: 1000px
          height: auto
        /*.star
          background-image: radial-gradient(#fff 5%, rgba(10,80,150,0.8) 50%, transparent 60%);
          width: 10px
          height: 10px
          z-index 200
          opacity 0
          position absolute
          animation star-shine infinite linear 10s*/
    .center-wrapper
      position absolute
      top: 50%
      left: 50%
      transform translate(-50%, -50%)

      .title
        img
          width 1000px
          height: auto

      .links
        padding-top: 20px
        width: 1000px
        display flex
        justify-content space-between

        a
          font-size: 16px
          display block
          width: 180px
          height: 50px
          line-height: 50px
          text-align center
          color #fff
          background-color: rgba(8, 35, 75, .6)
          position relative
          box-shadow 0 0 1px rgba(200, 200, 255, .4)
          transition all ease-in-out .4s

          &::before
            position absolute
            content ''
            bottom: 0
            left: 0
            height: 10px
            width: 10px
            display block
            border-left: 1px solid #2691ff
            border-bottom: 1px solid #2691ff

          &::after
            position absolute
            content ''
            top: 0
            right: 0
            height: 10px
            width: 10px
            display block
            border-right: 1px solid #2691ff
            border-top: 1px solid #2691ff

          &:hover
            box-shadow 0 0 4px rgba(200, 200, 255, .4)
            background-color: rgba(10, 60, 130, .6)

  @keyframes rotate {
    0% {
      transform: rotate(0);
      opacity: 0.9
    }
    50% {
      transform: rotate(180deg);
      opacity: 1
    }
    100% {
      transform: rotate(360deg);
      opacity: 0.9
    }
  }
  /*@keyframes star-shine{
    0% {opacity:0}
    25% {opacity:0.1}
    50% {opacity:0.6}
    75% {opacity:0.1}
    100% {opacity:0}
  }*/
</style>
