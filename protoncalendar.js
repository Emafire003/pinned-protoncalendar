let currentTabId;
let protonTabId;
let previousTab;

function createPinnedTab() {
  chrome.tabs.create(
    {
      url: "https://calendar.proton.me/login/",
      pinned: true,
      active: true
    }
  )
};

function handleSearch(protonTabs) {
  if(protonTabs.length > 0) {
    protonTabId = protonTabs[0].id;
    if(protonTabId === currentTabId) {
      chrome.tabs.update(previousTab, {active: true,});
    } 
    else {
      previousTab = currentTabId;
      chrome.tabs.update(protonTabId, {active: true,});
    }
  } 
  else {
    previousTab = currentTabId;
    createPinnedTab();
  }
};

function handleClick(tab) {
  currentTabId = tab.id;
  chrome.tabs.query({url: "https://calendar.proton.me/*"}, handleSearch);
};

chrome.browserAction.onClicked.addListener(handleClick);