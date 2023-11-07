export default {
  /**
   * Echarts tooltip（添加单位）
   * @param params echarts formatter 中的参数params
   * @param units String/Array 单位
   * @return HTML标签
   */
  tooltipFormatter: (params, units) => {
    if (Array.isArray(units) || typeof units === 'string') {
      const { name } = params[0]
      let tipsEl = `<div>${name}</div>`
      params.forEach(param => {
        let marker = ''
        if (param.color) {
          marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#9DCBFF;"></span>'
        } else {
          marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#9DCBFF;"></span>'
        }
        const { seriesName, value, componentIndex } = param
        const unit = Array.isArray(units) ? units[componentIndex] : units
        const contentEl = `<div>${marker}${seriesName}：${value === '' ? '-' : value}${unit}</div>`
        tipsEl += contentEl
      })
      return tipsEl
    } else {
      throw Error('Arguments \'units\' must be string or array')
    }
  }
}
