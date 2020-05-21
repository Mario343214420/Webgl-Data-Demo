<template>
  <div class="summary" flex>
    <Panel>
      <template slot="inner">
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
      </template>
    </Panel>
    <Panel style="padding-left: 0; padding-right: 0;" flex="main:justify dir:top">
      <template slot="outer">
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
          <div class="float-tip-wrapper float-1" flex="main:justify">
            <span class="float-tip-wrapper-item" flex="dir:top cross:center">
              <img src="~@/assets/images/summary/icon_zrr.png" alt=""><br>
              <span><i>自然人数据总量</i></span>
              <span><i class="num">565，854</i><i>（个）</i></span>
            </span>
            <span class="float-tip-wrapper-item" flex="dir:top cross:center">
              <img src="~@/assets/images/summary/icon_fr.png" alt=""><br>
              <span><i>自然人数据总量</i></span>
              <span><i class="num">565，854</i><i>（个）</i></span>
            </span>
          </div>
          <div class="float-tip-wrapper float-2" flex="main:justify">

            <span class="float-tip-wrapper-item" flex="dir:top cross:center">
              <img src="~@/assets/images/summary/icon_zdrq.png" alt=""><br>
              <span><i>自然人数据总量</i></span>
              <span><i class="num">565，854</i><i>（个）</i></span>
            </span>
            <span class="float-tip-wrapper-item" flex="dir:top cross:center">
              <img src="~@/assets/images/summary/icon_yztg.png" alt=""><br>
              <span><i>自然人数据总量</i></span>
              <span><i class="num">565，854</i><i>（个）</i></span>
            </span>
          </div>
          <div id="cvsBg" style="margin-top: 12px;width: 100%; height: 500px;"></div>
          <div class="mid-animation">
            <img src="~@/assets/images/summary/ball.png" alt="">
            <img src="~@/assets/images/summary/pan.png" alt="">
            <img src="~@/assets/images/summary/zhu.png" alt="">
            <div class="comet"></div>
            <div class="comet comet-copy-1"></div>
            <div class="comet comet-copy-2"></div>
          </div>
        </div>
      </template>
      <template slot="inner">
        <chart ref="chart2" :options="trend" style="width: 100%; height: 320px;"></chart>
      </template>
    </Panel>
    <Panel>
      <template slot="inner">
        <div flex="main:justify dir:top">
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
  import * as THREE from 'three'
  import Panel from '../../../components/Panel/Panel'
  import Card from '../../../components/Card/Card'
  // 统一变量
  const xyLineColor = '#535e83'
  const splitLineColor = '#283353'
  export default {
    name: 'Summary',
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
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 }
        ],
        newClassifyList: [
          { name: '部门名称一', count: 8848, percent: 10 },
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
      }
    },
    mounted() {
      // this.renderBall()
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
    padding 20px 0

    > div
      height: 942px

      &:nth-child(1)
        width 460px

      &:nth-child(2)
        width calc(100% - 920px)

      &:nth-child(3)
        width 460px

    .outer-wrapper
      width: 100%
      height: 600px
      background-image: url('~@/assets/images/overview/ge.png')
      background-repeat: no-repeat
      background-position: center 40%
      position relative

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

  @keyframes rotate {
    0% {
      transform: translateX(-50%) rotateX(76deg) rotateZ(0)
    }
    50% {
      transform: translateX(-50%) rotateX(76deg) rotateZ(.5turn)
    }
    100% {
      transform: translateX(-50%) rotateX(76deg) rotateZ(1turn)
    }
  }

  @keyframes rotate-reverse {
    0% {
      transform: translateX(-50%) rotateX(76deg) rotateZ(0) scale(.8)
    }
    50% {
      transform: translateX(-50%) rotateX(76deg) rotateZ(-0.5turn) scale(.8)
    }
    100% {
      transform: translateX(-50%) rotateX(76deg) rotateZ(-1turn) scale(.8)
    }
  }

  @keyframes shine {
    0% {
      opacity: 0.8
    }
    50% {
      opacity: 0.2
    }
    100% {
      opacity: 0.8
    }
  }

  $speed3 = 3s
  $speed2 = 2s
  .comet
    -webkit-border-radius: 50%
    -moz-border-radius: 50%
    border-radius: 50%
    width: 500px
    height: 500px
    border: 1px solid rgba(244, 144, 255, .2)
    box-shadow 0 0 50px #1890ff inset
    position absolute
    top: 88%
    left: 50%
    margin-left: -250px
    margin-top: -250px
    transform rotateX(70deg)
    animation rotate-comet linear infinite $speed3

    &:nth-of-type(2)
      top 82%

    &:nth-of-type(3)
      top 95%

    &::before
      position absolute
      top: -5px
      content ''
      left: 50%
      display inline-block
      width: 10px
      height: 10px
      -webkit-border-radius: 50%
      -moz-border-radius: 50%
      border-radius: 50%
      animation shine-comet infinite linear 1s

  .comet-reverse
    animation rotate-comet-reverse infinite linear $speed2

  .comet-copy-1
    animation shine-comet-scale-1 infinite linear $speed3

  .comet-copy-2
    animation shine-comet-scale-2 infinite linear $speed3

  @keyframes rotate-comet {
    0% {
      transform: rotateX(70deg) rotateZ(0)
    }
    50% {
      transform: rotateX(70deg) rotateZ(-0.5turn)
    }
    100% {
      transform: rotateX(70deg) rotateZ(-1turn)
    }
  }

  @keyframes rotate-comet-reverse {
    0% {
      transform: rotateY(0.5turn) scale(0.6) rotateX(70deg) rotateZ(0)
    }
    50% {
      transform: rotateY(0.5turn) scale(0.6) rotateX(70deg) rotateZ(-0.5turn)
    }
    100% {
      transform: rotateY(0.5turn) scale(0.6) rotateX(70deg) rotateZ(-1turn)
    }
  }

  @keyframes shine-comet-scale-1 {
    0% {
      transform: rotateY(0.5turn) scale(0.8) rotateX(70deg) rotateZ(0)
    }
    50% {
      transform: rotateY(0.5turn) scale(0.8) rotateX(70deg) rotateZ(-0.5turn)
    }
    100% {
      transform: rotateY(0.5turn) scale(0.8) rotateX(70deg) rotateZ(-1turn)
    }
  }

  @keyframes shine-comet-scale-2 {
    0% {
      transform: rotateY(0.5turn) scale(1.2) rotateX(70deg) rotateZ(0)
    }
    50% {
      transform: rotateY(0.5turn) scale(1.2) rotateX(70deg) rotateZ(-0.5turn)
    }
    100% {
      transform: rotateY(0.5turn) scale(1.2) rotateX(70deg) rotateZ(-1turn)
    }
  }

  @keyframes rotate-comet-reverse {
    0% {
      transform: rotateY(0.5turn) scale(1.4) rotateX(70deg) rotateZ(0)
    }
    50% {
      transform: rotateY(0.5turn) scale(1.4) rotateX(70deg) rotateZ(-0.5turn)
    }
    100% {
      transform: rotateY(0.5turn) scale(1.4) rotateX(70deg) rotateZ(-1turn)
    }
  }

  @keyframes shine-comet {
    0% {
      box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 18px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 1), 10px 0 10px rgba(255, 255, 255, 0.8), 15px 0 8px rgba(255, 255, 255, 0.3), 20px 0 5px rgba(255, 255, 255, 0.3), 25px 0 4px rgba(255, 255, 255, 0.2), 30px 2px 2px rgba(255, 255, 255, 0.2), 36px 1px 2px rgba(255, 255, 255, 0.1), 0 0 10px #fff inset
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 18px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 1), 10px 0 10px rgba(255, 255, 255, 0.6), 15px 0 8px rgba(255, 255, 255, 0.4), 20px 0 5px rgba(255, 255, 255, 0.4), 25px 0 4px rgba(255, 255, 255, 0.2), 30px 2px 2px rgba(255, 255, 255, 0.2), 36px 1px 2px rgba(255, 255, 255, 0.1), 0 0 10px #fff inset
    }
    100% {
      box-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 18px rgba(255, 255, 255, 1), 0 0 20px rgba(255, 255, 255, 1), 0 0 15px rgba(255, 255, 255, 1), 10px 0 10px rgba(255, 255, 255, 0.8), 15px 0 8px rgba(255, 255, 255, 0.3), 20px 0 5px rgba(255, 255, 255, 0.3), 25px 0 4px rgba(255, 255, 255, 0.2), 30px 2px 2px rgba(255, 255, 255, 0.2), 36px 1px 2px rgba(255, 255, 255, 0.1), 0 0 10px #fff inset
    }
  }

  @keyframes float-tip {
    0% {
      transform: translateY(10px)
    }
    50% {
      transform: translateY(-10px)
    }
    100% {
      transform: translateY(10px)
    }
  }
</style>
