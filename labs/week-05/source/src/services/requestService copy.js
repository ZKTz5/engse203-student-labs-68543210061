/**
 * requestService.js — ชั้นเข้าถึงข้อมูล
 *
 * กติกาที่ checker ตรวจจริง:
 *   - fetch() ต้องอยู่ในไฟล์นี้เท่านั้น
 *   - หน้าและ component เรียกเฉพาะฟังก์ชันที่ export จากไฟล์นี้
 *
 * TODO ในไฟล์นี้แบ่งเป็น 2 ระยะ
 *   5A-x  ทำในคาบแรก  (อ่านข้อมูล)
 *   5B-x  ทำในคาบสอง  (เขียนข้อมูล)
 * ทำเฉพาะ TODO ของคาบปัจจุบัน อย่าข้ามไปทำของคาบหน้า
 */

// TODO 5B-1: เปิดใช้บรรทัดล่างนี้เมื่อถึงคาบ 5B
// import { clearStoredRequests, readStoredRequests, writeStoredRequests } from './requestStorage.js';

const LAB_DELAY_MS = 420;

/* ─────────── ให้มาแล้ว ไม่ต้องแก้ ─────────── */

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * หน่วงเวลาเล็กน้อยเพื่อให้เห็น loading state ชัดเจน
 * ตัวแปร __ENGSE203_SKIP_DELAY__ เป็นสวิตช์ให้ checker ปิดการหน่วงตอนทดสอบ
 * ไม่ใช่ส่วนหนึ่งของงานที่ต้องทำ
 */
async function waitForLabDelay() {
  await delay(globalThis.__ENGSE203_SKIP_DELAY__ ? 0 : LAB_DELAY_MS);
}

/* ─────────── คาบ 5A ─────────── */

// TODO 5A-1 → เขียนตัวฟังก์ชันแทนบรรทัด throw
async function fetchSeedRequests() {
  const baseUrl = import.meta.env?.BASE_URL ?? '/';

  console.log ('fetchSeedRequests() from =', baseUrl);

  const response = await fetch(`${baseUrl}data/initialRequests.json`);
  if (!response.ok) throw new Error('ไม่สามารถโหลดข้อมูลตัวอย่างได้');
  return structuredClone(await response.json());
}

/**
 * TODO 5A-2 · ทำให้ getRequests() คืนข้อมูลได้
 *
 * ตอนนี้ให้คืนผลจาก fetchSeedRequests() ตรง ๆ
 * (คาบหน้าเราจะเปลี่ยนบรรทัดนี้เพียงบรรทัดเดียว)
 *
 * ส่วน scenario error และ empty เขียนไว้ให้แล้ว ใช้ทดสอบ UI
 */
export async function getRequests(options = {}) {
  await waitForLabDelay();

  if (options.scenario === 'error') {
    throw new Error('LAB scenario: จำลองการโหลดข้อมูลไม่สำเร็จ');
  }
  if (options.scenario === 'empty') {
    return [];
  }

  // TODO 5A-2: return fetchSeedRequests();
  // TODO 5B-3: เปลี่ยนบรรทัดข้างบนเป็น return loadNormalRequests(options.onRecovery);
  
  //throw new Error('TODO 5A-2: getRequests normal flow');
  return fetchSeedRequests();
}


/**
 * TODO 5A-3 · หาคำร้องใบเดียวตามรหัส
 *
 * เรียก getRequests() แล้วค้นหาด้วย .find()
 * ถ้าไม่พบ ให้คืน null — ห้าม throw
 * เพราะ "หาไม่เจอ" ไม่ใช่ความผิดพลาดของระบบ
 */
export async function getRequestById(requestId) {
  void requestId;
  throw new Error('TODO 5A-3: getRequestById');
}

/* ─────────── คาบ 5B ─────────── */

/**
 * TODO 5B-2 · อ่านจากที่เก็บก่อน ถ้าไม่มีค่อยอ่านไฟล์
 *
 * ลำดับที่ต้องทำ
 *   1. เรียก readStoredRequests()
 *   2. ถ้า status เป็น 'valid' คืนข้อมูลนั้นได้เลย
 *   3. ถ้าไม่ ให้ fetchSeedRequests() แล้ว writeStoredRequests() เก็บไว้
 *   4. ถ้า status เป็น 'invalid' ให้เรียก onRecovery?.(ข้อความ) เพื่อให้หน้าจอแจ้งผู้ใช้
 *   5. คืนข้อมูล seed
 */
// async function loadNormalRequests(onRecovery) {
//   throw new Error('TODO 5B-2: loadNormalRequests');
// }

/**
 * TODO 5B-4 · เพิ่มคำร้องใหม่
 *
 *   1. ตรวจข้อมูลก่อนใช้งาน — ระวังกรณี field เป็น undefined
 *      อย่าใช้ input.name?.trim().length < 2 เพราะ undefined < 2 ได้ false เงียบ ๆ
 *   2. สร้างรหัสที่ขึ้นต้นด้วย REQ- และไม่ซ้ำกับที่มีอยู่
 *   3. ตัดช่องว่างหัวท้ายทุก field ที่เป็นข้อความ
 *   4. status เริ่มต้นเป็น 'pending' เสมอ
 *   5. persist แล้วคืน object ใหม่
 */
export async function addRequest(requestInput) {
  void requestInput;
  throw new Error('TODO 5B-4: addRequest');
}

/**
 * TODO 5B-5 · ลบคำร้องตามรหัส
 * ใช้ .filter() สร้าง array ใหม่ อย่าแก้ array เดิม แล้ว persist
 */
export async function deleteRequest(requestId) {
  void requestId;
  throw new Error('TODO 5B-5: deleteRequest');
}

/**
 * TODO 5B-6 · คืนค่าข้อมูลตัวอย่างเริ่มต้น
 * ล้างคีย์ของ LAB05 แล้วโหลด seed ใหม่ทับ
 */
export async function resetRequests() {
  throw new Error('TODO 5B-6: resetRequests');
}
