<template>
  <div class="home">
    Home<br>
    <div v-for="(item, index) in $router.options.routes">
      <router-link :to="item.path">{{item.path}}</router-link>
    </div>
    <div>
      <canvas ref="canvas" width="800" height="600"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      lastPoint: {
        x: undefined,
        y: undefined
      }
    }
  },
  mounted () {
    // this.init();
    // let slope = 3/4
    // console.log(Math.tan(Math.PI / 6))
    // console.log(Math.sin(Math.PI / 6))
    // let angle = Math.atan(3/4)
    // console.log(angle/Math.PI*180)
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      // ctx.rotate(20 * Math.PI/180);
      // ctx.fillText('汉',100,100);
      // ctx.fillRect(50,20,100,50);
      canvas.addEventListener('click', e => {
        const {offsetX, offsetY} = e
        ctx.beginPath();
        ctx.arc(offsetX,offsetY,6,0,2*Math.PI);
        ctx.stroke();
        ctx.closePath();
        if(this.lastPoint.x) {
          /**
          线段区域高宽
          w = offsetX - this.lastPoint.x
          h = offsetY - this.lastPoint.y
          中心点（线段后点位横轴-w/2，纵轴-h/2）

          */
          ctx.moveTo(offsetX - this.lastPoint.x, offsetY - this.lastPoint.y)
          /** 文字跟随canvas线转动 */
          ctx.font = '24px Georgia'
          ctx.translate(offsetX - (offsetX - this.lastPoint.x)/2, offsetY - (offsetY - this.lastPoint.y)/2)
          ctx.rotate(Math.atan((offsetY - this.lastPoint.y)/(offsetX - this.lastPoint.x)))
          ctx.fillText('text', 0, 0);
          ctx.rotate(Math.atan(-(offsetY - this.lastPoint.y)/(offsetX - this.lastPoint.x)))
          ctx.translate(-offsetX + (offsetX - this.lastPoint.x)/2, -offsetY + (offsetY - this.lastPoint.y)/2)
          ctx.beginPath();
          ctx.moveTo(this.lastPoint.x, this.lastPoint.y)
          ctx.lineTo(offsetX,offsetY)
          ctx.stroke();
          ctx.closePath()
        }
        this.lastPoint.x = offsetX
        this.lastPoint.y = offsetY
        console.log(offsetX, offsetY)
      })
    }
  }
}
</script>

<style scoped>

</style>
