const priorityLabels = {
  urgent: "เร่งด่วน",
  normal: "ปกติ",
};

const statusLabels = {
  pending: "รอดำเนินการ",
  "in-progress": "กำลังดำเนินการ",
  completed: "เสร็จสิ้น",
};

function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="request-card">
      <div className="card-badges">
        <span className={`badge status-${request.status}`}>
          {statusLabels[request.status] || request.status}
        </span>
        {request.priority === "urgent" && (
          <span className="badge priority-urgent">
            {priorityLabels[request.priority]}
          </span>
        )}
      </div>

      <div className="card-content">
        <p className="request-id">{request.id}</p>
        <h3>{request.requestType}</h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
      </div>

      <button type="button" onClick={() => onDeleteRequest(request.id)}>
        ลบ
      </button>
    </article>
  );
}

export default RequestCard;
