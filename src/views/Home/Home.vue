<template>
<div class="home">
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div class="name">name:{{name}}, age:{{age}}, id:{{id}}</div>
  <div>

    <span class="add-one" @click="addOne">+1</span>
    <span class="add-one" @click="logId">打印id</span>
    <!--example-->
    <span @click="myFun(age)">测试方法</span>
  </div>
</div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { defineComponent, ref, reactive, watch, watchEffect, computed } from 'vue'
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
        let age = ref(0),
            id = ref('0')
        // const addOne:Function = (old: number) =>  old + 1
        const addOne: Function = () => {age.value += 1}
        const logId = function () {
          id.value += '1'
          console.log(id);
        }
        const myFun = function (params: any):void {
          params.value += '1'
        }
        watch([age, id], ([newAge, newId], [oldAge, oldId]) => {
          console.log(newAge, oldAge)
          console.log(newId, oldId)
        })
        return {
          data,
          name,
          age,
          id,
          addOne,
          logId,
          myFun
        }
      }
    }
)
</script>

<style lang="stylus" scoped>
.add-one {
  display inline-block
  background-color: #000
  color: #fff
  width: auto
  margin: 10px
  cursor pointer
}
</style>
