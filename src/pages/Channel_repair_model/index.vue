<template>
<div class="channel">
  <canvas ref="cvs" width="1200" height="700"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { TextureLoader } from 'three/examples/jsm/loaders/TextureLoader'
export default {
  name: 'ChannelRepair',
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
      this.camera = new THREE.PerspectiveCamera(50, 1200 / 700, 0.1, 1000)
      this.camera.position.z = 200
      const fbxLoader = new FBXLoader()
      const loader = new OBJLoader()
      const textureLoader = new THREE.TextureLoader()
      fbxLoader.load('./models/model_repair/004_005.FBX', fbx => {
        console.log(fbx)
        fbx.position.x = -0.806
        fbx.position.y = -0.470
        fbx.position.z = -0.360
        this.scene.add(fbx)
      })
      /* loader.load('http://192.168.1.21:8000/Tile_+001_+000_+000/Tile_+001_+000_+000_deal.obj', (obj) => {
        console.log(obj)
        textureLoader.load('http://192.168.1.21:8000/Tile_+001_+000_+000/Tile_+001_+000_+000_deal1.jpg', (texture) => {
          obj.children[0].material.map = texture
          obj.children[0].geometry.computeBoundingBox();
          obj.children[0].geometry.center()
          obj.position.y = 0;
          //添加这段代码
          //遍历模型每部分
          // console.log(model);
          this.scene.add(obj)
        })
        textureLoader.load('http://192.168.1.21:8000/Tile_+001_+000_+000/Tile_+001_+000_+000_deal2.jpg', (texture) => {
          obj.children[1].material.map = texture
          obj.children[1].geometry.computeBoundingBox();
          obj.children[1].geometry.center()
          obj.position.y = 0;
          //添加这段代码
          //遍历模型每部分
          // console.log(model);
          this.scene.add(obj)
        })
        obj.position.x = 0.17841
        obj.position.y = 0.34156
        obj.position.z = -0.92277
        this.scene.add(obj)
        // 镜头旋转（未生效）
        // this.camera.lookAt(this.scene.position)
        this.scene.add(new THREE.AmbientLight(0x666666));
      }) */
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(1200, 700)
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
