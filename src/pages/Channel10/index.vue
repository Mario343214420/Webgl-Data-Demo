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
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
export default {
  name: 'Channel10',
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
      this.camera.position.z = 20
      this.camera.position.x = 0
      this.camera.position.y = 20
      this.group = new THREE.Group()
      this.group1 = new THREE.Group()
      const objLoader = new OBJLoader()
      const fbxLoader = new FBXLoader()
      const textureLoader = new THREE.TextureLoader()
      // objLoader.load('http://192.168.1.128:8000/Tile_+003_+014_+008/Tile_+003_+014_+008.obj', obj => {
      //   console.log(obj)
      //   textureLoader.load('http://192.168.1.128:8000/Tile_+003_+014_+008/Tile_+003_+014_+008_0.jpg', (texture) => {
      //     obj.children[0].material.map = texture
      //     obj.children[0].geometry.computeBoundingBox();
      //     obj.children[0].geometry.center()
      //     obj.position.y = 0;
      //     //添加这段代码
      //     //遍历模型每部分
      //     // console.log(model);
      //     this.scene.add(obj)
      //   })
      // })
      fbxLoader.load('http://192.168.1.128:8000/Model.fbx', fbx => {
        textureLoader.load('http://192.168.1.128:8000/Model_0.jpg', (texture) => {
          fbx.children[0].material.map = texture
          fbx.children[0].geometry.computeBoundingBox();
          fbx.children[0].geometry.center()
          fbx.position.y = 0;
          //添加这段代码
          //遍历模型每部分
          // console.log(model);
          fbx.rotation.x = -Math.PI / 2
          this.scene.add(fbx)
        })
      })

      /**
3dtile.exe -f b3dm -i E:\projects\suligejingchang\set\Data\Tile_+007_+000\Tile_+007_+000.b3dm -o E:\projects\suligejingchang\006\Tile_+007_+000.gltf
3dtile.exe -f b3dm -i E:\projects\suligejingchang\set\Data\Tile_+008_+000\Tile_+008_+000.b3dm -o E:\projects\suligejingchang\008\Tile_+008_+000.gltf
       */

      // this.scene.add(this.group1)
      this.scene.add(this.group)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      /** 交互用几何体 */
      this.boxes = new THREE.Group()
      const g = new THREE.BoxGeometry(8, 8, 8); //创建一个立方体几何对象Geometry
      const m = new THREE.MeshPhongMaterial({
        color:0x0000ff,
        specular:0x4488ee,
        shininess:12,
        opacity: 0.2,
        transparent: true
      }); //材质对象Material
      const box = new THREE.Mesh(g, m); //网格模型对象mesh
      box.position.x = 0
      box.position.y = -20
      box.position.z = 0
      this.boxes.add(box)
      let box1 = box.clone(box)
      box1.position.x = 80
      box1.position.y = -30
      box1.position.z = -100
      let box2 = box.clone(box)
      box2.position.x = 380
      box2.position.z = -20
      box.name = "拍摄点"
      box1.name = "隧道口"
      box2.name = "地点3"
      this.boxes.add(box1)
      this.boxes.add(box2)
      this.boxes.add(box)
      this.scene.add(this.boxes)


      //灯光属性
      /*const _spotLight = new THREE.SpotLight(0xf6f6f6);
      _spotLight.castShadow = true;
      _spotLight.position.set(1000,1000,1000);
      //设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024*4;
      this.scene.add(_spotLight);*/

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
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

      const intersects = raycaster.intersectObjects( this.boxes.children );
      if(intersects[0] && intersects[0].object.name){
        this.flag = true
        this.info.name = intersects[0].object.name
        this.info.count = parseInt(Math.random() * 30)
        if (intersects[0].object.name === '拍摄点') {
          this.info.count = 3
        }
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
