import { apiFetch, ApiError } from './apiClient.js';

/**
 * Week 07 — เปลี่ยนจากอ่าน localStorage เป็นเรียก API จริง
 *
 * ⚠ กฎสำคัญ: signature ของทุกฟังก์ชันต้องเหมือนเดิมทุกตัว
 *   → DashboardPage, RequestDetailPage, NewRequestPage จะได้ไม่ต้องแก้เลย
 *   นี่คือประโยชน์ของ Service Layer ที่สร้างไว้ตั้งแต่ Week 05
 */

export { ApiError };

/**
 * TODO W07-F3 (CP11) · GET /api/requests
 * - คง scenario 'error' และ 'empty' ไว้เหมือนเดิม (ใช้ทดสอบสถานะหน้าจอ)
 * - ถ้ามี options.status ให้ต่อ query string ?status=...
 *   ใช้ encodeURIComponent() ป้องกันอักขระพิเศษ
 */
export async function getRequests(options = {}) {
  const res = await fetch('http://localhost:3001/api/requests');
  return res.json();
}

/**
 * TODO W07-F4 (CP11) · GET /api/requests/:id
 * ⚠ ถ้า API ตอบ 404 ให้คืน null ไม่ใช่โยน error
 *   เพราะ "ไม่พบคำร้อง" ไม่ใช่ความผิดพลาดของระบบ — หน้าจอจัดการเองได้
 *   คำใบ้: จับด้วย try/catch แล้วเช็ค error.status === 404
 */
export async function getRequestById(requestId) {
  try {
    return await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`);
  } catch (error) {
    // 404 ไม่ใช่ความผิดพลาดของระบบ — แปลว่าไม่มีคำร้องรหัสนี้
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;   // error อื่นปล่อยผ่านไปให้หน้าจอจัดการ
  }
}

/**
 * TODO W07-F5 (CP11) · POST /api/requests
 * - ไม่ต้อง validate ฝั่งนี้แล้ว เพราะ API ตรวจให้ และคืน 400 พร้อมข้อความ
 * - ส่ง body ด้วย JSON.stringify(requestInput)
 */
export async function addRequest(requestInput) {
  return apiFetch('/api/requests', { method: 'POST', body: JSON.stringify(requestInput) });
}

/**
 * TODO W07-F6 (🏠 CP13) · PUT /api/requests/:id เปลี่ยนสถานะ
 * body: { status }
 */
export async function updateRequestStatus(requestId, status) {
  throw new Error('TODO W07-F6: updateRequestStatus');
}

/**
 * TODO W07-F7 (CP11) · DELETE /api/requests/:id
 * - ลบเสร็จแล้วคืน "รายการล่าสุดจากเซิร์ฟเวอร์" (เรียก getRequests() ต่อ)
 *   เพื่อให้หน้าจอตรงกับข้อมูลจริงเสมอ ไม่ใช่เดาเอาเองว่าเหลืออะไร
 */
export async function deleteRequest(requestId) {
  await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`, { method: 'DELETE' });
  // คืนรายการล่าสุดจากเซิร์ฟเวอร์ เพื่อให้หน้าจอตรงกับข้อมูลจริงเสมอ
  return getRequests();
}

/** Week 07 ยังไม่มี endpoint reset — โหลดรายการปัจจุบันกลับมาแทน */
export async function resetRequests() {
  return getRequests();
}
