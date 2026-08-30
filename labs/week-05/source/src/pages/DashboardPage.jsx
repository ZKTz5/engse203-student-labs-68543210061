import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import RequestList from '../components/RequestList.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { getRequests } from '../services/requestService.js';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') ?? '';
  const [reloadKey, reload] = useManualReload();

  const [loadState, setLoadState] = useState('idle');
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setLoadState('loading');
    setErrorMessage('');
    setNotice('');

    getRequests({ scenario })
      .then((data) => {
        setRequests(data);
        setLoadState('success');
      })
      .catch((error) => {
        setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
        setLoadState('error');
      });
      
    // TODO 5B: เพิ่ม cleanup guard เพื่อกัน stale update
  }, [scenario, reloadKey]);

  const summary = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((request) => request.status === 'pending').length,
    inProgress: requests.filter((request) => request.status === 'in-progress').length,
    completed: requests.filter((request) => request.status === 'completed').length,
  }), [requests]);

  const filteredRequests = statusFilter === 'all'
    ? requests
    : requests.filter((request) => request.status === statusFilter);

  function handleRetry() {
    if (scenario) setSearchParams({});
    else reload();
  }

  function handleDelete(requestId) {
    setRequests((current) => current.filter((request) => request.id !== requestId));
    setNotice(`ลบคำร้อง ${requestId} ในหน่วยความจำแล้ว — refresh จะกลับมา`);
  }

  return (
    <section data-testid="page-dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">ROUTED · READ PATH</p>
          <h1>Dashboard</h1>
          <p>ติดตามคำร้องจาก URL และ Service Layer</p>
        </div>
      </div>

      {scenario && <p className="lab-scenario" role="status">LAB test scenario: {scenario}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}

      {loadState === 'loading' && <LoadingState />}
      {loadState === 'error' && <ErrorState message={errorMessage} onRetry={handleRetry} />}

      {loadState === 'success' && requests.length === 0 && (
        <section className="state-card" data-testid="empty-state">
          <h2>ยังไม่มีคำร้อง</h2>
          <p>เริ่มสร้างคำร้องแรกของคุณได้เลย</p>
          <Link className="button primary inline" to="/requests/new">สร้างคำร้องใหม่</Link>
        </section>
      )}

      {loadState === 'success' && requests.length > 0 && (
        <>
          <SummaryPanel summary={summary} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar value={statusFilter} onFilterChange={setStatusFilter} />
            </div>
            <RequestList requests={filteredRequests} onDeleteRequest={handleDelete} />
          </section>
        </>
      )}
    </section>
  );
}

export default DashboardPage;
