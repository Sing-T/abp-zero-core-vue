import request from '@/utils/request'

export function login(userNameOrEmailAddress, password) {
  return request({
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data: {
      userNameOrEmailAddress,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/api/services/app/Session/GetCurrentLoginInformations',
    method: 'get'
  })
}
