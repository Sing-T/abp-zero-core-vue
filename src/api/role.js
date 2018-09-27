import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/services/app/Role/GetAll',
    method: 'get',
    params: query
  })
}

export function fetchRole(data) {
  return request({
    url: '/api/services/app/Role/Get',
    method: 'get',
    params: { id: data.id }
  })
}

export function createRole(data) {
  return request({
    url: '/api/services/app/Role/Create',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/api/services/app/Role/Update',
    method: 'put',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: '/api/services/app/Role/Delete',
    method: 'delete',
    params: { id: data.id }
  })
}

export function getAllPermissions() {
  return request({
    url: '/api/services/app/Role/getAllPermissions',
    method: 'get'
  })
}
