<template>
  <div class="channel" ref="channel">
    <div class="float" :style="`top: ${floatPos.y - 140}px; left: ${floatPos.x }px; opacity: ${flag?'1': '0'}; display: ${flag?'block': 'none'}`">
      <div>地名： {{info.name}}</div>
      <div>安全状态： {{info.safe}}</div>
      <div>当地坐标： {{info.coordinate}}</div>
      <div>当地人数： {{info.count}}</div>
    </div>
    <div class="mark-group">
      <div class="row">
        <input v-model="plane1.x"></input>
        <input v-model="plane1.y"></input>
        <input v-model="plane1.z"></input>
        <span @click="movePlane1">move 1</span>
      </div>
      <div class="row">
        <input v-model="plane2.x"></input>
        <input v-model="plane2.y"></input>
        <input v-model="plane2.z"></input>
        <span @click="movePlane2">move 2</span>
      </div>
      <div class="row">
        <input v-model="plane3.x"></input>
        <input v-model="plane3.y"></input>
        <input v-model="plane3.z"></input>
        <span @click="movePlane3">move 3</span>
      </div>
      <div class="row">
        <input v-model="plane4.x"></input>
        <input v-model="plane4.y"></input>
        <input v-model="plane4.z"></input>
        <span @click="movePlane4">move 4</span>
      </div>
      <div class="row">
        <input v-model="basePosition.x"></input>
        <input v-model="basePosition.y"></input>
        <input v-model="basePosition.z"></input>
        <span @click="moveBasePosition">move base</span>
      </div>
      <div class="row">
        <input v-model="basePosition.rX">
        <input v-model="basePosition.rY">
        <input v-model="basePosition.rZ">
        <span>/</span>
      </div>
      <div class="row">
        <input v-model="basePosition.cX" >
        <input v-model="basePosition.cY" disabled="disabled" readonly="true">
        <input v-model="basePosition.cZ" disabled="disabled" readonly="true">
        <span>/</span>
      </div>
    </div>
    <canvas ref="cvs" width="w" height="h" @mousedown="onDocumentMouseDown" @mouseup="flag = false"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
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
      groupModel: null,
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
      bloomComposer: null,
      cubeGroup: null,
      baseGroup: null,
      plane1: {
        x: 0,
        y: 0,
        z: 0
      },
      plane2: {
        x: 0,
        y: 0,
        z: 0
      },
      plane3: {
        x: 0,
        y: 0,
        z: 0
      },
      plane4: {
        x: 0,
        y: 0,
        z: 0
      },
      basePosition: {
        x: 0,
        y: 0,
        z: 0,
        rX: 0,
        rY: 0,
        rZ: 0,
        cX: 0,
        cY: 0,
        cZ: 0
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
    moveBasePosition() {
      console.log(this.baseGroup)
      this.baseGroup.position.set(this.basePosition.x, this.basePosition.y, this.basePosition.z)
      this.baseGroup.rotation.set(this.basePosition.rX, this.basePosition.rY, this.basePosition.rZ)
      this.baseGroup.scale.set(this.basePosition.cX, this.basePosition.cX, this.basePosition.cX)
    },
    movePlane1(){
      // console.log(this.cubeGroup)
      this.cubeGroup.children[0].position.set(this.plane1.x,this.plane1.y,this.plane1.z)
    },
    movePlane2(){
      this.cubeGroup.children[1].position.set(this.plane2.x,this.plane2.y,this.plane2.z)
    },
    movePlane3(){
      this.cubeGroup.children[2].position.set(this.plane3.x,this.plane3.y,this.plane3.z)
    },
    movePlane4(){
      this.cubeGroup.children[3].position.set(this.plane4.x,this.plane4.y,this.plane4.z)
    },
    init() {
      const canvas = this.$refs.cvs
      const aspect = this.w/this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 5000)
      this.camera.position.z = 70
      this.camera.position.x = 0
      this.camera.position.y = 70
      this.group = new THREE.Group()
      this.baseGroup = new THREE.Group()
      this.groupController = new THREE.Group()
      this.cubeGroup = new THREE.Group()
      const material = new THREE.MeshBasicMaterial( { color: 0xff00 } );
      const geometry = new THREE.BoxGeometry( 20, 1, 20 );
      const mesh = new THREE.Mesh( geometry, material );
      let arr = [0,1,2,3]
      arr.forEach(() => {
        this.cubeGroup.add(mesh.clone())
      })
      // this.group.add(mesh)
      // const fbxLoader = new FBXLoader()
      const fbxLoader = new FBXLoader()
      const textureLoader = new THREE.TextureLoader()
      let list = [
        // "Tile_+000_+003",
        // "Tile_+000_+004",
        // "Tile_+000_+005",
        // "Tile_+000_+006",
        // "Tile_+000_+007",
        // "Tile_+001_+002",
        // "Tile_+001_+003",
        "Tile_+001_+004",
        "Tile_+001_+005",
        // "Tile_+001_+006",
        // "Tile_+001_+007",
        "Tile_+002_+002",
        "Tile_+002_+003",
        "Tile_+002_+004",
        // "Tile_+002_+005",
        // "Tile_+002_+006",
        // "Tile_+002_+007",
        // "Tile_+003_+001",
        "Tile_+003_+002",
        "Tile_+003_+003",
        "Tile_+003_+004",
        // "Tile_+003_+005",
        // "Tile_+003_+006",
        // "Tile_+003_+007",
        // "Tile_+004_+001",
        "Tile_+004_+002",
        "Tile_+004_+003",
        "Tile_+004_+004",
        "Tile_+004_+005",
        "Tile_+004_+006",
        "Tile_+005_+000",
        // "Tile_+005_+001",
        // "Tile_+005_+002",
        // "Tile_+005_+003",
        // "Tile_+005_+004",
        // "Tile_+005_+005",
        // "Tile_+006_+000",
        // "Tile_+006_+001",
        // "Tile_+006_+002",
        // "Tile_+006_+003",
        // "Tile_+006_+004",
        // "Tile_+006_+005",
        // "Tile_+007_+000",
        // "Tile_+007_+001",
        // "Tile_+007_+002",
        // "Tile_+007_+003",
        // "Tile_+007_+004",
        // "Tile_+008_+000",
        // "Tile_+008_+001",
        // "Tile_+008_+002",
        // "Tile_+008_+003",
        // "Tile_+008_+004",
        "Tile_+009_+000",
        "Tile_+009_+001",
        // "Tile_+009_+002",
        // "Tile_+009_+003",
        // "Tile_+009_+004",
        "Tile_+010_+000",
        "Tile_+010_+001",
        // "Tile_+010_+002",
        // "Tile_+010_+003",
        "Tile_+011_+000",
        "Tile_+011_+001",
        // "Tile_+011_+002",
        // "Tile_+011_+003"
      ]
      let list_0310_2 = [
        "Tile_+000_+001",
        "Tile_+000_+002",
        "Tile_+000_+003",
        "Tile_+000_+004",
        "Tile_+001_+000",
        "Tile_+001_+001",
        "Tile_+001_+002",
        "Tile_+001_+003",
        "Tile_+001_+004",
        "Tile_+001_+005",
        "Tile_+002_+000",
        "Tile_+002_+001",
        "Tile_+002_+002",
        "Tile_+002_+003",
        "Tile_+002_+004",
        "Tile_+002_+005",
        "Tile_+003_+000",
        "Tile_+003_+001",
        "Tile_+003_+002",
        "Tile_+003_+004",
        "Tile_+003_+005",
        "Tile_+003_+006",
        "Tile_+004_+000",
        "Tile_+004_+001",
        "Tile_+004_+002",
        "Tile_+004_+005",
        "Tile_+004_+006",
        "Tile_+005_+002",
        "Tile_+005_+003",
        "Tile_+005_+005",
        "Tile_+005_+006",
        "Tile_+005_+007",
        "Tile_+006_+002",
        "Tile_+006_+003",
        "Tile_+006_+004",
        "Tile_+006_+006",
        "Tile_+006_+007",
        "Tile_+006_+008",
        "Tile_+007_+003",
        "Tile_+007_+004",
        "Tile_+007_+007",
        "Tile_+007_+008",
        "Tile_+007_+009",
        "Tile_+008_+003",
        "Tile_+008_+004",
        "Tile_+008_+005",
        "Tile_+008_+006",
        "Tile_+008_+008",
        "Tile_+008_+009",
        "Tile_+009_+004",
        "Tile_+009_+005",
        "Tile_+009_+006",
        "Tile_+009_+007",
        "Tile_+009_+008",
        "Tile_+009_+009",
        "Tile_+010_+005",
        "Tile_+010_+006",
        "Tile_+010_+007",
        "Tile_+010_+008",
        "Tile_+010_+009"
      ]
      let list_0304 = [
        "Tile_+000_+003",
        "Tile_+000_+004",
        "Tile_+000_+005",
        "Tile_+000_+006",
        "Tile_+000_+007",
        "Tile_+001_+002",
        "Tile_+001_+003",
        "Tile_+001_+004",
        "Tile_+001_+005",
        "Tile_+001_+006",
        "Tile_+001_+007",
        "Tile_+002_+002",
        "Tile_+002_+003",
        "Tile_+002_+004",
        "Tile_+002_+005",
        "Tile_+002_+006",
        "Tile_+002_+007",
        "Tile_+003_+001",
        "Tile_+003_+002",
        "Tile_+003_+003",
        "Tile_+003_+004",
        "Tile_+003_+005",
        "Tile_+003_+006",
        "Tile_+003_+007",
        // "Tile_+004_+001",
        // "Tile_+004_+002",
        // "Tile_+004_+003",
        // "Tile_+004_+004",
        // "Tile_+004_+005",
        // "Tile_+004_+006",
        // "Tile_+005_+000",
        // "Tile_+005_+001",
        // "Tile_+005_+002",
        // "Tile_+005_+003",
        // "Tile_+005_+004",
        // "Tile_+005_+005",
        // "Tile_+006_+000",
        // "Tile_+006_+001",
        // "Tile_+006_+002",
        // "Tile_+006_+003",
        // "Tile_+006_+004",
        // "Tile_+006_+005",
        // "Tile_+007_+000",
        // "Tile_+007_+001",
        // "Tile_+007_+002",
        // "Tile_+007_+003",
        // "Tile_+007_+004",
        // "Tile_+008_+000",
        // "Tile_+008_+001",
        // "Tile_+008_+002",
        // "Tile_+008_+003",
        // "Tile_+008_+004",
        // "Tile_+009_+000",
        // "Tile_+009_+001",
        // "Tile_+009_+002",
        // "Tile_+009_+003",
        // "Tile_+009_+004",
        // "Tile_+010_+000",
        // "Tile_+010_+001",
        // "Tile_+010_+002",
        // "Tile_+010_+003",
        // "Tile_+011_+000",
        // "Tile_+011_+001",
        // "Tile_+011_+002",
        // "Tile_+011_+003"
      ]
      let list_0312 =[
        "Tile_+000_+002",
        "Tile_+000_+003",
        "Tile_+000_+004",
        "Tile_+000_+005",
        "Tile_+001_+000",
        "Tile_+001_+001",
        "Tile_+001_+002",
        "Tile_+001_+003",
        "Tile_+001_+004",
        "Tile_+001_+005",
        "Tile_+002_+000",
        "Tile_+002_+001",
        "Tile_+002_+002",
        "Tile_+002_+003",
        "Tile_+002_+004",
        "Tile_+002_+005",
        "Tile_+002_+006",
        "Tile_+003_+000",
        "Tile_+003_+001",
        "Tile_+003_+002",
        "Tile_+003_+003",
        "Tile_+003_+004",
        "Tile_+003_+005",
        "Tile_+003_+006",
        "Tile_+003_+007",
        "Tile_+004_+000",
        "Tile_+004_+001",
        "Tile_+004_+002",
        "Tile_+004_+003",
        "Tile_+004_+004",
        "Tile_+004_+005",
        "Tile_+004_+006",
        "Tile_+004_+007",
        "Tile_+005_+000",
        "Tile_+005_+001",
        "Tile_+005_+002",
        "Tile_+005_+003",
        "Tile_+005_+004",
        "Tile_+005_+005",
        "Tile_+005_+006",
        "Tile_+005_+007",
        "Tile_+005_+008",
        "Tile_+006_+000",
        "Tile_+006_+001",
        "Tile_+006_+002",
        "Tile_+006_+003",
        "Tile_+006_+004",
        "Tile_+006_+005",
        "Tile_+006_+006",
        "Tile_+006_+007",
        "Tile_+006_+008",
        "Tile_+007_+000",
        "Tile_+007_+001",
        "Tile_+007_+002",
        "Tile_+007_+003",
        "Tile_+007_+004",
        "Tile_+007_+005",
        "Tile_+007_+006",
        "Tile_+007_+007",
        "Tile_+007_+008",
        "Tile_+007_+009",
        "Tile_+008_+000",
        "Tile_+008_+001",
        "Tile_+008_+002",
        "Tile_+008_+003",
        "Tile_+008_+004",
        "Tile_+008_+005",
        "Tile_+008_+006",
        "Tile_+008_+007",
        "Tile_+008_+008",
        "Tile_+008_+009",
        "Tile_+008_+010",
        "Tile_+009_+001",
        "Tile_+009_+002",
        "Tile_+009_+003",
        "Tile_+009_+004",
        "Tile_+009_+005",
        "Tile_+009_+006",
        "Tile_+009_+007",
        "Tile_+009_+008",
        "Tile_+009_+009",
        "Tile_+009_+010",
        "Tile_+010_+002",
        "Tile_+010_+003",
        "Tile_+010_+004",
        "Tile_+010_+005",
        "Tile_+010_+006",
        "Tile_+010_+007",
        "Tile_+010_+008",
        "Tile_+010_+009",
        "Tile_+010_+010",
        "Tile_+010_+011",
        "Tile_+011_+002",
        "Tile_+011_+003",
        "Tile_+011_+004",
        "Tile_+011_+005",
        "Tile_+011_+006",
        "Tile_+011_+007",
        "Tile_+011_+008",
        "Tile_+011_+009",
        "Tile_+011_+010",
        "Tile_+011_+011"
      ]
      // list_0810_1.forEach((item, index) => {
      //   let url = `http://192.168.1.250:8000/${item}/${item}.FBX`
      //   fbxLoader.load(url, obj => {
      //     obj.position.z += 40
      //     this.group.add(obj)
      //   })
      // })
      // list_0304.forEach((item, index) => {
      //   let url = `http://192.168.1.222:8000/${item}/${item}.FBX`
      //   fbxLoader.load(url, obj => {
      //     obj.position.z += 40
      //     this.baseGroup.add(obj)
      //   })
      // })
      list_0312.forEach((item, index) => {
        let url = `http://192.168.1.250:8000/${item}/${item}.fbx`
        fbxLoader.load(url, obj => {
          obj.position.z -= 40
          this.group.add(obj)
        })
      })
      // this.group.position.y = this.groupController.position.y = 45
      this.group.rotation.x = this.groupController.rotation.x = this.baseGroup.rotation.x = -Math.PI / 2
      this.group.position.y = this.groupController.position.y = -1200

      this.scene.add(this.group)
      this.scene.add(this.groupController)
      // 添加标记方块
      this.scene.add(this.cubeGroup)
      // 对比组
      this.scene.add(this.baseGroup)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      this.renderer.setSize(this.w, this.h)
      // 炫光特效关键代码 ***
      this.renderer.autoClear = false
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // 控制阻尼
      // this.controls.enableDamping = true
      // 自动观看旋转
      // this.controls.autoRotate = true
      this.addBloomPass()
    },
    animate() {
      if(this.bloomComposer) {
        this.bloomComposer.render()
      }
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
      // let raycaster = new THREE.Raycaster();
      // raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      //
      // const intersects = raycaster.intersectObjects( this.groupController.children );
      // if(intersects[0] && intersects[0].object.name){
        // console.log(intersects[0].object.name)
        // this.flag = true
        // this.info.name = intersects[0].object.name
        // this.info.count = parseInt(Math.random() * 30)
      // }
      //射线和模型求交，选中一系列直线
      /*let intersects = raycaster.intersectObjects(objects);
      console.log('imtersrcts=' + intersects)
      if (intersects.length > 0) {
        //选中第一个射线相交的物体
        let selected = intersects[0];
        let intersected = intersects[0];
        console.log(intersects[0])
      }*/
    },
    renderLine(textList, position) {
      // 添加标注连线
      let lineMaterial = new THREE.LineBasicMaterial({
        color: 0x2288ff
      });

      let lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push(
        new THREE.Vector3( position.x + 1, position.y - 0.5, position.z + 1 ),
        new THREE.Vector3( position.x, position.y, position.z)
      );

      let line = new THREE.Line( lineGeometry, lineMaterial );
      // 标注精灵图
      let markCanvas = document.createElement("canvas");
      markCanvas.width = 300;
      markCanvas.height = 160;
      /*2、创建图形，这部分可以去看w3c canvas教程*/
      let markCtx = markCanvas.getContext("2d");
      markCtx.fillStyle = "transparent";
      // markCtx.arc(50,50,50,0,2*Math.PI);

      markCtx.rect(0,0,300,180)
      markCtx.strokeStyle = "#fff"
      // markCtx.strokeRect(0,0,300,120)
      markCtx.fillStyle = "#023bb2"
      markCtx.fill();
      markCtx.stroke();
      //绘制字体
      markCtx.textAlign = "center";
      markCtx.font = '26px "微软雅黑"';
      markCtx.fillStyle = "#ffffff";
      markCtx.textBaseline = "top";
      textList.forEach((item, index) => {
        markCtx.fillText(item, markCanvas.width/2, 34 * index + 24);
      })
      /*3、将canvas作为纹理，创建Sprite*/
      let markTexture = new THREE.Texture(markCanvas);
      markTexture.needsUpdate = true;
      // var texture = new THREE.TextureLoader().load("sprite.png");
      // 创建精灵材质对象SpriteMaterial
      var spriteMaterial = new THREE.SpriteMaterial({
        // color:0xffffff,//设置精灵矩形区域颜色
        // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
        transparent: true,
        map: markTexture,//设置精灵纹理贴图
      });
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(position.x + 1, position.y - 0.52, position.z + 1)
      sprite.scale.set(2, 1, 2)
      sprite.renderOrder = 4
      this.group.add(line)
      this.group.add(sprite)
    },
    addBloomPass() {
      // RenderPass这个通道会渲染场景，但不会将渲染结果输出到屏幕上
      const renderScene = new RenderPass(this.scene, this.camera)
      const effectCopy = new ShaderPass(CopyShader); //传入了CopyShader着色器，用于拷贝渲染结果
      effectCopy.renderToScreen = true;
      // THREE.BloomPass(strength, kernelSize, sigma, Resolution)
      // strength 定义泛光效果的强度，值越高，明亮的区域越明亮，而且渗入较暗区域的也就越多
      // kernelSize 控制泛光的偏移量
      // sigma 控制泛光的锐利程度，值越高，泛光越模糊
      // Resolution 定义泛光的解析图，如果该值太低，结果的方块化就会越严重
      // const bloomPass = new BloomPass(3, 1.5, 0.4, 1024); //BloomPass通道效果
      const bloomPass = new BloomPass(0.8, 25, 4.0, 256); //BloomPass通道效果
      //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
      this.bloomComposer = new EffectComposer(this.renderer)
      this.bloomComposer.setSize(this.w, this.h);
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.bloomComposer.addPass(effectCopy);
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
    color #a6c1ff
    background-color: #000
    border: 1px solid #023bb2
    -webkit-border-radius: 6px
    -moz-border-radius: 6px
    border-radius: 6px
    padding: 20px
  }
  .mark-group {
    position: absolute
    z-index 200
    top: 20px
    right: 20px
    background-color: rgba(255,255,255,0.4)
    .row {
      span {
        display: inline-block
        width 100px
        cursor pointer
      }
    }
  }
}
</style>
