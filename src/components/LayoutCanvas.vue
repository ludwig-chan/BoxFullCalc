<template>
  <div class="layout-canvas">
    <canvas ref="canvasRef" :width="canvasWidth" :height="canvasHeight" class="viz-canvas"></canvas>
    <div class="viz-legend">
      <p>容器: 宽 {{ containerW }} m × 长 {{ containerH }} m</p>
      <p>货物: 宽 {{ itemW }} m × 长 {{ itemH }} m</p>
      <p>混排布局：共 {{ totalCount }} 件</p>
      <p><span style="color: #2c3e50;">■</span> 正放货物　<span style="color: #e74c3c;">■</span> 旋转货物</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

interface Cell {
  x: number
  y: number
  w: number
  h: number
  type: string
}

interface Props {
  containerW: number
  containerH: number
  itemW: number
  itemH: number
  cells: Cell[]
  totalCount: number
}

const props = defineProps<Props>()

const canvasRef = ref<HTMLCanvasElement>()
const canvasWidth = ref(400)
const canvasHeight = ref(300)

const drawCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 计算缩放比例，使布局适应画布
  const scaleX = canvas.width / props.containerW
  const scaleY = canvas.height / props.containerH
  const scale = Math.min(scaleX, scaleY)

  // 居中偏移
  const offsetX = (canvas.width - props.containerW * scale) / 2
  const offsetY = (canvas.height - props.containerH * scale) / 2

  // 绘制容器背景
  ctx.fillStyle = '#f6f8fa'
  ctx.strokeStyle = '#e74c3c'  // 红色边框
  ctx.lineWidth = 3  // 稍微加粗边框
  ctx.fillRect(offsetX, offsetY, props.containerW * scale, props.containerH * scale)
  ctx.strokeRect(offsetX, offsetY, props.containerW * scale, props.containerH * scale)

  // 绘制货物
  props.cells.forEach(cell => {
    const x = offsetX + cell.x * scale
    const y = offsetY + cell.y * scale
    const w = cell.w * scale
    const h = cell.h * scale

    ctx.fillStyle = cell.type === 'rotated' ? '#e74c3c' : '#2c3e50'
    ctx.fillRect(x, y, w, h)

    // 去掉货物边框
    // ctx.strokeStyle = '#ffffff'
    // ctx.lineWidth = 1
    // ctx.strokeRect(x, y, w, h)
  })
}

onMounted(() => {
  nextTick(() => {
    drawCanvas()
  })
})

watch([() => props.cells, () => props.containerW, () => props.containerH], () => {
  nextTick(() => {
    drawCanvas()
  })
})
</script>

<style scoped>
.layout-canvas {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.viz-canvas {
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

.viz-legend {
  font-size: 0.95rem;
  color: #444;
}
</style>