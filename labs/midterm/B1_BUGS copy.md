# B1 · บันทึกการแก้บั๊ก (กรอกให้ครบทั้ง 6 จุด)

> แต่ละบั๊กให้เขียน 4 อย่าง: ไฟล์ · บรรทัด · สาเหตุ (ทำไมทำงานผิด) · แก้อย่างไร
> เขียนด้วยคำของตัวเอง — จุดนี้จะถูกถามใน oral

## บั๊กที่ 1 — อาการ: Console เตือนสีเหลืองเรื่องรายการ
- ไฟล์/บรรทัด:/src/components/RequestList.jsx บรรทัดที่ 9
- สาเหตุ: มีการวนลูป .map() เรนเดอร์ <RequestCard/> แต่ไม่มี key ทำให้ React ระบุตัวตนของการ์ดแต่ละใบไม่ได้ จึงแจ้งเตือนใน Console
- แก้อย่างไร: เพิ่ม key={request.id} ให้ <RequestCard/> ในฟังก์ชัน .map() เพื่อให้ React ใช้ค่า ID ที่ไม่ซ้ำกันระบุตัวตนของแต่ละการ์ดได้อย่างถูกต้อง

## บั๊กที่ 2 — อาการ: ตัวเลข "รอดำเนินการ" ในแผงสรุปไม่ตรงกับที่เห็น
- ไฟล์/บรรทัด:/src/pages/DashboardPage.jsx บรรทัดที่ 47
- สาเหตุ: ใน const summary, pending มีการ filter ค่า status === 'completed' แทนที่จะเป็น 'pending'
- แก้อย่างไร: เปลี่ยนค่า status === 'completed' เป็น status === 'pending'

## บั๊กที่ 3 — อาการ: กดตัวกรอง "รอดำเนินการ" แล้วได้รายการที่ไม่ใช่
- ไฟล์/บรรทัด:/src/pages/DashboardPage.jsx บรรทัดที่ 55
- สาเหตุ:requests มี filter status !== statusFilter ทำให้เมื่อกดปุ่มฟิลเตอร์ จะแสดงการ์ดที่มีสถานะไม่เท่ากับที่กด เช่น กด"รอดำเนินการ" จะแสดงสถานะที่ไม่เท่ากับ pending
- แก้อย่างไร:แก้ไข filter เป็น status === statusFilter เพื่อให้แสดงการ์ดที่มีาถานะตรงกับที่กดเท่านั้น

## บั๊กที่ 4 — อาการ: เปลี่ยน URL จาก REQ-001 เป็น REQ-002 แล้วข้อมูลไม่เปลี่ยน
- ไฟล์/บรรทัด:/src/pages/RequestDetailPage.jsx บรรทัดที่ 28
- สาเหตุ:ที่หลัง useEffect มีแค่ [reloadKey] หากมีการเปลี่ยน URL requestId เปลี่ยนจริงแต่ React ไม่ได้เฝ้าดู โค้ดดึงข้อมูลจึงไม่ยอมทำงาน
- แก้อย่างไร:ใส่ requestId เพิ่มใน [reloadKey] ทีนี้หาก requestId เปลี่ยน โค้ดดึงข้อมูลจะทำงานใหม่ทันที

## บั๊กที่ 5 — อาการ: กด "ลบ" แล้วรายการยังอยู่ ต้องรีเฟรชถึงหาย
- ไฟล์/บรรทัด:/src/pages/DashboardPage.jsx บรรทัดที่ 65
- สาเหตุ:handleDelete ส่ง requests เข้าไปใน setRequests() แทนที่จะส่งข้อมูลชุดใหม่ ทำให้ React อัปเดตหน้าจอด้วยข้อมูลเก่า
- แก้อย่างไร:เปลี่ยนเป็น setRequests(nextRequests) เพื่อนำ Array ชุดใหม่ที่ผ่านการลบแล้วจาก deleteRequest() ไปอัปเดตลง State ทันที

## บั๊กที่ 6 — อาการ: กด "Reset Demo Data" แล้วหน้าพัง/ว่างเปล่า
- ไฟล์/บรรทัด:/src/pages/DashboardPage.jsx บรรทัดที่ 75,76
- สาเหตุ:resetRequests() เป็นฟังก์ชัน async แต่โค้ดที่เรียกใช้ไม่มี await ทำให้ส่ง Promise เข้าไปเก็บใน requests แทนที่จะเป็น Array
- แก้อย่างไร:ใส่ await ข้างหน้า resetRequests() const nextRequests = await resetRequests(); setRequests(nextRequests);
