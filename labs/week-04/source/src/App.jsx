import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import RequestForm from './components/RequestForm.jsx';
import FilterBar from './components/FilterBar.jsx';
import RequestList from './components/RequestList.jsx';
import { initialRequests } from './data/initialRequests.js';

function App() {
  // TODO LAB4-R04: เปลี่ยน requests/statusFilter เป็น state
  const [requests, setRequests] = useState(initialRequests);
  const [statusFilter, setStatusFilter] = useState('all');

  // TODO LAB4-R04: คำนวณ summary เป็น derived data
  const summary = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in-progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  // TODO LAB4-R08: คำนวณ filteredRequests จาก requests + statusFilter
  const filteredRequests = statusFilter === 'all'
  ? requests
  : requests.filter(request => request.status === statusFilter);

  const [nextIdNum, setNextIdNum] = useState(initialRequests.length + 1);

  function handleAddRequest(requestData) {
  const nextId = `REQ-${String(nextIdNum).padStart(3, '0')}`;
  const newRequest = { id: nextId, ...requestData, status: 'pending' };
  
  setRequests((currentRequests) => [newRequest, ...currentRequests]);
  
  // เพิ่มตัวนับขึ้นทีละ 1 เพื่อไม่ให้เลข ID ถอยหลังกลับไปซ้ำ
  setNextIdNum((prev) => prev + 1);
  }

  function handleDeleteRequest(requestId) {
    setRequests(currentRequests => currentRequests.filter(req => req.id !== requestId));
  }

  return (
    <>
      <AppHeader
        title="Campus Service Request"
        subtitle="LAB 4 Starter — เปลี่ยน DOM-driven UI เป็น State-driven React UI"
      />
      <main className="container page-content">
        <SummaryPanel summary={summary} />
        <div className="workspace-grid">
          <RequestForm onAddRequest={handleAddRequest} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDeleteRequest}
            />
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

