<template>
  <div class="summary" flex>
    <Panel>
      <template slot="inner">
        <div flex="main:justify dir:top" style="height: 100%;">
          <Card>
            <template slot="title">
              <span>本月数据分析</span>
            </template>
            <template slot="content">
              <div flex="main:justify">
              <span class="count-wrapper-item" flex="main:justify dir:top">
              <img src="~@/assets/images/summary/icon_01.png" alt="">
              <i class="font">归集数量</i>
              <i class="num">560</i>
            </span>
                <span class="count-wrapper-item" flex="main:justify dir:top">
              <img src="~@/assets/images/summary/icon_02.png" alt="">
              <i class="font">归集数量</i>
              <i class="num">560</i>
            </span>
                <span class="count-wrapper-item" flex="main:justify dir:top">
              <img src="~@/assets/images/summary/icon_03.png" alt="">
              <i class="font">归集数量</i>
              <i class="num">560</i>
            </span>
              </div>
            </template>
          </Card>
          <Card>
            <template slot="title">
              <span>资源信息分类统计</span>
            </template>
            <template slot="content">
              <div flex="main:justify">
              <span class="count-wrapper-item" flex="main:justify dir:top">
              <i class="font">一级分类（个）</i>
              <i class="num">560</i>
            </span>
                <span class="count-wrapper-item" flex="main:justify dir:top">
              <i class="font">二级分类（个）</i>
              <i class="num">560</i>
            </span>
                <span class="count-wrapper-item" flex="main:justify dir:top">
              <i class="font">资源数（个）</i>
              <i class="num">560</i>
            </span>
                <span class="count-wrapper-item" flex="main:justify dir:top">
              <i class="font">部门数（个）</i>
              <i class="num">560</i>
            </span>
              </div>
              <div>
                <chart ref="chart1" :options="classify" style="width: 100%; height: 220px;"></chart>
              </div>
            </template>
          </Card>
          <Card>
            <template slot="title">
              <div flex="main:justify">
                <span>资源信息分类统计</span>
                <span class="handle-date" flex="main:justify">
                <i class="tab" :class="dateTab === 0 ? 'active' : ''" @click="dateTab = 0">本月</i>
                <i class="tab" :class="dateTab === 1 ? 'active' : ''" @click="dateTab = 1">本年</i>
                <b-date-picker
                  placement="bottom-end"
                  :open="open"
                  :value="date"
                  confirm
                  @on-change="handleChange"
                  @on-clear="handleClear"
                  @on-ok="handleOk">
                    <a href="javascript:void(0)" @click="handleClick">
                      <template v-if="date === ''">请选择日期</template>
                      <template v-else>{{ date }}</template>
                    </a>
                  </b-date-picker
                  >
              </span>
              </div>
            </template>
            <template slot="content">
              <div class="table">
                <div class="table-row" flex="main:justify">
                  <span>部门名称</span>
                  <span>轨迹数量（个）</span>
                  <span>占比</span>
                </div>
                <div class="table-row" v-for="(item, index) in classifyList" :key="index" flex="main:justify">
                  <span>{{ item.name }}</span>
                  <span>{{ item.count }}</span>
                  <span>{{ item.percent }}%</span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Panel>
    <Panel style="padding-left: 0; padding-right: 0;" flex="main:justify dir:top">
      <template slot="outer">
        <div flex="dir:top" style="width: 100%;">
          <div class="outer-wrapper">
            <div class="tip-wrapper" flex="space:around">
              <div class="tip-item">
                <div class="tip-item-inner" flex="space:around cross:center">
                  <img src="~@/assets/images/summary/icon_zyxx.png" alt="">
                  <span class="tip-item-font">
                  <i>资源信息数量</i><br>
                  <i class="num">16,589</i><i>（个）</i>
                </span>
                </div>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
              </div>
              <div class="tip-item">
                <div class="tip-item-inner" flex="space:around cross:center">
                  <img src="~@/assets/images/summary/icon_sjgj.png" alt="">
                  <span class="tip-item-font">
                  <i>资源信息数量</i><br>
                  <i class="num">16,589</i><i>（个）</i>
                </span>
                </div>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
              </div>
              <div class="tip-item">

                <div class="tip-item-inner" flex="space:around cross:center">
                  <img src="~@/assets/images/summary/icon_bygj.png" alt="">
                  <span class="tip-item-font">
                  <i>资源信息数量</i><br>
                  <i class="num">16,589</i><i>（个）</i>
                </span>
                </div>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
              </div>
            </div>
          </div>
          <div class="outer-wrapper">
            <div id="map"></div>
            <div class="mask-cir-container">
              <div class="mask-inner">
                <div class="rotate-cir-1"></div>
                <div class="rotate-cir-2"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Panel>
    <Panel>
      <template slot="inner">
        <div flex="main:justify dir:top" style="height: 100%;">
          <Card>
            <template slot="title">
              <span>数据归集来源对比</span>
            </template>
            <template slot="content">
              <chart ref="chart3" :options="rose" style="width: 100%; height: 280px;"></chart>
            </template>
          </Card>
          <Card>
            <template slot="title">
              <div flex="main:justify">
                <span>数据归集来源对比</span>
                <span class="handle-date" flex="main:justify">
                  <i class="tab active" v-show="dateTab === 0" @click="dateTab = 1"><i class="iconfont icon-ios-repeat"
                                                                                       style="color: #00cbfe; font-size: 18px; vertical-align: top"></i>法人</i>
                  <i class="tab active" v-show="dateTab === 1" @click="dateTab = 0"><i class="iconfont icon-ios-repeat"
                                                                                       style="color: #00cbfe; font-size: 18px; vertical-align: top"></i>自然人</i>
                </span>
              </div>
            </template>
            <template slot="content">
              <chart ref="chart4" :options="pie" style="width: 100%; height: 280px;"></chart>
            </template>
          </Card>
          <Card>
            <template slot="title">
              <span>最新填报部门</span>
            </template>
            <template slot="content">
              <div class="table">
                <div class="table-row" flex="main:justify">
                  <span>部门名称</span>
                  <span>资源信息</span>
                </div>
                <div class="table-row" v-for="(item, index) in newClassifyList" :key="index" flex="main:justify">
                  <span>{{ item.name }}</span>
                  <span>{{ item.count }}</span>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Panel from '../../../components/Panel/Panel'
  import Card from '../../../components/Card/Card'
  import 'echarts/map/js/china'
  // 统一变量
  const xyLineColor = '#535e83'
  const splitLineColor = '#283353'
  export default {
    name: 'SummaryMap',
    data() {
      return {
        classify: {
          color: '#00abfb',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '6%',
            top: '3%',
            containLabel: true
          },
          dataset: {
            source: [
              ['product', '辅助', '生活费'],
              ['基础信息', 0, 100],
              ['业务信息', 100, 100],
              ['司法信息', 200, 100],
              ['行政执法信息', 300, 100],
              ['公共事业信息', 400, 100],
              ['信用评级信息', 500, 100],
              ['其他信息', 600, 100],
              ['累计', 0, 700]
            ]
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              lineStyle: {
                color: xyLineColor
              }
            },
            splitLine: { lineStyle: { color: splitLineColor } }
          },
          yAxis: {
            type: 'category',
            data: ['基础信息', '业务信息', '司法信息', '行政执法信息', '公共事业信息', '信用评级信息', '其他信息'],
            axisLine: {
              lineStyle: {
                color: xyLineColor
              }
            },
            inverse: true
          },
          series: [
            {
              type: 'bar',
              showBackground: true,
              barWidth: 10,
              itemStyle: {
                barBorderRadius: 8,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: '#2380f2' },
                    { offset: 1, color: '#39BBF3' }
                  ]
                )
              },
              data: [1100, 800, 550, 350, 200, 100, 80]
            }
          ]
        },
        open: false,
        date: '',
        dateTab: 0,
        classifyList: [
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 }
        ],
        newClassifyList: [
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 }
        ],
        trend: {
          color: ['#02b7f4', '#2646c5'],
          title: {
            text: '资源信息归集趋势',
            textStyle: { color: '#fff' }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              position: 'left',
              splitLine: { lineStyle: { color: splitLineColor } },
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'value',
              name: '(个)',
              max: 500
            },
            {
              position: 'right',
              splitLine: { lineStyle: { color: splitLineColor } },
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'value',
              name: '(个)',
              max: 500
            }
          ],
          series: [
            {
              smooth: true,
              name: '奖',
              type: 'line',
              areaStyle: {},
              yAxisIndex: 1,
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              smooth: true,
              name: '惩',
              type: 'line',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            }
          ]
        },
        rose: {
          color: ['#fbd860', '#35afc6', '#1f74f1', '#00cbfe'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: '面积模式',
              type: 'pie',
              radius: [30, 100],
              center: ['50%', '50%'],
              roseType: 'area',
              data: [
                { value: 10, name: '手工填报' },
                { value: 5, name: 'et对接' },
                { value: 15, name: '内部接口' },
                { value: 25, name: '其他' }
              ]
            }
          ]
        },
        pie: {
          color: ['#553cff', '#fe3b3c', '#fb952f', '#4dcea7', '#00ccff', '#0e31e3', '#1167e2'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '65%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                color: '#fff',
                lineHeight: 20,
                align: 'center',
                formatter: p => p.name + '\n' + p.value + '（个）'
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '业务信息' },
                { value: 310, name: '司法信息' },
                { value: 234, name: '行政执法信息' },
                { value: 235, name: '信用评价信息' },
                { value: 248, name: '公共事业信息' },
                { value: 248, name: '其他信息' },
                { value: 248, name: '基本信息' }
              ]
            },
            {
              name: '访问来源',
              type: 'pie',
              radius: ['0', '40%'],
              avoidLabelOverlap: false,
              label: {
                align: 'center',
                show: true,
                position: 'center',
                color: '#fff',
                lineHeight: 20,
                formatter: p => p.name + '\n  ' + p.value + '（个）'
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '直接访问' }
              ]
            }
          ]
        }
      }
    },
    methods: {
      handleClick() {
        this.open = !this.open
      },
      handleChange(date) {
        this.date = date
      },
      handleClear() {
        this.open = false
      },
      handleOk() {
        this.open = false
      },
      renderBall() {
        function render() {
          const container = document.getElementById('cvsBg')
          const w = container.clientWidth
          const h = container.clientHeight
          const cameraDeg = 45
          const aspect = w / h
          const near = 0.1
          const far = 10000
          const renderer = new THREE.WebGLRenderer({ alpha: true })
          const camera = new THREE.PerspectiveCamera(
            cameraDeg, aspect, near, far
          )

          const scene = new THREE.Scene()
          renderer.setClearColor(0xffffff, 0)
          renderer.setSize(w, h)

          // 附加DOM元素
          container.append(renderer.domElement)

          // 设置球体的值
          let radius = 72
          let segemnt = 60
          let rings = 60
          let sphereGeometry = new THREE.SphereGeometry(radius, segemnt, rings)
          let pMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            vertexColors: true,
            size: 1
          })
          let sphere = new THREE.Mesh(
            sphereGeometry
          )

          let particleSystem = new THREE.Points(sphereGeometry, pMaterial)

          // let pivotPoint = new THREE.Object3D();// 3d效果
          // sphere.castShadow = sphere.receiveShadow = true
          // sphere.rotation.x = 45
          // sphere.position.x = 0
          // sphere.position.y = 0
          // sphere.add(pivotPoint)// 球 添加3d效果

          let spotLight = new THREE.SpotLight('#ffffff')
          spotLight.position.set(-50, 50, 150)
          spotLight.castShadow = true
          spotLight.target = sphere
          spotLight.distance = 0
          spotLight.angle = 0.8

          let helper = new THREE.DirectionalLightHelper(spotLight, 50, 0xFFFFFF)

          camera.position.x = 0
          camera.position.y = 0
          camera.position.z = 400
          camera.lookAt(scene.position)

          scene.add(camera)
          scene.add(spotLight)
          scene.add(particleSystem)
          // scene.add(sphere)
          // scene.add(helper)

          function animate() {
            requestAnimationFrame(animate)
            particleSystem.rotation.y += 0.001
            renderer.render(scene, camera)
          }

          animate()
        }

        let init = () => {
          render()
        }
        init()
        window.onresize = init
      },
      renderMap(paramObj) {
        var effect = '#06eaed'
        var flyLine = '#ffffff'
        var border = '#105689'
        var bg = 'rgba(2,10,34,0.8)'
        var bg1 = '#040c22'
        var chinaGeoCoordMap = {
          '黑龙江': [126.642464, 47.756967],
          '内蒙古': [110.3467, 41.4899],
          '吉林': [125.8154, 44.2584],
          '北京市': [116.4551, 40.2539],
          '徐州市': [117.192941, 34.269397],
          '辽宁': [123.1238, 42.1216],
          '河北': [115.4995, 38.1006],
          '天津': [117.4219, 39.4189],
          '山西': [112.3352, 37.9413],
          '陕西': [109.1162, 34.2004],
          '甘肃': [103.5901, 36.3043],
          '宁夏': [106.3586, 38.1775],
          '青海': [97.4038, 36.8207],
          '新疆': [87.617733, 43.792818],
          '西藏': [91.11, 29.97],
          '四川': [103.9526, 30.7617],
          '重庆': [108.384366, 30.439702],
          '山东': [117.1582, 36.8701],
          '河南': [113.4668, 34.6234],
          '江苏': [119.9062, 33.2208],
          '安徽': [117.29, 32.0581],
          '湖北': [114.3896, 30.6628],
          '浙江': [119.5313, 29.8773],
          '福建': [117.4543, 25.9222],
          '江西': [116.0046, 28.6633],
          '湖南': [113.0823, 28.2568],
          '贵州': [106.6992, 26.7682],
          '广东': [113.12244, 23.009505],
          '广西': [108.479, 23.1152],
          '海南': [110.3893, 19.8516],
          '上海': [121.4648, 31.2891],
          '云南': [102.712251, 25.040609]
        }
        var chinaDatas = [
          [{
            name: '黑龙江',
            value: 1
          }], [{
            name: '北京市',
            value: 3
          }], [{
            name: '内蒙古',
            value: 1
          }], [{
            name: '吉林',
            value: 1
          }], [{
            name: '辽宁',
            value: 1
          }], [{
            name: '河北',
            value: 2
          }], [{
            name: '天津',
            value: 2
          }], [{
            name: '山西',
            value: 1
          }], [{
            name: '陕西',
            value: 1
          }], [{
            name: '甘肃',
            value: 1
          }], [{
            name: '宁夏',
            value: 1
          }], [{
            name: '青海',
            value: 1
          }], [{
            name: '新疆',
            value: 1
          }], [{
            name: '西藏',
            value: 1
          }], [{
            name: '四川',
            value: 2
          }], [{
            name: '重庆',
            value: 2
          }], [{
            name: '山东',
            value: 1
          }], [{
            name: '河南',
            value: 1
          }], [{
            name: '江苏',
            value: 2
          }], [{
            name: '安徽',
            value: 1
          }], [{
            name: '湖北',
            value: 2
          }], [{
            name: '浙江',
            value: 2
          }], [{
            name: '福建',
            value: 2
          }], [{
            name: '江西',
            value: 1
          }], [{
            name: '湖南',
            value: 2
          }], [{
            name: '贵州',
            value: 1
          }], [{
            name: '广西',
            value: 1
          }], [{
            name: '海南',
            value: 2
          }], [{
            name: '上海',
            value: 3
          }], [{
            name: '云南',
            value: 1
          }]
        ]
        var convertData = function (data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i]
            var fromCoord = chinaGeoCoordMap[dataItem[0].name]
            // 中心点坐标
            var toCoord = [117.192941, 34.269397]
            if (fromCoord && toCoord) {
              res.push([
                {
                  coord: fromCoord,
                  value: dataItem[0].value
                },
                {
                  coord: toCoord
                }
              ])
            }
          }
          return res
        }
        var series = [];
        [['徐州市', chinaDatas]].forEach(function (item, i) {
          series.push(
            {
              type: 'lines',
              tooltip: { show: false },
              zlevel: 1,
              effect: {
                show: true,
                period: 5, // 箭头指向速度，值越小速度越快
                trailLength: 0.1, // 特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow',
                symbolSize: [5, 10] // 图标大小
              },
              lineStyle: {
                color: flyLine,
                width: 1, // 尾迹线条宽度
                opacity: 0.1, // 尾迹线条透明度
                curveness: 0.8 // 尾迹线条曲直度
              },
              data: convertData(item[1])
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: { // 涟漪特效
                period: 4, // 动画时间，值越小速度越快
                brushType: 'stroke', // 波纹绘制方式 stroke, fill
                scale: 3 // 波纹圆环最大限制，值越大波纹越大
              },
              label: {
                normal: {
                  show: true,
                  position: 'right', // 显示位置
                  offset: [8, 0], // 偏移设置
                  // 圆环显示文字
                  formatter: function (params) {
                    return params.data.name
                  },
                  fontSize: 13
                },
                emphasis: {
                  show: false
                }
              },
              symbol: 'circle',
              symbolSize: function (val) {
                return 8 + val[2] * 2 // 圆环大小
              },
              itemStyle: {
                normal: {
                  show: false,
                  color: effect
                }
              },
              data: item[1].map(function (dataItem) {
                return {
                  name: dataItem[0].name,
                  value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                }
              })
            },
            // 标的点
            {
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                period: 4,
                brushType: 'stroke',
                scale: 2
              },
              label: {
                textBorderColor: '#000',
                show: true,
                position: 'right',
                // offset:[5, 0],
                color: '#00d0ff',
                formatter: '{b}',
                textStyle: {
                  fontSize: 22,
                  color: '#fff'
                },
                // textShadowColor:'#fff',
                // textShadowBlur:2,
                emphasis: {
                  show: true,
                  color: '#f60'
                }
              },
              symbol: 'pin',
              symbolSize: 30,
              data: [{
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10])
              }]
            }
          )
        })
        var option = {
          tooltip: {
            trigger: 'item',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function (params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = ''
              var name = params.name
              var value = params.value[params.seriesIndex + 1]
              res = '<span style=\'color:#fff;\'>' + name + '</span><br/>数据：' + value
              return res
            }
          },
          geo: {
            map: 'china',
            zoom: 1.2,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: false, // 是否允许缩放
            itemStyle: {
              normal: {
                color: 'rgba(51, 69, 89, 0.2)', // 地图背景色
                // color:'#0f1d37',
                borderColor: border, // 省市边界线00fcff 516a89
                borderWidth: 1,
                shadowColor: bg,
                shadowBlur: 4
              },
              emphasis: {
                color: 'rgba(37, 43, 61, .5)' // 悬浮背景
              }
            }
          },
          series: series
        }
        var chart = echarts.init(document.getElementById(paramObj.id))
        chart.setOption(option)
      }
    },
    mounted() {
      // this.renderBall()
      this.renderMap({ id: 'map' })
    },
    components: {
      Panel,
      Card
    }
  }
</script>

<style lang="stylus" scoped>
  $fontColor = #02cbff
  $bdw = 2px
  $bdh = 2px
  .green-font
    color #05f2e4

  [flex~="space:around"] {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-around;
    -ms-flex-pack: justify;
    justify-content: space-around
  }

  .summary
    height: 1000px
    padding 20px 0
    box-sizing border-box

    > div
      &:nth-child(1)
        width 460px
        padding-right: 0

      &:nth-child(2)
        width calc(100% - 920px)

      &:nth-child(3)
        width 460px
        padding-left: 0

    .panel:nth-child(2)
      >>> .light-bg
        display none
        flex none

      .outer-wrapper
        width: 100%
        height: 100px
        position relative
        &:nth-child(2)
          height: 860px
          background-image: url('~@/assets/images/map/map_bg.png')
          background-repeat: no-repeat
          background-position: center bottom
          position relative
      #map
        width: 100%
        height: 100%
        position relative
        z-index 5
      .tip-wrapper
        position absolute
        top: 0
        left: 0
        width: 100%

        .tip-item
          width: 28%
          height: 100px
          background-image: url('~@/assets/images/summary/data_bg.png')
          position relative

          .light-corner
            content: ''
            display block
            position absolute
            width 8px
            height: 8px

            &:nth-of-type(1)
              top: 0
              left: 0
              border-top: $bdh solid $fontColor
              border-left: $bdw solid $fontColor
              -webkit-border-radius: 2px 0 0 0
              -moz-border-radius: 2px 0 0 0
              border-radius: 2px 0 0 0

            &:nth-of-type(2)
              top: 0
              right: 0
              border-top: $bdh solid $fontColor
              border-right: $bdw solid $fontColor
              -webkit-border-radius: 0 2px 0 0
              -moz-border-radius: 0 2px 0 0
              border-radius: 0 2px 0 0

            &:nth-of-type(3)
              bottom: 0
              left: 0
              border-bottom: $bdh solid $fontColor
              border-left: $bdw solid $fontColor
              -webkit-border-radius: 0 0 0 2px
              -moz-border-radius: 0 0 0 2px
              border-radius: 0 0 0 2px

            &:nth-of-type(4)
              bottom: 0
              right: 0
              border-bottom: $bdh solid $fontColor
              border-right: $bdw solid $fontColor
              -webkit-border-radius: 0 0 2px 0
              -moz-border-radius: 0 0 2px 0
              border-radius: 0 0 2px 0

          .tip-item-inner
            height: 100%
            padding-left: 20px
            line-height: 30px

          &:nth-of-type(1)
            .tip-item-font
              color #17d2e8

              .num
                color inherit

          &:nth-of-type(2)
            .tip-item-font
              color #02fbec

              .num
                color inherit

          &:nth-of-type(3)
            .tip-item-font
              color #065bf7

              .num
                color inherit

      .float-tip-wrapper
        position absolute
        left: 0
        width: 100%

        .float-tip-wrapper-item
          color #fff

          > span
            padding-bottom: 6px
          animation float-tip infinite ease-in-out 6s

        &.float-1
          padding 0 160px
          top: 140px

        &.float-2
          padding 0 60px
          top: 280px

      .tip-wrapper
        position absolute
        top: 0
        left: 0
        width: 100%

        .tip-item
          width: 28%
          height: 100px
          background-image: url('~@/assets/images/summary/data_bg.png')
          position relative

          .light-corner
            content: ''
            display block
            position absolute
            width 8px
            height: 8px

            &:nth-of-type(1)
              top: 0
              left: 0
              border-top: $bdh solid $fontColor
              border-left: $bdw solid $fontColor
              -webkit-border-radius: 2px 0 0 0
              -moz-border-radius: 2px 0 0 0
              border-radius: 2px 0 0 0

            &:nth-of-type(2)
              top: 0
              right: 0
              border-top: $bdh solid $fontColor
              border-right: $bdw solid $fontColor
              -webkit-border-radius: 0 2px 0 0
              -moz-border-radius: 0 2px 0 0
              border-radius: 0 2px 0 0

            &:nth-of-type(3)
              bottom: 0
              left: 0
              border-bottom: $bdh solid $fontColor
              border-left: $bdw solid $fontColor
              -webkit-border-radius: 0 0 0 2px
              -moz-border-radius: 0 0 0 2px
              border-radius: 0 0 0 2px

            &:nth-of-type(4)
              bottom: 0
              right: 0
              border-bottom: $bdh solid $fontColor
              border-right: $bdw solid $fontColor
              -webkit-border-radius: 0 0 2px 0
              -moz-border-radius: 0 0 2px 0
              border-radius: 0 0 2px 0

          .tip-item-inner
            height: 100%
            padding-left: 20px
            line-height: 30px

          &:nth-of-type(1)
            .tip-item-font
              color #17d2e8

              .num
                color inherit

          &:nth-of-type(2)
            .tip-item-font
              color #02fbec

              .num
                color inherit

          &:nth-of-type(3)
            .tip-item-font
              color #065bf7

              .num
                color inherit

    .mid-animation
      position absolute
      top: 50%
      left: 50%
      transform translate(-50%, -50%)
      height: 300px;
      width: 100%;

      img
        &:nth-child(1)
          position absolute
          top: 0
          left: 50%
          transform translateX(-50%)
          z-index 10

        &:nth-child(2)
          position absolute
          top: 200px
          left: 50%
          transform translateX(-50%)

        &:nth-child(3)
          position absolute
          top: 300px
          left: 50%
          transform translateX(-50%)

    .count-wrapper-item
      text-align center
      flex 1
      background-color: #001739
      background-image: url('~@/assets/images/summary/data_bg.png')
      margin: 20px 3px
      padding-top: 10px
      padding-bottom: 10px

      img
        width 40px
        height auto
        margin: 10px auto

      i
        line-height: 26px

    .table
      margin-top: 10px
      padding-bottom: 14px

      .table-row
        line-height: 32px

        &:nth-child(odd)
          background-color: #001739

        span
          color #ffffff
          padding 0 10px

        &:nth-child(n+2)
          span:nth-child(2)
            color #00ccfe

        &:nth-child(n+2)
          span:nth-child(3)
            color #02d8cf

  .handle-date
    font-size: 12px
    white-space nowrap

    i, a
      font-size: 12px
      line-height: 28px

    .active
      background-color: #0d1b4d

    .tab
      padding: 0 10px;
      display inline-block
      white-space nowrap
      line-height: 28px
      height: 28px
      margin-right: 4px
      -webkit-border-radius: 14px
      -moz-border-radius: 14px
      border-radius: 14px
      cursor pointer

  .handle-date >>> .bin-select-dropdown
    background-color: #051028
    font-size: 12px

  .mask-cir-container
    position absolute
    z-index 2
    bottom: 60px
    left: 50%
    transform translateX(-50%)
    width: 800px
    height: 150px
    .mask-inner
      position relative
      // transform scale(10)
      /*
      &::before
        position absolute
        left: 50%;
        transform translateX(-50%)
        bottom: 10px;
        content: '';
        display: inline-block;
        width: 358px;
        height: 90px;
        background-color: rgba(5, 8, 25, 1);
        z-index: 2;
        border-radius: 200px 0 200px 0

       */
      .rotate-cir-1
        position absolute
        z-index 1
        width 80px
        height: 80px
        -webkit-border-radius: 50%
        -moz-border-radius: 50%
        border-radius: 50%
        border: 1px dashed #11387f
        left: 50%
        animation rotate linear 10s infinite
        text-align center
      .rotate-cir-2
        @extend .rotate-cir-1
        border-style solid
        animation shadow-light infinite linear 3s
        transform:translate(-50%,15px) rotateX(80deg) rotateZ(0) scale(10)

  @keyframes rotate {
    0% {
      transform: translate(-50%, -10px) rotateX(80deg) rotateZ(0) scale(10)
    }
    50% {
      transform: translate(-50%, -10px) rotateX(80deg) rotateZ(0.5turn) scale(10)
    }
    100% {
      transform: translate(-50%, -10px) rotateX(80deg) rotateZ(1turn) scale(10)
    }
  }

  @keyframes shadow-light {
    0% {
      box-shadow: 0 0 4px rgba(20, 140, 250, 0.2), 0 0 4px rgba(20, 140, 250, 0.2) inset
    }
    50% {
      box-shadow: 0 0 10px rgba(20, 140, 250, 0.5), 0 0 10px rgba(20, 140, 250, 0.5) inset
    }
    100% {
      box-shadow: 0 0 4px rgba(20, 140, 250, 0.2), 0 0 4px rgba(20, 140, 250, 0.2) inset
    }
  }

</style>
