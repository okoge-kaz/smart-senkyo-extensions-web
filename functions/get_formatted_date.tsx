export default function get_formatted_date(date: Date): string{
  // args: Date
  // return: request_time: 2022-10-25 23:48:19Zのような形式になる
  // 
  // APIに付属させるリクエスト日時の情報の生成

  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString(); //getMonthでは1月が0になる
  const day: string = date.getDay().toString();
  const hour: string = date.getHours().toString();
  const minute: string = date.getMinutes().toString();
  const second: string = date.getSeconds().toString();
  const request_time: string = `${year}-${month}-${day} ${hour}:${minute}.${second}Z`
  return request_time;
}
