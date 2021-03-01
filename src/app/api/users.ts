import { BackendService, User } from "../../backend";

export const getUsers = async (backend: BackendService): Promise<User[]> => await backend.users().toPromise();

export const getUser = async (backend: BackendService, userId: number): Promise<User | undefined> => await backend.user(userId).toPromise();

export type {User};