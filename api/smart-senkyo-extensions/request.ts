type APIResponseFileData = {
	file_name: string
	file_data: JSON
}

type APIResponse = {
	file_number: number
	politician_data: APIResponseFileData[]
  party_data: APIResponseFileData[]
  invalid_data: APIResponseFileData[]
}

const postRequest = async (url: string, body: any) => {
  // TODO: any type の削除
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

const apiRequest = async (body: any) => {
  // TODO: any type の削除
  const url = "https://bczm5aw2fkuevavyh7ievzdqje0sxhlg.lambda-url.ap-northeast-1.on.aws/"
  const response = await postRequest(url, body) as APIResponse

  return response
}

export default apiRequest
