<template>
  <div class="channel" ref="channel">
    <div class="chart" :style="`left: ${toolsFlag ? '-820' : '20'}px;`">
      <e-chart id="chart" :option="options" style="height: 400px; width: 810px"></e-chart>
      <div class="pip-deep-list">
        <div class="pdl-item">
          <div v-for="(item, index) in pipeDeepList" :key="index">
            <span>{{(parseFloat(item[0]) + 4230796).toFixed(0)}}</span>
          </div>
        </div>
        <div class="pdl-item">
          <div v-for="(item, index) in pipeDeepList" :key="index">
            <span>{{(parseFloat(item[2]) + 288258).toFixed(0)}}</span>
          </div>
        </div>
        <div class="pdl-item">
          <div v-for="(item, index) in pipeDeepList" :key="index" :style="Math.abs(item[1] * 1.011) < 2.2 ? 'color: #ff0000' : ''" >
            <span :title="Math.abs(item[1] * 1.011) < 2.2 ? '埋深不足2.2' : ''">{{Math.abs((item[1] * 1.011 ).toFixed(2))}}</span>
          </div>
        </div>
        <div class="pdl-item">
          <div v-for="(item, index) in pipeDeepList" :key="index" :style="Math.abs(item[1] * 1.011) < 1.5 ? 'color: #ff0000' : ''" >
            <!--            <span>{{(parseFloat(item[0]) + 4230796).toFixed(0)}}，</span>-->
            <!--            <span>Y: {{(parseFloat(item[2]) + 288258).toFixed(0)}}，</span>-->
            <span :title="Math.abs(item[1] * 1.011) < 1.5 ? '埋深不足1.5' : ''">{{Math.abs((item[1] * 1.011 ).toFixed(2))}}</span>
          </div>
        </div>
        <div class="pdl-item">
          <div v-for="(item, index) in pipeDeepList" :key="index" :style="Math.abs(item[1] * 1.011) < 0.8 ? 'color: #ff0000' : ''" >
            <!--            <span>{{(parseFloat(item[0]) + 4230796).toFixed(0)}}，</span>-->
            <!--            <span>Y: {{(parseFloat(item[2]) + 288258).toFixed(0)}}，</span>-->
            <span :title="Math.abs(item[1] * 1.011) < 0.8 ? '埋深不足0.8' : ''">{{Math.abs((item[1] * 1.011 ).toFixed(2))}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="coordinate">
      GPS坐标&nbsp;&nbsp;&nbsp;x:{{Math.round(coordinate.x) + parseInt('4230796')}}, y:{{Math.round(coordinate.y) + parseInt('288258')}}
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
          <div class="btn" @click="baseGroup.visible = !baseGroup.visible">切换地形显隐</div>
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
              x: <i class="x">{{Math.round(group.position.x)}}</i>,
              y: <i class="y">{{Math.round(group.position.y)}}</i>,
              z: <i class="z">{{group.position.z.toFixed(2)}}</i>
            </div>
            <div class="group">
              rotation: <br>
              x: <i class="x">{{Math.round(group.rotation.x)}}</i>,
              y: <i class="y">{{Math.round(group.rotation.y)}}</i>,
              z: <i class="z">{{group.rotation.z.toFixed(2)}}</i>
            </div>
            <div class="group">
              scale: <br>
              x: <i class="x">{{Math.round(group.scale.x)}}</i>,
              y: <i class="y">{{Math.round(group.scale.y)}}</i>,
              z: <i class="z">{{group.scale.z.toFixed(2)}}</i>
            </div>
          </div>
        </div>
        <div>
          <span @click="queryPipeRotPos">查看模拟管线状态</span><br>
          <span @click="queryBasePos">查看基本层状态</span><br>
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
          lt: [351.330, 4.443, -117.440],
          rt: [345.315, 4.498, -105.239],
          rb: [345.182, -0.445, -105.238],
          lb: [351.201, -0.322, -117.754]
        },
        {
          label: '2号建筑',
          realLength: {
            l: 8.33,
            w: 5.07,
            h: 5
          },
          rt: [359.004, 4.460, -85.477],
          rb: [358.671, -0.531, -85.496],
          lt: [362.613, 4.361, -92.192]
        },
        {
          label: '3号建筑',
          realLength: {
            l: 5.05,
            w: 4.08,
            h: 3.2
          },
          rt: [356.337, 2.467, -80.429],
          rb: [355.917, -0.546, -80.405]
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
      this.camera.position.z = 200
      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.lookAt(new THREE.Vector3(0,0, 0));
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
          "Tile_+000_+000",
          "Tile_+000_+001",
          "Tile_+000_+002",
          "Tile_+000_+003",
          "Tile_+000_+004",
          "Tile_+000_+005",
          "Tile_+000_+006",
          "Tile_+000_+007",
          "Tile_+000_+008",
          "Tile_+000_+009",
          "Tile_+000_+010",
          "Tile_+000_+011",
          "Tile_+000_+012",
          "Tile_+000_+013",
          "Tile_+000_+014",
          "Tile_+000_+015",
        ],
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
          "Tile_+001_+017",
          "Tile_+001_+018",
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
          "Tile_+003_+018",
          "Tile_+003_+019",
          "Tile_+003_+020",
          "Tile_+003_+021",
          "Tile_+003_+022",
          "Tile_+003_+023",
          "Tile_+003_+024",
          "Tile_+003_+025"
        ]
      ]
      // let modelStep = [6, 25]
      let modelStep = [6, 22]
      // let simpleBaseUrl = './models/'
      let simpleBaseUrl = 'http://192.168.1.88:8000'
      // 现场gps坐标
      let pipeList = [
        [
          4230796,
          0,
          288258
        ],
        [
          4230764,
          0,
          288265
        ],
        [
          4230739,
          0,
          288274
        ],
        [
          4230710,
          0,
          288283
        ],
        [
          4230691,
          0,
          288291
        ],
        [
          4230666,
          0,
          288301
        ],
        [
          4230637,
          0,
          288311
        ],
        [
          4230610,
          0,
          288313
        ],
        [
          4230583,
          0,
          288310
        ],
        [
          4230564,
          0,
          288304
        ],
        [
          4230532,
          0,
          288303
        ],
        [
          4230507,
          0,
          288305
        ],
        [
          4230481,
          0,
          288304
        ],
        [
          4230450,
          0,
          288303
        ],
        [
          4230419,
          0,
          288298
        ],
        [
          4230395,
          0,
          288301
        ],
        [
          4230372,
          0,
          288293
        ],
        [
          4230331,
          0,
          288291
        ],
        [
          4230314,
          0,
          288287
        ],
        [
          4230283,
          0,
          288283
        ],
        [
          4230258,
          0,
          288280
        ],
        [
          4230226,
          0,
          288276
        ],
        [
          4230197,
          0,
          288275
        ],
        [
          4230166,
          0,
          288274
        ],
        [
          4230139,
          0,
          288274
        ],
        [
          4230100,
          0,
          288273
        ],
        [
          4230068,
          0,
          288265
        ],
        [
          4230036,
          0,
          288254
        ],
        [
          4230003,
          0,
          288248
        ],
        [
          4229974,
          0,
          288236
        ],
        [
          4229944,
          0,
          288229
        ],
        [
          4229915,
          0,
          288227
        ],
        [
          4229889,
          0,
          288223
        ],
        [
          4229865,
          0,
          288210
        ],
        [
          4229839,
          0,
          288201
        ],
        [
          4229815,
          0,
          288194
        ],
        [
          4229787,
          0,
          288187
        ],
        [
          4229753,
          0,
          288176
        ],
        [
          4229732,
          0,
          288169
        ],
        [
          4229700,
          0,
          288154
        ],
        [
          4229678,
          0,
          288146
        ],
        [
          4229655,
          0,
          288136
        ],
        [
          4229628,
          0,
          288124
        ],
        [
          4229603,
          0,
          288104
        ],
        [
          4229579,
          0,
          288090
        ],
        [
          4229556,
          0,
          288079
        ],
        [
          4229528,
          0,
          288060
        ],
        [
          4229507,
          0,
          288052
        ],
        [
          4229474,
          0,
          288050
        ],
        [
          4229444,
          0,
          288045
        ],
        [
          4229420,
          0,
          288050
        ],
        [
          4229392,
          0,
          288050
        ],
        [
          4229362,
          0,
          288047
        ],
        [
          4229335,
          0,
          288048
        ],
        [
          4229309,
          0,
          288045
        ],
        [
          4229279,
          0,
          288045
        ],
        [
          4229254,
          0,
          288044
        ],
        [
          4229219,
          0,
          288042
        ],
        [
          4229202,
          0,
          288040
        ],
        [
          4229172,
          0,
          288037
        ],
        [
          4229140,
          0,
          288035
        ],
        [
          4229114,
          0,
          288034
        ],
        [
          4229090,
          0,
          288036
        ],
        [
          4229059,
          0,
          288035
        ],
        [
          4229030,
          0,
          288035
        ],
        [
          4229005,
          0,
          288035
        ],
        [
          4228973,
          0,
          288038
        ],
        [
          4228943,
          0,
          288036
        ],
        [
          4228912,
          0,
          288035
        ],
        [
          4228887,
          0,
          288033
        ],
        [
          4228858,
          0,
          288036
        ],
        [
          4228831,
          0,
          288038
        ],
        [
          4228798,
          0,
          288037
        ],
        [
          4228771,
          0,
          288036
        ],
        [
          4228741,
          0,
          288040
        ],
        [
          4228713,
          0,
          288040
        ],
        [
          4228687,
          0,
          288038
        ],
        [
          4228651,
          0,
          288042
        ],
        [
          4228626,
          0,
          288041
        ],
        [
          4228600,
          0,
          288043
        ],
        [
          4228575,
          0,
          288043
        ],
        [
          4228543,
          0,
          288042
        ],
        [
          4228517,
          0,
          288046
        ],
        [
          4228485,
          0,
          288044
        ],
        [
          4228458,
          0,
          288046
        ],
        [
          4228435,
          0,
          288041
        ],
        [
          4228402,
          0,
          288045
        ],
        [
          4228375,
          0,
          288041
        ],
        [
          4228347,
          0,
          288041
        ],
        [
          4228313,
          0,
          288043
        ]
      ]
      let deepList = [
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
      ]
      // 模型载入
      const modelList0901 = [
        [
          "Tile_+000_+000",
          "Tile_+000_+001",
          "Tile_+000_+002",
          "Tile_+000_+003",
          "Tile_+000_+004",
          "Tile_+000_+005",
          "Tile_+000_+006",
          "Tile_+000_+007",
          "Tile_+000_+008",
          "Tile_+000_+009",
          "Tile_+000_+010",
          "Tile_+000_+011",
          "Tile_+000_+012",
          "Tile_+000_+013",
          "Tile_+000_+014",
          "Tile_+000_+015",
        ],
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
          "Tile_+001_+017",
          "Tile_+001_+018",
          "Tile_+001_+019",
          "Tile_+001_+020",
          "Tile_+001_+021",
          "Tile_+001_+022",
          "Tile_+001_+023",
          "Tile_+001_+024",
          "Tile_+001_+025",
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
          "Tile_+002_+025",
        ],
        [
          "Tile_+003_+012",
          "Tile_+003_+013",
          "Tile_+003_+014",
          "Tile_+003_+015",
          "Tile_+003_+016",
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
      ]
      // loadAllModel(list0829, '0822_green')
      function loadModelList(arr, baseUrl, innerDir, range) {
        let group = new THREE.Group()
        for (let i = 0; i < arr.length; i++) {
          let row = arr[i]
          for (let idx = 0; idx < row.length; idx++) {
            if(idx <= range[1] && idx >= range[0]) {
              let cell = row[idx]
              fbxLoader.load(`${baseUrl}/${innerDir}/${cell}/${cell}.fbx`, fbx => {
                const mesh = fbx.children[0].clone()
                mesh.name = cell
                mesh.position.z -= 1220
                group.add(mesh)
              })
            }
          }
        }
        group.position.set(-1546.105, -58.581, -97.751)
        group.rotation.set( - Math.PI / 2, 0, -Math.PI / 2)
        return group
      }
      this.baseGroup = new THREE.Group()
      // this.baseGroup.add(loadModelList(modelList0901, simpleBaseUrl, '0901_simple', [0, 25]))
      this.scene.add(this.baseGroup)
      // 经纬度投影线与地表交点
      /* let landCrossPoints0906 = [
        [0,0,0],
        [-32.023, -0.708, 6.954],
        [-57.019, -1.082, 15.978],
        [-86.017, 0.277, 25.061],
        [-105.019, 0.242, 33.016],
        [-130.002, 0.988, 42.999],
        [-159.028, 1.749, 52.969],
        [-186.068, 3.080, 54.982],
        [-213.039, -0.242, 52.006],
        [-232.050, -2.473, 46.017],
        [-264.046, -3.133, 45.003],
        [-289.042, -4.295, 46.977],
        [-315.042, -4.180, 45.971],
        [-345.987, -0.612, 45.020],
        [-377.047, -2.171, 39.977],
        [-401.055, -3.228, 43.048],
        [-424.034, -2.738, 34.947],
        [-465.035, -1.982, 32.960],
        [-482.050, -0.597, 29.052],
        [-513.020, 1.204, 24.987],
        [-538.017, 2.982, 22.035],
        [-570.028, 0.622, 18.028],
        [-599.040, -3.611, 16.980],
        [-630.020, -1.430, 16.004],
        [-657.038, -0.440, 16.002],
        [-695.980, -6.831, 15.041],
        [-728.012, -5.890, 6.996],
        [-760.008, -4.121, -3.997],
        [-792.985, -4.389, -10.055],
        [-822.073, -1.949, -21.992],
        [-852.045, -3.518, -28.978],
        [-881.062, -2.473, -31.000],
        [-907.009, -4.403, -35.020],
        [-931.009, -3.987, -47.982],
        [-957.038, -2.818, -56.994],
        [-981.057, -5.700, -64.003],
        [-1009.008, -5.797, -70.994],
        [-1042.989, -5.014, -81.952],
        [-1064.097, -6.942, -88.985],
        [-1096.050, -3.416, -104.018],
        [-1118.058, -2.736, -111.946],
        [-1141.056, -4.744, -121.975],
        [-1168.064, -6.055, -133.994],
        [-1193.069, -6.835, -154.008],
        [-1217.054, -3.779, -167.965],
        [-1240.030, -5.271, -179.043],
        [-1268.050, -2.518, -197.974],
        [-1288.967, -1.965, -205.985],
        [-1322.054, -3.773, -207.984],
        [-1352.047, -7.123, -212.974],
        [-1376.044, -4.848, -207.977],
        [-1404.054, -3.496, -208.030],
        [-1434.006, -4.818, -210.953],
        [-1461.022, -5.765, -209.978],
        [-1487.036, -7.502, -212.974],
        [-1517.021, -3.334, -212.968],
        [-1542.055, -4.583, -213.970],
        [-1576.940, -3.753, -215.974],
        [-1593.919, -6.222, -218.024],
        [-1623.985, -4.890, -220.924],
        [-1655.858, -4.568, -222.979],
        [-1682.602, -7.399, -224.068],
        [-1706.015, -6.318, -222.007],
        [-1736.996, -5.928, -222.988],
        [-1766.041, -5.295, -223.001],
        [-1791.056, -4.856, -222.957],
        [-1823.019, -5.593, -220.027],
        [-1853.007, -5.433, -221.970],
        [-1884.097, -6.165, -223.034],
        [-1909.037, -3.476, -224.949],
        [-1938.061, -5.690, -222.010],
        [-1964.978, -4.388, -220.001],
        [-1997.986, -3.347, -220.996],
        [-2025.034, -3.417, -222.000],
        [-2055.034, 0.708, -217.972],
        [-2083.010, -1.175, -217.988],
        [-2109.053, -3.155, -220.007],
        [-2145.023, -0.808, -216.023],
        [-2170.001, -2.178, -217.047],
        [-2196.008, -2.500, -215.019],
        [-2221.021, -2.669, -215.011],
        [-2252.999, -4.655, -215.987],
        [-2279.022, -4.160, -211.979],
        [-2311.048, -3.445, -214.041],
        [-2338.034, -5.071, -212.021],
        [-2361.012, -7.500, -217.016],
        [-2394.000, -6.804, -213.054],
        [-2421.047, -5.098, -217.045],
        [-2449.035, -7.284, -216.999],
        [-2483.030, -8.618, -215.050]
      ] */
      const landCrossPoints0908 = [
        [0, 0, 0,],
        [-32.039, 0.000, 7.014],
        [-57.428, 0.000, 16.133],
        [-86.000, 0.410, 25.000],
        [-105.000, 0.280, 33.000],
        [-130.000, 1.021, 43.000],
        [-159.000, 1.759, 53.000],
        [-186.000, 3.208, 55.000],
        [-213.000, 0.000, 52.000],
        [-232.498, 0.000, 45.984],
        [-264.801, 0.000, 45.064],
        [-289.885, 0.000, 46.966],
        [-315.838, 0.000, 45.973],
        [-346.028, 0.000, 44.995],
        [-376.573, 0.000, 40.069],
        [-401.104, 0.000, 42.964],
        [-424.940, 0.000, 34.954],
        [-464.756, 0.000, 33.012],
        [-482.072, 0.000, 28.991],
        [-513.000, 1.341, 25.000],
        [-538.000, 2.955, 22.000],
        [-570.000, 0.661, 18.000],
        [-599.000, -3.489, 17.000],
        [-630.186, 0.000, 16.000],
        [-657.164, 0.000, 15.996],
        [-696.000, -6.685, 15.000],
        [-728.000, -5.850, 7.000],
        [-760.000, -4.105, -4.000],
        [-792.710, 0.000, -9.947],
        [-821.897, 0.000, -21.957],
        [-853.144, 0.000, -29.079],
        [-881.055, 0.000, -31.008],
        [-907.381, 0.000, -35.207],
        [-931.172, 0.000, -48.060],
        [-956.923, 0.000, -56.973],
        [-981.000, -5.766, -64.000],
        [-1009.000, -5.809, -71.000],
        [-1043.000, -4.873, -82.000],
        [-1064.000, -6.882, -89.000],
        [-1095.477, 0.000, -103.755],
        [-1118.242, 0.000, -112.105],
        [-1141.000, -4.727, -122.000],
        [-1168.000, -6.084, -134.000],
        [-1193.475, 0.000, -154.277],
        [-1216.365, 0.000, -167.629],
        [-1241.286, 0.000, -179.872],
        [-1267.707, 0.000, -197.801],
        [-1288.924, 0.000, -205.971],
        [-1322.000, -3.734, -208.000],
        [-1352.000, -6.949, -213.000],
        [-1376.000, -4.863, -208.000],
        [-1404.010, 0.000, -208.001],
        [-1434.000, -4.824, -211.000],
        [-1461.000, -5.712, -210.000],
        [-1487.000, -7.422, -213.000],
        [-1516.398, 0.000, -213.000],
        [-1540.793, 0.000, -213.952],
        [-1575.061, 0.000, -215.889],
        [-1594.000, -6.175, -218.000],
        [-1624.000, -4.802, -221.000],
        [-1655.051, 0.000, -222.941],
        [-1682.000, -6.728, -224.000],
        [-1706.000, -6.115, -222.000],
        [-1737.000, -5.998, -223.000],
        [-1766.000, -5.296, -223.000],
        [-1791.000, -4.711, -223.000],
        [-1823.000, -5.559, -220.000],
        [-1853.000, -5.342, -222.000],
        [-1884.000, -6.047, -223.000],
        [-1908.799, 0.000, -224.984],
        [-1938.348, 0.000, -221.974],
        [-1965.505, 0.000, -220.015],
        [-1997.868, 0.000, -220.996],
        [-2025.176, 0.000, -221.977],
        [-2055.000, 0.702, -218.000],
        [-2082.967, 0.000, -218.000],
        [-2109.000, -3.141, -220.000],
        [-2144.830, 0.000, -216.019],
        [-2169.869, 0.000, -216.995],
        [-2195.495, 0.000, -215.039],
        [-2220.382, 0.000, -215.000],
        [-2253.000, -4.634, -216.000],
        [-2279.523, 0.000, -212.033],
        [-2311.000, -3.514, -214.000],
        [-2338.000, -5.128, -212.000],
        [-2361.000, -7.466, -217.000],
        [-2394.000, -6.787, -213.000],
        [-2421.000, -5.039, -217.000],
        [-2449.000, -7.262, -217.000],
        [-2483.000, -8.478, -215.000]
      ]
      const landMarkPoints = [
        [0, 0, 0],
        [-258.593, -4.017, 44.411],
        [-534.733, 3.580, 21.461],
        [-818.120, -2.234, -22.719],
        [-1099.709, -3.400, -104.485],
        [-1351.915, -7.533, -209.713],
        [-1625.608, -5.189, -222.865],
        [-1909.038, -3.450, -225.019],
        [-2196.541, -2.630, -214.786],
        [-2483.000, -8.478, -215.000]
      ]

      // 确定管线模型与地理模型坐标轴的转换
      function culPipeToLand(v1, v2) {
        const x1 = v1.x, y1 = v1.y, z1 = v1.z
        const x2 = v2.x, y2 = v2.y, z2 = v2.z
        const cross = new THREE.Vector3(x1, y1, z1).cross(new THREE.Vector3(x2, y2, z2)).normalize()
        const ang = new THREE.Vector3(x1, y1, z1).angleTo(new THREE.Vector3(x2, y2, z2))
        const scale = Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2) + Math.pow(z1,2)) / Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2) + Math.pow(z2,2))
        return {
          cross, ang, scale
        }
      }

      this.baseGroup.rotation.set(0, -0.0259873, 0)
      this.baseGroup.scale.set(1.0022113, 1.0022113, 1.0022113)
      this.baseGroup.position.set(40.693, 3.917, 3.49846)

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

      // 水平管线网络计算
      let base0909 = [
        [0, 0, 0],
        [-32.008, -0.626, 7.002],
        [-57.012, -0.912, 15.997],
        [-86.010, 0.147, 25.005],
        [-105.003, 0.363, 32.998],
        [-130.007, 1.120, 42.999],
        [-159.014, 1.958, 53.002],
        [-186.011, 3.434, 54.978],
        [-213.020, -0.202, 51.961],
        [-231.998, -2.081, 45.985],
        [-263.966, -3.596, 44.715],
        [-288.997, -3.902, 46.983],
        [-315.010, -3.945, 45.978],
        [-346.007, -0.480, 44.974],
        [-376.989, -1.669, 39.971],
        [-401.020, -3.019, 42.992],
        [-424.010, -1.889, 34.987],
        [-465.015, -1.357, 32.993],
        [-482.016, -0.075, 29.004],
        [-513.014, 1.670, 24.992],
        [-538.001, 3.696, 21.986],
        [-570.009, 1.242, 17.996],
        [-598.996, -3.055, 16.996],
        [-629.999, -1.194, 15.996],
        [-657.010, 0.648, 16.007],
        [-696.016, -4.863, 15.004],
        [-728.012, -5.716, 7.020],
        [-760.001, -3.626, -4.007],
        [-793.020, -3.202, -9.998],
        [-822.013, -0.970, -21.980],
        [-851.994, -2.138, -28.984],
        [-880.989, -1.366, -31.010],
        [-907.005, -3.003, -35.005],
        [-931.014, -3.233, -48.002],
        [-957.013, -1.647, -57.008],
        [-981.009, -4.628, -64.006],
        [-1009.015, -4.669, -71.030],
        [-1043.008, -3.649, -81.991],
        [-1064.007, -5.623, -88.970],
        [-1096.009, -1.924, -104.008],
        [-1118.017, -1.615, -111.995],
        [-1141.019, -3.323, -121.993],
        [-1168.011, -4.225, -133.969],
        [-1193.025, -5.363, -153.998],
        [-1216.990, -2.169, -168.028],
        [-1240.010, -4.028, -179.016],
        [-1267.998, -0.982, -197.993],
        [-1289.018, -0.352, -206.001],
        [-1322.002, -2.223, -207.991],
        [-1352.002, -6.027, -213.004],
        [-1376.011, -4.075, -207.995],
        [-1404.014, -2.177, -207.988],
        [-1434.004, -3.056, -211.010],
        [-1460.992, -5.044, -210.014],
        [-1487.014, -6.758, -212.995],
        [-1517.013, -2.527, -213.008],
        [-1542.019, -3.852, -214.001],
        [-1577.013, -3.058, -215.997],
        [-1594.023, -5.570, -218.028],
        [-1624.011, -4.297, -221.005],
        [-1656.001, -3.954, -222.973],
        [-1682.026, -6.122, -223.977],
        [-1705.994, -5.688, -221.982],
        [-1737.009, -5.331, -222.981],
        [-1766.001, -4.711, -222.993],
        [-1791.014, -4.033, -222.993],
        [-1823.007, -4.885, -219.992],
        [-1853.006, -4.724, -221.977],
        [-1884.023, -5.479, -222.998],
        [-1909.022, -2.872, -224.974],
        [-1938.016, -5.008, -222.015],
        [-1964.989, -3.650, -219.997],
        [-1998.014, -2.575, -220.999],
        [-2025.002, -2.667, -221.993],
        [-2055.011, 1.389, -217.993],
        [-2083.006, -0.084, -218.010],
        [-2109.010, -2.242, -220.003],
        [-2145.004, -0.019, -215.986],
        [-2170.003, -1.190, -217.013],
        [-2196.018, -1.450, -215.002],
        [-2221.016, -2.012, -214.986],
        [-2253.009, -3.469, -215.996],
        [-2279.005, -2.951, -211.987],
        [-2310.949, -3.865, -214.075],
        [-2338.008, -3.821, -211.998],
        [-2360.991, -6.439, -217.007],
        [-2394.034, -6.269, -212.981],
        [-2421.006, -3.982, -217.007],
        [-2449.006, -6.293, -217.026],
        [-2483.054, -7.846, -215.095]
      ]

      function culPipeHorizontalWeb(points) {
        // let endPoint = points[points.length - 1]
        let startPoint = points[0]
        const material = new THREE.LineBasicMaterial({
          color: 0x00eeee
        });
        let vectors = points.map(item => new THREE.Vector3(item[0] - startPoint[0], item[1] - startPoint[1], item[2] - startPoint[2]))
        const geometry = new THREE.BufferGeometry().setFromPoints( vectors );
        return new THREE.Line( geometry, material );
      }
      const pipeGPSLine = culPipeHorizontalWeb(pipeList)
      // const pipeCurve = this.creatFatCurveLine()
      const initPipeVerticalLinesPoints = pipeList.map(item => [
        [item[0] - pipeList[0][0], item[1] + 10, item[2] - pipeList[0][2]], [item[0] - pipeList[0][0], item[1] - 10, item[2] - pipeList[0][2]]
      ])

      function creatVerticalLine(lineList) {
        const group = new THREE.Group()
        const material = new THREE.LineBasicMaterial({
          color: 0x0fff11
        });
        lineList.forEach(item => {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3( item[0][0], item[0][1], item[0][2] ),
            new THREE.Vector3( item[1][0], item[1][1], item[1][2] )
          ]);
          const line1 = new THREE.Line( geometry, material );
          group.add(line1)
        })
        return group
      }
      let verticalLines = creatVerticalLine(initPipeVerticalLinesPoints)

      function renderModelPipe(pipeModelPoints, deepList) {
        let list = pipeModelPoints.map((item, index) => new THREE.Vector3(item[0], item[1] - deepList[index][2] / 1.011, item[2]))
        let modelPipeCurve = new THREE.CatmullRomCurve3(list).getPoints(500)
        return modelPipeCurve
      }
      let landCrossPoints = new THREE.CatmullRomCurve3(landCrossPoints0908.map(item => new THREE.Vector3(item[0], item[1], item[2]))).getPoints(500)
      let modelPipePoints = renderModelPipe(landCrossPoints0908, deepList)
      // landCrossPoints.forEach((item, index) => {
      //   this.pipeDeepList[index] = [item.x, item.y - modelPipePoints[index].y, item.z]
      // })
      let landCrossPoints0909 = new THREE.CatmullRomCurve3(base0909.map(item => new THREE.Vector3(item[0], item[1], item[2]))).getPoints(500)
      landCrossPoints0909.forEach((item, index) => {
        console.log('地表特征点深度', item.y, '模型深度', modelPipePoints[index].y)
        this.pipeDeepList[index] = [item.x, item.y - modelPipePoints[index].y, item.z]
      })

      let changeRangeBigger20perList = [
        [	4230784	,	1.71	,	288260	]	,
        [	4230779	,	1.47	,	288262	]	,
        [	4230773	,	1.24	,	288263	]	,
        [	4230767	,	1.05	,	288264	]	,
        [	4230762	,	0.92	,	288266	]	,
        [	4230758	,	0.83	,	288267	]	,
        [	4230753	,	0.76	,	288269	]	,
        [	4230749	,	0.72	,	288270	]	,
        [	4230744	,	0.72	,	288272	]	,
        [	4230740	,	0.75	,	288274	]	,
        [	4230735	,	0.83	,	288275	]	,
        [	4230730	,	0.98	,	288277	]	,
        [	4230724	,	1.17	,	288278	]	,
        [	4230719	,	1.37	,	288280	]	,
        [	4230714	,	1.57	,	288282	]	,
        [	4230709	,	1.73	,	288283	]	,
        [	4230621	,	2.37	,	288313	]	,
        [	4230583	,	0.92	,	288310	]	,
        [	4230579	,	0.66	,	288309	]	,
        [	4230576	,	0.39	,	288308	]	,
        [	4230573	,	0.11	,	288307	]	,
        [	4230569	,	0.16	,	288305	]	,
        [	4230566	,	0.42	,	288304	]	,
        [	4230561	,	0.71	,	288304	]	,
        [	4230556	,	1.06	,	288303	]	,
        [	4230544	,	1.74	,	288303	]	,
        [	4230538	,	2.01	,	288303	]	,
        [	4230532	,	2.19	,	288303	]	,
        [	4230527	,	2.24	,	288303	]	,
        [	4230523	,	2.2	,	288304	]	,
        [	4230518	,	2.1	,	288304	]	,
        [	4230496	,	2.41	,	288305	]	,
        [	4230491	,	2.7	,	288305	]	,
        [	4230487	,	2.89	,	288304	]	,
        [	4230482	,	2.87	,	288304	]	,
        [	4230477	,	2.49	,	288304	]	,
        [	4230466	,	0.58	,	288304	]	,
        [	4230461	,	0.53	,	288304	]	,
        [	4230456	,	1.47	,	288303	]	,
        [	4230450	,	2.01	,	288303	]	,
        [	4230445	,	2.08	,	288302	]	,
        [	4230439	,	1.81	,	288301	]	,
        [	4230434	,	1.34	,	288300	]	,
        [	4230428	,	0.79	,	288299	]	,
        [	4230423	,	0.27	,	288298	]	,
        [	4230418	,	0.09	,	288298	]	,
        [	4230413	,	0.43	,	288299	]	,
        [	4230409	,	0.79	,	288299	]	,
        [	4230405	,	1.11	,	288300	]	,
        [	4230400	,	1.35	,	288301	]	,
        [	4230396	,	1.46	,	288301	]	,
        [	4230392	,	1.39	,	288300	]	,
        [	4230388	,	1.14	,	288299	]	,
        [	4230384	,	0.78	,	288297	]	,
        [	4230380	,	0.38	,	288296	]	,
        [	4230375	,	0	,	288294	]	,
        [	4230370	,	0.31	,	288293	]	,
        [	4230364	,	0.59	,	288292	]	,
        [	4230356	,	0.82	,	288292	]	,
        [	4230348	,	1.02	,	288292	]	,
        [	4230341	,	1.2	,	288292	]	,
        [	4230334	,	1.4	,	288291	]	,
        [	4230329	,	1.58	,	288291	]	,
        [	4230326	,	1.72	,	288290	]	,
        [	4230323	,	1.86	,	288289	]	,
        [	4230321	,	2	,	288289	]	,
        [	4230318	,	2.14	,	288288	]	,
        [	4230314	,	2.28	,	288287	]	,
        [	4230282	,	3.34	,	288283	]	,
        [	4230277	,	3.56	,	288282	]	,
        [	4230273	,	3.8	,	288282	]	,
        [	4230269	,	4.04	,	288281	]	,
        [	4230264	,	4.24	,	288281	]	,
        [	4230260	,	4.38	,	288280	]	,
        [	4230255	,	4.43	,	288280	]	,
        [	4230249	,	4.39	,	288279	]	,
        [	4230243	,	4.29	,	288278	]	,
        [	4230237	,	4.15	,	288277	]	,
        [	4230232	,	3.99	,	288277	]	,
        [	4230226	,	3.83	,	288276	]	,
        [	4230221	,	3.71	,	288276	]	,
        [	4230216	,	3.59	,	288275	]	,
        [	4230210	,	3.45	,	288275	]	,
        [	4230205	,	3.27	,	288275	]	,
        [	4230200	,	3.05	,	288275	]	,
        [	4230184	,	1.58	,	288275	]	,
        [	4230178	,	0.96	,	288274	]	,
        [	4230172	,	0.47	,	288274	]	,
        [	4230167	,	0.23	,	288274	]	,
        [	4230162	,	0.34	,	288274	]	,
        [	4230157	,	0.73	,	288274	]	,
        [	4230153	,	1.27	,	288274	]	,
        [	4230143	,	2.38	,	288274	]	,
        [	4230138	,	2.73	,	288274	]	,
        [	4230131	,	2.97	,	288274	]	,
        [	4230124	,	3.1	,	288274	]	,
        [	4230117	,	3.14	,	288274	]	,
        [	4230110	,	3.11	,	288274	]	,
        [	4230103	,	3.02	,	288273	]	,
        [	4230097	,	2.87	,	288272	]	,
        [	4230091	,	2.62	,	288271	]	,
        [	4230085	,	2.3	,	288270	]	,
        [	4230080	,	1.96	,	288268	]	,
        [	4230051	,	1.62	,	288259	]	,
        [	4230046	,	1.7	,	288257	]	,
        [	4230040	,	1.65	,	288255	]	,
        [	4230028	,	0.77	,	288252	]	,
        [	4230022	,	0.04	,	288252	]	,
        [	4230017	,	0.89	,	288251	]	,
        [	4230011	,	1.63	,	288250	]	,
        [	4230005	,	2.08	,	288249	]	,
        [	4230000	,	2.12	,	288247	]	,
        [	4229994	,	1.82	,	288245	]	,
        [	4229984	,	0.76	,	288240	]	,
        [	4229979	,	0.27	,	288238	]	,
        [	4229974	,	0.02	,	288236	]	,
        [	4229968	,	0.11	,	288234	]	,
        [	4229963	,	0.07	,	288233	]	,
        [	4229957	,	0.02	,	288232	]	,
        [	4229951	,	0.13	,	288230	]	,
        [	4229946	,	0.18	,	288229	]	,
        [	4229941	,	0.15	,	288229	]	,
        [	4229935	,	0.01	,	288228	]	,
        [	4229930	,	0.18	,	288228	]	,
        [	4229926	,	0.36	,	288228	]	,
        [	4229921	,	0.49	,	288227	]	,
        [	4229916	,	0.51	,	288227	]	,
        [	4229911	,	0.37	,	288227	]	,
        [	4229906	,	0.11	,	288226	]	,
        [	4229901	,	0.23	,	288226	]	,
        [	4229897	,	0.56	,	288225	]	,
        [	4229892	,	0.84	,	288224	]	,
        [	4229888	,	0.99	,	288222	]	,
        [	4229883	,	1.05	,	288220	]	,
        [	4229879	,	1.06	,	288218	]	,
        [	4229875	,	1.01	,	288216	]	,
        [	4229871	,	0.91	,	288213	]	,
        [	4229867	,	0.77	,	288211	]	,
        [	4229862	,	0.59	,	288209	]	,
        [	4229858	,	0.34	,	288207	]	,
        [	4229853	,	0.04	,	288205	]	,
        [	4229848	,	0.29	,	288204	]	,
        [	4229844	,	0.64	,	288202	]	,
        [	4229839	,	0.99	,	288201	]	,
        [	4229835	,	1.36	,	288200	]	,
        [	4229831	,	1.79	,	288198	]	,
        [	4229826	,	2.23	,	288197	]	,
        [	4229822	,	2.64	,	288196	]	,
        [	4229818	,	2.96	,	288195	]	,
        [	4229813	,	3.16	,	288194	]	,
        [	4229808	,	3.21	,	288192	]	,
        [	4229803	,	3.16	,	288191	]	,
        [	4229798	,	3.06	,	288190	]	,
        [	4229793	,	2.95	,	288189	]	,
        [	4229788	,	2.89	,	288187	]	,
        [	4229783	,	2.92	,	288186	]	,
        [	4229776	,	3.01	,	288184	]	,
        [	4229770	,	3.12	,	288182	]	,
        [	4229764	,	3.22	,	288180	]	,
        [	4229758	,	3.28	,	288178	]	,
        [	4229752	,	3.27	,	288176	]	,
        [	4229748	,	3.22	,	288175	]	,
        [	4229745	,	3.15	,	288173	]	,
        [	4229741	,	3.05	,	288172	]	,
        [	4229738	,	2.91	,	288171	]	,
        [	4229734	,	2.72	,	288170	]	,
        [	4229729	,	2.39	,	288168	]	,
        [	4229724	,	1.83	,	288165	]	,
        [	4229718	,	1.15	,	288163	]	,
        [	4229712	,	0.47	,	288160	]	,
        [	4229707	,	0.12	,	288157	]	,
        [	4229701	,	0.5	,	288154	]	,
        [	4229697	,	0.64	,	288153	]	,
        [	4229693	,	0.69	,	288151	]	,
        [	4229689	,	0.64	,	288150	]	,
        [	4229685	,	0.51	,	288148	]	,
        [	4229681	,	0.31	,	288147	]	,
        [	4229677	,	0.03	,	288145	]	,
        [	4229673	,	0.41	,	288144	]	,
        [	4229669	,	0.97	,	288142	]	,
        [	4229661	,	2.16	,	288138	]	,
        [	4229656	,	2.61	,	288137	]	,
        [	4229652	,	2.95	,	288135	]	,
        [	4229647	,	3.28	,	288133	]	,
        [	4229642	,	3.54	,	288131	]	,
        [	4229637	,	3.66	,	288129	]	,
        [	4229632	,	3.55	,	288126	]	,
        [	4229628	,	3.15	,	288124	]	,
        [	4229623	,	2.15	,	288121	]	,
        [	4229618	,	0.61	,	288117	]	,
        [	4229614	,	1.12	,	288113	]	,
        [	4229610	,	2.71	,	288109	]	,
        [	4229605	,	3.83	,	288106	]	,
        [	4229601	,	4.16	,	288103	]	,
        [	4229597	,	3.75	,	288100	]	,
        [	4229593	,	2.92	,	288098	]	,
        [	4229585	,	1.04	,	288093	]	,
        [	4229580	,	0.54	,	288091	]	,
        [	4229576	,	0.59	,	288089	]	,
        [	4229572	,	1.03	,	288086	]	,
        [	4229563	,	2.31	,	288082	]	,
        [	4229558	,	2.77	,	288080	]	,
        [	4229554	,	2.88	,	288078	]	,
        [	4229549	,	2.52	,	288074	]	,
        [	4229544	,	1.85	,	288071	]	,
        [	4229540	,	1.01	,	288068	]	,
        [	4229535	,	0.17	,	288064	]	,
        [	4229530	,	0.49	,	288061	]	,
        [	4229526	,	0.82	,	288059	]	,
        [	4229522	,	0.99	,	288057	]	,
        [	4229519	,	1.07	,	288056	]	,
        [	4229515	,	1.12	,	288054	]	,
        [	4229511	,	1.18	,	288053	]	,
        [	4229507	,	1.3	,	288052	]	,
        [	4229502	,	1.53	,	288051	]	,
        [	4229490	,	2.13	,	288051	]	,
        [	4229484	,	2.43	,	288051	]	,
        [	4229478	,	2.67	,	288050	]	,
        [	4229472	,	2.82	,	288050	]	,
        [	4229467	,	2.88	,	288049	]	,
        [	4229461	,	2.89	,	288048	]	,
        [	4229456	,	2.86	,	288046	]	,
        [	4229451	,	2.82	,	288045	]	,
        [	4229445	,	2.78	,	288045	]	,
        [	4229441	,	2.79	,	288045	]	,
        [	4229437	,	2.83	,	288046	]	,
        [	4229432	,	2.87	,	288047	]	,
        [	4229428	,	2.88	,	288048	]	,
        [	4229424	,	2.8	,	288049	]	,
        [	4229420	,	2.61	,	288050	]	,
        [	4229410	,	1.43	,	288051	]	,
        [	4229405	,	0.68	,	288051	]	,
        [	4229400	,	0.04	,	288050	]	,
        [	4229395	,	0.34	,	288050	]	,
        [	4229389	,	0.26	,	288050	]	,
        [	4229384	,	0.33	,	288049	]	,
        [	4229379	,	1.24	,	288049	]	,
        [	4229368	,	3.1	,	288047	]	,
        [	4229363	,	3.59	,	288047	]	,
        [	4229358	,	3.58	,	288047	]	,
        [	4229353	,	3.25	,	288047	]	,
        [	4229348	,	2.74	,	288048	]	,
        [	4229343	,	2.19	,	288048	]	,
        [	4229339	,	1.76	,	288048	]	,
        [	4229334	,	1.58	,	288048	]	,
        [	4229329	,	1.65	,	288048	]	,
        [	4229325	,	1.88	,	288047	]	,
        [	4229320	,	2.17	,	288046	]	,
        [	4229315	,	2.4	,	288046	]	,
        [	4229311	,	2.5	,	288045	]	,
        [	4229301	,	2.08	,	288045	]	,
        [	4229295	,	1.66	,	288045	]	,
        [	4229290	,	1.18	,	288045	]	,
        [	4229285	,	0.69	,	288045	]	,
        [	4229280	,	0.25	,	288045	]	,
        [	4229275	,	0.16	,	288045	]	,
        [	4229271	,	0.6	,	288045	]	,
        [	4229267	,	1.04	,	288045	]	,
        [	4229262	,	1.44	,	288044	]	,
        [	4229258	,	1.76	,	288044	]	,
        [	4229253	,	1.98	,	288044	]	,
        [	4229222	,	1.6	,	288042	]	,
        [	4229218	,	1.12	,	288042	]	,
        [	4229215	,	0.43	,	288041	]	,
        [	4229211	,	0.37	,	288041	]	,
        [	4229208	,	1.16	,	288041	]	,
        [	4229201	,	2.25	,	288040	]	,
        [	4229196	,	2.47	,	288039	]	,
        [	4229191	,	2.5	,	288039	]	,
        [	4229186	,	2.37	,	288038	]	,
        [	4229180	,	2.12	,	288038	]	,
        [	4229174	,	1.77	,	288037	]	,
        [	4229169	,	1.29	,	288037	]	,
        [	4229163	,	0.48	,	288036	]	,
        [	4229158	,	0.52	,	288036	]	,
        [	4229152	,	1.49	,	288036	]	,
        [	4229147	,	2.23	,	288035	]	,
        [	4229141	,	2.53	,	288035	]	,
        [	4229136	,	2.26	,	288035	]	,
        [	4229127	,	0.61	,	288034	]	,
        [	4229122	,	0.37	,	288034	]	,
        [	4229117	,	1.2	,	288034	]	,
        [	4229113	,	1.67	,	288034	]	,
        [	4229108	,	1.89	,	288034	]	,
        [	4229104	,	1.96	,	288035	]	,
        [	4229100	,	1.97	,	288035	]	,
        [	4229059	,	2.63	,	288035	]	,
        [	4229053	,	2.69	,	288035	]	,
        [	4229006	,	1.73	,	288035	]	,
        [	4229000	,	1.68	,	288035	]	,
        [	4228995	,	1.7	,	288036	]	,
        [	4228989	,	1.77	,	288037	]	,
        [	4228983	,	1.87	,	288037	]	,
        [	4228977	,	1.96	,	288038	]	,
        [	4228972	,	2.02	,	288038	]	,
        [	4228934	,	2.31	,	288036	]	,
        [	4228928	,	2.36	,	288036	]	,
        [	4228923	,	2.36	,	288035	]	,
        [	4228917	,	2.26	,	288035	]	,
        [	4228908	,	1.56	,	288035	]	,
        [	4228903	,	0.97	,	288034	]	,
        [	4228899	,	0.29	,	288034	]	,
        [	4228895	,	0.4	,	288033	]	,
        [	4228890	,	1.05	,	288033	]	,
        [	4228885	,	1.6	,	288033	]	,
        [	4228875	,	2.7	,	288034	]	,
        [	4228870	,	3.17	,	288035	]	,
        [	4228864	,	3.54	,	288035	]	,
        [	4228859	,	3.74	,	288036	]	,
        [	4228854	,	3.74	,	288036	]	,
        [	4228849	,	3.54	,	288037	]	,
        [	4228844	,	3.21	,	288037	]	,
        [	4228840	,	2.82	,	288038	]	,
        [	4228835	,	2.45	,	288038	]	,
        [	4228818	,	1.67	,	288038	]	,
        [	4228812	,	1.45	,	288038	]	,
        [	4228807	,	1.27	,	288037	]	,
        [	4228801	,	1.15	,	288037	]	,
        [	4228796	,	1.13	,	288037	]	,
        [	4228791	,	1.26	,	288037	]	,
        [	4228786	,	1.46	,	288036	]	,
        [	4228766	,	1.24	,	288036	]	,
        [	4228761	,	0.56	,	288037	]	,
        [	4228756	,	0.26	,	288038	]	,
        [	4228750	,	1.08	,	288039	]	,
        [	4228740	,	2.13	,	288040	]	,
        [	4228735	,	2.25	,	288040	]	,
        [	4228725	,	2.07	,	288040	]	,
        [	4228720	,	1.94	,	288040	]	,
        [	4228715	,	1.87	,	288040	]	,
        [	4228710	,	1.92	,	288040	]	,
        [	4228705	,	2.05	,	288039	]	,
        [	4228692	,	2.5	,	288038	]	,
        [	4228687	,	2.56	,	288038	]	,
        [	4228681	,	2.58	,	288038	]	,
        [	4228674	,	2.56	,	288039	]	,
        [	4228655	,	2.17	,	288042	]	,
        [	4228649	,	1.92	,	288042	]	,
        [	4228645	,	1.57	,	288042	]	,
        [	4228640	,	1.15	,	288042	]	,
        [	4228636	,	0.72	,	288041	]	,
        [	4228631	,	0.34	,	288041	]	,
        [	4228627	,	0.07	,	288041	]	,
        [	4228623	,	0.04	,	288041	]	,
        [	4228618	,	0.01	,	288041	]	,
        [	4228613	,	0.1	,	288042	]	,
        [	4228609	,	0.22	,	288042	]	,
        [	4228604	,	0.29	,	288043	]	,
        [	4228600	,	0.25	,	288043	]	,
        [	4228595	,	0.05	,	288043	]	,
        [	4228591	,	0.25	,	288043	]	,
        [	4228587	,	0.56	,	288043	]	,
        [	4228582	,	0.82	,	288043	]	,
        [	4228578	,	0.93	,	288043	]	,
        [	4228573	,	0.77	,	288043	]	,
        [	4228567	,	0.22	,	288043	]	,
        [	4228561	,	0.54	,	288042	]	,
        [	4228549	,	1.86	,	288042	]	,
        [	4228543	,	2	,	288042	]	,
        [	4228538	,	1.62	,	288042	]	,
        [	4228534	,	0.85	,	288043	]	,
        [	4228529	,	0.11	,	288044	]	,
        [	4228524	,	1.05	,	288045	]	,
        [	4228515	,	2	,	288046	]	,
        [	4228504	,	1.34	,	288045	]	,
        [	4228498	,	0.7	,	288045	]	,
        [	4228492	,	0.03	,	288044	]	,
        [	4228487	,	0.53	,	288044	]	,
        [	4228481	,	0.89	,	288044	]	,
        [	4228477	,	1.2	,	288045	]	,
        [	4228467	,	1.75	,	288046	]	,
        [	4228462	,	1.96	,	288046	]	,
        [	4228458	,	2.13	,	288046	]	,
        [	4228453	,	2.23	,	288045	]	,
        [	4228449	,	2.29	,	288044	]	,
        [	4228446	,	2.31	,	288043	]	,
        [	4228442	,	2.31	,	288042	]	,
        [	4228437	,	2.32	,	288041	]	,
        [	4228432	,	2.33	,	288041	]	,
        [	4228427	,	2.31	,	288042	]	,
        [	4228383	,	3.13	,	288042	]	,
        [	4228379	,	3.34	,	288041	]	,
        [	4228374	,	3.47	,	288041	]	,
        [	4228369	,	3.53	,	288041	]	,
        [	4228364	,	3.56	,	288041	]	,
        [	4228359	,	3.55	,	288041	]	,
        [	4228354	,	3.52	,	288041	]	,
        [	4228349	,	3.47	,	288041	]	,
        [	4228343	,	3.4	,	288041	]	,
        [	4228337	,	3.29	,	288041	]	,
      ]

      const crbJoint = new THREE.SphereGeometry( this.markPointSize * 0.05, 8, 8 );
      const crbJointMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff66 } );
      const srb = new THREE.Mesh( crbJoint, crbJointMaterial );
      landCrossPoints0909.forEach(item => {
        let clone = srb.clone()
        clone.position.set(item.x, item.y, item.z)
        this.scene.add(clone)
      })

      // let modelPipeLines =
      this.pipeListGroup.add(pipeGPSLine)
      this.pipeListGroup.add(verticalLines)
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

      // let deepList = [2.2, 1.5, 3.8, 1.2, 1.7, 2.2, 1.5, 2.0, 2.3, 2.7]
      // 地表点矫正线
      let part0901Lines = []

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
      // console.log(this.transformControls)
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
      // this.transformControls.attach( this.compareGroup );
      // this.transformControls.attach( this.group );
      // this.transformControls.attach( this.markGroup );
      this.transformControls.attach( this.baseGroup );
      // 变换控制
      this.scene.add(this.transformControls)
      /* ↑↑↑↑ 模型变换功能 ↑↑↑↑ */
    },
    animate() {
      // if(this.bloomComposer) {
      //   this.bloomComposer.render()
      // }
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
      // const bloomPass = new BloomPass(1.1, 25, 4.0, 256); //BloomPass通道效果
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.w, this.h), 1, 0.8, 0);
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
        // let intersects = raycaster.intersectObjects(this.compareGroup.children,true); // 标记地形
        // let intersects = raycaster.intersectObjects(this.compareGroup.children,true); // 标记地形
        // let intersects = raycaster.intersectObjects(this.group.children,true); // 标记地形
        // let intersects = raycaster.intersectObjects(this.gps0527Group.children,true); // 标记线
        let intersects = raycaster.intersectObjects(this.baseGroup.children[0].children,true); // 显示1、2坑数据
        // let intersects = raycaster.intersectObjects(this.markGroup.children,true); // 显示1、2坑数据
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
          this.scene.add( sphere );
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
    clearMeasureMark() {
      this.markList = []
    },
    queryBasePos() {
      console.log(this.baseGroup)
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
    .pip-deep-list {
      display flex
      .pdl-item {
        padding: 0 10px;
      }
    }
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
