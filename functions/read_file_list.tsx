import { read, utils } from "xlsx";

export default async function read_file_list(index: number, files_list: File[], file_reader: FileReader, file_names: string[], sheet_names: string[], json_formed_sheets: Array<JSON>, file_state_length: number, after_roop_function: Function, error_handle_function: Function){
  // args: index: 読み込みたいファイルのfile_listでのインデックス
  //       files_list:
  //       file_reader: FileReaderを使い回すために引数として与えている
  //       file_names: 
  //       sheet_names:
  //       json_formed_sheets: ファイルをJSON化した後に格納する配列
  //       file_state_length: files_listの長さ
  //       after_roop_function: 全ファイルを読み取った後に実行される関数
  //       error_handle_function: indexがfiles_list外を示す時に実行される関数
  // return: void
  // 
  // 自身を再起的に呼び出し非同期であるFileReader.readAsArrayBuffer()でファイルを順に読み込むための関数
  const file = files_list[index];
  file_reader.onload = (event) =>{
    // まだ読み取るファイルがあるなら再帰的に呼び出す
    if(index < file_state_length){
      // file_readerの読み込み結果
      const result = event.target?.result;
      const workbook = read(result, { type: "array" });
      file_names[index] = file.name;
      // todo:ここを各シートごとにすることで複数シートに対応可能
      sheet_names[index] = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      json_formed_sheets[index] = utils.sheet_to_json(worksheet);
      if(index == file_state_length - 1){
        after_roop_function();
      }else{
        read_file_list(index+1, files_list, file_reader, file_names, sheet_names, json_formed_sheets, file_state_length, after_roop_function, error_handle_function);
      }
    }else{
      error_handle_function();
    }
  }
  file_reader.readAsArrayBuffer(file);// file_reader.readAsArrayBuffer()は非同期なので注意
}
