<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
// import axios from 'axios'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
export default {
  name: 'Channel6',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      deg: 0,
      w: 0,
      h: 0,
      pipe: null,
      pipeList: [],
      copyPipe: null
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
      fbxLoader.load('./models/fangpenqi/huanxingfangpenqi(1).FBX', fbx => {
        console.log(fbx)
        fbx.scale.set(4,4,4)
        fbx.position.set(0,200, 0)
        this.scene.add(fbx)
      })
      fbxLoader.load('http://192.168.1.95:8000/pidaisilie.fbx', fbx => {
        console.log(fbx)
        fbx.position.set(90, 0, 0)
        this.scene.add(fbx)
      })
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
      // glbLoader.load('./models/complete_model/keyshot/GLB/钻杆模型.glb', glb=>{
      //   console.log(1, glb)
      //   this.scene.add(glb.scene)
      // })
      glbLoader.load('./models/complete_model/keyshot/GLB/本安型摄像仪.glb', glb=>{
        this.scene.add(glb.scene)
      })
      // axios.get('http://localhost:8080/jsonModels/equip.json').then(res => {
      //   console.log(2,res.data)
      // })
      glbLoader.load('./models/complete_model/keyshot/GLB/钻杆1.glb', glb=>{
        console.log(glb)
        // glb.scene.scale = new THREE.Vector3(0.5, 0.5, 0.5)
        // let zangan = glb.scene.children[0].children[0].children
        // // zangan[0].scale = new THREE.Vector3(0.5, 0.5, 0.5)
        // // zangan[1].scale = new THREE.Vector3(0.5, 0.5, 0.5)
        // zangan[0].children[0].geometry.scale(0.25, 0.25, 0.25)
        // zangan[1].children[0].geometry.scale(0.25, 0.25, 0.25)
        // console.log(zangan[0].children)
        // zangan[0].children[1].geometry.scale(0.5, 0.5, 0.5)
        glb.scenes[0].rotateZ(Math.PI/2)
        glb.scenes[0].position.y = 90
        this.pipe = glb.scenes[0]
        this.scene.add(this.pipe)
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
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // this.controls.autoRotate = true
    },
    animate() {
      // 镜头旋转（未生效）
      this.deg++
      // this.camera.rotateY(this.deg/3000)
      if(this.pipe) {
        /*if(this.pipe.position.x <= 50 && this.pipe.position.x > -100) {
          this.pipe.position.x -= 1
        } else {
          this.pipe.position.x = 50
        }*/
        this.pipe.position.x = this.deg % 150
        // if (this.pipe.position.x % 120 === 0){
        //   this.pipe.position.x = 90
        // }
      }
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
