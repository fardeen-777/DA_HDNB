/* ============================================================
   tracker.js  ·  Google Sheets backend version
   Reads and writes progress via Apps Script Web App URL
   ============================================================ */

// ── IMPORTANT: Replace this with your deployed Apps Script URL ──
// After deploying your Apps Script, paste the Web App URL here:
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQa7tY9fJiMKPvDmluOlwxCUSQep2IACFcDJjhubFYrxVJG0wTqqSmtSb3OXtSBkOJ/exec";

// ── In-memory state cache ─────────────────────────────────────
let STATE = {};
let IS_ONLINE = true;

// ── Status indicator ──────────────────────────────────────────
function setStatus(msg, type) {
  const el = document.getElementById("sync-status");
  if (!el) return;
  el.textContent = msg;
  el.style.color = type === "ok"      ? "#155724"
                 : type === "saving"  ? "#0c5460"
                 : type === "error"   ? "#9b2c2c"
                 :                     "#856404";
}

// ── Load all data from Google Sheets ─────────────────────────
async function loadFromSheets() {
  setStatus("⟳ Loading your progress...", "saving");
  try {
    const res  = await fetch(`${SCRIPT_URL}?action=read`);
    const data = await res.json();
    STATE = data;
    setStatus("✓ Synced with Google Sheets", "ok");
    IS_ONLINE = true;
    return data;
  } catch (e) {
    setStatus("⚠ Offline — using local cache", "error");
    IS_ONLINE = false;
    // Fall back to localStorage
    try { STATE = JSON.parse(localStorage.getItem("hdnb_tracker_v1") || "{}"); } catch(_) { STATE = {}; }
    return STATE;
  }
}

// ── Save one row to Google Sheets ────────────────────────────
async function saveToSheets(key, moduleId, clsNum, attendance, assignment, quiz, note) {
  // Always update local cache immediately
  STATE[key] = { module: moduleId, cls: clsNum, attendance, assignment, quiz, note };
  localStorage.setItem("hdnb_tracker_v1", JSON.stringify(STATE));

  if (!IS_ONLINE || SCRIPT_URL === "PASTE_YOUR_APPS_SCRIPT_URL_HERE") {
    setStatus("⚠ Saved locally only (no Script URL set)", "error");
    return;
  }

  setStatus("⟳ Saving...", "saving");
  try {
    const url = `${SCRIPT_URL}?action=write`
      + `&key=${encodeURIComponent(key)}`
      + `&module=${encodeURIComponent(moduleId)}`
      + `&cls=${encodeURIComponent(clsNum)}`
      + `&attendance=${encodeURIComponent(attendance)}`
      + `&assignment=${encodeURIComponent(assignment)}`
      + `&quiz=${encodeURIComponent(quiz)}`
      + `&note=${encodeURIComponent(note || "")}`;
    await fetch(url);
    setStatus("✓ Saved to Google Sheets", "ok");
    IS_ONLINE = true;
  } catch (e) {
    setStatus("⚠ Save failed — stored locally", "error");
    IS_ONLINE = false;
  }
}

// ── Build tracker UI ──────────────────────────────────────────
function buildTracker() {
  const root = document.getElementById("tracker-root");
  if (!root) return;

  BOOTCAMP_DATA.modules.forEach(mod => {
    const block = document.createElement("div");
    block.className = "module-block";
    block.dataset.moduleId = mod.id;

    // heading
    block.innerHTML = `
      <div class="module-heading">
        <div class="module-color-bar" style="background:${mod.color}">${mod.id}</div>
        <div class="module-title-area">
          <div>
            <div class="module-title">${mod.title}</div>
            <div class="module-meta">${mod.weeks} · ${mod.classes.length} classes</div>
          </div>
          <div class="module-prog-wrap">
            <div class="progress-bar-outer"><div class="progress-bar-inner" style="width:0%"></div></div>
            <span class="module-pct">0%</span>
          </div>
        </div>
        <span class="chevron">▾</span>
      </div>
      <div class="class-rows"></div>`;

    const rowsWrap = block.querySelector(".class-rows");

    mod.classes.forEach(cls => {
      const key   = `${mod.id}_${cls.num.replace(/\s/g, "_")}`;
      const saved = STATE[key] || {};

      const att  = saved.attendance || "pending";
      const asgn = saved.assignment || "pending";
      const quiz = saved.quiz       || "pending";
      const note = saved.note       || "";

      const row = document.createElement("div");
      row.className = "class-row";
      row.dataset.key       = key;
      row.dataset.moduleId  = mod.id;
      row.dataset.clsNum    = cls.num;

      row.innerHTML = `
        <div class="cr-num">${cls.num.replace("Class ", "")}</div>
        <div class="cr-label">${cls.num}</div>
        <div class="cr-topic">
          ${cls.topic}
          <small>${cls.detail}</small>
          <button class="note-btn ${note ? "has-note" : ""}" data-key="${key}">${note ? "📝 Edit note" : "+ Add note"}</button>
        </div>
        <div class="cr-status">
          <span class="cr-status-label">Attendance</span>
          <select class="status-select ${att}" data-field="attendance" data-key="${key}">
            <option value="pending"  ${att==="pending"  ?"selected":""}>Pending</option>
            <option value="progress" ${att==="progress" ?"selected":""}>In Progress</option>
            <option value="done"     ${att==="done"     ?"selected":""}>Done</option>
          </select>
        </div>
        <div class="cr-status">
          <span class="cr-status-label">Assignment</span>
          <select class="status-select ${asgn}" data-field="assignment" data-key="${key}">
            <option value="pending"  ${asgn==="pending"  ?"selected":""}>Pending</option>
            <option value="progress" ${asgn==="progress" ?"selected":""}>In Progress</option>
            <option value="done"     ${asgn==="done"     ?"selected":""}>Done</option>
          </select>
        </div>
        <div class="cr-status">
          <span class="cr-status-label">Quiz / Test</span>
          <select class="status-select ${quiz}" data-field="quiz" data-key="${key}">
            <option value="pending"  ${quiz==="pending"  ?"selected":""}>Pending</option>
            <option value="progress" ${quiz==="progress" ?"selected":""}>In Progress</option>
            <option value="done"     ${quiz==="done"     ?"selected":""}>Done</option>
          </select>
        </div>`;

      rowsWrap.appendChild(row);
    });

    root.appendChild(block);
  });

  // ── Event delegation ─────────────────────────────────────
  root.addEventListener("change", async e => {
    if (!e.target.matches(".status-select")) return;
    const key   = e.target.dataset.key;
    const field = e.target.dataset.field;
    const val   = e.target.value;

    e.target.className = `status-select ${val}`;

    // Get all current values for this row
    const row  = e.target.closest(".class-row");
    const modId = row.dataset.moduleId;
    const clsNum = row.dataset.clsNum;
    const selects = row.querySelectorAll(".status-select");
    const att  = selects[0].value;
    const asgn = selects[1].value;
    const quiz = selects[2].value;
    const note = (STATE[key] || {}).note || "";

    await saveToSheets(key, modId, clsNum, att, asgn, quiz, note);
    updateSummary();
    updateModuleProgress();
  });

  root.addEventListener("click", async e => {
    // Toggle module collapse
    const heading = e.target.closest(".module-heading");
    if (heading && !e.target.matches(".note-btn, .status-select")) {
      const block = heading.closest(".module-block");
      block.classList.toggle("collapsed");
      block.querySelector(".class-rows").style.display =
        block.classList.contains("collapsed") ? "none" : "";
    }

    // Note button
    if (e.target.matches(".note-btn")) {
      const key  = e.target.dataset.key;
      const prev = (STATE[key] || {}).note || "";
      const note = prompt("Add a note for this class:", prev);
      if (note === null) return;

      const row    = e.target.closest(".class-row");
      const modId  = row.dataset.moduleId;
      const clsNum = row.dataset.clsNum;
      const sels   = row.querySelectorAll(".status-select");

      await saveToSheets(key, modId, clsNum, sels[0].value, sels[1].value, sels[2].value, note.trim());
      e.target.textContent = note.trim() ? "📝 Edit note" : "+ Add note";
      e.target.classList.toggle("has-note", !!note.trim());
    }
  });

  updateSummary();
  updateModuleProgress();
}

// ── Summary counts ────────────────────────────────────────────
function getCounts() {
  const totals = { done: 0, progress: 0, pending: 0, total: 0 };
  BOOTCAMP_DATA.modules.forEach(mod => {
    mod.classes.forEach(cls => {
      const key   = `${mod.id}_${cls.num.replace(/\s/g, "_")}`;
      const saved = STATE[key] || {};
      ["attendance", "assignment", "quiz"].forEach(f => {
        totals.total++;
        const v = saved[f] || "pending";
        if (v === "done")          totals.done++;
        else if (v === "progress") totals.progress++;
        else                       totals.pending++;
      });
    });
  });
  return totals;
}

function updateSummary() {
  const c   = getCounts();
  const pct = Math.round((c.done / c.total) * 100);
  const el  = id => document.getElementById(id);
  if (el("sum-done"))     el("sum-done").textContent     = c.done;
  if (el("sum-progress")) el("sum-progress").textContent = c.progress;
  if (el("sum-pending"))  el("sum-pending").textContent  = c.pending;
  if (el("sum-pct"))      el("sum-pct").textContent      = pct + "%";
  if (el("overall-bar"))  el("overall-bar").style.width  = pct + "%";
}

function updateModuleProgress() {
  BOOTCAMP_DATA.modules.forEach(mod => {
    let done = 0, total = 0;
    mod.classes.forEach(cls => {
      const key   = `${mod.id}_${cls.num.replace(/\s/g, "_")}`;
      const saved = STATE[key] || {};
      ["attendance", "assignment", "quiz"].forEach(f => {
        total++;
        if ((saved[f] || "pending") === "done") done++;
      });
    });
    const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
    const block = document.querySelector(`[data-module-id="${mod.id}"]`);
    if (!block) return;
    const bar = block.querySelector(".progress-bar-inner");
    const lbl = block.querySelector(".module-pct");
    if (bar) bar.style.width = pct + "%";
    if (lbl) lbl.textContent = pct + "%";
  });
}

// ── Reset ─────────────────────────────────────────────────────
async function resetTracker() {
  if (!confirm("Reset ALL progress in Google Sheets? This cannot be undone.")) return;
  STATE = {};
  localStorage.removeItem("hdnb_tracker_v1");
  if (SCRIPT_URL !== "PASTE_YOUR_APPS_SCRIPT_URL_HERE") {
    setStatus("⟳ Resetting...", "saving");
    try {
      await fetch(`${SCRIPT_URL}?action=reset`);
      setStatus("✓ Reset complete", "ok");
    } catch (e) {
      setStatus("⚠ Reset locally only", "error");
    }
  }
  location.reload();
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await loadFromSheets();
  buildTracker();
});
