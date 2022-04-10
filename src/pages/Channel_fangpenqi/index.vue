<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
export default {
  name: 'Channel_fangpenqi',
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
      copyPipe: null
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
    renderLine(textList, position, objPos) {
      // 添加标注连线
      let lineMaterial = new THREE.LineBasicMaterial({
        color: 0x2288ff
      });

      let lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push(
        new THREE.Vector3(...position),
        new THREE.Vector3( ...objPos)
      );

      let line = new THREE.Line( lineGeometry, lineMaterial );
      // 标注精灵图
      let markCanvas = document.createElement("canvas");
      markCanvas.width = 300;
      markCanvas.height = textList.length * 62;
      /*2、创建图形，这部分可以去看w3c canvas教程*/
      let markCtx = markCanvas.getContext("2d");
      markCtx.fillStyle = "transparent";
      // markCtx.arc(50,50,50,0,2*Math.PI);

      markCtx.rect(0,0,300,markCanvas.height-1)
      markCtx.strokeStyle = "#fff"
      // markCtx.strokeRect(0,0,300,120)
      markCtx.fillStyle = "#023bb2"
      markCtx.fill();
      markCtx.stroke();
      //绘制字体
      markCtx.textAlign = "center";
      markCtx.font = '26px "微软雅黑"';
      markCtx.fillStyle = "#ffffff";
      markCtx.textBaseline = "top";
      textList.forEach((item, index) => {
        markCtx.fillText(item, markCanvas.width/2, 30 * index + 24);
      })
      /*3、将canvas作为纹理，创建Sprite*/
      let markTexture = new THREE.Texture(markCanvas);
      markTexture.needsUpdate = true;
      // var texture = new THREE.TextureLoader().load("sprite.png");
      // 创建精灵材质对象SpriteMaterial
      var spriteMaterial = new THREE.SpriteMaterial({
        // color:0xffffff,//设置精灵矩形区域颜色
        // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
        transparent: true,
        map: markTexture,//设置精灵纹理贴图
      });
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(...position)
      sprite.scale.set(20, 20 * (markCanvas.height / markCanvas.width), 20)
      sprite.renderOrder = 4
      this.scene.add(line)
      this.scene.add(sprite)
    },
    init() {
      const canvas = this.$refs.cvs
      const aspect = this.w/this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 20000)
      this.camera.position.z = 80
      this.camera.position.y = 20

      const fbxLoader = new FBXLoader()
      fbxLoader.load('./models/fangpenqi/FangPenQi.FBX', fbx=>{
      // fbxLoader.load('./models/fangpenqi/fangpenqi_.FBX', fbx=>{
      //   console.log(fbx)
        fbx.castShadow = true
        fbx.scale.set(0.001,0.001,0.001)
        fbx.position.set(-30, -30, 10)
        fbx.position.set(-30, -30, 7)
        this.scene.add(fbx)
        this.renderLine(['单闸板防喷器'], [26, 10, 0], [0, 0, 0])
        this.renderLine(['双闸板防喷器'], [26, -10, 0], [0, -20, 0])
        this.renderLine(['环形防喷器'], [26, 30, 0], [0, 20, 0])
      })

      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      //灯光属性
      const _spotLight = new THREE.SpotLight(0xf6f6f6);
      _spotLight.castShadow = true;
      _spotLight.position.set(1000,1000,1000);
      //设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024*4;
      this.scene.add(_spotLight);

      const axesHelper = new THREE.AxesHelper( 30 );
      // this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      this.renderer.setSize(this.w, this.h)
      this.renderer.shadowMap.enabled = true;
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    },
    animate() {
      // 镜头旋转（未生效）
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
canvas {
  display block
}
</style>
