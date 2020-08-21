import request from '@/utils/request'

// 获取设备列表
const fetchDeviceList = query => {
  return request({
    url: '/device/card',
    method: 'get',
    params: query
  })
}

// 设备导入
const importDevice = data => {
  return request({
    url: '/device/card/import',
    method: 'post',
    data
  })
}

// 设备回收
const recycleDevice = query => {
  return request({
    url: '/device/card/recycle',
    method: 'get',
    params: query
  })
}

// 设备分配与批量分配
const allotDevice = data => {
  return request({
    url: '/device/card/allot',
    method: 'post',
    data
  })
}

// 设备删除
const deleteDevice = data => {
  return request({
    url: '/device/card/remove',
    method: 'post',
    data
  })
}

export default {
  fetchDeviceList,
  importDevice,
  recycleDevice,
  allotDevice,
  deleteDevice
}
