const getFormattedDate = (dateData: Date): string => {
  /*
  Argument:
    dateData: Date
  Return:
    formatted_time: string

  Example:
    getFormattedDate(date) -> "2022-10-25 23:56.14Z"

  Description:
    APIに付属させるリクエスト日時の情報の生成
  */

  const year: string = dateData.getFullYear().toString();
  const month: string = (dateData.getMonth() + 1).toString(); //getMonthでは1月が0になる
  const date: string = dateData.getDate().toString();
  const hour: string = dateData.getHours().toString();
  const minute: string = dateData.getMinutes().toString();
  const second: string = dateData.getSeconds().toString();
  const requestTime: string = `${year}-${month}-${date} ${hour}:${minute}.${second}Z`
  return requestTime;
}

export default getFormattedDate
