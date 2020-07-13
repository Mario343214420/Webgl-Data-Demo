<template>
  <div class="overview view">

  </div>
</template>

<script>
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import { mapState } from 'vuex'
  import TimeBar from '../../../components/TimeBar/TimeBar'
  import EarthBackground from '../../../components/EarthBackground/EarthBackground'
  export default {
    name: 'Overview',
    data() {
      return {

      }
    }

  }
</script>

<style lang="stylus" scoped>
.main-wrapper
  margin: 0 auto
</style>
