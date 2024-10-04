"use client";

import React, { useCallback, useState } from "react";
import useGetUsers from "@/hooks/useGetUsers";
import useDeleteUser from "@/hooks/useDeleteUser";
import useUpdateUser from "@/hooks/useUpdateUser";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import Container from "@/components/Container";

interface User {
  id: number;
  nome: string;
  sexo: string;
  dataNascimento: string;
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
          <Table>
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>NOME</TableColumn>
              <TableColumn>SEXO</TableColumn>
              <TableColumn>DATA DE NASCIMENTO</TableColumn>
              <TableColumn>IDADE</TableColumn>
              <TableColumn className="text-center">AÇÕES</TableColumn>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-b border-gray-800">
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.sexo}</TableCell>
                  <TableCell>
                    {new Date(user.dataNascimento).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.idade}</TableCell>
                  <TableCell className="flex gap-2 justify-center">
                    <Button
                      color="primary"
                      onClick={() => handleEdit(user.id, user)}
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Editando..." : "Editar"}
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(user.id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Excluindo..." : "Excluir"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalContent>
          {editingUser && (
            <form onSubmit={handleUpdate}>
              <ModalHeader>Editar Usuário</ModalHeader>
              <ModalBody>
                <Input
                  name="nome"
                  label="Nome"
                  defaultValue={editingUser.nome}
                />
                <Input
                  name="sexo"
                  label="Sexo"
                  defaultValue={editingUser.sexo}
                />
                <Input
                  name="dataNascimento"
                  label="Data de Nascimento"
                  type="date"
                  defaultValue={
                    new Date(editingUser.dataNascimento)
                      .toISOString()
                      .split("T")[0]
                  }
                />
                <Input
                  name="idade"
                  label="Idade"
                  type="number"
                  defaultValue={editingUser.idade.toString()}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" disabled={isUpdating}>
                  {isUpdating ? "Salvando..." : "Salvar"}
                </Button>
                <Button
                  color="danger"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default List;
