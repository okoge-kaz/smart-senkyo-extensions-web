import { Header } from "components/organisms/Header";
import { MainContent } from "components/organisms/MainContent";
import { saveAs } from "file-saver";
import type { NextPage } from "next";
import React, { useState } from "react";

// 用途：ここがsmart-senkyo-extensions-webで表示される画面
// 役割：ファイル、オプション、ステップ(本プロジェクトでは使用者がどの段階まで作業を進めたかをステップで管理している)
//      excelファイルのjson化及び処理用APIへのリクエスト発行、返答受信、返答のexcel化

type APIResponseFileData = {
	file_name: string;
	file_data: JSON;
}

type APIResponse = {
	file_number: number;
	response_data: APIResponseFileData[]
}

const column_names: Array<string> = [
	"delete",
	"update",
	"duplicated",
	"import_number",
	"last_name",
	"first_name",
	"shop_name",
	"last_kana",
	"first_kana",
	"title",
	"family_id",
	"relation_name",
	"birthday",
	"age",
	"gender",
	"zipcode",
	"prefecture",
	"address1",
	"address2",
	"address3",
	"address4",
	"address5",
	"tel1",
	"tel2",
	"fax",
	"email",
	"company_name",
	"company_kana",
	"post",
	"company_zipcode",
	"company_prefecture",
	"company_address1",
	"company_address2",
	"company_address3",
	"company_address4",
	"company_tel",
	"company_fax",
	"company_url",
	"send_type",
	"place",
	"began_at",
	"rank",
	"died_at",
	"memo",
	// TODO:現状、tag1~10を列名として以下に定義し、受け取ったレスポンスデータからcolmun_namesに含まれる列名があった時に読み取っているために、tag1~10までしか受け取れないのでここをtag*で判定できるようにしたい。詳細はissue#2を参照。
	"tag1",
	"tag2",
	"tag3",
	"tag4",
	"tag5",
	"tag6",
	"tag7",
	"tag8",
	"tag9",
	"tag10",
]

const Home: NextPage = () => {
	const [address_separator_option_state, set_address_separator_option_state] = useState<boolean>(true) // option管理
	const [step_state, set_step_state] = useState<number>(1) // ステップ管理
	const [file_state, set_file_state] = useState<File[]>([]) // アップロードされたファイル管理
	const [export_blob_state, set_export_blob_state] = useState<Blob[]>([]) // ダウンロードしたjsonをファイル化したファイルの管理
	const [export_blob_name_state, set_export_blob_name_state] = useState<string[]>([]) // ダウンロードしたjsonをファイル化したファイルのファイル名管理

	const switch_address_separator_option: React.MouseEventHandler<HTMLButtonElement> = () => { // 住所分割チェックボックス用オプションスイッチ関数
		set_address_separator_option_state(!address_separator_option_state);
	}

	const proceed_step: React.MouseEventHandler<HTMLButtonElement> = () => { // 次へのボタン用ステップ遷移関数
		if (step_state < 7) {
			set_step_state(step_state + 1);
		} else {
			set_step_state(1);
		}
	};

	const back_step: React.MouseEventHandler<HTMLButtonElement> = () => { // 戻るボタン用ステップ遷移関数
		if (1 < step_state) {
			set_step_state(step_state - 1);
		}
	};

	const download_converted_file = () => { // ダウンロードのステップでメインのボタンに割り当てる関数
		export_blob_state.forEach((exportBlob, index) => {
			// todo: exportBlob使わないのならexport_blob_state.forEach()でなく[0,1,2,...]的なリストを使えばいい
			if (export_blob_state[index] != null && export_blob_name_state[index] != null)
				saveAs(export_blob_state[index], export_blob_name_state[index]);
		});
		set_step_state(7);
	};

	const XLSX = require("xlsx");

	const get_formatted_date = (date: Date) => {
		console.log("Memo update")
		const year: string = date.getFullYear().toString();
		const month: string = (date.getMonth() + 1).toString(); //getMonthでは1月が0になる
		const day: string = date.getDay().toString();
		const hour: string = date.getHours().toString();
		const minute: string = date.getMinutes().toString();
		const second: string = date.getSeconds().toString();
		const request_time: string = `${year}-${month}-${day} ${hour}:${minute}.${second}Z`
		return request_time;
	}

	let export_blobs: Blob[] = new Array<Blob>(0);
	let export_blob_names: string[] = new Array<string>(0);

	function column_based_format(file_number: number, sheet_name: string, file_name: string, file_data: JSON, export_blobs: Blob[], export_blob_names: string[]){
		const col_based_data: string[][]  = new Array<Array<string>>(0);
		const file_data_keys = Object.keys(file_data);
		for(let column_name of column_names){
			if(file_data_keys.includes(column_name)){
				// todo: ここの警告を消したい
				col_based_data.push(Object.values(file_data[column_name]))
			}
		}
		// 転置を取る
		const transpose_func = (a: string[][]) => a[0].map((_, c) => a.map(r => r[c]));
		const worksheet_data = transpose_func(col_based_data)
		const exportBook = XLSX.utils.book_new();
		const newSheet = XLSX.utils.aoa_to_sheet(worksheet_data);
		XLSX.utils.book_append_sheet(exportBook, newSheet, sheet_name);
		const excel_opt = {
			bookType: "xlsx",
			bookSST: true,
			type: "array",
		};
		const export_file = XLSX.write(exportBook, excel_opt);
		const export_blob = new Blob([export_file], {
			type: "application/octet-stream",
		});
		export_blobs[file_number] = export_blob;
		export_blob_names[file_number] = `${file_name}.xlsx`;
	}

	async function post_to_convert(json_formed_sheets: Array<JSON>, file_names: string[], sheet_names: string[]){

		const request_time = get_formatted_date(new Date);
		// todo: 選択したオプション、エラーメッセージ等がjsonに含まれていないので含める
		const json_formed_data = json_formed_sheets.map(
			(json_formed_sheet, index) => ({
				file_name: file_names[index],
				file_data: json_formed_sheet,
			})
		);
		// input_dataの整形
		const request_json = {
			request_time: request_time,
			input_data_type: "json",
			input_data: json_formed_data,
		};
		const convertAPI_response = await fetch("https://601cdzfw2l.execute-api.ap-northeast-1.amazonaws.com/default/smart-senkyo-extensions-lambda", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(request_json),
		});
		
		const convertAPI_response_json = await convertAPI_response.json() as APIResponse;// ここで帰ってきたjsonをexcelに直す
		const file_number: number = convertAPI_response_json.file_number;
		const response_data: APIResponseFileData[] = convertAPI_response_json.response_data;
		export_blobs = new Array<Blob>(file_number);
		export_blob_names = new Array<string>(file_number);

		for(let focused_file_number = 0; focused_file_number < file_number; focused_file_number++){
			const file_name: string = response_data[focused_file_number].file_name;
			const file_data: JSON = response_data[focused_file_number].file_data;
			const sheet_name: string = sheet_names[focused_file_number];
			column_based_format(focused_file_number, sheet_name, file_name, file_data, export_blobs, export_blob_names)
		}
		set_export_blob_state(export_blobs);
		set_export_blob_name_state(export_blob_names);
		set_step_state(6);
	}
	
	// 自身を再起的に呼び出し非同期であるFileReader.readAsArrayBuffer()でファイルを順に読み込むための関数
	async function read_file_list(index: number, files_list: File[], file_reader: FileReader, file_names: string[], sheet_names: string[], json_formed_sheets: Array<JSON>, file_state_length: number){
		const file = files_list[index];
		file_reader.onload = (event) =>{
			// file_readerの読み込み結果
			const result = event.target?.result;
			const workbook = XLSX.read(result, { type: "array" });
			file_names[index] = file.name;
			// todo:ここを各シートごとにすることで複数シートに対応可能
			sheet_names[index] = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			json_formed_sheets[index] = XLSX.utils.sheet_to_json(worksheet);
			// まだ読み取るファイルがあるなら再帰的に呼び出す
			if(index < file_state_length - 1){
				read_file_list(index+1, files_list, file_reader, file_names, sheet_names, json_formed_sheets, file_state_length);
			}else if(index == file_state_length - 1){
				post_to_convert(json_formed_sheets, file_names, sheet_names);
			}else{
				console.log("ファイルの読み込み時に異常が発生しました。");
				set_step_state(-1);
			}
		}
		file_reader.readAsArrayBuffer(file);// file_reader.readAsArrayBuffer()は非同期なので注意
	}

	// convert時に呼ばれる関数
	const convert_file: React.MouseEventHandler<HTMLButtonElement> = async () => {
		// todo: proceed_step()を使いたい
		set_step_state(step_state + 1);

		// ファイルをjsonにしてAPIへ
		const files_list: File[] = Object.values(file_state);
		const file_state_length: number = files_list.length;
		let file_names: string[] = new Array(file_state_length);
		let sheet_names: string[] = new Array(file_state_length);
		const json_formed_sheets = new Array(file_state_length);
		const file_reader = new FileReader();
		await read_file_list(0, files_list, file_reader, file_names, sheet_names, json_formed_sheets, file_state_length);
	};

	return (
		<div>
			<Header page_title="自動名簿整形ツール" />
			<MainContent
				step_state={step_state}
				on_address_separator_acted={switch_address_separator_option}
				address_separator_selected_flag={address_separator_option_state}
				proceed_step={proceed_step}
				back_step={back_step}
				set_file_state={set_file_state}
				convert_file={convert_file}
				download_converted_file={download_converted_file}
			/>
		</div>
	);
};

export default Home;
