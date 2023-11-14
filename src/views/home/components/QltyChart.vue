<template>
  <Charts ref="vcharts"  :option="option" />
</template>

<script>
import Charts from '@/components/Charts/Charts'
export default {
  data () {
    return {}
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    option () {
      const { value } = this
      return {
        series: [
          {
            type: 'pie',
            radius: '55%',
            color: 'rgba(105, 243, 167, 0.05)',
            data: [1],
            animationType: 'scale'
          },
          {
            type: 'gauge',
            name: '出勤率',
            center: ['50%', '50%'],
            radius: '55%',
            min: 0,
            max: 100,
            clockwise: true,
            animationDuration: 3000,
            startAngle: '90',
            endAngle: '-270',
            axisLine: {
              show: true,
              lineStyle: {
                width: 4,
                color: [
                  [
                    value / 100,
                    {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(105, 243, 167, 0.3)'
                        },
                        {
                          offset: 0.5,
                          color: 'rgba(105, 243, 167, 1)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(105, 243, 167, 1)'
                        }
                      ],
                      global: false
                    }
                  ],
                  [1, 'rgba(105, 243, 167, 0)']
                ]
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            title: {
              offsetCenter: [0, '35%'],
              fontSize: '13'.pxToVW(),
              color: '#DBF6FB',
              fontWeight: 400
            },
            detail: {
              show: true,
              offsetCenter: [0, '-18%'],
              formatter: `{value|${value}}{rate|%}`,
              rich: {
                value: {
                  fontSize: '22'.pxToVW(),
                  fontFamily: 'XinYiGuanHeiTi',
                  color: '#69F3A7',
                  fontWeight: 500,
                  padding: [0, 0, 0, 3]
                },
                rate: {
                  fontSize: '13'.pxToVW(),
                  fontFamily: 'XinYiGuanHeiTi',
                  color: '#69F3A7',
                  fontWeight: 500,
                  padding: [5, 0, 0, 0]
                }
              },
              label: {}
            },
            pointer: {
              show: false
            },
            data: [{ name: '良品率', value }]
          },
          {
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              const x0 = api.getWidth() / 2
              const y0 = api.getHeight() / 2
              const r0 = Math.min(api.getWidth(), api.getHeight()) / 2
              const r1 = r0 * (0.55 - 2 / r0)
              const x1 = x0 + r1 * Math.cos((((value / 100) * 360 - 90) * Math.PI) / 180)
              const y1 = y0 + r1 * Math.sin((((value / 100) * 360 - 90) * Math.PI) / 180)
              const point = { x: x1, y: y1 }
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 2
                },
                style: {
                  stroke: '#6BFAAC',
                  fill: '#6BFAAC',
                  shadowColor: '#6BFAAC',
                  shadowBlur: 5
                },
                silent: true
              }
            },
            data: [0]
          }
        ]
      }
    }
  },
  components: { Charts }
}
</script>
