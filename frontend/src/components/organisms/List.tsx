"use client";

import React, { useCallback, useState } from "react";
import useGetUsers from "@/hooks/useGetUsers";
import useDeleteUser from "@/hooks/useDeleteUser";
import useUpdateUser from "@/hooks/useUpdateUser";
import Container from "@/components/atoms/Container";
import UserTable from "../atoms/UserTable";
import EditUserModal from "../atoms/EditUserModal";

interface User {
  id: number;
  nome: string;
  sexo: string;
  dataNascimento: Date | string;
  idade: number;
}

const List: React.FC = () => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUsers = useCallback(() => {
    console.log("Fetching users...");
  }, []);

  const { users, isLoading, error, meta } = useGetUsers(fetchUsers);
  const { deleteUser, isLoading: isDeleting } = useDeleteUser();
  const { updateUser, isLoading: isUpdating } = useUpdateUser();

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleEdit = (id: number, user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const form = e.currentTarget;
      const updatedUser = {
        nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
        sexo: (form.elements.namedItem("sexo") as HTMLInputElement).value,
        dataNascimento: new Date(
          (form.elements.namedItem("dataNascimento") as HTMLInputElement).value,
        ),
        idade: parseInt(
          (form.elements.namedItem("idade") as HTMLInputElement).value,
        ),
      };
      await updateUser(editingUser.id, updatedUser);
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <Container>
      <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <>
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
          {meta && (
            <div className="flex flex-row justify-around gap-2 w-full mx-auto mt-4">
              <p>
                Página {meta.page} de {meta.totalPages}
              </p>
              <p>Usuários por pagina: {meta.limit}</p>
              <p>Quantidade de usuários no banco de dados: {meta.total}</p>
            </div>
          )}
        </>
      )}

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={editingUser}
        onUpdate={handleUpdate}
        isUpdating={isUpdating}
      />
    </Container>
  );
};

export default List;
