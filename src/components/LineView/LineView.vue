<template>
  <div class="line-view" ref="lineView">
    <div class="dir-tag">
      {{ dirName }}
    </div>
    <div title="放大" class="full-screen-btn" v-show="!noMagnify">
      <i class="el-icon-full-screen" @click="openFullDialog"></i>
    </div>
    <canvas ref="cvs" :width="size.w" :height="size.h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { mapState } from 'vuex'
export default {
  name: 'LineView',
  props: {
    size: {
      type: Object
    },
    controller: {
      type: Boolean
    },
    isOrtho: {
      type: Boolean
    },
    dir: {
      type: Number
    },
    noMagnify: {
      type: Boolean || String
    }
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null
    }
  },
  methods: {
    animate() {
      if (this.controller) {
        this.controls.update()
      }
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    render() {
      const size = this.size
      let aspect = size.w / size.h
      const colors = this.colors
      this.scene = new THREE.Scene()
      if (this.isOrtho) {
        this.camera = new THREE.OrthographicCamera(this.size.w / -5, this.size.w / 5, this.size.h / 5, this.size.h / -5, 1, 500)
        switch (this.dir) {
          // 正面
          case 1:
            this.camera.position.z = 200
            break
          // 左立面
          case 2:
            this.camera.position.x = -100
            break
          // 右立面
          case 3:
            this.camera.position.y = 100
            break
        }
      } else {
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
        this.camera.position.z = 200
      }
      const canvas = this.$refs.cvs
      // 摄像头辅助工具
      // const helper = new THREE.CameraHelper( this.camera );
      // this.scene.add( helper );
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(size.w, size.h)
      this.lines.forEach((item, index) => {
        this.resetLine(item, colors[index])
      })
      const geometry = new THREE.BoxGeometry(100, 100, 100)
      const cubeEdges = new THREE.EdgesGeometry(geometry, 1)
      let edgesMtl = new THREE.LineBasicMaterial({ color: 0xffffff })
      let cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl)
      const material = new THREE.MeshBasicMaterial({
        color: 0x92bbfc,
        transparent: true,
        opacity: 0.1
      })
      const sphere = new THREE.Mesh(geometry, material)

      this.camera.lookAt(sphere.position)
      this.scene.add(cubeLine)
      this.scene.add(sphere)
      this.scene.fog = new THREE.Fog(0x222222, 0, 700)
      if (this.controller) {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      }
    },
    resetLine(list, color) {
      const material = new THREE.LineBasicMaterial({
        color,
        linewidth: 10,
        linecap: 'round', // ignored by WebGLRenderer
        linejoin: 'round' // ignored by WebGLRenderer
      })
      const points = []
      list.forEach(
        item => {
          points.push(new THREE.Vector3(item.x, item.y, item.z))
        }
      )
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, material)
      this.scene.add(line)
    },
    openFullDialog() {
      this.$emit('open-dialog', this.dir)
    }
  },
  computed: {
    ...mapState('threeTool', {
      lines: state => state.lines,
      colors: state => state.colors
    }),
    dirName: function () {
      if (this.dir === 1) {
        return '前视图'
      } else if (this.dir === 2) {
        return '左视图'
      } else if (this.dir === 3) {
        return '顶视图'
      } else {
        return '自由视图'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.line-view {
  height: 100%
  position: relative
  background-color: #333
  .dir-tag {
    position absolute
    top: 10px
    left: 8px
    color #fff
    cursor pointer
  }
  .full-screen-btn {
    position absolute
    color: #fff
    right: 8px
    top: 10px
    cursor pointer
  }
  canvas {
    display block
  }
}
</style>
