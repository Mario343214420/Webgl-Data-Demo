<template>
  <div class="channel" ref="channel">
    <div class="tools">
      <div>
        比例系数:{{2.73}}m(实测建筑物高度) ：
        {{2.73 / realToModelParam}}(模型中建筑物高度) <br>
        = {{realToModelParam}}
      </div>
      <div class="transform-btn-group">
        <div class="btn" @click="changeTransformStyle(0)">切换旋转</div>
        <div class="btn" @click="changeTransformStyle(1)">切换移动</div>
        <div class="btn" @click="changeTransformStyle(2)">切换缩放</div>
      </div>
      <div class="visible-control-group">
        <div class="btn" @click="group.visible = !group.visible">切换地形显隐</div>
        <div class="btn" @click="pipeGroup.visible = !pipeGroup.visible">切换管线显隐</div>
      </div>
      <div class="start-point">
        起点定位：<br>
        <i class="x">{{measureDataStart.x}}</i><br>
        <i class="y">{{measureDataStart.y}}</i><br>
        <i class="z">{{measureDataStart.z}}</i>
      </div>
      <div class="end-point">
        终点定位：<br>
        <i class="x">{{measureDataEnd.x}}</i><br>
        <i class="y">{{measureDataEnd.y}}</i><br>
        <i class="z">{{measureDataEnd.z}}</i>
      </div>
      <div class="length">
        测点距离：{{measureLength}} <br>
        测点实际计算值：{{parseInt(measureLength * realToModelParam)}}
        <br>
        <span class="clear-measure" @click="clearMeasureMark">清除标记记录</span>
      </div>
      <!--<div class="data-show-group">
        <div class="pipe" v-if="pipeGroup">
          管路组定位数据
          <div class="group">
            position: <br>
            x: <i class="x">{{pipeGroup.position.x}}</i>,<br>
            y: <i class="y">{{pipeGroup.position.y}}</i>,<br>
            z: <i class="z">{{pipeGroup.position.z}}</i>
          </div>
          <div class="group">
            rotation: <br>
            x: <i class="x">{{pipeGroup.rotation.x}}</i>,<br>
            y: <i class="y">{{pipeGroup.rotation.y}}</i>,<br>
            z: <i class="z">{{pipeGroup.rotation.z}}</i>
          </div>
          <div class="group">
            scale: <br>
            x: <i class="x">{{pipeGroup.scale.x}}</i>,<br>
            y: <i class="y">{{pipeGroup.scale.y}}</i>,<br>
            z: <i class="z">{{pipeGroup.scale.z}}</i>
          </div>
        </div>
      </div>-->
      <div>
        <div>放位点</div>
        <div class="marks">
          <div class="mark-item" v-for="(item, index) in markList">
            <i class="x">{{item.x.toFixed(5)}}</i>
            <i class="y">{{item.y.toFixed(5)}}</i>
            <i class="z">{{item.z.toFixed(5)}}</i>
          </div>
        </div>
      </div>
    </div>
    <canvas ref="cvs" width="w" height="h" @click="onDocumentMouseDown"></canvas>
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
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
export default {
  name: 'Channel8WeiYuan',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      dragControls: null,
      transformControls: null,
      deg: 0,
      w: 0,
      h: 0,
      group: null,
      groupModel: null,
      boxes: null,
      mX: null,
      mY: null,
      flag: false,
      bloomComposer: null,
      cubeGroup: null,
      baseGroup: null,
      pipeGroup: null,
      measureDataStart: {
        x: 0,
        y: 0,
        z: 0
      },
      measureDataEnd: {
        x: 0,
        y: 0,
        z: 0
      },
      measuredFlag: false,
      markGroup: null,
      markList: []
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
  computed: {
    measureLength: function () {
      let a = Math.pow(this.measureDataEnd.x - this.measureDataStart.x,2)
      let b = Math.pow(this.measureDataEnd.y - this.measureDataStart.y,2)
      let c = Math.pow(this.measureDataEnd.z - this.measureDataStart.z,2)
      return Math.sqrt(a + b + c)
    },
    realToModelParam: function () {
      return 2.73 / Math.sqrt(
        Math.pow(-196.71208 + 196.78134,2) +
        Math.pow(-4.27394 + 3.33942,2) +
        Math.pow(-76.49824 + 76.55519,2)
      )
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
    //
    clearMeasureMark() {
      this.measuredFlag = false
      this.measureDataStart = {
        x: 0, y: 0, z: 0
      }
      this.measureDataEnd = {
        x: 0, y: 0, z: 0
      }
      this.scene.remove(this.markGroup)
      this.markGroup = new THREE.Group()
      this.scene.add(this.markGroup)
    },
    // 真实坐标转换
    calculateCoordinate(baseArr) {
      let resultArr = []
      baseArr.forEach(item => {
        resultArr.push([(item[0] - 108.59) * 89000, item[1], (item[2] - 38.22) * 89000])
      })
      return resultArr
    },
    // 生成粗线体
    creatFatLine (points, color, lineWidth) {
      let positions = [].concat.apply([], points)
      let fatLineGeo = new LineGeometry()
      fatLineGeo.setPositions(positions)
      let fatLineMaterial = new LineMaterial({
        linewidth: lineWidth,
        color
      })
      fatLineMaterial.resolution.set(window.innerWidth+100, window.innerHeight+100)
      let fatLine = new Line2(fatLineGeo,fatLineMaterial)
      return fatLine
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
      this.pipeGroup = new THREE.Group()
      this.markGroup = new THREE.Group()
      this.scene.add(this.markGroup)
      let pipeList = [
        [108.59173039, 0, 38.22155125],
        [108.59233119, 0, 38.22185487],
        [108.59366150, 0, 38.22230192],
        [108.59480932, 0, 38.22285845],
        [108.59599998, 0, 38.22341492],
        [108.59707257, 0, 38.22396289],
        [108.59789842, 0, 38.22440123],
        [108.59885293, 0, 38.22484796],
        [108.59971086, 0, 38.22529466],
        [108.60112636, 0, 38.22612899],
        [108.60264893, 0, 38.22732566],
        [108.60389263, 0, 38.22828627],
        [108.60532922, 0, 38.22934789],
        [108.60583307, 0, 38.22970173]
      ]
      let realStackList = [
        [-182.56024, -4.65689, -94.32869],
        [-164.94352, -3.04999, -79.38709],
        [-133.37884, -2.30638, -60.41350],
        [-100.28406, -0.51159, -41.56901],
        [-42.30869, 1.58786, -11.46054]
        /* [108.59238, 0.9, 38.22184], // 1# 埋深 0.9
        [108.59314, 2.0, 38.22207], // 2# 埋深 2.0
        [108.59426, 1.3, 38.22256], // 3# 埋深 1.3
        [108.59544, 1.0, 38.22312], // 4# 埋深 1.0
        [108.59757, 1.6, 38.22419]  // 5# 埋深 1.6 */
      ]
      // let modelLine = this.creatFatLine(this.calculateCoordinate(pipeList), 0xff0000, 4)
      // modelLine.name = 'gps定位连线'
      let realLine = this.creatFatLine(realStackList, 0x00ff00, 4)
      let deepLineList = []
      let deepList = [0.9, 2.0, 1.3, 1.0, 1.6]
      realStackList.forEach((item, index) => {
        let point = item
        point[1] -= deepList[index] / this.realToModelParam
        deepLineList.push(point)
      })
      // this.pipeGroup.add(modelLine)
      let deepLine = this.creatFatLine(deepLineList, 0xff0000, 4)
      deepLine.name = '埋深线'
      realLine.name = '桩位连线'
      this.pipeGroup.name = '管线组'
      this.pipeGroup.add(realLine)
      this.pipeGroup.add(deepLine)
      this.scene.add(this.pipeGroup)

      // this.group.add(mesh)
      // const fbxLoader = new FBXLoader()
      const fbxLoader = new FBXLoader()
      let list = [
        'Tile_+000_+000',
        'Tile_+000_+001',
        // 'Tile_+000_+002',
        // 'Tile_+000_+003',
        'Tile_+001_+000',
        'Tile_+001_+001',
        'Tile_+001_+002',
        // 'Tile_+001_+003',
        'Tile_+002_+001',
        'Tile_+002_+002',
        // 'Tile_+002_+003',
        'Tile_+003_+001',
        'Tile_+003_+002',
        'Tile_+003_+003',
        'Tile_+004_+001',
        'Tile_+004_+002',
        'Tile_+004_+003',
        // 'Tile_+005_+002',
        // 'Tile_+005_+003'
      ]
      list.forEach((item, index) => {
        // console.log(item)
        let url = `./models/sulige_0428/${item}/${item}.fbx`
        fbxLoader.load(url, obj => {
          obj.position.z -= 1220
          obj.name = item
          this.group.add(obj)
        })
      })
      /* let zonghengBase = [
        "Tile_+000_+003",
        "Tile_+000_+004",
        "Tile_+000_+005",
        "Tile_+000_+006",
        // "Tile_+000_+007",
        "Tile_+001_+002",
        "Tile_+001_+003",
        "Tile_+001_+004",
        "Tile_+001_+005",
        "Tile_+001_+006",
        // "Tile_+001_+007",
        "Tile_+002_+002",
        "Tile_+002_+003",
        "Tile_+002_+004",
        "Tile_+002_+005",
        "Tile_+002_+006",
        "Tile_+002_+007",
        // "Tile_+003_+001",
        // "Tile_+003_+002",
        // "Tile_+003_+003",
        // "Tile_+003_+004",
        // "Tile_+003_+005",
        // "Tile_+003_+006",
        // "Tile_+003_+007",
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
      zonghengBase.forEach((item, index) => {
        // console.log(item)
        let url = `./models/sulige_0304/${item}/${item}.fbx`
        fbxLoader.load(url, obj => {
          // obj.position.z -= 1270
          obj.name = item
          this.baseGroup.add(obj)
        })
      }) */
      // this.group.position.y = this.groupController.position.y = 45
      // this.baseGroup.rotation.x = -Math.PI / 2
      this.group.position.set(-95.40945, -14.64555, -41.72357)
      this.group.rotation.set(-1.58453, -0.03961, -1.04771)
      this.group.scale.set(0.32344, 0.32344, 0.32344)
      // this.group.position.y = this.baseGroup.position.y = -1200

      this.scene.add(this.group)
      // this.scene.add(this.baseGroup)
      // this.scene.add(this.groupController)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })

      // 对象可以被剪切
      this.renderer.localClippingEnabled = true
      const PlaneArr = [
        // 创建一个垂直x轴的平面，方向沿着x轴负方向，沿着x轴正方向平移20,
        // new THREE.Plane(new THREE.Vector3(1, 0, 0), 20),
        // 垂直y轴的平面
        // new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
        // 垂直z轴的平面
        new THREE.Plane(new THREE.Vector3(0.4, 0, -1), 40),
        new THREE.Plane(new THREE.Vector3(-0.4, 0, 1), 30)
      ];
      // const helper = new THREE.PlaneHelper(PlaneArr[0], 300, 0xffff00);
      // this.scene.add(helper);
      this.renderer.clippingPlanes = PlaneArr

      this.renderer.setSize(this.w, this.h)
      // 炫光特效关键代码 ***
      // this.renderer.autoClear = false

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // 控制阻尼
      // this.controls.enableDamping = true
      // 自动观看旋转
      // this.controls.autoRotate = true
      // this.addBloomPass()

      /* ↓↓↓↓ 模型变换功能 ↓↓↓↓ */
      // 变换控件
      this.transformControls = new TransformControls(this.camera, this.renderer.domElement)
      // 拖动控制
      // this.dragControls = new DragControls( [this.baseGroup], this.camera, this.renderer.domElement );
      // this.dragControls.transformGroup = true
      this.transformControls.transformGroup = true
      this.transformControls.addEventListener( 'change', () => {
        this.renderer.render(this.scene, this.camera)
      } );
      this.controls.addEventListener( 'change', () => {
        this.renderer.render(this.scene, this.camera)
      } );
      this.transformControls.addEventListener( 'dragging-changed',  ( event ) => {
        this.controls.enabled = ! event.value;
      } );
      this.transformControls.attach( this.pipeGroup );
      // 变换控制
      this.scene.add(this.transformControls)
      /* ↑↑↑↑ 模型变换功能 ↑↑↑↑ */
    },
    animate() {
      if(this.bloomComposer) {
        this.bloomComposer.render()
      }
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
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
    },
    onDocumentMouseDown(e) {
      e.preventDefault();
      //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
      this.mX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
      //新建一个三维单位向量 假设z方向就是0.5
      //根据照相机，把这个向量转换到视点坐标系
      // let vector = new THREE.Vector3(this.mX, this.mY,0.5).unproject(this.camera);

      //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
      /* let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      let intersects = raycaster.intersectObjects(this.scene.children,true);
      if (intersects.length > 0) {
        let list = intersects.filter(item => {
          item.object.parent.name ? console.log(item.object.parent.name, '是当前选中块') : ''
          return item.object.parent.name
        })
        if(list.length === 2) {
          let lX = Math.pow((list[0].point.x - list[1].point.x), 2)
          let lY = Math.pow((list[0].point.x - list[1].point.x), 2)
          let lZ = Math.pow((list[0].point.x - list[1].point.x), 2)
          let changeLength = Math.sqrt(lX + lY + lZ)
          this.renderCard(
            [
              `地块编号: ${list[0].object.parent.name}`,
              `地形变化: ${changeLength}`,
            ],
            [list[0].point.x, list[0].point.y, list[0].point.z],
            [list[0].point.x + 6, list[0].point.y + 10, list[0].point.z],
          )
        }
      } */
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      let intersects = raycaster.intersectObjects(this.scene.children,true);
      if (intersects.length > 0) {
        /* let list = intersects.filter(item => {
          console.log(item.object.parent)
          item.object.parent.name ? console.log(item.object.parent.name, '是当前选中块') : ''
          return item.object.parent.name
        })
        // 当穿透两层地图时，直接测出两点距离
        if(list.length === 2) {
          this.measureDataStart.x = list[0].point.x
          this.measureDataStart.y = list[0].point.y
          this.measureDataStart.z = list[0].point.z
          this.measureDataEnd.x = list[1].point.x
          this.measureDataEnd.y = list[1].point.y
          this.measureDataEnd.z = list[1].point.z
        }
        // 当穿透一层地图时，检查是否已标记
        if(list.length === 1) {
          if (this.measuredFlag) {
            // 已标记则记为终点
            this.measureDataStart.x = list[1].point.x
            this.measureDataStart.y = list[1].point.y
            this.measureDataStart.z = list[1].point.z
          } else {
            // 未标记则记为起始点
            this.measureDataStart.x = list[0].point.x
            this.measureDataStart.y = list[0].point.y
            this.measureDataStart.z = list[0].point.z

            const geometry = new THREE.SphereGeometry( 1, 8, 8 );
            const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            const sphere = new THREE.Mesh( geometry, material );
            sphere.position.set(list[0].point.x, list[0].point.y, list[0].point.z)
            this.markGroup.add( sphere );
          }
        } */
        console.log(intersects[0].point)
        this.markList.unshift(intersects[0].point)
      }
    },
    // 切换变换模式
    changeTransformStyle(v) {
      switch (v) {
        case 0: this.transformControls.setMode('rotate'); break;
        case 1: this.transformControls.setMode('translate'); break;
        case 2: this.transformControls.setMode('scale'); break;
      }
    },
    // 显示标注框
    renderCard(textList, cardPos, targetPos) {
      // 添加标注连线
      let lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
      })

      let points = []
      points.push(
        new THREE.Vector3(...cardPos),
        new THREE.Vector3(...targetPos)
      )
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

      let line = new THREE.Line(lineGeometry, lineMaterial)
      // 标注精灵图
      let markCanvas = document.createElement('canvas')
      markCanvas.width = 300
      markCanvas.height = textList.length * 62
      /* 2、创建图形，这部分可以去看w3c canvas教程 */
      let markCtx = markCanvas.getContext('2d')
      markCtx.fillStyle = 'transparent'
      // markCtx.arc(50,50,50,0,2*Math.PI)
      markCtx.rect(0, 0, 300, markCanvas.height - 1)
      markCtx.strokeStyle = '#fff'
      // markCtx.strokeRect(0,0,300,120)
      markCtx.fillStyle = '#023bb2'
      markCtx.fill()
      markCtx.stroke()
      // 绘制字体
      markCtx.textAlign = 'center'
      markCtx.font = '26px "微软雅黑"'
      markCtx.fillStyle = '#ffffff'
      markCtx.textbaseLines = 'top'
      textList.forEach((item, index) => {
        console.log(item)
        markCtx.fillText(item, markCanvas.width / 2, 56 * index + 40)
      })
      /* 3、将canvas作为纹理，创建Sprite */
      let markTexture = new THREE.Texture(markCanvas)
      markTexture.needsUpdate = true
      // var texture = new THREE.TextureLoader().load("sprite.png")
      // 创建精灵材质对象SpriteMaterial
      const spriteMaterial = new THREE.SpriteMaterial({
        // color:0xffffff, // 设置精灵矩形区域颜色
        // rotation:Math.PI/4, // 旋转精灵对象45度，弧度值
        transparent: true,
        map: markTexture// 设置精灵纹理贴图
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.position.set(...cardPos)
      sprite.position.y += textList.length * 2
      sprite.scale.set(2, 2 * (markCanvas.height / markCanvas.width), 2)
      sprite.renderOrder = 4
      let group = new THREE.Group()
      group.add(line)
      group.add(sprite)
      return group
    },
  }
}
</script>

<style lang="stylus" scoped>
.channel {
  display block
  width: 100%
  height: 100%
  position: relative
  .tools {
    line-height: 28px
    position absolute
    top: 20px
    right: 20px
    width: 300px
    color #fff
    padding: 20px
    background-color: rgba(255, 255, 255, 0.2)
    i {
      font-style normal
      &.x {
        color red
      }
      &.y {
        color greenyellow
      }
      &.z {
        color #6969ff
      }
    }
    .transform-btn-group {
      display flex
      .btn {
        padding 4px 10px
        width 100px
        cursor pointer
      }
    }
    .data-show-group {
      padding-top:20px
      .pipe {
        .group {

        }
      }
    }
    .visible-control-group {
      display flex
      .btn {
        padding 4px 10px
        width 100px
        cursor pointer
      }
    }
    .length {
      .clear-measure {
        background-color: #222
        -webkit-border-radius: 4px
        -moz-border-radius: 4px
        border-radius: 4px
        padding: 4px 8px
      }
    }
  }
  canvas {
    display block
  }
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
  .marks {
    height: 300px;
    display: flex;
    overflow-y: scroll;
    .mark-item {
      flex: 1
    }
  }
}
</style>
