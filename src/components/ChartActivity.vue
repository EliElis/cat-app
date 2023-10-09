<script setup>
import Chart from 'primevue/chart'
import Card from 'primevue/card'
import { ref, onMounted } from 'vue'

const chartData = ref()
const props = defineProps(['dates', 'statistic'])

onMounted(() => {
  chartData.value = setChartData()
})

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement)

  return {
    labels: props.dates,
    datasets: [
      {
        label: 'Cat Activity',
        data: props.statistic,
        fill: true,
        borderColor: documentStyle.getPropertyValue('--orange-500'),
        tension: 0.4,
        backgroundColor: 'rgba(255,167,38,0.2)'
      }
    ]
  }
}
const chartOptions = ref({
  aspectRatio: 1
})
</script>

<template>
  <Card>
    <template #title> Activity </template>
    <template #subtitle>Active minutes in 1 hour during last 12 hours </template>
    <template #content>
      <Chart type="line" :data="chartData" :options="chartOptions" />
    </template>
  </Card>
</template>
