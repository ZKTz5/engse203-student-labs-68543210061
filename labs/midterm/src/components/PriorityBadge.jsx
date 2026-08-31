function PriorityBadge({ priority }) {
  if (priority === 'urgent') {
    return <span className="priority-urgent">เร่งด่วน</span>;
  }

  if (priority === 'normal') {
    return <span className="priority-normal">ปกติ</span>;
  }

  return null;
}

export default PriorityBadge;