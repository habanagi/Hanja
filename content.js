// Add event listener for shift key press with text selection
document.addEventListener("keydown", (event) => {
  if (event.key === "Shift" && window.getSelection().toString()) {
    const query = window.getSelection().toString();

    // Send query to the background script
    if (query) {
      chrome.runtime.sendMessage(
        { action: "fetchNaverData", query },
        (response) => {
          if (response.success) {
            const items = response.data.items[0];
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            overlay.style.border = "1px solid black";
            overlay.style.padding = "5px";
            overlay.style.zIndex = "1000";

            items.forEach((item, index) => {
              const itemText = document.createElement("div");
              itemText.textContent = item[0];
              itemText.style.fontSize = "20px";
              itemText.style.color = "white";
              overlay.appendChild(itemText);
            });

            document.body.appendChild(overlay);

            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            overlay.style.top = `${rect.bottom + window.scrollY}px`;
            overlay.style.left = `${rect.left + window.scrollX}px`;
            document.addEventListener("selectionchange", () => {
              if (!window.getSelection().toString()) {
                overlay.remove();
              }
            });
          } else {
            console.error("エラー:", response.error);
            alert("データの取得に失敗しました。");
          }
        }
      );
    }
  }
});
