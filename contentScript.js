const URL = "http://127.0.0.1:5000/api/summarize?youtube=";

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "generate") {
    console.log("message received from extension");
    console.log(message.currentTabUrl);
    let finalURL = URL + message.currentTabUrl;
    // returnExtractedSummary("Hello from the other side")
    generateSummary(finalURL);
  }
});

const generateSummary = (url) => {
  fetch(url)
    .then((data) => data.json())
    .then((text) => {
      returnExtractedSummary(text);
    })
    .catch((err) => console.log(err));
};

const returnExtractedSummary = (text) => {
  chrome.runtime.sendMessage({ action: "result", summaryText: text });
};
