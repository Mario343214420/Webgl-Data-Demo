<template>
  <div class="home">
    Home<br>
    <router-link to="/overview">to overview</router-link><br>
    <router-link to="/summary">to summary</router-link><br>
    <router-link to="/public">to public</router-link><br>
    <router-link to="/union">to union</router-link><br>
    <router-link to="/map">to map</router-link><br>
  </div>
</template>
<script>
  import particles from 'particles.js'
  import * as Three from 'three'
  /* eslint-disable */
  export default {
    name: 'Home'
  }
</script>

<style lang="stylus" scoped>

</style>
