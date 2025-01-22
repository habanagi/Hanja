chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchNaverData") {
    const query = request.query;
    const url = `https://ac-dict.naver.com/ccko/ac?st=11&r_lt=11&q=${encodeURIComponent(
      query
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => sendResponse({ success: true, data }))
      .catch((error) => sendResponse({ success: false, error: error.message }));

    // Keep the messaging channel open for async response
    return true;
  }
});
