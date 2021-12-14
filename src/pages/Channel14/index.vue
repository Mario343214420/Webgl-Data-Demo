<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h" @click="cvsClick"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import TWEEN from 'tween.js'
export default {
  name: 'Channel14',
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
      clock: null,
      raycaster: null,
      target: null
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
      this.camera.position.z = 200

      // 日照光添加
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      // 基准轴线添加
      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add( axesHelper );

      // 盒子组
      this.boxes = new THREE.Group()
      const geometry = new THREE.BoxGeometry( 20, 20, 20 );
      const material = new THREE.MeshBasicMaterial( {color: 0x0000af} );
      const cube = new THREE.Mesh( geometry, material );
      const box1 = cube.clone()
      box1.position.x = 60
      box1.name = 'box1'
      const box2 = cube.clone()
      box2.position.x = -30
      box2.position.z = 40
      box2.name = 'box2'
      const box3 = cube.clone()
      box3.name = 'box3'
      this.boxes.add(box1)
      this.boxes.add(box2)
      this.boxes.add(box3)

      this.scene.add(this.boxes)

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    },
    animate() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    cvsClick(e) {
      e.preventDefault();
      //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
      this.mX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
      //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
      this.raycaster = new THREE.Raycaster();
      this.raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      const intersects = this.raycaster.intersectObjects( this.boxes.children );
      if(intersects[0] && intersects[0].object.name){
        this.flag = true
        this.info.name = intersects[0].object.name
        this.info.count = parseInt(Math.random() * 30)
        this.animateCamera(
          {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z,
          },
          {
            x: this.target ? this.target.x : 0,
            y: this.target ? this.target.y : 0,
            z: this.target ? this.target.z : 0
          },
          {
            x: intersects[0].object.position.x,
            y: intersects[0].object.position.y + 200,
            z: intersects[0].object.position.z + 200
          },
          {
            x: intersects[0].object.position.x,
            y: intersects[0].object.position.y,
            z: intersects[0].object.position.z
          }
        )
        this.target = {
          x: intersects[0].object.position.x,
          y: intersects[0].object.position.y,
          z: intersects[0].object.position.z
        }
      }
    },
    animateCamera(oldP, oldT, newP, newT, callBack){
      var tween = new TWEEN.Tween({
        x1: oldP.x, // 相机x
        y1: oldP.y, // 相机y
        z1: oldP.z, // 相机z
        x2: oldT.x, // 控制点的中心点x
        y2: oldT.y, // 控制点的中心点y
        z2: oldT.z  // 控制点的中心点z
      });
      tween.to({
        x1: newP.x,
        y1: newP.y,
        z1: newP.z,
        x2: newT.x,
        y2: newT.y,
        z2: newT.z
      },1000);
      tween.onUpdate(object => {
        this.camera.position.x = object.x1;
        this.camera.position.y = object.y1;
        this.camera.position.z = object.z1;
        this.controls.target.x = object.x2;
        this.controls.target.y = object.y2;
        this.controls.target.z = object.z2;
        this.controls.update();
      })
      tween.onComplete(() => {
        this.controls.enabled = true;
        callBack&&callBack()
      })
      tween.easing(TWEEN.Easing.Cubic.InOut);
      tween.start();
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
