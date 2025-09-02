<template>
  <div class="home">
    <div class="container">
      <!-- 装箱计算器 -->
      <section class="calculator card">
        <h2>📦 混排装箱计算器</h2>
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

          <div class="row">
            <button type="button" class="btn" @click="calculate">计算</button>
          </div>

          <div class="result" v-if="calculated">
            <div v-if="validationMessage" class="error">{{ validationMessage }}</div>
            <div v-else>
              <p>最大可放数量: <strong>{{ maxCount }}</strong></p>
              <p class="muted">混排布局：正放 {{ layout3.normalCount }} 件 + 旋转 {{ layout3.rotatedCount }} 件</p>
              <p class="muted">剩余空间 (宽×长): {{ layout3.normalLayout.remW.toFixed(2) }} × {{ layout3.normalLayout.remH.toFixed(2) }} m</p>
            </div>
          </div>

          <!-- 可视化示意图 -->
          <div class="visualization" v-if="calculated">
            <h3>布局示意图</h3>
            <LayoutCanvas
              :containerW="containerW!"
              :containerH="containerH!"
              :itemW="itemW!"
              :itemH="itemH!"
              :cells="cellsToRender"
              :totalCount="chosenLayout.total"
            />
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
import LayoutCanvas from '../components/LayoutCanvas.vue'



// 装箱计算相关
const containerW = ref<number | null>(4.0) // 车厢宽度，单位 m
const containerH = ref<number | null>(2.5) // 车厢长度，单位 m
const itemW = ref<number | null>(1.2) // 货物宽度，单位 m
const itemH = ref<number | null>(1.8) // 货物长度，单位 m
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
;[containerW, containerH, itemW, itemH].forEach(r => {
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
function calculateMixedPacking(containerW: number, containerH: number, itemW: number, itemH: number) {
  // 全正放布局
  const normalLayout = fitCount(containerW, containerH, itemW, itemH)
  const normalTotal = normalLayout.total

  // 全旋转布局
  const rotatedLayout = fitCount(containerW, containerH, itemH, itemW)
  const rotatedTotal = rotatedLayout.total

  // 贪婪混合布局：先尽可能多放正放货物，再在剩余空间放旋转货物
  const greedyNormal = fitCount(containerW, containerH, itemW, itemH)
  const remainingW = containerW - greedyNormal.wCount * itemW
  const remainingH = containerH - greedyNormal.hCount * itemH
  const greedyRotated = fitCount(remainingW, remainingH, itemH, itemW)
  const greedyTotal = greedyNormal.total + greedyRotated.total

  // 选择三种方案中的最优解
  let maxTotal = Math.max(normalTotal, rotatedTotal, greedyTotal)
  let bestCombination

  if (maxTotal === normalTotal) {
    bestCombination = {
      normalCount: normalTotal,
      rotatedCount: 0,
      normalLayout: normalLayout,
      rotatedLayout: { wCount: 0, hCount: 0, remW: 0, remH: 0 }
    }
  } else if (maxTotal === rotatedTotal) {
    bestCombination = {
      normalCount: 0,
      rotatedCount: rotatedTotal,
      normalLayout: { wCount: 0, hCount: 0, remW: 0, remH: 0 },
      rotatedLayout: rotatedLayout
    }
  } else {
    bestCombination = {
      normalCount: greedyNormal.total,
      rotatedCount: greedyRotated.total,
      normalLayout: greedyNormal,
      rotatedLayout: greedyRotated
    }
  }

  return {
    total: maxTotal,
    normalCount: bestCombination.normalCount,
    rotatedCount: bestCombination.rotatedCount,
    normalLayout: bestCombination.normalLayout,
    rotatedLayout: bestCombination.rotatedLayout
  }
}

const layout3 = computed(() => {
  if (error.value) return { total: 0, normalCount: 0, rotatedCount: 0, normalLayout: { wCount: 0, hCount: 0, remW: 0, remH: 0 }, rotatedLayout: { wCount: 0, hCount: 0, remW: 0, remH: 0 } }
  return calculateMixedPacking(containerW.value as number, containerH.value as number, itemW.value as number, itemH.value as number)
})

const maxCount = computed(() => {
  if (error.value) return 0
  return layout3.value.total
})

// 直接使用混排布局
const chosenLayout = computed(() => {
  if (error.value) return layout3.value
  return layout3.value
})

const chosenLayoutName = computed(() => {
  if (error.value) return ''
  return '混排'
})

// 生成用于 SVG 渲染的单元格（使用实际尺寸）
const cellsToRender = computed(() => {
  if (error.value) return []
  const layout = chosenLayout.value
  const cW = (containerW.value as number)
  const cH = (containerH.value as number)
  const iW = (itemW.value as number)
  const iH = (itemH.value as number)

  const cells: Array<{ x: number; y: number; w: number; h: number; type: string }> = []

  // 渲染正放货物
  const normalWCount = layout.normalLayout.wCount
  const normalHCount = layout.normalLayout.hCount
  for (let r = 0; r < normalHCount; r++) {
    for (let c = 0; c < normalWCount; c++) {
      const x = c * iW
      const y = r * iH
      cells.push({ x, y, w: iW, h: iH, type: 'normal' })
    }
  }

  // 渲染旋转货物（在剩余空间中）
  const remainingW = cW - (normalWCount * iW)
  const remainingH = cH - (normalHCount * iH)
  const rotatedWCount = layout.rotatedLayout.wCount
  const rotatedHCount = layout.rotatedLayout.hCount

  for (let r = 0; r < rotatedHCount; r++) {
    for (let c = 0; c < rotatedWCount; c++) {
      const x = (normalWCount * iW) + (c * iH)
      const y = (normalHCount * iH) + (r * iW)
      cells.push({ x, y, w: iH, h: iW, type: 'rotated' })
    }
  }

  return cells
})
</script>

<style scoped>
/* features removed */

/* actions removed */

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
</style>

