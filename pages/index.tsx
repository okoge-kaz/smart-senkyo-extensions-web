import { Header } from "components/organisms/Header";
import { MainContent } from "components/organisms/MainContent";
import { saveAs } from "file-saver";
import column_based_format from "functions/column_based_format";
import get_formatted_date from "functions/get_formatted_date";
import read_file_list from "functions/read_file_list";
import simple_format from "functions/simple_format";
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
	response_data: APIResponseFileData[];
	not_converted_data: APIResponseFileData[];
}

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

	async function post_to_convert(json_formed_sheets: Array<JSON>, file_names: string[], sheet_names: string[]) {

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
		console.log(convertAPI_response_json)
		const file_number: number = convertAPI_response_json.file_number;
		const response_data: APIResponseFileData[] = convertAPI_response_json.response_data;
		const not_converted_data: APIResponseFileData[] = convertAPI_response_json.not_converted_data;

		const export_blobs = new Array<Blob>(file_number*2);
		const export_blob_names = new Array<string>(file_number*2);

		for (let focused_file_number = 0; focused_file_number < file_number; focused_file_number++) {
			const sheet_name: string = sheet_names[focused_file_number];

			const converted_file_name: string = response_data[focused_file_number].file_name;
			const converted_file_extenstion: string = converted_file_name.split('.').pop() ?? "";
			export_blob_names[focused_file_number*2] = `formatted_${converted_file_name}`;
			const converted_file_data: JSON = response_data[focused_file_number].file_data;
			column_based_format(focused_file_number*2, sheet_name, converted_file_data, export_blobs, converted_file_extenstion);

			const not_converted_file_name: string = not_converted_data[focused_file_number].file_name;
			const not_converted_file_extensions: string = not_converted_file_name.split('.').pop() ?? "";
			export_blob_names[focused_file_number*2+1] = `not_formatted_${not_converted_file_name}`;
			const not_converted_file_data: JSON = not_converted_data[focused_file_number].file_data;
			simple_format(focused_file_number*2+1, sheet_name, not_converted_file_data, export_blobs, not_converted_file_extensions);
		}
		set_export_blob_state(export_blobs);
		set_export_blob_name_state(export_blob_names);
		set_step_state(6);
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
		const after_loop_function = () => post_to_convert(json_formed_sheets, file_names, sheet_names);
		const error_handle_function = () => {
			console.log("ファイルの読み込み時に異常が発生しました。");
			set_step_state(-1);
		};
		await read_file_list(0, files_list, file_reader, file_names, sheet_names, json_formed_sheets, file_state_length, after_loop_function, error_handle_function);
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
