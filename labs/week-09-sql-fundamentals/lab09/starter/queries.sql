-- ═══════════════════════════════════════════════════════════
-- queries.sql — คำสั่งค้นหาตอบโจทย์
-- 🏠 TODO W09-QUERY (CP22) · เขียนอย่างน้อย 8 ข้อ
--
-- เขียนคำสั่งจริงที่รันได้ ไม่ใช่เขียนบรรยาย
-- ทุกข้อต้องทดสอบแล้วว่าได้ผลลัพธ์ถูกต้อง
-- ═══════════════════════════════════════════════════════════

-- ① คำร้องทั้งหมด เรียงตามรหัส
SELECT * FROM requests ORDER BY id;

-- ② คำร้องที่ยังไม่ได้ดำเนินการ (status = 'pending')
SELECT id, location, details FROM requests
WHERE status = 'pending'
ORDER BY id;

-- ③ คำร้องเร่งด่วนที่ยังไม่เสร็จ — ใช้เงื่อนไข 2 ข้อพร้อมกัน
SELECT id, location, details, status FROM requests
WHERE priority = 'urgent' AND status != 'completed'
ORDER BY id;

-- ④ ค้นคำร้องจากคำบางส่วนในรายละเอียด  (คำใบ้: LIKE)
SELECT id, location, details, status FROM requests
WHERE details LIKE '%ไม่%'
ORDER BY id;

-- ⑤ คำร้องพร้อมชื่อผู้แจ้ง  ← ต้องใช้ JOIN เพราะชื่ออยู่คนละตาราง
SELECT r.id, u.name, r.status FROM requests r
JOIN users u ON u.id = r.requester_id
ORDER BY r.id;

-- ⑥ คำร้องเฉพาะของภาควิชาหนึ่ง  (JOIN + WHERE)
SELECT r.id, u.name, r.status FROM requests r
JOIN users u ON u.id = r.requester_id
WHERE u.department = 'วิศวกรรมซอฟต์แวร์'
ORDER BY r.id;

-- ⑦ รายชื่อผู้แจ้งที่ไม่ซ้ำกัน  (คำใบ้: DISTINCT)
SELECT DISTINCT name FROM users

-- ⑧ คำร้อง 3 รายการล่าสุด  (คำใบ้: ORDER BY + LIMIT)
SELECT id, location, details, status FROM requests
ORDER BY created_at DESC LIMIT 3;

-- ⭐ Challenge ─────────────────────────────────────────────
-- ⑨ นับจำนวนคำร้องแยกตามสถานะ  (GROUP BY + COUNT)
-- ⑩ ใครแจ้งคำร้องมากที่สุด  (คำใบ้: LEFT JOIN เพื่อให้คนที่ยังไม่เคยแจ้งติดมาด้วย)
-- ⑪ สร้าง INDEX ให้การค้นด้วย status เร็วขึ้น
