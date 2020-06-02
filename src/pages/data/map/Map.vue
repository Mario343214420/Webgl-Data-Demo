<template>
  <div class="map" flex>
    <Panel>
      <template slot="inner">
        <div class="map-container">
          <div id="map" style="width: 100%;height: 100%;"></div>
          <div class="mask-cir-container">
            <div class="mask-inner">
              <div class="rotate-cir-1"></div>
              <div class="rotate-cir-2"></div>
            </div>
          </div>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Panel from '../../../components/Panel/Panel'
  import 'echarts/map/js/china'
  // import Bmap from 'bmap'
  export default {
    name: 'Map',
    mounted() {
      this.renderMap({ id: 'map' })
    },
    components: {
      Panel
    },
    methods: {
      renderMap: function (paramObj) {
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
            value: 0
          }], [{
            name: '北京市',
            value: 0
          }], [{
            name: '内蒙古',
            value: 0
          }], [{
            name: '吉林',
            value: 0
          }], [{
            name: '辽宁',
            value: 0
          }], [{
            name: '河北',
            value: 0
          }], [{
            name: '天津',
            value: 0
          }], [{
            name: '山西',
            value: 0
          }], [{
            name: '陕西',
            value: 0
          }], [{
            name: '甘肃',
            value: 0
          }], [{
            name: '宁夏',
            value: 0
          }], [{
            name: '青海',
            value: 0
          }], [{
            name: '新疆',
            value: 0
          }], [{
            name: '西藏',
            value: 0
          }], [{
            name: '四川',
            value: 0
          }], [{
            name: '重庆',
            value: 0
          }], [{
            name: '山东',
            value: 0
          }], [{
            name: '河南',
            value: 0
          }], [{
            name: '江苏',
            value: 0
          }], [{
            name: '安徽',
            value: 0
          }], [{
            name: '湖北',
            value: 0
          }], [{
            name: '浙江',
            value: 0
          }], [{
            name: '福建',
            value: 0
          }], [{
            name: '江西',
            value: 0
          }], [{
            name: '湖南',
            value: 0
          }], [{
            name: '贵州',
            value: 0
          }], [{
            name: '广西',
            value: 0
          }], [{
            name: '海南',
            value: 0
          }], [{
            name: '上海',
            value: 0
          }], [{
            name: '云南',
            value: 0
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
                period: 10, // 箭头指向速度，值越小速度越快
                trailLength: 0.1, // 特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow',
                symbolSize: [5, 10] // 图标大小
              },
              lineStyle: {
                color: 'rgba(5,242,228,0.6)',
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
                  offset: [4, 0], // 偏移设置
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
                return 8 + val[2] * 5 // 圆环大小
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
                normal: {
                  show: true,
                  position: 'right',
                  // offset:[5, 0],
                  color: '#00d0ff',
                  formatter: '{b}',
                  textStyle: {
                    fontSize: 22,
                    color: '#fff'
                  }
                },
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
    >>> .light-bg
      height: 100%
  .map
    height: auto
    position relative
    padding: 20px 0
    box-sizing border-box
    #map
      position absolute
      z-index 30
      top: 0
      left: 0

      overflow hidden
    #map1
      position absolute
      z-index 10
      top: 0
      left: 0
    .map-container
      padding 30px 0
    .mask-cir-container
      position absolute
      z-index 20
      bottom: -100px
      left: 50%
      transform translateX(-50%)
      .mask-inner
        position relative
        &::before
          position absolute
          left: 30px;
          transform: translateX(-50%);
          bottom: 315px;
          content: '';
          display: inline-block;
          width: 558px;
          height: 90px;
          background-color: #051028;
          z-index: 200;
        .rotate-cir-1
          position absolute
          z-index 1
          width 100px
          height: 100px
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
          animation none
          box-shadow 0 0 4px rgba(20,140,250,0.2),0 0 4px rgba(20,140,250,0.2) inset
          transform: translate(-50%,-320px) rotateX(80deg) rotateZ(0) scale(10)

  @keyframes rotate {
    0% {
      transform: translate(-50%,-340px) rotateX(80deg) rotateZ(0) scale(10)
    }
    50% {
      transform: translate(-50%,-340px) rotateX(80deg) rotateZ(0.5turn) scale(10)
    }
    100% {
      transform: translate(-50%,-340px) rotateX(80deg) rotateZ(1turn) scale(10)
    }
  }
</style>
