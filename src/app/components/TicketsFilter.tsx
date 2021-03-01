import React, { ChangeEvent } from "react";

import "./tickets-filter.css";

export enum TicketStatus {
  All = "all",
  Completed = "completed",
  NotCompleted = "not completed",
}

interface TicketsFilterProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: TicketStatus;
}

const TicketsFilter: React.FC<TicketsFilterProps> = ({ onChange, value }) => {
  return (
    <div className="filters">
      <input
        type="radio"
        id={TicketStatus.All}
        name="status"
        value={TicketStatus.All}
        checked={value === TicketStatus.All}
        onChange={onChange}
      />
      <label htmlFor={TicketStatus.All}> 🌐 All</label>

      <input
        type="radio"
        id={TicketStatus.NotCompleted}
        name="status"
        value={TicketStatus.NotCompleted}
        checked={value === TicketStatus.NotCompleted}
        onChange={onChange}
      />
      <label htmlFor={TicketStatus.NotCompleted}>✅ Not Completed</label>
      <input
        type="radio"
        id={TicketStatus.Completed}
        name="status"
        value={TicketStatus.Completed}
        checked={value === TicketStatus.Completed}
        onChange={onChange}
      />
      <label htmlFor={TicketStatus.Completed}>❌ Completed</label>
    </div>
  );
};

export default TicketsFilter;
