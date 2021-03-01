import { useContext } from "react";
import { AppContext } from "../appContext";

import "./header.css";

const Header = () => {
  const { usersInfo } = useContext(AppContext);
  return (
    <header className="header">
      <h1>🎟 Tickets Assignment</h1>
      <span>{`👤  ${usersInfo?.selectedUser?.name}` || "Log in"}</span>
    </header>
  );
};

export default Header;
