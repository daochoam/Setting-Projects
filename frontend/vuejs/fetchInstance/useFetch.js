import { SESSION_NOT_COOKIE } from '@/const/const'
import router from '@/router'
import { ref } from 'vue'

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
    options.signal = controller.signal

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
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }

      // Construir URL con Query Params
      const queryParams = new URLSearchParams(params).toString()
      const fullUrl = queryParams ? `${url}?${queryParams}` : url

      // Configurar opciones de fetch
      const fetchOptions = {
        method: options.method || 'GET',
        headers,
        ...options,
        ...(bodyData ? { body: JSON.stringify(bodyData) } : {}),
      }

      const response = await fetch(fullUrl, fetchOptions)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      data.value = await response.json()
    } catch (err) {
      if (err.name === 'AbortError') {
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
