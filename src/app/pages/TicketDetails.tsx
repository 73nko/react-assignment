import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AppContext, MessageType } from "../appContext";

import { Ticket, addNewTicket, updateTicket, getTicket } from "../api/tickets";

import "./ticket-details.css";

const TicketDetails: React.FC<{}> = () => {
  const history = useHistory();
  const { ticketId } = useParams<{ ticketId: string }>();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [searchingTicket, setSearchingTicket] = useState<boolean>(false);
  const { backend, usersInfo, ticketsInfo, setNotification } = useContext(
    AppContext
  );

  useEffect(() => {
    const getTicketValues = async () => {
      setSearchingTicket(true);
      try {
        const ticket = await getTicket(backend, +ticketId);
        setTicket({
          id: ticket.id,
          description: ticket.description,
          assigneeId: ticket.assigneeId,
        });
      } catch (e) {
        setNotification({ type: MessageType.error, message: e.message });
      }
      setSearchingTicket(false);
    };
    if (ticketId !== "new") {
      getTicketValues();
    }
  }, [backend, setNotification, ticketId]);

  const [ticket, setTicket] = useState<Partial<Ticket>>({
    description: "",
    assigneeId: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCreating(true);
    try {
      const tickets =
        ticket.id !== undefined
          ? await updateTicket(backend, ticket.id, ticket)
          : await addNewTicket(backend, ticket);

      ticketsInfo?.setTickets(tickets);

      setIsCreating(false);
      history.push("/");
    } catch (e) {
      setNotification({ type: MessageType.error, message: e.message });
      setIsCreating(false);
    }
  };

  const updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicket({ ...ticket, description: event.target.value });
  };

  const updateAssigned = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTicket({ ...ticket, assigneeId: +event.target.value });
  };

  const isTicketValid = !ticket.description || !ticket.assigneeId;

  return (
    <div className="ticket-details">
      <h3>Editing ticket {ticketId}</h3>

      {searchingTicket ? (
        <span className="searching">Searching ticket 🔍</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              onChange={updateDescription}
              value={ticket.description}
            />
          </div>

          <div>
            <label htmlFor="assigned">Assign to:</label>
            <select
              id="assigned"
              value={`${ticket.assigneeId}`}
              onChange={updateAssigned}>
              <option>Select a user</option>
              {usersInfo?.users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={isTicketValid || isCreating}>
            {isCreating ? "Adding New Ticket" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default TicketDetails;
