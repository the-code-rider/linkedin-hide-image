// Function to hide or show images based on the hide parameter
function updateImageVisibility(hide) {
  const images = document.querySelectorAll('img');
  images.forEach(img => img.style.display = hide ? 'none' : '');
}

// Listen for changes in the DOM
const observer = new MutationObserver((mutations) => {
  // Check if images are supposed to be hidden
  chrome.storage.sync.get({ hideImages: true }, function(data) {
    if (data.hideImages) {
      updateImageVisibility(true);
    }
  });
});

// Start observing the body for added nodes
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial state
chrome.storage.sync.get({ hideImages: true }, function(data) {
  updateImageVisibility(data.hideImages);
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleImages") {
    updateImageVisibility(request.hideImages);
  }
});
