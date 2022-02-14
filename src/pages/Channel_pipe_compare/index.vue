<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
export default {
  name: 'Channel8',
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
      groupClone: null,
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
      linesGroup: null,
      modelPath: './models/chuanqing/',
      modelName: '.FBX',
      modelPosX: '0',
      modelPosY: '0',
      modelPosZ: '0',
      modelRotX: '0',
      modelRotY: '0',
      modelRotZ: '0',
      modelScaleX: '0.1',
      modelScaleY: '0.1',
      modelScaleZ: '0.1'
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
      this.camera.position.z = 30
      this.camera.position.x = -30
      this.camera.position.y = 2
      this.group = new THREE.Group()
      this.linesGroup = new THREE.Group()
      const points = [];
      points.push( new THREE.Vector3( -8, 40, 0 ) );
      points.push( new THREE.Vector3( -8, 10, 0 ) );
      points.push( new THREE.Vector3( -6, 0, 0 ) );
      points.push( new THREE.Vector3( -6, -10, 2 ) );
      points.push( new THREE.Vector3( -6, -50, 2 ) );
      const pointsArr = [
        -8, 15, 0,
        -8, 10, 0,
        -6, 0, 0,
        -6, -10, 2,
        -6, -25, 2
      ]
      // const lineMaterial = new THREE.LineBasicMaterial( { color: 0xff00ff, linewidth: 20 } );
      const lineMaterial = new LineMaterial( { color: 0x4080ff , linewidth: 6 } );
      lineMaterial.resolution.set(window.innerWidth, window.innerHeight)
      // const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
      const lineGeometry = new LineGeometry()
      lineGeometry.setPositions(pointsArr)
      const line = new Line2( lineGeometry, lineMaterial );
      line.computeLineDistances()
      this.linesGroup.add(line)
      this.linesGroup.position.z -= 5
      const fbxLoader = new FBXLoader()
      let list = [
        "Tile_+003_+008",
        "Tile_+003_+009",
        "Tile_+004_+008",
        "Tile_+004_+009",
      ]
      list.forEach((item, index) => {
        let url = `./models/model_compare/${item}/${item}.FBX`
        fbxLoader.load(url, fbx=>{
          let fbxCopy = fbx.clone()
          fbx.position.set(10, -50, 40)
          fbxCopy.position.set(10, -50, 40)
          if(index > 1) {
            fbx.position.set(-6, -50, 43)
            fbxCopy.position.set(-6, -50, 50)
          }
          this.group.add(fbx)
          this.groupClone.add(fbxCopy)
        }, progress => {
          // console.log(progress)
        }, err => {
          // console.log(err)
        })
      })

      /**
3dtile.exe -f b3dm -i E:\projects\suligejingchang\set\Data\Tile_+007_+000\Tile_+007_+000.b3dm -o E:\projects\suligejingchang\006\Tile_+007_+000.gltf
3dtile.exe -f b3dm -i E:\projects\suligejingchang\set\Data\Tile_+008_+000\Tile_+008_+000.b3dm -o E:\projects\suligejingchang\008\Tile_+008_+000.gltf
       */
      // this.group.rotation.z = Math.PI/4

      this.group.position.y += 4
      this.group.position.x += 2
      this.group.position.z -= 6
      this.linesGroup.position.y += 4
      this.linesGroup.position.x += 2
      this.linesGroup.position.z -= 10
      this.groupClone = new THREE.Group()
      this.groupClone.position.z += 4
      this.groupClone.position.x += 2
      this.groupClone.position.y += 4

      this.scene.add(this.group)
      this.scene.add(this.groupClone)
      this.scene.add(this.linesGroup)
      this.scene.rotation.x = -Math.PI / 2
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);


      //灯光属性
      /*const _spotLight = new THREE.SpotLight(0xf6f6f6);
      _spotLight.castShadow = true;
      _spotLight.position.set(1000,1000,1000);
      //设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024*4;
      this.scene.add(_spotLight);*/

      // const axesHelper = new THREE.AxesHelper( 20 );
      // this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)

      this.controls.enableDamping = true
      this.controls.autoRotate = true
    },
    animate() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
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
  .add-float {
    background-color: rgba(0,0,0,0.7)
    width: 400px
    height: 400px
    position: absolute
    top: 10px
    left: 10px
    display: flex
    flex-direction: column
    justify-content space-around
    box-sizing: border-box
    padding: 10px 20px
    color: #fff
    .row {
      input {
        display: inline-block;
        width: 260px
      }
      &.three-ipt {
        input {
          width 40px
          margin-right: 6px
          display inline-block
        }
      }
    }
  }
}
</style>
