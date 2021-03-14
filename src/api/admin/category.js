import request from '@/utils/request'

//新增分类
export function addCategory(data) {
  return request({
    url: '/article/category',
    method: 'post',
    data
  })
}
//修改分类
export function updateCategory(data) {
  return request({
    url: '/article/category',
    method: 'put',
    data
  })
}

//查询分类
export function getCategory() {
  return request({
    url: '/article/category',
    method: 'get',
  })

}
