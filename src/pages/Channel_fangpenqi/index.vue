<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h" @click="onDocumentMouseDown"></canvas>
    <div style="height: 400px; width: 600px; position: absolute; top: 40px; left: 40px; z-index: 10">
      <e-chart id="chart" :option="option_column" style="height: 400px; width: 600px"></e-chart>
    </div>
    <div style="height: 400px; width: 600px; position: absolute; bottom: 40px; left: 40px; z-index: 10">
      <e-chart id="chart" :option="chartOption" style="height: 400px; width: 600px"></e-chart>
    </div>
    <div style="height: 400px; width: 600px; position: absolute; top: 40px; right: 40px; z-index: 10">
      <e-chart id="chart" :option="chartOption" style="height: 400px; width: 600px"></e-chart>
    </div>
    <div style="height: 400px; width: 600px; position: absolute; bottom: 40px; right: 40px; z-index: 10">
      <e-chart id="chart" :option="option_column" style="height: 400px; width: 600px"></e-chart>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as echarts from 'echarts'
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
      copyPipe: null,
      modelsGroup: null,
      option_column: {
        title: { text: "Temperature-controlled Meter" },
        tooltip: {},
        xAxis: {
          data: ["温度 01", "温度 02", "温度 03", "温度 04", "温度 05", "温度 06"],
          axisLabel: {
            color: '#ffffff',
            formatter: params => params.substring(0, 2) + '\n' + params.substring(2)
          }
        },
        yAxis: {
          axisLabel: {
            color: '#ffffff'
          }
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
      chartOption: {
        title: {
          text: 'Machine State',
          left: '5%',
          top: '3%'
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          right: '10%',
          top: '3%',
          data: ['1990', '2015']
        },
        grid: {
          left: '8%',
          top: '10%'
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#ffffff'
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          scale: true,
          axisLabel: {
            color: '#ffffff'
          }
        },
        series: [
          {
            name: '1990',
            data: [
              [28604, 77, 17096869, 'Australia', 1990],
              [31163, 77.4, 27662440, 'Canada', 1990],
              [1516, 68, 1154605773, 'China', 1990],
              [13670, 74.7, 10582082, 'Cuba', 1990],
              [28599, 75, 4986705, 'Finland', 1990],
              [29476, 77.1, 56943299, 'France', 1990],
              [31476, 75.4, 78958237, 'Germany', 1990],
              [28666, 78.1, 254830, 'Iceland', 1990],
              [1777, 57.7, 870601776, 'India', 1990],
              [29550, 79.1, 122249285, 'Japan', 1990],
              [2076, 67.9, 20194354, 'North Korea', 1990],
              [12087, 72, 42972254, 'South Korea', 1990],
              [24021, 75.4, 3397534, 'New Zealand', 1990],
              [43296, 76.8, 4240375, 'Norway', 1990],
              [10088, 70.8, 38195258, 'Poland', 1990],
              [19349, 69.6, 147568552, 'Russia', 1990],
              [10670, 67.3, 53994605, 'Turkey', 1990],
              [26424, 75.7, 57110117, 'United Kingdom', 1990],
              [37062, 75.4, 252847810, 'United States', 1990]
            ],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: 'top'
              }
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: 'rgb(251, 118, 123)'
                },
                {
                  offset: 1,
                  color: 'rgb(204, 46, 72)'
                }
              ])
            }
          },
          {
            name: '2015',
            data: [
              [44056, 81.8, 23968973, 'Australia', 2015],
              [43294, 81.7, 35939927, 'Canada', 2015],
              [13334, 76.9, 1376048943, 'China', 2015],
              [21291, 78.5, 11389562, 'Cuba', 2015],
              [38923, 80.8, 5503457, 'Finland', 2015],
              [37599, 81.9, 64395345, 'France', 2015],
              [44053, 81.1, 80688545, 'Germany', 2015],
              [42182, 82.8, 329425, 'Iceland', 2015],
              [5903, 66.8, 1311050527, 'India', 2015],
              [36162, 83.5, 126573481, 'Japan', 2015],
              [1390, 71.4, 25155317, 'North Korea', 2015],
              [34644, 80.7, 50293439, 'South Korea', 2015],
              [34186, 80.6, 4528526, 'New Zealand', 2015],
              [64304, 81.6, 5210967, 'Norway', 2015],
              [24787, 77.3, 38611794, 'Poland', 2015],
              [23038, 73.13, 143456918, 'Russia', 2015],
              [19360, 76.5, 78665830, 'Turkey', 2015],
              [38225, 81.4, 64715810, 'United Kingdom', 2015],
              [53354, 79.1, 321773631, 'United States', 2015]
            ],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: 'top'
              }
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(25, 100, 150, 0.5)',
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: 'rgb(129, 227, 238)'
                },
                {
                  offset: 1,
                  color: 'rgb(25, 183, 207)'
                }
              ])
            }
          }
        ]
      }
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
      this.camera.position.x = 80
      this.camera.position.z = 80
      this.camera.position.y = 60
      this.modelsGroup = new THREE.Group()
      this.modelsGroup.name = '防喷器组'
      this.modelsGroup.position.set(0, -10, 0)
      const fbxLoader = new FBXLoader()

      const _ambient = new THREE.AmbientLight(0xffffff, 0.2);
      this.scene.add(_ambient);

      fbxLoader.load('./models/fangpenqi/final/danzhaban.FBX', fbx => {
        fbx.position.set(-25, 0, 60)
        fbx.name = '单闸板防喷器 01'
        let clone = fbx.clone(true)
        clone.name = '单闸板防喷器 02'
        clone.position.set(-25, 20, 60)
        this.modelsGroup.add(fbx)
        this.modelsGroup.add(clone)
      })
      fbxLoader.load('./models/fangpenqi/final/shuangzhaban.FBX', fbx => {
        fbx.position.set(-25, -20, 60)
        fbx.name = '双闸板防喷器'
        this.modelsGroup.add(fbx)
      })
      fbxLoader.load('./models/fangpenqi/final/huanxing.FBX', fbx => {
        fbx.name = '环形防喷器'
        fbx.position.set(0, 40, -0.2)
        this.modelsGroup.add(fbx)
      })
      //灯光属性
      const _spotLight = new THREE.SpotLight(0xf6f6f6, 0.5);
      _spotLight.castShadow = true;
      _spotLight.position.set(80,20,-80);
      //设置阴影贴图精度
      _spotLight.shadow.mapSize.width = _spotLight.shadow.mapSize.height = 1024*4;
      this.scene.add(_spotLight);
      let spotLightClone = _spotLight.clone(true)
      spotLightClone.position.set(80,20,80);
      this.scene.add(spotLightClone);
      this.scene.add(this.modelsGroup)
      const axesHelper = new THREE.AxesHelper( 30 );
      this.scene.add(axesHelper)
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
    },
    onDocumentMouseDown(e) {
      e.preventDefault();
      //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
      this.mX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
      //新建一个三维单位向量 假设z方向就是0.5
      //根据照相机，把这个向量转换到视点坐标系
      // let vector = new THREE.Vector3(this.mX, this.mY,0.5).unproject(this.camera);

      //在视点坐标系中形成射线,射线的起点向量是照相机， 射线的方向向量是照相机到点击的点，这个向量应该归一标准化。
      /* let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      let intersects = raycaster.intersectObjects(this.scene.children,true);
      if (intersects.length > 0) {
        let list = intersects.filter(item => {
          item.object.parent.name ? console.log(item.object.parent.name, '是当前选中块') : ''
          return item.object.parent.name
        })
        if(list.length === 2) {
          let lX = Math.pow((list[0].point.x - list[1].point.x), 2)
          let lY = Math.pow((list[0].point.x - list[1].point.x), 2)
          let lZ = Math.pow((list[0].point.x - list[1].point.x), 2)
          let changeLength = Math.sqrt(lX + lY + lZ)
          this.renderCard(
            [
              `地块编号: ${list[0].object.parent.name}`,
              `地形变化: ${changeLength}`,
            ],
            [list[0].point.x, list[0].point.y, list[0].point.z],
            [list[0].point.x + 6, list[0].point.y + 10, list[0].point.z],
          )
        }
      } */
      let raycaster = new THREE.Raycaster();
      raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
      let intersects = raycaster.intersectObjects(this.modelsGroup.children, true);
      if (intersects.length > 0) {
        /* let list = intersects.filter(item => {
          console.log(item.object.parent)
          item.object.parent.name ? console.log(item.object.parent.name, '是当前选中块') : ''
          return item.object.parent.name
        })
        // 当穿透两层地图时，直接测出两点距离
        if(list.length === 2) {
          this.measureDataStart.x = list[0].point.x
          this.measureDataStart.y = list[0].point.y
          this.measureDataStart.z = list[0].point.z
          this.measureDataEnd.x = list[1].point.x
          this.measureDataEnd.y = list[1].point.y
          this.measureDataEnd.z = list[1].point.z
        }
        // 当穿透一层地图时，检查是否已标记
        if(list.length === 1) {
          if (this.measuredFlag) {
            // 已标记则记为终点
            this.measureDataStart.x = list[1].point.x
            this.measureDataStart.y = list[1].point.y
            this.measureDataStart.z = list[1].point.z
          } else {
            // 未标记则记为起始点
            this.measureDataStart.x = list[0].point.x
            this.measureDataStart.y = list[0].point.y
            this.measureDataStart.z = list[0].point.z

            const geometry = new THREE.SphereGeometry( 1, 8, 8 );
            const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
            const sphere = new THREE.Mesh( geometry, material );
            sphere.position.set(list[0].point.x, list[0].point.y, list[0].point.z)
            this.markGroup.add( sphere );
          }
        } */
        console.log(intersects[0].object.parent.parent)
        console.log(intersects[0].object.parent.parent.name)
        if (intersects[0].object.parent.parent.name === '环形防喷器') {

        }
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
  //background-color: #000
  background-image: linear-gradient(to right bottom, #76e4f8, #7369ec)
}
canvas {
  display block
}
</style>
