<template>
  <div ref="chart" style="width:100%;height:100%;"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'VCharts',
  data () {
    return {
      charts: null
    }
  },
  props: {
    option: {
      type: Object
    }
  },
  watch: {
    option: {
      handler (val) {
        this.charts.setOption(val, {
          notMerge: true
        })
      },
      deep: true
    }
  },
  methods: {
    setOption (option) {
      const ele = this.$refs.chart
      this.charts = echarts.init(ele, 'light')
      this.charts.setOption(option)
      this.$emit('render', this.charts)
    }
  },
  mounted () {
    this.setOption(this.option)
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.charts.resize()
      })
    })
  }
}
</script>
