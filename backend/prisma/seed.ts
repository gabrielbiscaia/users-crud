import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users1 = await prisma.user.create({
    data: {
      nome: 'Gabriel',
      sexo: 'Masculino',
      dataNascimento: new Date('1990-01-01'),
      idade: 30,
    },
  });

  const users2 = await prisma.user.create({
    data: {
      nome: 'Maria',
      sexo: 'Feminino',
      dataNascimento: new Date('1995-02-02'),
      idade: 25,
    },
  });

  console.log({ users1, users2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
