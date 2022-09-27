<template>
  <div class="channel" ref="channel">
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
import * as echarts from 'echarts'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
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
      w: 0,
      h: 0,
      group: null,
      mX: null,
      mY: null,
      bloomComposer: null
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
    // 生成粗线体
    creatFatLine (points, color, lineWidth, hasJoint = false) {
      const geometry = new THREE.SphereGeometry( 2, 8, 8 );
      const material = new THREE.MeshBasicMaterial( { color } );
      const sphere = new THREE.Mesh( geometry, material );
      sphere.position.set(points[0][0], points[0][1], points[0][2])
      this.pipeListGroup.add( sphere );
      const joint = new THREE.Group()
      if(hasJoint) {
        const geometryJoint = new THREE.SphereGeometry( 0.1, 8, 8 );
        const materialJoint = new THREE.MeshBasicMaterial( { color } );
        const sphereJoint = new THREE.Mesh( geometryJoint, materialJoint );
        points.forEach(item => {
          let clone = sphereJoint.clone()
          clone.position.set(item[0], item[2], item[1])
          joint.add( clone );
        })
      }

      const endGeometry = new THREE.SphereGeometry( 2, 8, 8 );
      const endSphere = new THREE.Mesh( endGeometry, material );
      endSphere.position.set(points[points.length-1][0], points[points.length-1][1], points[points.length-1][2])
      // this.markGroup.add( endSphere );
      let positions = [].concat.apply([], points)
      // console.log(positions)
      let fatLineGeo = new LineGeometry()
      fatLineGeo.setPositions(positions)
      let fatLineMaterial = new LineMaterial({
        linewidth: lineWidth,
        color
      })
      fatLineMaterial.resolution.set(window.innerWidth+100, window.innerHeight+100)
      let fatLine = new Line2(fatLineGeo,fatLineMaterial)
      fatLine.joint = joint
      return fatLine
    },
    init() {
      const canvas = this.$refs.cvs
      const aspect = this.w / this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 5000)
      this.camera.position.z = 0
      this.camera.position.x = 0
      this.camera.position.y = 40
      this.camera.lookAt(new THREE.Vector3(0,-10, 0));
      this.group = new THREE.Group()

      let vList = [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(1,0,0),
        new THREE.Vector3(0,0,1),
        new THREE.Vector3(0,1,0)
      ]
      let curve = new THREE.CatmullRomCurve3(vList, false, 'catmullrom', 0)
      const points = curve.getPoints( 50 );
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
      const curveObject = new THREE.Line( geometry, material );
      this.group.add(curveObject)

      const curve1 = new THREE.CatmullRomCurve3( [
        new THREE.Vector2( -10, 0 ),
        new THREE.Vector2( -5, 5 ),
        new THREE.Vector2( 0, 0 ),
        new THREE.Vector2( 5, -5 ),
        new THREE.Vector2( 10, 0 )
      ], false,'catmullrom', -0.001);
      const curve2 = new THREE.CatmullRomCurve3( [
        new THREE.Vector2( -10, 0 ),
        new THREE.Vector2( -5, 5 ),
        new THREE.Vector2( 0, 0 ),
        new THREE.Vector2( 5, -5 ),
        new THREE.Vector2( 10, 0 )
      ], false,'centripetal');
      console.log(curve1)

      const points1 = curve1.getPoints( 50 );
      const points2 = curve2.getPoints( 50 );
      const geometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
      const geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );

      const material1 = new THREE.LineBasicMaterial( { color: 0xffff00 } );
      const material2 = new THREE.LineBasicMaterial( { color: 0xff00ff } );

// Create the final object to add to the scene
      const splineObject = new THREE.Line( geometry1, material1 );
      const splineObject2 = new THREE.Line( geometry2, material2 );
      this.group.add(splineObject)
      this.group.add(splineObject2)
      this.scene.add(this.group)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })

      // 切面辅助
      // const helper = new THREE.PlaneHelper(PlaneArr[0], 300, 0xffff00);
      // this.scene.add(helper);

      this.renderer.setSize(this.w, this.h)
      // 炫光特效关键代码 ***
      this.renderer.autoClear = false

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
      this.transformControls.attach( this.pipeListGroup );
      // 变换控制
      this.scene.add(this.transformControls)
      /* ↑↑↑↑ 模型变换功能 ↑↑↑↑ */
    },
    animate() {
      // if(this.bloomComposer) {
      //   this.bloomComposer.render()
      // }
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
    onDocumentMouseDown(e) {
      e.preventDefault();
      if (e.ctrlKey && e.button === 0) {
        //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
        this.mX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
        let intersects = raycaster.intersectObjects(this.group.children,true); // 标记地形
        // let intersects = raycaster.intersectObjects(this.gps0527Group.children,true); // 标记线
        // let intersects = raycaster.intersectObjects(this.baseGroup.children,true); // 显示1、2坑数据
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
          console.log(intersects[0])
          console.log(intersects[0].point)
          this.coordinate.x = intersects[0].point.x.toFixed(0)
          this.coordinate.y = intersects[0].point.z.toFixed(0)
          // 1号点
          if(
            intersects[0].point.x < -133 &&
            intersects[0].point.x > -137 &&
            intersects[0].point.z < -60 &&
            intersects[0].point.z > -62) {
            this.calculateCardFlag1 = true
          }
          // 2号点
          // -85.24467, -0.91612, -33.13839
          if(
            intersects[0].point.x > -87 &&
            intersects[0].point.x < -84 &&
            intersects[0].point.z > -35 &&
            intersects[0].point.z < -32) {
            this.calculateCardFlag2 = true
          }
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
    // 切换变换模式
    changeTransformStyle(v) {
      switch (v) {
        case 0: this.transformControls.setMode('rotate'); break;
        case 1: this.transformControls.setMode('translate'); break;
        case 2: this.transformControls.setMode('scale'); break;
      }
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
  overflow hidden
  background-color: #fff
  // #000428, #004e92
  background-image: linear-gradient(to right bottom, #5ac5da, #0D015B)
  .coordinate {
    position absolute
    top: 20px
    left: 850px
    color #ffffff
  }
  .main-tool {
    position absolute
    top: 20px
    left: 20px
    background-color: rgba(220, 220, 220, 0.4)
    padding: 20px
    box-shadow 2px 2px 4px rgba(51, 51, 51, 0.6)
    color #fff
    .btn-controller {
      display flex
      padding-top: 6px
      .btn {
        -webkit-border-radius: 4px
        -moz-border-radius: 4px
        border-radius: 4px
        background-color: rgba(106, 106, 249, 0.69)
        margin-right: 6px
        transition background-color ease-in-out 0.3s
        &:hover {
          background-color: #409EFF
          text-shadow 1px 1px 2px #023bb2
        }
      }
      .transform-btn-group {
        display flex
        .btn {
          padding 4px 10px
          width 65px
          cursor pointer
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
    }
  }
  .tools {
    line-height: 28px
    position absolute
    top: 20px
    right: 20px
    width: 300px
    color #fff
    padding: 20px
    background-color: rgba(220, 220, 220, 0.4)
    box-shadow 2px 2px 4px #333333
    transition: right ease-in-out 0.4s;
    .tools-inner {
      position relative
    }
    .float-btn {
      position absolute
      left: -44px
      top: calc(50% - 30px)
      transform scaleY(1.8)
      cursor pointer
      -webkit-border-radius: 4px 0 0 4px
      -moz-border-radius: 4px 0 0 4px
      border-radius: 4px 0 0 4px
      padding: 4px;
      color rgba(255, 255, 255, 0.6)
      background-color: rgba(255, 255, 255, 0.4)
    }
    i {
      font-style normal
      text-shadow 0 0 3px rgba(255, 255, 255, 0.6), 1px 1px 1px #000
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
    .data-show-group {
      padding-top:20px
      .pipe {
        .group {

        }
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
    height: 364px;
    display: flex;
    flex-direction column;
    overflow-y: scroll;
    .mark-item {
      //flex: 1
    }
  }
  .chart {
    position absolute
    bottom: 20px
    left: 20px
    transition left ease-in-out 0.4s
    //background-color: rgba(220, 220, 220, 0.4)
  }
  .calculate-card-1 {
    position absolute
    width: 220px
    height: 100px
    top: 140px
    left: 20px
    color #fff
    text-shadow 1px 1px 2px #333
    background-color: rgba(220, 220, 220, 0.4)
    padding: 20px
    box-shadow 2px 2px 4px rgba(51, 51, 51, 0.6)
  }
  .calculate-card-2 {
    @extends .channel .calculate-card-1;
    top: 290px
  }
}
</style>
