import { SmartSenkyoPartyColumnNames } from "const/SmartSenkyoPartyColumnNames"
import { SmartSenkyoPoliticianColumnNames } from "const/SmartSenkyoPoliticianColumnNames"
import getExcelWriteOptions from "functions/getExcelWriteOptions"
import transpose2DStringArray from "functions/transpose2DStringArray"
import { utils, write, WritingOptions } from "xlsx"

const getSmartSenkyoFormatBlobFromJson = (sheetName: string, partyFileData: JSON, politicianFileData: JSON, fileExtension: string) => {
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

    const columnBasedPartyData: string[][] = new Array<Array<string>>(0)
    const partyFileDataKeys = Object.keys(partyFileData)
  
    SmartSenkyoPartyColumnNames.forEach(columnName => {
      if (partyFileDataKeys.includes(columnName)) {
        // todo: ここの警告を消したい
        // @ts-ignore
        columnBasedPartyData.push(Object.values(partyFileData[columnName]))
      }
    })

    Array(50).forEach((_, index:number) => {
      if (partyFileDataKeys.includes("tag" + index)){
        // todo: ここの警告を消したい
        // @ts-ignore
        columnBasedPartyData.push(Object.values(partyFileData["tag" + index]))
      }
    })
  
    const partyWorksheetData:string[][] = 
    columnBasedPartyData.length != 0 
        ? transpose2DStringArray(columnBasedPartyData)
        : [[""]]
    const exportBook = utils.book_new()
    const newPartySheet = utils.aoa_to_sheet(partyWorksheetData)
    utils.book_append_sheet(exportBook, newPartySheet, "組織")

    const columnBasedPoliticianData: string[][] = new Array<Array<string>>(0)
    const politicianFileDataKeys = Object.keys(politicianFileData)
  
    SmartSenkyoPoliticianColumnNames.forEach(columnName => {
      if (politicianFileDataKeys.includes(columnName)) {
        // todo: ここの警告を消したい
        // @ts-ignore
        columnBasedPoliticianData.push(Object.values(politicianFileData[columnName]))
      }
    })

    Array(50).forEach((_, index:number) => {
      if (politicianFileDataKeys.includes("tag" + index)){
        // todo: ここの警告を消したい
        // @ts-ignore
        columnBasedPoliticianData.push(Object.values(politicianFileData["tag" + index]))
      }
    })
  
    const politicianWorksheetData:string[][] = 
    columnBasedPoliticianData.length != 0 
        ? transpose2DStringArray(columnBasedPoliticianData)
        : [[""]]
    const newPoliticianSheet = utils.aoa_to_sheet(politicianWorksheetData)
    utils.book_append_sheet(exportBook, newPoliticianSheet, "個人")
    const excelOpt: WritingOptions = getExcelWriteOptions(fileExtension);

    const exportFile = write(exportBook, excelOpt)
    const exportBlob = new Blob([exportFile], {
      type: "application/octet-stream",
    })
    return exportBlob
}

export default getSmartSenkyoFormatBlobFromJson
