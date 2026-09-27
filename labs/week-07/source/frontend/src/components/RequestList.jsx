import RequestCard from './RequestCard.jsx';

function RequestList({ requests, onDeleteRequest, onChangeStatus }) {
  if (requests.length === 0) return <p className="subtle-empty">ไม่มีคำร้องที่ตรงกับตัวกรองนี้</p>;
  return (
    <div className="request-list" data-testid="request-list">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} onDeleteRequest={onDeleteRequest} onChangeStatus={onChangeStatus} />
      ))}
    </div>
  );
}

export default RequestList;
