<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h" @mousedown="onDocumentMouseDown" @mouseup="flag = false"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
export default {
  name: 'Loading',
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
      bloomComposer: null,
      mixer1: null,
      mixer2: null,
      clock: null,
      roadPicMap: null,
      roads: null
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
    // setTimeout(() => {
    //   this.$router.push('/home')
    // },3000)
  },
  methods: {
    init() {
      const canvas = this.$refs.cvs
      const aspect = this.w/this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 8000)
      this.camera.position.z = 1400
      this.group = new THREE.Group()
      const fbxLoader = new FBXLoader()
      this.clock = new THREE.Clock();
      this.clock.start()

      for(let i = 1; i < 23; i++) {
        const max = 1;
        const min = 0.6;
        const random = Math.random()*(max-min)+min;
        const geometry = new THREE.RingGeometry( 10 * (20-i) * random, 15 * (30-i) * random, 64 );
        const texture = new THREE.TextureLoader().load( `./imgs/c${i}.png` );
        const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true } );
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.z = i * 12
        this.group.add( mesh );
      }
      this.group.rotation.y = Math.PI / 3.5

      const loader = new THREE.FontLoader();
      loader.load('./jsonModels/optimer_regular.typeface.json',  ( font ) => {
        const geometry = new THREE.TextGeometry( 'L O A D I N G . . .', {
          font: font,
          size: 50,
          height: 1,
          curveSegments: 6,
          bevelEnabled: true,
          bevelThickness: 6,
          bevelSize: 4
        } );
        /*var meshMaterial = new THREE.MeshMatcapMaterial({
          color: 0x04d9e9,
          emissive: 0x000000
        })*/
        var meshMaterialBlue = new THREE.MeshBasicMaterial( { color: 0x04d9e9 } )
        var meshMaterialWhite = new THREE.MeshBasicMaterial( { color: 0xffffff } )
        var meshMaterialBlack = new THREE.MeshBasicMaterial( { color: 0x000000 } )

        let fontMeshBlue = new THREE.Mesh(geometry, meshMaterialBlue)
        let fontMeshWhite = new THREE.Mesh(geometry, meshMaterialWhite)
        let fontMeshBlack = new THREE.Mesh(geometry, meshMaterialBlack)
        fontMeshBlue.position.x = fontMeshWhite.position.x = fontMeshBlack.position.x = 600
        fontMeshBlue.position.y = fontMeshWhite.position.y = fontMeshBlack.position.y = -500
        fontMeshWhite.position.z = -10
        fontMeshBlack.position.z = -18
        this.scene.add(fontMeshBlue)
        this.scene.add(fontMeshWhite)
        // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        // directionalLight.position.set(fontMeshBlue.position.x - 20, fontMeshBlue.position.y + 20, 20)
        // directionalLight.target = fontMeshBlue
        // directionalLight.castShadow = true
        // this.scene.add( directionalLight );
      });

      // 光线路径
      this.roadPicMap = new THREE.TextureLoader().load("./imgs/road_blue.png")
      this.roadPicMapRed = new THREE.TextureLoader().load("./imgs/road_red.png")
      this.roadPicMap.wrapS = this.roadPicMap.wrapT = THREE.RepeatWrapping; //每个都重复
      this.roadPicMap.repeat.set(1, 1)
      this.roadPicMap.needsUpdate = true
      let materialBlue = new THREE.MeshBasicMaterial({
        map: this.roadPicMap,
        side: THREE.BackSide,
        transparent: true
      })
      let materialRed = new THREE.MeshBasicMaterial({
        map: this.roadPicMapRed,
        side: THREE.BackSide,
        transparent: true
      })
      // 创建顶点数组
      /*let points = [
        new THREE.Vector3(-700, -500, 0),
        new THREE.Vector3(-600, -350, 0),
        new THREE.Vector3(-500, -100, 0),
        new THREE.Vector3(-400, 200, 0),
        new THREE.Vector3(-280, 400, 0),
        new THREE.Vector3(-300, 200, 0),
        new THREE.Vector3(-250, -200, 0),
        new THREE.Vector3(-500, -100, 0),
        new THREE.Vector3(-260, 0, 0),
        new THREE.Vector3(-100, 200, 0),
        new THREE.Vector3(0, 200, 0),
        new THREE.Vector3(-200, 0, 0),
        new THREE.Vector3(-200, 100, 0),
        new THREE.Vector3(-150, 200, 0),
        new THREE.Vector3(-200, -100, 0),
        new THREE.Vector3(-170, -150, 0),
        new THREE.Vector3(-150, 0, 0),
        new THREE.Vector3(50, -150, 0),
        new THREE.Vector3(300, 200, 0),
        new THREE.Vector3(140, 200, 0),
        new THREE.Vector3(50, 100, 0),
        new THREE.Vector3(50, -100, 0),
        new THREE.Vector3(200, -150, 0),
        new THREE.Vector3(280, 0, 0),
        new THREE.Vector3(260, -150, 0),
        new THREE.Vector3(500, 100, 0),
        new THREE.Vector3(600, 200, 0),
        new THREE.Vector3(800, 100, 0),
        new THREE.Vector3(700, -100, 0),
        new THREE.Vector3(600, -200, 0),
        new THREE.Vector3(400, -100, 0),
      ]*/
      let points = [
        new THREE.Vector3(-1600, -300, -400),
        new THREE.Vector3(3600, -400, 0),
        new THREE.Vector3(3600, 500, 0),
        new THREE.Vector3(-1400, 0, -200),
      ]
      // CatmullRomCurve3创建一条平滑的三维样条曲线
      let curve = new THREE.CatmullRomCurve3(points) // 曲线路径
      curve.curveType = 'chordal'
      curve.tension = 2
      // 创建管道
      let tubeGeometry = new THREE.TubeGeometry(curve, 60, 8)
      this.roads = new THREE.Group()
      for(let i = 0; i < 10; i++) {
        let blueRoad = new THREE.Mesh(tubeGeometry, materialBlue)
        blueRoad.position.y += i*10 * Math.random()
        blueRoad.position.x += i*10 * Math.random()
        blueRoad.position.z += i*10 * Math.random()
        this.roads.add(blueRoad)
        let redRoad = new THREE.Mesh(tubeGeometry, materialRed)
        redRoad.position.y -= i*10 * Math.random()
        redRoad.position.x -= i*10 * Math.random()
        redRoad.position.z -= i*10 * Math.random()
        this.roads.add(redRoad)
      }
      this.group.add(this.roads)

      this.scene.add(this.group)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      //灯光属性
      const _spotLight = new THREE.SpotLight(0xf6f6f6);
      _spotLight.castShadow = true;
      _spotLight.position.set(1000,1000,1400);
      //设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024*4;
      this.scene.add(_spotLight);

      const axesHelper = new THREE.AxesHelper( 20 );
      // this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.renderer.autoClear = false
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.enabled = true
      // this.controls.autoRotate = true

      this.addBloomPass()
    },
    animate() {
      if(this.roadPicMap) this.roadPicMap.offset.x -= 0.01

      // 渲染器清除颜色、深度或模板缓存. 此方法将颜色缓存初始化为当前颜色
      this.renderer.clear()
      this.camera.layers.set(1)
      this.bloomComposer.render()

      // 清除深度缓存
      this.renderer.clearDepth()
      this.camera.layers.set(0)
      this.renderer.render(this.scene, this.camera)
      if(this.bloomComposer) {
        this.bloomComposer.render()
      }
      if(this.clock && this.mixer1 && this.mixer2) {
        let delta = this.clock.getDelta();
        this.mixer1.update(delta)
        this.mixer2.update(delta)
      }
      this.group.children.forEach((item, index) => {
        item.rotation.z += Math.PI/180 * Math.sin(index)
        item.position.z += 1 * Math.sin(this.clock.getElapsedTime()) * Math.sin(index)
      })
      let delta = this.clock.getElapsedTime();
      this.group.rotation.y = (Math.sin(delta) / 8) + 0.4
      this.group.rotation.x = (Math.sin(delta) / 12) + 0.2
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
      /*if(intersects[0]&&intersects[0].object.name){
        this.flag = true
        this.info.name = intersects[0].object.name
        this.info.count = intersects[0].object.count
        this.info.safe = intersects[0].object.safe
        this.info.info = intersects[0].object.info
      }*/
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
      const bloomPass = new BloomPass(1.4, 18, 4.0, 256); //BloomPass通道效果
      //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
      this.bloomComposer = new EffectComposer(this.renderer)
      this.bloomComposer.setSize(window.innerWidth, window.innerHeight);
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
  background-color: #06102a
}
</style>
