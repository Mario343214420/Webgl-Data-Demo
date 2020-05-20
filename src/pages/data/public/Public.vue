<template>
  <div class="public" flex>
    <Panel flex="main:justify dir:top">
      <template slot="outer">
      </template>
      <template slot="inner">
        <Card>
          <template slot="title">
            <div flex="main:justify">
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
            <div class="table">
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
            双公示数据7天提报率
          </template>
          <template slot="content">
          </template>
        </Card>
      </template>
    </Panel>
    <Panel style="padding-left: 0; padding-right: 0;" flex="main:justify dir:top">
      <template slot="outer">
      </template>
      <template slot="inner">
        <chart ref="chart2" :options="trend" style="width: 100%; height: 320px;"></chart>
      </template>
    </Panel>
    <Panel flex="main:justify dir:top">
      <template slot="outer">
      </template>
      <template slot="inner">
        123
      </template>
    </Panel>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Panel from '../../../components/Panel/Panel'
  import Card from '../../../components/Card/Card'

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
        date: '',
        newClassifyList: [
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 },
          { name: '部门名称一', count: 8848, percent: 10 }
        ],
        trend: {
          color: ['#02b7f4', '#2646c5'],
          title: {
            text: '资源信息归集趋势',
            textStyle: { color: '#fff' }
          },
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
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
              areaStyle: {},
              yAxisIndex: 1,
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              smooth: true,
              name: '惩',
              type: 'line',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            }
          ]
        }
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
      }
    }
  }
</script>

<style lang="stylus" scoped>
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

    > div
      height: 942px

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

</style>
