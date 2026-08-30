# ENGSE203 LAB05 — AI / Resource Usage

| Tool / Resource | Purpose | Used portion | How I verified | My final decision |
|---|---|---|---|---|
| Gemini | ช่วยตรวจสอบและแนะนำการเขียน Cleanup Guard ใน useEffect และการตั้งค่า Schema Validation | โครงสร้าง Cleanup Guard ใน DashboardPage, RequestDetailPage และเงื่อนไขการตรวจจับ Schema ใน requestStorage.js | รัน npm run check (ผ่าน 136/136), ทดสอบ Slow 4G สลับหน้าตรวจ Stale Update และทดสอบ Recovery ด้วยค่า JSON เสียหายใน Local Storage | ปรับแก้ syntax และ callback logic ให้ตรงกับโค้ดจริงในโปรเจกต์ นำมาใช้งานตามแนวทางที่แนะนำ |

คำรับรอง:

- [ ] ไม่ส่ง token, password, secret หรือข้อมูลส่วนบุคคลจริงให้เครื่องมือ
- [ ] ตรวจ source และรัน test ด้วยตนเอง
- [ ] อธิบาย Route, Effect, Service Layer และ persistence ของ final code ได้
