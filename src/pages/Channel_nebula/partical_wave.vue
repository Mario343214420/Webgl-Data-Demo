<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as echarts from 'echarts'
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {CopyShader} from "three/examples/jsm/shaders/CopyShader";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {BloomPass} from "three/examples/jsm/postprocessing/BloomPass";
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
      },
      bloomComposer: null,
      mixer: null,
      clock: null
    }
  },
  created() {
    // console.dir(document);
    // this.w = window.innerWidth
    // this.h = window.innerHeight
    this.w = document.body.clientWidth
    this.h = document.body.clientHeight
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas
      const aspect = this.w/this.h
      const grid = this.grid
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000)
      this.camera.position.z = 2
      this.camera.position.y = 2
      this.group = new THREE.Group()
      const axesHelper = new THREE.AxesHelper( 5 );
      this.scene.add( axesHelper );
      const loader = new GLTFLoader()
      const light = new THREE.AmbientLight( 0xffffff );
      this.scene.add(light)
      const spotLight = new THREE.SpotLight( 0xffffff );
      spotLight.position.set( 0, 0, 0 );
      this.scene.add(spotLight)
      loader.load('http://192.168.10.2:8000/quantum_cube/scene.gltf', gltf => {
        console.log(gltf);
        this.clock = new THREE.Clock();
        this.model = gltf
        this.mixer = new THREE.AnimationMixer(gltf.scene)
        this.mixer.clipAction( this.model.animations[0]).play();
        this.group.add(this.model.scene)
      })

      const geometry = new THREE.BoxGeometry(10, 1, 1)
      const material = new THREE.MeshBasicMaterial({
        color: 0x92bbfc,
        transparent: true,
        opacity: 1
      })
      const sphere = new THREE.Mesh(geometry, material)
      // this.group.add(sphere)

      this.scene.add(this.group)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true})
      // this.renderer.setClearColor(0xffffff,0)
      this.renderer.setSize(this.w, this.h)
      this.renderer.autoClear = false

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // this.controls.autoRotate = true;

      this.addBloomPass()
    },
    animate() {
      if(this.bloomComposer) {
        this.bloomComposer.render()
      }
      // this.group.rotation.y+=0.001
      if(this.clock) {
        let delta = this.clock.getDelta();
        this.mixer.update(delta)
      }
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    addBloomPass() {
      // RenderPass这个通道会渲染场景，但不会将渲染结果输出到屏幕上
      const renderScene = new RenderPass(this.scene, this.camera)
      const effectCopy = new ShaderPass(CopyShader); //传入了CopyShader着色器，用于拷贝渲染结果
      effectCopy.renderToScreen = true;
      // THREE.BloomPass(strength, kernelSize, sigma, Resolution)
      // strength 定义泛光效果的强度，值越高，明亮的区域越明亮，而且渗入较暗区域的也就越多
      // kernelSize 控制泛光的偏移量
      // sigma 控制泛光的锐利程度，值越高，泛光越模糊
      // Resolution 定义泛光的解析图，如果该值太低，结果的方块化就会越严重
      // const bloomPass = new BloomPass(3, 1.5, 0.4, 1024); //BloomPass通道效果
      // const bloomPass = new BloomPass(1.1, 25, 4.0, 256); //BloomPass通道效果
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.w, this.h), 0.2, 0.2, 0.3);
      //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
      this.bloomComposer = new EffectComposer(this.renderer)
      this.bloomComposer.setSize(this.w, this.h);
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.bloomComposer.addPass(effectCopy);
    },
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
  background-color: #ffffff
</style>
