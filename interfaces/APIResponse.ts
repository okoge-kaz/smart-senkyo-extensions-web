type APIResponseFileData = {
	file_name: string
	file_data: JSON
}

export type APIResponse = {
	personal_data: APIResponseFileData
  company_data: APIResponseFileData
  not_converted_data: APIResponseFileData
}
