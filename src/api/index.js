import request from '@/utils/request';

//获取文章归档
export function getArchive(data) {
  return request({
    url: '/article/article',
    method: 'get',
    params: data
  })
}
