chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['contentScript.js']
  }).then(() => {
    console.log('Script injected successfully');
  }).catch(err => {
    console.error('Failed to inject script: ', err);
  });
});
