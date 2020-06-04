<template>
  <div class="map" flex>
    <Panel>
      <template slot="inner">
        <div class="total-count">
          <i>数据归集总量</i>
          <i v-for="(item, index) in countNumList" :key="index" class="total-num" :class="'num' + item"></i>
          <i>&nbsp;个</i>
        </div>
        <div class="map-container">
          <div id="map"></div>
          <div class="mask-cir-container">
            <div class="mask-inner">
              <div class="rotate-cir-1"></div>
              <div class="rotate-cir-2"></div>
            </div>
          </div>
        </div>
        <div class="bar-container">
          <Card>
            <template slot="title">
              <div flex="main:justify">
                <span>各部门数据提报数量</span>
                <span class="handle-date" flex="main:justify">
              </span>
              </div>
            </template>
            <template slot="content">
              <chart ref="barChart" id="barChart" :options="barOption"></chart>
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
  // import Bmap from 'bmap'
  export default {
    name: 'Map',
    mounted() {
      this.renderMap({ id: 'map' })

      this.randomNumChange()
    },
    components: {
      Panel, Card
    },
    data() {
      return {
        countNumList: [3, 9, 6, 3, 6, 0, 5, 8],
        barOption: {
          tooltip: {
            show: false
          },
          grid: {
            left: 10,
            right: 10,
            bottom: '4%',
            top: '4%'
          },
          xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6', '部门7', '部门8', '部门9', '部门10'],
            show: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              inside: true,
              color: '#fff',
              padding: [-60, 0, 0, 0]
            },
            inverse: true
          },
          series: [
            {
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              },
              barWidth: 10,
              label: {
                show: true,
                color: '#fff',
                offset: [0, -30],
                position: 'insideRight',
                formatter: (p) => {
                  return p.value
                }
              },
              itemStyle: {
                barBorderRadius: 8,
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    { offset: 0, color: '#2f54ee' },
                    { offset: 1, color: '#288cf1' }
                  ]
                )
              },
              data: [1100, 900, 850, 800, 750, 650, 550, 490, 480, 470]
            }
          ]
        }
      }
    },
    methods: {
      randomNumChange() {
        let change = setInterval(() => {
          let arr = []
          this.countNumList.forEach(item => {
            arr.push(parseInt(Math.random() * 10))
          })
          this.countNumList = arr
        }, 20)
        setTimeout(() => {
          window.clearInterval(change)
        }, 2000)

        let num = parseInt(this.countNumList.join(''))
        setInterval(() => {
          num += parseInt(Math.random() * 10)
          if (num >= 99999999) {
            num = 10000000
          }
          let str = num.toString()
          let arr = str.split('')
          this.countNumList = arr
        }, 100)
      },
      renderMap(paramObj) {
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
                color: 'rgba(0,239,227,0.4)',
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
                  color: '#f4e925'
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
                borderColor: '#029fd4', // 省市边界线00fcff 516a89
                borderWidth: 1,
                shadowColor: 'rgba(10, 50, 100, 0.5)',
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
    }
  }
</script>

<style lang="stylus" scoped>
  .panel
    overflow hidden

    background-position: bottom center
    -webkit-background-size: contain
    background-size: contain
    background-repeat: no-repeat
    background-image: url('~@/assets/images/map/map_bg.png')

    >>> .light-bg
      height: 100%
      background-color: transparent
      box-shadow 0 0 0 transparent
      animation none
      border: none

      .light-corner
        opacity 0

  .map
    height: 1000px
    position relative
    padding: 20px 0
    box-sizing border-box
    #map
      position absolute
      z-index 30
      top: 150px
      left: 0
      overflow hidden
      width: 1116px;
      height: 722px;

    .map-container
      height: 100%
      width: 1860px
      padding 30px 0
      margin: 0 auto
      position relative

    .bar-container
      height: 100%
      position absolute
      top: 150px
      right: 0

      #barChart
        width: 744px
        height: 722px;

    .mask-cir-container
      position absolute
      z-index 20
      bottom: -125px
      left: 30%
      transform translateX(-50%)

      .mask-inner
        position relative

        &::before
          position absolute
          left: -94px;
          bottom: 327px;
          content: '';
          display: inline-block;
          width: 358px;
          height: 90px;
          background-color: rgba(5, 8, 25, 1);
          z-index: 200;
          border-radius: 200px 0 200px 0

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
          transform: translate(-50%, -320px) rotateX(80deg) rotateZ(0) scale(10)

  .total-count
    position absolute
    top: 20px
    left 50%
    transform translateX(-50%)
    width: 800px
    text-align center
    font-size: 26px
    font-weight: 700
    color #fff
    letter-spacing 8px

    i
      display inline-block
      vertical-align middle
      margin 4px

      &:first-of-type
        padding-right: 20px

      &.total-num
        width 49px
        height: 55px

      &.num0
        background-image: url('~@/assets/images/overview/0.png')

      &.num1
        background-image: url('~@/assets/images/overview/1.png')

      &.num2
        background-image: url('~@/assets/images/overview/2.png')

      &.num3
        background-image: url('~@/assets/images/overview/3.png')

      &.num4
        background-image: url('~@/assets/images/overview/4.png')

      &.num5
        background-image: url('~@/assets/images/overview/5.png')

      &.num6
        background-image: url('~@/assets/images/overview/6.png')

      &.num7
        background-image: url('~@/assets/images/overview/7.png')

      &.num8
        background-image: url('~@/assets/images/overview/8.png')

      &.num9
        background-image: url('~@/assets/images/overview/9.png')

  @keyframes rotate {
    0% {
      transform: translate(-50%, -340px) rotateX(80deg) rotateZ(0) scale(10)
    }
    50% {
      transform: translate(-50%, -340px) rotateX(80deg) rotateZ(0.5turn) scale(10)
    }
    100% {
      transform: translate(-50%, -340px) rotateX(80deg) rotateZ(1turn) scale(10)
    }
  }

  @keyframes shadow-light {
    0% {
      box-shadow: 0 0 4px rgba(20, 140, 250, 0.2), 0 0 4px rgba(20, 140, 250, 0.2) inset
    }
    50% {
      box-shadow: 0 0 16px rgba(20, 140, 250, 0.2), 0 0 16px rgba(20, 140, 250, 0.2) inset
    }
    100% {
      box-shadow: 0 0 4px rgba(20, 140, 250, 0.2), 0 0 4px rgba(20, 140, 250, 0.2) inset
    }
  }
</style>
