import "./style.css";

const form = document.querySelector("#request-form");

// TODO 1: query preview/status/list/stats elements
const status = document.querySelector("#form-status");
const goalCount = document.querySelector("#goal-count");
const requestList = document.querySelector("#request-list");
const totalCountEl = document.querySelector("#total-count");
const pendingCountEl = document.querySelector("#pending-count");
const approvedCountEl = document.querySelector("#approved-count");

// กำหนดค่าเริ่มต้นเป็น 0 ทั้งหมดตามต้องการ
let totalRequests = 0;
let pendingRequests = 0;
let approvedRequests = 0;

// แสดงผลค่าเริ่มต้น 0 ออกไปบนหน้าจอทันทีที่เปิดเว็บ
totalCountEl.textContent = totalRequests;
pendingCountEl.textContent = pendingRequests;
approvedCountEl.textContent = approvedRequests;

const preview = {
  requesterName: document.querySelector("#preview-name"),
  requestType: document.querySelector("#preview-type"),
  requestDetails: document.querySelector("#preview-details"),
};

// TODO 2: readForm()
function readForm() {
  return Object.fromEntries(new FormData(form).entries());
}

// TODO 3: renderPreview(data)
function renderPreview(data) {
  preview.requesterName.textContent =
    data.requesterName?.trim() || "ยังไม่ระบุชื่อ";
  preview.requestType.textContent = data.requestType || "ยังไม่เลือกประเภท";
  preview.requestDetails.textContent =
    data.requestDetails?.trim() || "ยังไม่มีรายละเอียด";
  goalCount.textContent = `${data.requestDetails?.length || 0} ตัวอักษร`;
}

// TODO 4: validate(data)
function validate(data) {
  const errors = {};

  if (data.requesterName?.trim().length < 2) {
    errors.requesterName = "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร";
  }

  if (!data.requestType) {
    errors.requestType = "กรุณาเลือกประเภทการแจ้ง";
  }

  if (data.requestDetails?.trim().length < 10) {
    errors.requestDetails = "กรุณาเขียนรายละเอียดอย่างน้อย 10 ตัวอักษร";
  }

  return errors;
}

// TODO 5: renderErrors(errors)
function renderErrors(errors) {
  for (const name of ["requesterName", "requestType", "requestDetails"]) {
    const field = form.elements[name];
    const output = document.querySelector(`#${name}-error`);
    const message = errors[name] ?? "";

    if (output) output.textContent = message;
    if (field) field.setAttribute("aria-invalid", String(Boolean(message)));
  }
}

function renderStatus(state, message) {
  status.dataset.state = state;
  status.textContent = message;
}

// ฟังก์ชันสร้าง Node และเพิ่มรายการเข้า Submitted Requests[cite: 1]
function addRequest(data) {
  const item = document.createElement("li");
  const title = document.createElement("strong");
  const details = document.createElement("span");

  title.textContent = `${data.requesterName} • ${data.requestType}`;
  details.textContent = data.requestDetails;

  item.append(title, details);
  requestList.prepend(item); // แทรกรายการใหม่ไว้ด้านบนสุด[cite: 1]
}

// TODO 6: input and submit listeners
form.addEventListener("input", () => {
  const data = readForm();
  renderPreview(data);
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // ป้องกัน Form Reload หน้าจอ[cite: 1]

  const data = readForm();
  const errors = validate(data);
  renderErrors(errors);

  // ถ้ามี error ให้หยุดทำงานและย้าย focus ไปช่องแรกที่มีปัญหา
  if (Object.keys(errors).length > 0) {
    renderStatus("invalid", "ยังบันทึกไม่ได้ กรุณาตรวจสอบข้อมูล");
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  // เพิ่มค่า Total และ Pending อย่างละ 1 (Approved เท่าเดิมคือ 0)
  totalRequests += 1;
  pendingRequests += 1;

  // อัปเดตตัวเลขออกหน้าจอ
  totalCountEl.textContent = totalRequests;
  pendingCountEl.textContent = pendingRequests;
  approvedCountEl.textContent = approvedRequests;

  // เพิ่มรายการเข้าลิสต์ Submitted Requests[cite: 1]
  addRequest(data);

  // แสดงสถานะสำเร็จ
  renderStatus("success", `บันทึกคำขอของ ${data.requesterName} เรียบร้อยแล้ว!`);

  // ล้างค่าฟอร์มและเคลียร์ Error
  form.reset();
  renderErrors({}); // เคลียร์ข้อความ error และสถานะขอบแดง
  renderPreview(readForm()); // รีเซ็ต Live Preview
});

console.log("LAB 3 starter ready", form);