export const generateDate = (date: Date) => {
  let day: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  const year: string | number = date.getFullYear();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return day + '-' + month + '-' + year;
};

export const generateHour = (date: Date) => {
  let hour: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();

  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return hour + `:` + minutes;
};
