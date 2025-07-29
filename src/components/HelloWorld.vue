<template>
  <div class="hello-world">
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    
    <div class="counter-section">
      <p>当前计数: <strong>{{ count }}</strong></p>
      <p>双倍计数: <strong>{{ doubleCount }}</strong></p>
      <p>是否为偶数: <strong>{{ isEven ? '是' : '否' }}</strong></p>
      
      <div class="button-group">
        <button @click="increment" class="btn">增加</button>
        <button @click="decrement" class="btn btn-secondary">减少</button>
        <button @click="reset" class="btn btn-secondary">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

// 定义 props
interface Props {
  title?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Hello Vue 3!',
  message: '这是一个 Vue 3 组件示例'
})

// 使用 Pinia store
const counterStore = useCounterStore()
const { count, doubleCount, isEven, increment, decrement, reset } = counterStore
</script>

<style scoped>
.hello-world {
  padding: 2rem;
  text-align: center;
}

.hello-world h2 {
  color: #42b883;
  margin-bottom: 1rem;
}

.counter-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.counter-section p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.button-group {
  margin-top: 1.5rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .button-group {
    flex-direction: column;
    align-items: center;
  }
  
  .button-group .btn {
    width: 100px;
  }
}
</style>
