<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default {
  name: 'Channel_zongcaimian',
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
      copyPipe: null,
      group: null,
      group1: null,
      boxes: null,
      mX: null,
      mY: null,
      flag: false,
      windmill: null,
      info: {
        name: '',
        safe: '安全',
        coordinate: '模拟坐标{x: 100, y: 200}',
        v: '',
        a: '',
        count: 100
      },
      floatPos: {
        x: 0,
        y: 0
      },
      boxesList: [],
      addData: {
        x: '',
        y: '',
        z: '',
        name: '',
        type: '',
        a: '',
        v: '',
      },
      mixer: null,
      clock: null
    }
  },
  watch: {
    mX(n) {
      console.log(n)
    },
    mY(n) {
      console.log(n)
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
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 5000)
      this.camera.position.z = 1000
      this.camera.position.x = -800
      this.camera.position.y = 2400
      this.camera.lookAt(new THREE.Vector3(0,1200,0))
      this.group = new THREE.Group()
      this.group1 = new THREE.Group()
      const fbxLoader = new FBXLoader()
      fbxLoader.load("http://192.168.1.47:8000/gemeiji.FBX", fbx => {
        // fbx.children.shift()
        //   textureLoader.load('http://localhost:8000/windmill/Mat_Base_Color.tga.png', (texture) => {
        //     fbx.children[2].material.map = texture
        //     fbx.children[2].geometry.computeBoundingBox();
        //     fbx.children[2].geometry.center()
        //   })
        console.log(fbx)
        fbx.castShadow = true
        this.scene.add(fbx)
      });
      fbxLoader.load("http://192.168.1.47:8000/guabanji.FBX", fbx => {
        this.scene.add(fbx)
        console.log(fbx)
      });
      fbxLoader.load("http://192.168.1.47:8000/yeyazhijia.FBX", fbx => {
        console.log(fbx)
        this.scene.add(fbx)
        this.clock = new THREE.Clock();
        this.mixer = new THREE.AnimationMixer(fbx)
        let clipAction = this.mixer.clipAction(fbx.animations[0])
        clipAction.play()
        // fbx.castShadow = true
        // this.clock = new THREE.Clock();
        // this.mixer = new THREE.AnimationMixer(fbx)
        // let clipAction = this.mixer.clipAction(fbx.animations[0])
        // clipAction.play()
      });

      this.scene.add(this.group)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      this.renderer.setSize(this.w, this.h)

      this.renderer.shadowMapEnabled = true;
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    },
    animate() {
      if(this.mixer) {
        let delta = this.clock.getDelta();
        this.mixer.update(delta)
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
  position: relative
  .float {
    position: absolute
    opacity: 0
    z-index 100
    background-color: #fff
    border: 1px solid #000
    -webkit-border-radius: 6px
    -moz-border-radius: 6px
    border-radius: 6px
    padding: 20px
  }
  .handle-group {
    position: absolute;
    right: 20px;
    top: 20px;
    .row {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      margin: 8px 0
      input {
        margin-left: 10px
      }
    }
  }
}
</style>
