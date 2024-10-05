import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import User from "../types/User";

interface ApiResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const useGetUsers = (fetchCallback: () => void) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<ApiResponse["meta"] | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
      );

      if (response.data && Array.isArray(response.data.data)) {
        setUsers(response.data.data);
        setMeta(response.data.meta);
      } else {
        console.error("Estrutura de dados inesperada:", response.data);
        setUsers([]);
        setError("Formato de dados inválido recebido da API");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          `Erro ao carregar os usuários: ${error.response.data.message || "Ocorreu um erro no servidor"}`,
        );
      }
      setError(
        "Não foi possível carregar os usuários. Por favor, tente novamente.",
      );
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCallback();
  }, [fetchCallback]);

  return { users, isLoading, error, meta };
};

export default useGetUsers;
