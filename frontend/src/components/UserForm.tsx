import { useState, useEffect } from "react";
import User from "../types/user";

interface UserFormProps {
  user: User | null;
  onSubmit: (user: Omit<User, "id"> | User) => void;
}

function UserForm({ user, onSubmit }: UserFormProps) {
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [idade, setIdade] = useState<number | "">("");

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setSexo(user.sexo);
      setDataNascimento(user.dataNascimento);
      setIdade(user.idade);
    } else {
      setNome("");
      setSexo("");
      setDataNascimento(null);
      setIdade("");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataNascimento) return; // Evita submissão se a data não estiver definida
    onSubmit(
      user
        ? { ...user, nome, sexo, dataNascimento, idade: Number(idade) }
        : { nome, sexo, dataNascimento, idade: Number(idade) },
    );
    setNome("");
    setSexo("");
    setDataNascimento(null);
    setIdade("");
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setDataNascimento(date);
    setIdade(calculateAge(date));
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">
        {user ? "Editar Usuário" : "Criar Usuário"}
      </h2>
      <div>
        <label htmlFor="nome" className="block mb-1">
          Nome:
        </label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="sexo" className="block mb-1">
          Sexo:
        </label>
        <select
          id="sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
      </div>
      <div>
        <label htmlFor="dataNascimento" className="block mb-1">
          Data de Nascimento:
        </label>
        <input
          type="date"
          id="dataNascimento"
          value={formatDateForInput(dataNascimento)}
          onChange={handleDateChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="idade" className="block mb-1">
          Idade:
        </label>
        <input
          type="number"
          id="idade"
          value={idade}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {user ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
}

export default UserForm;
