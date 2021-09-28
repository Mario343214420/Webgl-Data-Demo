<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view></router-view>
  <router-link to="home">Home</router-link>
  <router-link to="area">area</router-link>
  <router-link to="camera">camera</router-link>
  <router-link to="model">model</router-link>
  <router-link to="warn">warn</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
