import { Link } from 'react-router-dom';
import PriorityBadge from './PriorityBadge.jsx';

function RequestCard({ request, onDeleteRequest, onMarkDone }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        {/* TODO B4: แทน {request.priority} ด้านล่างด้วย <PriorityBadge priority={request.priority} /> ที่คุณสร้าง */}
        <p><span className={`badge ${request.status}`}>{request.status}</span> · {request.priority}</p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
        {request.status !== 'completed' && (
          <button
            className="button secondary"
            type="button"
            onClick={() => onMarkDone?.(request.id)}
            aria-label={`ทำเครื่องหมายเสร็จสิ้น ${request.id}`}
          >
            เสร็จสิ้น
          </button>
        )}
        <button
          className="button danger"
          type="button"
          onClick={() => onDeleteRequest(request.id)}
          aria-label={`ลบคำร้อง ${request.id}`}
        >
          ลบ
        </button>
      </div>
    </article>
  );
}

export default RequestCard;