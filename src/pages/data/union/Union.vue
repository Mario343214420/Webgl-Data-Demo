<template>
  <div class="union" flex>
    <Panel flex="main:justify dir:top">
      <template slot="inner">
        <div flex="main:justify dir:top" style="height: 100%;">
          <Card style="height: 370px;">
            <template slot="title">
              <div flex="main:justify">
                <span>联合奖惩页面</span>
                <span class="handle-date" flex="main:justify"></span>
              </div>
            </template>
            <template slot="content">
              <div>
                <div class="status-wrapper" flex>
                  <div class="status-item">
                    <p class="title">总计奖惩</p>
                    <p><i class="num">8848</i><i>（次）</i></p>
                  </div>
                  <div class="status-item">
                    <p class="title">备忘录总数</p>
                    <p><i class="num">8848</i><i>（个）</i></p>
                  </div>
                  <div class="status-item">
                    <p class="title">实施部门数量</p>
                    <p><i class="num">8848</i><i>（个）</i></p>
                  </div>
                </div>
                <div class="type-wrapper" flex="main:justify">
                  <div class="type-item">
                    <div class="total" flex="cross:center">
                      <span style="margin-right: 20px;"><img src="~@/assets/images/union/icon_zrr.png" alt=""></span>
                      <!--                    <span><i class="iconfont icon-ren"></i></span>-->
                      <span flex-box="1">
                        <i class="simple-i">自然人</i><br>
                        <i class="num">9527</i>
                        <i class="simple-i">（个）</i>
                      </span>
                    </div>
                    <div class="reward"><i>激励</i>&nbsp;&nbsp;&nbsp;<i class="scale-num">8848</i><i>（个）</i></div>
                    <div class="punish"><i>惩戒</i>&nbsp;&nbsp;&nbsp;<i class="scale-num">8848</i><i>（个）</i></div>
                  </div>
                  <div class="type-item">
                    <div class="total" flex="cross:center">
                    <span style="margin-right: 20px;"><img src="~@/assets/images/union/icon_fr.png" alt=""></span>
                      <!--                    <span><i class="iconfont icon-ren"></i></span>-->
                      <span flex-box="1">
                      <i class="simple-i">自然人</i><br>
                      <i class="num">9527</i>
                      <i class="simple-i">（个）</i>
                    </span>
                    </div>
                    <div class="reward"><i>激励</i>&nbsp;&nbsp;&nbsp;<i class="scale-num">8848</i><i>（个）</i></div>
                    <div class="punish"><i>惩戒</i>&nbsp;&nbsp;&nbsp;<i class="scale-num">8848</i><i>（个）</i></div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
          <Card style="height: 518px;">
            <template slot="title">
              <div flex="main:justify">
                <span>红黑名单统计</span>
                <span class="handle-date" flex="main:justify">
              </span>
              </div>
            </template>
            <template slot="content">
              <div class="red-black-wrapper" style="padding-top: 30px;" flex="dir:top">
                <div class="container">
                  <div class="red-list">
                    <img src="~@/assets/images/overview/icon_hong.png" alt="">
                    <i class="white-font">红名单</i>
                    <i class="num">12566</i>
                    <i class="white-font">（个）</i>
                  </div>
                  <div class="msg-list" flex="wrap:wrap">
                    <div class="msg-list-item" flex="main:center">
                      <img class="rb-icon" src="~@/assets/images/overview/icon_hgrz.png" alt="">
                      <span>
                  <p class="white-font">有关认证企业</p>
                  <p><i class="num">1501</i><i class="white-font">（个）</i></p>
                </span>
                    </div>
                    <div class="msg-list-item" flex="main:center">
                      <img class="rb-icon" src="~@/assets/images/overview/icon_ajnsr.png" alt="">
                      <span>
                  <p class="white-font">A级纳税人</p>
                  <p><i class="num">1501</i><i class="white-font">（个）</i></p>
                </span>
                    </div>
                    <div class="msg-list-item" flex="main:center">
                      <img class="rb-icon" src="~@/assets/images/overview/icon_shfr.png" alt="">
                      <span>
                  <p class="white-font">守信社会法人</p>
                  <p><i class="num">1501</i><i class="white-font">（个）</i></p>
                </span>
                    </div>
                    <div class="msg-list-item" flex="main:center">
                      <img class="rb-icon" src="~@/assets/images/overview/icon_zyz.png" alt="">
                      <span>
                  <p class="white-font">优秀青年志愿者</p>
                  <p><i class="num">1501</i><i class="white-font">（个）</i></p>
                </span>
                    </div>
                  </div>
                </div>
                <div class="container">
                  <div class="red-list">
                    <img src="~@/assets/images/overview/icon_hei.png" alt="">
                    <i class="white-font">黑名单</i>
                    <i class="num">12566</i>
                    <i class="white-font">（个）</i>
                  </div>
                  <div class="msg-list" flex="wrap:wrap">
                    <div class="msg-list-item" flex="main:center">
                      <img class="rb-icon" src="~@/assets/images/overview/icon_hgrz.png" alt="">
                      <span>
                  <p class="white-font">有关认证企业</p>
                  <p><i class="num">1501</i><i class="white-font">（个）</i></p>
                </span>
                    </div>
                    <div class="msg-list-item" flex="main:center">
                      <img class="rb-icon" src="~@/assets/images/overview/icon_ajnsr.png" alt="">
                      <span>
                  <p class="white-font">有关认证企业</p>
                  <p><i class="num">1501</i><i class="white-font">（个）</i></p>
                </span>
                    </div>
                    <div class="msg-list-item" flex="main:center">
                      <img class="rb-icon" src="~@/assets/images/overview/icon_shfr.png" alt="">
                      <span>
                  <p class="white-font">有关认证企业</p>
                  <p><i class="num">1501</i><i class="white-font">（个）</i></p>
                </span>
                    </div>
                    <div class="msg-list-item" flex="main:center">
                      <img class="rb-icon" src="~@/assets/images/overview/icon_zyz.png" alt="">
                      <span>
                  <p class="white-font">有关认证企业</p>
                  <p><i class="num">1501</i><i class="white-font">（个）</i></p>
                </span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Panel>
    <Panel style="padding-left: 0; padding-right: 0;" flex="main:justify dir:top">
      <template slot="inner">
        <div style="height: 100%;" flex="main:justify dir:top">
          <Card class="wrap-title" style="height: 290px;">
            <template slot="title">
              <div flex="main:justify">
                <span>联合奖惩趋势分析</span>
                <span class="handle-date" flex="main:justify">
              </span>
              </div>
            </template>
            <template slot="content">
              <div>
                <chart ref="chart1" :options="trend" style="height: 240px;width: 100%;"></chart>
              </div>
            </template>
          </Card>
          <div style="height: 270px;" flex>
            <Card style="width: 50%;">
              <template slot="title">
                <div flex="main:justify">
                  <span>各部门奖惩查询次数统计</span>
                  <span class="handle-date" flex="main:justify"></span>
                </div>
              </template>
              <template slot="content">
                <chart ref="chart2" :options="classify"
                       style="width: 100%; height: 240px;"></chart>
              </template>
            </Card>
            <Card style="width: 50%;">
              <template slot="title">
                <div flex="main:justify">
                  <span>各部门奖惩反馈次数统计</span>
                  <span class="handle-date" flex="main:justify">
              </span>
                </div>
              </template>
              <template slot="content">
                <chart ref="chart3" :options="classify"
                       style="width: 100%; height: 240px;"></chart>
              </template>
            </Card>
          </div>
          <Card class="wrap-title" style="height: 270px;">
            <template slot="title">
              <div flex="main:justify">
                <span>备忘录执行趋势分析</span>
                <span class="handle-date" flex="main:justify">
              </span>
              </div>
            </template>
            <template slot="content">
              <div flex>
                <chart ref="chart4" :options="memoTrend" style="height: 200px;width: 60%;"></chart>
                <div style="width: 40%;">
                  <div class="memo-status">
                    <div class="table">
                      <div class="row" style="background-color: #001739" flex="space:around">
                        <div class="col">排名</div>
                        <div class="col">备忘录名称</div>
                        <div class="col">查询次数</div>
                        <div class="col">触发次数</div>
                      </div>
                    </div>
                    <div class="table">
                      <div class="row" flex="space:around" :key="index"
                           v-for="(item,index) in memoStatusList">
                        <div class="col">{{index+1}}</div>
                        <div class="col">{{item.name}}</div>
                        <div class="col">{{item.count}}</div>
                        <div class="col">{{item.time}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Panel>
    <Panel flex="main:justify dir:top">
      <template slot="outer">
      </template>
      <template slot="inner">
        <div style="height: 100%;" flex="main:justify dir:top">
          <Card style="height: 290px;">
            <template slot="title">
              <div flex="main:justify">
                <span>奖惩执行情况</span>
                <span class="handle-date" flex="main:justify">
              </span>
              </div>
            </template>
            <template slot="content">
              <div class="execute-status" @mouseenter="on_swiper_enter" @mouseleave="on_swiper_leave">
                <div class="table">
                  <div class="row" style="background-color: #001739" flex="space:around">
                    <div class="col">被拦截人</div>
                    <div class="col">应用事项</div>
                    <div class="col">执行部门</div>
                    <div class="col">执行时间</div>
                  </div>
                </div>
                <div class="table" style="height: 200px;">
                  <swiper ref="mySwiper" style="height: 100%;" :options="swiperOptions">
                    <swiper-slide class="row" flex="space:around" :key="index"
                                  v-for="(item,index) in punishRewardList">
                        <div class="col">{{item.name}}</div>
                        <div class="col">{{item.info}}</div>
                        <div class="col">{{item.dept}}</div>
                        <div class="col">{{item.time}}</div>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </template>
          </Card>
          <Card>
            <template slot="title">
              <div flex="main:justify">
                <span>处置措施Top100</span>
                <span class="handle-date" flex="main:justify"></span>
              </div>
            </template>
            <template slot="content">
              <chart ref="chart5" :options="measure"
                     style="width: 100%; height: 260px;margin-top: 10px;"></chart>
            </template>
          </Card>
          <Card style="height: 270px;">
            <template slot="title">
              <div flex="main:justify">
                <span>黑名单退出趋势</span>
                <span class="handle-date" flex="main:justify">
              </span>
              </div>
            </template>
            <template slot="content">
              <chart ref="chart6" :options="quitTrend" style="height: 200px;width: 100%;"></chart>
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
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  // 统一变量
  const xyLineColor = '#535e83'
  const splitLineColor = '#212343'
  export default {
    name: 'Union',
    components: {
      Panel,
      Card,
      Swiper,
      SwiperSlide
    },
    directives: {
      swiper: directive
    },
    data() {
      return {
        trend: {
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
          grid: {
            left: '3%',
            right: '4%',
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'category',
              boundaryGap: false,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(2,176,234,1)'
                }, {
                  offset: 1,
                  color: 'rgba(2,176,234,0)'
                }])
              },
              yAxisIndex: 1,
              data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
              symbol: 'none'
            },
            {
              smooth: true,
              name: '惩',
              type: 'line',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(45,82,233,1)'
                }, {
                  offset: 1,
                  color: 'rgba(45,82,233,0)'
                }])
              },
              data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310],
              symbol: 'none'
            }
          ]
        },
        quitTrend: {
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
          grid: {
            left: '10%',
            right: '4%',
            bottom: '10%'
          },
          xAxis: [
            {
              boundaryGap: ['20%', '20%'],
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              position: 'left',
              splitLine: { lineStyle: { color: splitLineColor } },
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'value',
              name: '(个)'
            }
          ],
          series: [
            {
              name: '奖',
              type: 'line',
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(2,176,234,1)'
                }, {
                  offset: 1,
                  color: 'rgba(2,176,234,0)'
                }])
              },
              data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
              symbol: 'none'
            }
          ]
        },
        memoTrend: {
          color: ['#e43d6d', '#ee8e30'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: xyLineColor
              }
            }
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            top: '20%'
          },
          xAxis: [
            {
              axisLine: { lineStyle: { color: xyLineColor } },
              splitLine: { show: true, lineStyle: { color: splitLineColor } },
              type: 'category',
              boundaryGap: false,
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              position: 'left',
              splitLine: { lineStyle: { color: splitLineColor } },
              axisLine: { lineStyle: { color: xyLineColor } },
              type: 'value'
            }
          ],
          legend: {
            top: 10,
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '奖',
              type: 'line',
              data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
              symbol: 'none'
            },
            {
              name: '惩',
              type: 'line',
              data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310],
              symbol: 'none'
            }
          ]
        },
        classify: {
          color: '#00abfb',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: 0,
            top: '10%'
          },
          xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6', '部门7', '部门8'],
            axisLine: {
              show: false,
              lineStyle: {
                color: xyLineColor
              }
            },
            axisTick: {
              show: false
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
              data: [1100, 800, 550, 350, 350, 200, 100, 80]
            }
          ]
        },
        measure: {
          color: '#00abfb',
          tooltip: {
            axisPointer: {}
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 0,
            top: '10%'
          },
          xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6', '部门7', '部门8'],
            show: false,
            inverse: true
          },
          series: [
            {
              type: 'bar',
              showBackground: true,
              barWidth: 10,
              label: {
                show: true,
                color: xyLineColor,
                offset: [0, -12],
                position: 'topLeft',
                formatter: (p) => {
                  return p.name
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
              data: [1100, 800, 550, 350, 350, 200, 100, 80]
            }
          ]
        },
        punishRewardList: [
          { name: '周树人', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周星星', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周迅', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周一围', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周海媚', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周树人', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周星星', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周迅', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周一围', info: '产权交易', dept: '广电总局', time: '2020-06-02' },
          { name: '周海媚', info: '产权交易', dept: '广电总局', time: '2020-06-02' }
        ],
        memoStatusList: [
          { name: '房产交易', count: 8848, time: 9527 },
          { name: '规划设计方案', count: 8848, time: 9527 },
          { name: '股票交易', count: 8848, time: 9527 },
          { name: '不动产转移', count: 8848, time: 9527 }
        ],
        swiperOptions: {
          direction: 'vertical',
          slidesPerView: 6,
          loop: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          }
          // pagination: {
          //   el: '.swiper-pagination'
          // },
          // Some Swiper option/callback...
        }
      }
    },
    computed: {
      mySwiper() {
        // mySwiper 是要绑定到标签中的ref属性
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      on_swiper_enter() {
        this.$refs.mySwiper.$swiper.autoplay.stop()
      },
      on_swiper_leave() {
        this.$refs.mySwiper.$swiper.autoplay.start()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/styles/font/iconfont.css"
  .wrap-title
    >>> .card-title
      background-size: 100% 20px;

  i:not(.num)
    color #fff

  .union
    height: 1000px
    box-sizing border-box
    padding: 20px 0

    > div
      &:nth-child(2)
        flex: 1

      &:nth-child(1), &:nth-child(3)
        width: 460px

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

    .status-wrapper
      color #ffffff
      display flex
      justify-content space-between
      padding 10px 0

      .status-item
        width: 32%
        background-color: #031b41
        padding-left: 10px

    .type-wrapper
      margin-top: 10px

      .type-item
        width 48%

        .total
          margin-bottom: 10px
          .icon-person
            width: 50px
            height: 50px
            display block
            font-weight: 700
            text-align center
            line-height: 50px
            background-color: #097ee1
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%
            color #ffffff
            margin-right: 20px

            i
              font-size: 20px

        .total
          padding 10px 2px
          position relative
          z-index 1

          &::after
            position absolute
            top: 0
            left: 0
            content: ''
            width: 100%
            height: 100%
            display block
            transform-origin bottom
            transform perspective(240px) rotateX(60deg)
            background-color: #06275a
            z-index -1

        .reward
          i
            color #e91e63

        .punish
          i
            color #ffffff

        .reward, .punish
          background-color: #031a43
          margin-bottom: 10px
          padding 20px 16px

          .scale-num
            font-size: 18px

    .red-black-wrapper
      padding-top: 10px

      .container
        width 100%
        padding-top: 10px
        .white-font
          color #fff
        .red-list
          padding-bottom: 10px
          text-align center
          background-image: url('~@/assets/images/overview/tuopan.png')
          background-repeat: no-repeat
          background-position: bottom center
          -webkit-background-size: 100% 30px
          background-size: 100% 30px

          img, i
            vertical-align middle
            padding 2px

        .msg-list
          .msg-list-item
            width: 50%
            padding-top: 15px
            .rb-icon
              margin-right: 10px
              width: 52px
              height: 52px

    .execute-status
      margin-top: 10px

      .table
        .row
          padding-left: 10px

          &:nth-child(even)
            background-color: #001739

          .col
            width: 24%
            color #fff
            line-height: 40px

    .memo-status
      @extend .execute-status
      .table
        .row
          .col
            &:nth-child(1)
              width 50px

            &:nth-child(2)
              flex: 1

            &:nth-child(3)
              width 80px

            &:nth-child(4)
              width 80px

  #trendChart
    height: 240px

  [flex~='space:around']
    justify-content space-around
</style>
