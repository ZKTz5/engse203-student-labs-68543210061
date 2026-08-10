import RequestCard from './RequestCard.jsx';

function RequestList({ requests, onDeleteRequest }) {
  // TODO LAB4-R11: เพิ่ม empty state เมื่อ requests.length === 0
  if (requests.length === 0) {
    return (
      <div className="empty-state">
        <p>ไม่พบรายการคำร้อง</p>
      </div>
    );
  }
  return (
    <div className="request-list">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}

export default RequestList;

