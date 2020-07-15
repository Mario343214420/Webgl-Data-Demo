<template>
  <div class="public view" flex>
    <div class="lineBarChart">
      <v-chart :theme="this.$store.state.echartTheme" :options="option"></v-chart>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Public',
    computed: {
      option() {
        // Generate data
        var category = []
        var dottedBase = +new Date()
        var lineData = []
        var barData = []

        for (var i = 0; i < 20; i++) {
          var date = new Date(dottedBase += 3600 * 24 * 1000)
          category.push([
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
          ].join('-'))
          var b = Math.random() * 200
          var d = Math.random() * 200
          barData.push(b)
          lineData.push(d + b)
        }
        // option
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['line', 'bar'],
            textStyle: {
              color: '#ccc'
            }
          },
          xAxis: {
            data: category,
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          },
          yAxis: {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          },
          series: [{
            name: 'line',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 15,
            data: lineData
          }, {
            name: 'bar',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              barBorderRadius: 5,
              color: new this.$LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#14c8d4' },
                  { offset: 1, color: '#43eec6' }
                ]
              )
            },
            data: barData
          }, {
            name: 'line',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
              color: new this.$LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: 'rgba(20,200,212,0.5)' },
                  { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                  { offset: 1, color: 'rgba(20,200,212,0)' }
                ]
              )
            },
            z: -12,
            data: lineData
          }, {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              color: '#399ede'
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
          }]
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" scoped>
  .public
    width: 100%
    height: 100%

    .lineBarChart
      width: 100%
      height: 100%
      box-sizing border-box
      padding 100px 40px 100px 100px

      .echarts
        width: 100%
        height: 100%
</style>
