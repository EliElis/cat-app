<script setup>
import Chart from 'primevue/chart'
import Card from 'primevue/card'
import { ref } from 'vue'
const chartData = ref({})
const props = defineProps(['dates', 'statistic'])
chartData.value = {
  labels: props.dates,
  datasets: [
    {
      label: 'Birds',
      data: props.statistic,
      borderWidth: 1
    }
  ]
}

const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true
    }
  },
  aspectRatio: 1
})
</script>
<template>
  <Card>
    <template #title> Birds </template>
    <template #subtitle>Birds caught during last 7 days </template>
    <template #content>
      <Chart type="bar" :data="chartData" :options="chartOptions" />
    </template>
  </Card>
</template>
