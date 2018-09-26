import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/services/app/Role/GetAll',
    method: 'get',
    params: query
  })
}
