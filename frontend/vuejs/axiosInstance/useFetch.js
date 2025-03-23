import { SESSION_NOT_COOKIE } from '@/const/const'
import router from '@/router'
import { ref } from 'vue'
import instance from './axios'

export function useFetch(url, options = {}) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  let controller = null

  const fetchData = async (params = {}, bodyData = null) => {
    loading.value = true
    error.value = null
    data.value = null

    // Cancelar solicitud anterior si existe
    if (controller) {
      controller.abort()
    }
    controller = new AbortController()

    try {
      // Obtener token de sessionStorage
      const authData = JSON.parse(sessionStorage.getItem('auth') || '{}')
      const token = authData?.token

      if (!token && router.currentRoute.value.path !== SESSION_NOT_COOKIE) {
        router.push(SESSION_NOT_COOKIE)
        throw new Error('No autenticado')
      }

      // Configurar Headers
      const headers = {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }

      // Configurar opciones de Axios
      const axiosOptions = {
        method: options.method || 'GET',
        url,
        headers,
        params,
        data: bodyData,
        signal: controller.signal,
        ...options,
      }

      const response = await instance(axiosOptions)
      data.value = response.data
    } catch (err) {
      if (instance.isCancel(err)) {
        console.warn('Solicitud cancelada:', err.message)
      } else {
        error.value = err
      }
    } finally {
      loading.value = false
    }
  }

  return Object.assign(fetchData, { data, error, loading })
}
