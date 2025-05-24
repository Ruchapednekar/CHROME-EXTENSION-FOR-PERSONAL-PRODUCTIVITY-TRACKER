// background.js - tracks time spent on active tabs and saves to storage

let activeTabId = null;
let startTime = null;

function saveTimeSpent(url, timeSpent) {
  chrome.storage.local.get({ timeData: {} }, (result) => {
    let timeData = result.timeData;

    if (!timeData[url]) {
      timeData[url] = 0;
    }
    timeData[url] += timeSpent;

    chrome.storage.local.set({ timeData });
  });
}

function onTabActivated(activeInfo) {
  if (activeTabId !== null && startTime !== null) {
    chrome.tabs.get(activeTabId, (tab) => {
      if (tab && tab.url) {
        const timeSpent = (Date.now() - startTime) / 1000; // seconds
        saveTimeSpent(tab.url, timeSpent);
      }
    });
  }

  activeTabId = activeInfo.tabId;
  startTime = Date.now();
}

function onWindowFocusChanged(windowId) {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // User switched away from Chrome
    if (activeTabId !== null && startTime !== null) {
      chrome.tabs.get(activeTabId, (tab) => {
        if (tab && tab.url) {
          const timeSpent = (Date.now() - startTime) / 1000;
          saveTimeSpent(tab.url, timeSpent);
        }
      });
    }
    activeTabId = null;
    startTime = null;
  } else {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      if (tabs.length === 0) return;
      activeTabId = tabs[0].id;
      startTime = Date.now();
    });
  }
}

chrome.tabs.onActivated.addListener(onTabActivated);
chrome.windows.onFocusChanged.addListener(onWindowFocusChanged);
chrome.runtime.onStartup.addListener(() => {
  activeTabId = null;
  startTime = null;
});
