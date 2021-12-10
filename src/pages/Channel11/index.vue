<template>
  <div class="channel" ref="channel">
    <div class="float" :style="`top: ${this.floatPos.y - 140}px; left: ${this.floatPos.x + 20 }px; opacity: ${this.flag?'1': '0'}; display: ${this.flag?'block': 'none'}`">
      <div>设备名： {{info.name}}</div>
      <div>安全状态： {{info.safe}}</div>
      <div>当地坐标： {{info.coordinate}}</div>
      <div>周边人数： {{info.count}}</div>
      <div>设备型号： {{info.type}}</div>
      <div>额定电流： {{info.a}}</div>
      <div>额定电压： {{info.v}}</div>
    </div>
    <canvas ref="cvs" width="w" height="h" @mousedown="onDocumentMouseDown" @mouseup="flag = false"></canvas>
    <div class="handle-group">
      <div class="row" style="justify-content:center">
        <span style="font-weight: 700; font-size: 20px; margin-bottom: 20px;">添加标注区</span>
      </div>
      <div class="row">
        <span>（红轴）x:</span>
        <input type="text" v-model="addData.x">
      </div>
      <div class="row">
        <span>（绿轴）y:</span>
        <input type="text" v-model="addData.y">
      </div>
      <div class="row">
        <span>（蓝轴）z:</span>
        <input type="text" v-model="addData.z">
      </div>
      <div class="row">
        <span>（名称）name:</span>
        <input type="text" v-model="addData.name">
      </div>
      <div class="row">
        <span>（设备型号）type:</span>
        <input type="text" v-model="addData.type">
      </div>
      <div class="row">
        <span>（额定电压）V:</span>
        <input type="text" v-model="addData.v">
      </div>
      <div class="row">
        <span>（额定电流）A:</span>
        <input type="text" v-model="addData.a">
      </div>
      <div class="row" style="justify-content: flex-end;">
        <button @click="addBox">添加</button>
        <button @click="delBox" style="margin-left: 20px;">清空</button>
      </div>
    </div>
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
  name: 'Channel11',
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
      list: [
        "Tile_+000_+000_+000",
        "Tile_+000_+000_+001",
        "Tile_+000_+001_+000",
        "Tile_+000_+001_+001",
        "Tile_+000_+002_+000",
        "Tile_+000_+002_+001",
        "Tile_+000_+003_+000",
        "Tile_+000_+003_+001",
        "Tile_+000_+004_+000",
        "Tile_+000_+004_+001",
        "Tile_+000_+005_+000",
        "Tile_+000_+005_+001",
        "Tile_+000_+006_+001",
        "Tile_+000_+007_+001",
        "Tile_+001_+000_+000",
        "Tile_+001_+000_+001",
        "Tile_+001_+001_+000",
        "Tile_+001_+001_+001",
        "Tile_+001_+002_+000",
        "Tile_+001_+002_+001",
        "Tile_+001_+003_+000",
        "Tile_+001_+003_+001",
        "Tile_+001_+004_+000",
        "Tile_+001_+004_+001",
        "Tile_+001_+005_+000",
        "Tile_+001_+005_+001",
        "Tile_+001_+006_+000",
        "Tile_+001_+006_+001",
        "Tile_+001_+007_+001",
        "Tile_+002_+000_+000",
        "Tile_+002_+000_+001",
        "Tile_+002_+001_+000",
        "Tile_+002_+001_+001",
        "Tile_+002_+002_+000",
        "Tile_+002_+002_+001",
        "Tile_+002_+003_+000",
        "Tile_+002_+003_+001",
        "Tile_+002_+004_+000",
        "Tile_+002_+004_+001",
        "Tile_+002_+005_+000",
        "Tile_+002_+005_+001",
        "Tile_+002_+006_+000",
        "Tile_+002_+006_+001",
        "Tile_+002_+007_+000",
        "Tile_+002_+007_+001",
        "Tile_+003_+000_+000",
        "Tile_+003_+001_+000",
        "Tile_+003_+001_+001",
        "Tile_+003_+002_+000",
        "Tile_+003_+002_+001",
        "Tile_+003_+003_+000",
        "Tile_+003_+003_+001",
        "Tile_+003_+004_+000",
        "Tile_+003_+004_+001",
        "Tile_+003_+005_+000",
        "Tile_+003_+005_+001",
        "Tile_+003_+006_+000",
        "Tile_+003_+006_+001",
        "Tile_+003_+007_+000",
        "Tile_+003_+007_+001",
        "Tile_+004_+000_+000",
        "Tile_+004_+001_+000",
        "Tile_+004_+001_+001",
        "Tile_+004_+002_+000",
        "Tile_+004_+002_+001",
        "Tile_+004_+003_+000",
        "Tile_+004_+003_+001",
        "Tile_+004_+004_+000",
        "Tile_+004_+004_+001",
        "Tile_+004_+005_+000",
        "Tile_+004_+005_+001",
        "Tile_+004_+006_+000",
        "Tile_+004_+006_+001",
        "Tile_+004_+007_+000",
        "Tile_+004_+007_+001",
        "Tile_+005_+000_+000",
        "Tile_+005_+000_+001",
        "Tile_+005_+001_+000",
        "Tile_+005_+001_+001",
        "Tile_+005_+002_+000",
        "Tile_+005_+002_+001",
        "Tile_+005_+003_+000",
        "Tile_+005_+003_+001",
        "Tile_+005_+004_+000",
        "Tile_+005_+004_+001",
        "Tile_+005_+005_+000",
        "Tile_+005_+005_+001",
        "Tile_+005_+006_+000",
        "Tile_+005_+006_+001",
        "Tile_+005_+007_+001",
        "Tile_+006_+000_+000",
        "Tile_+006_+000_+001",
        "Tile_+006_+001_+000",
        "Tile_+006_+001_+001",
        "Tile_+006_+002_+000",
        "Tile_+006_+002_+001",
        "Tile_+006_+003_+000",
        "Tile_+006_+003_+001",
        "Tile_+006_+004_+000",
        "Tile_+006_+004_+001",
        "Tile_+006_+005_+000",
        "Tile_+006_+005_+001",
        "Tile_+006_+006_+000",
        "Tile_+006_+006_+001",
        "Tile_+006_+007_+001"
      ],
      boxesList: [],
      addData: {
        x: '',
        y: '',
        z: '',
        name: '',
        type: '',
        a: '',
        v: '',
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
      // const objLoader = new OBJLoader()
      const fbxLoader = new FBXLoader()
      const gltfLoader = new GLTFLoader()
      const textureLoader = new THREE.TextureLoader()
      // const mtlLoader = new MTLLoader();
      gltfLoader.load(`http://localhost:8000/windmill/scene.gltf`, gltf => {
        /*let loadPic1 = textureLoader.load('http://localhost:8000/Mat_Base_Color.tga.png', texture => {
          fbx.children[1].material.map = texture
          fbx.children[1].geometry.computeBoundingBox();
          fbx.children[1].geometry.center()
          fbx.children[2].material.map = texture
          fbx.children[2].geometry.computeBoundingBox();
          fbx.children[2].geometry.center()
          fbx.children[3].material.map = texture
          fbx.children[3].geometry.computeBoundingBox();
          fbx.children[3].geometry.center()
          fbx.position.y = 0;
          this.group.add(fbx.children[1])
          this.group.add(fbx.children[2])
          this.group.add(fbx.children[3])
        })
        let loadPic2 = textureLoader.load('http://localhost:8000/_Mat_Base_Color.tga.png', texture => {

        })*/
        console.log(gltf)
        gltf.scene.scale.x = 0.002
        gltf.scene.scale.y = 0.002
        gltf.scene.scale.z = 0.002
        this.windmill = gltf
      })
      this.list.forEach(item => {
        fbxLoader.load(`http://localhost:8000/${item}/${item}.fbx`, fbx => {
          // let map = fbx.children[0].material.map
          // let geo = fbx.children[0].geometry
          // geo.rotation.x = -Math.PI / 2
          // geo.rotation.z = -Math.PI / 6
          // geo.position.y = -30
          // geo.position.z = 120
          fbx.rotation.x = -Math.PI / 2
          fbx.rotation.z = -Math.PI / 6
          fbx.position.y = -30
          fbx.position.z = 120
          this.group.add(fbx)
          // let points = new THREE.Points(geo, new THREE.PointsMaterial({size: 1}))
          // points.rotation.x = -Math.PI / 2
          // points.rotation.z = -Math.PI / 6
          // points.position.y = -30
          // points.position.z = 120
          // this.group.add(points)
          // console.log(points)
        })
      })
      /**
3dtile.exe -f b3dm -i E:\projects\suligejingchang\set\Data\Tile_+007_+000\Tile_+007_+000.b3dm -o E:\projects\suligejingchang\006\Tile_+007_+000.gltf
3dtile.exe -f b3dm -i E:\projects\suligejingchang\set\Data\Tile_+008_+000\Tile_+008_+000.b3dm -o E:\projects\suligejingchang\008\Tile_+008_+000.gltf
       */
      this.boxes = new THREE.Group()

      // this.scene.add(this.group1)
      this.scene.add(this.group)
      this.scene.add(this.boxes)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)

      this.renderer.shadowMapEnabled = true;
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

      const intersects = raycaster.intersectObjects( this.boxes.children );
      if(intersects[0] && intersects[0].object.name){
        this.flag = true
        this.info.name = intersects[0].object.name
        this.info.type = intersects[0].object.type
        this.info.v = intersects[0].object.v
        this.info.a = intersects[0].object.a
        this.info.coordinate = `坐标 { x: ${intersects[0].object.position.x}, y: ${intersects[0].object.position.y}, z: ${intersects[0].object.position.z} }`
        this.info.count = parseInt(Math.random() * 30)
      }
      /*//射线和模型求交，选中一系列直线
      var intersects = raycaster.intersectObjects(objects);
      console.log('imtersrcts=' + intersects)
      if (intersects.length > 0) {
        //选中第一个射线相交的物体
        SELECTED = intersects[0];
        var intersected = intersects[0];
        console.log(intersects[0])
      }*/
    },
    addBox() {
      const boxGeo = new THREE.BoxGeometry(10, 10, 10);
      const boxMaterial = new THREE.MeshBasicMaterial({
        opacity: 0, transparent: true
      }); //材质对象Material
      const box = new THREE.Mesh(boxGeo, boxMaterial);
      const windmill = this.windmill.clone()
      console.log(windmill)
      let mixer = new THREE.AnimationMixer(windmill)
      let aa = mixer.clipAction(windmill.animations[0])
      aa.play()
      this.boxesList.push(this.addData)
      box.position.x = windmill.position.x = this.addData.x
      box.position.y = windmill.position.y = this.addData.y
      box.position.z = windmill.position.z = this.addData.z
      box.name = this.addData.name
      box.type = this.addData.type
      box.v = this.addData.v
      box.a = this.addData.a
      this.boxes.add(box)
      this.boxes.add(windmill)
    },
    delBox() {
      this.boxes = new THREE.Group()
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
