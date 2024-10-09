import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

interface User {
  id: number;
  nome: string;
  sexo: string;
  dataNascimento: Date | string;
  idade: number;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  isUpdating: boolean;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdate,
  isUpdating,
}) => {
  if (!user) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={onUpdate}>
          <ModalHeader>Editar Usuário</ModalHeader>
          <ModalBody>
            <Input name="nome" label="Nome" defaultValue={user.nome} />
            <Input name="sexo" label="Sexo" defaultValue={user.sexo} />
            <Input
              name="dataNascimento"
              label="Data de Nascimento"
              type="date"
              defaultValue={
                new Date(user.dataNascimento).toISOString().split("T")[0]
              }
            />
            <Input
              name="idade"
              label="Idade"
              type="number"
              defaultValue={user.idade.toString()}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" disabled={isUpdating}>
              {isUpdating ? "Salvando..." : "Salvar"}
            </Button>
            <Button color="danger" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
