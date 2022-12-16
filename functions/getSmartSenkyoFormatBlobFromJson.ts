import { SmartSenkyoCompanyColumnNames } from "const/SmartSenkyoCompanyColumnNames"
import { SmartSenkyoPersonalColumnNames } from "const/SmartSenkyoPersonalColumnNames"
import getExcelWriteOptions from "functions/getExcelWriteOptions"
import transpose2DStringArray from "functions/transpose2DStringArray"
import { NULL } from "sass"
import { utils, write, WritingOptions } from "xlsx"

const getSmartSenkyoFormatBlobFromJson = (companyFileData: JSON, personalFileData: JSON, fileExtension: string) => {
  /*
  Arguments:
    companyFileData: JSON
    personalFileData: JSON
    fileExtension: string
  Returns:
    exportBlob: Blob             整形済みファイル

  Description:
    JSONで与えられたデータをスマセン形式の列名順に整え、EXCELファイルとして生成、生成したファイルを返す
  */

    const companyFileDataKeys = Object.keys(companyFileData)
    const columnBasedCompanyData: string[][] = companyFileDataKeys.map(columnName => {
      if (SmartSenkyoCompanyColumnNames.includes(columnName) 
          || /tag\d/.test(columnName) || /tag\d\d/.test(columnName)) {
        // todo: ここの警告を消したい
        // @ts-ignore
        return Object.values(companyFileData[columnName]);
      } else {
        return [""];
      }
    })
  
    const companyWorksheetData:string[][] = 
    columnBasedCompanyData.length != 0 
        ? transpose2DStringArray(columnBasedCompanyData)
        : [[""]]
    const exportBook = utils.book_new()
    const newCompanySheet = utils.aoa_to_sheet(companyWorksheetData)
    utils.book_append_sheet(exportBook, newCompanySheet, "組織")

    const personalFileDataKeys = Object.keys(personalFileData)
    const columnBasedPersonalData: string[][] = personalFileDataKeys.map(columnName => {
      if (SmartSenkyoPersonalColumnNames.includes(columnName) 
          || /tag\d/.test(columnName) || /tag\d\d/.test(columnName)) {
        // todo: ここの警告を消したい
        // @ts-ignore
        return Object.values(personalFileData[columnName]);
      } else {
        return [""];
      }
    })
  
    const personalWorksheetData:string[][] = 
    columnBasedPersonalData.length != 0 
        ? transpose2DStringArray(columnBasedPersonalData)
        : [[""]]
    const newPersonalSheet = utils.aoa_to_sheet(personalWorksheetData)
    utils.book_append_sheet(exportBook, newPersonalSheet, "個人")
    const excelOpt: WritingOptions = getExcelWriteOptions(fileExtension);

    const exportFile = write(exportBook, excelOpt)
    const exportBlob = new Blob([exportFile], {
      type: "application/octet-stream",
    })
    return exportBlob
}

export default getSmartSenkyoFormatBlobFromJson
