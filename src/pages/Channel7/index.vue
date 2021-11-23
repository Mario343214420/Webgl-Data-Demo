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
  name: 'Channel7',
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
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 2000)
      this.camera.position.z = 300
      this.camera.position.y = 400

      const glbLoader = new GLTFLoader()
      glbLoader.load('./models/complete_model/keyshot/GLB/钻杆模型.glb', glb=>{
        this.scene.add(glb.scene)
      })

      glbLoader.load('./models/complete_model/keyshot/GLB/钻杆1.glb', glb=>{
        glb.scenes[0].rotateZ(Math.PI/2)
        glb.scenes[0].position.y = 90
        this.pipe = glb.scenes[0]
        this.pipeList = new THREE.Group()
      })

      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      //灯光属性
      const _spotLight = new THREE.SpotLight(0xf6f6f6);
      _spotLight.castShadow = true;
      _spotLight.position.set(1000,1000,1000);
      //设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024*4;
      this.scene.add(_spotLight);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    },
    animate() {
      // 镜头旋转（未生效）
      this.deg++
      /*if(this.pipe) {
        this.pipe.position.x = this.deg % 150
      }*/
      if(this.pipeList.position) {
        this.pipeList.position.x = -this.deg + 204
      }
      if(this.deg % 150 === 0) {
        let i = parseInt(this.deg/204)
        let copy = this.pipe.clone()
        copy.position.x = i * 204
        this.pipeList.add(copy)
        this.scene.children[4] = this.pipeList
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
