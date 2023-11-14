<template>
  <Charts :option="option" />
</template>

<script>
import Charts from '@/components/Charts/Charts'
import dayjs from 'dayjs'
export default {
  data () {
    return {}
  },
  computed: {
    option () {
      const { $global } = this
      const xAxisList = []
      for (let i = 0; i < 6; i++) {
        const date = dayjs().subtract(i, 'M').format('YYYY/MM')
        xAxisList.unshift(date)
      }
      // 电
      const electricityList = [800, 500, 700, 1200, 1700, 1850]
      const maxElectricity = Math.max(...electricityList)
      // 水
      const waterList = [200, 800, 1200, 1600, 1800, 1700]
      const maxWater = Math.max(...waterList)
      // 气
      const gasList = [800, 500, 700, 1200, 1700, 1850]
      const maxGas = Math.max(...gasList)
      return {
        grid: [
          {
            left: '15'.pxToVW,
            top: '5px',
            width: '92.5%',
            height: '27.5%',
            containLabel: true
          },
          {
            left: '10'.pxToVW,
            top: '37%',
            width: '92.5%',
            height: '27.5%',
            containLabel: true
          },
          {
            left: '10'.pxToVW,
            top: '71.5%',
            width: '92.5%',
            height: '27.5%',
            containLabel: true
          }
        ],
        xAxis: [
          {
            gridIndex: 0,
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#003366'
              }
            },
            axisLabel: {
              interval: 0,
              fontFamily: 'Microsoft YaHei',
              fontSize: '10'.pxToVW,
              color: '#7297C0'
            },
            data: xAxisList
          },
          {
            gridIndex: 1,
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#003366'
              }
            },
            axisLabel: {
              interval: 0,
              fontFamily: 'Microsoft YaHei',
              fontSize: '10'.pxToVW,
              color: '#7297C0'
            },
            data: xAxisList
          },
          {
            gridIndex: 2,
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#003366'
              }
            },
            axisLabel: {
              interval: 0,
              fontFamily: 'Microsoft YaHei',
              fontSize: '10'.pxToVW,
              color: '#7297C0'
            },
            data: xAxisList
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: 'value',
            splitNumber: 2,
            axisLabel: {
              fontFamily: 'Microsoft YaHei',
              fontSize: '10'.pxToVW,
              color: '#7297C0'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          {
            gridIndex: 1,
            type: 'value',
            splitNumber: 2,
            axisLabel: {
              fontFamily: 'Microsoft YaHei',
              fontSize: '10'.pxToVW,
              color: '#7297C0'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          {
            gridIndex: 2,
            type: 'value',
            splitNumber: 2,
            axisLabel: {
              fontFamily: 'Microsoft YaHei',
              fontSize: '10'.pxToVW,
              color: '#7297C0'
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'line',
            name: '电量',
            symbolSize: (value) => {
              return maxElectricity === value ? 3 : 0
            },
            color: '#fff',
            smooth: true,
            xAxisIndex: 0,
            yAxisIndex: 0,
            emphasis: { // 高亮样式
              itemStyle: {
                color: '#000'
              },
              borderColor: 'orange'
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#9DCBFF'
                  },
                  {
                    offset: 1,
                    color: '#3899FD'
                  }
                ],
                global: false
              }
            },
            data: electricityList
          },
          {
            type: 'line',
            name: '水量',
            symbolSize: (value) => {
              return maxWater === value ? 3 : 0
            },
            color: '#fff',
            smooth: true,
            xAxisIndex: 1,
            yAxisIndex: 1,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#07CBD7'
                  },
                  {
                    offset: 1,
                    color: '#27D793'
                  }
                ],
                global: false
              }
            },
            data: waterList
          },
          {
            type: 'line',
            name: '气量',
            symbolSize: (value) => {
              return maxGas === value ? 3 : 0
            },
            color: '#fff',
            smooth: true,
            xAxisIndex: 2,
            yAxisIndex: 2,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#9DCBFF'
                  },
                  {
                    offset: 1,
                    color: '#3899FD'
                  }
                ],
                global: false
              }
            },
            data: gasList
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: params => {
            return $global.tooltipFormatter(params, 'min')
          }
        }
      }
    }
  },
  methods: {},
  components: { Charts }
}
</script>
