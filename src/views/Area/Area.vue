<template>
<div class="area">
  <div class="name">
    {{name}}
  </div>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: "Area",
  setup() {
    const name = 'mario'
    return {
      name
    }
  }
})
</script>

<style scoped>

</style>
