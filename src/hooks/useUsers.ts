import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
} from "../services/api";
import type { User } from "../types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");


  // Fetch Users
 
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch users");
      }
    } finally {
      setLoading(false);
    }
  };


  // Add User

  const addUser = async (data: User) => {
    try {
      setLoading(true);
      setError("");

      await createUser(data);
      setSuccessMessage("User added successfully");
      await fetchUsers();
    } catch {
      setError("Failed to add user");
    } finally {
      setLoading(false);
    }
  };


  // Edit User
 
  const editUser = async (id: number, data: User) => {
    try {
      setLoading(true);
      setError("");

      await updateUser(id, data);
      setSuccessMessage("User updated successfully");
      await fetchUsers();
    } catch {
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

 
  // Delete User
  
  const removeUser = async (id: number) => {
    try {
      setLoading(true);
      setError("");

      await deleteUser(id);
      setSuccessMessage("User deleted successfully");
      await fetchUsers();
    } catch {
      setError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  // Auto clear success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    successMessage,
    addUser,
    editUser,
    removeUser,
    refetch: fetchUsers,
  };
};
