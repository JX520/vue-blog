import request from '@/utils/request';

//获取文章列表
export function getList(data) {
  return request({
    url: '/article/article',
    method: 'get',
    params: data
  })
}
//获取单个文章
export function getArticle(data) {
  return request({
    url: '/article/article',
    method: 'get',
    params: data
  })
}
//发布文章
export function addArticle(data) {
  return request({
    url: '/article/publish',
    method: 'post',
    data
  })
}

//修改文章
export function updateArticle(data) {
  return request({
    url: '/article/edit',
    method: 'post',
    data
  })
}
