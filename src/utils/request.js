import axios from 'axios'
import { Loading } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

const request = (options, isLoading = true) => {
  let loadingService = null
  if (isLoading) {
    loadingService = Loading.service({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass: 'loading-data'
    })
  }
  return new Promise((resolve, reject) => {
    service(options)
      .then(response => {
        if (isLoading) {
          loadingService.close()
        }
        resolve(response.data)
      })
      .catch(error => {
        if (isLoading) {
          loadingService.close()
        }
        reject(error)
      })
  })
}

export default request
