import { useFetch } from "../axiosInstance/useFetch"

export default {
  install(app) {
    app.config.globalProperties.$useFetch = useFetch
  }
}