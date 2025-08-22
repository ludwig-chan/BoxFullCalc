<template>
  <div class="home">
    <div class="container">
      <div class="hero">
        <h1 class="hero-title">欢迎使用 BoxFullCalc</h1>
        <p class="hero-subtitle">一个现代化的 Vue 3 应用程序</p>
      </div>

      <!-- 装箱计算器 -->
      <section class="calculator card">
        <h2>📦 装箱计算器</h2>
  <form @submit.prevent>
          <div class="row">
            <label>车厢宽度 (单位: m)</label>
            <input type="number" step="0.01" min="0" v-model.number="containerW" @input="resetCalculated" />
          </div>
          <div class="row">
            <label>车厢长度 (单位: m)</label>
            <input type="number" step="0.01" min="0" v-model.number="containerH" @input="resetCalculated" />
          </div>

          <div class="row">
            <label>货物宽度 (单位: m)</label>
            <input type="number" step="0.01" min="0" v-model.number="itemW" @input="resetCalculated" />
          </div>
          <div class="row">
            <label>货物长度 (单位: m)</label>
            <input type="number" step="0.01" min="0" v-model.number="itemH" @input="resetCalculated" />
          </div>

          <div class="row inline">
            <label><input type="checkbox" v-model="allowRotate" @change="resetCalculated" /> 允许旋转放置 (90°)</label>
          </div>

          <div class="row">
            <button type="button" class="btn" @click="calculate">计算</button>
          </div>

          <div class="result" v-if="calculated">
            <div v-if="validationMessage" class="error">{{ validationMessage }}</div>
            <div v-else>
              <p>最大可放数量: <strong>{{ maxCount }}</strong></p>
              <p class="muted">布局一 (不旋转)： {{ layout1.wCount }} × {{ layout1.hCount }}，剩余空间 (宽×长): {{ layout1.remW.toFixed(2) }} × {{ layout1.remH.toFixed(2) }} m</p>
              <p class="muted" v-if="allowRotate">布局二 (旋转)： {{ layout2.wCount }} × {{ layout2.hCount }}，剩余空间 (宽×长): {{ layout2.remW.toFixed(2) }} × {{ layout2.remH.toFixed(2) }} m</p>
            </div>
          </div>

          <!-- 可视化示意图 -->
          <div class="visualization" v-if="calculated">
            <h3>布局示意图</h3>
            <div class="viz-container">
              <svg class="viz-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-label="布局示意图">
                <!-- container background -->
                <rect x="0" y="0" width="100" height="100" fill="#f6f8fa" stroke="#333" stroke-width="0.6" />
                <!-- cells -->
                <g v-for="(cell, idx) in cellsToRender" :key="idx">
                  <rect :x="cell.x" :y="cell.y" :width="cell.w" :height="cell.h" fill="#2c3e50" stroke="#ffffff" stroke-width="0.4" rx="1" />
                </g>
              </svg>
              <div class="viz-legend">
                <p>容器: 宽 {{ containerW }} m × 长 {{ containerH }} m</p>
                <p>货物: 宽 {{ itemW }} m × 长 {{ itemH }} m</p>
                <p>选用布局: {{ chosenLayoutName }}，共 {{ chosenLayout.total }} 件</p>
              </div>
            </div>
          </div>
        </form>
      </section>

  <!-- features removed -->

  <!-- actions removed -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'



// 装箱计算相关
const containerW = ref<number | null>(2.4) // 默认示例值，单位 m
const containerH = ref<number | null>(2.6)
const itemW = ref<number | null>(1)
const itemH = ref<number | null>(1.2)
const allowRotate = ref(false)
const calculated = ref(false)
const validationMessage = ref('')

function calculate() {
  // 简单校验
  if (!containerW.value || !containerH.value || !itemW.value || !itemH.value) {
    validationMessage.value = '请填写所有尺寸，且均为大于 0 的数值。'
    calculated.value = true
    return
  }
  if (containerW.value <= 0 || containerH.value <= 0 || itemW.value <= 0 || itemH.value <= 0) {
    validationMessage.value = '尺寸必须大于 0。'
    calculated.value = true
    return
  }
  validationMessage.value = ''
  calculated.value = true
}

// 当输入变化时取消已计算状态，用户需要重新点击计算
const resetCalculated = () => {
  calculated.value = false
  validationMessage.value = ''
}

// 监听输入变化
;[containerW, containerH, itemW, itemH, allowRotate].forEach(r => {
  r.value; // ensure ref
})

const error = computed(() => {
  if (!containerW.value || !containerH.value || !itemW.value || !itemH.value) return '请填写所有尺寸，且均为大于 0 的数值。'
  if (containerW.value <= 0 || containerH.value <= 0 || itemW.value <= 0 || itemH.value <= 0) return '尺寸必须大于 0。'
  return ''
})

function fitCount(cW: number, cH: number, iW: number, iH: number) {
  const wCount = Math.floor(cW / iW)
  const hCount = Math.floor(cH / iH)
  const total = Math.max(0, wCount) * Math.max(0, hCount)
  const remW = cW - wCount * iW
  const remH = cH - hCount * iH
  return { total, wCount, hCount, remW, remH }
}

const layout1 = computed(() => {
  if (error.value) return { total: 0, wCount: 0, hCount: 0, remW: 0, remH: 0 }
  return fitCount(containerW.value as number, containerH.value as number, itemW.value as number, itemH.value as number)
})

const layout2 = computed(() => {
  if (error.value) return { total: 0, wCount: 0, hCount: 0, remW: 0, remH: 0 }
  return fitCount(containerW.value as number, containerH.value as number, itemH.value as number, itemW.value as number)
})

const maxCount = computed(() => {
  if (error.value) return 0
  const a = layout1.value.total
  const b = allowRotate.value ? layout2.value.total : 0
  return Math.max(a, b)
})

// 选择要展示的布局（取最大数的那个）
const chosenLayout = computed(() => {
  if (error.value) return layout1.value
  const a = layout1.value
  const b = layout2.value
  if (!allowRotate.value) return a
  return b.total > a.total ? b : a
})

const chosenLayoutName = computed(() => {
  if (error.value) return ''
  const a = layout1.value.total
  const b = layout2.value.total
  if (!allowRotate.value) return '未旋转'
  return b > a ? '已旋转' : '未旋转'
})

// 生成用于 SVG 渲染的单元格（归一化到 100x100 视口）
const cellsToRender = computed(() => {
  if (error.value) return []
  // 使用选中的布局：计算每个货物在视口中的宽高与位置
  const layout = chosenLayout.value
  const cW = (containerW.value as number)
  const cH = (containerH.value as number)
  const itemWval = layout === layout1.value ? (itemW.value as number) : (allowRotate.value ? (itemH.value as number) : (itemW.value as number))
  const itemHval = layout === layout1.value ? (itemH.value as number) : (allowRotate.value ? (itemW.value as number) : (itemH.value as number))

  // 视口缩放比例 (100 为视口最大尺寸)
  const scale = Math.min(100 / cW, 100 / cH)

  const wCount = layout.wCount
  const hCount = layout.hCount
  const cellW = itemWval * scale
  const cellH = itemHval * scale

  const cells: Array<{ x: number; y: number; w: number; h: number }> = []
  for (let r = 0; r < hCount; r++) {
    for (let c = 0; c < wCount; c++) {
      const x = c * cellW
      const y = r * cellH
      cells.push({ x, y, w: cellW, h: cellH })
    }
  }
  // 将坐标按比例放大/居中以填充视口
  // 计算实际占用宽高
  const usedW = wCount * cellW
  const usedH = hCount * cellH
  const offsetX = (100 - usedW) / 2
  const offsetY = (100 - usedH) / 2
  return cells.map(cell => ({ x: +(cell.x + offsetX).toFixed(2), y: +(cell.y + offsetY).toFixed(2), w: +cell.w.toFixed(2), h: +cell.h.toFixed(2) }))
})
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

/* features removed */

/* actions removed */

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
}

/* calculator styles */
.calculator {
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}
.calculator .row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}
.calculator .row.inline {
  flex-direction: row;
  align-items: center;
}
.calculator input[type="number"] {
  padding: 0.4rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 220px;
}
.result {
  margin-top: 0.75rem;
}
.error {
  color: #c0392b;
}
.muted {
  color: #6c757d;
  font-size: 0.95rem;
}
.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background: #2c3e50;
  color: #fff;
  cursor: pointer;
}

.visualization {
  margin-top: 1rem;
}
.viz-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.viz-svg {
  width: 320px;
  height: 320px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
.viz-legend {
  font-size: 0.95rem;
  color: #444;
}
</style>

