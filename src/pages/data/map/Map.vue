<template>
  <div class="map" flex>
    <Panel>
      <template slot="inner">
        <div id="map" style="width: 100%;height: 100%;"></div>
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
          '黑龙江': [126.642464,45.756967],
          '内蒙古': [110.3467, 41.4899],
          "吉林": [125.8154, 44.2584],
          '北京市': [116.4551, 40.2539],
          "辽宁": [123.1238, 42.1216],
          "河北": [114.4995, 38.1006],
          "天津": [117.4219, 39.4189],
          "山西": [112.3352, 37.9413],
          "陕西": [109.1162, 34.2004],
          "甘肃": [103.5901, 36.3043],
          "宁夏": [106.3586, 38.1775],
          "青海": [101.4038, 36.8207],
          "新疆": [87.617733,43.792818],
          "西藏": [91.11, 29.97],
          "四川": [103.9526, 30.7617],
          "重庆": [108.384366, 30.439702],
          "山东": [117.1582, 36.8701],
          "河南": [113.4668, 34.6234],
          "江苏": [118.8062, 31.9208],
          "安徽": [117.29, 32.0581],
          "湖北": [114.3896, 30.6628],
          "浙江": [119.5313, 29.8773],
          "福建": [119.4543, 25.9222],
          "江西": [116.0046, 28.6633],
          "湖南": [113.0823, 28.2568],
          "贵州": [106.6992, 26.7682],
          "云南": [102.9199, 25.4663],
          "广东": [113.12244, 23.009505],
          "广西": [108.479, 23.1152],
          "海南": [110.3893, 19.8516],
          '上海': [121.4648, 31.2891]
        };
        var chinaDatas = [
          [{
            name: '黑龙江',
            value: 0
          }],	[{
            name: '内蒙古',
            value: 0
          }],	[{
            name: '吉林',
            value: 0
          }],	[{
            name: '辽宁',
            value: 0
          }],	[{
            name: '河北',
            value: 0
          }],	[{
            name: '天津',
            value: 0
          }],	[{
            name: '山西',
            value: 0
          }],	[{
            name: '陕西',
            value: 0
          }],	[{
            name: '甘肃',
            value: 0
          }],	[{
            name: '宁夏',
            value: 0
          }],	[{
            name: '青海',
            value: 0
          }],	[{
            name: '新疆',
            value: 0
          }],[{
            name: '西藏',
            value: 0
          }],	[{
            name: '四川',
            value: 0
          }],	[{
            name: '重庆',
            value: 0
          }],	[{
            name: '山东',
            value: 0
          }],	[{
            name: '河南',
            value: 0
          }],	[{
            name: '江苏',
            value: 0
          }],	[{
            name: '安徽',
            value: 0
          }],	[{
            name: '湖北',
            value: 0
          }],	[{
            name: '浙江',
            value: 0
          }],	[{
            name: '福建',
            value: 0
          }],	[{
            name: '江西',
            value: 0
          }],	[{
            name: '湖南',
            value: 0
          }],	[{
            name: '贵州',
            value: 0
          }],[{
            name: '广西',
            value: 0
          }],	[{
            name: '海南',
            value: 0
          }],	[{
            name: '上海',
            value: 0
          }]
        ];
        var convertData = function(data) {
          var res = [];
          for(var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            var toCoord = [116.4551,40.2539];
            if(fromCoord && toCoord) {
              res.push([{
                coord: fromCoord,
                value: dataItem[0].value
              }, {
                coord: toCoord,
              }]);
            }
          }
          return res;
        };
        var series = [];
        [['北京市', chinaDatas]].forEach(function(item, i) {
          series.push(
            {
              type: 'lines',
              zlevel: 1,
              effect: {
                show: true,
                period: 10, //箭头指向速度，值越小速度越快
                trailLength: 0.01, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow',
                symbolSize: [5, 5], //图标大小
              },
              lineStyle: {
                color:'#05f2e4',
                width: 4, //尾迹线条宽度
                opacity: 0.1, //尾迹线条透明度
                curveness: 0.5 //尾迹线条曲直度
              },
              data: convertData(item[1])
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: { //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 4 //波纹圆环最大限制，值越大波纹越大
              },
              label: {
                normal: {
                  show: true,
                  position: 'right', //显示位置
                  offset: [5, 0], //偏移设置
                  formatter: function(params){//圆环显示文字
                    return params.data.name;
                  },
                  fontSize: 13
                },
                emphasis: {
                  show: false
                }
              },
              symbol: 'circle',
              symbolSize: function(val) {
                return 5+ val[2] * 5; //圆环大小
              },
              itemStyle: {
                normal: {
                  show: false,
                  color: '#02cbff'
                }
              },
              data: item[1].map(function(dataItem) {
                return {
                  name: dataItem[0].name,
                  value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                };
              }),
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
                  //offset:[5, 0],
                  color: '#00d0ff',
                  formatter: '{b}',
                  textStyle: {
                    fontSize:18,
                    color: "#00d0ff"
                  }
                },
                emphasis: {
                  show: true,
                  color: "#f60"
                }
              },
              symbol: 'pin',
              symbolSize: 30,
              data: [{
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10]),
              }],
            }
          );
        });
        var option = {
          tooltip: {},
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            roam: false,
            itemStyle: {
              color:'rgba(40,50,80,0.8)',
              borderColor: 'rgba(255, 255, 255, 1)',
              label:{show:false},
              emphasis: {
                label:{
                  show: false,
                  color: '#fff'
                },
                areaColor: '#535e83',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series:series
        }
        var chart = echarts.init(document.getElementById(paramObj.id))
        chart.setOption(option)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .map
    width: 100%
    height: calc(100% - 72px)

    .panel
      width: 100%
      height: 100%
      padding 20px

      >>> .light-bg
        width: 100%
        height: 100%
</style>
