import { column_names } from "const/column_names"
import { utils, write, WritingOptions } from "xlsx"

const column_based_format = (file_number: number, sheet_name: string, file_data: JSON, export_blobs: Blob[], file_extension: string) => {
  /*
  Arguments:
    file_number: int              ファイルナンバー（APIでは1シート1ファイルとしてJSONに処理されるため、総シート数の中で何番目かということになる）
    sheet_name: string
    file_data: JSON
    export_blobs: Blob[]          スマートセンキョ形式の列名として成形したEXCELファイルの格納先となるBlob[]
    file_extension: string
  Returns:
    void

  Description:
    JSONで与えられたデータをスマセン形式の列名順に整え、EXCELファイルとして生成、生成したファイルをexport_blobsにファイル名をexport_blob_namesに保存する
  */

  const col_based_data: string[][] = new Array<Array<string>>(0)
  const file_data_keys = Object.keys(file_data)
  for (let column_name of column_names) {
    if (file_data_keys.includes(column_name)) {
      // todo: ここの警告を消したい
      // @ts-ignore
      col_based_data.push(Object.values(file_data[column_name]))
    }
  }
  // 転置を取る
  const transpose_func = (a: string[][]) => a[0].map((_, c) => a.map(r => r[c]))
  let worksheet_data:string[][] = [[""]];// 空ファイルを出力するときには転置を取れないため初期化が必要
  if(col_based_data.length!=0){
    worksheet_data = transpose_func(col_based_data)
  }
  const exportBook = utils.book_new()
  const newSheet = utils.aoa_to_sheet(worksheet_data)
  utils.book_append_sheet(exportBook, newSheet, sheet_name)
  const excel_opt: WritingOptions = ((extension: string) => {
    switch (extension){
      case "xls":
        return {
          bookType: "xls",
          bookSST: true,
          type: "array",
        };
      case "xlsx":
      default:
        return {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        };
    }
  })(file_extension);
  const export_file = write(exportBook, excel_opt)
  const export_blob = new Blob([export_file], {
    type: "application/octet-stream",
  })
  export_blobs[file_number] = export_blob
}

export default column_based_format
