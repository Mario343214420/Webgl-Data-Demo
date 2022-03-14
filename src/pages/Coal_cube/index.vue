<template>
<div class="base-dom">
  <canvas ref="canvas"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import SocketIO from 'socket.io-client'
export default {
  name: 'CoalCube',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      group: null,
      renderSize: {
        width: 0,
        height: 0
      },
      bloomComposer: null,
      client: {},
      // pos: [],
      cube: null,
      gbjCubeGroup: null
    }
  },
  methods: {
    initRenderer() {
      const canvas = this.$refs.canvas
      // 视口高宽比
      const aspect = canvas.width / canvas.height
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000)
      this.camera.position.set(70,70,70)
      this.group = new THREE.Group()
      this.gbjCubeGroup = new THREE.Group()
      // const geometry = new THREE.BoxGeometry( 10, 10, 10 );
      const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
      // const mesh = new THREE.Mesh( geometry, material );
      // this.group.add(mesh)
      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      this.cube = new THREE.Mesh( geometry, material )
      this.group.add(this.cube)
      this.scene.add(this.group)
      this.scene.add(this.gbjCubeGroup)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);
      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
      this.renderer.setSize(canvas.width, canvas.height)
      this.renderer.autoClear = false
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // this.addBloomPass()
      // 页面缩放重绘
      // window.onresize = () => {
      //
      // }
    },
    animate() {
      if(this.bloomComposer) {
        this.bloomComposer.render()
      }
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
      const bloomPass = new BloomPass(0.8, 25, 4.0, 256); //BloomPass通道效果
      //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
      this.bloomComposer = new EffectComposer(this.renderer)
      this.bloomComposer.setSize(this.$refs.canvas, this.$refs.canvas);
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.bloomComposer.addPass(effectCopy);
    },
  },
  mounted() {
    // this.$socket.subscribe('news', data => {
    //   console.log(data)
    // })
    let socket = new SocketIO()
    socket.io.connect('http://localhost:90');
    socket.on('gbj_news',  data => {
      let positionIndex = data.indexOf('position')
      let attitudeIndex = data.indexOf('Attitude')
      if(positionIndex === -1) {
        if(data.indexOf('datas') === -1) {
          let dataIndex = data.indexOf('data')
          let str = data.substring(dataIndex + 6, data.length - 2)
          // console.log('data', str)
        } else {
          let datasIndex = data.indexOf('datas')
          let attsIndex = data.indexOf('atts')
          let str = data.substring(datasIndex + 8, attsIndex - 3)
          // console.log('datas:', data)
          let arr = JSON.parse(str)
          if(this.scene){

            const material = new THREE.MeshBasicMaterial( { color: 0xff00 } );
            const mesh = new THREE.Mesh( geometry, material );
            // this.group.add(mesh)
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            arr.forEach(item => {
              // const mesh = new THREE.Mesh( geometry, material )
              let copy = mesh.clone()
              copy.position.set(parseFloat(item[0]), parseFloat(item[1]), parseFloat(item[2]))
              this.gbjCubeGroup.add(copy)
            })
          }
        }
      } else {
        let str = data.substring(positionIndex + 12 , attitudeIndex - 4)
        // console.log(str)
      }
    })
    socket.on('zj_news',  data => {
      // console.log(data)
    })
    socket.on('cmj_news',  data => {
      // socket.emit('send', { my: 'data' });
      let positionIndex = data.indexOf('position')
      let attitudeIndex = data.indexOf('Attitude')
      let beforeIndex = data.indexOf('[')
      let afterIndex = data.indexOf(']')
      let str = data.substring(positionIndex + 12 , attitudeIndex - 4)
      // this.pos = JSON.parse(JSON.stringify(str))
      // let posArr = JSON.parse(JSON.stringify(str))
      let posArr = str.split(",")
      // let arr = [0,0,0]
      // arr.forEach((item, index) => item = parseFloat(posArr[index]))
      if(this.cube && posArr.length > 0) {
        this.cube.position.set(parseFloat(posArr[0]), parseFloat(posArr[1]), parseFloat(posArr[2]))
      }
    });
    // this.mqttConnect()
    // const canvas = document.createElement('Canvas')
    // console.log(document.body.clientWidth)
    this.$refs.canvas.width = document.body.clientWidth
    this.$refs.canvas.height = document.body.clientHeight
    this.$refs.canvas.style.position = 'absolute'
    this.$refs.canvas.style.top = this.$refs.canvas.style.left = '0'
    // this.$el.appendChild(canvas)
    // const baseDom = this.$el
    // this.renderSize.width = baseDom.clientWidth
    // this.renderSize.height = baseDom.clientHeight
    // this.renderSize.width = document.body.clientWidth
    // this.renderSize.height = document.body.clientHeight
    this.$nextTick(() => {
      this.initRenderer()
      this.animate()
    })
  }
}
</script>

<style lang="stylus" scoped>
//.base-dom
</style>
