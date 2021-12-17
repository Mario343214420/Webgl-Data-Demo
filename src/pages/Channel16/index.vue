<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h" @mousedown.left="cvsClick"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import TWEEN from 'tween.js'
export default {
  name: 'Channel16',
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
      boxes: null,
      mX: null,
      mY: null,
      flag: false,
      windmill: null,
      info: {
        name: '',
        safe: '安全',
        coordinate: '模拟坐标{x: 100, y: 200}',
        v: '',
        a: '',
        count: 100
      },
      floatPos: {
        x: 0,
        y: 0
      },
      addData: {
        x: '',
        y: '',
        z: '',
        name: '',
        type: '',
        a: '',
        v: '',
      },
      mixer: null,
      clock: null,
      raycaster: null,
      target: {
        x1: 0,
        y1: 500,
        z1: 500,
        x2: 0,
        y2: 0,
        z2: 0
      },
      tween: null,
      uniforms: {
        iTime: {
          type: 'f',
          value: 1.0
        },
        iResolution: {
          type: 'v2',
          value: new THREE.Vector2()
        },
        iMouse: {
          type: 'v2',
          value: new THREE.Vector2()
        }
      }
    }
  },
  watch: {
    /*target: {
      handler(n, o) {
      },
      deep: true
    }*/
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
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000)
      this.camera.position.z = this.target.z1
      this.camera.position.y = this.target.y1
      this.camera.lookAt(new THREE.Vector3(this.target.x, this.target.y, this.target.z))
      const helper = new THREE.CameraHelper( this.camera );
      this.scene.add( helper );

      // 日照光添加
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);
      const _pointLight = new THREE.PointLight(0xffffff)
      _pointLight.position.set(-5000, 4000, 0)
      this.scene.add(_pointLight)
      // 基准轴线添加
      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add( axesHelper );

      // 盒子组
      this.boxes = new THREE.Group()

      const geometry = new THREE.BoxGeometry( 400, 100, 400 );
      const material = new THREE.MeshBasicMaterial( {color: 0x00a0af} );
      const material1 = new THREE.ShaderMaterial({
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        uniforms: this.uniforms,
        side: THREE.DoubleSide,
        vertexShader:`
          void main() { gl_Position = vec4( position, 1.0 ); }
        `,
        fragmentShader:`
        uniform vec2 iResolution;
        uniform float iTime;
        void main(){
          vec2 p = (gl_FragCoord.xy-iResolution.xy*.5) / iResolution.y;
          float t = (iTime+1.3)*2.;
          float c = .0, d = .0, s = .0;
          for(float f = -5.; f < 1.; f += .6) {
            s = 20.;
            if (p.x > .0)
            s = 20. + sin(  tan( (p.x+p.y)/(p.x/p.y))*10.  )*2.;
            d = distance(
              vec3( tan(p.x*s+t), tan(p.y*s+t), f ),
              vec3( p.x*20., .0, -5. )
            );
            c += d * sin(t + .5/p.x + cos(p.y)*5.) * .01;
          }
          gl_FragColor = vec4(.5-c, .6-c*.25,1.-c*.5, 1.);//vec4(1.-c);
        }
        `
      })
      const cube = new THREE.Mesh( geometry, material1 );
      const box1 = cube.clone()
      this.boxes.add(box1)
      this.scene.add(this.boxes)

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false})
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true

    },
    animate() {
      this.uniforms.iTime.value += .02
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
      if(this.tween) {
        TWEEN.update()
      }
    },
    moveSmooth() {
      this.tween = new TWEEN.Tween(this.target).to({
        x1: intersects[0].object.position.x,
        y1: intersects[0].object.position.y + 200,
        z1: intersects[0].object.position.z + 200,
        x2: intersects[0].object.position.x,
        y2: intersects[0].object.position.y,
        z2: intersects[0].object.position.z,
      }, 1000)
      this.tween.onComplete(() => {
        console.log('完成动画')
      })
      this.tween.onUpdate(() => {
        this.controls.target.x = this.target.x2
        this.controls.target.y = this.target.y2
        this.controls.target.z = this.target.z2
      })
      this.tween.easing(TWEEN.Easing.Quadratic.Out)
      this.tween.start()
      if(this.tween) {
        try {　// 放在 TWEEN.js未加载完成导致报错
          TWEEN.update();
        } catch (error) {
          console.log(error)
        }
      }
    },
    cvsClick(e) {
      e.preventDefault();
      //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
      this.mX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
      //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
      this.raycaster = new THREE.Raycaster();
      this.raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      const intersects = this.raycaster.intersectObjects( this.boxes.children, true );
      if(intersects[0] && intersects[0].object.name){
        console.log(intersects[0].object.parent, this.boxes)
        const idx = intersects[0].object.parent.index
        this.boxes.children.forEach((item, index) => {
          if(item.index === idx) {
            item.position.y += 200
          } else if(item.index > idx) {
            item.position.y += 400
          }
        })
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
  .float {
    position: absolute
    opacity: 0
    z-index 100
    background-color: #fff
    border: 1px solid #000
    -webkit-border-radius: 6px
    -moz-border-radius: 6px
    border-radius: 6px
    padding: 20px
  }
  .handle-group {
    position: absolute;
    right: 20px;
    top: 20px;
    .row {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      margin: 8px 0
      input {
        margin-left: 10px
      }
    }
  }
}
</style>
