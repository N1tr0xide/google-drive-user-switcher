browser.runtime.onMessage.addListener(async (msg) => {
    if (msg.type === "getAccounts") {
        return getGoogleAccounts();
    }

    if (msg.type === "switchAccount") {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        const tab = tabs[0];

        const url = new URL(tab.url);

        // Set authuser to the selected email
        url.searchParams.set("authuser", msg.email);

        browser.tabs.update(tab.id, { url: url.toString() });
    }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        browser.runtime.sendMessage({
        type: "tabUpdated",
        url: tab.url
        });
    }
});