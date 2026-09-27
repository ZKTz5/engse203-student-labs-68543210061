import { test, before, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => {
  await loadSeed();
  app = createApp();
});

const validRequest = {
  requesterName: 'ทดสอบ ระบบ',
  requestType: 'แจ้งซ่อม',
  location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง',
  priority: 'normal',
};

/**
 * TODO W07-TEST (🏠 CP16) · เขียน test อย่างน้อย 6 เคส
 *
 * ที่ต้องมี
 *   1. GET /api/requests            → 200 และได้ array
 *   2. GET /api/requests/:id พบ      → 200
 *   3. GET /api/requests/:id ไม่พบ   → 404
 *   4. POST ข้อมูลถูกต้อง            → 201 และ status เป็น pending
 *   5. POST ข้อมูลไม่ครบ             → 400
 *   6. CORS header ตอบ origin ที่อนุญาต
 *
 * รันด้วย: npm test
 * ตัวอย่างโครง (ลบคอมเมนต์นี้แล้วเขียนจริง)
 */

describe('API Tests', () => {
test('GET /api/requests คืนรายการทั้งหมด พร้อม status 200', async () => {
const res = await request(app).get('/api/requests');

assert.equal(res.status, 200);
assert.ok(Array.isArray(res.body));
});

test('GET /api/requests/:id ที่มีอยู่ คืนข้อมูลพร้อม status 200', async () => {
const res = await request(app).get('/api/requests/REQ-001');

assert.equal(res.status, 200);
assert.equal(res.body.id, 'REQ-001');
});

test('GET /api/requests/:id ที่ไม่มีอยู่ ตอบ 404', async () => {
const res = await request(app).get('/api/requests/REQ-999');

assert.equal(res.status, 404);
});

test('POST ข้อมูลถูกต้อง สร้างคำร้องใหม่และตั้ง status เป็น pending', async () => {
const res = await request(app)
.post('/api/requests')
.send(validRequest);

assert.equal(res.status, 201);
assert.equal(res.body.status, 'pending');
});

test('POST ข้อมูลไม่ครบ ตอบ 400', async () => {
const res = await request(app)
.post('/api/requests')
.send({
requesterName: '',
requestType: 'แจ้งซ่อม',
});

assert.equal(res.status, 400);
});

test('CORS header ตอบ origin ที่อนุญาต', async () => {
const res = await request(app)
.get('/api/requests')
.set('Origin', 'http://localhost:5173');

assert.equal(
res.headers['access-control-allow-origin'],
'http://localhost:5173'
);
});
});