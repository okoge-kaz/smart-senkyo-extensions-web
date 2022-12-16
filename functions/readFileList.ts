import { read, utils } from "xlsx"

type ExcelFileData = {
  fileName: string
  sheetName: string
  JSONFormedSheet: JSON[]
}

const readExcelFile = (file: File) => {
  const excelReader = new FileReader()
  excelReader.readAsArrayBuffer(file) // CAUTION: fileReader.readAsArrayBuffer() is async(非同期)

  return new Promise((resolve, reject) => {
    excelReader.onload = (event) => { // readAsArrayBuffer() is finished
      const data = event.target?.result
      const workbook = read(data, { type: "array" })
      const fileName = file.name
      const sheetNames = workbook.SheetNames

      // TODO: sheetNames 全体を読み込むようにする
      const sheetName = sheetNames[0]
      const workSheet = workbook.Sheets[sheetName]
      const JSONFormedSheet = utils.sheet_to_json<JSON>(workSheet)

      resolve({ fileName, sheetName, JSONFormedSheet } as ExcelFileData)
    }
  }) as Promise<ExcelFileData>
}

const readFileList = async (filesList: File[]) => {
  const excelFileDataList = await Promise.all(
    filesList.map(async (file) => {
      return await readExcelFile(file)
    }))

  const JSONFormedSheets: JSON[][] = excelFileDataList.map((excelFileData) => {
    return excelFileData.JSONFormedSheet
  })
  const fileNames: string[] = excelFileDataList.map((excelFileData) => {
    return excelFileData.fileName
  })
  const sheetNames: string[] = excelFileDataList.map((excelFileData) => {
    return excelFileData.sheetName
  })

  return { JSONFormedSheets, fileNames, sheetNames }
}

export default readFileList
