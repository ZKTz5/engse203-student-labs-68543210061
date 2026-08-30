import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ErrorState from "../components/ErrorState.jsx";
import FilterBar from "../components/FilterBar.jsx";
import LoadingState from "../components/LoadingState.jsx";
import RequestList from "../components/RequestList.jsx";
import SummaryPanel from "../components/SummaryPanel.jsx";
import useManualReload from "../hooks/useManualReload.js";
import {
  getRequests,
  deleteRequest,
  resetRequests,
} from "../services/requestService.js";

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const scenario = searchParams.get("scenario") ?? "";
  const [reloadKey, reload] = useManualReload();

  const [loadState, setLoadState] = useState("idle");
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoadState("loading");
    setErrorMessage("");
    setNotice("");

    getRequests({ scenario, onRecovery: (message) => {if (!ignore) setNotice(message);}, })
      .then((data) => {
        if (ignore) return;          // ไม่เกี่ยวแล้ว ทิ้งไปเลย
        setRequests(data);
        setLoadState("success");
      })
      .catch((error) => {
        if (ignore) return;
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ",
        );
        setLoadState("error");
      });
      return () => { ignore = true; };   // React เรียกตอนออกจากหน้า
    // TODO 5B: เพิ่ม cleanup guard เพื่อกัน stale update
  }, [scenario, reloadKey]);

  const summary = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter((request) => request.status === "pending")
        .length,
      inProgress: requests.filter((request) => request.status === "in-progress")
        .length,
      completed: requests.filter((request) => request.status === "completed")
        .length,
    }),
    [requests],
  );

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((request) => request.status === statusFilter);

  function handleRetry() {
    if (scenario) setSearchParams({});
    else reload();
  }

  async function handleDelete(requestId) {
    const next = await deleteRequest(requestId);
    setRequests(next);
    setNotice(`ลบคำร้อง ${requestId} แล้ว`);
  }

  async function handleReset() {
    if (
      !window.confirm(
        "คืนค่าข้อมูลตัวอย่างเริ่มต้น และลบคำร้องที่เพิ่มไว้ทั้งหมด?",
      )
    )
      return;
    const seedRequests = await resetRequests();
    setRequests(seedRequests);
    setStatusFilter("all");
    setNotice("คืนค่าข้อมูลตัวอย่างเรียบร้อยแล้ว");
  }

  return (
    <section data-testid="page-dashboard">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">ROUTED · READ PATH</p>
          <h1>Dashboard</h1>
          <p>ติดตามคำร้องจาก URL และ Service Layer</p>
        </div>
        <button
          className="button ghost"
          data-testid="reset-button"
          type="button"
          onClick={handleReset}
        >
          Reset Demo Data
        </button>
      </div>

      {scenario && (
        <p className="lab-scenario" role="status">
          LAB test scenario: {scenario}
        </p>
      )}
      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}

      {loadState === "loading" && <LoadingState />}
      {loadState === "error" && (
        <ErrorState message={errorMessage} onRetry={handleRetry} />
      )}

      {loadState === "success" && requests.length === 0 && (
        <section className="state-card" data-testid="empty-state">
          <h2>ยังไม่มีคำร้อง</h2>
          <p>เริ่มสร้างคำร้องแรกของคุณได้เลย</p>
          <Link className="button primary inline" to="/requests/new">
            สร้างคำร้องใหม่
          </Link>
        </section>
      )}

      {loadState === "success" && requests.length > 0 && (
        <>
          <SummaryPanel summary={summary} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading">
              <h2 id="request-list-title">รายการคำร้อง</h2>
              <FilterBar
                value={statusFilter}
                onFilterChange={setStatusFilter}
              />
            </div>
            <RequestList
              requests={filteredRequests}
              onDeleteRequest={handleDelete}
            />
          </section>
        </>
      )}
    </section>
  );
}

export default DashboardPage;
