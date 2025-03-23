export default {
  install(app) {
    app.config.globalProperties.$axiosPromises = async (requests) => {
      const results = await Promise.allSettled([...requests])

      results.forEach((result) => {
        if (result.status === 'rejected') {
          console.info('Error en una petición:', result.reason)
        }
      })

      return results.map((r) => (r.status === 'fulfilled' ? r.value : null))
    }
  },
}