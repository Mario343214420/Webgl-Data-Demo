<template>
  <div class="union" flex>
    <Panel flex="main:justify dir:top">
      <template slot="outer">
      </template>
      <template slot="inner">
        <Card>
          <template slot="title">
            <div flex="main:justify">
              <span>联合奖惩页面</span>
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
      <template slot="outer">
      </template>
      <template slot="inner">
        <Card>
          <template slot="title">
            <div flex="main:justify">
              <span>联合奖惩趋势分析</span>
              <span class="handle-date" flex="main:justify">
              </span>
            </div>
          </template>
          <template slot="content">

          </template>
        </Card>
      </template>
    </Panel>
    <Panel flex="main:justify dir:top">
      <template slot="outer">
      </template>
      <template slot="inner">
        <Card>
          <template slot="title">
            <div flex="main:justify">
              <span>奖惩执行情况</span>
              <span class="handle-date" flex="main:justify">
              </span>
            </div>
          </template>
          <template slot="content">

          </template>
        </Card>
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
.union

  height: calc(100% - 72px)
  >div
    &:nth-child(2)
      flex: 1
    &:nth-child(1),&:nth-child(3)
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

</style>
