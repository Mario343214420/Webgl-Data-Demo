<template>
  <div class="data-cloud">
    <canvas ref="cvs" :height="h" :width="w"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "index",
  data(){
    return {
      scene: null,
      renderer: null,
      camera: null,
      w: 800,
      h: 480,
      baseGroup: null
    }
  },
  mounted() {
    window.onresize = () => {
      this.initBaseEle()
      this.render()
      this.animate()
    }

    this.initBaseEle()
    this.render()
    this.animate()
  },
  methods: {
    initBaseEle() {
      let baseEl = this.$el
      const {clientHeight, clientWidth} = baseEl
      this.h = clientHeight
      this.w = clientWidth
    },
    render() {
      const canvas = this.$refs.cvs
      this.renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true})
      this.renderer.setSize(this.w, this.h)
      this.renderer.shadowMap.enabled = true;
      this.camera = new THREE.PerspectiveCamera( 45, this.w / this.h, 1, 2000 );
      this.camera.position.set( 0, 10, 100 );
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.baseGroup = new THREE.Group()
      const loader = new GLTFLoader()
      loader.load('http://192.168.10.87:8000/scene.gltf', gltf => {
        console.log(gltf);
        this.baseGroup.add(gltf.scene)
      })
      this.scene = new THREE.Scene();
      let ambientLight = new THREE.AmbientLight(0xffffff);
      this.scene.add(ambientLight);
      this.scene.add(this.baseGroup)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      const axisHelper = new THREE.AxesHelper(40);
      this.scene.add(axisHelper);
    },
    animate() {
      requestAnimationFrame(this.animate);
      // this.bloomComposer.render()
      // TWEEN.update();
      this.renderer.render(this.scene, this.camera);
      this.controls.update()
    }
  }
}
</script>

<style lang="stylus" scoped>
.data-cloud
  height: 100%;
  width: 100%
  canvas
    display block
</style>
