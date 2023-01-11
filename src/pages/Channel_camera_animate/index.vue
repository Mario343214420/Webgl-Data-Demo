<template>
<div class="camera-rotate">
  <canvas ref="cvs"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
// const tween = require('tween.js')
import TWEEN from 'tween.js'
export default {
  name: 'CameraRotate',
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
      tween: null
    }
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      // this.bloomComposer.render()
      TWEEN.update();
      this.renderer.render(this.scene, this.camera);
    },
    init() {
      const canvas = this.$refs.cvs
      this.renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true})
      this.renderer.setSize(this.w, this.h)
      this.camera = new THREE.PerspectiveCamera( 45, this.w / this.h, 1, 100 );
      this.camera.position.set( 0, 10, 10 );
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.baseGroup = new THREE.Group()
      this.scene = new THREE.Scene();
      let ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);

      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      // const material = new THREE.MeshBasicMaterial( {color: 0x0fffff} );
      const e = new THREE.EdgesGeometry( geometry );
      const l = new THREE.LineSegments( e, new THREE.LineBasicMaterial( { color: 0x000000 } ) );
      // const cube = new THREE.Mesh( geometry, material );
      this.baseGroup.add(l)

      const geo = new THREE.BoxGeometry( 2, 2, 2 );
      const edges = new THREE.EdgesGeometry( geo );
      const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ffff } ) );
      this.baseGroup.add( line );

      this.scene.add(this.baseGroup)
      this.runTween()
    },
    runTween() {
      function cameraMove () {
        self.camera.position.x = this.x1
        self.camera.position.y = this.y1
        self.camera.position.z = this.z1
        self.camera.lookAt(new THREE.Vector3(this.x2, this.y2, this.z2))
      }
      const posBase = {
        x1: 0, y1: 10, z1: 10, x2: 0, y2: 0, z2: 0
      }
      const self = this
      this.tween = new TWEEN.Tween(posBase)
      this.tween.to({
        x1: 0, y1: 30, z1: 10, x2: 0, y2: 0, z2: 0
      }, 2000).onUpdate(cameraMove).easing(TWEEN.Easing.Linear.None)
      let tweenBack = new TWEEN.Tween(posBase).to({
        x1: -10, y1: 10, z1: 10, x2: 0, y2: 0, z2: 0
      },2000)
        .easing(TWEEN.Easing.Linear.None).onUpdate(cameraMove)
      this.tween.chain(tweenBack)
      tweenBack.chain(this.tween)
      // this.tween.repeat(10); // 重复10次后结束
      this.tween.start()
      // this.tween.repeat(Infinity); // 无限循环
      // tweenBack.repeat(Infinity); // 无限循环
      // .yoyo()仅在repeat触发时生效
    }
  },
  mounted() {
    this.init()
    this.animate()
  }
}
</script>

<style scoped>

</style>
