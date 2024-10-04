import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import User from "./types/user";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api/index";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      // Aqui você pode adicionar uma lógica para mostrar uma mensagem de erro ao usuário
    }
  };

  const handleCreateUser = async (user: Omit<User, "id">) => {
    try {
      const newUser = await createUser(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const handleUpdateUser = async (user: User) => {
    try {
      const updatedUser = await updateUser(user);
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      // Adicione lógica para mostrar erro ao usuário
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      // Adicione lógica para mostrar erro ao usuário
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserList
          users={users}
          onSelectUser={setSelectedUser}
          onDeleteUser={handleDeleteUser}
        />
        <UserForm
          user={selectedUser}
          onSubmit={(userData: Omit<User, "id"> | User) => {
            if ("id" in userData) {
              handleUpdateUser(userData);
            } else {
              handleCreateUser(userData);
            }
          }}
        />
      </div>
    </div>
  );
}
