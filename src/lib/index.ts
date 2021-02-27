export const getColor = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("color", ({ color }) => {
      resolve(color);
    });
  });
};

export const setBackground = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
};

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

export const getWindowTabs = async () => {
  return await chrome.tabs.query({ currentWindow: true });
};

/** 存储标签页 */
export const setStoreTabs = async (tabStore: TabStore[]) => {
  chrome.storage.local.set({ tabStore });
};

/** 读取存储的标签页 */
export const getStoreTabs = async () => {
  return new Promise<TabStore[]>((resolve, reject) => {
    chrome.storage.local.get("tabStore", (data) => {
      console.log("Store", data);
      const { tabStore } = data;

      resolve(tabStore);
    });
  });
};

/** 打开标签页 */
export const createTab = (url?: string) => chrome.tabs.create({ url: url });
