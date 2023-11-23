<template>
  <div class="channel">
    <canvas ref="cvs" :width="w" :height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default {
  name: 'Channel2',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      deg: 0,
      w: 1200,
      h: 900
    }
  },
  mounted() {
    this.w = document.body.clientWidth
    this.h = document.body.clientHeight
    this.init();
    this.animate()
  },
  methods: {
    init() {
      const canvas = this.$refs.cvs
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, this.w / this.h, 0.1, 1000)
      this.camera.position.z = 200
      const loader = new GLTFLoader()
      loader.load('./models/pipe_sys/1.gltf', (obj) => {
        obj.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.material.emissive =  child.material.color;
            child.material.emissiveMap = child.material.map ;
          }
        });
        this.scene.add(obj.scene)
        // 镜头旋转（未生效）
        // this.camera.lookAt(this.scene.position)
        this.scene.add(new THREE.AmbientLight(0x666666));
      })
      loader.load('./models/changjing/changjing.gltf', (obj) => {
        console.log(obj);
        obj.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.material.emissive =  child.material.color;
            child.material.emissiveMap = child.material.map ;
          }
        });
        this.scene.add(obj.scene)
      })
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    },
    animate() {
      // 镜头旋转（未生效）
      // this.deg++
      // this.camera.rotateX = (10 * this.deg/3)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style lang="stylus" scoped>
canvas {
  display block
}
  .channel {
    background-color: #181A2B
  }
</style>
