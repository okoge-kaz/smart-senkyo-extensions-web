import { SmartSenkyoColumnNames } from "const/SmartSenkyoColumnNames"
import getExcelWriteOptions from "functions/getExcelWriteOptions"
import transpose2DStringArray from "functions/transpose2DStringArray"
import { utils, write, WritingOptions } from "xlsx"

const getSmartSenkyoFormatBlobFromJson = (sheetName: string, fileData: JSON, fileExtension: string) => {
  /*
  Arguments:
    sheetName: string
    fileData: JSON
    fileExtension: string
  Returns:
    exportBlob: Blob             整形済みファイル

  Description:
    JSONで与えられたデータをスマセン形式の列名順に整え、EXCELファイルとして生成、生成したファイルを返す
  */

  const columnBasedData: string[][] = new Array<Array<string>>(0)
  const fileDataKeys = Object.keys(fileData)

  SmartSenkyoColumnNames.forEach(columnName => {
    if (fileDataKeys.includes(columnName)) {
      // todo: ここの警告を消したい
      // @ts-ignore
      columnBasedData.push(Object.values(fileData[columnName]))
    }
  })

  const worksheetData:string[][] = 
    columnBasedData.length != 0 
      ? transpose2DStringArray(columnBasedData)
      : [[""]]
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

export default getSmartSenkyoFormatBlobFromJson
