export default {
  install(app) { 
    app.config.globalProperties.$formatDate = function (dateInput, format = 'YYYY-MM-DD HH:mm:ss') {
      if (!dateInput) return '';

      const parseDate = (input) => {
        if (typeof input === 'string') {
          const parsedDate = Date.parse(input);
          if (!isNaN(parsedDate)) return new Date(parsedDate);
        } else if (input instanceof Date) {
          return input;
        }
        return null;
      };

      const date = parseDate(dateInput);
      if (!date) return 'Invalid Date';

      const pad = (num) => String(num).padStart(2, '0');
      const tokens = {
        YYYY: date.getFullYear(),
        MM: pad(date.getMonth() + 1),
        DD: pad(date.getDate()),
        HH: pad(date.getHours()),
        mm: pad(date.getMinutes()),
        ss: pad(date.getSeconds()),
        SSS: pad(date.getMilliseconds()),
      };

      return format.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, (match) => tokens[match]);
    };
  }}