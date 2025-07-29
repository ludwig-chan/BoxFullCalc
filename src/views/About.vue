<template>
  <div class="about">
    <div class="container">
      <div class="card">
        <h1>关于 BoxFullCalc</h1>
        <p class="mt-3">
          这是一个使用 Vue 3 + TypeScript + Vite 构建的现代化 Web 应用程序模板。
        </p>
        
        <h2 class="mt-4">技术栈</h2>
        <ul class="tech-list mt-2">
          <li><strong>Vue 3</strong> - 渐进式 JavaScript 框架</li>
          <li><strong>TypeScript</strong> - JavaScript 的超集，提供静态类型检查</li>
          <li><strong>Vite</strong> - 下一代前端构建工具</li>
          <li><strong>Vue Router</strong> - Vue.js 的官方路由器</li>
          <li><strong>Pinia</strong> - Vue 的状态管理库</li>
          <li><strong>ESLint</strong> - 代码质量工具</li>
          <li><strong>Prettier</strong> - 代码格式化工具</li>
        </ul>
        
        <h2 class="mt-4">特性</h2>
        <ul class="feature-list mt-2">
          <li>✅ Vue 3 Composition API</li>
          <li>✅ TypeScript 支持</li>
          <li>✅ 热重载开发服务器</li>
          <li>✅ ESLint + Prettier 代码规范</li>
          <li>✅ 路由系统</li>
          <li>✅ 状态管理</li>
          <li>✅ 响应式设计</li>
          <li>✅ 现代化构建优化</li>
        </ul>
        
        <h2 class="mt-4">开始使用</h2>
        <div class="code-block mt-2">
          <pre><code># 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview</code></pre>
        </div>
        
        <div class="text-center mt-4">
          <router-link to="/" class="btn">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这个页面不需要额外的逻辑
</script>

<style scoped>
.about {
  padding: 2rem 0;
}

.about h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.about h2 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.tech-list,
.feature-list {
  list-style: none;
  padding-left: 0;
}

.tech-list li,
.feature-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.tech-list li:last-child,
.feature-list li:last-child {
  border-bottom: none;
}

.tech-list strong {
  color: #42b883;
}

.feature-list li {
  color: #2c3e50;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.code-block code {
  color: #2c3e50;
}
</style>
