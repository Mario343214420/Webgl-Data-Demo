<template>
<div class="rob-path">
<canvas ref="cvs" width="810" height="480" @click="onDocumentMouseDown"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
export default {
  name: "RobPath",
  data() {
    return {
      progress: 0,
      renderer: null,
      scene: null,
      baseGroup: null,
      areaGroup: null,
      camera: null,
      curve: null,
      rob: null,
      mX: 0,
      mY: 0,
      w: 810,
      h: 480,
      bloomComposer: null,
      robotSpeed: 0
    }
  },
  sockets: {
    connect: function () {
      // console.log(' socket connected')
    },
    push_event: function (data) {
      // console.log(data);
      if(data) {
        if(data.direction === 1) {
          this.robotSpeed = data.robotSpeed
        } else {
          this.robotSpeed = -data.robotSpeed
        }
      }
    }
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    // setLocalProgress(key, value) {
    //   localStorage.setItem(key, value)
    // },
    // getLocalProgress(key) {
    //   const val = localStorage.getItem(key)
    //   const data = JSON.parse(val)
    //   if(data) {
    //     return data
    //   }
    // },
    init() {
      const canvas = this.$refs.cvs
      this.renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true})
      this.renderer.setSize(this.w, this.h)
      this.camera = new THREE.PerspectiveCamera( 45, this.w / this.h, 1, 5000 );
      this.camera.position.set( 0, 34, -34 );
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.baseGroup = new THREE.Group()
      this.areaGroup = new THREE.Group()
      let loader = new FBXLoader()
      loader.load('./models/area_gray_3.fbx', fbx => {
        fbx.scale.set(0.0005, 0.0015, 0.0005)
        fbx.position.x -= 0.5
        fbx.position.y -= 0.4
        this.areaGroup.add(fbx)
      })
      loader.load('./models/rob_r.fbx', fbx => {
        // fbx.up = new THREE.Vector3(1, 0, 0)
        // fbx.rotation.set(Math.PI / 2, 0, 0)
        this.rob = fbx.clone()
        // this.rob.rotation.set(0, Math.PI, Math.PI / 2)
        this.rob.scale.set(0.0007, 0.0015, 0.0015)
        this.baseGroup.add( this.rob );
        const light = new THREE.AmbientLight( 0xe9f4ff, 1 ); // soft white light
        this.scene.add( light );
        this.scene.add(this.baseGroup)
        this.scene.add(this.areaGroup)
        this.curve = this.makeCurve(this.rob, 0)
        this.renderer.render( this.scene, this.camera );
      })
      this.scene = new THREE.Scene();
      // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      // 旋转控制器 配合 line9
      // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.renderer.autoClear = false
      this.addBloomPass()
    },
    makeCurve(obj, tension = 0) {
      // let curves = []
      // if(lines.length > 0) {
      //   lines.forEach((item) => {
      //     console.log(item);
      //     curves.push(new THREE.Vector3(item[0]), new THREE.Vector3(item[1]), new THREE.Vector3(item[2]))
      //   })
      // }
      //Create a closed wavey loop
      // console.log(curves);
      // console.log(curves);
      // const curve = new THREE.CatmullRomCurve3(curves);
      const curve = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( -27.77636194677182, 0.1, -1.69954656354634),
        new THREE.Vector3( -27.77636194677182, 0.1, -8.325829909548446),
        new THREE.Vector3(-27.77636194677182, 0.1, -8.325829909548446),
        new THREE.Vector3(-27.281945726604796, 0.1, -8.325829909548446),
        new THREE.Vector3(27.71092616412904, 0.1, -8.325829909548446),
        new THREE.Vector3(28.23994524716157, 0.1, -7.827443938297231),
        new THREE.Vector3(28.256989924828254, 0.1, 1.9091207884101569),
        new THREE.Vector3(27.649158533551734, 0.1, 2.430883337444939),
        new THREE.Vector3(12.73214522147175, 0.1, 2.4305151260386224),
        new THREE.Vector3(11.925941939396914, 0.1, 1.9174324469711812),
        new THREE.Vector3(11.629009769657344, 0.1, 1.898951357095481),
        new THREE.Vector3(4.859597009992674, 0.1, 1.7902429755834346)
        // new THREE.Vector3(11.629009769657344, 0.1, 1.898951357095481),
        // new THREE.Vector3(11.925941939396914, 0.1, 1.9174324469711812),
        // new THREE.Vector3(12.73214522147175, 0.1, 2.4305151260386224),
        // new THREE.Vector3(27.649158533551734, 0.1, 2.430883337444939),
        // new THREE.Vector3(28.256989924828254, 0.1, 1.9091207884101569),
        // new THREE.Vector3(28.23994524716157, 0.1, -7.827443938297231),
        // new THREE.Vector3(27.71092616412904, 0.1, -8.325829909548446),
        // new THREE.Vector3(-27.281945726604796, 0.1, -8.325829909548446),
        // new THREE.Vector3(-27.77636194677182, 0.1, -8.325829909548446),
        // new THREE.Vector3( -27.77636194677182, 0.1, -8.325829909548446),
        // new THREE.Vector3( -27.77636194677182, 0.1, -1.69954656354634)
      ] );
      curve.curveType = "catmullrom";
      // 设置是否闭环
      curve.closed = false;
      // 设置线的张力，0为无弧度折线
      curve.tension = tension;
      // console.log('轨道总长', curve.getLength());
      // 为曲线添加材质在场景中显示出来，不显示也不会影响运动轨迹，相当于一个Helper
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0, visible: false });
      // Create the final object to add to the scene
      const curveObject = new THREE.Line(geometry, material);
      this.scene.add(curveObject)
      return curve
    },
    // 物体沿线移动方法
    moveOnCurve(curve, model) {
      // let velocity = 0.0005
      let velocity = parseFloat((Math.abs(this.robotSpeed) / 22350000).toFixed(6))
      if (curve == null) {
        console.log("Loading")
      } else {
        if (this.progress <= 1 - velocity) {
          //获取样条曲线指定点坐标
          const point = curve.getPointAt(this.progress);
          //获取样条曲线指定点坐标
          const pointBox = curve.getPointAt(this.progress + velocity);
          if (point && pointBox && point.x) {
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
            //设置朝向
            mtx.lookAt(model.position, targetPos, model.up)
            mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler( Math.PI, offsetAngle, 0)))
            // 计算出需要进行旋转的四元数值
            let toRot = new THREE.Quaternion().setFromRotationMatrix(mtx)
            model.quaternion.slerp(toRot, 0.2)
          }
          this.progress += velocity;
        } else {
          this.progress = 0;
        }
      }
      // console.log(this.progress);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.bloomComposer.render()
      if(this.baseGroup && this.baseGroup.children[0]) {
        this.moveOnCurve(this.curve, this.baseGroup.children[0]);
      }
      this.renderer.render(this.scene, this.camera);
    },
    onDocumentMouseDown(e) {
      e.preventDefault();
      if (e.ctrlKey && e.button === 0) {
        //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
        this.mX = (e.offsetX / this.w) * 2 - 1;
        this.mY = -(e.offsetY / this.h) * 2 + 1;
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
        let intersects = raycaster.intersectObjects(this.areaGroup.children,false);
        console.log(intersects[0].point);
        if (intersects.length > 0) {
          this.markList.unshift(intersects[0].point)
          const { point } = intersects[0]
          const geometry = new THREE.SphereGeometry( 0.05, 8, 8 );
          const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
          const sphere = new THREE.Mesh( geometry, material );
          sphere.position.set(point.x, point.y, point.z)
          this.baseGroup.add( sphere );
        }
      }
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
      const bloomPass = new BloomPass(0.6, 20, 4, 256); //BloomPass通道效果
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
.rob-path
  display flex
  justify-content center
  align-items center
  transform translateX(10px)
</style>
