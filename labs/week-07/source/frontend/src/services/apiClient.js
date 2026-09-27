/**
 * ตัวกลางสำหรับคุยกับ API — ที่เดียวที่เรียก fetch()
 * ทุกฟังก์ชันใน requestService จะเรียกผ่านตรงนี้
 */

/**
 * TODO W07-F1 (CP11) · อ่าน base URL จาก environment
 *   import.meta.env.VITE_API_BASE_URL  (มีค่าเริ่มต้นเผื่อไม่มี .env.local)
 *
 * ⚠ ตัวแปรของ Vite ต้องขึ้นต้นด้วย VITE_ เท่านั้น
 *   ถ้าตั้งชื่อว่า API_BASE_URL เฉย ๆ จะได้ undefined
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

/** error ที่รู้ว่ามาจาก API พร้อม status ที่ได้กลับมา — ให้มาแล้ว */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseError(response) {
  try {
    const body = await response.json();
    return body.error ?? `คำขอไม่สำเร็จ (${response.status})`;
  } catch {
    return `คำขอไม่สำเร็จ (${response.status})`;
  }
}

/**
 * TODO W07-F2 (CP11) · เรียก API แล้วคืนข้อมูลที่ parse แล้ว
 *
 * ต้องจัดการ 4 กรณี
 *   1. ต่อเซิร์ฟเวอร์ไม่ได้เลย (fetch โยน error) → ApiError status 0
 *      พร้อมข้อความที่บอกผู้ใช้ว่าให้ตรวจว่าเปิด API แล้วหรือยัง
 *   2. ตอบ 4xx/5xx → โยน ApiError(await parseError(response), response.status)
 *   3. ตอบ 204 → คืน null (ไม่มี body ให้ parse)
 *   4. ตอบ 2xx อื่น → คืน response.json()
 *
 * อย่าลืมส่ง header 'Content-Type': 'application/json'
 */
export async function apiFetch(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
  } catch {
    // ① ต่อเซิร์ฟเวอร์ไม่ได้เลย — fetch โยน error
    throw new ApiError('ติดต่อเซิร์ฟเวอร์ไม่ได้ — ตรวจว่าเปิด API ที่พอร์ต 3001 แล้วหรือยัง', 0);
  }

  if (!response.ok) {
    // ② เซิร์ฟเวอร์ตอบ แต่เป็น 4xx/5xx
    throw new ApiError(await parseError(response), response.status);
  }

  if (response.status === 204) return null;   // ③ DELETE สำเร็จ ไม่มี body
  return response.json();                     // ④ ปกติ
}
