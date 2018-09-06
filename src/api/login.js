import request from '@/utils/request'

export function login(userNameOrEmailAddress, password) {
  return request({
    // url: '/user/login',
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data: {
      userNameOrEmailAddress,
      password,
      rememberClient: false
    }
  })
}

/* export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
} */

/* export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}*/
