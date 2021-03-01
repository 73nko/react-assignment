import { useState, useEffect, useContext, ChangeEvent } from "react";
import { getTickets, Ticket } from "../api/tickets";
import { AppContext, MessageType } from "../appContext";

import { TicketStatus } from "../components/TicketsFilter";

const ERROR_FETCHING = "There were an error fetching tickets";

export interface TicketsInfo {
  isLoading: boolean;
  tickets: Ticket[];
  updateFilter: (value: ChangeEvent<HTMLInputElement>) => void;
  ticketsFilter: TicketStatus;
  setTickets: (tickets: Ticket[]) => void;
}

export const useTickets = (): TicketsInfo => {
  const [isLoading, setLoadingTickets] = useState<boolean>(false);
  const { setNotification, backend } = useContext(AppContext);

  const [tickets, setTickets] = useState([] as Ticket[]);
  const [filteredTickets, setFilteredTickets] = useState([] as Ticket[]);
  const [ticketsFilter, setTicketsFilter] = useState<TicketStatus>(
    TicketStatus.All
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoadingTickets(true);
      setNotification(null);
      try {
        const tickets = await getTickets(backend);
        setTickets(tickets);
      } catch {
        setNotification({ type: MessageType.error, message: ERROR_FETCHING });
      }
      setLoadingTickets(false);
    };
    fetchData();
  }, [backend, setNotification]);

  useEffect(() => {
    const ticketsFilterPredicate = ({ completed }: Ticket) => {
      switch (ticketsFilter) {
        case TicketStatus.Completed:
          return completed;
        case TicketStatus.NotCompleted:
          return !completed;
        default:
          return true;
      }
    };

    const filteredTickets = tickets.filter(ticketsFilterPredicate);
    setFilteredTickets(filteredTickets);
  }, [tickets, ticketsFilter]);

  const updateFilter = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setTicketsFilter(value as TicketStatus);
  };

  return {
    isLoading,
    tickets: filteredTickets,
    updateFilter,
    ticketsFilter,
    setTickets,
  };
};
