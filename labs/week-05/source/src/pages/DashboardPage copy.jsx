import {  } from 'react';
import { useEffect, useMemo, useState } from 'react';
import initialRequests from '../../public/data/initialRequests.json';
import FilterBar from '../components/FilterBar.jsx';
import RequestForm from '../components/RequestForm.jsx';
import RequestList from '../components/RequestList.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import App from '../App.jsx';
import { getRequests } from '../services/requestService.js';

getRequests().then((d) => console.log('ได้ข้อมูล', d.length, 'รายการ'));

function DashboardPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('all');
  const [notice, setNotice] = useState('');
  const summary = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((request) => request.status === 'pending').length,
    inProgress: requests.filter((request) => request.status === 'in-progress').length,
    completed: requests.filter((request) => request.status === 'completed').length,
  }), [requests]);
  const filteredRequests = statusFilter === 'all' ? requests : requests.filter((request) => request.status === statusFilter);

  async function handleAdd(input) {
    setRequests((current) => [...current, { ...input, id:`REQ-W4-${Date.now()}`, status:'pending' }]);
    setNotice('เพิ่มคำร้องในหน่วยความจำแล้ว — กด refresh แล้วจะหาย นี่คือโจทย์ของคาบ 5B');
  }

  function handleDelete(requestId) {
    setRequests((current) => current.filter((request) => request.id !== requestId));
    setNotice(`ลบคำร้อง ${requestId} จาก memory แล้ว`);
  }

  return (
    <section>
          <div className="page-heading"><div><p className="eyebrow dark">CP00 · WEEK04 REGRESSION</p><h1>Campus Service Request</h1><p>ตรวจ add, filter, delete และ validation ก่อน refactor</p></div></div>
          {notice && <p className="notice" role="status">{notice}</p>}
          <SummaryPanel summary={summary} />
          <div className="workspace-grid">
            <section className="panel form-panel"><RequestForm onAddRequest={handleAdd} /></section>
            <section className="panel" aria-labelledby="request-list-title">
              <div className="section-heading"><h2 id="request-list-title">รายการคำร้อง</h2><FilterBar value={statusFilter} onFilterChange={setStatusFilter} /></div>
              <RequestList requests={filteredRequests} onDeleteRequest={handleDelete} />
            </section>
          </div>
        </section>
        
    // <section data-testid="page-dashboard">
    //   <div className="page-heading"><div><p className="eyebrow dark">TODO 5A-CP01</p><h1>Dashboard Page</h1><p>CP01 ย้าย state และ UI มาจาก App.jsx · CP03 เปลี่ยนไปโหลดผ่าน Service และเพิ่ม 5 สถานะ</p></div></div>
    // </section>

  );
}

export default DashboardPage;
