document.addEventListener("DOMContentLoaded", (e) => {
  ctaGenerateSummary.addEventListener("click", generateSummary);
});

const generateSummary = () => {
  console.log("button clicked!");
};

// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});