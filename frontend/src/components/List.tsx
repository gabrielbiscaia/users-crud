"use client";

import React, { useCallback } from "react";
import useGetUsers from "@/hooks/useGetUsers";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const List = () => {
  const fetchUsers = useCallback(() => {
    // Esta função será passada para useGetUsers e chamada quando necessário
    console.log("Fetching users...");
  }, []);

  const { users, isLoading, error, meta } = useGetUsers(fetchUsers);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
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
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.sexo}</TableCell>
                  <TableCell>
                    {new Date(user.dataNascimento).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{user.idade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {meta && (
            <div className="flex flex-row justify-around p-4">
              <p>
                Página {meta.page} de {meta.totalPages}
              </p>
              <p>Quantidade de usuários encontrados: {users.length}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;
