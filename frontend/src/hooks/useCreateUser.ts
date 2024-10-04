import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import User from "@/types/User";

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (userData: User) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        userData,
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
