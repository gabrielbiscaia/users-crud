"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "./Container";

import sexes from "@/constants/sexes";

import { useForm } from "react-hook-form";
import { Input, Select, SelectItem } from "@nextui-org/react";

const createUserSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sexo: z.string().min(1, "Sexo é obrigatório"),
  dataNascimento: z.date().min(new Date(), "Data de Nascimento é obrigatório"),
  idade: z.coerce.number().min(1, "Idade deve ser maior que 0"),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

function Form() {
  const { register, handleSubmit } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  function handleCreateUser(data: CreateUserSchema) {
    console.log(data);
  }

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-8">Cadastro de Usuário</h1>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex flex-col gap-2 w-2/3"
      >
        <Input
          label="Nome"
          placeholder="Nome"
          isRequired
          {...register("nome")}
          className="w-full"
        />
        <Select
          label="Sexo"
          placeholder="Sexo"
          isRequired
          {...register("sexo")}
        >
          {sexes.map((sex, index) => (
            <SelectItem key={index} value={sex}>
              {sex}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Data de Nascimento"
          placeholder="Data de Nascimento"
          {...register("dataNascimento")}
        />
        <Input
          label="Idade"
          placeholder="Idade"
          isRequired
          {...register("idade")}
        />
      </form>
    </Container>
  );
}

export default Form;
