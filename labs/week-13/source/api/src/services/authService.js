import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { findUserByEmail } from './requestService.js';
import { verifyPassword } from '../utils/password.js';

/**
 * 🏫 TODO W13-LOGIN (CP50)
 *
 * login(email, password) → ถูกต้อง { token, user } · ผิด null
 *   ① findUserByEmail(email) — มีอยู่แล้วใน requestService
 *   ② ต้องเป็น role 'staff' และ verifyPassword ผ่าน
 *   ③ jwt.sign({ sub: String(user.id), name: user.name, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn })
 *   ⚠ ผิดเพราะ "ไม่มีอีเมล" หรือ "รหัสผ่านผิด" ต้องได้ผลเหมือนกัน (คืน null ทั้งคู่)
 *   ⚠ ห้ามใส่รหัสผ่านหรือ hash ลงใน payload — payload อ่านได้ทุกคน
 */
export function login(email, password) {
  const user = findUserByEmail(email);
  if (!user || user.role !== 'staff' || !verifyPassword(password, user.passwordHash)) {
    return null;            //← ไม่มีอีเมล · ไม่ใช่เจ้าหน้าที่ · รหัสผิด = ผลเดียวกัน
  }
  // payload อ่านได้ทุกคน (แค่ base64) — ใส่เฉพาะสิ่งที่ไม่ลับ ห้ามใส่รหัสผ่าน
  const payload = { sub: String(user.id), name: user.name, role: user.role };
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });   //← '2h'
  return { token, user: { id: user.id, name: user.name, role: user.role } };
}

/** ตรวจ token — ถูกต้องคืน payload · ปลอม/หมดอายุ โยน error (ใช้ jwt.verify) */
export function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}
