import { Header } from "components/organisms/Header"
import { MainContent } from "components/organisms/MainContent"
import { saveAs } from "file-saver"
import formatByColumnName from "functions/formatByColumnName"
import getFormattedDate from "functions/getFormattedDate"
import readFileList from "functions/readFileList"
import simpleFormat from "functions/simpleFormat"
import type { NextPage } from "next"
import React, { useState } from "react"

// 用途：ここがsmart-senkyo-extensions-webで表示される画面
// 役割：ファイル、オプション、ステップ(本プロジェクトでは使用者がどの段階まで作業を進めたかをステップで管理している)
//      excelファイルのjson化及び処理用APIへのリクエスト発行、返答受信、返答のexcel化

type APIResponseFileData = {
	file_name: string
	file_data: JSON
}

type APIResponse = {
	file_number: number
	response_data: APIResponseFileData[]
	not_converted_data: APIResponseFileData[]
}

const Home: NextPage = () => {
	const [address_separator_option_state, set_address_separator_option_state] = useState<boolean>(true) // option管理
	const [stepState, setStepState] = useState<number>(1) // ステップ管理
	const [fileState, setFileState] = useState<File[]>([]) // アップロードされたファイル管理
	const [exportBlobState, setExportBlobState] = useState<Blob[]>([]) // ダウンロードしたjsonをファイル化したファイルの管理
	const [exportBlobNameState, setExportBlobNameState] = useState<string[]>([]) // ダウンロードしたjsonをファイル化したファイルのファイル名管理

	const switch_address_separator_option: React.MouseEventHandler<HTMLButtonElement> = () => { // 住所分割チェックボックス用オプションスイッチ関数
		set_address_separator_option_state(!address_separator_option_state)
	}

	const proceedStep = () => { // 次へのボタン用ステップ遷移関数
		if (stepState < 7) {
			setStepState(stepState + 1)
		} else {
			setStepState(1)
		}
	}

	const backStep = () => { // 戻るボタン用ステップ遷移関数
		if (1 < stepState) {
			setStepState(stepState - 1)
		}
	}

	const downloadConvertedFile = () => { // ダウンロードのステップでメインのボタンに割り当てる関数
		exportBlobState.forEach((exportBlob, index) => {
			// todo: exportBlob使わないのならexport_blob_state.forEach()でなく[0,1,2,...]的なリストを使えばいい
			if (exportBlobState[index] != null && exportBlobNameState[index] != null)
				saveAs(exportBlobState[index], exportBlobNameState[index])
		})
		setStepState(7)
	}

	async function post_to_convert(JSONFormedSheets: Array<JSON>, fileNames: string[], sheetNames: string[]) {

		const RequestTime = getFormattedDate(new Date)
		// todo: 選択したオプション、エラーメッセージ等がjsonに含まれていないので含める
		const JSONFormedData = JSONFormedSheets.map(
			(json_formed_sheet, index) => ({
				file_name: fileNames[index],
				file_data: json_formed_sheet,
			})
		)
		// input_dataの整形
		const RequestJSON = {
			request_time: RequestTime,
			input_data_type: "json",
			input_data: JSONFormedData,
		}
		const convertAPI_response = await fetch("https://bczm5aw2fkuevavyh7ievzdqje0sxhlg.lambda-url.ap-northeast-1.on.aws/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify(RequestJSON),
		})

		const convertAPI_ResponseJSON = await convertAPI_response.json() as APIResponse// ここで帰ってきたjsonをexcelに直す
		const file_number: number = convertAPI_ResponseJSON.file_number
		const response_data: APIResponseFileData[] = convertAPI_ResponseJSON.response_data
		const not_converted_data: APIResponseFileData[] = convertAPI_ResponseJSON.not_converted_data

		const ExportBlobs = new Array<Blob>(file_number * 2)
		const ExportBlobNames = new Array<string>(file_number * 2)

		sheetNames.forEach((sheetName, index) => {
			const convertedFileName: string = response_data[index].file_name
			const convertedFileExtension: string = convertedFileName.split('.').pop() ?? ""
			const notConvertedFileName: string = not_converted_data[index].file_name
			const notConvertedFileExtension: string = notConvertedFileName.split('.').pop() ?? ""

			ExportBlobNames[index * 2] = `formatted_${convertedFileName}`
			const convertedFileData: JSON = response_data[index].file_data
			formatByColumnName(index * 2, sheetName, convertedFileData, ExportBlobs, convertedFileExtension)

			ExportBlobNames[index * 2 + 1] = `not_formatted_${notConvertedFileName}`
			const notConvertedFileData: JSON = not_converted_data[index].file_data
			simpleFormat(index * 2 + 1, sheetName, notConvertedFileData, ExportBlobs, notConvertedFileExtension)
		})

		setExportBlobState(ExportBlobs)
		setExportBlobNameState(ExportBlobNames)
		setStepState(6)
	}


	// convert時に呼ばれる関数
	const convertFile: React.MouseEventHandler<HTMLButtonElement> = async () => {
		// todo: proceedStep()を使いたい
		setStepState(stepState + 1)

		// ファイルをjsonにしてAPIへ
		const inputExcelFiles: File[] = Object.values(fileState)

		const InputExcelFileLength: number = inputExcelFiles.length
		const fileReader = new FileReader()

		const fileNames: string[] = new Array(InputExcelFileLength)
		const sheetNames: string[] = new Array(InputExcelFileLength)
		const JSONFormedSheets = new Array(InputExcelFileLength)


		const after_loop_function = () => {
			post_to_convert(JSONFormedSheets, fileNames, sheetNames)
		}
		const errorHandle = () => {
			console.log("ファイルの読み込み時に異常が発生しました。")
			setStepState(-1)
		}

		await readFileList(0, inputExcelFiles, fileReader, fileNames, sheetNames, JSONFormedSheets, InputExcelFileLength, after_loop_function, errorHandle)
	}

	return (
		<div>
			<Header page_title="自動名簿整形ツール" />
			<MainContent
				step_state={stepState}
				on_address_separator_acted={switch_address_separator_option}
				address_separator_selected_flag={address_separator_option_state}
				proceed_step={proceedStep}
				back_step={backStep}
				set_file_state={setFileState}
				convert_file={convertFile}
				download_converted_file={downloadConvertedFile}
			/>
		</div>
	)
}

export default Home
