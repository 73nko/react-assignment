import React, { useState, useContext } from "react";
import { AppContext, MessageType } from "../appContext";
import { useHistory } from "react-router-dom";

import { Ticket, updateTicketStatus } from "../api/tickets";

import "./tickets-list.css";

export const TicketItem: React.FC<Ticket> = ({
  id,
  description,
  assigneeId,
  completed,
}) => {
  const history = useHistory();
  const [updating, setUpdating] = useState<boolean>(false);
  const { backend, usersInfo, ticketsInfo, setNotification } = useContext(
    AppContext
  );
  const ticketAssigned = usersInfo?.users.find(
    (user) => user.id === assigneeId
  );

  const complete = async () => {
    setUpdating(true);
    try {
      const tickets = await updateTicketStatus(backend, id, true);

      ticketsInfo?.setTickets(tickets);
    } catch (e) {
      setNotification({ type: MessageType.error, message: e.message });
    }
    setUpdating(false);
  };

  const editTicket = () => {
    history.push(`tickets/${id}`);
  };

  return (
    <li className="ticket-elem" data-testid="ticket-elem">
      {completed ? (
        "✔"
      ) : (
        <button onClick={complete} disabled={completed || updating}>
          ✅
        </button>
      )}
      <main>
        {" "}
        <span>Assigned to: {ticketAssigned?.name}</span>
        <p>{description}</p>
      </main>
      <button onClick={editTicket} disabled={updating}>
        📝
      </button>
    </li>
  );
};

export const TicketList: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const showItems = Array.isArray(children) && children.length > 0;
  const addNewTicket = () => history.push("tickets/new");
  return (
    <>
      <ul className="tickets-list">
        {showItems ? children : <span>Is empty</span>}
      </ul>
      <footer>
        <button onClick={addNewTicket}>➕ Add new Ticket</button>
      </footer>
    </>
  );
};
