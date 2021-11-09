<template>
<div class="channel">
  <canvas ref="cvs" width="1000" height="700"></canvas>
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
      deg: 0
    }
  },
  mounted() {
    this.init();
    this.animate()
  },
  methods: {
    init() {
      const canvas = this.$refs.cvs
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, 1000 / 700, 0.1, 1000)
      this.camera.position.z = 200
      // const geometry = new THREE.BoxGeometry(100, 100, 100)
      // const material = new THREE.MeshBasicMaterial({
      //   color: 0x92bbfc,
      //   transparent: true,
      //   opacity: 0.1
      // })
      // const sphere = new THREE.Mesh(geometry, material)
      // this.scene.add(sphere).
      const loader = new GLTFLoader()
      loader.load('./models/conveyor/scene.gltf', (obj) => {
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
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(1000, 700)
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

<style scoped>

</style>
