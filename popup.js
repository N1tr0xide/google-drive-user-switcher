async function getAccounts() {
  const result = await browser.storage.local.get("accounts");
  return Array.isArray(result.accounts) ? result.accounts : [];
}

async function saveAccounts(accounts) {
  await browser.storage.local.set({ accounts });
}

async function init() {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];

    const container = document.getElementById("accounts");
    const addSection = document.getElementById("addAccountSection");

    const accounts = await getAccounts();

    // NOT ON DRIVE
    if (!tab.url.includes("drive.google.com")) {
        addSection.style.display = "none";

        container.innerHTML = `
        <div style="padding: 10px;">
            <strong>This extension works on Google Drive.</strong><br><br>
            <button id="goDriveBtn" style="width:100%; padding:8px;">Go to Google Drive</button>
        </div>
        `;

        document.getElementById("goDriveBtn").addEventListener("click", () => {
        browser.tabs.update(tab.id, { url: "https://drive.google.com" });
        });

        return;
    }

    // Show Accounts
    addSection.style.display = "block";
    container.innerHTML = "";

    accounts.forEach((email, index) => {
        const div = document.createElement("div");
        div.className = "account";

        div.innerHTML = `
            <span>${email}</span>
            <span class="delete" data-index="${index}">X</span>
        `;

        // Switch account
        div.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) return;

        browser.runtime.sendMessage({
            type: "switchAccount",
            email,
        });
        });

        // Delete account
        div.querySelector(".delete").addEventListener("click", async (e) => {
        e.stopPropagation();
        accounts.splice(index, 1);
        await saveAccounts(accounts);
        init();
        });

        container.appendChild(div);
    });
}

// Add new account
document.getElementById("addBtn").addEventListener("click", async () => {
    const email = document.getElementById("emailInput").value.trim();
    if (!email) return;

    const accounts = await getAccounts();
    accounts.push(email);

    await saveAccounts(accounts);
    document.getElementById("emailInput").value = "";
    init();
});

// Re-render when Drive loads
browser.runtime.onMessage.addListener((msg) => {
    if (msg.type === "tabUpdated" && msg.url.includes("drive.google.com")) {
        init();
    }
});

//Render on load
init();
