import apiRequest from "api/smart-senkyo-extensions/request"
import { Header } from "components/organisms/Header"
import { MainContent } from "components/organisms/MainContent"
import { saveAs } from "file-saver"
import getBlobFromJson from "functions/getBlobFromJson"
import getFormattedDate from "functions/getFormattedDate"
import getSmartSenkyoFormatBlobFromJson from "functions/getSmartSenkyoFormatBlobFromJson"
import readFileList from "functions/readFileList"
import type { NextPage } from "next"
import { useState } from "react"
import { SmartSenkyoCompanyColumnNames } from "const/SmartSenkyoCompanyColumnNames"
import { SmartSenkyoPersonalColumnNames } from "const/SmartSenkyoPersonalColumnNames"

// 用途：ここがsmart-senkyo-extensions-webで表示される画面
// 役割：ファイル、オプション、ステップ(本プロジェクトでは使用者がどの段階まで作業を進めたかをステップで管理している)
//      excelファイルのjson化及び処理用APIへのリクエスト発行、返答受信、返答のexcel化

const Home: NextPage = () => {
	const [addressSeparatorOptionState, setAddressSeparatorOptionState] = useState<boolean>(true) // option管理
	const [stepState, setStepState] = useState<number>(1) // ステップ管理
	const [fileState, setFileState] = useState<File[]>([]) // アップロードされたファイル管理
	const [exportBlobState, setExportBlobState] = useState<Blob[]>([]) // ダウンロードしたjsonをファイル化したファイルの管理
	const [exportBlobNameState, setExportBlobNameState] = useState<string[]>([]) // ダウンロードしたjsonをファイル化したファイルのファイル名管理

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

	const switchAddressSeparatorOption = () => { // 住所分割チェックボックス用オプションスイッチ関数
		setAddressSeparatorOptionState(!addressSeparatorOptionState)
	}
	const downloadConvertedFile = () => { // ダウンロードのステップでメインのボタンに割り当てる関数
		exportBlobState.forEach((exportBlob, index) => {
			// todo: exportBlob使わないのならexport_blob_state.forEach()でなく[0,1,2,...]的なリストを使えばいい
			if (exportBlobState[index] != null && exportBlobNameState[index] != null)
				saveAs(exportBlobState[index], exportBlobNameState[index])
		})
		setStepState(7)
	}
	const postToConvert = async (JSONFormedSheets: JSON[][], fileNames: string[], sheetNames: string[]) => {

		const RequestTime = getFormattedDate()

		// TODO: 選択したオプション、エラーメッセージ等がjsonに含まれていないので含める
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

		const convertAPI_ResponseJSON = await apiRequest(RequestJSON)
		const [companyDatas, personalDatas, notConvertedDatas]
			= [convertAPI_ResponseJSON.company_data, convertAPI_ResponseJSON.personal_data, convertAPI_ResponseJSON.invalid_data]

		// exportBlobs, exportBlobNamesは0:組織データ出力ファイル、1:個人データ出力ファイル、2:成形不能データ出力ファイル用データを格納
		const exportBlobs = new Array<Blob>(3)
		const exportBlobNames = new Array<string>(3)

		// v2フォーマットでは組織・個人データ出力ファイル、成形不能データ出力ファイルがそれぞれ一つずつためインデックスが0のものだけを読み取る
		const [convertedCompanyFileName, convertedPersonalFileName, notConvertedFileName] = [companyDatas[0].file_name, personalDatas[0].file_name, notConvertedDatas[0].file_name]
		const [convertedCompanyFileExtension, convertedPersonalFileExtension, notConvertedFileExtension] = [convertedCompanyFileName.split(".").pop() ?? "", convertedPersonalFileName.split(".").pop() ?? "", notConvertedFileName.split(".").pop() ?? ""]
		const [companyFileData, personalFileData, notConvertedFileData] = [companyDatas[0].file_data, personalDatas[0].file_data, notConvertedDatas[0].file_data]

		exportBlobNames[0] = `formatted_company_${convertedCompanyFileName}`
		const convertedSmartSenkyoFormatCompanyBlob = getSmartSenkyoFormatBlobFromJson(companyFileData, SmartSenkyoCompanyColumnNames, "組織", convertedCompanyFileExtension)
		exportBlobs[0] = convertedSmartSenkyoFormatCompanyBlob

		exportBlobNames[1] = `formatted_personal_${convertedPersonalFileName}`
		const convertedSmartSenkyoFormatPersonalBlob = getSmartSenkyoFormatBlobFromJson(personalFileData, SmartSenkyoPersonalColumnNames, "個人", convertedPersonalFileExtension)
		exportBlobs[1] = convertedSmartSenkyoFormatPersonalBlob

		exportBlobNames[2] = `not_formatted_${notConvertedFileName}`
		const notConvertedSmartSenkyoFormatBlob = getBlobFromJson(notConvertedFileData, sheetNames[0], notConvertedFileExtension)
		exportBlobs[2] = notConvertedSmartSenkyoFormatBlob

		setExportBlobState(exportBlobs)
		setExportBlobNameState(exportBlobNames)
		setStepState(6)
	}
	const convertFile = async () => {
		// TODO: proceedStep()を使いたい
		setStepState(stepState + 1)

		// ファイルをjsonにしてAPIへ
		const inputExcelFiles: File[] = Object.values(fileState)
		const { JSONFormedSheets, fileNames, sheetNames } = await readFileList(inputExcelFiles)

		postToConvert(JSONFormedSheets, fileNames, sheetNames)
	}

	return (
		<div>
			<Header page_title="自動名簿整形ツール" />
			<MainContent
				step_state={stepState}
				on_address_separator_acted={switchAddressSeparatorOption}
				address_separator_selected_flag={addressSeparatorOptionState}
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
