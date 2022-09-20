import { API_URL } from "../utils/CONSTANTS";
export const RequestApi = async (method, reqUrl, authToken, payloadData) => {
  if (payloadData) {
    if (typeof payloadData === "string") {
      console.log(payloadData);
    } else {
      for (const pair of payloadData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }
  }

  var isLoading = true;
  var config = {};
  if (authToken) {
    config = {
      Authorization: "Bearer " + authToken,
    };
  } else {
    config = {
      "Content-Type": "application/json",
    };
  }

  try {
    const reqData = await fetch(`${API_URL}/${reqUrl}`, {
      method: method,
      body: payloadData,
      headers: config,
    });
    const response = await reqData.json();
    isLoading = false;
    return [response, isLoading];
  } catch (error) {
    console.log(error);
    return null;
  }
};
