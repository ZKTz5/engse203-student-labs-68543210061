# API_TEST — LAB 06

**ชื่อ–รหัส:** กฤตภาส มงคลคลี **วันที่ทดสอบ:** 20/9/26

> บันทึก **ผลจริง** ที่เห็น ไม่ใช่ผลที่ควรได้ · ถ้าไม่ผ่านให้เขียนว่าไม่ผ่าน

| # | Method | Path | ส่งอะไร | status ที่ควรได้ | status ที่ได้จริง | ผ่าน |
|---|---|---|---|---|---|---|
| 1 | GET | `/` | — | 200 | 200 | ✓ |
| 2 | GET | `/api/requests` | — | 200 | 200 | ✓ |
| 3 | GET | `/api/requests/REQ-001` | — | 200 | 200 | ✓ |
| 4 | GET | `/api/requests/REQ-999` | — | 404 | 404 | ✓ |
| 5 | POST | `/api/requests` | ข้อมูลครบถูกต้อง | 201 | 201 | ✓ |
| 6 | POST | `/api/requests` | `{"requesterName":"x"}` | 400 | 400 | ✓ |
| 7 | DELETE | `/api/requests/REQ-003` | — | 204    b | 204 | ✓ |
| 8 | DELETE | `/api/requests/REQ-999` | — | 404 | 404 | ✓ |
| 9 | GET | `/api/unknown` | — | 404 | 404 | ✓ |

## ⭐ Challenge (ถ้าทำ)

| # | Method | Path | status ที่ควรได้ | ที่ได้จริง | ผ่าน |
|---|---|---|---|---|---|
| 10 | GET | `/api/requests?status=pending` | 200 (กรองแล้ว) | | ☐ |
| 11 | PUT | `/api/requests/REQ-001` + `{"status":"in-progress"}` | 200 | | ☐ |
| 12 | PUT | `/api/requests/REQ-001` + `{"status":"มั่ว"}` | 400 | | ☐ |

## ทดสอบว่าข้อมูลอยู่ถาวร (CP08)

| ขั้น | ทำอะไร | ผลที่เห็น |
|---|---|---|
| 1 | POST เพิ่มคำร้องใหม่ | ![POST](images/CP08/CP08-1.png) |
| 2 | GET ดูรายการ — เห็นคำร้องใหม่ไหม | ![GET1](images/CP08/CP08-2.png) |
| 3 | Ctrl+C ปิดเซิร์ฟเวอร์ แล้วเปิดใหม่ | ![ReRunServerr](images/CP08/CP08-3.png) |
| 4 | GET ดูรายการอีกครั้ง — คำร้องยังอยู่ไหม | ![GET2](images/CP08/CP08-4.png) |

## สรุปผล

- ผ่าน 9 / 9 (+ Challenge ______ / 3)
- รายการที่ไม่ผ่านและสาเหตุ:

## Screenshot ที่แนบ

- [ ✓ ] `images/postman-get-200.png`
- [ ✓ ] `images/postman-post-201.png`
- [ ✓ ] `images/terminal-logger.png`
