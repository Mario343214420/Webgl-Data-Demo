<template>
  <div class="model-container">
    <canvas ref="cvs" class="inner" @click="onDocumentMouseDown"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
export default {
  name: 'FangPenQi_Model',
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
      flag: false,
      group: null,
      baseLines: null,
      focusLines: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      const baseDom = this.$el
      this.w = baseDom.clientWidth
      this.h = baseDom.clientHeight
      this.init()
      this.animate()
    })
  },
  methods: {
    renderLine(textList, position, objPos) {
      // 添加标注连线
      let lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
      })

      let points = []
      points.push(
        new THREE.Vector3(...position),
        new THREE.Vector3(...objPos)
      )
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

      let line = new THREE.Line(lineGeometry, lineMaterial)
      // 标注精灵图
      let markCanvas = document.createElement('canvas')
      markCanvas.width = 300
      markCanvas.height = textList.length * 62
      /* 2、创建图形，这部分可以去看w3c canvas教程 */
      let markCtx = markCanvas.getContext('2d')
      markCtx.fillStyle = 'transparent'
      // markCtx.arc(50,50,50,0,2*Math.PI)

      markCtx.rect(0, 0, 300, markCanvas.height - 1)
      markCtx.strokeStyle = '#fff'
      // markCtx.strokeRect(0,0,300,120)
      markCtx.fillStyle = '#023bb2'
      markCtx.fill()
      markCtx.stroke()
      // 绘制字体
      markCtx.textAlign = 'center'
      markCtx.font = '26px "微软雅黑"'
      markCtx.fillStyle = '#ffffff'
      markCtx.textbaseLines = 'top'
      textList.forEach((item, index) => {
        markCtx.fillText(item, markCanvas.width / 2, 30 * index + 40)
      })
      /* 3、将canvas作为纹理，创建Sprite */
      let markTexture = new THREE.Texture(markCanvas)
      markTexture.needsUpdate = true
      // var texture = new THREE.TextureLoader().load("sprite.png")
      // 创建精灵材质对象SpriteMaterial
      const spriteMaterial = new THREE.SpriteMaterial({
        // color:0xffffff,//设置精灵矩形区域颜色
        // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
        transparent: true,
        map: markTexture// 设置精灵纹理贴图
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.position.set(...position)
      sprite.position.y += textList.length * 2
      sprite.scale.set(20, 20 * (markCanvas.height / markCanvas.width), 20)
      sprite.renderOrder = 4
      let group = new THREE.Group()
      group.add(line)
      group.add(sprite)
      return group
    },
    init() {
      const canvas = this.$refs.cvs
      canvas.width = this.w
      canvas.height = this.h
      const aspect = this.w / this.h
      this.scene = new THREE.Scene()
      this.group = new THREE.Group()
      this.baseLines = new THREE.Group()
      this.focusLines = new THREE.Group()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 200)
      this.camera.position.z = 80
      this.camera.position.y = 40
      this.camera.lookAt(0, 40, 0)
      const fbxLoader = new FBXLoader()
      fbxLoader.load('./models/FangPenQi.FBX', fbx => {
        fbx.castShadow = true
        fbx.scale.set(0.001, 0.001, 0.001)
        fbx.position.set(-30, -30, 10)
        fbx.position.set(-30, -30, 7)
        this.group.add(fbx)
        this.scene.add(this.group)
        this.baseLines.add(this.renderLine(['单闸板防喷器'], [26, 10, 0], [0, 0, 0]))
        this.baseLines.add(this.renderLine(['双闸板防喷器'], [26, 0, 0], [0, -10, 0]))
        this.baseLines.add(this.renderLine(['环形防喷器'], [26, 30, 0], [0, 20, 0]))
        this.scene.add(this.baseLines)
      }, progress => {
        console.log(progress)
      }, err => {
        console.log(err)
      })

      const _ambient = new THREE.AmbientLight(0xffffff)
      this.scene.add(_ambient)

      // 灯光属性
      const _spotLight = new THREE.SpotLight(0xf6f6f6)
      _spotLight.castShadow = true
      _spotLight.position.set(1000, 1000, 1000)
      // 设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024 * 4
      this.scene.add(_spotLight)
      this.scene.add(this.focusLines)
      // const axesHelper = new THREE.AxesHelper(30)
      // this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.autoRotate = true
    },
    animate() {
      // 镜头旋转（未生效）
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    onDocumentMouseDown(e) {
      e.preventDefault()
      // 将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
      this.mX = (e.clientX / window.innerWidth) * 2 - 1
      this.mY = -(e.clientY / window.innerHeight) * 2 + 1
      this.floatPos = {
        x: e.offsetX,
        y: e.offsetY
      }
      // 新建一个三维单位向量 假设z方向就是0.5
      // 根据照相机，把这个向量转换到视点坐标系
      let vector = new THREE.Vector3(this.mX, this.mY, 0.5).unproject(this.camera)

      // 在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
      let raycaster = new THREE.Raycaster()
      raycaster.setFromCamera({ x: this.mX, y: this.mY }, this.camera)
      const intersects = raycaster.intersectObjects(this.group.children[0].children)
      if (intersects[0] && intersects[0].object.name) {
        this.flag = true
        console.log(intersects[0])
        let focus = intersects[0].point
        console.log(this.scene)

        this.focusLines.children = []
        this.focusLines.add(this.renderLine(['温度： 40℃'], [focus.x, focus.y, focus.z + 20], [focus.x, focus.y, focus.z]))
      }
      /* //射线和模型求交，选中一系列直线
      var intersects = raycaster.intersectObjects(objects);
      console.log('imtersrcts=' + intersects)
      if (intersects.length > 0) {
        //选中第一个射线相交的物体
        SELECTED = intersects[0];
        var intersected = intersects[0];
        console.log(intersects[0])
      } */
    }
  }
}
</script>

<style lang="stylus" scoped>
.model-container
  height: 430px
  .inner
    height: 100%
    width: 100%
//background-color: #fff
canvas
  display block
</style>
