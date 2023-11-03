<script>
// 在你的 Vue 组件中导入 Vue-DPlayer
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
export default {
  components: {
    VueDPlayer, // 注册 Vue-DPlayer 组件
  },
  data() {
    return {
      playerOptions: {
        video: {
          url: 'rtmp://58.200.131.2:1935/livetv/hunantv', // 替换成实际的 RTMP 流地址
          type: 'rtmp/flv', // 指定流媒体类型
        },
      }
    }
  },
  mounted() {

  },
}
</script>

<template>
  <div>
    <VueDPlayer :options="playerOptions"></VueDPlayer>
  </div>
</template>

<style scoped lang="stylus">

</style>
