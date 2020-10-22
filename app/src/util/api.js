export const HOSTURL = "http://127.0.0.1:5000";
const APIURL = new URL("/api", HOSTURL);

export async function postData(data) {
    let response = await fetch(APIURL, {
      method: "POST",
      headers: {
          "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}


export async function getData(url) {
  const response = await fetch(url);
  try {
    if (!response.ok) { throw response.status };
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}
