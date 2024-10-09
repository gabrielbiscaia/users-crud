import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";

interface User {
  id: number;
  nome: string;
  sexo: string;
  dataNascimento: Date | string;
  idade: number;
}

interface UserTableProps {
  users: User[];
  onEdit: (id: number, user: User) => void;
  onDelete: (id: number) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  isUpdating,
  isDeleting,
}) => {
  return (
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
                onClick={() => onEdit(user.id, user)}
                disabled={isUpdating}
              >
                {isUpdating ? "Editando..." : "Editar"}
              </Button>
              <Button
                color="danger"
                onClick={() => onDelete(user.id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Excluindo..." : "Excluir"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
