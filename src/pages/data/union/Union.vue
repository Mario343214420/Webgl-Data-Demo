<template>
  <div>
    <Panel flex="main:justify dir:top">
      <template slot="outer">
      </template>
      <template slot="inner">
        <Card>
          <template slot="title">
            <div flex="main:justify">
              <span>部门双公示数据统计情况</span>
              <span class="handle-date" flex="main:justify">
                  <i class="tab active" v-show="dateTab === 0" @click="dateTab = 1"><i class="iconfont icon-ios-repeat"
                                                                                       style="color: #00cbfe; font-size: 18px; vertical-align: top"></i>法人</i>
                  <i class="tab active" v-show="dateTab === 1" @click="dateTab = 0"><i class="iconfont icon-ios-repeat"
                                                                                       style="color: #00cbfe; font-size: 18px; vertical-align: top"></i>自然人</i>
                </span>
            </div>
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
        123
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
    name: 'Union',
    components: {
      Panel,
      Card
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

</style>
