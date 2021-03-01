import { useState, useEffect, useContext } from "react";
import { getUsers, getUser, User } from "../api/users";
import { AppContext, MessageType } from "../appContext";

const ERROR_FETCHING_USERS = "There were an error fetching users";
const ERROR_FETCHING_USER = "There were an error fetching users";
const WARNING_INVALID_USER = "The selected user does not exist";

export interface UsersInfo {
  isLoading: boolean;
  selectedUser: User | undefined;
  users: User[];
  updateSelectedUser: (userId: number) => void;
}

export const useUsers = (): UsersInfo => {
  const [isLoading, setLoadingUsers] = useState<boolean>(false);
  const { setNotification, backend } = useContext(AppContext);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingUsers(true);
      setNotification(null);
      try {
        const users = await getUsers(backend);
        setUsers(users);
        setSelectedUser(users[0]);
      } catch {
        setNotification({
          type: MessageType.error,
          message: ERROR_FETCHING_USERS,
        });
      }
      setLoadingUsers(false);
    };
    fetchData();
  }, [backend, setNotification]);

  const updateSelectedUser = async (userId: number) => {
    setLoadingUsers(true);
    setNotification(null);
    setSelectedUser(undefined);
    try {
      const user = await getUser(backend, userId);
      if (!user)
        setNotification({
          type: MessageType.warning,
          message: WARNING_INVALID_USER,
        });
      setSelectedUser(user);
    } catch {
      setNotification({
        type: MessageType.error,
        message: ERROR_FETCHING_USER,
      });
    }
    setLoadingUsers(false);
  };

  return {
    isLoading,
    users,
    selectedUser,
    updateSelectedUser,
  };
};
