"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateUser from "@/hooks/useCreateUser";
import sexes from "@/constants/sexes";
import { CalendarDate } from "@internationalized/date";
import Container from "../atoms/Container";
import {
  DatePicker,
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createUserSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sexo: z.string().min(1, "Sexo é obrigatório"),
  dataNascimento: z
    .date()
    .min(new Date("1900-01-01"), "Data de Nascimento é obrigatório"),
  idade: z.coerce.number().min(1, "Idade deve ser maior que 0"),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

function Form() {
  const { createUser, isLoading } = useCreateUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  async function handleCreateUser(data: CreateUserSchema) {
    try {
      await createUser(data);
      reset();
    } catch (error) {
      toast.error("Erro ao cadastrar usuário. Por favor, tente novamente.");
      throw error;
    }
  }

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={5000} />
      <h1 className="text-2xl font-bold mb-8">Cadastro de Usuário</h1>
      <form
        onSubmit={handleSubmit(handleCreateUser)}
        className="flex flex-col gap-2 w-full"
      >
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Nome"
              isRequired
              errorMessage={errors.nome?.message}
            />
          )}
        />
        <div className="flex flex-col sm:flex-row gap-2">
          <Controller
            name="sexo"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Sexo"
                isRequired
                errorMessage={errors.sexo?.message}
              >
                {sexes.map((sex) => (
                  <SelectItem key={sex} value={sex}>
                    {sex}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            name="dataNascimento"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Data de Nascimento"
                isRequired
                value={
                  field.value
                    ? new CalendarDate(
                        field.value.getFullYear(),
                        field.value.getMonth() + 1,
                        field.value.getDate(),
                      )
                    : undefined
                }
                onChange={(date) =>
                  field.onChange(
                    date ? new Date(date.year, date.month - 1, date.day) : null,
                  )
                }
                errorMessage={errors.dataNascimento?.message}
              />
            )}
          />
          <Controller
            name="idade"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                label="Idade"
                isRequired
                value={field.value ? field.value.toString() : ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
                errorMessage={errors.idade?.message}
              />
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </Container>
  );
}

export default Form;
