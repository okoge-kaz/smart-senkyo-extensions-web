export const get_formatted_date = (date: Date) => {
  console.log("Memo update")
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString(); //getMonthでは1月が0になる
  const day: string = date.getDay().toString();
  const hour: string = date.getHours().toString();
  const minute: string = date.getMinutes().toString();
  const second: string = date.getSeconds().toString();
  const request_time: string = `${year}-${month}-${day} ${hour}:${minute}.${second}Z`
  return request_time;
}
