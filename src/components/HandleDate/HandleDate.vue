<template>
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
</template>

<script>
    export default {
        name: 'HandleDate'
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
