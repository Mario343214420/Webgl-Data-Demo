<template>
    <div class="overview">
      <div class="head-wrapper">
        <p>系统概况专题</p>
      </div>
      <div class="body-wrapper">
        <div class="panel" flex="dir:top main:justify">
          <ContentBox cb-title="平台数据归集情况">
            <div class="count-wrapper">
              <span class="icon-tip">
                <b-icon class="icon-ios-menu"></b-icon>
              </span>
                <span class="count-data">
                <i>数据轨迹总量</i><br>
                <i>26000000</i>
              </span>
            </div>
            <div class="count-wrapper mt-10" flex="main:justify">
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
            </div>
            <div class="count-wrapper mt-10" flex="main:justify">
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
            </div>
            <div class="count-wrapper mt-10" flex="main:justify">
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
            </div>
          </ContentBox>
          <ContentBox icon="icon-ios-medkit" icon-color="#FF5733" cb-title="平台数据归集情况">
            <div class="count-wrapper" flex="main:justify">
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
            </div>
            <div class="count-wrapper mt-10" flex="main:justify">
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
            </div>
            <div class="count-wrapper mt-10" flex="main:justify">
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
              <span class="count-box">
                <i>自然人</i><br>
                <i>123456444</i>
              </span>
            </div>
          </ContentBox>
          <ContentBox cb-title="平台数据归集情况">
            <div class="count-wrapper" flex="main:justify">
              <span class="count-box" style="width: 32%;">
                <i>5800</i><br>
                <i>失信被执行人</i>
              </span>
              <span class="count-box" style="width: 32%;">
                <i>5800</i><br>
                <i>失信被执行人</i>
              </span>
              <span class="count-box" style="width: 32%;">
                <i>5800</i><br>
                <i>失信被执行人</i>
              </span>
            </div>
            <div class="count-wrapper">
              <chart ref="chart1" :options="pieChartOption" style="height: 80px; width: 24%; display: inline-block"></chart>
              <chart ref="chart1" :options="pieChartOption" style="height: 80px; width: 24%; display: inline-block"></chart>
              <chart ref="chart1" :options="pieChartOption" style="height: 80px; width: 24%; display: inline-block"></chart>
              <chart ref="chart1" :options="pieChartOption" style="height: 80px; width: 24%; display: inline-block"></chart>
            </div>
          </ContentBox>
        </div>
        <div class="panel" flex="dir:top main:justify">
          <ContentBox cb-title="数据交换统计" style="height: 40%">
            <div class="count-wrapper" flex="main:justify">
              <span>
                <span class="icon-tip">
                  <b-icon class="icon-ios-menu"></b-icon>
                </span>
                <span class="count-data">
                  <i>数据轨迹总量</i><br>
                  <i>26000000</i>
                </span>
              </span>
              <span>
                <span class="icon-tip">
                  <b-icon class="icon-ios-menu"></b-icon>
                </span>
                <span class="count-data">
                  <i>数据轨迹总量</i><br>
                  <i>26000000</i>
                </span>
              </span>
              <span>
                <span class="icon-tip">
                  <b-icon class="icon-ios-menu"></b-icon>
                </span>
                <span class="count-data">
                  <i>数据轨迹总量</i><br>
                  <i>26000000</i>
                </span>
              </span>
            </div>
            <div class="count-wrapper mt-10" flex="main:justify">
              <chart ref="chart1" :options="barChartOption" style="height: 200px; width: 100%; display: inline-block"></chart>
            </div>
          </ContentBox>
          <ContentBox cb-title="信用报告查询次数" style="height: 58%">

          </ContentBox>
        </div>
        <div class="panel" flex="dir:top main:justify">

        </div>
      </div>
    </div>
</template>

<script>
  import ContentBox from '../../../components/ContentBox/ContentBox'
  export default {
    name: 'Overview',
    data() {
      return {
        pieChartOption: {
          color: ['#499DF8', '#eee'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              hoverAnimation: false,
              legendHoverLink: false,
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '14',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' }
              ]
            }
          ]
        },
        barChartOption: {
          color: ['#3c90f7', '#5fbdbd'],
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '1月', '2月', '3月', '4月', '5月', '6月'],
              ['Matcha Latte', 600, 300, 500, 1000, 200, 850],
              ['Milk Tea', 400, 1000, 900, 600, 700, 800]
            ]
          },
          xAxis: [
            { type: 'category', gridIndex: 0 }
          ],
          yAxis: [
            { gridIndex: 0 }
          ],
          series: [
            { type: 'bar', seriesLayoutBy: 'row' },
            { type: 'bar', seriesLayoutBy: 'row' }
          ]
        }
      }
    },
    components: {
      ContentBox
    }
  }
</script>

<style lang="stylus" scoped>
.overview
  position relative
  width: 100%
  height: 100%
  padding-top: 60px
  .head-wrapper
    position absolute
    top: 0
    left: 0
    width: 100%
    height: 60px
    p
      font-size: 22px
      text-align center
      color #333
  .body-wrapper
    overflow auto
    display flex
    width: 100%
    height: 100%
    .panel
      padding 0 20px
      box-sizing border-box
      &:nth-child(1)
        width 25%
        height: 100%
      &:nth-child(2)
        width 45%
        height: 100%
      &:nth-child(3)
        width 30%
        height: 100%
  .count-wrapper
    span
      display inline-block
      vertical-align middle
    .icon-tip
      background-color: #dce5f5
      color #ffffff
      -webkit-border-radius: 4px
      -moz-border-radius: 4px
      border-radius: 4px
      font-size: 20px
      padding 8px 12px
      margin-top: 10px
      vertical-align baseline
      i
        font-weight: 700
    .count-data
      margin-left: 20px
      i
        line-height: 28px
        &:nth-child(1)
          font-size: 16px
        &:nth-child(2)
          font-size: 14px
    .count-box
      width 48%
      padding 4px 0
      text-align center
      background-color: #dce5f5
      line-height: 20px
</style>
