<template>
<div class="homepage-bg">
  <canvas ref="cvs" :height="h" :width="w"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

export default {
  data() {
    return {
      name: 'index',
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      w: 0,
      h: 0,
      bloomComposer: null,
      amountX: 100,
      amountY: 100,
      particles: null,
      count: 0,
      color: '#3DFFFF',
      ship: null,
      curve: null
    }
  },
  mounted() {
    const baseDom = this.$el
    this.w = baseDom.clientWidth
    this.h = baseDom.clientHeight
    this.$nextTick(()=> {
      this.init();
      this.animate()
    })
  },
  methods: {
    init () {
      const canvas = this.$refs.cvs
      const aspect = this.w/this.h
      this.scene = new THREE.Scene()
      // this.scene.fog = new THREE.Fog( 0xffffff, 500, 3200);
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 2000)
      this.camera.position.z = 1600
      this.camera.position.y = 400
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      // 炫光特效关键代码 ***
      this.renderer.autoClear = false
      this.renderer.setClearColor(0x050514)
      const fbxLoader = new FBXLoader()
      fbxLoader.load('./models/bg_model/fanchuan_01_40opacity.fbx', fbx => {
        this.ship = fbx
        this.scene.add(this.ship)
        // this.ship.children[1].visible = false
        // console.log(this.ship)
        this.curve = this.createCurve(0)
      })

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // this.controls.enableDamping = true
      this.controls.enabled = false
      // this.controls.autoRotate = true
      this.addBloomPass()

      // 波浪粒子
      const numParticles = this.amountX * this.amountY
      const positions = new Float32Array(numParticles * 3)
      const scales = new Float32Array(numParticles)
      let i = 0, j = 0
      const SEPARATION = 100
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          positions[i] = ix * SEPARATION - ((this.amountX * SEPARATION) / 2)
          positions[i + 1] = 0
          positions[i + 2] = iy * SEPARATION - ((this.amountY * SEPARATION) / 2)
          scales[j] = 1
          i += 3
          j++
        }
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))
      // 初始化粒子材质
      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(this.color) }
        },
        vertexShader: `
          attribute float scale;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );
            gl_PointSize = scale * ( 300.0 / - mvPosition.z );
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
            gl_FragColor = vec4( color, 1.0 );
          }
        `
      })
      this.particles = new THREE.Points(geometry, material)
      this.scene.add(this.particles)
    },
    animate() {
      if(this.bloomComposer) {
        this.bloomComposer.render()
      }
      if(this.ship) {
        // this.ship.position.x = -200
        // this.ship.position.y = 20
        // this.ship.position.z = Math.sin(this.count/2) * 40
        // this.ship.rotation.y = -0.7
        // this.ship.rotation.z = Math.sin(this.count/2) / 8
        // this.ship.rotation.x = Math.sin(this.count/2) / 8
        this.moveOnCurve(this.curve, this.ship)
      }

      const positions = this.particles.geometry.attributes.position.array
      const scales = this.particles.geometry.attributes.scale.array
      // 计算粒子位置及大小
      let i = 0
      let j = 0
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          positions[i + 1] = (Math.sin((ix + this.count) * 0.3) * 100) + (Math.sin((iy + this.count) * 0.5) * 100)
          scales[j] = (Math.sin((ix + this.count) * 0.3) + 1) * 8 + (Math.sin((iy + this.count) * 0.5) + 1) * 8
          i += 3
          j++
        }
      }
      // 重新渲染粒子
      this.particles.geometry.attributes.position.needsUpdate = true
      this.particles.geometry.attributes.scale.needsUpdate = true
      this.count += 0.05

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
      // const bloomPass = new BloomPass(1.1, 25, 4.0, 256); //BloomPass通道效果
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.w, this.h), 1, 0.8, 0);
      //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
      this.bloomComposer = new EffectComposer(this.renderer)
      this.bloomComposer.setSize(this.w, this.h);
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.bloomComposer.addPass(effectCopy);
    },
    createCurve(tension = 0) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3( -800, 80, 500),
        new THREE.Vector3( -400, 10, 500),
        new THREE.Vector3( 0, 60, 500),
        new THREE.Vector3( 400, 10, 500),
        new THREE.Vector3( 800, 20, 500),
        new THREE.Vector3(800, 60, -100),
        new THREE.Vector3( 400, 10, -100),
        new THREE.Vector3( 0, 60, -100),
        new THREE.Vector3( -400, 10, -100),
        new THREE.Vector3(-800, 60, -100)
      ], true, "catmullrom", tension)
      // curve.curveType = "catmullrom";
      // 设置是否闭环
      // curve.closed = true;
      // 设置线的张力，0为无弧度折线
      // curve.tension = tension;
      // console.log('轨道总长', curve.getLength());
      // 为曲线添加材质在场景中显示出来，不显示也不会影响运动轨迹，相当于一个Helper
      const points = curve.getPoints(1000);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0 });
      // Create the final object to add to the scene
      const curveObject = new THREE.Line(geometry, material);
      // console.log(curveObject)
      // this.scene.add(curveObject)
      return curve
    },
    moveOnCurve(curve, model) {
      // let velocity = 0.0005
      let progress = parseFloat(Math.abs(Math.sin(this.count/100)).toFixed(6))
      // let velocity = parseFloat((1 / 90000).toFixed(8))
      if (curve == null) {
        console.log("Loading")
      } else {
        // if(this.count <= 1 - velocity) {}
        //获取样条曲线指定点坐标
        console.log(progress)
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

          if (true) {
            //设置朝向
            mtx.lookAt(model.position, targetPos, model.up)
            mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler( Math.PI, offsetAngle + Math.PI/2, Math.PI)))
            // 计算出需要进行旋转的四元数值
            let toRot = new THREE.Quaternion().setFromRotationMatrix(mtx)
            model.quaternion.slerp(toRot, 0.2)
            // this.count += velocity;
          } else {
            console.log(1)
          }
        }
      }
      // console.lo
    }
  }
}
</script>

<style lang="stylus" scoped>
.homepage-bg {
  background-color: #333
  height: 100%
  width: 100%;
  overflow hidden
  canvas {
    display block
  }
}
</style>
