import { read, utils } from "xlsx"

const readFileList = async (
  index: number,
  filesList: File[], fileReader: FileReader, fileNames: string[],
  sheetNames: string[], jsonFormedSheets: Array<JSON>,
  fileStateLength: number, afterLoopFunction: Function, errorHandleFunction: Function) => {
  /*
  Arguments:
    index: number                     読み込みたいファイルのfile_listでのインデックス
    filesList: File[]
    fileReader: FileReader           FileReaderを使い回すために引数として与えている
    fileNames: string[]
    sheetNames: string[]
    jsonFormedSheets: Array<JSON>   ファイルをJSON化した後に格納する配列
    fileStateLength: number         filesListの長さ
    afterLoopFunction: Function     全ファイルを読み取った後に実行される関数
    errorHandleFunction: Function   indexがfilesList外を示す時に実行される関数

  Returns:
    void

  Description:
    自身を再起的に呼び出し非同期であるFileReader.readAsArrayBuffer()でファイルを順に読み込むための関数
  */
  const file = filesList[index]
  fileReader.onload = (event) => {
    // まだ読み取るファイルがあるなら再帰的に呼び出す
    if (index < fileStateLength) {
      // fileReaderの読み込み結果
      const result = event.target?.result
      const workbook = read(result, { type: "array" })
      fileNames[index] = file.name
      // todo:ここを各シートごとにすることで複数シートに対応可能
      sheetNames[index] = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      // @ts-ignore
      jsonFormedSheets[index] = utils.sheet_to_json(worksheet)
      if (index == fileStateLength - 1) {
        afterLoopFunction()
      } else {
        readFileList(index + 1, filesList, fileReader, fileNames, sheetNames, jsonFormedSheets, fileStateLength, afterLoopFunction, errorHandleFunction)
      }
    } else {
      errorHandleFunction()
    }
  }
  fileReader.readAsArrayBuffer(file)// fileReader.readAsArrayBuffer()は非同期なので注意
}

export default readFileList
