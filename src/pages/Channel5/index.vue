<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
export default {
  name: 'Channel5',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      deg: 0,
      w: 0,
      h: 0
    }
  },
  mounted() {
    const baseDom = this.$refs.channel
    this.w = baseDom.clientWidth
    this.h = baseDom.clientHeight
    this.$nextTick(()=> {
      this.init();
      this.animate()
    })
  },
  methods: {
    init() {
      const canvas = this.$refs.cvs
      const aspect = this.w/this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000)
      this.camera.position.z = 300
      this.camera.position.y = 400
      const objLoader = new OBJLoader()
      /*objLoader.load('./models/complete_model/c4d/钻杆模型.obj', obj => {
        // obj.children.forEach(c => this.scene.add(c))
        this.scene.add(obj)
      })*/
      /*objLoader.load('./models/complete_model/c4d/钻杆模型.obj', obj => {
        // obj.children.forEach(c => this.scene.add(c))
        this.scene.add(obj)
      })*/

      /*const gltfLoader = new GLTFLoader()
      // gltfLoader.load('./models/complete_model/keyshot/GLTF/钻杆模型.gltf', gltf => {
      gltfLoader.load('./models/complete_model/keyshot/GLTF/1.gltf', gltf => {
        console.log(gltf)
      })*/

      const fbxLoader = new FBXLoader()
      /*// fbxLoader.load('./models/complete_model/c4d/钻杆模型.fbx', fbx => {
      fbxLoader.load('./models/complete_model/keyshot/FBX/钻杆模型.fbx', fbx => {
        fbx.children.forEach((item, index) => {
          item.position.x = 0
          item.position.y = index * 20
          if (index === 2) {
            item.children.forEach((item1, index1) => {
              item1.position.x = 0
              item1.position.y = index1 * 20
              if (index1 = 2 && item1.name === '固定圈') {
                item1.position.y = 0
                item1.position.x = 0
                item1.rotateY(Math.PI / 4)
                item1.rotateZ(-Math.PI / 4)
                console.log(item1)
                // item1.rotateOnAxis(new THREE.Vector3(0,0,1),Math.PI / 2)
              }
            })
          }
        })
        this.scene.add(fbx)
      })*/

      const glbLoader = new GLTFLoader()
      glbLoader.load('./models/complete_model/keyshot/GLB/钻杆模型.glb', glb=>{
        this.scene.add(glb.scenes[0])
        console.log(glb)
      })

      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      //灯光属性
      const _spotLight = new THREE.SpotLight(0xf6f6f6);
      _spotLight.castShadow = true;
      _spotLight.position.set(1000,1000,1000);
      //设置阴影贴图精度
      _spotLight.shadowMapWidth = _spotLight.shadowMapHeight = 1024*4;
      this.scene.add(_spotLight);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.autoRotate = true
    },
    animate() {
      // 镜头旋转（未生效）
      // this.deg++
      // this.camera.rotateY(this.deg/3000)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style lang="stylus" scoped>
.channel {
  display block
  width: 100%
  height: 100%
}
</style>
