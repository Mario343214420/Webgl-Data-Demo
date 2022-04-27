<template>
  <div>
    <div id="container"></div>
    <div class="controls-box">

      <section>
        <el-row>
          <el-checkbox v-model="ambientLightVisible">是否展示环境光</el-checkbox>
        </el-row>
        <el-row>
          <el-col :span="8" class="label-col"><label> 环境光颜色</label></el-col>
          <el-col :span="16">
            <div @click="ambientLightInputClick">
              <el-input :value="ambientLightcolor"></el-input>
            </div>
            <div v-show="isShowAmbientLightColors" class="color-select-layer">
              <sketch-picker v-model="ambientLightcolor" @input="ambientLightColorChange"></sketch-picker>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-checkbox v-model="lightProperties.visible">是否展示聚光灯</el-checkbox>
        </el-row>
        <el-row>

          <el-col :span="8" class="label-col"><label> 聚光灯颜色</label></el-col>
          <el-col :span="16">
            <div @click="inputClick">
              <el-input :value="lightProperties.color"></el-input>
            </div>
            <div v-show="isShowColors" class="color-select-layer">
              <sketch-picker v-model="lightProperties.color" @input="colorChange"></sketch-picker>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div v-for="(item,key) in lightProperties" :key="key">
            <div v-if="item && item.name !== undefined">
              <el-col :span="8">
                <span class="vertice-span">{{item.name}}</span>
              </el-col>
              <el-col :span="13">
                <el-slider v-model="item.value" :min="item.min" :max="item.max" :step="item.step" :format-tooltip="formatTooltip"></el-slider>
              </el-col>
              <el-col :span="3">
                <span class="vertice-span">{{item.value}}</span>
              </el-col>
            </div>
          </div>

        </el-row>
        <el-row>
          <el-col :span="8" class="label-col"><label>target</label></el-col>
          <el-col :span="16">
            <el-select v-model="lightProperties.target" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-checkbox v-model="lightProperties.castShadow">是否产生阴影</el-checkbox>
        </el-row>
      </section>

    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sketch } from 'vue-color'
export default {
  components: {
    'sketch-picker': Sketch
  },
  data () {
    return {
      options: [
        {
          value: 'cube',
          label: 'cube'
        },
        {
          value: 'sphere',
          label: 'sphere'
        },
        {
          value: 'plane',
          label: 'plane'
        }
      ],
      lightProperties: {
        positionX: {
          name: 'positionX',
          value: 15,
          min: -40,
          max: 40,
          step: 1
        },
        positionY: {
          name: 'positionY',
          value: 40,
          min: -60,
          max: 100,
          step: 1
        },
        positionZ: {
          name: 'positionZ',
          value: 35,
          min: -40,
          max: 40,
          step: 1
        },
        angle: {
          name: 'angle',
          value: 0.4,
          min: 0.1,
          max: 1.5,
          step: 0.1
        },
        intensity: {
          name: 'intensity',
          value: 3.1,
          min: 0,
          max: 5,
          step: 0.1
        },
        distance: {
          name: 'distance',
          value: 200,
          min: 0,
          max: 1000,
          step: 1
        },
        decay: {
          name: 'decay ',
          value: 1,
          min: 0,
          max: 2,
          step: 0.1
        },
        penumbra: {
          name: 'penumbra',
          value: 0.1,
          min: 0,
          max: 1,
          step: 0.1
        },
        color: '#ccffcc',
        visible: true,
        target: 'sphere',
        castShadow: true,
        onlyShadow: false
      },

      ambientLightVisible: true,
      isShowAmbientLightColors: false,
      ambientLightcolor: '#0c0c0c',
      isShowColors: false,
      lightHelper: null,
      shadowCameraHelper: null,
      cube: null,
      sphere: null,
      plane: null,
      ambientLight: null,
      spotLight: null,
      camera: null,
      scene: null,
      renderer: null,
      controls: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    formatTooltip (val) {
      return val
    },
    ambientLightInputClick () {
      this.isShowAmbientLightColors = !this.isShowAmbientLightColors
    },
    ambientLightColorChange (val) {
      this.ambientLightcolor = val.hex
    },
    inputClick () {
      this.isShowColors = !this.isShowColors
    },
    colorChange (val) {
      this.lightProperties.color = val.hex
    },
    // 初始化
    init () {
      this.createScene() // 创建场景
      this.createMesh() // 创建网格模型
      this.createCubeAndSphere() // 创建方块和球
      this.createLight() // 创建光源
      this.createCamera() // 创建相机
      this.createRender() // 创建渲染器
      this.createControls() // 创建控件对象
      this.render() // 渲染
    },
    // 创建场景
    createScene () {
      this.scene = new THREE.Scene()
    },
    // 创建网格模型
    createMesh () {
      const material = new THREE.MeshPhongMaterial({
        color: 0x808080,
        dithering: true
      })

      const geometry = new THREE.PlaneBufferGeometry(2000, 2000)

      this.plane = new THREE.Mesh(geometry, material)
      this.plane.position.set(0, 0, 0)
      this.plane.rotation.x = -Math.PI * 0.5
      this.plane.receiveShadow = true
      this.scene.add(this.plane)
    },
    // 创建方块和球
    createCubeAndSphere () {
      const geom = new THREE.BoxGeometry(4, 4, 4) // 创建几何对象geom
      const material = new THREE.MeshLambertMaterial({ color: 0xff0000 }) // 创建材质对象material
      this.cube = new THREE.Mesh(geom, material) // 创建网格对象cube
      this.cube.castShadow = true
      this.cube.position.set(-4, 6, 2)
      this.scene.add(this.cube) // 将网格对象添加到场景

      const sphereGeometry = new THREE.SphereGeometry(4, 26, 20) // 创建几何对象sphereGeometry
      const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff }) // 创建材质对象sphereMaterial
      this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial) // 创建网格对象sphere
      this.sphere.castShadow = true
      this.sphere.position.set(-4, 5, 12)
      this.scene.add(this.sphere) // 将网格对象添加到场景
    },

    // 创建光源
    createLight () {
      // 环境光
      this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1) // 创建环境光
      this.scene.add(this.ambientLight) // 将环境光添加到场景

      this.spotLight = new THREE.SpotLight(0xffffff)
      this.spotLight.position.set(15, 40, 35)
      this.spotLight.angle = Math.PI / 4
      this.spotLight.penumbra = 0.05
      this.spotLight.decay = 2
      this.spotLight.distance = 100

      this.spotLight.castShadow = true
      this.spotLight.shadow.mapSize.width = 256
      this.spotLight.shadow.mapSize.height = 256
      this.spotLight.shadow.camera.near = 10
      this.spotLight.shadow.camera.far = 10
      this.scene.add(this.spotLight)

      this.lightHelper = new THREE.SpotLightHelper(this.spotLight)
      this.scene.add(this.lightHelper)

      this.shadowCameraHelper = new THREE.CameraHelper(
        this.spotLight.shadow.camera
      )
      this.scene.add(this.shadowCameraHelper)

      this.scene.add(new THREE.AxesHelper(20))
    },
    // 创建相机
    createCamera () {
      const element = document.getElementById('container')
      const width = element.clientWidth // 窗口宽度
      const height = element.clientHeight // 窗口高度
      const k = width / height // 窗口宽高比
      // PerspectiveCamera( fov, aspect, near, far )
      this.camera = new THREE.PerspectiveCamera(35, k, 0.1, 1000)
      this.camera.position.set(165, 38, -10) // 设置相机位置

      this.camera.lookAt(new THREE.Vector3(10, 0, 0)) // 设置相机方向
      this.scene.add(this.camera)
    },
    // 创建渲染器
    createRender () {
      const element = document.getElementById('container')
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(element.clientWidth, element.clientHeight) // 设置渲染区域尺寸
      this.renderer.shadowMap.enabled = true // 显示阴影
      this.renderer.setClearColor(0x3f3f3f, 1) // 设置背景颜色
      element.appendChild(this.renderer.domElement)
    },
    // 更新属性
    updateFun () {
      // 环境光颜色更新
      this.ambientLight.color = new THREE.Color(this.ambientLightcolor)
      // 环境光是否可见更新
      this.ambientLight.visible = this.ambientLightVisible

      // 聚光灯颜色更新
      this.spotLight.color = new THREE.Color(this.lightProperties.color)

      // 聚光灯角度更新
      this.spotLight.angle = this.lightProperties.angle.value

      // 聚光灯强度更新
      this.spotLight.intensity = this.lightProperties.intensity.value

      // 聚光灯距离更新
      this.spotLight.distance = this.lightProperties.distance.value

      // 更新聚光锥的半影衰减百分比
      this.spotLight.penumbra = this.lightProperties.penumbra.value

      // 更新沿着光照距离的衰减量
      this.spotLight.decay = this.lightProperties.decay.value

      // 聚光灯位置更新
      this.spotLight.position.set(
        this.lightProperties.positionX.value,
        this.lightProperties.positionY.value,
        this.lightProperties.positionZ.value
      )

      // 更新target
      if (this.lightProperties.target === 'sphere') {
        this.spotLight.target = this.sphere
      } else if (this.lightProperties.target === 'plane') {
        this.spotLight.target = this.plane
      } else {
        this.spotLight.target = this.cube
      }

      // 聚光灯是否可见更新
      this.spotLight.visible = this.lightProperties.visible
      // 是否产生阴影
      this.spotLight.castShadow = this.lightProperties.castShadow
      // 更新辅助工具
      this.lightHelper.update()
      this.shadowCameraHelper.update()
    },
    render () {
      this.updateFun()

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    // 创建控件对象
    createControls () {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.copy(this.plane.position)
    }
  }
}
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.controls-box {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 300px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #c3c3c3;
}
.label-col {
  padding: 8px 5px;
}
.color-select-layer {
  position: relative;
  left: -20px;
  padding: 15px 0;
}
.vertice-span {
  line-height: 38px;
  padding: 0 2px 0 10px;
}
</style>
