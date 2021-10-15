<template>
<div class="home">
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div class="name">{{name}}, {{data.old}}</div>
  <div class="add-one" @click="addOne">+1</div>
</div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { defineComponent, ref, reactive, watch, watchEffect } from 'vue'
export default defineComponent(
    {
      name: "home",
      components: {
        HelloWorld
      },
      setup() {
        const name = ref('mario')
        let data = reactive({
          age: 0,
          id: 0
        })
        // const addOne:Function = (old: number) =>  old + 1
        const addOne: Function = () =>  data.age += 1
        watch([data.age, data.id], ([newAge, newId], [oldAge, oldId]) => {
          console.log(newAge, oldAge)
          console.log(newId, oldId)
        })
        return {
          name,
          data,
          addOne
        }
      }
    }
)
</script>

<style lang="stylus" scoped>
.add-one {
  background-color: #000
  color: #fff
  width: 40px
  margin: 0 auto
  cursor pointer
}
</style>
