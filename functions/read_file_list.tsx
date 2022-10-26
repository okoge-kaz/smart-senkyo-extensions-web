import { read, utils } from "xlsx";

const read_file_list = async (
  index: number,
  files_list: File[], file_reader: FileReader, file_names: string[],
  sheet_names: string[], json_formed_sheets: Array<JSON>,
  file_state_length: number, after_loop_function: Function, error_handle_function: Function) => {
  /*
  Arguments:
    index: number                     読み込みたいファイルのfile_listでのインデックス
    files_list: File[]
    file_reader: FileReader           FileReaderを使い回すために引数として与えている
    file_names: string[]
    sheet_names: string[]
    json_formed_sheets: Array<JSON>   ファイルをJSON化した後に格納する配列
    file_state_length: number         files_listの長さ
    after_loop_function: Function     全ファイルを読み取った後に実行される関数
    error_handle_function: Function   indexがfiles_list外を示す時に実行される関数

  Returns:
    void

  Description:
    自身を再起的に呼び出し非同期であるFileReader.readAsArrayBuffer()でファイルを順に読み込むための関数
  */
  const file = files_list[index];
  file_reader.onload = (event) => {
    // まだ読み取るファイルがあるなら再帰的に呼び出す
    if (index < file_state_length) {
      // file_readerの読み込み結果
      const result = event.target?.result;
      const workbook = read(result, { type: "array" });
      file_names[index] = file.name;
      // todo:ここを各シートごとにすることで複数シートに対応可能
      sheet_names[index] = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      json_formed_sheets[index] = utils.sheet_to_json(worksheet);
      if (index == file_state_length - 1) {
        after_loop_function();
      } else {
        read_file_list(index + 1, files_list, file_reader, file_names, sheet_names, json_formed_sheets, file_state_length, after_loop_function, error_handle_function);
      }
    } else {
      error_handle_function();
    }
  }
  file_reader.readAsArrayBuffer(file);// file_reader.readAsArrayBuffer()は非同期なので注意
}

export default read_file_list
