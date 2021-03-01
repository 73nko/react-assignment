import React from "react";
import { Notification } from "../appContext";

import "./toaster.css";

interface ToasterProps {
  notification: Notification | null;
  clearNotification: () => void;
}

const Toaster: React.FC<ToasterProps> = ({
  notification,
  clearNotification,
}) => {
  return notification ? (
    <div className={`toaster ${notification.type}`}>
      <button onClick={clearNotification}>X</button>
      <p>{notification.message}</p>
    </div>
  ) : null;
};

export default Toaster;
