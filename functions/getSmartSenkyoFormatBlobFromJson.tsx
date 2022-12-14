import { SmartSenkyoCompanyColumnNames } from "const/SmartSenkyoCompanyColumnNames"
import { SmartSenkyoPersonalColumnNames } from "const/SmartSenkyoPersonalColumnNames"
import getExcelWriteOptions from "functions/getExcelWriteOptions"
import transpose2DStringArray from "functions/transpose2DStringArray"
import { utils, write, WritingOptions } from "xlsx"

const getSmartSenkyoFormatBlobFromJson = (companyFileData: JSON, personalFileData: JSON, fileExtension: string) => {
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

    const columnBasedCompanyData: string[][] = new Array<Array<string>>(0)
    const companyFileDataKeys = Object.keys(companyFileData)
  
    SmartSenkyoCompanyColumnNames.forEach(columnName => {
      if (companyFileDataKeys.includes(columnName)) {
        // todo: ここの警告を消したい
        // @ts-ignore
        columnBasedCompanyData.push(Object.values(companyFileData[columnName]))
      }
    })

    Array(51).fill(null).forEach((_, index:number) => {
      if (companyFileDataKeys.includes(`tag${index}`)){
        // todo: ここの警告を消したい
        // @ts-ignore
        columnBasedCompanyData.push(Object.values(companyFileData[`tag${index}`]))
      }
    })
  
    const companyWorksheetData:string[][] = 
    columnBasedCompanyData.length != 0 
        ? transpose2DStringArray(columnBasedCompanyData)
        : [[""]]
    const exportBook = utils.book_new()
    const newCompanySheet = utils.aoa_to_sheet(companyWorksheetData)
    utils.book_append_sheet(exportBook, newCompanySheet, "組織")

    const columnBasedPersonalData: string[][] = new Array<Array<string>>(0)
    const personalFileDataKeys = Object.keys(personalFileData)
  
    SmartSenkyoPersonalColumnNames.forEach(columnName => {
      if (personalFileDataKeys.includes(columnName)) {
        // todo: ここの警告を消したい
        // @ts-ignore
        columnBasedPersonalData.push(Object.values(personalFileData[columnName]))
      }
    })

    Array(51).fill(null).forEach((_, index:number) => {
      if (personalFileDataKeys.includes(`tag${index}`)){
        // todo: ここの警告を消したい
        // @ts-ignore
        columnBasedPersonalData.push(Object.values(personalFileData[`tag${index}`]))
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
