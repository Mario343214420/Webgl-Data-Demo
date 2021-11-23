<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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
      group1: null
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
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 4000)
      this.camera.position.z = 1000
      this.camera.position.y = 1000
      this.group = new THREE.Group()
      this.group1 = new THREE.Group()
      const glbLoader = new GLTFLoader()
      /*glbLoader.load('./models/complete_model/keyshot/GLB/aa.glb', glb=>{
        // let material = new THREE.PointsMaterial({
        //   color: 0x0000ff, //颜色
        //   size: 3, //点渲染尺寸
        // });
        let material = new THREE.MeshLambertMaterial({
          color: 0x0000ff
        });
        console.log(glb.scene.children[0].geometry)
        let mesh = new THREE.Mesh(glb.scene.children[0].geometry, material)
        this.scene.add(mesh)
        // glb.scene.children[0].position.z = -1000
        // this.scene.add(glb.scene.children[0])
      })*/
      /*glbLoader.load('./models/complete_model/keyshot/GLTF/Tile_+000_002.gltf', glb=>{
        this.scene.add(glb.scene.children[0])
      })*/
      let list = [
        [2,3,4,5,6,7],
        [2,3,4,5,6,7,8,9],
        [0,1,2,3,4],
        [6,7,8,9,10],
        [2,11],
        [0,1,2,6,8,10,11],
        [0,2,3,4,5,6,7,8,9,10,11],
        [0,1,2,3,4,5,6,7,8,9,10,11],
        [0,2,3,4,5,6,7,8,9,10,11],
        [2,3,4,5,6,7,8,9,10],
        [2,3,4,5,6,7,8,9,10],
        [3,4,5,6,7,8,9,10],
      ]
      list.forEach((item, index) => {
        item.forEach(i => {
          let url = `./models/3dtiles/00${index}/Tile_+00${index}_+00${i}.gltf`
          glbLoader.load(url, glb=>{
            let mesh = glb.scene.children[0]
            let geo = glb.scene.children[0].geometry
            // this.group.add(mesh)
            let m = new THREE.PointsMaterial({
              color: 0x0000ff, //颜色
              size: 16, //点渲染尺寸
            });
            this.group1.add(new THREE.Points(geo, m))
          })
        })
      })
      /*for(let i = 0; i < 6; i++) {
        let url = `./models/3dtiles/000/Tile_+000_+00${i + 2}.gltf`
        glbLoader.load(url, glb=>{
          this.group.add(glb.scene.children[0])
        })
      }
      for(let i = 0; i < 8; i++) {
        let url = `./models/3dtiles/001/Tile_+001_+00${i + 2}.gltf`
        glbLoader.load(url, glb=>{
          this.group.add(glb.scene.children[0])
        })
      }
      for(let i = 0; i < 5; i++) {
        let url = `./models/3dtiles/002/Tile_+002_+00${i + 2}.gltf`
        glbLoader.load(url, glb=>{
          this.group.add(glb.scene.children[0])
        })
      }
      for(let i = 0; i < 5; i++) {
        let url = `./models/3dtiles/003/Tile_+003_+00${i + 6}.gltf`
        glbLoader.load(url, glb=>{
          this.group.add(glb.scene.children[0])
        })
      }
      let url1 = `./models/3dtiles/004/Tile_+004_+002.gltf`
      let url2 = `./models/3dtiles/004/Tile_+004_+011.gltf`
      glbLoader.load(url1, glb=>{
        this.group.add(glb.scene.children[0])
      })
      glbLoader.load(url2, glb=>{
        this.group.add(glb.scene.children[0])
      })
      let arr5 = [0,1,2,6,8,10,11]
      arr5.forEach(item => {
        let url = `./models/3dtiles/005/Tile_+005_+00${item}.gltf`
        glbLoader.load(url, glb=>{
          this.group.add(glb.scene.children[0])
        })
      })
      let arr6 = [0,2,3,4,5,6,7,8,9,10,11]
      arr6.forEach(item => {
        let url = `./models/3dtiles/006/Tile_+006_+00${item}.gltf`
        glbLoader.load(url, glb=>{
          this.group.add(glb.scene.children[0])
        })
      })*/

      // let m = new THREE.PointsMaterial({
      //   color: 0x0000ff, //颜色
      //   size: 16, //点渲染尺寸
      // });
      // let point = new THREE.Points(geometry, m);

      /**
3dtile.exe -f b3dm -i E:\projects\suligejingchang\set\Data\Tile_+007_+000\Tile_+007_+000.b3dm -o E:\projects\suligejingchang\006\Tile_+007_+000.gltf
3dtile.exe -f b3dm -i E:\projects\suligejingchang\set\Data\Tile_+008_+000\Tile_+008_+000.b3dm -o E:\projects\suligejingchang\008\Tile_+008_+000.gltf
       */
      // glbLoader.load('./models/complete_model/keyshot/GLB/钻杆1.glb', glb=>{
      //   glb.scenes[0].rotateZ(Math.PI/2)
      //   glb.scenes[0].position.y = 90
      //   this.pipe = glb.scenes[0]
      //   this.pipeList = new THREE.Group()
      // })

      this.scene.add(this.group1)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      //灯光属性
      const _spotLight = new THREE.SpotLight(0xf6f6f6);
      _spotLight.castShadow = true;
      _spotLight.position.set(1000,1000,1000);
      //设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024*4;
      this.scene.add(_spotLight);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
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
}
</style>
