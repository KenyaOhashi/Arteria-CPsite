const SPREADSHEET_ID = "1uGvNvlWpLJ5ZBkOYqX0ujOZ1AW0D7h6onuwY1P1CDLM";
const CONTROL_SHEET = "公開管理";
const MAX_EDIT_ROWS = 200;

const CONTENT_TYPES = {
  お知らせ: {
    apiType: "news",
    publishedSheet: "_公開_お知らせ",
    sourceHeaders: [
      "掲載",
      "ID",
      "公開日",
      "カテゴリー",
      "タイトル",
      "概要",
      "本文",
      "リンクURL",
      "表示順",
    ],
    publishedHeaders: ["id", "date", "category", "title", "summary", "body", "url", "order"],
    widths: [70, 250, 110, 130, 260, 320, 460, 300, 80],
  },
  採用: {
    apiType: "recruit",
    publishedSheet: "_公開_採用",
    sourceHeaders: [
      "掲載",
      "ID",
      "職種名",
      "雇用形態",
      "勤務地",
      "仕事内容",
      "応募条件",
      "応募URL",
      "表示順",
    ],
    publishedHeaders: [
      "id",
      "title",
      "employment",
      "location",
      "description",
      "requirements",
      "url",
      "order",
    ],
    widths: [70, 250, 220, 140, 180, 420, 420, 300, 80],
  },
  SNS: {
    apiType: "sns",
    publishedSheet: "_公開_SNS",
    sourceHeaders: ["掲載", "ID", "SNS名", "アカウント名", "説明", "URL", "表示順"],
    publishedHeaders: ["id", "network", "account", "description", "url", "order"],
    widths: [70, 250, 140, 220, 360, 300, 80],
  },
};

function setupContentManagement() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const names = Object.keys(CONTENT_TYPES);
  const initialSheet = spreadsheet.getSheetByName("シート1");

  if (initialSheet && spreadsheet.getSheets().length === 1 && initialSheet.getLastRow() === 0) {
    initialSheet.setName(names[0]);
  }

  names.forEach((name) => {
    const config = CONTENT_TYPES[name];
    const sourceSheet = getOrCreateSheet(spreadsheet, name);
    prepareSourceSheet(sourceSheet, name, config);

    const publishedSheet = getOrCreateSheet(spreadsheet, config.publishedSheet);
    preparePublishedSheet(publishedSheet, config);
    publishedSheet.hideSheet();
  });

  prepareControlSheet(getOrCreateSheet(spreadsheet, CONTROL_SHEET), names);
  publishAll();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName(CONTROL_SHEET));
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("サイト公開")
    .addItem("すべて公開反映", "publishAll")
    .addSeparator()
    .addItem("管理シートを初期設定", "setupContentManagement")
    .addToUi();
}

function onEdit(event) {
  if (!event || !event.range) return;

  const range = event.range;
  const sheet = range.getSheet();
  if (
    sheet.getName() !== CONTROL_SHEET ||
    range.getColumn() !== 2 ||
    range.getRow() < 2 ||
    range.getRow() > 4 ||
    event.value !== "TRUE"
  ) {
    return;
  }

  const target = sheet.getRange(range.getRow(), 1).getDisplayValue();
  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(15000)) {
    sheet.getRange(range.getRow(), 4).setValue("処理中のため、少し待って再度お試しください");
    range.setValue(false);
    return;
  }

  try {
    publishSection(target, event.source);
  } catch (error) {
    console.error(error);
    sheet.getRange(range.getRow(), 4).setValue("公開エラー");
  } finally {
    range.setValue(false);
    lock.releaseLock();
  }
}

function publishAll() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  Object.keys(CONTENT_TYPES).forEach((name) => publishSection(name, spreadsheet));
}

function publishSection(name, sourceSpreadsheet) {
  const config = CONTENT_TYPES[name];
  if (!config) throw new Error(`Unknown content type: ${name}`);

  const spreadsheet = sourceSpreadsheet || SpreadsheetApp.openById(SPREADSHEET_ID);
  const sourceSheet = spreadsheet.getSheetByName(name);
  const publishedSheet = spreadsheet.getSheetByName(config.publishedSheet);
  if (!sourceSheet || !publishedSheet) throw new Error(`Sheet not found: ${name}`);

  const lastRow = Math.max(sourceSheet.getLastRow(), 1);
  const rowCount = Math.max(lastRow - 1, 0);
  const values =
    rowCount > 0
      ? sourceSheet.getRange(2, 1, rowCount, config.sourceHeaders.length).getValues()
      : [];
  const displayValues =
    rowCount > 0
      ? sourceSheet.getRange(2, 1, rowCount, config.sourceHeaders.length).getDisplayValues()
      : [];

  const items = [];
  let skipped = 0;

  values.forEach((row, index) => {
    if (row[0] !== true) return;

    let id = clean(displayValues[index][1], 120);
    if (!id) {
      id = Utilities.getUuid();
      sourceSheet.getRange(index + 2, 2).setValue(id);
    }

    const item = createItem(name, id, row, displayValues[index], index + 2);
    if (item) {
      items.push(item);
    } else {
      skipped += 1;
    }
  });

  items.sort((a, b) => {
    const orderDifference = Number(a.order) - Number(b.order);
    if (orderDifference !== 0) return orderDifference;
    if (name === "お知らせ") return String(b.date).localeCompare(String(a.date));
    return String(a.title || a.network).localeCompare(String(b.title || b.network), "ja");
  });

  publishedSheet.clearContents();
  publishedSheet
    .getRange(1, 1, 1, config.publishedHeaders.length)
    .setValues([config.publishedHeaders]);
  if (items.length > 0) {
    publishedSheet
      .getRange(2, 1, items.length, config.publishedHeaders.length)
      .setValues(items.map((item) => config.publishedHeaders.map((header) => item[header] ?? "")));
  }

  const controlSheet = spreadsheet.getSheetByName(CONTROL_SHEET);
  const controlRow = findControlRow(controlSheet, name);
  if (controlRow) {
    controlSheet
      .getRange(controlRow, 3)
      .setValue(new Date())
      .setNumberFormat("yyyy/mm/dd hh:mm:ss");
    controlSheet
      .getRange(controlRow, 4)
      .setValue(
        skipped > 0
          ? `公開完了：${items.length}件（入力不足${skipped}件を除外）`
          : `公開完了：${items.length}件`,
      );
  }

  SpreadsheetApp.flush();
}

function doGet(event) {
  try {
    const requestedType = clean(event?.parameter?.type, 30);
    const callback = clean(event?.parameter?.callback, 120);
    const entry = Object.entries(CONTENT_TYPES).find(
      ([, config]) => config.apiType === requestedType,
    );
    if (!entry) {
      return contentResponse(
        { success: false, message: "Unknown content type", items: [] },
        callback,
      );
    }

    const [name, config] = entry;
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const publishedSheet = spreadsheet.getSheetByName(config.publishedSheet);
    if (!publishedSheet) throw new Error(`Published sheet not found: ${name}`);

    const lastRow = publishedSheet.getLastRow();
    const items =
      lastRow > 1
        ? publishedSheet
            .getRange(2, 1, lastRow - 1, config.publishedHeaders.length)
            .getDisplayValues()
            .map((row) =>
              Object.fromEntries(
                config.publishedHeaders.map((header, index) => [header, row[index] || ""]),
              ),
            )
        : [];

    const controlSheet = spreadsheet.getSheetByName(CONTROL_SHEET);
    const controlRow = findControlRow(controlSheet, name);
    const updatedAt = controlRow ? controlSheet.getRange(controlRow, 3).getDisplayValue() : "";

    return contentResponse({ success: true, type: requestedType, updatedAt, items }, callback);
  } catch (error) {
    console.error(error);
    return contentResponse(
      { success: false, message: "Internal error", items: [] },
      clean(event?.parameter?.callback, 120),
    );
  }
}

function createItem(name, id, row, displayRow, sourceRow) {
  const order = Number(displayRow[displayRow.length - 1]) || sourceRow;

  if (name === "お知らせ") {
    const title = clean(displayRow[4], 200);
    if (!title) return null;
    return {
      id,
      date: formatDate(row[2], displayRow[2]),
      category: clean(displayRow[3], 80),
      title,
      summary: clean(displayRow[5], 500),
      body: clean(displayRow[6], 5000),
      url: safeUrl(displayRow[7]),
      order,
    };
  }

  if (name === "採用") {
    const title = clean(displayRow[2], 200);
    if (!title) return null;
    return {
      id,
      title,
      employment: clean(displayRow[3], 100),
      location: clean(displayRow[4], 200),
      description: clean(displayRow[5], 5000),
      requirements: clean(displayRow[6], 5000),
      url: safeUrl(displayRow[7]),
      order,
    };
  }

  const network = clean(displayRow[2], 100);
  const url = safeUrl(displayRow[5]);
  if (!network || !url) return null;
  return {
    id,
    network,
    account: clean(displayRow[3], 200),
    description: clean(displayRow[4], 1000),
    url,
    order,
  };
}

function prepareSourceSheet(sheet, name, config) {
  sheet.showSheet();
  sheet.getRange(1, 1, 1, config.sourceHeaders.length).setValues([config.sourceHeaders]);
  sheet.setFrozenRows(1);
  styleHeader(sheet.getRange(1, 1, 1, config.sourceHeaders.length));
  sheet.getRange(2, 1, MAX_EDIT_ROWS - 1, 1).insertCheckboxes();
  sheet
    .getRange(2, 1, MAX_EDIT_ROWS - 1, config.sourceHeaders.length)
    .setVerticalAlignment("top")
    .setWrap(true);

  config.widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));
  sheet.setRowHeight(1, 40);

  const filter = sheet.getFilter();
  if (filter) filter.remove();
  sheet.getRange(1, 1, MAX_EDIT_ROWS, config.sourceHeaders.length).createFilter();

  if (name === "お知らせ") {
    sheet.getRange(2, 3, MAX_EDIT_ROWS - 1, 1).setNumberFormat("yyyy/mm/dd");
    applyListValidation(sheet.getRange(2, 4, MAX_EDIT_ROWS - 1, 1), [
      "お知らせ",
      "プレスリリース",
      "イベント",
      "採用",
      "その他",
    ]);
  }

  if (name === "採用") {
    applyListValidation(sheet.getRange(2, 4, MAX_EDIT_ROWS - 1, 1), [
      "正社員",
      "契約社員",
      "業務委託",
      "アルバイト・パート",
      "インターン",
      "その他",
    ]);
  }
}

function preparePublishedSheet(sheet, config) {
  sheet.clear();
  sheet.getRange(1, 1, 1, config.publishedHeaders.length).setValues([config.publishedHeaders]);
  styleHeader(sheet.getRange(1, 1, 1, config.publishedHeaders.length));
  sheet.setFrozenRows(1);
}

function prepareControlSheet(sheet, names) {
  const headers = ["対象", "公開反映", "最終公開日時", "状態", "操作説明"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  styleHeader(sheet.getRange(1, 1, 1, headers.length));
  sheet.setFrozenRows(1);
  sheet.getRange(2, 1, names.length, 1).setValues(names.map((name) => [name]));
  sheet.getRange(2, 2, names.length, 1).insertCheckboxes();
  sheet
    .getRange(2, 5, names.length, 1)
    .setValues(
      names.map(() => [
        "各タブで内容を編集し、掲載する行にチェックを入れた後、このチェックをオンにするとサイトへ反映されます。",
      ]),
    );

  names.forEach((name, index) => {
    const statusCell = sheet.getRange(index + 2, 4);
    if (!statusCell.getValue()) statusCell.setValue("未公開");
  });

  [120, 90, 160, 260, 540].forEach((width, index) => sheet.setColumnWidth(index + 1, width));
  sheet.getRange(2, 1, names.length, headers.length).setVerticalAlignment("top").setWrap(true);
  sheet.setRowHeight(1, 40);
  sheet.setRowHeights(2, names.length, 64);
}

function styleHeader(range) {
  range
    .setBackground("#f2f2f2")
    .setFontColor("#191919")
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(true);
}

function applyListValidation(range, values) {
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(values, true)
    .setAllowInvalid(false)
    .build();
  range.setDataValidation(rule);
}

function getOrCreateSheet(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function findControlRow(sheet, name) {
  if (!sheet) return 0;
  const values = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1).getDisplayValues();
  const index = values.findIndex(([value]) => value === name);
  return index >= 0 ? index + 2 : 0;
}

function formatDate(value, displayValue) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return Utilities.formatDate(value, "Asia/Tokyo", "yyyy-MM-dd");
  }
  return clean(displayValue, 30);
}

function safeUrl(value) {
  const url = clean(value, 1000);
  return /^https?:\/\//i.test(url) ? url : "";
}

function clean(value, maxLength) {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
}

function contentResponse(payload, callback) {
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  if (/^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService.createTextOutput(`${callback}(${json});`).setMimeType(
      ContentService.MimeType.JAVASCRIPT,
    );
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
