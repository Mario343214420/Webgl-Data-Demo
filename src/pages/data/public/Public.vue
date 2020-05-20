<template>
  <div>
    <Panel style="padding-left: 0; padding-right: 0;" flex="main:justify dir:top">
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
  export default {
    name: 'Public',
    components: {
      Panel
    }
  }
</script>

<style lang="stylus" scoped>

</style>
