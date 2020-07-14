<template>
  <div class="summary view" flex>
    <div class="main-wrapper" flex="wrap:wrap">
      <v-chart :theme="this.$store.state.echartTheme" :options="option"></v-chart>
      <v-chart :theme="this.$store.state.echartTheme" :options="option"></v-chart>
      <v-chart :theme="this.$store.state.echartTheme" :options="option"></v-chart>
      <v-chart :theme="this.$store.state.echartTheme" :options="option"></v-chart>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Summary',
    data(){
      return{
        option: {
          title: {
            text: '南丁格尔玫瑰图',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
          },
          series: [
            {
              name: '半径模式',
              type: 'pie',
              radius: [20, 110],
              center: ['25%', '50%'],
              roseType: 'radius',
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              data: [
                {value: 10, name: 'rose1'},
                {value: 5, name: 'rose2'},
                {value: 15, name: 'rose3'},
                {value: 25, name: 'rose4'},
                {value: 20, name: 'rose5'},
                {value: 35, name: 'rose6'},
                {value: 30, name: 'rose7'},
                {value: 40, name: 'rose8'}
              ]
            },
            {
              name: '面积模式',
              type: 'pie',
              radius: [30, 110],
              center: ['75%', '50%'],
              roseType: 'area',
              data: [
                {value: 10, name: 'rose1'},
                {value: 5, name: 'rose2'},
                {value: 15, name: 'rose3'},
                {value: 25, name: 'rose4'},
                {value: 20, name: 'rose5'},
                {value: 35, name: 'rose6'},
                {value: 30, name: 'rose7'},
                {value: 40, name: 'rose8'}
              ]
            }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .summary
    height: 100%
    width: 100%
    .main-wrapper
      height: 100%
      width: 100%
      box-sizing border-box
      padding 100px
      .echarts
        width: 50%
</style>
