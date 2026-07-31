const SPREADSHEET_ID = "1iAaSAr49rceMHeS7lPtxGs8SeFtjmyg7W6vrGD2GY9s";
const SHEET_NAME = "お問い合わせ管理";

function doGet() {
  try {
    getTargetSheet();
    return jsonResponse({ success: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, message: "Internal error" });
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const expectedKey =
      PropertiesService.getScriptProperties().getProperty("ARTERIA_CONTACT_API_KEY");
    if (!expectedKey || payload.apiKey !== expectedKey) {
      return jsonResponse({ success: false, message: "Unauthorized" });
    }

    const sheet = getTargetSheet();
    if (payload.healthCheck === true) {
      return jsonResponse({ success: true });
    }

    const name = clean(payload.name, 80);
    const email = clean(payload.email, 160);
    const phone = clean(payload.phone, 30);
    const organization = clean(payload.organization, 120);
    const category = clean(payload.category, 80);
    const message = clean(payload.message, 3000);
    const privacy = clean(payload.privacy, 20);
    const sourcePage = clean(payload.sourcePage, 500);
    if (!name || !email || !phone || !category || !message || privacy !== "同意する") {
      return jsonResponse({ success: false, message: "Invalid payload" });
    }

    const contactId = Utilities.getUuid();
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) {
      throw new Error("Could not acquire script lock");
    }
    try {
      sheet.appendRow([
        new Date(),
        contactId,
        "未対応",
        safeCell(category),
        safeCell(name),
        safeCell(email),
        safeCell(phone),
        safeCell(organization),
        safeCell(message),
        privacy,
        "",
        "",
        "",
        safeCell(sourcePage),
      ]);
    } finally {
      lock.releaseLock();
    }
    return jsonResponse({ success: true, id: contactId });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, message: "Internal error" });
  }
}

function clean(value, maxLength) {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
}

function getTargetSheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error("Sheet not found");
  }
  return sheet;
}

function safeCell(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
