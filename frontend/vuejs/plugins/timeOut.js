export default {
  install(app) {
    app.config.globalProperties.$timeOut = (delay, callback) => {
      let status = 'pending';
      const timerId = setTimeout(() => {
        try {
          const data = callback();
          status = 'fulfilled';
          return { status, data };
        } catch (error) {
          status = 'rejected';
          return { status, error };
        }
      }, delay);

      return () => {
        clearTimeout(timerId);
        status = 'cancelled';
        return { status };
      };
    };
  },
};