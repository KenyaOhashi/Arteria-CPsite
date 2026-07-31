const RECRUIT_CONFIG = Object.freeze({
  managementSheetName: "応募者管理",
  guideSheetName: "運用ガイド",
  rootFolderName: "Arteria 採用応募者ファイル",
  applicationRoleTitle: "応募職種",
  privacyTitle: "個人情報の取り扱い",
  privacyUrl: "https://kenyaohashi.github.io/Arteria-CPsite/privacy.html",
  confirmationMessage: "ご応募ありがとうございます。内容を確認のうえ、担当者よりご連絡いたします。",
  statusOptions: [
    "新規",
    "書類選考中",
    "一次面接",
    "二次面接",
    "最終面接",
    "内定",
    "入社",
    "保留",
    "不採用",
    "辞退",
  ],
  managementHeaders: [
    "応募日時",
    "応募者ID",
    "応募職種",
    "氏名",
    "フリガナ",
    "メールアドレス",
    "電話番号",
    "選考状況",
    "担当者",
    "次回対応日",
    "履歴書",
    "職務経歴書",
    "応募者フォルダ",
    "その他",
    "メモ",
  ],
});

/**
 * 初回設定。
 * フォームに不足項目を追加し、応募者管理シート・Driveフォルダ・送信トリガーを作成します。
 */
function setupRecruitApplication() {
  const form = FormApp.getActiveForm();
  if (!form) {
    throw new Error("Googleフォームに紐づいたApps Scriptから実行してください。");
  }

  configureForm_(form);

  const destinationId = form.getDestinationId();
  if (!destinationId) {
    throw new Error("先にGoogleフォームの「回答」から回答先スプレッドシートを設定してください。");
  }

  const spreadsheet = SpreadsheetApp.openById(destinationId);
  const managementSheet = ensureManagementSheet_(spreadsheet);
  const rootFolder = getOrCreateRootFolder_(form);

  ensureSubmitTrigger_(spreadsheet);
  ensureGuideSheet_(spreadsheet, form, managementSheet, rootFolder);
  SpreadsheetApp.flush();

  console.log(`フォーム回答URL: ${form.getPublishedUrl()}`);
  console.log(`応募者管理: ${spreadsheet.getUrl()}#gid=${managementSheet.getSheetId()}`);
  console.log(`応募ファイル: ${rootFolder.getUrl()}`);
}

/**
 * スプレッドシートへのフォーム送信時に自動実行されます。
 */
function handleRecruitApplication(event) {
  if (!event || !event.range) {
    throw new Error("この関数はインストール型フォーム送信トリガーから実行してください。");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const responseSheet = event.range.getSheet();
    const spreadsheet = responseSheet.getParent();

    if (responseSheet.getName() === RECRUIT_CONFIG.managementSheetName) {
      return;
    }

    registerApplicationRow_(spreadsheet, responseSheet, event.range.getRow());
  } finally {
    lock.releaseLock();
  }
}

/**
 * 回答原本に既存データがある場合の再取り込み用です。
 */
function syncExistingResponses() {
  const form = FormApp.getActiveForm();
  const destinationId = form && form.getDestinationId();
  if (!destinationId) {
    throw new Error("回答先スプレッドシートが設定されていません。");
  }

  const spreadsheet = SpreadsheetApp.openById(destinationId);
  const responseSheet = findResponseSheet_(spreadsheet);
  const lastRow = responseSheet.getLastRow();

  for (let row = 2; row <= lastRow; row += 1) {
    registerApplicationRow_(spreadsheet, responseSheet, row);
  }
}

function configureForm_(form) {
  form
    .setDescription(
      [
        "Arteriaの採用応募フォームです。",
        "必要事項をご入力のうえ、履歴書・職務経歴書をアップロードしてください。",
        "",
        "※ファイルのアップロードにはGoogleアカウントへのログインが必要です。",
        "※ご入力いただいた個人情報は採用選考の目的にのみ利用します。",
      ].join("\n"),
    )
    .setConfirmationMessage(RECRUIT_CONFIG.confirmationMessage)
    .setAllowResponseEdits(false)
    .setShowLinkToRespondAgain(false)
    .setShuffleQuestions(false);

  if (typeof form.setPublished === "function") {
    form.setPublished(true);
  }

  form.setAcceptingResponses(true);

  const applicationRole = ensureTextItem_(
    form,
    RECRUIT_CONFIG.applicationRoleTitle,
    "採用ページに記載された職種名をご入力ください。",
    true,
  );
  form.moveItem(applicationRole.getIndex(), 0);

  ensureEmailValidation_(form);
  ensurePhoneValidation_(form);
  ensurePrivacyConsent_(form);
}

function ensureTextItem_(form, title, helpText, required) {
  const existing = findItemByTitle_(form, title);
  let item;

  if (existing) {
    if (existing.getType() !== FormApp.ItemType.TEXT) {
      throw new Error(`「${title}」は記述式の質問にしてください。`);
    }
    item = existing.asTextItem();
  } else {
    item = form.addTextItem().setTitle(title);
  }

  item.setHelpText(helpText).setRequired(required);
  return item;
}

function ensureEmailValidation_(form) {
  const item = findItemByTitle_(form, "メールアドレス");
  if (!item || item.getType() !== FormApp.ItemType.TEXT) {
    return;
  }

  const validation = FormApp.createTextValidation()
    .setHelpText("有効なメールアドレスを入力してください。")
    .requireTextIsEmail()
    .build();

  item.asTextItem().setRequired(true).setValidation(validation);
}

function ensurePhoneValidation_(form) {
  const item = findItemByTitle_(form, "電話番号");
  if (!item || item.getType() !== FormApp.ItemType.TEXT) {
    return;
  }

  const validation = FormApp.createTextValidation()
    .setHelpText("ハイフンなしの半角数字で入力してください。例：09012345678")
    .requireTextMatchesPattern("^(?:0\\d{9,10}|\\+81\\d{9,10})$")
    .build();

  item.asTextItem().setRequired(true).setValidation(validation);
}

function ensurePrivacyConsent_(form) {
  const existing = findItemByTitle_(form, RECRUIT_CONFIG.privacyTitle);
  let item;

  if (existing) {
    if (existing.getType() !== FormApp.ItemType.CHECKBOX) {
      throw new Error(`「${RECRUIT_CONFIG.privacyTitle}」はチェックボックス形式にしてください。`);
    }
    item = existing.asCheckboxItem();
  } else {
    item = form.addCheckboxItem().setTitle(RECRUIT_CONFIG.privacyTitle);
  }

  item
    .setChoices([item.createChoice("個人情報保護方針を確認し、応募情報の取り扱いに同意します")])
    .setHelpText(RECRUIT_CONFIG.privacyUrl)
    .setRequired(true);

  const otherIndex = form.getItems().findIndex((candidate) => candidate.getTitle() === "その他");
  if (otherIndex >= 0) {
    form.moveItem(item.getIndex(), otherIndex);
  }
}

function findItemByTitle_(form, title) {
  return form.getItems().find((item) => item.getTitle() === title) || null;
}

function ensureManagementSheet_(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(RECRUIT_CONFIG.managementSheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(RECRUIT_CONFIG.managementSheetName);
  }

  const headers = RECRUIT_CONFIG.managementHeaders;
  const currentHeaders =
    sheet.getLastColumn() > 0
      ? sheet
          .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length))
          .getDisplayValues()[0]
      : [];

  if (sheet.getLastRow() <= 1 || headers.every((header) => currentHeaders.includes(header))) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else {
    throw new Error(
      `「${RECRUIT_CONFIG.managementSheetName}」の見出しが想定と異なります。既存データを確認してください。`,
    );
  }

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setBackground("#f1f3f4")
    .setFontColor("#202124")
    .setFontWeight("bold")
    .setVerticalAlignment("middle")
    .setWrap(true);

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 36);

  const maxRows = Math.max(sheet.getMaxRows() - 1, 1);
  const statusColumn = headers.indexOf("選考状況") + 1;
  const nextActionColumn = headers.indexOf("次回対応日") + 1;
  const phoneColumn = headers.indexOf("電話番号") + 1;

  const statusValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(RECRUIT_CONFIG.statusOptions, true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(2, statusColumn, maxRows, 1).setDataValidation(statusValidation);
  sheet.getRange(2, nextActionColumn, maxRows, 1).setNumberFormat("yyyy/mm/dd");
  sheet.getRange(2, phoneColumn, maxRows, 1).setNumberFormat("@");
  sheet.getRange(2, 1, maxRows, headers.length).setVerticalAlignment("middle").setWrap(true);

  const widths = [150, 170, 170, 130, 130, 230, 140, 130, 130, 130, 210, 210, 240, 240, 240];
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));

  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, sheet.getMaxRows(), headers.length).createFilter();
  }

  return sheet;
}

function ensureGuideSheet_(spreadsheet, form, managementSheet, rootFolder) {
  let sheet = spreadsheet.getSheetByName(RECRUIT_CONFIG.guideSheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(RECRUIT_CONFIG.guideSheetName, 0);
  }

  const responseSheet = findResponseSheet_(spreadsheet);
  const values = [
    ["Arteria 採用応募管理", ""],
    ["", ""],
    ["応募フォーム", form.getPublishedUrl()],
    ["フォーム編集", form.getEditUrl()],
    ["回答原本", `${spreadsheet.getUrl()}#gid=${responseSheet.getSheetId()}`],
    ["応募者管理", `${spreadsheet.getUrl()}#gid=${managementSheet.getSheetId()}`],
    ["応募ファイル保管先", rootFolder.getUrl()],
    ["", ""],
    ["基本運用", "「応募者管理」タブで選考状況・担当者・次回対応日・メモを更新します。"],
    [
      "書類",
      "フォーム送信時に応募者ごとのフォルダへ移動し、履歴書・職務経歴書のURLを管理表へ保存します。",
    ],
    ["サイト掲載", "採用シートの「応募URL」には上記の応募フォームURLを設定します。"],
  ];

  sheet.clear();
  sheet.getRange(1, 1, values.length, 2).setValues(values);
  sheet.getRange("A1:B1").setBackground("#f1f3f4").setFontWeight("bold").setFontSize(14);
  sheet.getRange(3, 1, values.length - 2, 1).setFontWeight("bold");
  sheet.getRange(1, 1, values.length, 2).setVerticalAlignment("top").setWrap(true);
  sheet.setColumnWidth(1, 230);
  sheet.setColumnWidth(2, 520);
  sheet.setFrozenRows(1);
}

function ensureSubmitTrigger_(spreadsheet) {
  ScriptApp.getProjectTriggers()
    .filter(
      (trigger) =>
        trigger.getHandlerFunction() === "handleRecruitApplication" &&
        trigger.getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT,
    )
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger("handleRecruitApplication")
    .forSpreadsheet(spreadsheet)
    .onFormSubmit()
    .create();
}

function getOrCreateRootFolder_(form) {
  const properties = PropertiesService.getScriptProperties();
  const savedFolderId = properties.getProperty("RECRUIT_ROOT_FOLDER_ID");

  if (savedFolderId) {
    try {
      return DriveApp.getFolderById(savedFolderId);
    } catch (error) {
      console.warn("保存済みフォルダを開けなかったため、作り直します。");
    }
  }

  const formFile = DriveApp.getFileById(form.getId());
  const parents = formFile.getParents();
  const parentFolder = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
  const existingFolders = parentFolder.getFoldersByName(RECRUIT_CONFIG.rootFolderName);
  const rootFolder = existingFolders.hasNext()
    ? existingFolders.next()
    : parentFolder.createFolder(RECRUIT_CONFIG.rootFolderName);

  properties.setProperty("RECRUIT_ROOT_FOLDER_ID", rootFolder.getId());
  return rootFolder;
}

function registerApplicationRow_(spreadsheet, responseSheet, rowNumber) {
  const managementSheet = ensureManagementSheet_(spreadsheet);
  const record = readResponseRow_(responseSheet, rowNumber);
  const timestamp = record.values["タイムスタンプ"];
  const applicationId = buildApplicationId_(timestamp, rowNumber);

  if (managementHasApplication_(managementSheet, applicationId)) {
    return;
  }

  const rootFolder = getOrCreateRootFolder_(FormApp.getActiveForm());
  const applicantFolder = createApplicantFolder_(rootFolder, applicationId, record);

  const resumeUrls = moveUploadedFiles_(
    responseSheet,
    rowNumber,
    record.columnByTitle["履歴書"],
    applicantFolder,
    "履歴書",
    record.displayValues["氏名"],
  );
  const careerUrls = moveUploadedFiles_(
    responseSheet,
    rowNumber,
    record.columnByTitle["職務経歴書"],
    applicantFolder,
    "職務経歴書",
    record.displayValues["氏名"],
  );

  const output = {
    応募日時: timestamp instanceof Date ? timestamp : new Date(timestamp),
    応募者ID: applicationId,
    応募職種: record.displayValues["応募職種"] || "",
    氏名: record.displayValues["氏名"] || "",
    フリガナ: record.displayValues["フリガナ"] || "",
    メールアドレス: record.displayValues["メールアドレス"] || "",
    電話番号: record.displayValues["電話番号"] || "",
    選考状況: "新規",
    担当者: "",
    次回対応日: "",
    履歴書: resumeUrls.join("\n") || record.displayValues["履歴書"] || "",
    職務経歴書: careerUrls.join("\n") || record.displayValues["職務経歴書"] || "",
    応募者フォルダ: applicantFolder.getUrl(),
    その他: record.displayValues["その他"] || "",
    メモ: "",
  };

  const rowValues = RECRUIT_CONFIG.managementHeaders.map((header) => output[header] ?? "");
  const targetRow = managementSheet.getLastRow() + 1;
  managementSheet.getRange(targetRow, 1, 1, rowValues.length).setValues([rowValues]);
  managementSheet
    .getRange(targetRow, 1, 1, rowValues.length)
    .setVerticalAlignment("middle")
    .setWrap(true);
}

function readResponseRow_(sheet, rowNumber) {
  const lastColumn = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
  const values = sheet.getRange(rowNumber, 1, 1, lastColumn).getValues()[0];
  const displayValues = sheet.getRange(rowNumber, 1, 1, lastColumn).getDisplayValues()[0];
  const result = {
    values: {},
    displayValues: {},
    columnByTitle: {},
  };

  headers.forEach((header, index) => {
    result.values[header] = values[index];
    result.displayValues[header] = displayValues[index];
    result.columnByTitle[header] = index + 1;
  });

  return result;
}

function findResponseSheet_(spreadsheet) {
  const responseSheet = spreadsheet
    .getSheets()
    .find(
      (sheet) =>
        sheet.getName() !== RECRUIT_CONFIG.managementSheetName &&
        sheet.getName() !== RECRUIT_CONFIG.guideSheetName &&
        sheet.getLastColumn() > 0 &&
        sheet.getRange(1, 1).getDisplayValue() === "タイムスタンプ",
    );

  if (!responseSheet) {
    throw new Error("回答原本のシートを見つけられませんでした。");
  }

  return responseSheet;
}

function managementHasApplication_(sheet, applicationId) {
  if (sheet.getLastRow() < 2) {
    return false;
  }

  const idColumn = RECRUIT_CONFIG.managementHeaders.indexOf("応募者ID") + 1;
  return sheet
    .getRange(2, idColumn, sheet.getLastRow() - 1, 1)
    .getDisplayValues()
    .some(([value]) => value === applicationId);
}

function buildApplicationId_(timestamp, rowNumber) {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const datePart = Utilities.formatDate(safeDate, Session.getScriptTimeZone(), "yyyyMMdd-HHmmss");
  return `A-${datePart}-${String(rowNumber).padStart(4, "0")}`;
}

function createApplicantFolder_(rootFolder, applicationId, record) {
  const timestamp = record.values["タイムスタンプ"];
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const year = Utilities.formatDate(safeDate, Session.getScriptTimeZone(), "yyyy");
  const yearFolder = getOrCreateChildFolder_(rootFolder, year);
  const applicantName = sanitizeFileName_(record.displayValues["氏名"] || "氏名未入力");
  const role = sanitizeFileName_(record.displayValues["応募職種"] || "職種未入力");
  const folderName = `${applicationId}_${applicantName}_${role}`;

  return getOrCreateChildFolder_(yearFolder, folderName);
}

function getOrCreateChildFolder_(parent, name) {
  const folders = parent.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : parent.createFolder(name);
}

function moveUploadedFiles_(sheet, rowNumber, columnNumber, folder, label, applicantName) {
  if (!columnNumber) {
    return [];
  }

  const cell = sheet.getRange(rowNumber, columnNumber);
  const fileIds = extractDriveFileIds_(cell);
  const urls = [];

  fileIds.forEach((fileId, index) => {
    try {
      const file = DriveApp.getFileById(fileId);
      const originalName = file.getName();
      const dotIndex = originalName.lastIndexOf(".");
      const extension = dotIndex >= 0 ? originalName.slice(dotIndex) : "";
      const suffix = fileIds.length > 1 ? `_${index + 1}` : "";
      const newName = `${label}_${sanitizeFileName_(applicantName || "氏名未入力")}${suffix}${extension}`;

      file.setName(newName);
      file.moveTo(folder);
      urls.push(file.getUrl());
    } catch (error) {
      console.error(`${label}の移動に失敗しました (${fileId}): ${error.message}`);
    }
  });

  return urls;
}

function extractDriveFileIds_(cell) {
  const candidates = [String(cell.getValue() || ""), cell.getDisplayValue()];
  const richText = cell.getRichTextValue();

  if (richText) {
    if (richText.getLinkUrl()) {
      candidates.push(richText.getLinkUrl());
    }
    richText.getRuns().forEach((run) => {
      if (run.getLinkUrl()) {
        candidates.push(run.getLinkUrl());
      }
    });
  }

  const ids = [];
  candidates.forEach((candidate) => {
    const matches = candidate.match(/[-\w]{25,}/g) || [];
    matches.forEach((id) => {
      if (!ids.includes(id)) {
        ids.push(id);
      }
    });
  });

  return ids;
}

function sanitizeFileName_(value) {
  return String(value)
    .trim()
    .replace(/[\\/:*?"<>|#%{}[\]]/g, "_")
    .slice(0, 80);
}
