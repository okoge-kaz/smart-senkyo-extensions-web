import { APIResponse } from "interfaces/APIResponse";

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
  console.log("APIResponse")
  console.log(response)

  return response
}

export default apiRequest
