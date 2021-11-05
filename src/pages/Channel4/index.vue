<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default {
  name: 'Channel3',
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
      const loader = new GLTFLoader()
      loader.load('./models/dragoner/scene.gltf', (obj) => {

        obj.scene.traverse( function ( child ) {
          if ( child.isMesh ) {
            child.material.emissive =  child.material.color;
            child.material.emissiveMap = child.material.map ;
          }
        });
        console.log(obj)
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
      })
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, })
      this.renderer.setSize(1000, 700)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      this.controls.autoRotate = true;
    },
    animate() {
      // 镜头旋转（未生效）
      this.deg++
      this.camera.rotateY(this.deg/30000)
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
