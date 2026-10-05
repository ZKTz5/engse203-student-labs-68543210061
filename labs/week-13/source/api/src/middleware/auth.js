import { verifyToken } from '../services/authService.js';

/**
 * 🏫 TODO W13-AUTH (CP51) — ป้องกัน route ด้วย JWT
 *
 *   authenticate      → "คุณคือใคร"         ไม่มี token / token ปลอม / หมดอายุ  → 401
 *   requireRole(role) → "คุณทำสิ่งนี้ได้ไหม"  รู้ว่าเป็นใคร แต่ไม่มีสิทธิ์          → 403
 *
 * header ที่ส่งมา:  Authorization: Bearer <token>
 */
export function authenticate(req, res, next) {
  // TODO: อ่าน req.get('Authorization') → แยก 'Bearer' กับ token
  //       ไม่มี → 401 { error: 'ต้องเข้าสู่ระบบก่อน' }
  //       verifyToken(token) ผ่าน → req.user = payload แล้ว next()
  //       verifyToken โยน error → 401
  const header = req.get('Authorization') ?? '';
  const [scheme, token] = header.split(' ');               //← "Bearer eyJ…"
  if (scheme !== 'Bearer' || !token) {
    res.set('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ error: 'ต้องเข้าสู่ระบบก่อน' });
  }
  try {
    req.user = verifyToken(token);   // ผ่าน → แนบข้อมูลผู้ใช้ไว้ให้ middleware/controller ถัดไป
    next();
  } catch {
    res.set('WWW-Authenticate', 'Bearer error="invalid_token"');
    return res.status(401).json({ error: 'token ไม่ถูกต้องหรือหมดอายุ กรุณาเข้าสู่ระบบใหม่' });
  }
}


export function requireRole(role) {
  return (req, res, next) => {
    // TODO: req.user?.role ไม่ตรง role → 403 { error: 'ไม่มีสิทธิ์ทำรายการนี้' }
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'ไม่มีสิทธิ์ทำรายการนี้' });
    }
    next();
  };
}
