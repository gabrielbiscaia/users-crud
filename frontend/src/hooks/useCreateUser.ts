import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface UserInput {
  nome: string;
  sexo: string;
  dataNascimento: Date;
  idade: number;
}

interface UserPayload {
  nome: string;
  sexo: string;
  dataNascimento: string;
  idade: number;
}

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (userData: UserInput) => {
    setIsLoading(true);
    try {
      const formattedData: UserPayload = {
        nome: userData.nome,
        sexo: userData.sexo.toLowerCase(),
        dataNascimento: userData.dataNascimento.toISOString(),
        idade: userData.idade,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        formattedData,
      );

      toast.success("Usuário criado com sucesso!");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          `Erro ao criar usuário: ${error.response.data.message || "Ocorreu um erro no servidor"}`,
        );
      } else {
        toast.error(
          "Erro ao criar usuário: Não foi possível conectar ao servidor",
        );
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, isLoading };
};

export default useCreateUser;
