import router from '@/router'
import axios from 'axios'
import { Message } from 'element-ui'

const baseUrl = 'http://xue.cnkdl.cn:23683'
const service = axios.create({
  url:baseUrl,
  timeout:5000
})

// 设置请求拦截器
service.interceptors.request.use(config=>{
  const token = localStorage.getItem('edb-authorization-token')
  if(token && !config.url.endsWith("/login") && !config.url.endsWith("/captchaImage")){
    // 携带token的写法
    config.headers["Authorization"] = "Bearer " + token 
  }
  return config
},err=>{
  return Promise.reject(err)
})
// 设置相应拦截器
service.interceptors.response.use(res=>{
  let res_data = res.data
  // 只要不是200就执行以下代码
  if(res_data.code != 200){
    Message.error(res_data.msg || '网络请求错误')
    if(res_data.code == 401){
      // 401常表示token过期或没带
      localStorage.removeItem('edb-authorization-token')
      router.push('/login')
    }
    // 这里return是为了return值传到组件中的res
    return false
  }
  return res.data
},err=>{
  return Promise.reject(err)
})

export default service

// 发起请求获取验证码图片
export function getCapthcaImg(){
    return service({
      method:'GET',
      url:baseUrl+'/prod-api/captchaImage'
    })
    
}

// 登录请求 因调用显示异常而关闭登录请求
export const loginRequest = (params) => service.post(baseUrl+'/prod-api/login',params)

// 获取用户可以访问的路由的api
export const getRoutersApi = () => service.get(baseUrl+'/prod-api/getRouters')

// 获取客户列表
export const getCustomerList = (params)=>service.get(baseUrl+'/prod-api/customer',{params})

// shenhe
export const BpmnInfo = (params)=>service.post(baseUrl+'/prod-api/business/bpmnInfo',params)