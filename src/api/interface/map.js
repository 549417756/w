import request from '@/utils/request'

// 地图配置列表
const fetchMapSetting = query => {
  return request({
    url: '/map/config',
    method: 'get',
    params: query
  })
}

// 地图配置增加
const createMapSetting = data => {
  return request({
    url: '/map/config/add',
    method: 'post',
    data
  })
}

// 地图配置编辑
const editMapSetting = data => {
  return request({
    url: '/map/config/edit',
    method: 'post',
    data
  })
}

// 地图配置删除
const deleteMapSetting = data => {
  return request({
    url: '/map/config/remove',
    method: 'post',
    data
  })
}

// 保存地图
const createMapBg = data => {
  return request({
    url: '/school/map/save',
    method: 'post',
    data
  })
}

// 获取地图
const fetchMapBg = query => {
  return request({
    url: '/school/map',
    method: 'get',
    params: query
  })
}

export default {
  fetchMapSetting,
  createMapSetting,
  deleteMapSetting,
  editMapSetting,
  fetchMapBg,
  createMapBg
}
