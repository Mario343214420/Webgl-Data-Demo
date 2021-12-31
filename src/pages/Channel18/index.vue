<template>
  <div class="channel" ref="channel">
    <div class="float" :style="`top: ${this.floatPos.y - 140}px; left: ${this.floatPos.x }px; opacity: ${this.flag?'1': '0'}; display: ${this.flag?'block': 'none'}`">
      <div>建筑物： {{info.name}}</div>
      <div>安全状态： {{info.safe}}</div>
      <div>人数： {{info.count}}</div>
      <div>建筑信息： {{info.info}}</div>
    </div>
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
  name: 'Channel18',
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
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 8000)
      this.camera.position.z = 2000
      this.camera.position.x = 0
      this.camera.position.y = 500
      this.group = new THREE.Group()
      this.group1 = new THREE.Group()
      const fbxLoader = new FBXLoader()
      fbxLoader.load('./models/build/factory.fbx', fbx => {
        fbx.scale.set(.05,.05,.05)
        // fbx.position.x = 1120
        // fbx.position.z = 160
        // fbx.position.y = 160
        this.scene.add(fbx)
      })
      const geometryFloor = new THREE.PlaneGeometry( 1000, 1000 );
      const materialFloor = new THREE.MeshBasicMaterial( {color: 0x3f3e35, side: THREE.DoubleSide} );
      const planeFloor = new THREE.Mesh( geometryFloor, materialFloor );
      planeFloor.rotation.x = Math.PI/2
      // this.group1.add( planeFloor );
      const geometry1 = new THREE.BoxGeometry( 500, 100, 200 );
      const geometry2 = new THREE.BoxGeometry( 200, 100, 500 );
      const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0} );
      const cube = new THREE.Mesh( geometry1, material );

      let list = [
        {
          name: '生产办公室A座',
          safe: true,
          position: {
            x: 200,
            z: 300
          },
          count: 42,
          info: '- 暂无 -',
          w: 460,
          l: 200,
          h: 100
        },
        {
          name: '生产办公楼',
          safe: true,
          position: {
            x: -1180,
            z: 1050
          },
          count: 102,
          info: '- 暂无 -',
          w: 460,
          l: 200,
          h: 100
        },
        {
          name: '原材料仓库',
          safe: true,
          position: {
            x: -1200,
            z: 680
          },
          count: 32,
          info: '- 暂无 -',
          w: 500,
          l: 220,
          h: 100
        },
        {
          name: '生产料仓',
          safe: true,
          position: {
            x: -500,
            z: 900
          },
          count: 42,
          info: '- 暂无 -',
          w: 200,
          l: 500,
          h: 100
        },
        {
          name: '加工料仓',
          safe: true,
          position: {
            x: 0,
            z: 900
          },
          count: 12,
          info: '- 暂无 -',
          w: 200,
          l: 500,
          h: 100
        },
        {
          name: '配电房',
          safe: true,
          position: {
            x: 500,
            z: 900
          },
          count: 12,
          info: '- 暂无 -',
          w: 200,
          l: 500,
          h: 100
        },
        {
          name: '主办公楼',
          safe: true,
          position: {
            x: 1180,
            z: 900
          },
          count: 12,
          info: '- 暂无 -',
          w: 200,
          l: 500,
          h: 100
        },
        {
          name: '生产办公室B座',
          safe: true,
          position: {
            x: 1280,
            z: 300
          },
          count: 12,
          info: '- 暂无 -',
          w: 460,
          l: 200,
          h: 100
        },
      ]

      list.forEach(item => {
        let mesh = new THREE.Mesh(new THREE.BoxGeometry(item.w,item.h,item.l), material )
        mesh.position.x = item.position.x
        mesh.position.z = item.position.z
        mesh.name = item.name
        mesh.count = item.count
        mesh.info = item.info
        mesh.safe = item.safe
        mesh.renderOrder = 3
        this.group.add(mesh)
        this.renderLine(item.name, item.position)
      })
      this.group.position.y = -200

      this.scene.add(this.group)
      this.scene.add(this.group1)

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
      // this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      this.renderer.setSize(this.w, this.h)
      this.renderer.autoClear = false
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      this.controls.enableDamping = true

    },
    animate() {
      // this.renderer.clear()
      // this.renderer.clearDepth()
      // this.addBloomPass()
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
        this.info.name = intersects[0].object.name
        this.info.count = intersects[0].object.count
        this.info.safe = intersects[0].object.safe
        this.info.info = intersects[0].object.info
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
    createdCSS3DLabel() {
      //增加一个CSS3D对象
      let element = document.createElement("div");
      element.className = "css3dcontain";
      element.style.opacity = 0.75;
      let lableTitle = document.createElement("div");
      lableTitle.className = "css3dTitle";
      //   lableTitle.style.opacity = 0.75;
      lableTitle.textContent = "数据详情:";
      element.appendChild(lableTitle);

      let lableItem = document.createElement("div");
      lableItem.className = "css3dItem";
      lableItem.style.opacity = 0.75;
      let lableLeft = document.createElement("div");
      lableLeft.className = "css3dLeft";
      lableLeft.textContent = "风速";
      //   lableLeft.style.opacity = 0.75;
      let lableRight = document.createElement("div");
      lableRight.className = "css3dRight";
      //   lableRight.style.opacity = 0.75;
      lableRight.textContent = "3.7m/s";
      lableItem.appendChild(lableLeft);
      lableItem.appendChild(lableRight);
      element.appendChild(lableItem);

      return element;
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
      const bloomPass = new BloomPass(2, 1.6, 0.1, 1024); //BloomPass通道效果
      //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
      this.bloomComposer = new EffectComposer(this.renderer)
      this.bloomComposer.setSize(window.innerWidth, window.innerHeight);
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.bloomComposer.addPass(effectCopy);
      this.bloomComposer.render()
    },
    renderLine(text, position) {
      // 添加标注连线
      let lineMaterial = new THREE.LineBasicMaterial({
        color: 0x2288ff
      });

      let lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push(
        new THREE.Vector3( position.x, -200, position.z ),
        new THREE.Vector3( position.x + 300, 300, position.z + 300 )
      );

      let line = new THREE.Line( lineGeometry, lineMaterial );
      // 标注精灵图
      let markCanvas = document.createElement("canvas");
      markCanvas.width = 200;
      markCanvas.height = 120;
      /*2、创建图形，这部分可以去看w3c canvas教程*/
      let markCtx = markCanvas.getContext("2d");
      markCtx.fillStyle = "transparent";
      // markCtx.arc(50,50,50,0,2*Math.PI);
      markCtx.rect(0,0,100,120)
      markCtx.fill();
      //绘制字体
      markCtx.textAlign = "center";
      markCtx.font = '28px "微软雅黑"';
      markCtx.fillStyle = "#ffffff";
      markCtx.textBaseline = "top";
      markCtx.fillText(text, markCanvas.width/2, 30);
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
      sprite.position.set(position.x + 300, 300, position.z + 300)
      sprite.scale.set(200, 200, 200)
      sprite.renderOrder = 4
      this.group1.add(line)
      this.group1.add(sprite)
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
    color: rgba(0,178,250,0.9)
    border: 1px solid rgba(0,178,250,0.9)
    background-color: #000
    -webkit-border-radius: 6px
    -moz-border-radius: 6px
    border-radius: 6px
    padding: 20px
  }
}
</style>
