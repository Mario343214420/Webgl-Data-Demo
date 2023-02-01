<template>
<div class="mine-scene">
  <canvas ref="cvs" :height="h" :width="w"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import 'three/examples/js/renderers/CSS2DRenderer'
export default {
  name: "MineScene",
  data() {
    return {
      scene: null,
      renderer: null,
      camera: null,
      w: 800,
      h: 480,
      baseGroup: null,
      tween1: null,
      tween2: null,
      tween: null,
      buildsList: [
        {	label:'卸煤操作场地',pos:[	0	,	0	,	0	]},
        {	label:'半移动式变电站',pos:[	-59	,	33	,	0	]},
        {	label:'箱式变电站',pos:[	-74	,	60	,	0	]},
        {	label:'清洗车门',pos:[	-125	,	60	,	0	]},
        {	label:'工程机械维修保养车间',pos:[	-120	,	128	,	0	]},
        {	label:'备品备件库',pos:[	-352	,	41	,	0	]},
        {	label:'设备材料库',pos:[	-270	,	150	,	0	]},
        {	label:'煤泥水处理站',pos:[	92	,	178	,	0	]},
        {	label:'调节水池及泵房',pos:[	153	,	177	,	0	]},
        {	label:'排泥池',pos:[	172	,	180	,	0	]},
        {	label:'清水池',pos:[	186	,	180	,	0	]},
        {	label:'水处理车间',pos:[	234	,	180	,	0	]},
        {	label:'生产消防水池及泵房',pos:[	295	,	180	,	0	]},
        {	label:'末煤储煤场',pos:[	368	,	293	,	0	]},
        {	label:'块煤储煤场',pos:[	300	,	415	,	0	]},
        {	label:'主厂房',pos:[	82	,	228	,	0	]},
        {	label:'电气楼',pos:[	66	,	497	,	0	]},
        {	label:'原煤仓',pos:[	68	,	362	,	0	]},
        {	label:'二级筛分车间',pos:[	-3	,	323	,	0	]},
        {	label:'一级筛分车间',pos:[	-3	,	473	,	0	]},
        {	label:'35KV变电所',pos:[	66	,	497	,	0	]},
        {	label:'调度指挥中心(综合楼)',pos:[	-184	,	447	,	0	]},
        {	label:'单身宿舍楼&食堂',pos:[	-274	,	284	,	0	]}
      ]
    }
  },
  mounted() {
    window.onresize = () => {
      this.initBaseEle()
      this.initWebgl()
      this.animate()
    }

    this.initBaseEle()
    this.initWebgl()
    this.animate()
  },
  methods: {
    initBaseEle() {
      let baseEl = this.$el
      const {clientHeight, clientWidth} = baseEl
      this.h = clientHeight
      this.w = clientWidth
    },
    createLabel() {
      const labelRenderer = new THREE.CSS2DRenderer();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = 0;
      document.body.appendChild(labelRenderer.domElement);
      let labelDiv = document.createElement('div');//创建div容器
      labelDiv.className = 'laber_name';
      labelDiv.textContent = text + '\n' + "余量：123";
      let pointLabel = new CSS2DObject(labelDiv);
      pointLabel.position.set(vector.x, vector.y, vector.z);
      return pointLabel;
    },
    initBuilds() {
      const buildList = JSON.parse(JSON.stringify(this.buildsList.__ob__.value))
      buildList.forEach(item => {
        const group = new THREE.Group()
        const geo = new THREE.BoxGeometry( 40, 40, 40 );
        const edges = new THREE.EdgesGeometry( geo );
        const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ffff } ) );
        group.add( line );
        group.name = item.label
        group.position.set(item.pos[0], item.pos[2], item.pos[1]-520)
        this.baseGroup.add(group)
      })
    },
    initWebgl() {
      const canvas = this.$refs.cvs
      this.renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: false})
      this.renderer.setSize(this.w, this.h)
      this.renderer.shadowMap.enabled = true;
      this.camera = new THREE.PerspectiveCamera( 45, this.w / this.h, 1, 2000 );
      this.camera.position.set( 0, 500, 1000 );
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.baseGroup = new THREE.Group()
      this.scene = new THREE.Scene();
      let ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);

      // const geo = new THREE.BoxGeometry( 20, 20, 20 );
      // const edges = new THREE.EdgesGeometry( geo );
      // const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ffff } ) );
      // this.baseGroup.add( line );

      const objLoader = new OBJLoader()
      objLoader.load('./models/mine/GemyCart.obj', obj => {
        console.log(obj);
        this.baseGroup.add(obj)
      })

      const fbxLoader = new FBXLoader()
      fbxLoader.load('./models/hami/dixing.fbx', fbx => {
        this.baseGroup.add(fbx)
      })

      const gltfLoader = new GLTFLoader()
      gltfLoader.load('./models/mine/scene.gltf', gltf => {
        this.baseGroup.add(gltf.scene)
      })

      this.scene.add(this.baseGroup)
      this.initBuilds()
    },
    animate() {
      requestAnimationFrame(this.animate);
      // this.bloomComposer.render()
      // TWEEN.update();
      this.renderer.render(this.scene, this.camera);
    },
    preShake(func, time) {
      let has;   //声明一个变量，在后面用来存储延时函数
      return function() {    //返回一个函数=》闭包
        const context = this;
        const args = arguments;   //获取原本函数的所有参数，arguments就是
        if (has) clearTimeout(has);   //clearTimeout清除对应的延时方法
        has = setTimeout(() => {   //存储延时方法
          func.apply(context, args);   //自动执行函数，绑定this上下文
        }, time);   //time 延时多长执行函数
      };
    }
  }
}
</script>

<style lang="stylus" scoped>
.mine-scene
  height: 100%;
  width: 100%
  canvas
    display block
</style>
