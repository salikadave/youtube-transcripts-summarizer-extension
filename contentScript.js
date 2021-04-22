const URL = "";

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "generate") {
    console.log("message received from extension");
    console.log(message.currentTabUrl);
    let finalURL = URL + message.currentTabUrl;
    returnExtractedSummary("Hello from the other side")
  }
});

const generateSummary = (url) => {
  fetch(url)
    .then((data) => data.json)
    .then((text) => console.log(text))
    .catch((err) => console.log(err));
};

const returnExtractedSummary = (text) => {
  chrome.runtime.sendMessage({ action: "result", summaryText: text });
};
