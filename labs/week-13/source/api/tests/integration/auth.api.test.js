import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { loadSeed } from '../../src/services/requestService.js';
import { STAFF, loginAsStaff, tokenFor } from '../helpers/auth.js';

/**
 * Week 13 — เข้าสู่ระบบและสิทธิ์
 * test 3 ข้อแรกให้มาแล้ว — จะ fail จนกว่าจะทำ CP50–CP51 เสร็จ (เขียน test ก่อน แล้วทำให้ผ่าน)
 */
const app = createApp();
beforeEach(async () => { await loadSeed(); });

describe('POST /api/auth/login', () => {
  test('อีเมลและรหัสผ่านถูก → 200 พร้อม token', async () => {
    const r = await request(app).post('/api/auth/login').send(STAFF);
    expect(r.status).toBe(200);
    expect(r.body.token.split('.')).toHaveLength(3);
  });
  test('รหัสผ่านผิด → 401', async () => {
    const r = await request(app).post('/api/auth/login').send({ ...STAFF, password: 'nope1234' });
    expect(r.status).toBe(401);
  });

  // 🏫 TODO W13-LOGIN (CP50): อีเมลที่ไม่มี ต้องได้ข้อความ error เดียวกับรหัสผ่านผิด
});

describe('สิทธิ์ของ PUT / DELETE', () => {   // มีอยู่แล้วใน starter — เติมต่อจาก test 'ไม่มี token → 401' ตรง TODO W13-AUTH
  const put = () => request(app).put('/api/requests/REQ-001').send({ status: 'completed' });

  test('token ที่เซ็นด้วย secret อื่น (ปลอม) → 401', async () => {
    const r = await put().set('Authorization', `Bearer ${tokenFor('staff', 'not-the-real-secret')}`);
    expect(r.status).toBe(401);
  });
  test('token ถูกต้องแต่ไม่ใช่เจ้าหน้าที่ → 403', async () => {
    const r = await put().set('Authorization', `Bearer ${tokenFor('requester')}`);
    expect(r.status).toBe(403);
  });
  test('เจ้าหน้าที่ → PUT 200 และ DELETE 204', async () => {
    const auth = `Bearer ${await loginAsStaff(app)}`;
    await put().set('Authorization', auth).expect(200);
    await request(app).delete('/api/requests/REQ-002').set('Authorization', auth).expect(204);
  });
  test('ส่งคำร้อง (POST) และดูรายการ (GET) ยังไม่ต้องเข้าสู่ระบบ', async () => {
    await request(app).get('/api/requests').expect(200);
    await request(app).post('/api/requests').send({
      requesterName: 'นักศึกษา ทั่วไป', requestType: 'แจ้งซ่อม', location: 'ห้อง 205',
      details: 'ไฟห้องเรียนดับสองดวง', priority: 'normal',
    }).expect(201);
  });

  // 🏫 TODO W13-AUTH (CP51): เพิ่ม
  //   - token ที่ไม่ใช่เจ้าหน้าที่ → 403      ใช้ tokenFor('requester')
  //   - token ปลอม (secret อื่น) → 401        ใช้ tokenFor('staff', 'not-the-real-secret')
  //   - เจ้าหน้าที่ → PUT 200 และ DELETE 204  ใช้ await loginAsStaff(app)
  //   ⚠ หลังผูก authenticate แล้ว test ของ PUT/DELETE ใน requests.api.test.js จะพัง (401)
  //     — นั่นคือสัญญาณว่า requirement เปลี่ยน: แก้ test ให้เข้าสู่ระบบก่อน
});
