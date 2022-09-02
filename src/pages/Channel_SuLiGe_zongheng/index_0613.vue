<template>
  <div class="channel" ref="channel">
    <div class="chart" :style="`left: ${toolsFlag ? '-820' : '20'}px;`">
      <e-chart id="chart" :option="options" style="height: 400px; width: 810px"></e-chart>
    </div>
    <div class="main-tool">
      <div>
        比例系数:&nbsp;&nbsp;&nbsp;{{2.73}}m(实测建筑物高度)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        {{2.73 / realToModelParam}}(模型中建筑物高度)
        = {{realToModelParam}}
      </div>
      <div class="btn-controller">
        <div class="transform-btn-group">
          <div class="btn" @click="changeTransformStyle(0)">切换旋转</div>
          <div class="btn" @click="changeTransformStyle(1)">切换移动</div>
          <div class="btn" @click="changeTransformStyle(2)">切换缩放</div>
          <div class="btn" @click="toggleClipMap">地形切割</div>
        </div>
        <div class="visible-control-group">
          <div class="btn" @click="group.visible = !group.visible">切换地形显隐</div>
          <div class="btn" @click="gpsTransform0607.visible = !gpsTransform0607.visible">切换管线显隐</div>
        </div>
      </div>
    </div>
    <div class="tools" :style="`right: ${toolsFlag ? '-340' : '20'}px;`">
      <div class="tools-inner">
        <div class="float-btn" @click="toolsFlag = !toolsFlag">
          {{ toolsFlag ? '<' : '>' }}
        </div>
        <!--<div class="start-point">
            起点定位：<br>
            <i class="x">{{measureDataStart.x}}</i><br>
            <i class="y">{{measureDataStart.y}}</i><br>
            <i class="z">{{measureDataStart.z}}</i>
          </div>
          <div class="end-point">
            终点定位：<br>
            <i class="x">{{measureDataEnd.x}}</i><br>
            <i class="y">{{measureDataEnd.y}}</i><br>
            <i class="z">{{measureDataEnd.z}}</i>
          </div>-->
        <div class="length">
          测点距离：{{measureLength}} <br>
          测点实际计算值：{{parseInt(measureLength * realToModelParam)}}
          <br>
          <span class="clear-measure" @click="clearMeasureMark">清除标记记录</span>
        </div>
        <div class="data-show-group">
          <div class="pipe" v-if="gpsGroup">
            管路组定位数据
            <div class="group">
              position: <br>
              x: <i class="x">{{gpsTransform0607.position.x}}</i>,<br>
              y: <i class="y">{{gpsTransform0607.position.y}}</i>,<br>
              z: <i class="z">{{gpsTransform0607.position.z}}</i>
            </div>
            <div class="group">
              rotation: <br>
              x: <i class="x">{{gpsTransform0607.rotation.x}}</i>,<br>
              y: <i class="y">{{gpsTransform0607.rotation.y}}</i>,<br>
              z: <i class="z">{{gpsTransform0607.rotation.z}}</i>
            </div>
            <div class="group">
              scale: <br>
              x: <i class="x">{{gpsTransform0607.scale.x}}</i>,<br>
              y: <i class="y">{{gpsTransform0607.scale.y}}</i>,<br>
              z: <i class="z">{{gpsTransform0607.scale.z}}</i>
            </div>
          </div>
        </div>
        <div>
          <div>放位点</div>
          <div class="marks">
            <div class="mark-item" v-for="(item, index) in markList">
              <i class="x">{{item.x.toFixed(5)}}</i>,
              <i class="y">{{item.y.toFixed(5)}}</i>,
              <i class="z">{{item.z.toFixed(5)}}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <canvas ref="cvs" width="w" height="h" @click="onDocumentMouseDown"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import * as echarts from 'echarts'
export default {
  name: 'Channel8WeiYuan',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      dragControls: null,
      transformControls: null,
      deg: 0,
      w: 0,
      h: 0,
      group: null,
      groupModel: null,
      boxes: null,
      mX: null,
      mY: null,
      flag: false,
      toolsFlag: false,
      bloomComposer: null,
      cubeGroup: null,
      baseGroup: null,
      gpsGroup: null,
      line0527Group: null,
      gps0527Group: null,
      gpsLocation0607: null,
      gpsTransform0607: null,
      measureDataStart: {
        x: 0,
        y: 0,
        z: 0
      },
      measureDataEnd: {
        x: 0,
        y: 0,
        z: 0
      },
      measuredFlag: false,
      clipFlag: false,
      markGroup: null,
      markList: [],
      options: {
        // 80FFA5, 37A2FF, FF3200
        color: ['rgb(128, 255, 165)', 'rgb(55, 162, 255)', 'rgb(255, 50, 0)'],
        // title: {
        //   text: 'Gradient Stacked Area Chart',
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          data: ['实际管线', '0.8m埋深线', '1.5m埋深线']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '16%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              color: '#fff',
              formatter: v => v + '测深点'
            },
            data: [
              1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#fff'
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
          },
          {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1]
          }
        ],
        series: [
          {
            name: '实际管线',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 1
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0,211,64)'
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)'
                }
              ])
            },
            // markArea: {
            //   data: [{
            //     x: "10%",
            //     y: "10%"
            //   }, {
            //     x: "30%",
            //     y: "30%"
            //   }]
            // },
            emphasis: {
              focus: 'series'
            },
            data: [
              -13.647469682151707,
              -11.616520829529,
              -10.847145189169503,
              -9.5842501659344,
              -10.29423205209271,
              -7.492474185381187,
              -7.421978146303316,
              -5.699891233132705,
              -5.619744028554157,
              0.2845417958790061,
              -0.4918194404311482,
              -2.4734090589822153,
              -2.363834048762741,
              -1.0296135984584598,
              -0.4453507094730119,
              0.8958918826273705,
              2.841970914108754,
              4.831290421572188,
              6.1447154348301,
              4.8931545607453035,
              7.9054132210012,
              14.648232055599822
            ]
          },
          {
            name: '1.5m埋深线',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 1
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              -13.637469682151709,
              -11.276520829529,
              -10.787145189169504,
              -9.494250165934398,
              -11.034232052092712,
              -8.422474185381189,
              -7.441978146303316,
              -6.219891233132705,
              -5.859744028554158,
              -0.4154582041209939,
              -0.9318194404311481,
              -2.853409058982215,
              -2.5538340487627407,
              -1.1196135984584599,
              -0.8853507094730118,
              0.7758918826273704,
              3.0019709141087545,
              5.1812904215721876,
              6.494715434830099,
              3.8631545607453037,
              7.1154132210012,
              14.468232055599822
            ]
          },
          {
            name: '0.8m埋深线',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 1
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.2,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 50, 0)'
                },
                {
                  offset: 1,
                  color: 'rgb(224, 62, 76)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              -12.937469682151708,
              -10.576520829529,
              -10.087145189169505,
              -8.794250165934399,
              -10.33423205209271,
              -7.722474185381189,
              -6.741978146303316,
              -5.519891233132705,
              -5.159744028554158,
              0.2845417958790061,
              -0.23181944043114813,
              -2.1534090589822155,
              -1.8538340487627407,
              -0.4196135984584599,
              -0.18535070947301183,
              1.4758918826273701,
              3.7019709141087542,
              5.881290421572188,
              7.1947154348300995,
              4.5631545607453035,
              7.8154132210012,
              15.168232055599821
            ]
          }
        ]
      }
    }
  },
  // watch: {
  //   mX(n) {
  //     console.log(n)
  //   },
  //   mY(n) {
  //     console.log(n)
  //   }
  // },
  computed: {
    measureLength: function () {
      let a = Math.pow(this.measureDataEnd.x - this.measureDataStart.x,2)
      let b = Math.pow(this.measureDataEnd.y - this.measureDataStart.y,2)
      let c = Math.pow(this.measureDataEnd.z - this.measureDataStart.z,2)
      return Math.sqrt(a + b + c)
    },
    realToModelParam: function () {
      return 2.73 / Math.sqrt(
        Math.pow(-196.71208 + 196.78134,2) +
        Math.pow(-4.27394 + 3.33942,2) +
        Math.pow(-76.49824 + 76.55519,2)
      )
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
    toggleClipMap() {
      this.clipFlag = !this.clipFlag
      // 对象可以被剪切
      this.renderer.localClippingEnabled = true
      const PlaneArr = [
        // 创建一个垂直x轴的平面，方向沿着x轴负方向，沿着x轴正方向平移20,
        // new THREE.Plane(new THREE.Vector3(1, 0, 0), 20),
        // 垂直y轴的平面
        // new THREE.Plane(new THREE.Vector3(0, -1, 0), 0),
        // 垂直z轴的平面
        new THREE.Plane(new THREE.Vector3(0.4, 0, -1), 40),
        new THREE.Plane(new THREE.Vector3(-0.4, 0, 1), 30)
      ];
      this.renderer.clippingPlanes = this.clipFlag ? PlaneArr : ''
    },
    //
    clearMeasureMark() {
      this.measuredFlag = false
      this.measureDataStart = {
        x: 0, y: 0, z: 0
      }
      this.measureDataEnd = {
        x: 0, y: 0, z: 0
      }
      this.scene.remove(this.markGroup)
      this.markGroup = new THREE.Group()
      this.scene.add(this.markGroup)
    },
    // 真实坐标转换
    calculateCoordinate(baseArr) {
      let resultArr = []
      baseArr.forEach(item => {
        // resultArr.push([(item[0] - 108.59) * 89000, item[1], (item[2] - 38.22) * 89000])
        resultArr.push([(item[0] - 4234927) , item[1]/ 2.90793 , (item[2] - 289160)])
      })
      return resultArr
    },
    /* 0527坐标换算
     * @method 坐标换算
     * @for 所属类名(无)
     * @param baseArr { Array } 原坐标数组 gps定位组数据
     * @param deepScaleParam { Number } 深度缩放参数 真实米数转模型缩放参数
     * @param scaleParam { Number } 原坐标数组 gps定位转模型缩放参数
     * @return { Array } 返回5月27日gps转模型数据
    */
    calculateCoordinate0527(baseArr, deepScaleParam, scaleParam) {
      let resultArr = []
      let firstPoint = baseArr[0]
      baseArr.forEach(item => {
        // resultArr.push([(item[0] - 108.59) * 89000, item[1], (item[2] - 38.22) * 89000])
        resultArr.push([(item[2] - firstPoint[2]) * scaleParam, -item[1] / deepScaleParam, (item[0] - firstPoint[0]) * scaleParam])
      })
      return resultArr
    },
    // 生成粗线体
    creatFatLine (points, color, lineWidth, hasJoint = false) {
      const geometry = new THREE.SphereGeometry( 0.3, 8, 8 );
      const material = new THREE.MeshBasicMaterial( { color } );
      const sphere = new THREE.Mesh( geometry, material );
      sphere.position.set(points[0][0], points[0][1], points[0][2])
      this.markGroup.add( sphere );
      const joint = new THREE.Group()
      if(hasJoint) {
        const geometryJoint = new THREE.SphereGeometry( 0.1, 8, 8 );
        const materialJoint = new THREE.MeshBasicMaterial( { color } );
        const sphereJoint = new THREE.Mesh( geometryJoint, materialJoint );
        points.forEach(item => {
          let clone = sphereJoint.clone()
          clone.position.set(item[0], item[1], item[2])
          joint.add( clone );
        })
      }

      const endGeometry = new THREE.SphereGeometry( 10, 8, 8 );
      const endSphere = new THREE.Mesh( endGeometry, material );
      endSphere.position.set(points[points.length-1][0], points[points.length-1][1], points[points.length-1][2])
      // this.markGroup.add( endSphere );
      let positions = [].concat.apply([], points)
      // console.log(positions)
      let fatLineGeo = new LineGeometry()
      fatLineGeo.setPositions(positions)
      let fatLineMaterial = new LineMaterial({
        linewidth: lineWidth,
        color
      })
      fatLineMaterial.resolution.set(window.innerWidth+100, window.innerHeight+100)
      let fatLine = new Line2(fatLineGeo,fatLineMaterial)
      fatLine.joint = joint
      return fatLine
    },
    init() {
      const canvas = this.$refs.cvs
      const aspect = this.w/this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 5000)
      this.camera.position.z = 100
      this.camera.position.x = -200
      this.camera.position.y = 100
      this.group = new THREE.Group()
      this.baseGroup = new THREE.Group()
      this.gpsGroup = new THREE.Group()
      this.markGroup = new THREE.Group()
      this.cubeGroup = new THREE.Group()
      this.line0527Group = new THREE.Group()
      this.gps0527Group = new THREE.Group()
      this.gpsLocation0607 = new THREE.Group()
      this.gpsTransform0607 = new THREE.Group()
      let pipeList = [
        [108.59173039, 0, 38.22155125],
        [108.59233119, 0, 38.22185487],
        [108.59366150, 0, 38.22230192],
        [108.59480932, 0, 38.22285845],
        [108.59599998, 0, 38.22341492],
        [108.59707257, 0, 38.22396289],
        [108.59789842, 0, 38.22440123],
        [108.59885293, 0, 38.22484796],
        [108.59971086, 0, 38.22529466],
        [108.60112636, 0, 38.22612899],
        [108.60264893, 0, 38.22732566],
        [108.60389263, 0, 38.22828627],
        [108.60532922, 0, 38.22934789],
        [108.60583307, 0, 38.22970173]
      ]
      let realStackList = [
        [-182.56024, -4.65689, -94.32869],
        [-164.94352, -3.04999, -79.38709],
        [-133.37884, -2.30638, -60.41350],
        [-100.28406, -0.51159, -41.56901],
        [-42.30869, 1.58786, -11.46054]

        /*
        [108.59238, 0.9, 38.22184], // 1# 埋深 0.9
        [108.59314, 2.0, 38.22207], // 2# 埋深 2.0
        [108.59426, 1.3, 38.22256], // 3# 埋深 1.3
        [108.59544, 1.0, 38.22312], // 4# 埋深 1.0
        [108.59757, 1.6, 38.22419]  // 5# 埋深 1.6
        */
      ]
      // 5月27日 gps点 模型上起点终点
      let realStack0527 = [
        [-169.76094, -4.17392, -82.99918],
        [-2.00138, 5.47786, 7.59669]
      ]
      // 6月7日 gps点添加中点
      let realStack0607 = [
        [-169.76094, -4.17392, -82.99918],
        [-98.93944, -0.42110, -40.64441],
        [-2.00138, 5.47786, 7.59669]
      ]
      // 6月13日 更新终点
      // -3.44321, 5.35573, 9.56562
      let realStack0613 = [
        [-169.76094, -4.17392, -82.99918],
        [-98.93944, -0.42110, -40.64441],
        [-2.00138, 5.47786, 7.59669]
      ]
      /* 0607 位移至原点
       * @method 坐标换算
       * @for 所属类名(无)
       * @param list { Array } 原坐标数组 gps定位组数据
       * @return { Array } 返回起点移至[0, 0, 0]
      */
      function due0607Gps(list) {
        let resList = []
        if(list.length > 0 && list[0][0]) {
          list.forEach((item, index) => {
            let arr = [item[0] - list[0][0], item[1] - list[0][1], item[2] - list[0][2]]
            resList.push(arr)
          })
        }
        return resList
      }

      let line0607_1 = this.creatFatLine(realStack0607.slice(0, 2), '#ffaa11', 1, true)
      let line0607_2 = this.creatFatLine(realStack0607.slice(1), '#ffaa11', 1, true)
      line0607_2.position.set(-realStack0607[1][0], -realStack0607[1][1], -realStack0607[1][2])

      this.gpsLocation0607.add(line0607_2)
      this.gpsLocation0607.add(line0607_2.joint)
      // 5月27日 gps数据 xy反了（吴秉聪原因）
      let realStackList0527 = [
        [289162, 1.51, 4234921],
        [289183, 1.84, 4234931],
        [289205, 1.56, 4234942],
        [289227, 1.59, 4234951],
        [289242, 0.76, 4234960],
        [289275, 0.57, 4234981],
        [289306, 1.48, 4234993],
        [289332, 0.98, 4235008],
        [289366, 1.26, 4235029],
        [289392, 0.8, 4235042], //坐标点有误
        [289415, 1.06, 4235059],
        [289439, 1.12, 4235071],
        [289458, 1.31, 4235083],
        [289482, 1.41, 4235098],
        [289503, 1.06, 4235110],
        [289529, 1.38, 4235124],
        [289554, 1.66, 4235140],
        [289573, 1.85, 4235156],
        [289590, 1.85, 4235165],
        [289611, 0.47, 4235178],
        [289630, 0.71, 4235193],
        [289677, 1.32, 4235214],
      ]
      // 5月27日 gps坐标转地形坐标 旋转处理后
      let realGpsToModel0527 = [
        [-169.76094, -4.17392, -82.99918],
        [
          -163.31508,
          -3.36202,
          -78.88162
        ],
        [
          -156.3426,
          -3.19373,
          -74.69078
        ],
        [
          -150.20543,
          -2.74912,
          -70.10571
        ],
        [
          -144.9487,
          -3.2787,
          -67.55294
        ],
        [
          -133.94238,
          -2.38055,
          -62.26008
        ],
        [
          -125.35116,
          -2.04337,
          -55.92165
        ],
        [
          -116.84591,
          -1.62311,
          -51.30064
        ],
        [
          -105.37557,
          -1.49926,
          -45.62893
        ],
        [
          -97.34833,
          0.37296,
          -40.82781
        ],
        [
          -88.78356,
          0.19539,
          -37.44783
        ],
        [
          -81.25376,
          -0.46542,
          -32.96733
        ],
        [
          -75.05233,
          -0.3624,
          -29.89041
        ],
        [
          -66.73906,
          0.13081,
          -25.77741
        ],
        [
          -59.71167,
          0.21137,
          -22.06776
        ],
        [
          -51.52769,
          0.78265,
          -17.33095
        ],
        [
          -42.95831,
          1.54817,
          -13.31584
        ],
        [
          -35.49052,
          2.29761,
          -10.7804
        ],
        [
          -30.14109,
          2.74928,
          -7.77133
        ],
        [
          -22.79149,
          1.84432,
          -4.20087
        ],
        [
          -15.66278,
          2.96273,
          -1.45429
        ],
        [
          -2.01796,
          5.49127,
          7.62279
        ]
      ]
      let realGpsList1_0607 = due0607Gps(realGpsToModel0527.slice(0, 10))
      let realGpsList2_0607 = due0607Gps(realGpsToModel0527.slice(10))
      let realGpsLine1_0607 = this.creatFatLine(realGpsList1_0607, '#ee4422')
      let realGpsLine2_0607 = this.creatFatLine(realGpsList2_0607, '#ee4422')
      realGpsLine1_0607.position.set(realStack0607[0][0], realStack0607[0][1], realStack0607[0][2])
      realGpsLine1_0607.rotation.set(-0.00879, -0.01173, -0.01500)
      realGpsLine1_0607.scale.set(0.98323, 0.98323, 0.98323)

      realGpsLine2_0607.position.set(realStack0607[1][0], realStack0607[1][1], realStack0607[1][2])
      realGpsLine2_0607.scale.set(1.10522, 1.10522, 1.10522)
      realGpsLine2_0607.rotation.set(0.01583, 0.01795, 0.00781)

      this.gpsTransform0607.add(realGpsLine1_0607)
      this.gpsTransform0607.add(realGpsLine2_0607)
      // 5月27日 各点埋深
      let deepList0527 = [
        1.51,
        1.84,
        1.56,
        1.59,
        0.76,
        0.57,
        1.48,
        0.98,
        1.26,
        0.8,
        1.06,
        1.12,
        1.31,
        1.41,
        1.06,
        1.38,
        1.66,
        1.85,
        1.85,
        0.47,
        0.71,
        1.32,
      ]
      let realStackList0518 = [
        [4234927, 1.6, 289160],
        [4234935, 2.5, 289182],
        [4234956, 1.0, 289216],
        [4234967, 0.4, 289251],
        [4234987, 0.6, 289275],
        [4235007, 2.0, 289306],
        [4235025, 1.4, 289332],
        [4235039, 1.4, 289365],
        [4235054, 0.7, 289393],
        [4235078, 0.5, 289431],
        [4235108, 1.4, 289468],
        [4235120, 0.8, 289501],
        [4235153, 2.2, 289550]
      ]
      let modelStackList0518 = [
        [-170.26793, -4.30611, -83.91616],
        [-165.73341, -3.19091, -79.29904],
        [-154.88394, -3.37124, -72.81463],
        [-144.0797,	-3.38196,	-66.29829],
        [-135.91064,-2.68779,	-61.69018],
        [-126.58984	,-2.13637, -56.20627],
        [-117.82139, -1.68822, -51.0878],
        [-106.93823, -1.72159, -44.96991],
        [-97.2435, -0.191, -39.142],
        [-84.93733,	-0.75843,	-33.30413],
        [-72.52429,	-0.19559,	-26.42734],
        [-60.74367,	0.25865, -20.31503],
        [-44.50827,	1.38538, -10.89269]
      ]
      let obj = {
        di: [],
        eight: [],
        fif: [],
        real: []
      }
      modelStackList0518.forEach(
        (item, i) => {
          obj.di.push(item[1] * 2.90793)
          obj.eight.push(item[1] * 2.90793 - 0.8)
          obj.fif.push(item[1] * 2.90793 - 1.5)
          obj.real.push(item[1] * 2.90793 - [-1.6, -2.5, -1.0, -0.4, -0.6, -2.0, -1.4, -1.4, -0.7, -0.5, -1.4, -0.8, -2.2][i])
        }
      )
      // ↑↑↑↑↑ 图表数据 ↑↑↑↑↑

      // console.log(obj)
      let lineList = this.calculateCoordinate(realStackList0518)
      lineList.map(item => item[1] = -item[1])
      // console.log(lineList)
      let realLine = this.creatFatLine(lineList, 0x00ff00, 2)
      // gps to model scale param
      let firstGpsMember = realStackList0518[0]
      let lastGpsMember = realStackList0518[lineList.length - 1]
      let realPipeLength = Math.sqrt(
        Math.pow(firstGpsMember[0] - lastGpsMember[0],2) +
        // Math.pow(firstGpsMember[1] - lastGpsMember[1],2) +
        Math.pow(firstGpsMember[2] - lastGpsMember[2],2)
      )
      realLine.name = '站测GPS连线'
      this.gpsGroup.name = 'GPS定位组'

      // ↓↓↓↓↓ 5月27日 地形结构图 （因吴秉聪提供横纵坐标问题，改写新结构）↓↓↓↓↓
      // 0527测绘组
      /* let line0527Len = {
        model: Math.sqrt(Math.pow(realStack0527[0][0] - realStack0527[1][0], 2) +
          Math.pow(realStack0527[0][2] - realStack0527[1][2], 2)),
        gps: Math.sqrt(Math.pow(realStackList0527[0][0] - realStackList0527[realStackList0527.length - 1][0], 2) +
          Math.pow(realStackList0527[0][2] - realStackList0527[realStackList0527.length - 1][2], 2))
      }
      let scale0527Param = line0527Len.model / line0527Len.gps
      let resRealLineList = this.calculateCoordinate0527(realStackList0527, this.realToModelParam, scale0527Param)
      let realLine0527 = this.creatFatLine(realStack0527, 0xaffffa, 1)
      let realGps0527 = this.creatFatLine(resRealLineList, 0xff00fa, 1, true)
      let gpsBaseLine = []
      gpsBaseLine.push([resRealLineList[0][0], 0, resRealLineList[0][2]])
      gpsBaseLine.push([resRealLineList[resRealLineList.length - 1][0], 0, resRealLineList[resRealLineList.length - 1][2]])
      let gpsBase0527 = this.creatFatLine(gpsBaseLine, 0xf0a0fa, 1)
      this.gps0527Group.add(gpsBase0527)
      let port = {
        model: [realStack0527[1][0] - realStack0527[0][0], realStack0527[1][1] - realStack0527[0][1], realStack0527[1][2] - realStack0527[0][2]],
        gps: resRealLineList[resRealLineList.length - 1]
      }
      let v1 = new THREE.Vector3(...port.model)
      let v2 = new THREE.Vector3(...port.gps)
      let gpsToModelAngle0527 = {
        x: Math.atan(
            port.model[2] / port.model[1]
          ) - Math.atan(
            port.gps[2] / port.gps[1]
          ),
        y: Math.atan(
            port.model[0] / port.model[2]
          ) - Math.atan(
            port.gps[0] / port.gps[2]
          ),
        z: Math.atan(
            port.model[1] / port.model[0]
          ) - Math.atan(
            port.gps[1] / port.gps[0]
          )
      }
      // 5月27日 gps放线转模型点位转角
      let angList = [-0.03908, 0.55784, 0.07105]
      realGps0527.rotation.set(angList[0], angList[1], angList[2])
      realLine0527.position.set(-realStack0527[0][0], -realStack0527[0][1], -realStack0527[0][2])
      realGps0527.position.set(realStack0527[0][0], realStack0527[0][1], realStack0527[0][2])
      this.line0527Group.add(realLine0527)
      this.gps0527Group.add(realGps0527)
      realGps0527.joint.rotation.set(...angList)
      // realLine0527.position.set(-realStack0527[0][0], -realStack0527[0][1], -realStack0527[0][2])
      realGps0527.joint.position.set(realStack0527[0][0], realStack0527[0][1], realStack0527[0][2])
      this.gps0527Group.add(realGps0527.joint) */
      // ↑↑↑↑↑ 5月27日 地形结构图（因吴秉聪提供横纵坐标问题，改写新结构） ↑↑↑↑↑

      // ↓↓↓↓↓ 5月27日 地形结构图 ↓↓↓↓↓
      let line0527 = this.creatFatLine(realGpsToModel0527, 0x0055ff, 2, true)
      let deepLineList0527 = deepList0527.map((item, index) => {
        return [
          realGpsToModel0527[index][0],
          // realGpsToModel0527[index][1] - item / 2.90793,
          realGpsToModel0527[index][1] - item / this.realToModelParam,
          realGpsToModel0527[index][2]
        ]
      })
      // 实际管线 80FFA5, 1.5m埋深线 37A2FF, 0.8m埋深线 FF3200
      // 0.8m埋深
      let deepList0527_0p8 = JSON.parse(JSON.stringify(realGpsToModel0527)).map(item => [item[0], item[1] - 0.8 / this.realToModelParam, item[2]])
      let deepLine0527_0p8 = this.creatFatLine(deepList0527_0p8, 0xFF3200, 2, true)
      // 1.5m埋深
      let deepList0527_1p5 = JSON.parse(JSON.stringify(realGpsToModel0527)).map(item => [item[0], item[1] - 1.5 / this.realToModelParam, item[2]])
      let deepLine0527_1p5 = this.creatFatLine(deepList0527_1p5, 0x37A2FF, 2, true)
      // 实际管线
      let deepLine0527 = this.creatFatLine(deepLineList0527, 0x80FFA5, 2, true)
      this.gps0527Group.add(line0527)
      this.gps0527Group.add(deepLine0527)
      this.gps0527Group.add(deepLine0527.joint)
      this.gps0527Group.add(deepLine0527_0p8)
      this.gps0527Group.add(deepLine0527_1p5)

      let offStandard = [
        [
          [-131.76931, -2.56810, -60.65967],
          [-145.20521, -3.52931, -67.67613]
        ],
        [
          [-24.55103, 1.78356, -5.05428],
          [-13.65820, 3.06384, -0.12304]
        ]
      ]
      offStandard.forEach(item => {
        let line = this.creatFatLine(item, 0xff4444, 6, true)
        this.gps0527Group.add(line)
        this.gps0527Group.add(line.joint)
      })

      // ↑↑↑↑↑ 5月27日 地形结构图 ↑↑↑↑↑

      let modelLine1 = this.creatFatLine(modelStackList0518, 0xff0000, 2)
      // modelLine1.visible = false
      let standardList = []
      modelStackList0518.forEach(item => standardList.push([item[0], item[1] - 0.8/2.90793, item[2]]))
      let standardLine =  this.creatFatLine(standardList, 0x00ff00, 2, true)
      let l2 = JSON.parse(JSON.stringify(modelStackList0518))
      let dueL2 = []
      l2.forEach((item, index) => {
        let y = realStackList0518[index][1] / 2.90793
        dueL2.push([item[0], item[1] - y, item[2]])
      })

      let firstModelMember = modelStackList0518[0]
      let lastModelMember = modelStackList0518[lineList.length - 1]
      const geoLineStart = new THREE.SphereGeometry( 4, 8, 8 );
      const geoLineStartSphere = new THREE.Mesh( geoLineStart, new THREE.MeshBasicMaterial( { color: 0xffffff } ))
      geoLineStartSphere.position.set(geoLineStart[0], geoLineStart[1], geoLineStart[2])
      this.markGroup.add(geoLineStartSphere)
      let modelPipeLength = Math.sqrt(
        Math.pow(firstModelMember[0] - lastModelMember[0],2) +
        // Math.pow(firstModelMember[1] - lastModelMember[1],2) +
        Math.pow(firstModelMember[2] - lastModelMember[2],2)
      )

      // gps线缩放参数
      let gtmScaleParam = realPipeLength / modelPipeLength
      let baseGpsLine = this.gpsGroup.clone(true)
      this.markGroup.add(baseGpsLine)
      this.gpsGroup.scale.set(1/gtmScaleParam, 1, 1/gtmScaleParam)
      // gps线位移
      this.gpsGroup.position.set(firstModelMember[0], firstModelMember[1], firstModelMember[2])
      // gps线旋转角
      // gtmAngle
      let gpsToModelAngle = {
        x: Math.atan(
          (firstModelMember[2]-lastModelMember[2])/(firstModelMember[1]-lastModelMember[1])) -
            Math.atan((firstGpsMember[2]-lastGpsMember[2])/(firstGpsMember[1]-lastGpsMember[1])
          ),
        y: Math.atan(
          (firstModelMember[0]-lastModelMember[0])/(firstModelMember[2]-lastModelMember[2])) -
            Math.atan((firstGpsMember[0]-lastGpsMember[0])/(firstGpsMember[2]-lastGpsMember[2])
          ),
        z: Math.atan(
          (firstModelMember[1]-lastModelMember[1])/(firstModelMember[0]-lastModelMember[0])) -
            Math.atan((firstGpsMember[1]-lastGpsMember[1])/(firstGpsMember[0]-lastGpsMember[0])
          )
      }
      this.gpsGroup.rotation.set(gpsToModelAngle.x, gpsToModelAngle.y, gpsToModelAngle.z)

      let modelLine2 = this.creatFatLine(dueL2, 0xff00ff, 1)
      modelLine1.name = '站测模型连线'
      modelLine2.name = '埋深模型连线'
      standardLine.name = '埋深合规线'

      // 埋深不足区段
      // -134.42986, -2.86456, -60.82382
      // -151.26470, -3.65085, -70.63101
      //
      // -80.73375, -0.82429, -30.98332
      // -98.65288, -0.69808, -39.98579

      let offSpec = [
        [
          [-151.26470, -3.65085, -70.63101],
          [-134.42986, -2.86456, -60.82382]
        ],
        [
          [-98.65288, -0.69808, -39.98579],
          [-80.73375, -0.82429, -30.98332]
        ],
      ]
      offSpec.forEach(item => {
        let g = new THREE.SphereGeometry( 2, 8, 8 );
        const s = new THREE.Mesh( g, new THREE.MeshBasicMaterial( { color: '#ffffff' } ) );
        s.position.set(item[0][0], item[0][1], item[0][2])
        let offLine = this.creatFatLine(item, '#ff0000', 6, true)
        let start = s.clone()
        start.position.set(firstModelMember[0], firstModelMember[1], firstModelMember[2])
        start.material = new THREE.MeshBasicMaterial( { color: '#ffffff' } )
        let end = s.clone()
        end.position.set(lastModelMember[0], lastModelMember[1], lastModelMember[2])
        end.material = new THREE.MeshBasicMaterial( { color: '#ff000f' } )
        // this.cubeGroup.add(s)
        // this.cubeGroup.add(start)
        // this.cubeGroup.add(end)
        this.cubeGroup.add(offLine)
        let angle = {
          x: Math.atan(
              (firstModelMember[2]-lastModelMember[2])/(firstModelMember[1]-lastModelMember[1])) -
            Math.atan((firstGpsMember[2]-lastGpsMember[2])/(firstGpsMember[1]-lastGpsMember[1])
            ),
          y: Math.atan(
              (firstModelMember[0]-lastModelMember[0])/(firstModelMember[2]-lastModelMember[2])) -
            Math.atan((firstGpsMember[0]-lastGpsMember[0])/(firstGpsMember[2]-lastGpsMember[2])
            ),
          z: Math.atan(
              (firstModelMember[1]-lastModelMember[1])/(firstModelMember[0]-lastModelMember[0])) -
            Math.atan((firstGpsMember[1]-lastGpsMember[1])/(firstGpsMember[0]-lastGpsMember[0])
            )
        }
        // this.cubeGroup.rotation.set(-angle.x, -angle.y, -angle.z)
        // this.cubeGroup.scale.set(gtmScaleParam, 1, gtmScaleParam)
        // this.cubeGroup.position.set(328.79711, -55.32253, 484.70478)
      })

      // this.baseGroup.add(modelLine1)
      // this.baseGroup.add(modelLine2)
      // this.baseGroup.add(standardLine)
      // 地表分段后（400m）
      // this.scene.add(this.gpsLocation0607)
      this.gpsTransform0607.position.y += 1
      this.scene.add(this.gpsTransform0607)
      this.scene.add(this.baseGroup)
      this.scene.add(this.gpsGroup)
      this.scene.add(this.markGroup)
      // this.scene.add(this.cubeGroup)
      // this.scene.add(this.line0527Group)
      this.scene.add(this.gps0527Group)
      this.gpsGroup.visible = false

      // this.group.add(mesh)
      // const fbxLoader = new FBXLoader()
      const fbxLoader = new FBXLoader()
      let list = [
        'Tile_+000_+000',
        'Tile_+000_+001',
        // 'Tile_+000_+002',
        // 'Tile_+000_+003',
        'Tile_+001_+000',
        'Tile_+001_+001',
        'Tile_+001_+002',
        // 'Tile_+001_+003',
        'Tile_+002_+001',
        'Tile_+002_+002',
        // 'Tile_+002_+003',
        'Tile_+003_+001',
        'Tile_+003_+002',
        'Tile_+003_+003',
        'Tile_+004_+001',
        'Tile_+004_+002',
        'Tile_+004_+003',
        // 'Tile_+005_+002',
        // 'Tile_+005_+003'
      ]
      // 模型
      list.forEach((item, index) => {
        // console.log(item)
        let url = `./models/sulige_0428/${item}/${item}.fbx`
        fbxLoader.load(url, obj => {
          obj.position.z -= 1220
          obj.name = item
          this.group.add(obj)
        })
      })
      /* let zonghengBase = [
        "Tile_+000_+003",
        "Tile_+000_+004",
        "Tile_+000_+005",
        "Tile_+000_+006",
        // "Tile_+000_+007",
        "Tile_+001_+002",
        "Tile_+001_+003",
        "Tile_+001_+004",
        "Tile_+001_+005",
        "Tile_+001_+006",
        // "Tile_+001_+007",
        "Tile_+002_+002",
        "Tile_+002_+003",
        "Tile_+002_+004",
        "Tile_+002_+005",
        "Tile_+002_+006",
        "Tile_+002_+007",
        // "Tile_+003_+001",
        // "Tile_+003_+002",
        // "Tile_+003_+003",
        // "Tile_+003_+004",
        // "Tile_+003_+005",
        // "Tile_+003_+006",
        // "Tile_+003_+007",
        // "Tile_+004_+001",
        // "Tile_+004_+002",
        // "Tile_+004_+003",
        // "Tile_+004_+004",
        // "Tile_+004_+005",
        // "Tile_+004_+006",
        // "Tile_+005_+000",
        // "Tile_+005_+001",
        // "Tile_+005_+002",
        // "Tile_+005_+003",
        // "Tile_+005_+004",
        // "Tile_+005_+005",
        // "Tile_+006_+000",
        // "Tile_+006_+001",
        // "Tile_+006_+002",
        // "Tile_+006_+003",
        // "Tile_+006_+004",
        // "Tile_+006_+005",
        // "Tile_+007_+000",
        // "Tile_+007_+001",
        // "Tile_+007_+002",
        // "Tile_+007_+003",
        // "Tile_+007_+004",
        // "Tile_+008_+000",
        // "Tile_+008_+001",
        // "Tile_+008_+002",
        // "Tile_+008_+003",
        // "Tile_+008_+004",
        // "Tile_+009_+000",
        // "Tile_+009_+001",
        // "Tile_+009_+002",
        // "Tile_+009_+003",
        // "Tile_+009_+004",
        // "Tile_+010_+000",
        // "Tile_+010_+001",
        // "Tile_+010_+002",
        // "Tile_+010_+003",
        // "Tile_+011_+000",
        // "Tile_+011_+001",
        // "Tile_+011_+002",
        // "Tile_+011_+003"
      ]
      zonghengBase.forEach((item, index) => {
        // console.log(item)
        let url = `./models/sulige_0304/${item}/${item}.fbx`
        fbxLoader.load(url, obj => {
          // obj.position.z -= 1270
          obj.name = item
          this.baseGroup.add(obj)
        })
      }) */
      // this.group.position.y = this.groupController.position.y = 45
      // this.baseGroup.rotation.x = -Math.PI / 2
      this.group.position.set(-95.40945, -14.64555, -41.72357)
      this.group.rotation.set(-1.58453, -0.03961, -1.04771)
      this.group.scale.set(0.32344, 0.32344, 0.32344)
      // this.group.position.y = this.baseGroup.position.y = -1200

      this.scene.add(this.group)
      // this.scene.add(this.baseGroup)
      // this.scene.add(this.groupController)
      const _ambient = new THREE.AmbientLight(0xffffff);
      this.scene.add(_ambient);

      const axesHelper = new THREE.AxesHelper( 20 );
      this.scene.add(axesHelper)
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })

      // 切面辅助
      // const helper = new THREE.PlaneHelper(PlaneArr[0], 300, 0xffff00);
      // this.scene.add(helper);

      this.renderer.setSize(this.w, this.h)
      // 炫光特效关键代码 ***
      this.renderer.autoClear = false

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      // 控制阻尼
      // this.controls.enableDamping = true
      // 自动观看旋转
      // this.controls.autoRotate = true
      this.addBloomPass()

      /* ↓↓↓↓ 模型变换功能 ↓↓↓↓ */
      // 变换控件
      this.transformControls = new TransformControls(this.camera, this.renderer.domElement)
      // 拖动控制
      // this.dragControls = new DragControls( [this.baseGroup], this.camera, this.renderer.domElement );
      // this.dragControls.transformGroup = true
      this.transformControls.transformGroup = true
      this.transformControls.addEventListener( 'change', () => {
        this.renderer.render(this.scene, this.camera)
      } );
      this.controls.addEventListener( 'change', () => {
        this.renderer.render(this.scene, this.camera)
      } );
      this.transformControls.addEventListener( 'dragging-changed',  ( event ) => {
        this.controls.enabled = ! event.value;
      } );
      this.transformControls.attach( this.gps0527Group );
      // 变换控制
      this.scene.add(this.transformControls)
      /* ↑↑↑↑ 模型变换功能 ↑↑↑↑ */
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
      this.bloomComposer.setSize(this.w, this.h);
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.bloomComposer.addPass(effectCopy);
    },
    onDocumentMouseDown(e) {
      e.preventDefault();
      if (e.ctrlKey && e.button === 0) {
        //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
        this.mX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
        // let intersects = raycaster.intersectObjects(this.group.children,true); // 标记地形
        let intersects = raycaster.intersectObjects(this.group.children,true); // 标记线
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
          console.log(intersects[0].point)
          this.markList.unshift(intersects[0].point)
          const { point } = intersects[0]
          const geometry = new THREE.SphereGeometry( 0.2, 8, 8 );
          const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
          const sphere = new THREE.Mesh( geometry, material );
          sphere.position.set(point.x, point.y, point.z)
          this.baseGroup.add( sphere );
        }
      }
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
    },
    // 切换变换模式
    changeTransformStyle(v) {
      switch (v) {
        case 0: this.transformControls.setMode('rotate'); break;
        case 1: this.transformControls.setMode('translate'); break;
        case 2: this.transformControls.setMode('scale'); break;
      }
    },
    // 显示标注框
    renderCard(textList, cardPos, targetPos) {
      // 添加标注连线
      let lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
      })

      let points = []
      points.push(
        new THREE.Vector3(...cardPos),
        new THREE.Vector3(...targetPos)
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
        console.log(item)
        markCtx.fillText(item, markCanvas.width / 2, 56 * index + 40)
      })
      /* 3、将canvas作为纹理，创建Sprite */
      let markTexture = new THREE.Texture(markCanvas)
      markTexture.needsUpdate = true
      // var texture = new THREE.TextureLoader().load("sprite.png")
      // 创建精灵材质对象SpriteMaterial
      const spriteMaterial = new THREE.SpriteMaterial({
        // color:0xffffff, // 设置精灵矩形区域颜色
        // rotation:Math.PI/4, // 旋转精灵对象45度，弧度值
        transparent: true,
        map: markTexture// 设置精灵纹理贴图
      })
      // 创建精灵模型对象，不需要几何体geometry参数
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.position.set(...cardPos)
      sprite.position.y += textList.length * 2
      sprite.scale.set(2, 2 * (markCanvas.height / markCanvas.width), 2)
      sprite.renderOrder = 4
      let group = new THREE.Group()
      group.add(line)
      group.add(sprite)
      return group
    },
  }
}
</script>

<style lang="stylus" scoped>
.channel {
  display block
  width: 100%
  height: 100%
  position: relative
  overflow hidden
  background-color: #fff
  // #000428, #004e92
  background-image: linear-gradient(to right bottom, #5ac5da, #0D015B)
  .main-tool {
    position absolute
    top: 20px
    left: 20px
    background-color: rgba(220, 220, 220, 0.4)
    padding: 20px
    box-shadow 2px 2px 4px rgba(51, 51, 51, 0.6)
    color #fff
    .btn-controller {
      display flex
      padding-top: 6px
      .btn {
        -webkit-border-radius: 4px
        -moz-border-radius: 4px
        border-radius: 4px
        background-color: rgba(106, 106, 249, 0.69)
        margin-right: 6px
        transition background-color ease-in-out 0.3s
        &:hover {
          background-color: #409EFF
          text-shadow 1px 1px 2px #023bb2
        }
      }
      .transform-btn-group {
        display flex
        .btn {
          padding 4px 10px
          width 65px
          cursor pointer
        }
      }
      .visible-control-group {
        display flex
        .btn {
          padding 4px 10px
          width 100px
          cursor pointer
        }
      }
    }
  }
  .tools {
    line-height: 28px
    position absolute
    top: 20px
    right: 20px
    width: 300px
    color #fff
    padding: 20px
    background-color: rgba(220, 220, 220, 0.4)
    box-shadow 2px 2px 4px #333333
    transition: right ease-in-out 0.4s;
    .tools-inner {
      position relative
    }
    .float-btn {
      position absolute
      left: -44px
      top: calc(50% - 30px)
      transform scaleY(1.8)
      cursor pointer
      -webkit-border-radius: 4px 0 0 4px
      -moz-border-radius: 4px 0 0 4px
      border-radius: 4px 0 0 4px
      padding: 4px;
      color rgba(255, 255, 255, 0.6)
      background-color: rgba(255, 255, 255, 0.4)
    }
    i {
      font-style normal
      text-shadow 0 0 3px rgba(255, 255, 255, 0.6), 1px 1px 1px #000
      &.x {
        color red
      }
      &.y {
        color greenyellow
      }
      &.z {
        color #6969ff
      }
    }
    .data-show-group {
      padding-top:20px
      .pipe {
        .group {

        }
      }
    }
    .length {
      .clear-measure {
        background-color: #222
        -webkit-border-radius: 4px
        -moz-border-radius: 4px
        border-radius: 4px
        padding: 4px 8px
      }
    }
  }
  canvas {
    display block
  }
  .float {
    position: absolute
    opacity: 0
    z-index 100
    color #a6c1ff
    background-color: #000
    border: 1px solid #023bb2
    -webkit-border-radius: 6px
    -moz-border-radius: 6px
    border-radius: 6px
    padding: 20px
  }
  .mark-group {
    position: absolute
    z-index 200
    top: 20px
    right: 20px
    background-color: rgba(255,255,255,0.4)
    .row {
      span {
        display: inline-block
        width 100px
        cursor pointer
      }
    }
  }
  .marks {
    height: 364px;
    display: flex;
    flex-direction column;
    overflow-y: scroll;
    .mark-item {
      //flex: 1
    }
  }
  .chart {
    position absolute
    bottom: 20px
    left: 20px
    transition left ease-in-out 0.4s
    //background-color: rgba(220, 220, 220, 0.4)
  }
}
</style>
