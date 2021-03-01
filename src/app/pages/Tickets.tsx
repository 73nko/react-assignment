import React, { useContext } from "react";
import { AppContext } from "../appContext";

import TicketsFilter from "../components/TicketsFilter";

import { TicketList, TicketItem } from "../components/TicketsList";

import { TicketsInfo } from "../hooks/useTickets";

const Tickets: React.FC<{}> = () => {
  const { ticketsInfo } = useContext(AppContext);
  const {
    isLoading,
    tickets,
    updateFilter,
    ticketsFilter,
  } = ticketsInfo as TicketsInfo;
  return (
    <>
      <main>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <TicketsFilter onChange={updateFilter} value={ticketsFilter} />
            <TicketList>
              {tickets.map((t) => (
                <TicketItem key={t.id} {...t} />
              ))}
            </TicketList>
          </>
        )}
      </main>
    </>
  );
};

export default Tickets;
