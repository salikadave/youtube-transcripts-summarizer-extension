let summaryCTA = document.getElementById("ctaGenerateSummary");
let progressContainer = document.getElementById("progressHolder");

document.addEventListener("DOMContentLoaded", (e) => {
  summaryCTA.addEventListener("click", generateSummary);
});

const generateSummary = () => {
  // disable summary button
  summaryCTA.classList.add("disabled");
  // show progress bar
  progressContainer.innerHTML = `<div class="progress">
  <div class="indeterminate"></div>
  </div>`;
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
    summaryCTA.classList.remove("disabled");
    progressContainer.innerHTML = "";
    printOutputSummary(message.summaryText);
    // window.open()
  }
});

const printOutputSummary = (result) => {
  const placeholder = document.getElementById("summaryText");
  placeholder.classList.add("summaryTextLayout");
  placeholder.textContent = result.summary;
  document.getElementById("time").textContent = `${result.time_taken} mins`
};
