import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          `Erro ao deletar usuário: ${error.response.data.message || "Ocorreu um erro no servidor"}`,
        );
      } else {
        toast.error(
          "Erro ao deletar usuário: Não foi possível conectar ao servidor",
        );
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteUser, isLoading };
};

export default useDeleteUser;
