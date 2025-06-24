type API = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
};

export const api = async ({ url, method, body }: API) => {
  console.log("API CALL");
  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(body),
  });

  console.log("API RES STATUS:", response.status);

  const data = await response.json();
  console.log("API RES DATA: ", data);
  return data;
};
