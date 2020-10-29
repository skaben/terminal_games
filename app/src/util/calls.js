import { postData } from "./api";

// client-side

const listenTo = [
    "gamewin",
    "gamelose",
    "userinput"
]

listenTo.forEach(eventName => {
  window.addEventListener(eventName, async () => {
    await postData({"event": eventName});
  });
});

// server-side

window.addEventListener("switchpage", e => {
  window.location.href = e.detail;
})
