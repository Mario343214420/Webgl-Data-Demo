<template>
<div class="well-site">
  <canvas ref="cvs" :height="h" :width="w"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export default {
  name: 'index',
  data() {
    return {
      h: 600,
      w: 800,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      group: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.h = this.$el.clientHeight
      this.w = this.$el.clientWidth
      this.init()
      this.animate()
    })
  },
  methods: {
    init() {
      const canvas = this.$refs.cvs
      const aspect = this.w / this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 5000)
      this.camera.position.z = 100
      this.camera.position.x = -200
      this.camera.position.y = 100
      this.group = new THREE.Group()
      const fbxLoader = new FBXLoader()

      // fbxLoader.load('./models/well_site/dixing.FBX', fbx => {
      //   this.group.add(fbx)
      // })
      fbxLoader.load('./models/well_site/famen.FBX', fbx => {
        console.log(fbx)
        this.group.add(fbx)
      })
      // fbxLoader.load('./models/well_site/zhaban.FBX', fbx => {
      //   this.group.add(fbx)
      // })

      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);
      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.scene.add(this.group)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.addEventListener( 'change', () => {
        this.renderer.render(this.scene, this.camera)
      });
    },
    animate() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style lang="stylus" scoped>
.well-site
  width: 100%
  height: 100%
  canvas
    display block
</style>
