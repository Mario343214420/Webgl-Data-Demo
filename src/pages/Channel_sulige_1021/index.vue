<template>
  <div class="channel" ref="channel">
    <div class="chart" :style="`left: ${toolsFlag ? '-820' : '20'}px;`">
      <e-chart id="chart" :option="options" style="height: 400px; width: 810px"></e-chart>
      <div class="pip-deep-list">
        <div v-for="(item, index) in pipeDeepList" :key="index">
          <i>经度{{parseInt(item[2]) + 4230796}}， </i>
          <i>纬度{{parseInt(item[0]) + 288258}}， </i>
          <i :style="item[1] * 1.041 < 2.2 ? 'color: #ff0000' : ''" :title="item[1] * 1.041 < 2.2 ? '埋深不足2.2' : ''">深度{{(item[1] * 1.041 ).toFixed(2)}}</i>
        </div>
      </div>
    </div>
    <div class="coordinate">
      GPS坐标&nbsp;&nbsp;&nbsp;x:{{parseInt(coordinate.x) + parseInt('289162')}}, y:{{parseInt(coordinate.y) + parseInt('4234921')}}
    </div>
    <div class="main-tool">
      <div>
        比例系数:&nbsp;&nbsp;&nbsp;{{ k }}m  =  (实测建筑物高度)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;(模型中建筑物高度)
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
          <div class="btn" @click="compareGroup.visible = !compareGroup.visible">切换对比地形显隐</div>
          <div class="btn" @click="markGroup.visible = !markGroup.visible">切换标记点显隐</div>
          <div class="btn" @click="pipeListGroup.visible = !pipeListGroup.visible">切换管线显隐</div>
          <div class="btn" @click="finalLinesGroup.visible = !finalLinesGroup.visible">切换GPS路线显隐</div>
          <div class="btn" @click="verticalGroup.visible = !verticalGroup.visible">切换垂直投影显隐</div>
          <div class="btn" @click="markPointSize++">+</div>
          {{markPointSize}}
          <div class="btn" @click="markPointSize--">-</div>
          <!--          <div class="btn" @click="baseGroup.visible = !baseGroup.visible">切换基础显隐</div>-->
          <!--          <div class="btn" @click="gpsTransform0607.visible = !gpsTransform0607.visible">切换管线显隐</div>-->
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
          测点距离：{{0}} <br>
          测点实际计算值：{{0}}
          <br>
          <span class="clear-measure" @click="clearMeasureMark">清除标记记录</span>
        </div>
        <div class="data-show-group">
          <div class="pipe" v-if="baseGroup">
            管路组定位数据
            <div class="group">
              position: <br>
              x: <i class="x">{{group.position.x}}</i>,<br>
              y: <i class="y">{{group.position.y}}</i>,<br>
              z: <i class="z">{{group.position.z}}</i>
            </div>
            <div class="group">
              rotation: <br>
              x: <i class="x">{{group.rotation.x}}</i>,<br>
              y: <i class="y">{{group.rotation.y}}</i>,<br>
              z: <i class="z">{{group.rotation.z}}</i>
            </div>
            <div class="group">
              scale: <br>
              x: <i class="x">{{group.scale.x}}</i>,<br>
              y: <i class="y">{{group.scale.y}}</i>,<br>
              z: <i class="z">{{group.scale.z}}</i>
            </div>
          </div>
        </div>
        <div>
          <span @click="queryPipeRotPos">查看模拟管线状态</span><br>
          <span @click="queryComparePos">查看染绿对比层状态</span><br>
          <span @click="queryTransfer">查看控制器</span>
        </div>
        <div>
          <div>放位点</div>
          <div class="marks">
            <div class="mark-item" v-for="(item, index) in markList" :key="index">
              <i class="x">{{item.x.toFixed(3)}}</i>,
              <i class="y">{{item.y.toFixed(3)}}</i>,
              <i class="z">{{item.z.toFixed(3)}}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <canvas ref="cvs" width="w" height="h" @click="onDocumentMouseDown"></canvas>
    <div class="calculate-card-1" v-show="calculateCardFlag1">
      <div>沿线1号 坑位</div>
      <div>
        <span>地形变化：</span>
        <span>{{-(Math.sqrt(
          Math.pow(-134.98041 + 135.00758, 2) +
          Math.pow(-2.55852 + 2.67598, 2) +
          Math.pow(-61.06051 +61.11322, 2)
        ) * 2.90793).toFixed(5)}}米</span>
      </div>
      <!-- -134.33118, -2.41191, -62.44864
      -134.33685, -2.68791, -62.44947 -->
      <div>
        <span>原管线埋深：</span>
        <span>{{(Math.sqrt(
          Math.pow(-134.33118 + 134.33685, 2) +
          Math.pow(-2.41191 + 2.68791, 2) +
          Math.pow(-62.44864 + 62.44947, 2)
        ) * 2.90793 + 0.3).toFixed(5)}}米</span>
      </div>
      <div>
        <span>变化后管线埋深：</span>
        <span>{{(Math.sqrt(
          Math.pow(-134.33118 + 134.33685, 2) +
          Math.pow(-2.41191 + 2.68791, 2) +
          Math.pow(-62.44864 + 62.44947, 2)
        ) * 2.90793 - Math.sqrt(
          Math.pow(-134.98041 + 135.00758, 2) +
          Math.pow(-2.55852 + 2.67598, 2) +
          Math.pow(-61.06051 +61.11322, 2)
        ) * 2.90793 + 0.3).toFixed(5)}}米</span>
      </div>
    </div>
    <div class="calculate-card-2" v-show="calculateCardFlag2">
      <div>沿线2号 坑位</div>
      <div>
        <!---85.24467, -0.91612, -33.13839-->
        <!---85.23145, -0.83905, -33.08953-->
        <span>地形变化：</span>
        <span>{{-(Math.sqrt(
          Math.pow(-85.24467 + 85.23145, 2) +
          Math.pow(-0.91612 + 0.83905, 2) +
          Math.pow(-33.13839 + 33.08953, 2)
        ) * 2.90793).toFixed(5)}}米</span>
      </div>
      <div>
        <!-- -84.22593, -0.20486, -34.73554
        -84.22548, -0.58158, -34.73569 -->
        <span>原管线埋深：</span>
        <span>{{(Math.sqrt(
          Math.pow(-84.22593 + 84.22548, 2) +
          Math.pow(-0.20486 + 0.58158, 2) +
          Math.pow(-34.73554 + 34.73569, 2)
        ) * 2.90793 - 0.2).toFixed(5)}}米</span>
      </div>
      <div>
        <!-- -84.53355, -0.17773, -34.91875 -->
        <!-- -84.57289, -0.54871, -34.94436 -->
        <span>变化后管线埋深：</span>
        <span>{{(Math.sqrt(
          Math.pow(-84.22593 + 84.22548, 2) +
          Math.pow(-0.20486 + 0.58158, 2) +
          Math.pow(-34.73554 + 34.73569, 2)
        ) * 2.90793 - Math.sqrt(
          Math.pow(-85.24467 + 85.23145, 2) +
          Math.pow(-0.91612 + 0.83905, 2) +
          Math.pow(-33.13839 + 33.08953, 2)
        ) * 2.90793 - 0.2).toFixed(5)}}米</span>
      </div>
    </div>
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
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
export default {
  name: 'Channel8WeiYuan',
  data() {
    return {
      markPointSize: 10,
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
      toolsFlag: true,
      bloomComposer: null,
      cubeGroup: null,
      baseGroup: null,
      pipeListGroup: null,
      compareGroup: null,
      pipeJointGroup: null,
      markGroup: null,
      // 地表标记点位置
      markPointGroup: null,
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
      calculateCardFlag1: false,
      calculateCardFlag2: false,
      gpsRealGroup: null,
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
      },
      coordinate: {
        x: 0, y: 0
      },
      // 最终对准定位点后的线组
      finalLinesGroup: null,
      verticalGroup: null,
      pipeDeepList: []
    }
  },
  computed: {
    k: function () {
      let list = [
        {
          label: '1号建筑',
          realLength: {
            l: 25.8,
            w: 14,
            h: 5
          },
          lt: [241.64832, 17.77011, -279.09458],
          rt: [242.75425, 17.28109, -265.65717],
          rb: [242.73711, 12.35920, -265.74950],
          lb: [241.42097, 12.84732, -279.47116]
        },
        {
          label: '2号建筑',
          realLength: {
            l: 8.33,
            w: 5.07,
            h: 5
          },
          rt: [264.53304, 17.20819, -255.60393],
          rb: [264.39420, 12.52602, -255.69377],
          lt: [264.18606, 17.38703, -263.24567]
        },
        {
          label: '3号建筑',
          realLength: {
            l: 5.05,
            w: 4.08,
            h: 3.2
          },
          rt: [264.65109, 15.11086, -251.88596],
          rb: [264.46159, 11.99097, -252.06597]
        },
      ]
      function cal3dLength(p1, p2) {
        return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2))
      }
      let p11 = list[0].realLength.h / cal3dLength(list[0].lt, list[0].lb)
      let p12 = list[0].realLength.h /cal3dLength(list[0].rt, list[0].rb)
      // let p13 = cal3dLength(list[0].lt, list[0].rt) / list[0].realLength.w
      let p14 = list[0].realLength.w /cal3dLength(list[0].lb, list[0].rb)
      let p1 = (p11 + p12 + p14) / 3
      // let p21 = list[1].realLength.w / cal3dLength(list[1].lt, list[1].rt)
      let p22 = list[1].realLength.h / cal3dLength(list[1].rt, list[1].rb)
      let p3 = list[0].realLength.h / cal3dLength(list[2].rt, list[2].rb)
      // console.log(p3)
      return ((p1 + p22) / 2).toFixed(3)
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
    // 计算三位点距离
    cal3dLength(p1, p2) {
      return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2))
    },
    // 线条拟合，将第二条线按第一条线 比例缩放后，起点终点重叠
    suitLine(line1Start, line1End, line2Start, line2End) {
      let line1Length = this.cal3dLength(line1Start, line1End)
      let line2Length = this.cal3dLength(line2Start, line2End)
      let scale = line1Length / line2Length
      // 两线移至0，0，0计算夹角(即获取向量)
      // let v1 =
      // let v2 =
      // console.log('font1', v1)
      // console.log('font2', v2)
      // console.log('ang1', v1.angleTo(v2))
      // console.log('ang2', v2.angleTo(v1))
      // let ang = {
      //   x: Math.atan(
      //       (line2Start[2]-line2End[2])/(line1Start[1]-line1Start[1])) -
      //     Math.atan((firstGpsMember[2]-lastGpsMember[2])/(firstGpsMember[1]-lastGpsMember[1])
      //     ),
      //   y: Math.atan(
      //       (firstModelMember[0]-lastModelMember[0])/(firstModelMember[2]-lastModelMember[2])) -
      //     Math.atan((firstGpsMember[0]-lastGpsMember[0])/(firstGpsMember[2]-lastGpsMember[2])
      //     ),
      //   z: Math.atan(
      //       (firstModelMember[1]-lastModelMember[1])/(firstModelMember[0]-lastModelMember[0])) -
      //     Math.atan((firstGpsMember[1]-lastGpsMember[1])/(firstGpsMember[0]-lastGpsMember[0])
      //     )
      // }
      // let tLineParam = this.suitLine([0,0,0], [0, 200, 300], [0, 0, 0], [0, 0, 200])
      // let tlm1 = this.creatFatLine([line1Start, line1End], 0xff0000, 4)
      // let tlm2 = this.creatFatLine([line2Start, line2End], 0x00ff00, 4)
      let cross = new THREE.Vector3(line1End[0] - line1Start[0], line1End[1] - line1Start[1], line1End[2] - line1Start[2]).cross(new THREE.Vector3(line2End[0] - line2Start[0], line2End[1] - line2Start[1], line2End[2] - line2Start[2]))
      let ang = new THREE.Vector3(line1End[0] - line1Start[0],line1End[1] - line1Start[1],line1End[2] - line1Start[2]).normalize().angleTo(new THREE.Vector3(line2End[0] - line2Start[0],line2End[1] - line2Start[1],line2End[2] - line2Start[2]).normalize())
      // let quaternion = new THREE.Quaternion().setFromAxisAngle(
      //   new THREE.Vector3(line1End[0] - line1Start[0],line1End[1] - line1Start[1],line1End[2] - line1Start[2]).normalize().cross(new THREE.Vector3(line2End[0] - line2Start[0],line2End[1] - line2Start[1],line2End[2] - line2Start[2]).normalize()),
      //   new THREE.Vector3(line1End[0] - line1Start[0],line1End[1] - line1Start[1],line1End[2] - line1Start[2]).normalize().angleTo(new THREE.Vector3(line2End[0] - line2Start[0],line2End[1] - line2Start[1],line2End[2] - line2Start[2]).normalize())
      // )
      // tlm1.applyQuaternion(quaternion)
      // return {
      //   scale,
      //   ang: v1.angleTo(v2),
      //   cross: v1.cross(v2).normalize()
      // }
      return {
        scale,
        ang,
        cross
      }
    },
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
        new THREE.Plane(new THREE.Vector3(1.2, 0, -3), 40),
        new THREE.Plane(new THREE.Vector3(-0.4, 0, 1), 30)
      ];
      this.renderer.clippingPlanes = this.clipFlag ? PlaneArr : ''
    },
    creatFatCurveLine(points) {
      // Create a sine-like wave
      // const curve = new THREE.SplineCurve( [
      //   new THREE.Vector2( -10, 0 ),
      //   new THREE.Vector2( -10, 5 ),
      //   new THREE.Vector2( 0, 0 ),
      //   new THREE.Vector2( 5, -5 ),
      //   new THREE.Vector2( 10, 0 )
      // ] );
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      const material = new THREE.LineBasicMaterial( { color: 0x6eff0f } );
      const splineObject = new THREE.Line( geometry, material );
      return splineObject
    },
    // 生成粗线体
    creatFatLine (points, color, lineWidth) {
      // const geometry = new THREE.SphereGeometry( this.markPointSize * 0.05, 8, 8 );
      const material = new THREE.MeshBasicMaterial( { color } );
      // const sphere = new THREE.Mesh( geometry, material );
      // sphere.position.set(points[0][0], points[0][1], points[0][2])
      // this.pipeListGroup.add( sphere );
      const endGeometry = new THREE.SphereGeometry( this.markPointSize * 0.05, 8, 8 );
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
      return fatLine
    },
    renderPartPoint(pos) {
      let group = new THREE.Group()
      const geometryJoint = new THREE.SphereGeometry( this.markPointSize * 0.05, 8, 8 );
      const materialJoint = new THREE.MeshBasicMaterial( { color: 0xcc22cc } );
      const sphereJoint = new THREE.Mesh( geometryJoint, materialJoint );
      pos.forEach((item, index) => {
        let clone = sphereJoint.clone()
        clone.position.set(item[0], item[1], item[2])
        group.add( clone );
      })
      return group
    },
    init() {
      let baseGPSParam = [288258, 4230796]
      let pipeBaseRotation = [-1.5404, -0.0189, -1.0349]
      const canvas = this.$refs.cvs
      const aspect = this.w / this.h
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(50, aspect, 1, 5000)
      this.camera.position.z = 0
      this.camera.position.x = 0
      this.camera.position.y = 400
      this.camera.lookAt(new THREE.Vector3(0,-10, 0));
      this.group = new THREE.Group()
      this.markGroup = new THREE.Group()
      this.compareGroup = new THREE.Group()
      this.pipeJointGroup = new THREE.Group()
      this.verticalGroup = new THREE.Group()
      const fbxLoader = new FBXLoader()
      /* let list0829 = [
        [
          // "Tile_+000_+000",
          // "Tile_+000_+001",
          // "Tile_+000_+002",
          // "Tile_+000_+003",
          // "Tile_+000_+004",
          // "Tile_+000_+005",
          // "Tile_+000_+006",
          // "Tile_+000_+007",
          // "Tile_+000_+008",
          // "Tile_+000_+009",
          // "Tile_+000_+010",
          // "Tile_+000_+011",
          // "Tile_+000_+012",
          // "Tile_+000_+013",
          // "Tile_+000_+014",
          // "Tile_+000_+015",
          // "Tile_+000_+016",
          // "Tile_+000_+017",
          // "Tile_+000_+018",
          // "Tile_+000_+019",
          // "Tile_+000_+020",
          // "Tile_+000_+021",
          // "Tile_+000_+022",
          // "Tile_+000_+023",
          // "Tile_+000_+024",
          // "Tile_+000_+025"
        ],
        [
          // "Tile_+001_+000",
          // "Tile_+001_+001",
          // "Tile_+001_+002",
          // "Tile_+001_+003",
          // "Tile_+001_+004",
          // "Tile_+001_+005",
          // "Tile_+001_+006",
          // "Tile_+001_+007",
          // "Tile_+001_+008",
          // "Tile_+001_+009",
          // "Tile_+001_+010",
          // "Tile_+001_+011",
          // "Tile_+001_+012",
          // "Tile_+001_+013",
          // "Tile_+001_+014",
          // "Tile_+001_+015",
          // "Tile_+001_+016",
          "Tile_+001_+017",
          "Tile_+001_+018",
          // "Tile_+001_+019",
          // "Tile_+001_+020",
          // "Tile_+001_+021",
          // "Tile_+001_+022",
          // "Tile_+001_+023",
          "Tile_+001_+024",
          "Tile_+001_+025"
        ],
        [
          // "Tile_+002_+000",
          // "Tile_+002_+001",
          // "Tile_+002_+002",
          // "Tile_+002_+003",
          // "Tile_+002_+004",
          // "Tile_+002_+005",
          // "Tile_+002_+006",
          // "Tile_+002_+007",
          // "Tile_+002_+008",
          // "Tile_+002_+009",
          // "Tile_+002_+010",
          // "Tile_+002_+011",
          // "Tile_+002_+012",
          // "Tile_+002_+013",
          // "Tile_+002_+014",
          // "Tile_+002_+015",
          // "Tile_+002_+016",
          "Tile_+002_+017",
          "Tile_+002_+018",
          "Tile_+002_+019",
          "Tile_+002_+020",
          "Tile_+002_+021",
          "Tile_+002_+022",
          "Tile_+002_+023",
          "Tile_+002_+024",
          "Tile_+002_+025"
        ],
        [
          // "Tile_+003_+000",
          // "Tile_+003_+001",
          // "Tile_+003_+002",
          // "Tile_+003_+003",
          // "Tile_+003_+004",
          // "Tile_+003_+005",
          // "Tile_+003_+006",
          // "Tile_+003_+007",
          // "Tile_+003_+008",
          // "Tile_+003_+009",
          // "Tile_+003_+010",
          // "Tile_+003_+011",
          // "Tile_+003_+012",
          // "Tile_+003_+013",
          // "Tile_+003_+014",
          // "Tile_+003_+015",
          // "Tile_+003_+016",
          "Tile_+003_+017",
          "Tile_+003_+018",
          "Tile_+003_+019",
          "Tile_+003_+020",
          "Tile_+003_+021",
          "Tile_+003_+022",
          "Tile_+003_+023",
          "Tile_+003_+024",
          "Tile_+003_+025"
        ]
      ] */
      let list0829 = [
        [
          "Tile_+001_+000",
          "Tile_+001_+001",
          "Tile_+001_+002",
          "Tile_+001_+003",
          "Tile_+001_+004",
          "Tile_+001_+005",
          "Tile_+001_+006",
          "Tile_+001_+007",
          "Tile_+001_+008",
          "Tile_+001_+009",
          "Tile_+001_+010",
          "Tile_+001_+011",
          "Tile_+001_+012",
          "Tile_+001_+013",
          "Tile_+001_+014",
          "Tile_+001_+015",
          "Tile_+001_+016",
          "Tile_+001_+024",
          "Tile_+001_+025"
        ],
        [
          "Tile_+002_+009",
          "Tile_+002_+010",
          "Tile_+002_+011",
          "Tile_+002_+012",
          "Tile_+002_+013",
          "Tile_+002_+014",
          "Tile_+002_+015",
          "Tile_+002_+016",
          "Tile_+002_+017",
          "Tile_+002_+018",
          "Tile_+002_+019",
          "Tile_+002_+020",
          "Tile_+002_+021",
          "Tile_+002_+022",
          "Tile_+002_+023",
          "Tile_+002_+024",
          "Tile_+002_+025"
        ],
        [
          "Tile_+003_+012",
          "Tile_+003_+013",
          "Tile_+003_+014",
          "Tile_+003_+015",
          "Tile_+003_+016",
          "Tile_+003_+017",
          "Tile_+003_+021",
          "Tile_+003_+022"
        ]
      ]
      // let modelStep = [6, 25]
      let modelStep = [6, 25]
      // let simpleBaseUrl = './models/'
      let simpleBaseUrl = 'http://192.168.1.88:8000'
      // 载入所有模型
      let loadAllModel = arr => {
        arr.forEach((item, index) => {
          item.forEach((modelPath, i) => {
            if(i <= modelStep[1] && i >= modelStep[0]) {
              // renderPartArea(modelPath, simpleBaseUrl)
              let url = `${simpleBaseUrl}/0822_simple/${modelPath}/${modelPath}.fbx`
              fbxLoader.load(url, fbx => {
                const mesh = fbx.children[0].clone()
                mesh.name = modelPath
                mesh.position.z -= 1220
                this.compareGroup.add(mesh)
              })
            }
          })
        })
      }
      // 模型载入
      loadAllModel(list0829)

      // this.group.position.set(-1592.6661128974586, -111.68440598717643, 873.1284961341271)
      // this.group.position.set(-1396.13207, -102.06568, 666.00850)
      this.group.rotation.set(-1.53696, -0.01555, -1.06127)
      this.compareGroup.position.set(-1396.20616, -102.86670, 665.73779)
      // this.compareGroup.position.set(-1422.563, -105.142, 788.138)
      this.compareGroup.rotation.set(-1.53696, -0.01555, -1.06127)
      // this.group.scale.set(1.04412, 1.04412, 1.04412)
      // this.group.position.y = this.baseGroup.position.y = -1200

      this.pipeListGroup = new THREE.Group()

      // 地表点 模型映射
      let part0901point = [
        [0, 0, 0],
        [-199.408, -12.766, 169.34],
        [-447.876, -13.188, 290.186],
        [-713.221, -26.733, 396.292],
        [-996.535, -34.790, 469.574],
        [-1265.926, -44.337, 507.329],
        [-1507.818, -50.087, 634.891],
        [-1752.911, -57.106, 777.658],
        [-1993.776, -65.223, 932.528],
        [-2239.631, -80.536, 1076.947]
      ]
      this.markGroup = new THREE.Group()
      const geometryJoint = new THREE.SphereGeometry( this.markPointSize * 0.05, 8, 8 );
      const materialJoint = new THREE.MeshBasicMaterial( { color: 0x22cc22 } );
      const sphereJoint = new THREE.Mesh( geometryJoint, materialJoint );
      part0901point.forEach(item => {
        let clone = sphereJoint.clone()
        clone.position.set(...item)
        // this.markGroup.add(clone)
      })

      // 地表
      let landCrossPointList = [
        [0,0,0],
        [-25.357, -1.582, 19.579],
        [-47.742, -2.781, 32.654],
        [-72.629, -1.981, 48.745],
        [-90.458, -3.485, 57.915],
        [-113.574, -2.326, 70.413],
        [-139.225, -3.806, 85.790],
        [-157.744, -6.342, 104.735],
        [-172.434, -7.234, 126.816],
        [-180.030, -8.083, 144.719],
        [-199.414, -12.758, 169.293],
        [-223.564, -12.970, 176.554],
        [-247.610, -14.558, 186.900],
        [-276.343, -11.352, 199.092],
        [-303.575, -16.053, 215.016],
        [-327.071, -17.917, 220.886],
        [-345.735, -16.544, 236.720],
        [-383.480, -15.890, 253.459],
        [-397.990, -16.663, 263.348],
        [-425.603, -14.757, 278.265],
        [-447.961, -13.181, 290.189],
        [-478.031, -16.769, 301.197],
        [-505.853, -17.472, 308.705],
        [-535.686, -18.805, 316.647],
        [-561.840, -23.159, 322.574],
        [-599.364, -19.560, 332.295],
        [-628.600, -28.268, 347.192],
        [-657.252, -29.087, 364.949],
        [-687.866, -27.667, 378.077],
        [-713.263, -26.734, 396.274],
        [-744.188, -30.155, 402.363],
        [-773.962, -29.838, 403.187],
        [-800.674, -29.596, 406.377],
        [-825.695, -31.336, 418.753],
        [-852.654, -31.369, 426.892],
        [-877.450, -33.766, 433.192],
        [-906.358, -35.088, 439.298],
        [-941.543, -35.062, 449.153],
        [-963.320, -36.493, 455.550],
        [-996.601, -34.792, 469.588],
        [-1019.408, -34.773, 471.523],
        [-1043.671, -36.399, 475.110],
        [-1072.153, -38.037, 479.627],
        [-1100.893, -40.884, 492.085],
        [-1127.074, -40.596, 499.171],
        [-1151.612, -41.342, 503.747],
        [-1182.831, -42.437, 514.530],
        [-1204.609, -41.936, 516.823],
        [-1236.447, -37.465, 510.138],
        [-1265.844, -44.323, 507.315],
        [-1289.820, -42.509, 513.433],
        [-1315.072, -42.009, 525.829],
        [-1340.826, -43.263, 541.799],
        [-1365.694, -45.141, 552.782],
        [-1387.818, -47.142, 567.081],
        [-1414.934, -46.023, 580.308],
        [-1436.836, -48.819, 592.274],
        [-1467.767, -47.773, 609.556],
        [-1482.038, -50.322, 618.821],
        [-1507.844, -50.102, 634.847],
        [-1534.578, -50.734, 652.283],
        [-1556.655, -54.228, 665.881],
        [-1578.487, -53.556, 675.857],
        [-1604.787, -54.087, 691.882],
        [-1630.066, -54.028, 706.052],
        [-1651.826, -55.147, 718.200],
        [-1680.851, -54.640, 731.291],
        [-1705.962, -57.352, 747.527],
        [-1732.233, -60.264, 763.725],
        [-1752.967, -57.129, 777.726],
        [-1778.416, -59.940, 791.643],
        [-1801.622, -59.426, 805.291],
        [-1828.135, -59.634, 824.955],
        [-1849.799, -60.323, 841.080],
        [-1876.520, -57.450, 854.866],
        [-1899.468, -60.458, 870.806],
        [-1919.600, -63.447, 887.179],
        [-1951.543, -61.358, 904.365],
        [-1971.322, -64.387, 919.400],
        [-1993.877, -65.248, 932.580],
        [-2015.322, -66.349, 945.124],
        [-2042.104, -68.681, 961.982],
        [-2066.444, -69.774, 971.780],
        [-2092.919, -70.193, 989.504],
        [-2117.074, -71.089, 1001.382],
        [-2134.286, -74.459, 1017.320],
        [-2164.469, -75.494, 1030.516],
        [-2185.574, -74.947, 1047.479],
        [-2209.568, -77.167, 1061.588],
        [-2239.700, -80.538, 1076.949]
      ]
      let pipeList = [
        // [288187, 4231044, 1.5],
        // [288196, 4231016, 1.4],
        // [288206, 4230984, 1.6],
        // [288212, 4230959, 1.6],
        // [288221, 4230934, 1.5],
        // [288228, 4230904, 1.9],
        // [288239, 4230875, 2.4],
        // [288246, 4230851, 2.5],
        // [288250, 4230826, 2.2],
        [288258, 4230796, 2.2],
        [288265, 4230764, 1.6],
        [288274, 4230739, 1.7],
        [288283, 4230710, 2.0],
        [288291, 4230691, 2.3],
        [288301, 4230666, 1.8],
        [288311, 4230637, 1.6],
        [288313, 4230610, 2.4],
        [288310, 4230583, 1.2],
        [288304, 4230564, 1.6],
        [288303, 4230532, 1.5],
        [288305, 4230507, 2.1],
        [288304, 4230481, 1.3],
        [288303, 4230450, 2.6],
        [288298, 4230419, 1.8],
        [288301, 4230395, 1.7],
        [288293, 4230372, 2.3],
        [288291, 4230331, 3.0],
        [288287, 4230314, 2.5],
        [288283, 4230283, 3.1],
        [288280, 4230258, 3.8],
        [288276, 4230226, 3.4],
        [288275, 4230197, 2.6],
        [288274, 4230166, 1.6],
        [288274, 4230139, 2.2],
        [288273, 4230100, 1.3],
        [288265, 4230068, 1.5],
        [288254, 4230036, 1.2],
        [288248, 4230003, 1.3],
        [288236, 4229974, 1.2],
        [288229, 4229944, 2.2],
        [288227, 4229915, 2.1],
        [288223, 4229889, 2.3],
        [288210, 4229865, 2.8],
        [288201, 4229839, 2.9],
        [288194, 4229815, 2.2],
        [288187, 4229787, 2.0],
        [288176, 4229753, 2.3],
        [288169, 4229732, 1.6],
        [288154, 4229700, 1.7],
        [288146, 4229678, 1.8],
        [288136, 4229655, 1.6],
        [288124, 4229628, 1.6],
        [288104, 4229603, 1.6],
        [288090, 4229579, 2.0],
        [288079, 4229556, 1.5],
        [288060, 4229528, 2.0],
        [288052, 4229507, 2.0],
        [288050, 4229474, 1.6],
        [288045, 4229444, 2.2],
        [288050, 4229420, 2.2],
        [288050, 4229392, 2.2],
        [288047, 4229362, 2.2],
        [288048, 4229335, 1.3],
        [288045, 4229309, 2.2],
        [288045, 4229279, 3.2],
        [288044, 4229254, 2.4],
        [288042, 4229219, 2.0],
        [288040, 4229202, 2.0],
        [288037, 4229172, 1.5],
        [288035, 4229140, 1.9],
        [288034, 4229114, 1.4],
        [288036, 4229090, 2.0],
        [288035, 4229059, 2.4],
        [288035, 4229030, 2.6],
        [288035, 4229005, 1.5],
        [288038, 4228973, 1.8],
        [288036, 4228943, 2.1],
        [288035, 4228912, 1.9],
        [288033, 4228887, 2.0],
        [288036, 4228858, 1.8],
        [288038, 4228831, 2.0],
        [288037, 4228798, 2.0],
        [288036, 4228771, 1.6],
        [288040, 4228741, 1.9],
        [288040, 4228713, 2.5],
        [288038, 4228687, 2.2],
        [288042, 4228651, 2.6],
        [288041, 4228626, 1.8],
        [288043, 4228600, 2.3],
        [288043, 4228575, 1.7],
        [288042, 4228543, 1.4],
        [288046, 4228517, 1.6],
        [288044, 4228485, 1.6],
        [288046, 4228458, 1.4],
        [288041, 4228435, 1.9],
        [288045, 4228402, 2.4],
        [288041, 4228375, 3.0],
        [288041, 4228347, 3.1],
        [288043, 4228313, 2.7],
        // [288039, 4228285, 1.7],
        // [288041, 4228258, 1.9],
        // [288040, 4228230, 1.8],
        // [288041, 4228201, 2.4],
        // [288040, 4228178, 1.4],
        // [288044, 4228151, 2.6],
        // [288041, 4228117, 1.8],
        // [288046, 4228086, 1.9],
        // [288046, 4228051, 4.3],
        // [288045, 4228033, 1.6]
      ]
      // 地表
      landCrossPointList.forEach(item => {
        let clone = sphereJoint.clone()
        clone.position.set(...item)
        this.markGroup.add(clone)
      })
      // 坐标轴转换
      let culDivideAllRoad = () => {
        let scaleXY =  Math.sqrt(Math.pow((288043 - 288258),2) + Math.pow(4228313 - 4230796,2)) / Math.sqrt(Math.pow(landCrossPointList[landCrossPointList.length -1][0],2) + Math.pow(landCrossPointList[landCrossPointList.length - 1][2], 2))
        let scaleH = 1.041
        // 模型中管线
        let pipeCurvePoints = landCrossPointList.map((item, index) => new THREE.Vector3(item[0], item[1] - pipeList[index][2] / 1.041, item[2]))
        let pipeLongitudeAndLatitude = pipeList.map(item => new THREE.Vector3(item[0] - pipeList[0][0], item[2] - pipeList[0][2], item[1] - pipeList[0][1]))

        let pipeLongitudeCurve = new THREE.CatmullRomCurve3(pipeLongitudeAndLatitude).getPoints(500);
        let pipeLongitudeCurveLine = this.creatFatCurveLine(pipeLongitudeCurve)
        this.scene.add(pipeLongitudeCurveLine)

        const pipeCurve = new THREE.CatmullRomCurve3(pipeCurvePoints).getPoints(500);
        // let modelDeepList = []
        let v1 = new THREE.Vector3((288043 - 288258) / scaleXY, 0.5, (4228313 - 4230796) / scaleXY)
        let v2 = new THREE.Vector3(
          Math.round(pipeCurve[500].x),
          80.538,
          Math.round(pipeCurve[500].z)
        )
        let scale = Math.sqrt(Math.pow(v1.x,2) + Math.pow(v1.y,2) + Math.pow(v1.z,2)) /  Math.sqrt(Math.pow(v2.x,2) + Math.pow(v2.y,2) + Math.pow(v2.z,2))
        console.log(scale)
        let ang = new THREE.Vector3(v2.x, 0, v2.y).angleTo(new THREE.Vector3(v1.x, 0, v1.y))
        let quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(v1.x, v1.y, v1.z).cross(new THREE.Vector3(v2.x, v2.y, v2.z)), -ang)
        pipeCurve.forEach((item, index) => {
          let v = new THREE.Vector3(item.x, 0,item.z)
          v.applyQuaternion(quaternion)
          const {x, z} = v
          /* console.log(
            "%c%s",
            "color: #fff; background: #2879FF; font-size: 14px; border-radius: 6px; padding: 0 6px",
            ((-v.x / scale + 288258).toFixed(0) + '  ' + (-v.z / scale + 4230796).toFixed(0) ), index
          ) */
          this.pipeDeepList[index] = [v.x * scale, Math.abs(item.y * scale), v.z * scale]
        })
        // this.verticalGroup.add(this.creatFatCurveLine(pipeCurvePoints))

        // 验证线段旋转经纬度坐标转换准确性
        const material1 = new THREE.LineBasicMaterial({
          color: 0xeeee00
        });
        const material2 = new THREE.LineBasicMaterial({
          color: 0x0fff11
        });
        const geometry1 = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3( 0, 0, 0 ),
          new THREE.Vector3( v1.x, 0, v1.y )
        ]);
        const geometry2 = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3( 0, 0, 0 ),
          new THREE.Vector3( v2.x, 0, v2.y )
        ]);
        const line1 = new THREE.Line( geometry1, material1 );
        let qua = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1,  0), new THREE.Vector3(v1.x, 0, v1.z).angleTo(new THREE.Vector3(v2.x, 0, v2.z)))
        const line2 = new THREE.Line( geometry2, material2 );
        line2.applyQuaternion(qua)
        this.scene.add(line1)
        this.scene.add(line2)
      }
      culDivideAllRoad()
      this.pipeListGroup.add(this.creatFatLine(landCrossPointList.map((item, index) => {
        let point = []
        point[0] = item[0]
        point[1] = item[1] - pipeList[index][2] / 1.041
        point[2] = item[2]
        return point
      }), 0x4422ee, 2))
      this.scene.add(this.pipeListGroup)
      this.scene.add(this.markGroup)
      // 分段线列表
      let adjustLine = (gpsRepair) => {
        let landLine = [
          [
            [0, 0, 0],
            [-199.408, -12.766, 169.34]
          ],
          [
            [-199.408, -12.766, 169.34],
            [-447.876, -13.188, 290.186]
          ],
          [
            [-447.876, -13.188, 290.186],
            [-713.221, -26.733, 396.292]
          ],
          [
            [-713.221, -26.733, 396.292],
            [-996.535, -34.790, 469.574]
          ],
          [
            [-996.535, -34.790, 469.574],
            [-1265.926, -44.337, 507.329]
          ],
          [
            [-1265.926, -44.337, 507.329],
            [-1507.818, -50.087, 634.891]
          ],
          [
            [-1507.818, -50.087, 634.891],
            [-1752.911, -57.106, 777.658]
          ],
          [
            [-1752.911, -57.106, 777.658],
            [-1993.776, -65.223, 932.528]
          ],
          [
            [-1993.776, -65.223, 932.528],
            [-2239.631, -80.536, 1076.947]
          ]
        ]
        let verticalGpsList = [
          [
            [288258, 4230796, 2.2],
            [288265, 4230764, 1.6],
            [288274, 4230739, 1.7],
            [288283, 4230710, 2.0],
            [288291, 4230691, 2.3],
            [288301, 4230666, 1.8],
            [288311, 4230637, 1.6],
            [288313, 4230610, 2.4],
            [288310, 4230583, 1.2],
            [288304, 4230564, 1.6],
            [288303, 4230532, 1.5]
          ],
          [
            [288303, 4230532, 1.5],
            [288305, 4230507, 2.1],
            [288304, 4230481, 1.3],
            [288303, 4230450, 2.6],
            [288298, 4230419, 1.8],
            [288301, 4230395, 1.7],
            [288293, 4230372, 2.3],
            [288291, 4230331, 3.0],
            [288287, 4230314, 2.5],
            [288283, 4230283, 3.1],
            [288280, 4230258, 3.8]
          ],
          [
            [288280, 4230258, 3.8],
            [288276, 4230226, 3.4],
            [288275, 4230197, 2.6],
            [288274, 4230166, 1.6],
            [288274, 4230139, 2.2],
            [288273, 4230100, 1.3],
            [288265, 4230068, 1.5],
            [288254, 4230036, 1.2],
            [288248, 4230003, 1.3],
            [288236, 4229974, 1.2]
          ],
          [
            [288236, 4229974, 1.2],
            [288229, 4229944, 2.2],
            [288227, 4229915, 2.1],
            [288223, 4229889, 2.3],
            [288210, 4229865, 2.8],
            [288201, 4229839, 2.9],
            [288194, 4229815, 2.2],
            [288187, 4229787, 2.0],
            [288176, 4229753, 2.3],
            [288169, 4229732, 1.6],
            [288154, 4229700, 1.7]
          ],
          [
            [288154, 4229700, 1.7],
            [288146, 4229678, 1.8],
            [288136, 4229655, 1.6],
            [288124, 4229628, 1.6],
            [288104, 4229603, 1.6],
            [288090, 4229579, 2.0],
            [288079, 4229556, 1.5],
            [288060, 4229528, 2.0],
            [288052, 4229507, 2.0],
            [288050, 4229474, 1.6],
            [288045, 4229444, 2.2]
          ],
          [
            [288045, 4229444, 2.2],
            [288050, 4229420, 2.2],
            [288050, 4229392, 2.2],
            [288047, 4229362, 2.2],
            [288048, 4229335, 1.3],
            [288045, 4229309, 2.2],
            [288045, 4229279, 3.2],
            [288044, 4229254, 2.4],
            [288042, 4229219, 2.0],
            [288040, 4229202, 2.0],
            [288037, 4229172, 1.5]
          ],
          [
            [288037, 4229172, 1.5],
            [288035, 4229140, 1.9],
            [288034, 4229114, 1.4],
            [288036, 4229090, 2.0],
            [288035, 4229059, 2.4],
            [288035, 4229030, 2.6],
            [288035, 4229005, 1.5],
            [288038, 4228973, 1.8],
            [288036, 4228943, 2.1],
            [288035, 4228912, 1.9],
            [288033, 4228887, 2.0]
          ],
          [
            [288033, 4228887, 2.0],
            [288036, 4228858, 1.8],
            [288038, 4228831, 2.0],
            [288037, 4228798, 2.0],
            [288036, 4228771, 1.6],
            [288040, 4228741, 1.9],
            [288040, 4228713, 2.5],
            [288038, 4228687, 2.2],
            [288042, 4228651, 2.6],
            [288041, 4228626, 1.8],
            [288043, 4228600, 2.3]
          ],
          [
            [288043, 4228600, 2.3],
            [288043, 4228575, 1.7],
            [288042, 4228543, 1.4],
            [288046, 4228517, 1.6],
            [288044, 4228485, 1.6],
            [288046, 4228458, 1.4],
            [288041, 4228435, 1.9],
            [288045, 4228402, 2.4],
            [288041, 4228375, 3.0],
            [288041, 4228347, 3.1],
            [288043, 4228313, 2.7]
          ]
        ]
        let lineGroup = new THREE.Group()
        for (let i = 0; i < verticalGpsList.length; i++) {
          // let baseLine = landLine[i], useLine = verticalGpsList[i]
          let baseLineStart = landLine[i][0]
          let baseLineEnd = landLine[i][landLine[i].length - 1]
          let initBaseLine = landLine[i].map((item, index) => {
            let point = []
            point[0] = item[0] - baseLineStart[0]
            point[1] = item[1] - baseLineStart[1]
            point[2] = item[2] - baseLineStart[2]
            return point
          })
          let gpsLineStart = verticalGpsList[i][0]
          // let gpsLineEnd = verticalGpsList[i][verticalGpsList[i].length - 1]
          let initGPSLine = verticalGpsList[i].map((item, index) => {
            let point = []
            point[0] = item[0] - gpsLineStart[0]
            point[1] = 0
            point[2] = item[1] - gpsLineStart[1]
            return point
          })
          // console.log(initBaseLine, initGPSLine)
          let baseLineCan = this.creatFatLine(
            landLine[i],
            0xeeff44,
            1
          )
          // let baseLine = this.creatFatLine(
          //   initBaseLine,
          //   0xeeff44,
          //   1
          // )
          let p = this.suitLine(
            baseLineStart,
            baseLineEnd,
            initGPSLine[0],
            initGPSLine[initGPSLine.length - 1],
          )
          let quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(p.cross.x, p.cross.y, p.cross.z).normalize(), -p.ang)
          let useLine = this.creatFatLine(
            initGPSLine,
            0xee0044,
            1
          )
          // return useLine
          useLine.applyQuaternion(quaternion)
          useLine.scale.set(p.scale, p.scale, p.scale)
          useLine.position.set(baseLineStart[0], baseLineStart[1], baseLineStart[2])
          lineGroup.add(useLine)
          // this.scene.add(baseLine)
          // 参考用 后期删
          // lineGroup.add(baseLine)
          lineGroup.add(baseLineCan)
          initGPSLine.forEach((item) => {
            let v = new THREE.Vector3(item[0], item[1], item[2])
            v.applyQuaternion(quaternion)
            let cloneJoint = sphereJoint.clone()
            let diff = {
              x: v.x * p.scale + baseLineStart[0],
              y: v.y * p.scale + baseLineStart[1],
              z: v.z * p.scale + baseLineStart[2],
            }
            cloneJoint.position.set(diff.x, diff.y, diff.z)
            let vWorld = new THREE.Vector3()
            cloneJoint.getWorldPosition(vWorld)
            let line = this.creatFatLine(
              [[diff.x, diff.y + 10, diff.z], [diff.x, diff.y - 10, diff.z]],
              0xaafff0,
              1
            )
            this.verticalGroup.add(line)
          })
        }
        // console.log(lineGroup)
        // this.finalLinesGroup = lineGroup.clone()
        return lineGroup
      }
      this.finalLinesGroup = adjustLine(baseGPSParam)

      let deepList = [2.2, 1.5, 3.8, 1.2, 1.7, 2.2, 1.5, 2.0, 2.3, 2.7]
      // 地表点矫正线
      let part0901Lines = []
      for(let i = 0; i < part0901point.length - 1; i++) {
        let pointStart = part0901point[i]
        pointStart[1] -= deepList[i]
        let pointEnd = part0901point[i+1]
        pointEnd[1] -= deepList[i]
        part0901Lines.push([pointStart, pointEnd])
      }
      this.scene.add(this.finalLinesGroup)
      this.scene.add(this.verticalGroup)

      // 地形
      this.scene.add(this.group)
      this.scene.add(this.compareGroup)
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
      // this.addBloomPass()

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
      this.transformControls.attach( this.group );
      // 变换控制
      this.scene.add(this.transformControls)
      /* ↑↑↑↑ 模型变换功能 ↑↑↑↑ */
    },
    animate() {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.animate)
    },
    onDocumentMouseDown(e) {
      e.preventDefault();
      if (e.ctrlKey && e.button === 0) {
        //将鼠标点击位置的屏幕坐标转成threejs中的标准坐标,具体解释见代码释义
        this.mX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mY = -(e.clientY / window.innerHeight) * 2 + 1;
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( {x: this.mX, y: this.mY}, this.camera );
        let intersects = raycaster.intersectObjects(this.compareGroup.children,true); // 标记地形
        if (intersects.length > 0) {
          console.log(intersects[0])
          console.log(intersects[0].point)
          this.coordinate.x = intersects[0].point.x.toFixed(0)
          this.coordinate.y = intersects[0].point.z.toFixed(0)
          // 1号点
          if(
            intersects[0].point.x < -133 &&
            intersects[0].point.x > -137 &&
            intersects[0].point.z < -60 &&
            intersects[0].point.z > -62) {
            this.calculateCardFlag1 = true
          }
          // 2号点
          // -85.24467, -0.91612, -33.13839
          if(
            intersects[0].point.x > -87 &&
            intersects[0].point.x < -84 &&
            intersects[0].point.z > -35 &&
            intersects[0].point.z < -32) {
            this.calculateCardFlag2 = true
          }
          this.markList.unshift(intersects[0].point)
          const { point } = intersects[0]
          const geometry = new THREE.SphereGeometry( 0.1, 8, 8 );
          const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
          const sphere = new THREE.Mesh( geometry, material );
          sphere.position.set(point.x, point.y, point.z)
          this.baseGroup.add( sphere );
        }
      }
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
    clearMeasureMark() {
      this.markList = []
    },
    queryPipeRotPos() {
      console.log(this.markGroup)
    },
    queryComparePos() {
      console.log(this.compareGroup)
    },
    queryTransfer() {
      console.log(this.transformControls)
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
  overflow hidden
  background-color: #fff
  // #000428, #004e92
  background-image: linear-gradient(to right bottom, #5ac5da, #0D015B)
  .coordinate {
    position absolute
    top: 20px
    left: 1250px
    color #ffffff
  }
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
          padding 4px 4px
          width auto
          cursor pointer
          font-size 12px
          text-align center
        }
      }
      .visible-control-group {
        display flex
        .btn {
          padding 4px 4px
          width auto
          cursor pointer
          font-size 12px
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
    height: 400px
    overflow auto
    transition left ease-in-out 0.4s
    //background-color: rgba(220, 220, 220, 0.4)
  }
  .calculate-card-1 {
    position absolute
    width: 220px
    height: 100px
    top: 140px
    left: 20px
    color #fff
    text-shadow 1px 1px 2px #333
    background-color: rgba(220, 220, 220, 0.4)
    padding: 20px
    box-shadow 2px 2px 4px rgba(51, 51, 51, 0.6)
  }
  .calculate-card-2 {
    @extends .channel .calculate-card-1;
    top: 290px
  }
}
</style>
