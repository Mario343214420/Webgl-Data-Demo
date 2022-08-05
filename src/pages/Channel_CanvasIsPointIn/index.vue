<template>
<div class="canvas-is-point-in">
  <canvas ref="cvs"
          :height="h"
          :width="w"
          @mousedown="md"
          @mousemove="mm"
          @mouseup="mu"></canvas>
  <span @click="clearCvs"></span>
</div>
</template>

<script>
export default {
  name: 'Channel_CanvasIsPointIn',
  data() {
    return {
      mouseFlag: 0,
      h: 700,
      w: 1000
    }
  },
  mounted() {
    this.h = this.$el.clientHeight
    this.w = this.$el.clientWidth
    this.initCvs()
  },
  methods: {
    clearCvs() {
      const cvs = this.$refs.cvs
      const ctx = cvs.getContext('2d')
      ctx.clearRect(0, 0, this.w, this.h)
    },
    initCvs() {
      const cvs = this.$refs.cvs
      const ctx = cvs.getContext('2d')
      ctx.beginPath()
      ctx.lineWidth = 8
      ctx.arc(100, 100, 50, 0, Math.PI * 2, true)
      ctx.stroke()
    },
    judge(event) {
      const cvs = this.$refs.cvs
      const ctx = cvs.getContext('2d')
      console.log('判断是否在区域内', ctx.isPointInPath(event.offsetX, event.offsetY))
      console.log('判断是否在边框上', ctx.isPointInStroke(event.offsetX, event.offsetY))
    },
    md(event) {
      const cvs = this.$refs.cvs
      const ctx = cvs.getContext('2d')
      if(ctx.isPointInPath(event.offsetX, event.offsetY)) {
        this.mouseFlag = 1
      }
    },
    mm(event) {
      if(this.mouseFlag === 1) {
        const cvs = this.$refs.cvs
        const ctx = cvs.getContext('2d')
        ctx.clearRect(0, 0, this.w, this.h)
        // ctx.fillStyle = '#ffffff'
        // ctx.fillRect(0,0, this.w, this.h)
        // ctx.fillStyle = '#000000'
        ctx.beginPath();
        ctx.lineWidth = 8
        ctx.arc(event.offsetX, event.offsetY, 50, 0, Math.PI * 2, true)
        ctx.stroke()
      }
    },
    mu(event) {
      const cvs = this.$refs.cvs
      const ctx = cvs.getContext('2d')
      if(ctx.isPointInPath(event.offsetX, event.offsetY)) {
        this.mouseFlag = 0
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.canvas-is-point-in
  width: 1000px
  height: 700px
  canvas
    display block
</style>
