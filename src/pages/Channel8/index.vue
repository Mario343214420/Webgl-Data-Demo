<template>
  <div class="channel" ref="channel">
    <div class="float" :style="`top: ${this.floatPos.y - 140}px; left: ${this.floatPos.x }px; opacity: ${this.flag?'1': '0'}; display: ${this.flag?'block': 'none'}`">
      <div>地名： {{info.name}}</div>
      <div>安全状态： {{info.safe}}</div>
      <div>当地坐标： {{info.coordinate}}</div>
      <div>当地人数： {{info.count}}</div>
    </div>
    <div class="add-float">
      <div class="row">模型名称：<el-input style="width: 280px" size="mini" type="text" v-model="modelName" /></div>
      <div class="row">模型路径：<el-input style="width: 280px" size="mini" type="text" v-model="modelPath" /></div>
      <div class="row three-ipt">模型定位：
        <el-input style="width: 60px; margin-right: 6px" size="mini" type="text" v-model="modelPosX" />
        <el-input style="width: 60px; margin-right: 6px" size="mini" type="text" v-model="modelPosY" />
        <el-input style="width: 60px;" size="mini" type="text" v-model="modelPosZ" />
      </div>
      <div class="row three-ipt">模型转角：
        <el-input style="width: 60px; margin-right: 6px" size="mini"  type="text" v-model="modelRotX" />
        <el-input style="width: 60px; margin-right: 6px" size="mini" type="text" v-model="modelRotY" />
        <el-input style="width: 60px;" size="mini" type="text" v-model="modelRotZ" />
        (PI=3.1416)
      </div>
      <div class="row three-ipt">模型缩放：
        <el-input style="width: 60px; margin-right: 6px" size="mini" type="text" v-model="modelScaleX" />
        <el-input style="width: 60px; margin-right: 6px" size="mini" type="text" v-model="modelScaleY" />
        <el-input style="width: 60px;" size="mini" type="text" v-model="modelScaleZ" />
      </div>
      <div class="row"><Button @click="loadModel">导入模型</Button></div>
      <div class="row"><Button @click="saveModel">模型调整（存储）</Button></div>
      <div class="row"><Button @click="clearModel">清空缓存</Button></div>

    </div>
    <canvas ref="cvs" width="w" height="h" @mousedown="onDocumentMouseDown" @mouseup="flag = false"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
export default {
  name: 'Channel8',
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
      },
      modelGroup: null,
      loadingList: [

      ],
      // modelCurrentMsg: {
      //   modelName: '.FBX',
      //   modelPath: 'http://192.168.1.33:8000/',
      //   modelPos: [0,0,0],
      //   modelRot: [0,0,0],
      //   modelScale: [0.1,0.1,0.1]
      // },
      modelPath: './models/chuanqing/',
      modelName: '.FBX',
      modelPosX: '0',
      modelPosY: '0',
      modelPosZ: '0',
      modelRotX: '0',
      modelRotY: '0',
      modelRotZ: '0',
      modelScaleX: '0.1',
      modelScaleY: '0.1',
      modelScaleZ: '0.1'
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
      this.camera.position.x = -200
      this.camera.position.y = 200
      this.group = new THREE.Group()
      this.group1 = new THREE.Group()
      this.modelGroup = new THREE.Group()
      const glbLoader = new GLTFLoader()
      let list = [
        [2,3,4,5,6,7], // 0
        [2,3,4,5,6,7,8,9], // 1
        [0,1,2,3,4,5,6,7,8,9,10,11], // 2
        [0,1,2,3,4,5,6,7,8,9,10,11], // 3
        [0,1,2,3,4,5,6,7,8,9,10,11], // 4
        [0,1,2,3,4,5,6,7,8,9,10,11], // 5
        [0,1,2,3,4,5,6,7,8,9,10,11], // 6
        [0,1,2,3,4,5,6,7,8,9,10,11], // 7
        [0,1,2,3,4,5,6,7,8,9,10,11], // 8
        [0,1,2,3,4,5,6,7,8,9,10,11], // 9
        [2,3,4,5,6,7,8,9,10], // 10
        [3,4,5,6,7,8,9,10], // 11
      ]
      list.forEach((item, index) => {
        item.forEach(i => {
          let url = `./models/3dtiles/00${index}/Tile_+00${index}_+00${i}.gltf`
          glbLoader.load(url, glb=>{
            let mesh = glb.scene.children[0]
            mesh.material.wireframe = true
            mesh.position.x += 100
            mesh.position.y += 100
            mesh.position.z = -1400
            // mesh.material.emissive = new THREE.color('#ffffff')
            let geo = mesh.geometry
            this.group.add(mesh)
            this.group.rotation.x = -Math.PI / 2
            let m = new THREE.PointsMaterial({
              color: 0x0000ff, //颜色
              size: 16, //点渲染尺寸
            });
            this.group1.add(new THREE.Points(geo, m))
          }, progress => {
            // console.log(progress)
          }, err => {
            // console.log(err)
          })
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
      const g = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
      const m = new THREE.MeshPhongMaterial({
        color:0x0000ff,
        specular:0x4488ee,
        shininess:12,
        opacity: 0.2,
        transparent: true
      }); //材质对象Material
      const box = new THREE.Mesh(g, m); //网格模型对象mesh
      box.position.x = -50
      box.position.z = -120
      this.boxes.add(box)
      let box1 = box.clone(box)
      box1.position.x = 180
      box1.position.z = -30
      let box2 = box.clone(box)
      box2.position.x = 380
      box2.position.z = -20
      box.name = "地点1"
      box1.name = "地点2"
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
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      this.scene.add(this.modelGroup)
      this.initMemoryModel()
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
      if(intersects[0].object.name){
        this.flag = true
        this.info.name = intersects[0].object.name
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
    initMemoryModel() {
      let list = JSON.parse(localStorage.getItem('modelList'))
      if(list) {
        list.forEach(item => {
          let loader = new FBXLoader()
          loader.load(item.modelPath + item.modelName, fbx => {
            fbx.scale.set(parseFloat(item.modelScale[0]),parseFloat(item.modelScale[1]),parseFloat(item.modelScale[2]))
            fbx.position.set(parseFloat(item.modelPos[0]),parseFloat(item.modelPos[1]),parseFloat(item.modelPos[2]))
            fbx.rotation.set(parseFloat(item.modelRot[0]),parseFloat(item.modelRot[1]),parseFloat(item.modelRot[2]))
            this.modelGroup.add(fbx)
          })
        })
      }
      // if(this.list.length > 0) {
      //   this.modelGroup = new THREE.Group()
      //   list.forEach(item => {
      //     const loader = new FBXLoader()
      //     loader.load(item.modelPath + item.modelName, fbx => {
      //       fbx.scale.set(parseInt(item.modelScale[0]),parseInt(item.modelScale[1]),parseInt(item.modelScale[2]))
      //       fbx.position.set(parseInt(item.modelPos[0]),parseInt(item.modelPos[1]),parseInt(item.modelPos[2]))
      //       fbx.rotation.set(parseInt(item.modelRot[0]),parseInt(item.modelRot[1]),parseInt(item.modelRot[2]))
      //       this.modelGroup.add(fbx)
      //       this.scene.add(this.modelGroup)
      //     })
      //   })
      // }
    },
    loadModel() {
      let path = this.modelPath + this.modelName
      let loader = new FBXLoader()
      loader.path = path
      this.loadingList.push({
        modelName: this.modelName,
        modelPath: this.modelPath,
        modelPos: [this.modelPosX,this.modelPosY,this.modelPosZ],
        modelRot: [this.modelRotX,this.modelRotY,this.modelRotZ],
        modelScale: [this.modelScaleX, this.modelScaleY, this.modelScaleZ],
      })
      loader.load('',fbx => {
        fbx.scale.set(this.modelScaleX,this.modelScaleY,this.modelScaleZ)
        fbx.position.set(this.modelPosX,this.modelPosY,this.modelPosZ)
        fbx.rotation.set(this.modelRotX,this.modelRotY,this.modelRotZ)
        this.modelGroup.add(fbx)
      })
    },
    saveModel() {
      localStorage.setItem('modelList', JSON.stringify(this.loadingList))
      this.initMemoryModel()
    },
    clearModel() {
      localStorage.clear()
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
  .add-float {
    background-color: rgba(0,0,0,0.7)
    width: 400px
    height: 400px
    position: absolute
    top: 10px
    left: 10px
    display: flex
    flex-direction: column
    justify-content space-around
    box-sizing: border-box
    padding: 10px 20px
    color: #fff
    .row {
      input {
        display: inline-block;
        width: 260px
      }
      &.three-ipt {
        input {
          width 40px
          margin-right: 6px
          display inline-block
        }
      }
    }
  }
}
</style>
