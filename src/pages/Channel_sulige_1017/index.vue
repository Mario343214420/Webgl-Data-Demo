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
          <div class="btn" @click="ray">射线取点</div>
          <div class="btn" @click="rayCompare">射线取对比点</div>
<!--          <div class="btn" @click="markPointSize++">+</div>
          {{markPointSize}}
          <div class="btn" @click="markPointSize&#45;&#45;">-</div>-->
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
              x: <i class="x">{{Math.round(baseGroup.position.x)}}</i>,
              y: <i class="y">{{Math.round(baseGroup.position.y)}}</i>,
              z: <i class="z">{{baseGroup.position.z.toFixed(2)}}</i>
            </div>
            <div class="group">
              rotation: <br>
              x: <i class="x">{{Math.round(baseGroup.rotation.x)}}</i>,
              y: <i class="y">{{Math.round(baseGroup.rotation.y)}}</i>,
              z: <i class="z">{{baseGroup.rotation.z.toFixed(2)}}</i>
            </div>
            <div class="group">
              scale: <br>
              x: <i class="x">{{Math.round(baseGroup.scale.x)}}</i>,
              y: <i class="y">{{Math.round(baseGroup.scale.y)}}</i>,
              z: <i class="z">{{baseGroup.scale.z.toFixed(2)}}</i>
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
      pipeDeepList: [],
      pipeModelInfoList: []
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
      let cross = new THREE.Vector3(line1End[0] - line1Start[0], line1End[1] - line1Start[1], line1End[2] - line1Start[2]).cross(new THREE.Vector3(line2End[0] - line2Start[0], line2End[1] - line2Start[1], line2End[2] - line2Start[2]))
      let ang = new THREE.Vector3(line1End[0] - line1Start[0],line1End[1] - line1Start[1],line1End[2] - line1Start[2]).normalize().angleTo(new THREE.Vector3(line2End[0] - line2Start[0],line2End[1] - line2Start[1],line2End[2] - line2Start[2]).normalize())
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
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      const material = new THREE.LineBasicMaterial( { color: 0x6eff0f } );
      const splineObject = new THREE.Line( geometry, material );
      return splineObject
    },
    // 生成粗线体
    creatFatLine (points, color, lineWidth) {
      const material = new THREE.MeshBasicMaterial( { color } );
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
      this.camera.position.z = 1277
      this.camera.lookAt(new THREE.Vector3(0,-1, 0));
      const fbxLoader = new FBXLoader()
      let list1017 = [
        [
          'Tile_+001_+001',
          'Tile_+001_+002',
          'Tile_+001_+003',
          'Tile_+001_+004',
          'Tile_+001_+005',
          'Tile_+001_+006',
          'Tile_+001_+007',
          'Tile_+001_+008',
          'Tile_+001_+009',
          'Tile_+001_+010',
          'Tile_+001_+011',
          'Tile_+001_+012',
          'Tile_+001_+013',
          'Tile_+001_+014',
          'Tile_+001_+015',
          'Tile_+001_+016',
          'Tile_+001_+017',
          'Tile_+001_+018',
          'Tile_+001_+019',
          'Tile_+001_+020',
          'Tile_+001_+021',
          'Tile_+001_+022',
          'Tile_+001_+023',
          'Tile_+001_+024',
          'Tile_+001_+025',
          'Tile_+001_+026'
        ],
        [
          'Tile_+002_+001',
          'Tile_+002_+002',
          'Tile_+002_+003',
          'Tile_+002_+004',
          'Tile_+002_+005',
          'Tile_+002_+006',
          'Tile_+002_+007',
          'Tile_+002_+008',
          'Tile_+002_+009',
          'Tile_+002_+010',
          'Tile_+002_+011',
          'Tile_+002_+012',
          'Tile_+002_+013',
          'Tile_+002_+014',
          'Tile_+002_+015',
          'Tile_+002_+016',
          'Tile_+002_+017',
          'Tile_+002_+018',
          'Tile_+002_+019',
          'Tile_+002_+020',
          'Tile_+002_+021',
          'Tile_+002_+022',
          'Tile_+002_+023',
          'Tile_+002_+024',
          'Tile_+002_+025',
          'Tile_+002_+026'
        ],
        [
          'Tile_+003_+001',
          'Tile_+003_+002',
          'Tile_+003_+003',
          'Tile_+003_+004',
          'Tile_+003_+005',
          'Tile_+003_+006',
          'Tile_+003_+007',
          'Tile_+003_+008',
          'Tile_+003_+009',
          'Tile_+003_+010',
          'Tile_+003_+011',
          'Tile_+003_+012',
          'Tile_+003_+013',
          'Tile_+003_+014',
          'Tile_+003_+015',
          'Tile_+003_+016',
          'Tile_+003_+017',
          'Tile_+003_+018',
          'Tile_+003_+019',
          'Tile_+003_+020',
          'Tile_+003_+021',
          'Tile_+003_+022',
          'Tile_+003_+023',
          'Tile_+003_+024',
          'Tile_+003_+025',
          'Tile_+003_+026'
        ]
      ]
      let list1017Pipe = [
        [
          'Tile_+001_+001',
          'Tile_+001_+002',
          'Tile_+001_+003',
          'Tile_+001_+004',
          'Tile_+001_+005',
          'Tile_+001_+006',
          'Tile_+001_+007',
          'Tile_+001_+008',
          'Tile_+001_+009',
          'Tile_+001_+010',
          'Tile_+001_+011',
          'Tile_+001_+012',
          'Tile_+001_+013',
          'Tile_+001_+014',
          'Tile_+001_+015',
          'Tile_+001_+016',
          'Tile_+001_+017',
        ],
        [
          'Tile_+002_+001',
          'Tile_+002_+002',
          'Tile_+002_+003',
          'Tile_+002_+004',
          'Tile_+002_+005',
          'Tile_+002_+006',
          'Tile_+002_+007',
          'Tile_+002_+008',
          'Tile_+002_+009',
          'Tile_+002_+010',
          'Tile_+002_+011',
          'Tile_+002_+012',
          'Tile_+002_+013',
          'Tile_+002_+014',
          'Tile_+002_+015',
          'Tile_+002_+016',
          'Tile_+002_+017',
          'Tile_+002_+018',
          'Tile_+002_+019',
          'Tile_+002_+020',
          'Tile_+002_+025',
          'Tile_+002_+026',
          'Tile_+002_+027'
        ],
        [
          'Tile_+003_+017',
          'Tile_+003_+018',
          'Tile_+003_+019',
          'Tile_+003_+020',
          'Tile_+003_+021',
          'Tile_+003_+022',
          'Tile_+003_+023',
          'Tile_+003_+024',
          'Tile_+003_+025',
          'Tile_+003_+026',
        ]
      ]
      // let modelStep = [6, 25]
      let modelStep = [6, 20]
      // let simpleBaseUrl = './models/'
      let simpleBaseUrl = 'http://192.168.1.87:8000'
      // 载入所有模型
      let compareInnerGroup = new THREE.Group()
      let loadAllModel = (arr, innerDir) => {
        arr.forEach((item, index) => {
          item.forEach((modelPath, i) => {
            if(i <= modelStep[1] && i >= modelStep[0]) {
              // renderPartArea(modelPath, simpleBaseUrl)
              let url = `${simpleBaseUrl}/${innerDir}/${modelPath}/${modelPath}.fbx`
              fbxLoader.load(url, fbx => {
                const mesh = fbx.children[0].clone()
                mesh.name = modelPath
                mesh.position.z -= 1220
                compareInnerGroup.add(mesh)
              })
            }
            // if(i <= modelStep[1] && i >= modelStep[0]) {
            //   let url = `${simpleBaseUrl}/0825_simple/${modelPath}/${modelPath}.fbx`
            //   fbxLoader.load(url, fbx => {
            //     const mesh = fbx.children[0].clone()
            //     mesh.name = modelPath
            //     mesh.position.z -= 1220
            //     this.group.add(mesh)
            //   })
            // }
          })
        })
      }
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
          // "Tile_+001_+019",
          // "Tile_+001_+020",
          // "Tile_+001_+021",
          // "Tile_+001_+022",
          // "Tile_+001_+023",
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
      const list0901 = [
        [
          'Tile_+000_+000',
          'Tile_+000_+001',
          'Tile_+000_+002',
          'Tile_+000_+003',
          'Tile_+000_+004',
          'Tile_+000_+005',
          'Tile_+000_+006',
          'Tile_+000_+007',
          'Tile_+000_+008',
          'Tile_+000_+009',
          'Tile_+000_+010',
          'Tile_+000_+011',
          'Tile_+000_+012',
          'Tile_+000_+013',
          'Tile_+000_+014',
          'Tile_+000_+015',
          'Tile_+000_+016',
          'Tile_+000_+017',
          'Tile_+000_+018',
          'Tile_+000_+019',
          'Tile_+000_+020',
          'Tile_+000_+021',
          'Tile_+000_+022',
          'Tile_+000_+023',
          'Tile_+000_+024',
          'Tile_+000_+025',
        ],
        [
          'Tile_+001_+000',
          'Tile_+001_+001',
          'Tile_+001_+002',
          'Tile_+001_+003',
          'Tile_+001_+004',
          'Tile_+001_+005',
          'Tile_+001_+006',
          'Tile_+001_+007',
          'Tile_+001_+008',
          'Tile_+001_+009',
          'Tile_+001_+010',
          'Tile_+001_+011',
          'Tile_+001_+012',
          'Tile_+001_+013',
          'Tile_+001_+014',
          'Tile_+001_+015',
          'Tile_+001_+016',
          'Tile_+001_+017',
          'Tile_+001_+018',
          'Tile_+001_+019',
          'Tile_+001_+020',
          'Tile_+001_+021',
          'Tile_+001_+022',
          'Tile_+001_+023',
          'Tile_+001_+024',
          'Tile_+001_+025',
        ],
        [
          'Tile_+002_+000',
          'Tile_+002_+001',
          'Tile_+002_+002',
          'Tile_+002_+003',
          'Tile_+002_+004',
          'Tile_+002_+005',
          'Tile_+002_+006',
          'Tile_+002_+007',
          'Tile_+002_+008',
          'Tile_+002_+009',
          'Tile_+002_+010',
          'Tile_+002_+011',
          'Tile_+002_+012',
          'Tile_+002_+013',
          'Tile_+002_+014',
          'Tile_+002_+015',
          'Tile_+002_+016',
          'Tile_+002_+017',
          'Tile_+002_+018',
          'Tile_+002_+019',
          'Tile_+002_+020',
          'Tile_+002_+021',
          'Tile_+002_+022',
          'Tile_+002_+023',
          'Tile_+002_+024',
          'Tile_+002_+025',
        ],
        [
          'Tile_+003_+001',
          'Tile_+003_+002',
          'Tile_+003_+006',
          'Tile_+003_+007',
          'Tile_+003_+008',
          'Tile_+003_+009',
          'Tile_+003_+010',
          'Tile_+003_+011',
          'Tile_+003_+012',
          'Tile_+003_+013',
          'Tile_+003_+014',
          'Tile_+003_+015',
          'Tile_+003_+016',
          'Tile_+003_+017',
          'Tile_+003_+018',
          'Tile_+003_+019',
          'Tile_+003_+020',
          'Tile_+003_+021',
          'Tile_+003_+022',
          'Tile_+003_+023',
          'Tile_+003_+024',
          'Tile_+003_+025'
        ]
      ]
      function loadModelList(arr, baseUrl, innerDir) {
        let group = new THREE.Group()
        for (let i = 0; i < arr.length; i++) {
          let row = arr[i]
          for (let idx = 0; idx < row.length; idx++) {
            let cell = row[idx]
            fbxLoader.load(`${baseUrl}/${innerDir}/${cell}/${cell}.fbx`, fbx => {
              const mesh = fbx.children[0].clone()
              mesh.name = cell
              // 1508.727, 1277.447, 95.806
              mesh.rotation.set(-Math.PI / 2, 0, 0)
              mesh.position.y -= 1200
              group.add(mesh)
            })
          }
        }
        return group
      }
      // this.baseGroup = loadModelList(list0901, simpleBaseUrl, '0901_simple')
      this.compareGroup = loadModelList(list1017Pipe, simpleBaseUrl, '1017_simple')
      // this.scene.add(this.baseGroup)
      this.scene.add(this.compareGroup)
      // 地形
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
      // console.log(this.transformControls.getWorldPosition())
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
      // this.transformControls.attach( this.baseGroup );
      // 变换控制
      // this.scene.add(this.transformControls)
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
        let intersects = raycaster.intersectObjects(this.compareGroup.children,true); // 标记地形
        // let intersects = raycaster.intersectObjects(this.compareGroup.children,true); // 标记地形
        // let intersects = raycaster.intersectObjects(this.group.children,true); // 标记地形
        // let intersects = raycaster.intersectObjects(this.gps0527Group.children,true); // 标记线
        // let intersects = raycaster.intersectObjects(this.pipeListGroup.children,true); // 投影线标记
        // let intersects = raycaster.intersectObjects(this.baseGroup.children[0].children,true); // 显示1、2坑数据
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
          const geometry = new THREE.SphereGeometry( 0.05, 8, 8 );
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
    },
    ray() {
      /* const pos = this.pipeModelInfoList[0]
      const _self = this
      function test (x, y, z, aspect, pointSize) {
        const crbJoint = new THREE.SphereGeometry( pointSize, 8, 8 );
        const crbJointMaterial = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
        const srb = new THREE.Mesh( crbJoint, crbJointMaterial );

        const rayDirection  = new THREE.Vector3(0, 1, 0)
        let camera = new THREE.PerspectiveCamera(50, aspect, 1, 5000)
        camera.position.set(x, y, z)
        camera.lookAt(rayDirection);
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera( {x: 0, y: 0}, camera );
        let intersects = raycaster.intersectObjects(_self.baseGroup.children[0].children,true);
        // const intersect = raycaster.intersectObject(this.baseGroup.children, true)
        console.log(intersects)
        let group = new THREE.Group()
        intersects.forEach(item => {
          let clone = srb.clone()
          clone.position.set(item.point.x, item.point.y, item.point.z)
          group.add(clone)
        })
        return group
      }

      this.baseGroup.add(test(pos.x, pos.y, pos.z, this.w / this.h, 10)) */
      this.pipeModelInfoList.forEach((item, index) => {
        const rayOrigin = new THREE.Vector3(item.x, item.y + 40, item.z)
        const rayDirection  = new THREE.Vector3(0, -1, 0)
        // let camera = new THREE.PerspectiveCamera(50, this.w / this.h, 1, 5000)
        // camera.position.set(item.x, item.y, item.z)
        // camera.lookAt(rayDirection);
        const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, 200)
        // raycaster.setFromCamera( {x: 0, y: 0}, camera );
        let intersects = raycaster.intersectObjects(this.baseGroup.children[0].children,true);
        // const intersect = raycaster.intersectObject(this.baseGroup.children, true)
        this.pipeDeepList[index] = [item.x, intersects[0].point.y - item.y, item.z]
      })
    },
    rayCompare() {
      this.pipeModelInfoList.forEach((item, index) => {
        const rayOrigin = new THREE.Vector3(item.x, item.y + 40, item.z)
        const rayDirection  = new THREE.Vector3(0, -1, 0)
        // let camera = new THREE.PerspectiveCamera(50, this.w / this.h, 1, 5000)
        // camera.position.set(item.x, item.y, item.z)
        // camera.lookAt(rayDirection);
        const raycaster = new THREE.Raycaster(rayOrigin, rayDirection, 0, 200)
        // raycaster.setFromCamera( {x: 0, y: 0}, camera );
        let intersects = raycaster.intersectObjects(this.compareGroup.children[0].children,true);
        // const intersect = raycaster.intersectObject(this.baseGroup.children, true)
        this.pipeDeepList[index] = [item.x, intersects[0].point.y - item.y, item.z]
      })
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
