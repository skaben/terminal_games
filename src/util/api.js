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
    console.log(url);
    try {
        const response = await fetch(url, { mode: "no-cors" });
        console.log(await response);
        const result = await response.json();
        return result;
    } catch (err) {
        console.error(err);
        return '';
    }
}
