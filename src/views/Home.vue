<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <h1 class="hero-title">欢迎使用 BoxFullCalc</h1>
        <p class="hero-subtitle">一个现代化的 Vue 3 应用程序</p>
      </div>
      
      <div class="features">
        <div class="card">
          <h3>🚀 Vue 3</h3>
          <p>使用最新的 Vue 3 Composition API 构建，享受更好的性能和开发体验</p>
        </div>
        
        <div class="card">
          <h3>⚡ Vite</h3>
          <p>极速的开发服务器和构建工具，提供闪电般的热重载体验</p>
        </div>
        
        <div class="card">
          <h3>🎯 TypeScript</h3>
          <p>完整的 TypeScript 支持，提供更好的代码智能提示和类型安全</p>
        </div>
        
        <div class="card">
          <h3>🛣️ Vue Router</h3>
          <p>强大的客户端路由系统，支持动态路由和路由守卫</p>
        </div>
        
        <div class="card">
          <h3>🗄️ Pinia</h3>
          <p>现代化的状态管理库，替代 Vuex，更简单更强大</p>
        </div>
        
        <div class="card">
          <h3>💅 CSS</h3>
          <p>优雅的样式设计，响应式布局，支持现代 CSS 特性</p>
        </div>
      </div>
      
      <div class="actions text-center mt-4">
        <button @click="incrementCounter" class="btn">
          点击次数: {{ counter }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 响应式数据
const counter = ref(0)

// 方法
const incrementCounter = () => {
  counter.value++
}
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 3rem 0;
}

.hero-title {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.features .card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.features .card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.features .card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.features .card p {
  color: #7f8c8d;
  line-height: 1.6;
}

.actions {
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .features {
    grid-template-columns: 1fr;
  }
}
</style>
