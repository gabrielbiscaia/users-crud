import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface UserInput {
  nome?: string;
  sexo?: string;
  dataNascimento?: Date;
  idade?: number;
}

interface UserPayload {
  nome?: string;
  sexo?: string;
  dataNascimento?: string;
  idade?: number;
}

const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = async (userId: string, userData: UserInput) => {
    setIsLoading(true);
    try {
      const formattedData: UserPayload = {
        ...(userData.nome && { nome: userData.nome }),
        ...(userData.sexo && { sexo: userData.sexo.toLowerCase() }),
        ...(userData.dataNascimento && {
          dataNascimento: userData.dataNascimento.toISOString(),
        }),
        ...(userData.idade && { idade: userData.idade }),
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        formattedData,
      );

      toast.success("Usuário atualizado com sucesso!");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          `Erro ao atualizar usuário: ${error.response.data.message || "Ocorreu um erro no servidor"}`,
        );
      } else {
        toast.error(
          "Erro ao atualizar usuário: Não foi possível conectar ao servidor",
        );
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading };
};

export default useUpdateUser;
