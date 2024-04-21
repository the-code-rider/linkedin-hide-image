document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.getElementById('toggle-checkbox');

  // Get the current state from storage and update the checkbox
  chrome.storage.sync.get('hideImages', function(data) {
    checkbox.checked = data.hideImages;
  });

  // Save the new state to storage
  checkbox.addEventListener('change', function () {
    chrome.storage.sync.set({ hideImages: checkbox.checked }, function() {
      // Send a message to the content script to toggle images
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "toggleImages", hideImages: checkbox.checked });
      });
    });
  });
});
