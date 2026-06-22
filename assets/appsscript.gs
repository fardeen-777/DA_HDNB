// ============================================================
// HDNB Bootcamp Tracker — Google Apps Script Backend
// Paste this entire file into your Apps Script editor
// ============================================================

const SHEET_ID   = "1kNvQb02wxtlqN79KItppgbIF8SowmmfZ0Wn5p8bQB-8";
const SHEET_NAME = "Sheet1";

// ── Entry point for all requests ─────────────────────────────
function doGet(e) {
  const action = e.parameter.action;

  if (action === "read") {
    return readAll();
  }

  if (action === "write") {
    return writeRow(
      e.parameter.key,
      e.parameter.module,
      e.parameter.cls,
      e.parameter.attendance,
      e.parameter.assignment,
      e.parameter.quiz,
      e.parameter.note || ""
    );
  }

  if (action === "reset") {
    return resetAll();
  }

  return json({ error: "Unknown action" });
}

// ── Read all rows → return as JSON object keyed by 'key' ─────
function readAll() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data  = sheet.getDataRange().getValues();
  const result = {};

  // Skip header row (row 0)
  for (let i = 1; i < data.length; i++) {
    const [key, module_, cls, attendance, assignment, quiz, note] = data[i];
    if (key) {
      result[key] = { module: module_, cls, attendance, assignment, quiz, note: note || "" };
    }
  }

  return json(result);
}

// ── Write or update a single row ─────────────────────────────
function writeRow(key, module_, cls, attendance, assignment, quiz, note) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data  = sheet.getDataRange().getValues();

  // Look for existing row with this key
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      // Update in place
      sheet.getRange(i + 1, 1, 1, 7).setValues([[key, module_, cls, attendance, assignment, quiz, note]]);
      return json({ status: "updated", key });
    }
  }

  // Not found — append new row
  sheet.appendRow([key, module_, cls, attendance, assignment, quiz, note]);
  return json({ status: "created", key });
}

// ── Reset: clear all data rows (keep header) ─────────────────
function resetAll() {
  const sheet    = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const lastRow  = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
  return json({ status: "reset" });
}

// ── Helper: return JSON with CORS headers ────────────────────
function json(data) {
  const output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}
