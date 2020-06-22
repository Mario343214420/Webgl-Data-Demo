<template>
  <div class="public" flex>
    <Panel>
      <template slot="inner">
        <div flex="main:justify dir:top" style="height: 100%;">
          <Card>
            <template slot="title">
              <div flex="main:justify" style="margin-top: 20px;">
                <span>部门双公示数据统计情况</span>
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
                    </b-date-picker>
                </span>
              </div>
            </template>
            <template slot="content">
              <div class="table scroll-list-486" style="padding-top: 20px;">
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
          <Card>
            <template slot="title">
              <span>双公示数据7天提报率</span>
            </template>
            <template slot="content">
              <chart ref="chart1" :options="returnBar(weekSubmit)" style="width: 100%; height: 326px;"></chart>
            </template>
          </Card>
        </div>
      </template>
    </Panel>
    <Panel style="padding-left: 0; padding-right: 0;" flex="main:justify dir:top">
      <template slot="outer">
        <div class="center">
          <div class="cloud">
            <i>双公示信息总数</i><br>
            <i class="num">{{rePublicCountsSum}}</i><i>（个）</i>
          </div>
          <img src="~@/assets/images/public/guangshu.png" alt="" class="light">
          <img src="~@/assets/images/public/huan1.png" alt="" class="cir cir-1">
          <img src="~@/assets/images/public/huan2.png" alt="" class="cir cir-2">
          <img src="~@/assets/images/public/huan3.png" alt="" class="cir cir-3">
          <img src="~@/assets/images/public/huan4.png" alt="" class="cir cir-4">
          <div class="liner">
            <div class="liner-item liner-item-1">
              <img src="~@/assets/images/public/dian.png" alt="" class="cir-light">
              <div class="light-bg">
                <div class="inner" flex="space:around cross:center">
                  <img src="~@/assets/images/public/icon01.png" alt="">
                  <span>
                    <i>自然人行政许可</i><br>
                    <i class="num">{{publicCounts.naturalPersonPermit}}</i><i>（个）</i>
                  </span>
                </div>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
              </div>
            </div>
            <div class="liner-item liner-item-2">
              <img src="~@/assets/images/public/dian.png" alt="" class="cir-light">
              <div class="light-bg">
                <div class="inner" flex="space:around cross:center">
                  <img src="~@/assets/images/public/icon02.png" alt="">
                  <span>
                    <i>法人行政许可</i><br>
                    <i class="num">{{publicCounts.legalPersonPermit}}</i><i>（个）</i>
                  </span>
                </div>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
              </div>
            </div>
            <div class="liner-item liner-item-3">
              <img src="~@/assets/images/public/dian.png" alt="" class="cir-light">
              <div class="light-bg">
                <div class="inner" flex="space:around cross:center">
                  <img src="~@/assets/images/public/icon03.png" alt="">
                  <span>
                    <i>自然人行政处罚</i><br>
                    <i class="num">{{publicCounts.naturalPersonPunish}}</i><i>（个）</i>
                  </span>
                </div>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
              </div>
            </div>
            <div class="liner-item liner-item-4">
              <img src="~@/assets/images/public/dian.png" alt="" class="cir-light">
              <div class="light-bg">
                <div class="inner" flex="space:around cross:center">
                  <img src="~@/assets/images/public/icon04.png" alt="">
                  <span>
                    <i>法人行政处罚</i><br>
                    <i class="num">{{publicCounts.legalPersonPunish}}</i><i>（个）</i>
                  </span>
                </div>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
                <span class="light-corner"></span>
              </div>
            </div>
            <img class="liner-img liner-img-1" src="~@/assets/images/public/line1.png" alt="">
            <img class="liner-img liner-img-2" src="~@/assets/images/public/line2.png" alt="">
            <img class="liner-img liner-img-3" src="~@/assets/images/public/line3.png" alt="">
            <img class="liner-img liner-img-4" src="~@/assets/images/public/line4.png" alt="">
          </div>
        </div>
      </template>
      <template slot="inner">
        <Card>
          <template slot="title">
            <span>双公示采集情况</span>
          </template>
          <template slot="content">
            <chart ref="chart2" :options="returnTrend(gather)" style="width: 100%; height: 320px;"></chart>
          </template>
        </Card>
      </template>
    </Panel>
    <Panel flex="main:justify dir:top">
      <template slot="inner">
        <div flex="main:justify dir:top" style="height: 100%; padding-top: 10px;">
          <Card>
            <template slot="title">
              <span>一周新增</span>
            </template>
            <template slot="content">
              <div class="top-wrapper" flex="main:justify cross:center">
                <div class="new-container" flex="main:justify cross:center">
                  <div class="new-item" flex="space:around cross:center">
                    <img src="~@/assets/images/public/xuke.png" alt="">
                    <span>
                      <i class="white-font">行政许可数量</i><br>
                      <i class="num">{{weekCase.permit}}</i><i>个</i>
                    </span>
                  </div>
                  <div class="new-item" flex="space:around cross:center">
                    <img src="~@/assets/images/public/chufa.png" alt="">
                    <span>
                      <i class="white-font">行政许可数量</i><br>
                      <i class="num">{{weekCase.punish}}</i><i>个</i>
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </Card>
          <Card>
            <template slot="title">
              <span>处罚修复数据统计</span>
            </template>
            <template slot="content">
              <chart ref="chart3" :options="returnRepairBar(punishRepair)" style="width: 100%; height: 320px;"></chart>
            </template>
          </Card>
          <Card>
            <template slot="title">
              <span>行政许可种类分布</span>
              <span></span>
            </template>
            <template slot="content">
              <chart ref="chart4" :options="returnPie(permitDistribute)" style="width: 100%; height: 350px;"></chart>
            </template>
          </Card>
        </div>
      </template>
    </Panel>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import echarts from 'echarts'
  import Panel from '../../../components/Panel/Panel'
  import Card from '../../../components/Card/Card'
  // 统一变量
  const xyLineColor = '#535e83'
  const splitLineColor = '#283353'
  export default {
    name: 'Public',
    components: {
      Panel,
      Card
    },
    data() {
      return {
        dateTab: 0,
        open: false,
        date: ''
      }
    },
    created(){
      this.$store.dispatch('getPublic')
    },
    mounted() {
      window.onresize = () => {
        this.$refs.chart2.resize()
      }
    },
    computed: {
      ...mapState({
        newClassifyList: state=> state.publicModule.newClassifyList,
        weekSubmit: state=> state.publicModule.weekSubmit,
        gather: state=> state.publicModule.gather,
        publicCounts: state=> state.publicModule.publicCounts,
        weekCase: state=> state.publicModule.weekCase,
        punishRepair: state=> state.publicModule.punishRepair,
        permitDistribute: state=> state.publicModule.permitDistribute,
      }),
      rePublicCountsSum(){
        let sum = 0
        for(let key in this.publicCounts){
          sum += this.publicCounts[key]
        }
        return sum
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
      returnBar(data) {
        return {
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
              containLabel: true
            },
            dataset: {
              source: data
            },
            yAxis: {
              name: '（%）',
              type: 'value',
              boundaryGap: [0, 0.01],
              axisLine: {
                lineStyle: {
                  color: xyLineColor
                }
              },
              splitLine: { lineStyle: { color: splitLineColor } }
            },
            xAxis: {
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: xyLineColor
                }
              },
              inverse: true,
              axisLabel: {
                interval: 0,
                /*
                formatter: function(params){
                  var newParamsName = "";// 最终拼接成的字符串
                  var paramsNameNumber = params.length;// 实际标签的个数
                  var provideNumber = 3;// 每行能显示的字的个数
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                  if (paramsNameNumber > provideNumber) {
                    // 循环每一行,p表示行
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = "";// 表示每一次截取的字符串
                      var start = p * provideNumber;// 开始截取的位置
                      var end = start + provideNumber;// 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p === rowNumber - 1) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr;// 最终拼成的字符串
                    }

                  } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params;
                  }
                  //将最终的字符串返回
                  return newParamsName
                }
                */
              }
            },
            series: [
              {
                type: 'bar',
                showBackground: true,
                barWidth: 10,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#39BBF3' },
                      { offset: 1, color: '#070c32' }
                    ]
                  )
                }
              }
            ]
          }
      },
      returnTrend(data){
        return {
          color: ['#02b7f4', '#2646c5'],
          tooltip: {
            trigger: 'axis',
              axisPointer: {
              type: 'cross',
                label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          dataset: {
            source: data
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
              boundaryGap: false
            }
          ],
            yAxis: [
            {
              position: 'left',
              splitLine: { lineStyle: { color: splitLineColor } },
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'value',
              name: '（个）',
              max: 2500
            },
            {
              position: 'right',
              splitLine: { lineStyle: { color: splitLineColor } },
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'value',
              name: '（个）',
              max: 2500
            }
          ],
            series: [
            {
              smooth: true,
              name: '奖',
              type: 'line',
              areaStyle: {},
              yAxisIndex: 1
            },
            {
              smooth: true,
              name: '惩',
              type: 'line',
              areaStyle: {}
            }
          ]
        }
      },
      returnRepairBar(data){
        return {
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
              containLabel: true
          },
          dataset: {
            source: data
          },
          yAxis: {
            name: '（个）',
              type: 'value',
              boundaryGap: [0, 0.01],
              axisLine: {
              lineStyle: {
                color: xyLineColor
              }
            },
            splitLine: { lineStyle: { color: splitLineColor } }
          },
          xAxis: {
            type: 'category',
              axisLine: {
              lineStyle: {
                color: xyLineColor
              }
            }
          },
          series: [
            {
              type: 'bar',
              showBackground: true,
              barWidth: 10,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2a4ad5' },
                    { offset: 1, color: '#070c32' }
                  ]
                )
              }
            }
          ]
        }
      },
      returnPie(data){
        return {
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
              data: data.outer
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
              data: data.inner
            }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  [flex~="space:around"] {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-around;
    -ms-flex-pack: justify;
    justify-content: space-around
  }

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

  .public
    padding 20px 0
    height: 1000px
    box-sizing border-box
    > div
      &:nth-child(1)
        width 460px

      &:nth-child(2)
        width calc(100% - 920px)

      &:nth-child(3)
        width 460px

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

      &.scroll-list-486
        height: 486px
        overflow-y auto
        .table-row
          line-height: 40px
    .center
      height: 556px
      position relative
      transform: translateY(48px);
      background-image: url('~@/assets/images/overview/ge.png')
      background-position: center 0
      .light
        position absolute
        top: 50%
        left: 50%
        transform translate(-50%, -50%)
        animation shine-light infinite linear 8s
      .cloud
        position absolute
        top: 50%
        left: 50%
        width: 254px
        height: 129px
        transform translate(-50%, -50%)
        font-size: 12px
        background-image: url('~@/assets/images/public/yun.png')
        background-position: center center
        background-repeat: no-repeat
        color #fff
        text-align center
        padding 50px 0
        line-height: 30px
        .num
          color #fff
      .cir
        position absolute
        left: 50%
        transform translate(-50%, -50%)
        &.cir-1
          animation float-up-1 infinite linear 4s
        &.cir-2
          animation float-up-2 infinite linear 4s
        &.cir-3
          animation float-up-3 infinite linear 4s
        &.cir-4
          animation float-up-4 infinite linear 4s
      .liner
        position relative
        width: 100%
        height: 100%
      .liner-img
        position absolute
        &.liner-img-1
          left: 57%
          top: 40%
          transform-origin bottom
          transform translate(-50%, -50%) scaleY(0.8)
        &.liner-img-2
          left: 41%;
          top: 40%;
          transform-origin bottom
          transform translate(-50%, -50%) scaleY(0.8)
        &.liner-img-3
          left: 54%;
          top: 28%;
          transform-origin bottom
          transform translate(-50%, -50%) scaleY(0.8)
        &.liner-img-4
          left: 44%
          top: 28%
          transform-origin bottom
          transform translate(-50%, -50%) scaleY(0.8)
      .liner-item
        width: 240px
        height: 80px
        position absolute
        background-image: url('~@/assets/images/public/sgs_bg.png')
        background-repeat: no-repeat
        -webkit-background-size: cover
        background-size: cover
        background-origin: border-box;
        .light-corner
          opacity 0
        .light-bg
          background-color: transparent
          box-shadow none
          animation none
          border: none
        .cir-light
          animation shine-light-1 infinite linear 4s
        .inner
          width 240px
          height: 60px
          padding-right: 30px
          position relative
        &.liner-item-1
          left: 29%
          top: 86px
          transform translate(-50%, -50%)
          color #00e4ff
          .cir-light
            position absolute
            right: -5px
            top: 25%;
            opacity 1
            z-index 20
        &.liner-item-2
          left: 69%
          top: 86px
          transform translate(-50%, -50%)
          color #00efe3
          .num
            color #00efe3
          .cir-light
            position absolute
            left: -5px
            top: 25%;
            opacity 1
            z-index 20
        &.liner-item-3
          left: 24%
          top: 193px;
          transform translate(-50%, -50%)
          color #fc9530
          .num
            color #fc9530
          .cir-light
            position absolute
            right: -5px
            top: 25%;
            opacity 1
            z-index 20
        &.liner-item-4
          left: 74%
          top: 193px;
          transform translate(-50%, -50%)
          color #085af5
          .num
            color #085af5
          .cir-light
            position absolute
            left: -5px
            top: 25%;
            opacity 1
            z-index 20
    .top-wrapper
      height: 114px
      .new-container
        width: 100%
        .new-item
          width: 48%
          height: 80px
          background-image: url('~@/assets/images/summary/data_bg.png')
@keyframes float-up-1
  0% {top:55%;opacity:0}
  25% {top:70%;opacity:0}
  50% {top:65%;opacity:1}
  75% {top:60%;opacity:1}
  100% {top:55%;opacity:0}
@keyframes float-up-2
  0% {top:60%; opacity:1}
  25% {top:55%; opacity:0}
  50% {top:70%; opacity:0}
  75% {top:65%; opacity:1}
  100% {top:60%; opacity:1}
@keyframes float-up-3
  0% {top:65%; opacity:1}
  25% {top:60%; opacity:1}
  50% {top:55%; opacity:0}
  75% {top:70%; opacity:0}
  100% {top:65%; opacity:1}
@keyframes float-up-4
  0% {top:70%; opacity:0}
  25% {top:65%; opacity:1}
  50% {top:60%; opacity:1}
  75% {top:55%; opacity:0}
  100% {top:70%; opacity:0}
@keyframes shine-light
  0% { opacity: 0.2 }
  25% { opacity: 1 }
  50% { opacity: 0.2 }
  75% { opacity: 1 }
  100% { opacity: 0.2 }
@keyframes shine-light-1
  0% { opacity: 0.8 }
  25% { opacity: 1 }
  50% { opacity: 0.8 }
  75% { opacity: 1 }
  100% { opacity: 0.8 }
</style>
