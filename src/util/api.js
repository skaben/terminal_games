const APIURL = "/api";


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
    let response = await fetch(url);
    const result = await response.json();
    return result;
}
