# Pre-LAB 04 Reflection — CP07

ชื่อ–นามสกุล:  กฤตภาส มงคลคลี
รหัสนักศึกษา:  68543210061

### 1. State owner อยู่ที่ใดและเพราะอะไร

   คำตอบ:
   * **State owner:** อยู่ที่ Parent Component
   * **เพราะ:** เป็นจุดร่วมที่ส่งผ่านข้อมูลลงไปยัง Child Components ย่อยๆ ได้

### 2. Props ไหลลงและ event ไหลกลับตรงไหน

   คำตอบ: 
   * **Props ไหลลง:** จาก Parent ส่งลงไปยัง Child ผ่าน Attributes ของ Component

   * **Event ไหลกลับ:** จาก Child ส่งกลับขึ้นไปยัง Parent โดยการเรียกใช้
Callback Function ที่ Parent ส่งมาให้ผ่าน Props

### 3. LAB 4 ต้องเปลี่ยน data contract และ validation อย่างไร

   คำตอบ:
   * **Data Contract:** ปรับเปลี่ยนโครงสร้าง State/Object ให้รองรับข้อมูลชุดใหม่ตามโจทย์ (เช่น เพิ่ม field ID, Status หรือแปลงชนิดข้อมูลให้ตรงตาม API Spec)
   * **Validation:** ย้ายหรือเพิ่มเงื่อนไขตรวจสอบความถูกต้อง (Input Validation) ในส่วนของ State Handler หรือ Form Submit ก่อนที่จะทำการอัปเดต State หรือส่งข้อมูลไปยัง Backend

