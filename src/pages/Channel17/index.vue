<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h" @mousedown.left="cvsClick"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import TWEEN from 'tween.js'
export default {
  name: 'Channel17',
  data() {
    return {
      bloomComposer: null,
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
      support: null,
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
        y1: 200,
        z1: 200,
        x2: 0,
        y2: 0,
        z2: 0
      },
      tween: null,
      track: null,
      stars: null,
      timer: 1,
      mixer1: null,
      mixer2: null
    }
  },
  watch: {
    /*target: {
      handler(n, o) {
        // 切换动画
        this.tween = new TWEEN.Tween(o)
        this.tween.onComplete(() => {
          console.log('完成动画')
        })
        this.tween.to(n, 2000)
        this.tween.onUpdate(() => {
          this.camera.position.x = n.x1
          this.camera.position.y = n.y1
          this.camera.position.z = n.z1
          this.controls.target.x = n.x2
          this.controls.target.y = n.y2
          this.controls.target.z = n.z2
        })
        this.tween.easing(TWEEN.Easing.Quadratic.Out)
        this.tween.start()
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
      const loader = new FBXLoader()
      const canvas = this.$refs.cvs
      const aspect = this.w/this.h
      this.clock = new THREE.Clock()
      this.scene = new THREE.Scene()
      this.scene.fog = new THREE.Fog(0xffffff, 1, 1000);
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 20000)
      this.camera.position.z = 160
      this.camera.position.y = 110
      this.camera.position.x = -130
      this.camera.lookAt(new THREE.Vector3(this.target.x, this.target.y, this.target.z))
      // const helper = new THREE.CameraHelper( this.camera );
      // this.scene.add( helper );

      // 日照光添加
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);
      const _pointLight = new THREE.PointLight(0xffffff);
      _pointLight.position.set(100, 100, 100);
      this.scene.add(_pointLight);

      const _spotLight = new THREE.SpotLight( 0xFFFFFF, 8, 80, Math.PI/4);
      _spotLight.position.set(-160,40,100);
      // _spotLight.target = this.boxes
      this.scene.add(_spotLight)
      // const lh = new THREE.SpotLightHelper(_spotLight, 0xdfdfdf)
      // this.scene.add(lh)

      // 基准轴线添加
      // const axesHelper = new THREE.AxesHelper( 20 );
      // this.scene.add( axesHelper );

      // 盒子组
      this.boxes = new THREE.Group()
      loader.load('http://192.168.1.91:8000/track.FBX', fbx => {
        fbx.scale.set(.01,.01,.01)
        fbx.rotation.y = Math.PI / 2
        fbx.position.x = 137
        fbx.renderOrder = 0
        this.track = fbx
        this.scene.add(this.track)
      })

      this.group = new THREE.Group()
      let materialB = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(this.generateSprite(true)),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
      });
      let materialY = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(this.generateSprite(false)),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
      });
      for(let i = 0; i < 600; i++) {
        let _material = (Math.random()>0.3 ?materialB.clone():materialY.clone());
        _material.opacity = THREE.Math.randFloat(0.5, 1);
        let particle = new THREE.Sprite(_material);
        particle.position.x = Math.random() * 600 - 160
        particle.position.y = Math.random() * 200
        particle.position.z = Math.random() * 200 - 100
        particle.renderOrder = 4
        this.group.add(particle)
      }
      /*let texts = []
      let meshs = []
      let textMtl = new THREE.MeshLambertMaterial({color:0x00ff33});
      let textPram = {
        height : 8,
        size : 30,
        hover : 30,
        curveSegments : 4,
        bevelThickness : 2,
        bevelSize : 1.5,
        bevelSegments : 3,
        bevelEnabled : true,
        weight : "normal",
        style : "normal"
      }
      for(let i = 0;i<=127;i++) {
        let s = String.fromCharCode(i)
        texts.push(new THREE.TextGeometry(s,textPram));
        console.log(texts)
      }
      for(let i= 0;i<1000;i++) {
        // let text = texts[i%127];
        // console.log(text)
        // let mesh = new THREE.Mesh(text,textMtl);
        // mesh.position.x=(Math.random() * 2 - 1) * codeAreaDept;
        // mesh.position.y=(Math.random() * 2 - 1) * codeAreaDept;
        // mesh.position.z=(Math.random() * 2 - 1) * codeAreaDept;
        // mesh.rotation.y += Math.random() * 360 * Math.PI/180.0;
        // this.group.add(mesh);
      }*/
      this.scene.add(this.group)
      /*const starMaterial1 = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load( "http://192.168.1.91:8000/star-blue.png" ),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide
      });
      const starMaterial2 = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load( "http://192.168.1.188:8000/star-green.png" ),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide
      });*/
      const planeGeometry = new THREE.PlaneGeometry(30, 1);
      const pStarMtl1 = new THREE.MeshPhongMaterial( { transparent: true, map: new THREE.TextureLoader().load( "http://192.168.1.91:8000/star-green.png" )} );
      const pStarMtl2 = new THREE.MeshPhongMaterial( { transparent: true, map: new THREE.TextureLoader().load( "http://192.168.1.91:8000/star-blue.png" )} );
      const starParticle1 = new THREE.Mesh( planeGeometry, pStarMtl1 );
      const starParticle2 = new THREE.Mesh( planeGeometry, pStarMtl2 );
      starParticle1.renderOrder = 2
      starParticle2.renderOrder = 3

      starParticle1.rotation.x = -Math.PI / 2
      starParticle1.position.y = 8
      starParticle1.position.x = 0
      starParticle1.position.z = 86
      starParticle2.rotation.x = -Math.PI / 2
      starParticle2.position.y = 8
      starParticle2.position.x = -140
      starParticle2.position.z = 88
      this.stars = new THREE.Group()
      this.stars.add(starParticle1)
      this.stars.add(starParticle2)
      this.scene.add(this.stars)

      loader.load('./models/tianma/caijuemian.FBX', fbx => {
        fbx.children[0].material.side = 2
        fbx.scale.set(.02, .02, .02)
        fbx.position.x = 230
        this.boxes.add(fbx)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 4)
        directionalLight.position.set(-100, 30, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 2;
        directionalLight.shadow.camera.far = 100;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        this.scene.add(directionalLight)
        // const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
        // this.scene.add( helper );
      })
      this.scene.add(this.boxes)

      this.support = new THREE.Group()

      this.clock = new THREE.Clock();
      loader.load('./models/tianma/yeyazhijia_opacity_0.8.FBX', fbx => {
        fbx.scale.set(0.03, 0.03, 0.03)
        for(let i = 0; i < 16; i++) {
          let fbxClone = fbx.clone()
          fbxClone.position.z = i * 10 - 70
          fbxClone.position.x = 156
          fbxClone.position.y = 10
          this.support.add(fbxClone)
        }
      })
      loader.load('./models/tianma/gemeiji_opacity_0.8.FBX', fbx => {
        fbx.scale.set(0.003, 0.003, 0.003)
        fbx.position.x = 164
        this.track = fbx
        this.scene.add(this.track)
        this.mixer2 = new THREE.AnimationMixer( this.track );
        this.mixer2.clipAction( this.track.animations[0]).play();
      })

      this.scene.add(this.support)

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false})
      this.renderer.setSize(this.w, this.h)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true

      // this.addBloomPass()
    },
    generateSprite(flag) {
      let canvas = document.createElement('canvas');
      canvas.width = 4;
      canvas.height = 4;

      let context = canvas.getContext('2d');
      let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
      gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
      if (flag) {
        gradient.addColorStop(0.2, 'rgba(19,193,245,0.8)');
        gradient.addColorStop(0.4, 'rgba(8,116,157,0.8)');
      } else {
        gradient.addColorStop(0.2, 'rgba(248,238,4,0.8)');
        gradient.addColorStop(0.4, 'rgba(190,175,2,0.8)');
      }
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      return canvas;
    },
    initParticles(cube, width, height) {
      let material = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(this.generateSprite()),
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        depthTest: false
      });
      let particles = [];
      let flag = true;
      let timer = setInterval(() => {
        // 不断生成粒子
        if (!flag) clearInterval(timer);
        // 每次发射粒子数量
        for (let i = 0; i < 20; i++) {
          let _material = material.clone();
          _material.opacity = THREE.Math.randFloat(0.4, 0.8);
          let particle = new THREE.Sprite(_material);
          let y = THREE.Math.randFloat(0, 5)
          particle.position.set(THREE.Math.randFloat(-width, width), y, THREE.Math.randFloat(-width, width));
          particle.scale.set(Math.random() + 0.5, Math.random() + 0.5, 1);
          particles.push(particle);
          this.scene.add(particle);
          let tween = new TWEEN.Tween(particle.position)
            .delay(0)
            .to({
              y: height - THREE.Math.randFloat(5, 30)
            }, 2500)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(() => {
              flag = false;
              particle.position.set(THREE.Math.randFloat(-width, width), 0, THREE.Math.randFloat(-width, width));
            })
            .start();
          tween.chain(tween);
        }
      }, 1000);
    },
    animate() {
      this.timer += 0.4
      // if(this.bloomComposer) {
      //   this.bloomComposer.render()
      // }
      this.group.children.forEach(item => {
        if(item.position.y < 200) {
          item.position.y += 0.1
        } else {
          item.position.y = 0
        }
      })
      this.stars.children.forEach(item => {
        item.position.x += 10
        if (item.position.x < 120) {
          item.position.x += 0.6
        }else {
          item.position.x = -140
        }
      })
      if (this.track) {
        let speed = Math.sin(this.timer/40) * 74
        this.track.position.z = speed
        this.track.position.y = 14
      }
      if(this.clock && this.mixer2) {
        console.log(this.support)
        // this.mixer2 = new THREE.AnimationMixer( this.track );
        // this.mixer2.clipAction( this.track.animations[0]).play();
        let delta = this.clock.getDelta();
        // this.mixer1.forEach(item => item.update(delta))
        this.mixer2.update(delta)
      }
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
      if(this.tween) {
        TWEEN.update()
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
      const intersects = this.raycaster.intersectObjects( this.boxes.children );
      console.log(intersects)
      if(intersects[0] && intersects[0].object.name){
        this.flag = true
        this.info.name = intersects[0].object.name
        this.info.count = parseInt(Math.random() * 30)
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
        if(intersects[0].object.name === 'box4') {
          console.log(this.boxes)
          this.boxes.children[3].position.y = 40
        }
      }
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
      const bloomPass = new BloomPass(3, 30, 10.0, 256); //BloomPass通道效果
      //创建效果组合器对象，可以在该对象上添加后期处理通道，通过配置该对象，使它可以渲染我们的场景，并应用额外的后期处理步骤，在render循环中，使用EffectComposer渲染场景、应用通道，并输出结果。
      this.bloomComposer = new EffectComposer(this.renderer)
      this.bloomComposer.setSize(window.innerWidth, window.innerHeight);
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.bloomComposer.addPass(effectCopy);
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
  background-color: #eeeeee
  &::after {
    content ''
    position: absolute
    display block
    top: 0
    left: 0
    width: 100%
    height: 100%
    pointer-events none
    background-image: radial-gradient(transparent 30%, rgba(0,0,0,0.7) 70%)
  }
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
