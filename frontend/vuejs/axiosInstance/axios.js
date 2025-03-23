import { URL_DNP_BACK } from '@/const/const'
import axios from 'axios'

const instance = axios.create({
  baseURL: URL_DNP_BACK,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default instance
