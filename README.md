# CRUD de Usuários

![image](https://github.com/user-attachments/assets/8a1e1e97-3d7f-4d08-af74-bae9ed86a4b0)


## 🎯 Objetivo
O objetivo deste projeto era criar um CRUD que pudesse fazer operações REST (Create, Read, Update and Delete) de Usuários, estes que possum os seguintes atributos:
``` 
nome: varchar
sexo: char
datanascimento: date
idade: integer 
```
E tivesse como API Endpoints:

```
GET /users
GET /users?
GET /users/{id}
POST /users
PUT /users/{id}
DELETE /users/{id}
```
## 🧰 Tecnologias
### Container
- Docker
- Docker-Compose

### Banco de Dados
- PostgreSQL

### Backend
- Nest.js
- TypeScript
- Prisma

### Frontend
- Next.js
- React
- TypeScript
- TailWind CSS
- NextUI
- zod
- axios
- react-hook-form
- react-toastify

## ⚙️ Configurações 
### Configuração para rodar a aplicação com o Docker
Para rodar o projeto utilizando Docker, será necessário criar um arquivo **.env** o qual irá armazenar as variaveis de ambiente do **docker-compose**, o arquivo deve conter as seguintes variáveis de ambiente:
```
# PostgreSQL
POSTGRES_USER=POSTGRES_USER
POSTGRES_PASSWORD=POSTGRES_PASSWORD
POSTGRES_DB=POSTGRES_DB

# Backend
DATABASE_URL=DATABASE_URL

# Frontend
NEXT_API_URL=NEXT_API_URL
```

### Configuração para rodar a aplicação individualmente
#### Docker-Compose
Dentro do arquivo **docker-compose.yml** será necessários deixar apenas a seguinte estrutura:
```
services:
  postgres:
    image: postgres:17
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    ports:
      - "5432:5432"
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Backend
Dentro da pasta **backend** é necessário criar um **.env**
```
.
└── backend
   └── .env
```
Dentro do **.env** teremos as seguintes variaveis de ambiente
```
DATABASE_URL=DATABASE=URL
```

#### Frontend
Dentro da pasta **frontend** é necessário criar um **.env**
```
.
└── frontend
   └── .env
```
Dentro do **.env** teremos as seguintes variaveis de ambiente
```
NEXT_API_URL=NEXT_API_URL
```
## ▶️ Rodar o Aplicativo
### Usando o Docker
Com o Docker instalado voce pode buildar e rodar o aplicativo usando o seguinte comando:
```
docker-compose up --build
```
### Usando o terminal
#### Backend

Para iniciar o backend no ambiente de desenvolvimento, você precisa instalar o Node e executar:

```
npm install
```

Em seguida, você deve executar as migrações do Prisma. Prisma é um ORM que ajuda a fazer consultas no banco de dados. Você pode executar as migrações no seu terminal com este comando:

```
npx prisma migrate dev
```

Por fim, basta iniciar a aplicação:

```
npm run start:dev
```

### Frontend

O frontend também pode ser executado via terminal. Para isso, você precisa navegar até o diretório do frontend e primeiro instalar as dependências:

```
npm install
```

Em seguida, execute a aplicação com o comando:

```
npm run dev
```

## 🚪 Portas
Portas da Aplicação
Quando a aplicação estiver em execução, as portas referenciadas nas variáveis de ambiente na raiz do projeto (se estiver usando Docker), ou nos diretórios de serviço do frontend e backend, são:
```
PostgreSQL: 5432
Backend: 3000
Frontend: 8080
```
## 📂 Estrutura do Projeto
```
.
├── backend
│   ├── Dockerfile
│   ├── prisma
│   │   └── *schema.prisma*
│   ├── src
│   │   ├── *main.ts*
│   │   ├── database
│   │   ├── integrations
│   │   ├── utils
│   │   ├── logistic-operator
│   └── └── simulations
├── frontend
│   ├── Dockerfile
│   ├── src
│   │   ├── api
│   │   ├── app
│   │   │   └── *page.tsx*
│   │   ├── components
│   │   ├── hooks
│   │   ├── constants
│   └── └── types
└── docker-compose.yml
```

## 🔃 Versionamento
Esse projeto utiliza o Git para controle de versão e o GitHub como repositório remoto.
