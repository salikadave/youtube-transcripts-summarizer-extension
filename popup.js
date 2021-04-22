document.addEventListener("DOMContentLoaded", (e) => {
  let summaryCTA = document.getElementById("ctaGenerateSummary");
  summaryCTA.addEventListener("click", generateSummary);
});

const generateSummary = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "generate",
      currentTabUrl: tabs[0].url,
    });
  });
};

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "result") {
    console.log("printing output summary");
    printOutputSummary(message.summaryText)
  }
});

const printOutputSummary = (text) => {
  const placeholder = document.getElementById("summaryText");
  placeholder.textContent = text;
};
