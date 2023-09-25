<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as echarts from 'echarts'
export default {
  name: 'Channel_fail_star',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      group: null,
      w: 1200,
      h: 900,
      grid: {
        xLimit: 1200,
        yLimit: 900,
        zLimit: 600
      }
    }
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      const aspect = this.w/this.h
      const grid = this.grid
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000)
      this.camera.position.z = 6
      this.group = new THREE.Group()
      // const _ambient = new THREE.AmbientLight(0xffffff, 1);
      // this.scene.add(_ambient);
      // const _spotLight = new THREE.SpotLight(0xf6f6f6, 0.5);
      // _spotLight.castShadow = true;
      // _spotLight.position.set(4,4,-4);
      // const _spotLight1 = new THREE.SpotLight(0xffffff, 0.8);
      // _spotLight1.castShadow = true;
      // _spotLight1.position.set(-4,4,-4);
      this.scene.add(_spotLight);
      this.scene.add(_spotLight1);
      const geometry = new THREE.BoxGeometry(10, 10, 10)
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
      })
      const sphere = new THREE.Mesh(geometry, material)
      // this.scene.add(sphere)

      let starCount = 1000
      for(let i = 0; i<starCount; i++) {
        let pos = {
          x: (Math.random() - 0.5) * grid.xLimit,
          y: (Math.random() - 0.5) * grid.yLimit,
          z: (Math.random() - 0.5) * grid.zLimit,
        }
        let clone = sphere.clone(false)
        clone.position.x = pos.x
        clone.position.y = pos.y
        clone.position.z = pos.z
        // this.group.add(clone)
      }

      const loader = new GLTFLoader()

      loader.load('http://192.168.10.2:8000/1.gltf', gltf => {
        this.scene.add(gltf.scene)
      })

      this.scene.add(this.group)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true})
      this.renderer.setSize(this.w, this.h)
      this.renderer.autoClear = false

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.autoRotate = true;
    },
    animate() {
      this.controls.update()
      // for(let i = 0; i<this.group.children.length; i++) {
      //   let item = this.group.children[i]
      //   if (item.position.x > - this.w / 2) {
      //     item.position.x-=0.1
      //     item.position.y-=0.1
      //     item.position.z+=0.01
      //   } else {
      //     item.position.x = (Math.random() - 0.5) * this.grid.xLimit
      //     item.position.y = (Math.random() - 0.5) * this.grid.yLimit
      //     item.position.z = (Math.random() - 0.5) * this.grid.zLimit
      //   }
      // }
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    }
  },
  mounted() {
    this.init()
    this.animate()
  }
}
</script>

<template>
<div class="container">
  <canvas ref="canvas" height="h" width="w"></canvas>
</div>
</template>

<style scoped lang="stylus">
.container
  background-color: #111
</style>
