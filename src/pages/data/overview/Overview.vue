<template>
  <div class="overview view">
    <div class="count-wrapper">
      <TimeBar></TimeBar>
    </div>
    <div class="swiper-wrapper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide class="pd50px swiper-no-swiping">
          <v-chart autoresize :theme="theme" width="100%" :options="lineOption"></v-chart>
        </swiper-slide>
        <swiper-slide class="pd50px swiper-no-swiping">
          <v-chart autoresize :theme="theme" :options="option"></v-chart>
        </swiper-slide>
        <swiper-slide class="pd50px swiper-no-swiping">
          <v-chart autoresize :theme="theme" :options="option"></v-chart>
        </swiper-slide>
      </swiper>

      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TimeBar from '../../../components/TimeBar/TimeBar'

  export default {
    name: 'Overview',
    data() {
      return {
        theme: this.$store.state.echartTheme,
        swiperOptions: {
          touchStartPreventDefault: false,
          slidesPerView: 1,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
          // Some Swiper option/callback...
        },
        option: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }]
        }
      }
    },
    computed: {
      lineOption() {
        let base = +new Date(1968, 9, 3)
        let oneDay = 24 * 3600 * 1000
        let date = []

        let data = [Math.random() * 300]

        for (let i = 1; i < 20000; i++) {
          let now = new Date(base += oneDay)
          date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
          data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
        }
        return {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%']
            }
          },
          title: {
            left: 'center',
            top: '2%',
            text: '大数据量面积图',
            textStyle: {
              fontSize: 24
            }
          },
          legend: {
            top: '8%'
          },
          grid: {
            top: '16%'
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 10
          }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          series: [
            {
              name: '模拟数据',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              areaStyle: {},
              data: data
            }
          ]
        }
      }
    },
    components: {
      TimeBar
    }
  }
</script>

<style lang="stylus" scoped>
  .count-wrapper
    position absolute
    right: 40px
    top: 20px
    background-color: rgba(40, 100, 200, 0.8)
    -webkit-border-radius: 10px
    -moz-border-radius: 10px
    border-radius: 10px
    padding: 0 40px
    border: 2px solid rgba(40, 150, 200, 1)

    &::before
      content: '累 计 总 数'
      display inline-block
      width: 40px
      line-height: 60px
      position absolute
      left: -90px
      font-weight: 700
      font-size: 40px
      color #e4eaff
      text-shadow 2px 2px 4px rgba(50, 50, 50, 0.8)

  .swiper-wrapper
    position absolute
    right: 40px
    bottom: 0
    width 70%
    height calc(100% - 280px)

  .pd50px
    padding: 50px
    box-sizing border-box

  .echarts
    width: 100%
    height: 100%

    div
      width: 100%

</style>
