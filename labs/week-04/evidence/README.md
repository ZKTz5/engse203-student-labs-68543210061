# Week 04 Evidence

- ผล TC-01–TC-12

| TestID | Scenario | Expected Result | Result |
| --- | --- | --- | --- |
| TC-01 | Initial render | initial requests/summary ถูกต้อง; console ไม่มี error | ![TC01](image/TC01.png) |
| TC-02 | Controlled input | ทุก field เปลี่ยนตาม state | ![TC02](image/TC02.png) |
| TC-03 | Invalid submit | ไม่เพิ่ม; error ใกล้ field | ![TC03](image/TC03.png) |
| TC-04 | Valid submit | เพิ่ม pending; summary เพิ่ม; reset form | ![TC04](image/TC04.png) |
| TC-05 | Filter status | เห็นเฉพาะสถานะที่เลือก | ![TC05](image/TC05.png) |
| TC-06 | Return all | เห็นทุกสถานะ | ![TC06](image/TC06.png) |
| TC-07 | Empty state | มีข้อความเมื่อไม่มีรายการ | ![TC07](image/image/TC07.png) |
| TC-08 | Delete | ลบถูก id; summary/list เปลี่ยน | ![TC08](image/TC08.png) |
| TC-09 | 375px | ไม่มี horizontal scroll | ![TC09](image/TC09.png) |
| TC-10 | Keyboard | focus/label/error/feedback ใช้งานได้ | ![TC10](image/TC10.png) |
| TC-11 | Build/preview | `npm run build` และ preview ผ่าน | ![TC11](image/TC11.png) |
| TC-12 | Pages | Incognito โหลดหน้า/assets ครบ | Pass |

- ภาพ desktop และ mobile 375px
    ![Desktop](image/Desktop.png)
    ![mobile](image/TC09.png)

- ภาพ validation, success/empty state
    ![valid](image/valid.png)
- Reflection: State ownership, Props และ callback

**State Ownership:** ตัวกลางที่เก็บข้อมูลจริงไว้จุดเดียว (อย่าง `App.jsx`) เพื่อไม่ให้ข้อมูลมั่วหรือขัดแย้งกัน
**Props:** การส่งข้อมูลจากแม่ลงไปให้ลูกเอาไปโชว์อย่างเดียว (ลูกมีหน้าที่แค่อ่าน ห้ามแก้เอง)
**Callback:** การส่งปุ่ม/สัญญาณจากแม่ไปให้ลูกไว้กดสั่งงาน เพื่อให้ลูกบอกแม่ได้ว่า "ช่วยแก้/ลบ ข้อมูลตรงนี้ให้หน่อย"

- PR URL และ Pages URL

