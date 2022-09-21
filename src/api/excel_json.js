
export default function handler(req, res){
  const XLSX = require('xlsx')
  let workbook = XLSX.readFile('public/data/BookLendingHistory.xlsx', {cellDates:true})
  // cellDates（日付セルの保持形式を指定）
  // false：数値（シリアル値）[default]
  // true ：日付フォーマット
  
  // データ取得
  let history, users, books
  workbook.SheetNames.forEach(sheet => {
      if("history" == sheet) history = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
      if("users" == sheet) users = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
      if("books" == sheet) books = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
  })
  
  // 抽出
  let notReturned = history.filter(function(item) {
      return !("返却日時" in item) 
  })
  
  
  // json加工
  let notReturnedReport = []
  notReturned.forEach(item => {
      item.ユーザ名 = getUserName(item)
      item.書籍名 = getBookName(item)
      notReturnedReport.push(item)
  })
  
  /**
   * JSON内のユーザIDに一致するユーザ名を返す
   * @param {*} item 
   */
  function getUserName(item){
      let userName = ""
      users.some(function(user) {
          if(user.ユーザID == item.ユーザID) userName = user.ユーザ名
      })
      return userName
  }
  
  /**
   * JSON内の貸出書籍コードに一致する書籍名を返す
   * @param {*} item 
   */
  function getBookName(item){
      let bookName = ""
      books.some(function(book) {
          if(book.書籍コード == item.貸出書籍コード) bookName = book.書籍名
      })
      return bookName
  }
  
  res.status(200).json({notReturnedReport})
}
