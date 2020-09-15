import { postData } from "./api.js";


window.addEventListener("gamewin", async () => {
    const result = await postData({"event": "gamewin"});
    alert(result.message);
});