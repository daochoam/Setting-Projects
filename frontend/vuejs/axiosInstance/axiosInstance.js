import { SESSION_NOT_COOKIE } from '@/const/const'
import router from '@/router'
import instance from './axios'

instance.interceptors.request.use(
  async (config) => {
    // Obtener datos de autenticación desde sessionStorage
    const authData = JSON.parse(sessionStorage.getItem('auth') || '{}')
    const authenticated = authData?.authenticated
    const token = authData?.token
    const pathName = router.currentRoute.value.path

    if (pathName !== SESSION_NOT_COOKIE && !authenticated) {
      router.push(SESSION_NOT_COOKIE)
    }
    if (authenticated) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return { data: response.data, status: response.status }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
