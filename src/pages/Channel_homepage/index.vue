<template>
<div class="homepage-bg">
  <canvas ref="cvs" :height="h" :width="w"></canvas>
</div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

export default {
  data() {
    return {
      name: 'index',
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      w: 0,
      h: 0,
      bloomComposer: null,
      amountX: 100,
      amountY: 100,
      particles: null,
      count: 0,
      color: '#3DFFFF',
      ship: null,
      curve: null
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.homepage-bg {
  background-color: #333
  height: 100%
  width: 100%;
  overflow hidden
  canvas {
    display block
  }
}
</style>
