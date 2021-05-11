const URL = "http://127.0.0.1:5000/api/bart?youtube=";
// http://127.0.0.1:5000/api/bart?youtube=https://www.youtube.com/watch?v=F5378Ag9EjA
chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "generate") {
    console.log("message received from extension");
    console.log(message.currentTabUrl);
    let finalURL = URL + message.currentTabUrl;
    console.log(finalURL);
    // returnExtractedSummary()
    generateSummary(finalURL);
  }
});

const generateSummary = (url) => {
  fetch(url)
    .then((data) => data.json())
    .then((text) => {
      console.log(text);
      returnExtractedSummary(text);
    })
    .catch((err) => console.log(err));
};

const returnExtractedSummary = (text) => {
  chrome.runtime.sendMessage({ action: "result", summaryText: text });
};

console.log("contentScript running...");
