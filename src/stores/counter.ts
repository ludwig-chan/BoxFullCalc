import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // 状态 (state)
  const count = ref(0)
  const name = ref('BoxFullCalc')

  // 计算属性 (getters)
  const doubleCount = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)

  // 动作 (actions)
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  function setName(newName: string) {
    name.value = newName
  }

  return { 
    count, 
    name, 
    doubleCount, 
    isEven, 
    increment, 
    decrement, 
    reset, 
    setName 
  }
})
