import { dispatchEvent } from "../util/helpers";

const APIURL = new URL("/api/event", HOSTURL);


export async function postData(data) {
    let response = await fetch(APIURL, {
      method: "POST",
      headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    try {
      const result = await response.json();
      if (result.switchpage) {
        dispatchEvent(window, "switchpage", result.switchpage);
      }
      return result;
    } catch (err) {
      console.error(`POST error: ${err}`);
    }
}

export async function getData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    if (!response.ok) { throw response.status };
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
}
