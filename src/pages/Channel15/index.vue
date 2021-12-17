<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h" @mousedown.left="cvsClick"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import TWEEN from 'tween.js'
export default {
  name: 'Channel15',
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
      target: {
        x1: 0,
        y1: 6000,
        z1: 9000,
        x2: 0,
        y2: 0,
        z2: 0
      },
      tween: null
    }
  },
  watch: {
    /*target: {
      handler(n, o) {
        // 切换动画
        this.tween = new TWEEN.Tween(o)
        this.tween.onComplete(() => {
          console.log('完成动画')
        })
        this.tween.to(n, 2000)
        this.tween.onUpdate(() => {
          this.camera.position.x = n.x1
          this.camera.position.y = n.y1
          this.camera.position.z = n.z1
          this.controls.target.x = n.x2
          this.controls.target.y = n.y2
          this.controls.target.z = n.z2
        })
        this.tween.easing(TWEEN.Easing.Quadratic.Out)
        this.tween.start()
      },
      deep: true
    }*/
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
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 14000)
      this.camera.position.z = this.target.z1
      this.camera.position.y = this.target.y1
      this.camera.lookAt(new THREE.Vector3(this.target.x, this.target.y, this.target.z))
      const helper = new THREE.CameraHelper( this.camera );
      this.scene.add( helper );

      // 日照光添加
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);
      const _pointLight = new THREE.PointLight(0xffffff)
      _pointLight.position.set(-5000, 4000, 0)
      this.scene.add(_pointLight)
      // 基准轴线添加
      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add( axesHelper );

      // 盒子组
      this.boxes = new THREE.Group()

      const fbxLoader = new FBXLoader()
      fbxLoader.load('./models/build/floor.fbx', cube => {
        for (let i = 0; i < 10; i++) {
          const box = cube.clone()
          box.position.y = 400 * i
          box.name = `box${i}`
          box.index = i
          this.boxes.add(box)
        }
        this.scene.add(this.boxes)
      })

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.y = 2000
      this.controls.enableDamping = true
    },
    animate() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
      if(this.tween) {
        TWEEN.update()
      }
    },
    moveSmooth() {
      this.tween = new TWEEN.Tween(this.target).to({
        x1: intersects[0].object.position.x,
        y1: intersects[0].object.position.y + 200,
        z1: intersects[0].object.position.z + 200,
        x2: intersects[0].object.position.x,
        y2: intersects[0].object.position.y,
        z2: intersects[0].object.position.z,
      }, 1000)
      this.tween.onComplete(() => {
        console.log('完成动画')
      })
      this.tween.onUpdate(() => {
        this.controls.target.x = this.target.x2
        this.controls.target.y = this.target.y2
        this.controls.target.z = this.target.z2
      })
      this.tween.easing(TWEEN.Easing.Quadratic.Out)
      this.tween.start()
      if(this.tween) {
        try {　// 放在 TWEEN.js未加载完成导致报错
          TWEEN.update();
        } catch (error) {
          console.log(error)
        }
      }
    },
    cvsClick(e) {
      e.preventDefault();
      //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
      this.mX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
      //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
      this.raycaster = new THREE.Raycaster();
      this.raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      const intersects = this.raycaster.intersectObjects( this.boxes.children, true );
      if(intersects[0] && intersects[0].object.name){
        console.log(intersects[0].object.parent, this.boxes)
        const idx = intersects[0].object.parent.index
        this.boxes.children.forEach((item, index) => {
          if(item.index === idx) {
            item.position.y += 200
          } else if(item.index > idx) {
            item.position.y += 400
          }
        })
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
