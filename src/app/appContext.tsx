import React, { useState } from "react";
import { createContext } from "react";
import { BackendService } from "../backend";

import { useUsers, UsersInfo } from "./hooks/useUsers";
import { useTickets, TicketsInfo } from "./hooks/useTickets";

export enum MessageType {
  success = "success",
  error = "error",
  warning = "warning",
}
export type Notification = { message: string; type: MessageType };

interface AppState {
  backend: BackendService;
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
  usersInfo?: UsersInfo;
  ticketsInfo?: TicketsInfo;
}

const backend = new BackendService();

export const initialState: AppState = {
  backend,
  notification: null,
  setNotification: () => null,
};

const AppContext = createContext(initialState);
AppContext.displayName = "AppContext";

const { Provider } = AppContext;

const AppProvider: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const usersInfo = useUsers();
  const ticketsInfo = useTickets();

  return (
    <Provider
      value={{
        notification,
        setNotification,
        backend,
        usersInfo,
        ticketsInfo,
      }}>
      {children}
    </Provider>
  );
};

export { AppContext, AppProvider };
