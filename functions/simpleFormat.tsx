import getExcelWriteOptions from "functions/getExcelWriteOptions"
import transpose2DStringArray from "functions/transpose2DStringArray"
import { utils, write, WritingOptions } from "xlsx"

const simpleFormat = (sheetName: string, fileData: JSON, fileExtension: string) => {
  /*
  Arguments:
    sheetName: string
    fileData: JSON
    fileExtension: stirng
  Returns:
    exportBlob: Blob             整形済みファイル

  Description:
    JSONで与えられたデータをスマセン形式の列名順に整え、EXCELファイルとして生成、生成したファイルを返す
  */

  const colBasedData: string[][] = new Array<Array<string>>(0)
  const fileDataKeys = Object.keys(fileData)
  for (const attribute_name of fileDataKeys) {
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
  return exportBlob
}

export default simpleFormat
