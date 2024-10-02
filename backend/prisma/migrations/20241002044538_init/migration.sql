-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "idade" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
