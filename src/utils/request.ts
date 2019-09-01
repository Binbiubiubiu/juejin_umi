function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  //   error.response = response;
  throw error;
}

export default async function request(url: RequestInfo, options?: RequestInit) {
  const response = await fetch(url, options);

  //   checkStatus(response);

  const data = await response.json();

  const ret = {
    data,
  };

  return ret;
}
