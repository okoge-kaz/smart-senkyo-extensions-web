export default function get_formatted_date(date_data: Date): string{
  // args: date_data
  // return: request_time: 2022-10-25 23:56.14Zのような形式になる
  // 
  // APIに付属させるリクエスト日時の情報の生成

  const year: string = date_data.getFullYear().toString();
  const month: string = (date_data.getMonth() + 1).toString(); //getMonthでは1月が0になる
  const date: string = date_data.getDate().toString();
  const hour: string = date_data.getHours().toString();
  const minute: string = date_data.getMinutes().toString();
  const second: string = date_data.getSeconds().toString();
  const request_time: string = `${year}-${month}-${date} ${hour}:${minute}.${second}Z`
  return request_time;
}
