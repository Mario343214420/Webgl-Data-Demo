<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h" @mousedown="onDocumentMouseDown" @mouseup="flag = false"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
export default {
  name: 'Channel19',
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
      info: {
        name: '',
        safe: true,
        // coordinate: '模拟坐标{x: 100, y: 200}',
        count: 100,
        info: '- 暂无 -'
      },
      floatPos: {
        x: 0,
        y: 0
      },
      bloomComposer: null,
      mixer1: null,
      mixer2: null,
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
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 8000)
      this.camera.position.z = 2000
      this.camera.position.x = 0
      this.camera.position.y = 500
      this.group = new THREE.Group()
      const fbxLoader = new FBXLoader()
      fbxLoader.load('./models/hami/吉矿_04.fbx', fbx => {
        console.log(fbx);
        fbx.scale.set(0.01,0.01,0.01)
        this.scene.add(fbx)
      })
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      //灯光属性
      const _spotLight = new THREE.SpotLight(0xf6f6f6);
      _spotLight.castShadow = true;
      _spotLight.position.set(1000,1000,1400);
      //设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024*4;
      let _spotLight2 = _spotLight.clone()
      _spotLight2.position.set(-1000,1000,-1400);
      let _spotLight3 = _spotLight.clone()
      _spotLight2.position.set(1000,1000,-1400);
      let _spotLight4 = _spotLight.clone()
      _spotLight2.position.set(-1000,1000,1400);
      this.scene.add(_spotLight);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      this.renderer.setSize(this.w, this.h)
      this.renderer.autoClear = false
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // this.controls.enableDamping = true
    },
    animate() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    onDocumentMouseDown(e) {
      e.preventDefault();
      //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
      this.mX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
      this.floatPos = {
        x: e.offsetX,
        y: e.offsetY
      }
      //新建一个三维单位向量 假设z方向就是0.5
      //根据照相机，把这个向量转换到视点坐标系
      let vector = new THREE.Vector3(this.mX, this.mY,0.5).unproject(this.camera);

      //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );

      const intersects = raycaster.intersectObjects( this.group.children );
      if(intersects[0]&&intersects[0].object.name){
        this.flag = true
      }
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
}
div{
  padding: 0
  margin: 0
}
body{
  padding: 0
  margin: 0
}
canvas {
  display block
}
</style>
