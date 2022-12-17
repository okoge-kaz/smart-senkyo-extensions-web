import getExcelWriteOptions from "functions/getExcelWriteOptions"
import transpose2DStringArray from "functions/transpose2DStringArray"
import { utils, write, WritingOptions } from "xlsx"

const getSmartSenkyoFormatBlobFromJson = (fileData: JSON, SmartSenkyoColumnNames: string[], sheetName: string, fileExtension: string) => {
  /*
  Arguments:
    fileData: JSON
    SmartSenkyoColumnNames: stirng[]
    sheetName: string
    fileExtension: string
  Returns:
    exportBlob: Blob             整形済みファイル

  Description:
    JSONで与えられたデータをスマセン形式の列名順に整え、EXCELファイルとして生成、生成したファイルを返す
  */

    const fileDataKeys = Object.keys(fileData)
    const columnBasedFileData: string[][] = fileDataKeys.map(columnName => {
      if (SmartSenkyoColumnNames.includes(columnName) 
          || /tag\d/.test(columnName) || /tag\d\d/.test(columnName)) {
        // todo: ここの警告を消したい
        // @ts-ignore
        return Object.values(fileData[columnName]);
      } else {
        return [""];
      }
    })
  
    const worksheetData:string[][] = 
    columnBasedFileData.length != 0 
        ? transpose2DStringArray(columnBasedFileData)
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
