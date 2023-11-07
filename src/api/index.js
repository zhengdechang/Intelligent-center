import request from '@/utils/request'

// 获取agv路线
export const getAgvList = params => {
  return request({
    url: '/api/v1/robots',
    method: 'get',
    params
  })
}
// 获取任务
export const getMissions = params => {
  return request({
    url: '/api/v1/missions',
    method: 'get',
    params
  })
}
// 获取地图
export const getMap = params => {
  return request({
    url: '/api/v1/maps',
    method: 'get',
    params
  })
}
