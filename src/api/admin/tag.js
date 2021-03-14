import request from '@/utils/request';

//新增标签
export function addTag(data) {
  return request({
    url: '/article/tag',
    method: 'post',
    data
  })
}
//修改标签
export function updateTag(data) {
  return request({
    url: '/article/tag',
    method: 'put',
    data
  })
}
//查询标签
export function getTag() {
  return request({
    url: '/article/tag',
    method: 'get',
  })
}
