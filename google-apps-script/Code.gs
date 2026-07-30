const SPREADSHEET_ID = "1suujeoF7bmIHdJF7s8pLMuYTt9liGk6IfILKDdkM9t0";
const SHEET_NAME = "お問い合わせ管理";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const expectedKey =
      PropertiesService.getScriptProperties().getProperty("ARTERIA_CONTACT_API_KEY");
    if (!expectedKey || payload.apiKey !== expectedKey) {
      return jsonResponse({ success: false, message: "Unauthorized" });
    }

    const name = clean(payload.name, 80);
    const email = clean(payload.email, 160);
    const phone = clean(payload.phone, 30);
    const organization = clean(payload.organization, 120);
    const category = clean(payload.category, 80);
    const message = clean(payload.message, 3000);
    const privacy = clean(payload.privacy, 20);
    const sourcePage = clean(payload.sourcePage, 500);
    if (!name || !email || !category || !message || privacy !== "同意する") {
      return jsonResponse({ success: false, message: "Invalid payload" });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Sheet not found");
    const contactId = Utilities.getUuid();
    sheet.appendRow([
      new Date(),
      contactId,
      "未対応",
      category,
      name,
      email,
      phone,
      organization,
      message,
      privacy,
      "",
      "",
      "",
      sourcePage,
    ]);
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

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
