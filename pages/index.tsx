import { Header } from "components/organisms/Header";
import { MainContent } from "components/organisms/MainContent";
import { saveAs } from "file-saver";
import type { NextPage } from "next";
import { useState } from "react";

// 用途：ここがsmart-senkyo-extensions-webで表示される画面
// 役割：ファイル、オプション、ステップ(本プロジェクトでは使用者がどの段階まで作業を進めたかをステップで管理している)
//      excelファイルのjson化及び処理用APIへのリクエスト発行、返答受信、返答のexcel化

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
		console.log("download 押された");
		export_blob_state.forEach((exportBlob, index) => {
			// todo: exportBlob使わないのならexport_blob_state.forEach()でなく[0,1,2,...]的なリストを使えばいい
			if (export_blob_state[index] != null && export_blob_name_state[index] != null)
				saveAs(export_blob_state[index], export_blob_name_state[index]);
		});
		set_step_state(7);
	};
	// convert時に呼ばれる関数
	const convert_file: React.MouseEventHandler<HTMLButtonElement> = async () => {
		// todo: proceed_step()を使いたい
		set_step_state(step_state + 1);
		// todo: 一時的なもの　要修正
		const convert_url = "http://localhost:3000/api/excel_json";

		// 時刻
		const date = new Date();
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString(); //getMonthでは1月が0になる
		const day = date.getDay().toString();
		const hour = date.getHours().toString();
		const minute = date.getMinutes().toString();
		const second = date.getSeconds().toString();
		const request_time = `${year}-${month}-${day} ${hour}:${minute}.${second}Z`

		// ファイルをjsonにしてAPIへ
		const XLSX = require("xlsx");
		// todo: ここのvarを避けたい
		let sheets_names: string[] = ["", "", "", "", "", "", "", "", "", ""]; // todo: ここのせいで10ファイルまでなので可変長に
		const json_formed_sheets = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]; // todo: ここのせいで10ファイルまでなので可変長に

		// excelファイルの読み込みが非同期のため、ファイル読み込みが終了したファイル数を保管する変数
		let finishedNumber: number = 0;
		const files_list: File[] = Object.values(file_state);
		const file_state_length: number = files_list.length;
		// excelをjson化するセカンドプラン
		// todo: for文よりmapとかを使いたい
		for (let index = 0; index < file_state_length; index++) {
			const file_reader = new FileReader();
			const file = files_list[index];
			file_reader.onload = async (event) => {
				// file_readerの読み込み結果
				const result = event.target?.result;
				const workbook = XLSX.read(result, { type: "array" });
				// todo:ここを各シートごとにすることで複数シートに対応可能
				const sheets_name: string = workbook.SheetNames[0];
				sheets_names[index] = sheets_name;
				const worksheet = workbook.Sheets[sheets_names[index]];
				json_formed_sheets[index] = XLSX.utils.sheet_to_json(worksheet);
				console.log(json_formed_sheets[index]);
				finishedNumber = finishedNumber + 1;
				// file_reader.readAsArrayBuffer()は非同期なので最後に終了したfile_readerにAPI送信処理を任せる
				if (finishedNumber == file_state_length) {
					// APIへの送信
					// todo: 選択したオプション、エラーメッセージ等がjsonに含まれていないので含める
					const json_formed_data = json_formed_sheets.map(
						(json_formed_sheet, index) => ({
							file_name: sheets_names[index],
							input_data: json_formed_sheet,
						})
					);
					// input_dataの整形
					const request_json = {
						request_time: request_time,
						input_data_type: "json",
						input_data: json_formed_data,
					};
					console.log("request_json");
					console.log(request_json);
					const res = await fetch(convert_url, {
						method: "POST",
						headers: {
							"Content-Type": "application/json; charset=utf-8",
						},
						body: JSON.stringify(request_json),
					});
					console.log("処理終了");
					// todo: proceed_step()を使いたい
					// todo: set_step_state(step_state+1)ではダメだった
					set_step_state(6);
					// todo: 本来はここで帰ってきたjsonをexcelに直す
					const exportBook = XLSX.utils.book_new();
					const worksheet_data = [
						["ヘッダ１", "ヘッダ２"],
						["値１", "値２"],
					];
					const newSheet = XLSX.utils.aoa_to_sheet(worksheet_data);
					XLSX.utils.book_append_sheet(exportBook, newSheet, "testSheet");
					const excel_opt = {
						bookType: "xlsx",
						bookSST: true,
						type: "array",
					};
					const export_file = XLSX.write(exportBook, excel_opt);
					const export_blob = new Blob([export_file], {
						type: "application/octet-stream",
					});
					set_export_blob_state([export_blob]);
					set_export_blob_name_state(["tmpTestDownload.xlsx"]);
				}
			};
			file_reader.readAsArrayBuffer(file); // file_reader.readAsArrayBuffer()は非同期なので注意
		}
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
