import { readFile, writeFile } from 'node:fs/promises';

const SEED_PATH = new URL('../../data/initialRequests.json', import.meta.url);
const DATA_PATH = new URL('../../data/requests.json', import.meta.url);

async function persist() {
  await writeFile(DATA_PATH, JSON.stringify(requests, null, 2), 'utf8');
}

/** ข้อมูลอยู่ในหน่วยความจำของเซิร์ฟเวอร์ — หน่วย 4 จะเปลี่ยนเป็นฐานข้อมูล */
let requests = [];

/** โหลดข้อมูลตัวอย่างตอนเซิร์ฟเวอร์เริ่มทำงาน — ให้มาแล้ว ไม่ต้องแก้ */
export async function loadSeed() {
  try {
    const raw = await readFile(DATA_PATH, 'utf8');
    requests = JSON.parse(raw);
  } catch {
    const raw = await readFile(SEED_PATH, 'utf8');
    requests = JSON.parse(raw);
    await persist();
  }
  return requests;
}

/**
 * TODO W06-S1 (CP02) · คืนรายการคำร้องทั้งหมด
 * - คืนสำเนาด้วย structuredClone() เพื่อไม่ให้ข้างนอกแก้ข้อมูลต้นฉบับ
 * TODO W06-S1b (⭐ Challenge) · ถ้ามี options.status ให้กรองเฉพาะสถานะนั้น
 */
export function findAll({ status } = {}) {
  if (!status) return structuredClone(requests);
  return structuredClone(requests.filter((r) => r.status === status));
}

/**
 * TODO W06-S2 (CP02) · คืนคำร้องใบเดียวตามรหัส
 * - ถ้าไม่พบให้คืน null (ห้าม throw — controller จะเป็นคนตัดสินว่าตอบ 404)
 */
export function findById(id) {
  if (id) return structuredClone(requests.find((r) => r.id === id)) || null;
  return null;
}

/** สร้างรหัสไม่ซ้ำ — ให้มาแล้ว ไม่ต้องแก้ */
function createId() {
  let id;
  do {
    const time = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    id = `REQ-${time}-${rand}`;
  } while (requests.some((r) => r.id === id));
  return id;
}

/**
 * TODO W06-S3 (CP04) · เพิ่มคำร้องใหม่
 * ลำดับ: สร้าง object ใหม่ (ใช้ createId()) → ตัดช่องว่างหัวท้ายทุก field ที่เป็นข้อความ
 *        → status เริ่มต้นเป็น 'pending' เสมอ → push เข้า requests → คืนสำเนา
 */
export async function create(input) {
  const newRequest = {
    id: createId(),
    requesterName: input.requesterName.trim(),
    requestType: input.requestType,
    location: input.location.trim(),
    details: input.details.trim(),
    priority: input.priority,
    status: 'pending',     // เริ่มต้นเป็น pending เสมอ
  };
  requests.push(newRequest);
  await persist();
  return structuredClone(newRequest);
}

/**
 * TODO W06-S4 (⭐ Challenge) · เปลี่ยนสถานะคำร้อง
 * - ไม่พบคืน null · พบแล้วเปลี่ยน status และคืนสำเนา
 */
export function updateStatus(id, status) {
  throw new Error('TODO W06-S4: updateStatus');
}

/**
 * TODO W06-S5 (CP05) · ลบคำร้องตามรหัส
 * - คืน true ถ้าลบได้จริง · คืน false ถ้าไม่พบรหัสนั้น
 * - ใช้ .filter() สร้าง array ใหม่ อย่าแก้ array เดิม
 */
export async function remove(id) {
  const before = requests.length;
  requests = requests.filter((r) => r.id !== id);
  const deleted = requests.length < before;
  if (deleted) {
    await persist();
  }
  return deleted;
}
