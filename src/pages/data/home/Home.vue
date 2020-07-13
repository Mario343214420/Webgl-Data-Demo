<template>
  <div class="home view">
    <EarthBackground></EarthBackground>
    <div class="main-wrapper" flex="dir:column item:center">
      <TimeBar></TimeBar>
      <div class="swiper-wrapper">
        <swiper :options="swiperOptions">
          <swiper-slide>1</swiper-slide>
          <swiper-slide>
            <v-chart :theme="theme" :options="option"></v-chart>
          </swiper-slide>
          <swiper-slide>3</swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import { mapState } from 'vuex'
  import TimeBar from '../../../components/TimeBar/TimeBar'
  import EarthBackground from '../../../components/EarthBackground/EarthBackground'
  /* eslint-disable */
  export default {
    name: 'Home',
    data(){
      return {
        theme: this.$store.state.echartTheme,
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            slidesPerView :1
          },
          // Some Swiper option/callback...
        },
        menuList: [
          {
            title: '概况专栏',
            url:'www.baidu.com'
          }
        ],
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
    components: {
      EarthBackground, TimeBar
    },
    created() {
      // 初始化页面数据
      // this.$store.dispatch('getOverview').then(()=>{
      //   this.numChange(this.$store.state.overview.total)
      // })
    },
    mounted(){
      // this.numChange(this.$store.state.overview.total)
    },
    computed: {
      ...mapState({
        a: state => state.overview.a
      })
    },
    watch: {
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
</style>
