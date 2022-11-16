import getExcelWriteOptions from "functions/getExcelWriteOptions"
import transpose2DStringArray from "functions/transpose2DStringArray"
import { utils, write, WritingOptions } from "xlsx"

const simpleFormat = (fileNumber: number, sheetName: string, fileData: JSON, exportBlobs: Blob[], fileExtension: string) => {
  /*
  Arguments:
    fileNumber: int              ファイルナンバー（APIでは1シート1ファイルとしてJSONに処理されるため、総シート数の中で何番目かということになる）
    sheetName: string
    fileData: JSON
    exportBlobs: Blob[]          スマートセンキョ形式の列名として成形したEXCELファイルの格納先となるBlob[]
    fileExtension: stirng
  Returns:
    void

  Description:
    JSONで与えられたデータをスマセン形式の列名順に整え、EXCELファイルとして生成、生成したファイルをexportBlobsにファイル名をexportBlob_namesに保存する
  */

  const colBasedData: string[][] = new Array<Array<string>>(0)
  const fileDataKeys = Object.keys(fileData)
  for (let attribute_name of fileDataKeys) {
    // todo: ここの警告を消したい
    // @ts-ignore
    colBasedData.push(Object.values(fileData[attribute_name]))
  }
  let worksheetData:string[][] = [[""]];// 空ファイルを出力するときには転置を取れないため初期化が必要
  if(colBasedData.length!=0){
    worksheetData = transpose2DStringArray(colBasedData)
  }
  const exportBook = utils.book_new()
  const newSheet = utils.aoa_to_sheet(worksheetData)
  utils.book_append_sheet(exportBook, newSheet, sheetName)
  const excelOpt: WritingOptions = getExcelWriteOptions(fileExtension);

  const exportFile = write(exportBook, excelOpt)
  const exportBlob = new Blob([exportFile], {
    type: "application/octet-stream",
  })
  exportBlobs[fileNumber] = exportBlob
}

export default simpleFormat
