/**
 * requestStorage.js — ที่เดียวที่แตะ localStorage ได้
 *
 * ไฟล์นี้ทั้งไฟล์เป็นงานของ **คาบ 5B** คาบแรกยังไม่ต้องแตะ
 * ส่วน validateRequests() และค่าคงที่ด้านล่างเตรียมไว้ให้แล้ว
 */

export const STORAGE_KEY = 'engse203-campus-requests-v1';
export const SCHEMA_VERSION = 1;

const priorities = new Set(['normal', 'urgent']);
const statuses = new Set(['pending', 'in-progress', 'completed']);

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidRequest(request) {
  return Boolean(
    request
      && isNonEmptyString(request.id)
      && request.id.startsWith('REQ-')
      && typeof request.requesterName === 'string'
      && request.requesterName.trim().length >= 2
      && isNonEmptyString(request.requestType)
      && isNonEmptyString(request.location)
      && typeof request.details === 'string'
      && request.details.trim().length >= 10
      && priorities.has(request.priority)
      && statuses.has(request.status),
  );
}

function validateRequests(requests) {
  if (!Array.isArray(requests) || !requests.every(isValidRequest)) return false;
  return new Set(requests.map((request) => request.id)).size === requests.length;
}

/**
 * TODO 5B-A · อ่านข้อมูลที่เก็บไว้ พร้อมรับมือกับข้อมูลที่เสียหาย
 *
 * ต้องคืน object ที่มี status เป็นหนึ่งใน 3 ค่า
 *   { status: 'missing' }                        ยังไม่เคยเก็บ
 *   { status: 'valid', requests: [...] }         ข้อมูลถูกต้อง
 *   { status: 'invalid', reason: '...' }         ข้อมูลเสียหาย
 *
 * ลำดับที่ต้องทำ
 *   1. getItem แล้วถ้าได้ null ให้คืน missing
 *   2. JSON.parse ใน try/catch — parse ไม่ได้คือ invalid
 *   3. parse ได้แล้วยังต้องตรวจต่อ ว่า schemaVersion ตรงและ requests ผ่าน validateRequests
 *   4. คืนสำเนาด้วย structuredClone()
 *
 * ห้าม throw ออกไปจากฟังก์ชันนี้ เพราะจะทำให้หน้าจอพังทั้งหน้า
 */
export function readStoredRequests() {
  const rawValue = localStorage.getItem(STORAGE_KEY);
  if (rawValue === null) return { status: 'missing' };

  try {
    const envelope = JSON.parse(rawValue);
    // TODO 5B-A2: ตรวจ schemaVersion และ validateRequests ให้ครบใน CP04b
    // 1. ตรวจว่า envelope เป็น object ไหม
    // 2. ตรวจ schemaVersion ว่าตรงกับ SCHEMA_VERSION ไหม
    // 3. ตรวจว่า requests ผ่าน validateRequests() หรือไม่ (ดักทั้ง field ผิด และ ID ซ้ำ)
    if (
      !envelope
      || typeof envelope !== 'object'
      || envelope.schemaVersion !== SCHEMA_VERSION
      || !validateRequests(envelope.requests)
    ) {
      return { status: 'invalid', reason: 'โครงสร้างข้อมูลไม่ถูกต้องหรือไม่ตรงกับ schema version' };
    }
    
    return { status: 'valid', requests: structuredClone(envelope.requests) };
  } catch {
    return { status: 'invalid', reason: 'ข้อมูลที่บันทึกไว้ไม่ใช่ JSON ที่อ่านได้' };
  }
}
//throw new Error('TODO 5B-A: readStoredRequests');

/**
 * TODO 5B-B · เขียนข้อมูลลงที่เก็บ
 *
 *   1. ตรวจด้วย validateRequests() ก่อน ถ้าไม่ผ่านให้ throw
 *      (ที่นี่ throw ได้ เพราะเป็นความผิดพลาดของโปรแกรมเราเอง ไม่ใช่ข้อมูลจากภายนอก)
 *   2. เขียน envelope ที่มี schemaVersion, updatedAt และ requests
 *   3. อย่าลืมว่าที่เก็บรับได้แต่ข้อความ
 */
export function writeStoredRequests(requests) {

  if (!validateRequests(requests)) {
    throw new Error('ไม่สามารถบันทึกข้อมูลคำร้องที่ไม่ตรง schema ได้');
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    schemaVersion: SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    requests: structuredClone(requests),
  }));

  //throw new Error('TODO 5B-B: writeStoredRequests');
}

/**
 * ให้มาแล้ว — สังเกตว่าใช้ removeItem ไม่ใช่ clear()
 * เพราะ clear() จะลบข้อมูลของทุกเว็บที่ใช้โดเมนเดียวกัน
 */
export function clearStoredRequests() {
  localStorage.removeItem(STORAGE_KEY);
}
