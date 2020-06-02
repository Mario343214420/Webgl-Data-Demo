<template>
  <div class="union" flex>
    <Panel flex="main:justify dir:top">
      <template slot="inner">
        <Card style="height: 360px;">
          <template slot="title">
            <div flex="main:justify">
              <span>联合奖惩页面</span>
              <span class="handle-date" flex="main:justify"></span>
            </div>
          </template>
          <template slot="content">
            <div class="status-wrapper" flex>
              <div class="status-item">
                <p>总计奖惩</p>
                <p><i class="num">8848</i><i>（次）</i></p>
              </div>
              <div class="status-item">
                <p>备忘录总数</p>
                <p><i class="num">8848</i><i>（个）</i></p>
              </div>
              <div class="status-item">
                <p>实施部门数量</p>
                <p><i class="num">8848</i><i>（个）</i></p>
              </div>
            </div>
          </template>
        </Card>
        <Card style="height: 510px;">
          <template slot="title">
            <div flex="main:justify">
              <span>红黑名单统计</span>
              <span class="handle-date" flex="main:justify">
              </span>
            </div>
          </template>
          <template slot="content">

          </template>
        </Card>
      </template>
    </Panel>
    <Panel style="padding-left: 0; padding-right: 0;" flex="main:justify dir:top">
      <template slot="inner">
        <div style="height: 881px;" flex="main:justify dir:top">
          <Card style="height: 290px;">
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
                  <span>联合奖惩趋势分析</span>
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
                  <span>联合奖惩趋势分析</span>
                  <span class="handle-date" flex="main:justify">
              </span>
                </div>
              </template>
              <template slot="content">
                <chart ref="chart3" :options="classify"
                       style="width: 100%; height: 220px;"></chart>
              </template>
            </Card>
          </div>
          <Card style="height: 270px;">
            <template slot="title">
              <div flex="main:justify">
                <span>联合奖惩趋势分析</span>
                <span class="handle-date" flex="main:justify">
              </span>
              </div>
            </template>
            <template slot="content">
              <div flex>
                <chart ref="chart4" :options="memoTrend" style="height: 200px;width: 60%;"></chart>
                <div style="width: 40%;">table</div>
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
        <div style="height: 881px;" flex="main:justify dir:top">
          <Card style="height: 290px;">
            <template slot="title">
              <div flex="main:justify">
                <span>奖惩执行情况</span>
                <span class="handle-date" flex="main:justify">
              </span>
              </div>
            </template>
            <template slot="content">
              <div>
                <div class="table">
                  <div class="row" flex>
                    <div class="col">被拦截人</div>
                    <div class="col">应用事项</div>
                    <div class="col">执行部门</div>
                    <div class="col">执行时间</div>
                  </div>
                </div>
                <div class="table">
                  <div class="row" flex v-for="(item,index) in punishRewardList">
                    <div class="col">{{item.name}}</div>
                    <div class="col">{{item.info}}</div>
                    <div class="col">{{item.dept}}</div>
                    <div class="col">{{item.time}}</div>
                  </div>
                </div>
              </div>
            </template>
          </Card>
          <Card style="height: 270px;">
            <template slot="title">
              <div flex="main:justify">
                <span>处置措施Top100</span>
                <span class="handle-date" flex="main:justify">
                </span>
              </div>
            </template>
            <template slot="content">
              <div>
                <chart ref="chart5" :options="classify"
                       style="width: 100%; height: 220px;"></chart>
              </div>
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

  // 统一变量
  const xyLineColor = '#535e83'
  const splitLineColor = '#283353'
  export default {
    name: 'Union',
    components: {
      Panel,
      Card
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
            bottom: '3%',
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
              data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
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
              data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310]
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
            }
          ],
          series: [
            {
              name: '奖',
              type: 'line',
              areaStyle:{
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(2,176,234,1)'
                }, {
                  offset: 1,
                  color: 'rgba(2,176,234,0)'
                }])
              },
              data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
            }
          ]
        },
        memoTrend: {
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
            bottom: '3%',
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
              name: '(个)'
            }
          ],
          legend:{},
          series: [
            {
              name: '奖',
              type: 'line',
              data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210]
            },
            {
              name: '惩',
              type: 'line',
              data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310]
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
            left: '6%',
            right: '10%',
            bottom: '3%',
            top: '10%',
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
            show: false,
            type: 'value',
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['部门1', '部门2', '部门3', '部门4', '部门5', '部门6'],
            axisLine: {
              show: false,
              lineStyle: {
                color: xyLineColor
              }
            },
            axisTick:{
              show:false
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
        punishRewardList:[
          {name:'周星星',info:'产权交易',dept:'广电总局',time:'2020-06-02'},
          {name:'周海媚',info:'产权交易',dept:'广电总局',time:'2020-06-02'},
          {name:'周树人',info:'产权交易',dept:'广电总局',time:'2020-06-02'},
          {name:'周一围',info:'产权交易',dept:'广电总局',time:'2020-06-02'}
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .union
    height: calc(100% - 72px)
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

  #renderChart
    height: 240px

</style>
