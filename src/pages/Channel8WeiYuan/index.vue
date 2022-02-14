<template>
  <div class="channel" ref="channel">
    <div class="float" :style="`top: ${floatPos.y - 140}px; left: ${floatPos.x }px; opacity: ${flag?'1': '0'}; display: ${flag?'block': 'none'}`">
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
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
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
      bloomComposer: null
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
      this.camera.position.z = 70
      this.camera.position.x = 0
      this.camera.position.y = 70
      this.group = new THREE.Group()
      this.groupController = new THREE.Group()
      const fbxLoader = new FBXLoader()
      /* let list = [
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
        // "Tile_+003_+004",
        "Tile_+003_+005",
        "Tile_+003_+006",
        // "Tile_+003_+007",
        // "Tile_+003_+008",
        // "Tile_+003_+009",
        // "Tile_+003_+010",
        // "Tile_+003_+011",
        // "Tile_+004_+000",
        // "Tile_+004_+001",
        // "Tile_+004_+002",
        // "Tile_+004_+003",
        // "Tile_+004_+004",
        "Tile_+004_+005",
        "Tile_+004_+006",
        // "Tile_+004_+007",
        // "Tile_+004_+008",
        // "Tile_+004_+009",
        // "Tile_+004_+010",
        // "Tile_+004_+011",
        // "Tile_+005_+000",
        // "Tile_+005_+001",
        // "Tile_+005_+002",
        // "Tile_+005_+003",
        // "Tile_+005_+004",
        // "Tile_+005_+005",
        // "Tile_+005_+006",
        // "Tile_+005_+007",
        // "Tile_+005_+008",
        // "Tile_+005_+009",
        // "Tile_+005_+010",
        // "Tile_+005_+011",
        // "Tile_+006_+000",
        // "Tile_+006_+001",
        // "Tile_+006_+002",
        // "Tile_+006_+003",
        // "Tile_+006_+004",
        // "Tile_+006_+005",
        // "Tile_+006_+006",
        // "Tile_+006_+007",
        // "Tile_+006_+008",
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
      ] */
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
        "Tile_+002_+002",
        "Tile_+002_+003",
        "Tile_+002_+004",
        "Tile_+002_+005",
        "Tile_+002_+006",
        "Tile_+002_+007",
        "Tile_+002_+008",
        "Tile_+002_+009",
        // "Tile_+002_+010",
        // "Tile_+002_+011",
        // "Tile_+003_+000",
        // "Tile_+003_+001",
        "Tile_+003_+002",
        "Tile_+003_+003",
        "Tile_+003_+004",
        "Tile_+003_+005",
        "Tile_+003_+006",
        "Tile_+003_+007",
        "Tile_+003_+008",
        "Tile_+003_+009",
        // "Tile_+003_+010",
        // "Tile_+003_+011",
        // "Tile_+004_+000",
        // "Tile_+004_+001",
        "Tile_+004_+002",
        "Tile_+004_+003",
        "Tile_+004_+004",
        "Tile_+004_+005",
        "Tile_+004_+006",
        "Tile_+004_+007",
        "Tile_+004_+008",
        "Tile_+004_+009",
        // "Tile_+004_+010",
        // "Tile_+004_+011",
        // "Tile_+005_+000",
        // "Tile_+005_+001",
        "Tile_+005_+002",
        "Tile_+005_+003",
        "Tile_+005_+004",
        "Tile_+005_+005",
        "Tile_+005_+006",
        "Tile_+005_+007",
        "Tile_+005_+008",
        "Tile_+005_+009",
        // "Tile_+005_+010",
        // "Tile_+005_+011",
        // "Tile_+006_+000",
        // "Tile_+006_+001",
        "Tile_+006_+002",
        "Tile_+006_+003",
        "Tile_+006_+004",
        "Tile_+006_+005",
        "Tile_+006_+006",
        "Tile_+006_+007",
        "Tile_+006_+008",
        "Tile_+006_+009",
        // "Tile_+006_+010",
        // "Tile_+006_+011",
        // "Tile_+007_+000",
        // "Tile_+007_+001",
        "Tile_+007_+002",
        "Tile_+007_+003",
        "Tile_+007_+004",
        "Tile_+007_+005",
        "Tile_+007_+006",
        "Tile_+007_+007",
        "Tile_+007_+008",
        "Tile_+007_+009",
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
      /* let list = [
        "Tile_+000_+000",
        "Tile_+000_+001",
        "Tile_+000_+002",
        "Tile_+000_+003",
        "Tile_+000_+004",
        "Tile_+000_+005",
        "Tile_+000_+006",
        "Tile_+000_+007",
        "Tile_+000_+008",
        "Tile_+000_+009",
        "Tile_+000_+010",
        "Tile_+000_+011",
        "Tile_+001_+000",
        "Tile_+001_+001",
        "Tile_+001_+002",
        "Tile_+001_+003",
        "Tile_+001_+004",
        "Tile_+001_+005",
        "Tile_+001_+006",
        "Tile_+001_+007",
        "Tile_+001_+008",
        "Tile_+001_+009",
        "Tile_+001_+010",
        "Tile_+001_+011",
        "Tile_+002_+000",
        "Tile_+002_+001",
        "Tile_+002_+002",
        "Tile_+002_+003",
        "Tile_+002_+004",
        "Tile_+002_+005",
        "Tile_+002_+006",
        "Tile_+002_+007",
        "Tile_+002_+008",
        "Tile_+002_+009",
        "Tile_+002_+010",
        "Tile_+002_+011",
        "Tile_+003_+000",
        "Tile_+003_+001",
        "Tile_+003_+002",
        "Tile_+003_+003",
        "Tile_+003_+004",
        "Tile_+003_+005",
        "Tile_+003_+006",
        "Tile_+003_+007",
        "Tile_+003_+008",
        "Tile_+003_+009",
        "Tile_+003_+010",
        "Tile_+003_+011",
        "Tile_+004_+000",
        "Tile_+004_+001",
        "Tile_+004_+002",
        "Tile_+004_+003",
        "Tile_+004_+004",
        "Tile_+004_+005",
        "Tile_+004_+006",
        "Tile_+004_+007",
        "Tile_+004_+008",
        "Tile_+004_+009",
        "Tile_+004_+010",
        "Tile_+004_+011",
        "Tile_+005_+000",
        "Tile_+005_+001",
        "Tile_+005_+002",
        "Tile_+005_+003",
        "Tile_+005_+004",
        "Tile_+005_+005",
        "Tile_+005_+006",
        "Tile_+005_+007",
        "Tile_+005_+008",
        "Tile_+005_+009",
        "Tile_+005_+010",
        "Tile_+005_+011",
        "Tile_+006_+000",
        "Tile_+006_+001",
        "Tile_+006_+002",
        "Tile_+006_+003",
        "Tile_+006_+004",
        "Tile_+006_+005",
        "Tile_+006_+006",
        "Tile_+006_+007",
        "Tile_+006_+008",
        "Tile_+006_+009",
        "Tile_+006_+010",
        "Tile_+006_+011",
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
        "Tile_+007_+010",
        "Tile_+007_+011",
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
        "Tile_+008_+011",
        "Tile_+009_+000",
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
        "Tile_+009_+011"
      ] */
      list.forEach((item, index) => {
        let url = `http://192.168.1.66:8000/${item}/${item}.FBX`
        fbxLoader.load(url, fbx => {
          this.group.add(fbx)
        })
      })
      // fbxLoader.load('./models/chuanqing/zuantanshebei.FBX', fbx => {
      //   fbx.castShadow = fbx.receiveShadow = true
      //   fbx.position.set(-5.2,-2.0,-41)
      //   fbx.rotation.x = Math.PI / 2
      //   fbx.rotation.y = Math.PI / 4.8
      //   fbx.scale.set(0.15,0.16,0.15)
      //   this.group.add(fbx)
      // })
      fbxLoader.load('./models/chuanqing/wy_zuanta_1.FBX', fbx => {
        fbx.castShadow = fbx.receiveShadow = true
        fbx.position.set(-2.98,-5.3,-35.6)
        fbx.rotation.x = Math.PI / 2
        fbx.rotation.y = Math.PI / 4.8
        fbx.scale.set(0.002,0.002,0.002)
        this.group.add(fbx)
      })
      fbxLoader.load('./models/chuanqing/wy_zuanta_2.FBX', fbx => {
        fbx.castShadow = fbx.receiveShadow = true
        fbx.position.set(-6.4,-7.4,-35.6)
        fbx.rotation.x = Math.PI / 2
        fbx.rotation.y = Math.PI / 4.8
        fbx.scale.set(0.002,0.002,0.002)
        this.group.add(fbx)
      })
      fbxLoader.load('./models/chuanqing/jizhuangxiang.FBX', fbx => {
        // console.log(fbx)
        fbx.castShadow = fbx.receiveShadow = true
        fbx.rotation.x = Math.PI / 2.0
        fbx.rotation.y = Math.PI / 4.8
        fbx.position.set(0.9,-5.7,-40.85)
        fbx.scale.set(0.14,0.14,0.15)
        this.group.add(fbx)
        fbx.name = '录井房'
        this.renderLine(['录井房', '井深：815m 钻压0kN', '钻头位置：0.62m', '钻头尺寸：406.4mm'], fbx.position)
        let mesh = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 0.5 ), new THREE.MeshBasicMaterial( { color: 0xffff00 , transparent: true, } ))
        mesh.position.set(0.9,-5.7,-40.85)
        mesh.visible = false
        mesh.name = '录井房'
        this.groupController.add(mesh)
      })
      this.group.position.y = this.groupController.position.y = 45
      this.group.rotation.x = this.groupController.rotation.x = -Math.PI / 2

      // this.scene.add(this.group1)
      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
      const cube = new THREE.Mesh( geometry, material );
      cube.visible = false
      const niJiangChi = cube.clone()
      const tianChe = cube.clone()
      tianChe.position.set(-4.3,-2.6,-32)
      tianChe.name = '天车'
      niJiangChi.position.set(-2,-16,-41)
      niJiangChi.name = '污水池'

      this.renderLine([tianChe.name, '载荷：246KN', '电控箱温度：26℃', '井深：815mm'], tianChe.position)
      this.renderLine([niJiangChi.name, '池深：6 m 容积：600 m³', '注入速度：2 m³/min', '排放速度：0 m³/min'], niJiangChi.position)

      this.group.add(tianChe)
      this.group.add(niJiangChi)

      this.scene.add(this.group)
      this.scene.add(this.groupController)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      const axesHelper = new THREE.AxesHelper( 20 );
      // this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      this.renderer.setSize(this.w, this.h)
      // 炫光特效关键代码 ***
      this.renderer.autoClear = false
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.autoRotate = true
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
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );

      const intersects = raycaster.intersectObjects( this.groupController.children );
      if(intersects[0] && intersects[0].object.name){
        console.log(intersects[0].object.name)
        this.flag = true
        this.info.name = intersects[0].object.name
        this.info.count = parseInt(Math.random() * 30)
      }
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
}
</style>
