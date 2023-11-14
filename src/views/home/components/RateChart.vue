<template>
   <Charts :option="option" />
</template>

<script>
import Charts from '@/components/Charts/Charts'
export default {
  data () {
    return {}
  },
  props: {
    label: String,
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    option () {
      const { label, value } = this
      return {
        title: [
          {
            text: `${value}%`,
            x: 'center',
            y: '31%',
            textStyle: {
              fontSize: '22'.pxToVW(),
              color: '#96F4FF',
              fontFamily: 'bahnschrift',
              fontWeight: 'normal'
            }
          },
          {
            text: label,
            x: 'center',
            y: '53%',
            textStyle: {
              fontSize: '14'.pxToVW(),
              color: '#FFFFFF',
              fontFamily: 'Microsoft YaHei',
              fontWeight: 400
            }
          }
        ],
        series: [
          {
            type: 'gauge',
            progress: {
              show: true
            },
            center: ['50%', '50%'],
            radius: '92%',
            clockwise: true,
            startAngle: -180,
            endAngle: 180,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [
                  [
                    value / 200,
                    {
                      type: 'linear',
                      x: 0,
                      x2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: '#acf9ff'
                        },
                        {
                          offset: 0.3,
                          color: '#039bff'
                        },
                        {
                          offset: 1,
                          color: '#2b23d4'
                        }
                      ],
                      global: false
                    }
                  ],
                  [0.5, 'rgba(172, 249, 255, 0.1)']
                ]
              }
            },
            axisLabel: {
              color: '#98A8B9',
              fontSize: '8'.pxToVW(),
              distance: -34,
              formatter: value => {
                if (value === 0 || value === 100) {
                  return value
                }
                return ''
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '78%',
            clockwise: true,
            startAngle: -180,
            endAngle: 180,
            progress: {
              show: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 7,
                color: [
                  [
                    value / 200,
                    {
                      type: 'linear',
                      x: 0,
                      x2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: '#acf9ff'
                        },
                        {
                          offset: 0.3,
                          color: '#039bff'
                        },
                        {
                          offset: 1,
                          color: '#2b23d4'
                        }
                      ],
                      global: false
                    }
                  ]
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
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          },
          {
            type: 'custom',
            coordinateSystem: 'none',
            renderItem: (params, api) => {
              const x0 = api.getWidth() / 2
              const y0 = api.getHeight() / 2
              const r0 = Math.min(x0, y0) * 0.925
              const r1 = r0 * (1 - 1 / r0)
              const x1 = x0 + r1 * Math.cos((((value / 100) * 180 - 180) * Math.PI) / 180)
              const y1 = y0 + r1 * Math.sin((((value / 100) * 180 - 180) * Math.PI) / 180)
              const point = { x: x1, y: y1 }
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 2
                },
                style: {
                  stroke: '#FFFFFF',
                  fill: '#FFFFFF',
                  shadowColor: '#FFFFFF',
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
