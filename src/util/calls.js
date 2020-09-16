import { postData } from "./api.js";

const listenTo = [
    "gamewin",
    "gamelose",
    "userinput",
]

window.addEventListener("gamewin", async () => {
    const result = await postData({"event": "gamewin"});
    alert(result.message);
});