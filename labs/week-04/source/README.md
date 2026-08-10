# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: กฤตภาส มงคลคลี
- รหัสนักศึกษา: 68543210061-6
- Section: 1

## URLs

- Repository: https://github.com/ZKTz5/engse203-lab03-68543210061-6
- Pull Request: TODO
- GitHub Pages: TODO

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

TODO: อธิบายว่าใคร owns requests/filter/form state, props ไหลลงตรงไหน และ callback ไหลกลับตรงไหน

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | TODO | TODO | ![TC01](/labs/week-04/evidence/TC01.png) |
| TC-02 Controlled input | TODO | TODO | ![TC02](/labs/week-04/evidence//TC02.png) |
| TC-03 Invalid | TODO | TODO | ![TC03](/labs/week-04/evidence//TC03.png) |
| TC-04 Valid add | TODO | TODO | ![TC04](/labs/week-04/evidence//TC04.png) |
| TC-05 Filter | TODO | TODO | ![TC05](/labs/week-04/evidence//TC05.png) |
| TC-06 All | TODO | TODO | ![TC06](/labs/week-04/evidence//TC06.png) |
| TC-07 Empty | TODO | TODO | ![TC07](/labs/week-04/evidence//TC07.png) |
| TC-08 Delete | TODO | TODO | ![TC08](/labs/week-04/evidence//TC08.png) |
| TC-09 Mobile | TODO | TODO | ![TC09](/labs/week-04/evidence//TC09.png) |
| TC-10 Keyboard | TODO | TODO | ![TC10](/labs/week-04/evidence//TC10.png) |
| TC-11 Build | TODO | TODO | ![TC11](/labs/week-04/evidence//TC11.png) |
| TC-12 Pages | TODO | TODO | TODO |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: TODO

## Week 03 → Week 04 Reflection

TODO: เปรียบเทียบ DOM mutation กับ State-driven UI 3–5 ประโยค

## AI / External Resource Disclosure

ระบุเครื่องมือหรือแหล่งที่ใช้, prompt/คำถามสำคัญ, ส่วนที่นำมาปรับ และวิธีที่ตรวจสอบความถูกต้อง หากไม่ได้ใช้ให้เขียนว่า “ไม่ได้ใช้”

