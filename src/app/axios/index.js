import Axios from 'axios'

/**
 * axios 实例
 */
/* eslint-disable */
let baseSetting = {
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
}
let instance = Axios.create(baseSetting)

export default function request (url, data, baseConfig = {}) {
  return instance.post(url, data, baseConfig)
}
