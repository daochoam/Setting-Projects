import { SESSION_NOT_COOKIE } from '@/const/const'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'
import instance from './axios'

instance.interceptors.request.use(
  async (config) => {
    const authStore = useAuthStore()
    const pathName = router.currentRoute.value.path

    if (pathName !== SESSION_NOT_COOKIE && !authStore.authenticated) {
      router.push(SESSION_NOT_COOKIE)
    }
    if (authStore.authenticated) {
      config.headers.Authorization = `Bearer ${authStore.token}`
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
