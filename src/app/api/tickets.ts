import { BackendService, Ticket } from "../../backend";


type newTicket = { description: string, assigneeId: number };

export const getTickets = async (backend: BackendService): Promise<Ticket[]> => await backend.tickets().toPromise();

export const updateTicketStatus = async (backend: BackendService, ticketId: number, status: boolean): Promise<Ticket[]>  => {
    const ticketUpdated = await backend.updateStatus(ticketId, status).toPromise();
    if (!ticketUpdated) throw new Error('The ticket could not be updated');
    const tickets = await getTickets(backend);
    return [...tickets];
}

export const addNewTicket = async (backend: BackendService, ticket: Partial<Ticket>): Promise<Ticket[]> => {
    const newTicket = await backend.newTicket(ticket as newTicket).toPromise()
    if (newTicket.id === undefined) throw new Error('The ticket could not be created')
    const tickets = await getTickets(backend);
    return [...tickets];
}



export const updateTicket = async (backend: BackendService, ticketId: number, ticket: Partial<Ticket>): Promise<Ticket[]> => {
    const newTicket = await backend.updateTicket(ticketId, ticket as newTicket).toPromise();
    if (newTicket.id === undefined) throw new Error('The ticket could not be updated');
    const tickets = await getTickets(backend);
    return [...tickets];
}



export const getTicket = async (backend: BackendService, ticketId: number): Promise<Ticket> => await backend.ticket(ticketId).toPromise();


export type {Ticket};