import { postData } from "./api.js";


const listenTo = [
    "gamewin",
    "gamelose",
    "userinput"
]

listenTo.forEach(eventName => {
  window.addEventListener(eventName, async () => {
    const result = await postData({"event": eventName});
  });
});