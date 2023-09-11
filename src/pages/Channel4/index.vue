<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
export default {
  name: 'Channel4',
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
    // const baseDom = document.getElementById('app')
    const baseDom = this.$refs.channel
    this.w = baseDom.clientWidth
    this.h = baseDom.clientHeight
    this.$nextTick(()=> {
      this.init();
      this.animate()
    })
  },
  methods: {
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
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.w, this.h), 1, 0.8, 0);
      //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
      this.bloomComposer = new EffectComposer(this.renderer)
      this.bloomComposer.setSize(this.w, this.h);
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.bloomComposer.addPass(effectCopy);
    },
    init() {
      const canvas = this.$refs.cvs
      // canvas.width = document.documentElement.clientWidth
      // canvas.height = document.documentElement.clientHeight
      const aspect = this.w/this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000)
      this.camera.position.z = 300

      // const geometry = new THREE.BoxGeometry(100, 100, 100)
      // const material = new THREE.MeshBasicMaterial({
      //   color: 0x92bbfc,
      //   transparent: true,
      //   opacity: 0.1
      // })
      // const sphere = new THREE.Mesh(geometry, material)
      // this.scene.add(sphere).
      /*const loader = new GLTFLoader()
      loader.load('./models/dragoner/scene.gltf', (obj) => {

        obj.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.material.emissive =  child.material.color;
            child.material.emissiveMap = child.material.map ;
          }
        });
        obj.scene.position.y = -100
        obj.scene.position.x = -200
        obj.scene.castShadow = true
        this.scene.add(obj.scene)
        // 镜头旋转（未生效）
        this.camera.lookAt(this.scene.position)
        // this.scene.add(new THREE.AmbientLight(0xffffff));
        //添加环境光
        const _ambient = new THREE.AmbientLight(0xffffff);
        this.scene.add(_ambient);
        //灯光属性
        const _spotLight = new THREE.SpotLight(0xffffff);
        _spotLight.castShadow = true;
        _spotLight.position.set(100,100,100);
        //设置阴影贴图精度
        _spotLight.shadowMapWidth = _spotLight.shadowMapHeight = 1024*4;
        this.scene.add(_spotLight);
      })*/
      const loader = new GLTFLoader()
      // console.log(loader)
      loader.load('http://192.168.10.2:8000/dragoner/scene.gltf', gltf => {
        console.log(gltf)
        // const meshes =
        gltf.scene.position.y = -100
        gltf.scene.position.x = -200
        gltf.scene.castShadow = true
        this.scene.add(gltf.scene)
        // 镜头旋转（未生效）
        this.camera.lookAt(this.scene.position)
        // this.scene.add(new THREE.AmbientLight(0xffffff));
        //添加环境光
        const _ambient = new THREE.AmbientLight(0xffffff);
        this.scene.add(_ambient);
        //灯光属性
        const _spotLight = new THREE.SpotLight(0xffffff);
        _spotLight.castShadow = true;
        _spotLight.position.set(100,100,100);
        this.scene.add(_spotLight);
      })
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, })
      this.renderer.setSize(this.w, this.h)
      this.renderer.autoClear = false
      this.addBloomPass()
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.autoRotate = true;
    },
    animate() {
      // if(this.bloomComposer) {
      //   this.bloomComposer.render()
      // }
      // 镜头旋转（未生效）
      this.deg++
      this.camera.rotateY(this.deg/30000)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    recurveChildren(param) {

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
