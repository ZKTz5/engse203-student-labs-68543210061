# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: กฤตภาส มงคลคลี
- รหัสนักศึกษา: 68543210061-6
- Section: 1

## URLs

- Repository: https://github.com/ZKTz5/engse203-lab03-68543210061-6
- Pull Request: https://github.com/ZKTz5/engse203-student-labs-68543210061/pull/5
- GitHub Pages: https://zktz5.github.io/engse203-student-labs-68543210061/labs/week-04/

## Component Tree

```text
App                                     [state: requests, statusFilter]
├── AppHeader                           [props: title, subtitle]
├── SummaryPanel                        [props: summary]
│   └── (map) summary card              [key: summary field name]
├── RequestForm                         [state: formData, errors, feedback]
│   └── (props received: onAddRequest)
└── section.panel (request list)
    ├── FilterBar                       [props: value, onFilterChange]
    └── RequestList                     [props: requests, onDeleteRequest]
        └── (map) RequestCard           [key: request.id]
                                        [props: request, onDeleteRequest]
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

* **State Ownership (เจ้าของข้อมูล):**
  * `App.jsx` เป็นเจ้าของ `requests` (รายการคำร้อง) และ `statusFilter` (สถานะการกรอง) เพื่อเป็นศูนย์กลางข้อมูลหลักเพียงจุดเดียว (Single Source of Truth)
  * `RequestForm.jsx` เป็นเจ้าของ `formData`, `errors` และ `feedback` เพื่อใช้จัดการข้อมูลชั่วคราวและการกรอกข้อมูลภายในฟอร์มเอง

* **Props Flow (การไหลของข้อมูลลงล่าง):**
  * `App.jsx` ส่ง `summary` ไปให้ `SummaryPanel` แสดงผลสรุป
  * `App.jsx` ส่ง `statusFilter` ไปให้ `FilterBar` แสดงสถานะปุ่มที่เลือกอยู่
  * `App.jsx` ส่ง `filteredRequests` (รายการที่ผ่านการกรอง) ลงไปให้ `RequestList` และส่งต่อให้ `RequestCard` แสดงผลข้อมูลแต่ละใบ

* **Callback Flow (การไหลของสัญญาณขึ้นบน):**
  * `RequestForm` เรียกใช้ `onAddRequest(formData)` ส่งข้อมูลคำร้องใหม่กลับขึ้นไปให้ `App` เพิ่มลงใน State
  * `FilterBar` เรียกใช้ `onFilterChange(status)` ส่งค่าสถานะที่กดเลือกรอบใหม่กลับขึ้นไปให้ `App` อัปเดตตัวกรอง
  * `RequestCard` เรียกใช้ `onDeleteRequest(id)` ส่ง ID รายการที่ต้องการลบ ผ่าน `RequestList` กลับขึ้นไปให้ `App` ลบข้อมูลออกจาก State

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | แสดงผล initial requests และ summary ถูกต้อง, ใน console ไม่มี error | Pass | ![TC01](/labs/week-04/evidence/image/TC01.png) |
| TC-02 Controlled input | ข้อมูลใน input ทุก field เปลี่ยนแปลงตาม state เมื่อพิมพ์ | Pass | ![TC02](/labs/week-04/evidence/image/TC02.png) |
| TC-03 Invalid | ฟอร์มไม่ถูกส่ง และแสดงข้อความ error ใกล้กับ field ที่กรอกไม่ถูกต้อง | Pass | ![TC03](/labs/week-04/evidence/image/TC03.png) |
| TC-04 Valid add | เพิ่มรายการคำร้องสถานะ pending สำเร็จ, summary อัปเดต และฟอร์มถูกรีเซ็ต | Pass | ![TC04](/labs/week-04/evidence/image/TC04.png) |
| TC-05 Filter | แสดงเฉพาะรายการคำร้องที่มีสถานะตรงตามที่เลือก | Pass | ![TC05](/labs/week-04/evidence/image/TC05.png) |
| TC-06 All | แสดงรายการคำร้องทั้งหมดทุกสถานะเมื่อเลือกฟิลเตอร์ทั้งหมด | Pass | ![TC06](/labs/week-04/evidence/image/TC06.png) |
| TC-07 Empty | แสดงข้อความแจ้งเตือนเมื่อไม่มีรายการคำร้องในระบบหรือฟิลเตอร์ที่เลือก | Pass | ![TC07](/labs/week-04/evidence/image/TC07.png) |
| TC-08 Delete | ลบรายการคำร้องตรงตาม ID ที่เลือก, รายการและ summary อัปเดตทันที | Pass | ![TC08](/labs/week-04/evidence/image/TC08.png) |
| TC-09 Mobile | แสดงผลบนหน้าจอขนาด 375px ได้ถูกต้อง และไม่มี horizontal scrollbar | Pass | ![TC09](/labs/week-04/evidence/image/TC09.png) |
| TC-10 Keyboard | สามารถใช้แป้นพิมพ์เข้าถึง focus, label, error และ feedback ได้สมบูรณ์ | Pass | ![TC10](/labs/week-04/evidence/image/TC10.png) |
| TC-11 Build | รันคำสั่ง `npm run build` และ `preview` ผ่านโดยไม่มีข้อผิดพลาด | Pass | ![TC11](/labs/week-04/evidence/image/TC11.png) |
| TC-12 Pages | หน้าเว็บและ assets ทั้งหมดโหลดได้ครบถ้วนเมื่อทดสอบบน Incognito mode | Pass | TODO |

## Screenshots

- Desktop: ![Desktop](/labs/week-04/evidence/image/Desktop.png)
- Mobile 375px: ![Mobile](/labs/week-04/evidence/image/TC09.png)
- Validation/empty state: ![Validation](/labs/week-04/evidence/image/valid.png)

## Week 03 → Week 04 Reflection

ในสัปดาห์ก่อนๆ หรือการเขียน JavaScript แบบดั้งเดิม การอัปเดตหน้าเว็บจะใช้ **DOM Mutation** คือการเข้าไปค้นหา Element แล้วสั่งแก้ไขเนื้อหาหรือ DOM โดยตรง (เช่น `element.innerHTML` หรือ `appendChild`) ซึ่งเสี่ยงต่อการเกิดบั๊ก ข้อมูลไม่ตรงกัน และสเกลโค้ดได้ยากเมื่อแอปใหญ่ขึ้น

ในสัปดาห์นี้เปลี่ยนมาใช้ **State-driven UI** ของ React ซึ่งเราไม่ต้องยุ่งกับ DOM โดยตรงเลย แต่เปลี่ยนมาดูแลเฉพาะ **State** ที่เป็นข้อมูลหลักเพียงอย่างเดียว เมื่อ State เปลี่ยนแปลง React จะทำหน้าที่คำนวณและอัปเดต DOM บนหน้าจอให้อย่างอัตโนมัติ ช่วยลดความซับซ้อนของโค้ด และทำให้ Data Flow มีความชัดเจนและคาดเดาผลลัพธ์ได้ง่ายขึ้น

## AI / External Resource Disclosure

* **เครื่องมือที่ใช้:** Gemini
* **เอกสารอ้าอิง:** [React Beginner Bridge](https://github.com/se-rmutl/engse203-lab/tree/main/labs/week-04-react-components-state/react-beginner-bridge)
* **เรื่องที่ใช้ AI ช่วยคิด/ช่วยแก้โค้ด:**
  * **ฟอร์มและการรันเลข ID:** ให้ช่วยเช็ค Logic ใน `RequestForm.jsx` เรื่องการรับค่า Input, การรันเลขรหัสคำร้องอัตโนมัติ (`REQ-001`, `REQ-002`), การล้างฟอร์มหลังกดส่ง และการใส่ `status: "pending"` ให้ครบ
  * **แต่ง CSS Focus และ Badge:** ให้แนะนำวิธีเขียน CSS ทำขอบไฮไลท์ตอนกด Tab (Focus State) และการทำสีป้ายสถานะ Status Badge (`pending`, `in-progress`, `completed`)
  * **จัด Layout และ Mobile:** ให้ช่วยดู CSS Grid/Flexbox จัดระเบียบหน้าเว็บ และการทำ Media Queries ให้จอ 375px ไม่พัง
  * **จัดโครงสร้าง README:** ให้ช่วยจัดรูปแบบ Markdown วาดแผนผัง Component Tree และเรียบเรียงเนื้อหา ให้เป็นระเบียบ อ่านง่าย

* **การเอาไปใช้จริงและการตรวจงาน:**
  * เอาโค้ดรันเลข REQ, Logic ฟอร์ม, สไตล์ CSS และโครงสร้าง README ไปใส่ในโปรเจกต์
  * ลองกดเพิ่มคำร้องเพื่อดูว่า ID รันจริงไหม ลองกด Tab เช็คขอบ Focus และย่อจอตรวจดู UI
  * รัน `npm run build` ผ่านเรียบร้อย ไม่มี Error ค้างใน Console

