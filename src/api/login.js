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

/* export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
} */
