<template>
<div class="mine-scene">
  <canvas ref="cvs" :height="h" :width="w" @click="onDocumentMouseDown"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { JSONLoader } from 'three/examples/jsm/loaders/JSONLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats  from 'three/examples/jsm/libs/stats.module'
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
      ],
      road: [
        {x: -41.5323341143299, y: -1.08932082646708e-13, z: 490.58648681640625},
        {x: -43.89044953596351, y: -7.386539663417729e-14, z: 332.6601727572547},
        {x: -45.1482549505439, y: -3.340024148492658e-14, z: 150.42131510559992},
        {x: -33.03352134902832, y: -5.555726100065772e-15, z: 25.02076599402875},
        {x: -4.467292850760714, y: 1.3627366732292119e-14, z: -61.37220373759188},
        {x: 43.02117795832419, y: 2.9874179696578986e-14, z: -134.54134454951236},
        {x: 112.48385948541238, y: -1.1717876861691728e-14, z: -203.22737413211178},
        {x: 180.2064345308646, y: 5.3386000352713905e-14, z: -240.4291712952835},
        {x: 266.9821208592367, y: 6.089989694124701e-14, z: -274.26875317150166},
        {x: 365.02036168713823, y: 6.379540268883286e-14, z: -287.3089517773784},
        {x: 437.939400993141, y: 6.23928188019254e-14, z: -280.9922755069461},
        {x: 477.76911245918143, y: 5.957881761510627e-14, z: -268.3191408105673},
        {x: 536.5095922952929, y: 5.689807570774574e-14, z: -256.24615255550196},
        {x: 615.0836197639923, y: -1.863283950312605e-15, z: -247.60851509568673},
        {x: 717.7725982427656, y: 5.71392953366245e-14, z: -257.3325091862348},
        {x: 806.5637412284169, y: 6.472291772202921e-14, z: -291.48610813526204},
        {x: 884.6135313732851, y: 1.0045178922760705e-13, z: -349.3946634223343},
        {x: 947.535787491319, y: 1.1544782424621065e-13, z: -417.01853155186717},
        // {x: 996.840056000916, y: 1.093249164148264e-13, z: -492.3556528281228},
        // {x: 1017.1481994775517, y: 1.213268699704164e-13, z: -546.4076463887959},
        // {x: 1024.9299346277735, y: 1.3072061502210107e-13, z: -588.7133131031765},
        // {x: 1023.3896984480452, y: 1.2571367649717131e-13, z: -566.1640666280358},
        {x: 1028.5548996255961, y: 1.3439880857916699e-13, z: -605.278424236175},
        {x: 1031.1652342735588, y: 1.7117963125865137e-13, z: -770.9245235498812},
        {x: 1034.748129900412, y: 2.1119555694603824e-13, z: -951.1402315644822},
        {x: 1041.3568053029494, y: 1.892392195463278e-13, z: -1108.2576786327254},
        {x: 1036.7220912852504, y: 2.658658493281581e-13, z: -1197.3533399648334},
        {x: 1033.5857100302153, y: 2.892803607158618e-13, z: -1302.802924725558},
        {x: 1031.3985815276412, y: 2.646470541487888e-13, z: -1447.8643744491847},
        {x: 1030.9434233927254, y: 3.6045271491250613e-13, z: -1623.3347125646462},
        {x: 1029.394670186898, y: 3.8846159199421696e-13, z: -1749.4754809529052}
      ],
      mX: null,
      mY: null,
      moveObj: null,
      curve: null,
      count: 0,
      moveFlag: true,
      stats: null
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
    this.initStats()
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
      // const labelRenderer = new THREE.CSS2DRenderer();
      // labelRenderer.setSize(window.innerWidth, window.innerHeight);
      // labelRenderer.domElement.style.position = 'absolute';
      // labelRenderer.domElement.style.top = 0;
      // document.body.appendChild(labelRenderer.domElement);
      // let labelDiv = document.createElement('div');//创建div容器
      // labelDiv.className = 'laber_name';
      // labelDiv.textContent = text + '\n' + "余量：123";
      // let pointLabel = new CSS2DObject(labelDiv);
      // pointLabel.position.set(vector.x, vector.y, vector.z);
      // return pointLabel;
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
      const axisHelper = new THREE.AxesHelper(40);
      this.scene.add(axisHelper);
      // const gltfLoader = new GLTFLoader()
      // gltfLoader.load('./models/mine/scene.gltf', gltf => {
      //   console.log(gltf);
      //   this.baseGroup.add(gltf.scene)
      // })
      const gltfLoader = new GLTFLoader()
      gltfLoader.load('./models/mine/mine.json', gltf => {
        // console.log(gltf);
        this.baseGroup.add(gltf.scene)
      })

      const geo = new THREE.BoxGeometry( 100, 100, 100 );
      const edges = new THREE.EdgesGeometry( geo );
      const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ffff } ) );
      this.moveObj = line.clone()
      this.baseGroup.add(this.moveObj)
      this.curve = this.createCurve(0)

      this.scene.add(this.baseGroup)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    },
    animate() {
      let clock = new THREE.Clock()
      let delta = clock.getDelta()
      requestAnimationFrame(this.animate);
      if(this.moveObj) {
        this.moveOnCurve(this.curve, this.moveObj)
      }
      if(this.moveFlag) {
        this.count += 0.05
      } else {
        this.count -= 0.05
      }
      this.controls.update()
      this.renderer.render(this.scene, this.camera);
      this.stats.update()
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
    },
    onDocumentMouseDown(e) {
      //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
      this.mX = (e.clientX / this.w) * 2 - 1;
      this.mY = -(e.clientY /  this.h) * 2 + 1;
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      let intersects = raycaster.intersectObjects(this.baseGroup.children,true); // 标记地形
      if (e.ctrlKey && e.button === 0) {
        // let intersects = raycaster.intersectObjects(this.gps0527Group.children,true); // 标记线
        // let intersects = raycaster.intersectObjects(this.baseGroup.children,true); // 显示1、2坑数据
        if (intersects.length > 0) {
          intersects[0].object.visible = false
          console.log('intersects:', intersects);
          console.log('point:',intersects[0].point);
        }
      } else {
        if (intersects.length > 0) {
          console.log('-----不操作显隐-----');
          console.log('intersects:', intersects);
          console.log('point:',intersects[0].point);
        }
      }
    },
    createCurve(tension = 0) {
      let roadList = []
      this.road.__ob__.value.forEach(item => {
        roadList.push(new THREE.Vector3(item.x, item.y, item.z))
      })
      const curve = new THREE.CatmullRomCurve3(roadList, false, "catmullrom", tension)
      const points = curve.getPoints(1000);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0 });
      // Create the final object to add to the scene
      const curveObject = new THREE.Line(geometry, material);
      // console.log(curveObject)
      this.scene.add(curveObject)
      return curve
    },
    moveOnCurve(curve, model) {
      // let velocity = 0.0005
      let progress = parseFloat(Math.abs(Math.sin(this.count/100)).toFixed(6))
      progress === 0.998997 ? this.moveFlag = !this.moveFlag : ''
      // let velocity = parseFloat((1 / 90000).toFixed(8))
      if (curve == null) {
        console.log("Loading")
      } else {
        // if(this.count <= 1 - velocity) {}
        //获取样条曲线指定点坐标
        const point = curve.getPointAt(progress);
        //获取样条曲线指定点坐标
        const pointBox = curve.getPointAt(progress + 0.0001);
        if (point && pointBox && point.x) {
          // console.log(model)
          model.position.set(point.x, point.y, point.z);
          // model.lookAt(pointBox.x, pointBox.y, pointBox.z);
          // 因为这个模型加载进来默认面部是正对Z轴负方向的，
          // 所以直接lookAt会导致出现倒着跑的现象，
          // 这里用重新设置朝向的方法来解决。
          // 目标位置点
          let targetPos = pointBox
          //目标移动时的朝向偏移
          let offsetAngle = 0
          // 以下代码在多段路径时可重复执行
          let mtx = new THREE.Matrix4()  //创建一个4维矩阵
          // .lookAt ( eye : Vector3, target : Vector3, up : Vector3 ) : this,构造一个旋转矩阵，从eye 指向 target，由向量 up 定向。
          console.log(model);
          //设置朝向
          mtx.lookAt(model.position, targetPos, model.up)
          mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler( Math.PI, offsetAngle + Math.PI/2, Math.PI)))
          // 计算出需要进行旋转的四元数值
          let toRot = new THREE.Quaternion().setFromRotationMatrix(mtx)
          model.quaternion.slerp(toRot, 0.2)
          this.camera.position.set(point.x, point.y + 50, point.z)
          this.camera.lookAt(model.position, targetPos, model.up)
        }
      }
    },
    initStats() {
      this.stats = new Stats();
      this.stats.domElement.style.position = 'absolute'; //绝对坐标
      this.stats.domElement.style.left = '0px';// (0,0)px,左上角
      this.stats.domElement.style.top = '0px';
      this.$el.appendChild(this.stats.domElement);
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
