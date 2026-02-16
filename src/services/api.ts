import axios from "axios";
//import { User } from "../types/user";
import type { User } from "../types/user";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`)
;
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(
    `${BASE_URL}/users`,
    user
  );
  return response.data;
};



export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/users/${id}`);
};

export const updateUser = async (
  id: number,
  user: User
): Promise<User> => {
  const response = await axios.put(
    `${BASE_URL}/users/${id}`,
    user
  );
  return response.data;
};

