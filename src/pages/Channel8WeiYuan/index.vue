<template>
  <div class="channel" ref="channel">
    <div class="float" :style="`top: ${this.floatPos.y - 140}px; left: ${this.floatPos.x }px; opacity: ${this.flag?'1': '0'}; display: ${this.flag?'block': 'none'}`">
      <div>地名： {{info.name}}</div>
      <div>安全状态： {{info.safe}}</div>
      <div>当地坐标： {{info.coordinate}}</div>
      <div>当地人数： {{info.count}}</div>
    </div>
    <canvas ref="cvs" width="w" height="h" @mousedown="onDocumentMouseDown" @mouseup="flag = false"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
export default {
  name: 'Channel8WeiYuan',
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
        safe: '安全',
        coordinate: '模拟坐标{x: 100, y: 200}',
        count: 100
      },
      floatPos: {
        x: 0,
        y: 0
      }
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
      this.camera.position.z = 200
      this.camera.position.x = 0
      this.camera.position.y = 200
      this.group = new THREE.Group()
      this.group1 = new THREE.Group()
      const fbxLoader = new FBXLoader()
      let list = [
        // "Tile_+000_+000",
        // "Tile_+000_+001",
        // "Tile_+000_+002",
        // "Tile_+000_+003",
        // "Tile_+000_+004",
        // "Tile_+000_+005",
        // "Tile_+000_+006",
        // "Tile_+000_+007",
        // "Tile_+000_+008",
        // "Tile_+000_+009",
        // "Tile_+000_+010",
        // "Tile_+000_+011",
        // "Tile_+001_+000",
        // "Tile_+001_+001",
        // "Tile_+001_+002",
        // "Tile_+001_+003",
        // "Tile_+001_+004",
        // "Tile_+001_+005",
        // "Tile_+001_+006",
        // "Tile_+001_+007",
        // "Tile_+001_+008",
        // "Tile_+001_+009",
        // "Tile_+001_+010",
        // "Tile_+001_+011",
        // "Tile_+002_+000",
        // "Tile_+002_+001",
        // "Tile_+002_+002",
        // "Tile_+002_+003",
        // "Tile_+002_+004",
        // "Tile_+002_+005",
        // "Tile_+002_+006",
        // "Tile_+002_+007",
        // "Tile_+002_+008",
        // "Tile_+002_+009",
        // "Tile_+002_+010",
        // "Tile_+002_+011",
        // "Tile_+003_+000",
        // "Tile_+003_+001",
        // "Tile_+003_+002",
        // "Tile_+003_+003",
        "Tile_+003_+004",
        "Tile_+003_+005",
        "Tile_+003_+006",
        "Tile_+003_+007",
        "Tile_+003_+008",
        // "Tile_+003_+009",
        // "Tile_+003_+010",
        // "Tile_+003_+011",
        // "Tile_+004_+000",
        // "Tile_+004_+001",
        // "Tile_+004_+002",
        // "Tile_+004_+003",
        "Tile_+004_+004",
        "Tile_+004_+005",
        "Tile_+004_+006",
        "Tile_+004_+007",
        "Tile_+004_+008",
        // "Tile_+004_+009",
        // "Tile_+004_+010",
        // "Tile_+004_+011",
        // "Tile_+005_+000",
        // "Tile_+005_+001",
        // "Tile_+005_+002",
        // "Tile_+005_+003",
        "Tile_+005_+004",
        "Tile_+005_+005",
        "Tile_+005_+006",
        "Tile_+005_+007",
        "Tile_+005_+008",
        // "Tile_+005_+009",
        // "Tile_+005_+010",
        // "Tile_+005_+011",
        // "Tile_+006_+000",
        // "Tile_+006_+001",
        // "Tile_+006_+002",
        // "Tile_+006_+003",
        "Tile_+006_+004",
        "Tile_+006_+005",
        "Tile_+006_+006",
        "Tile_+006_+007",
        "Tile_+006_+008",
        // "Tile_+006_+009",
        // "Tile_+006_+010",
        // "Tile_+006_+011",
        // "Tile_+007_+000",
        // "Tile_+007_+001",
        // "Tile_+007_+002",
        // "Tile_+007_+003",
        // "Tile_+007_+004",
        // "Tile_+007_+005",
        // "Tile_+007_+006",
        // "Tile_+007_+007",
        // "Tile_+007_+008",
        // "Tile_+007_+009",
        // "Tile_+007_+010",
        // "Tile_+007_+011",
        // "Tile_+008_+000",
        // "Tile_+008_+001",
        // "Tile_+008_+002",
        // "Tile_+008_+003",
        // "Tile_+008_+004",
        // "Tile_+008_+005",
        // "Tile_+008_+006",
        // "Tile_+008_+007",
        // "Tile_+008_+008",
        // "Tile_+008_+009",
        // "Tile_+008_+010",
        // "Tile_+008_+011",
        // "Tile_+009_+000",
        // "Tile_+009_+001",
        // "Tile_+009_+002",
        // "Tile_+009_+003",
        // "Tile_+009_+004",
        // "Tile_+009_+005",
        // "Tile_+009_+006",
        // "Tile_+009_+007",
        // "Tile_+009_+008",
        // "Tile_+009_+009",
        // "Tile_+009_+010",
        // "Tile_+009_+011"
      ]
      list.forEach((item, index) => {
        let url = `http://192.168.1.33:8000/${item}/${item}.FBX`
        fbxLoader.load(url, fbx => {
          this.group.add(fbx)
          this.group.position.y = 45
          this.group.rotation.x = -Math.PI / 2
        })
      })

      // this.scene.add(this.group1)
      this.scene.add(this.group)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
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

      // const intersects = raycaster.intersectObjects( this.boxes.children );
      // if(intersects[0].object.name){
      //   this.flag = true
      //   this.info.name = intersects[0].object.name
      //   this.info.count = parseInt(Math.random() * 30)
      // }
      /*//射线和模型求交，选中一系列直线
      var intersects = raycaster.intersectObjects(objects);
      console.log('imtersrcts=' + intersects)
      if (intersects.length > 0) {
        //选中第一个射线相交的物体
        SELECTED = intersects[0];
        var intersected = intersects[0];
        console.log(intersects[0])
      }*/
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
}
</style>
