import { Header } from "components/organisms/Header";
import { MainContent } from "components/organisms/MainContent";
import { saveAs } from "file-saver";
import type { NextPage } from "next";
import { useState } from "react";

// 用途：ここがsmart-senkyo-extensions-webで表示される画面
// 役割：ファイル、オプション、ステップ(本プロジェクトでは使用者がどの段階まで作業を進めたかをステップで管理している)
//      excelファイルのjson化及び処理用APIへのリクエスト発行、返答受信、返答のexcel化

const Home: NextPage = () => {
	const [addressSeparatorOptionState, setAddressSeparatorOptionState] = useState<boolean>(true) // option管理
	const [stepState, setStepState] = useState<number>(1) // ステップ管理
	const [fileState, setFileState] = useState<File[]>([]) // アップロードされたファイル管理
	const [exportBlobState, setExportBlobState] = useState<Blob[]>([]) // ダウンロードしたjsonをファイル化したファイルの管理
	const [exportBlobNameState, setExportBlobNameState] = useState<string[]>([]) // ダウンロードしたjsonをファイル化したファイルのファイル名管理

	const switchAddressSeparatorOption: React.MouseEventHandler<HTMLButtonElement> = () => { // 住所分割チェックボックス用オプションスイッチ関数
		setAddressSeparatorOptionState(!addressSeparatorOptionState);
	}

	const proceedStep: React.MouseEventHandler<HTMLButtonElement> = () => { // 次へのボタン用ステップ遷移関数
		if (stepState < 7) {
			setStepState(stepState + 1);
		} else {
			setStepState(1);
		}
	};

	const backStep: React.MouseEventHandler<HTMLButtonElement> = () => { // 戻るボタン用ステップ遷移関数
		if (1 < stepState) {
			setStepState(stepState - 1);
		}
	};

	const downloadConvertedFile = () => { // ダウンロードのステップでメインのボタンに割り当てる関数
		console.log("download 押された");
		exportBlobState.forEach((exportBlob, index) => {
			// todo: exportBlob使わないのならexportBlobState.forEach()でなく[0,1,2,...]的なリストを使えばいい
			if (exportBlobState[index] != null && exportBlobNameState[index] != null)
				saveAs(exportBlobState[index], exportBlobNameState[index]);
		});
		setStepState(7);
	};
	// convert時に呼ばれる関数
	const convertFile: React.MouseEventHandler<HTMLButtonElement> = async () => {
		// todo: proceedStep()を使いたい
		setStepState(stepState + 1);
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
		const files_list: File[] = Object.values(fileState);
		const fileState_length: number = files_list.length;
		// excelをjson化するセカンドプラン
		// todo: for文よりmapとかを使いたい
		for (let index = 0; index < fileState_length; index++) {
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
				if (finishedNumber == fileState_length) {
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
							"Content-Type": "application/json",
						},
						body: JSON.stringify(request_json),
					});
					console.log("処理終了");
					// todo: proceedStep()を使いたい
					// todo: setStepState(stepState+1)ではダメだった
					setStepState(6);
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
					setExportBlobState([export_blob]);
					setExportBlobNameState(["tmpTestDownload.xlsx"]);
				}
			};
			file_reader.readAsArrayBuffer(file); // file_reader.readAsArrayBuffer()は非同期なので注意
		}
	};

	return (
		<div>
			<Header page_title="自動名簿整形ツール" />
			<MainContent
				stepState={stepState}
				onAddressSeparatorActed={switchAddressSeparatorOption}
				address_separator_selected_flag={addressSeparatorOptionState}
				proceedStep={proceedStep}
				backStep={backStep}
				setFileState={setFileState}
				convertFile={convertFile}
				downloadConvertedFile={downloadConvertedFile}
			/>
		</div>
	);
};

export default Home;
