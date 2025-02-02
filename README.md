# User CRUD

![image](https://github.com/user-attachments/assets/8a1e1e97-3d7f-4d08-af74-bae9ed86a4b0)

## 🎯 Objective
Create a CRUD (Create, Read, Update and Delete) that could perform REST operations to manage users.

## 🧰 Technologies

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

### Backend
- Nest.js
- TypeScript
- Prisma

### Database
- PostgreSQL

### Container
- Docker
- Docker-Compose

## 📋 Requirements

Before you begin, ensure you have the following installed on your local machine:

- Node.js (v18 or later)
- npm (comes with Node.js)
- Docker and Docker Compose
- Git

## ⚙️ Settings
### Configuration to run the application with Docker
To run the project using Docker, you will need to create an **.env** file which will store the environment variables for **docker-compose**, the file should contain the following environment variables:
```
# PostgreSQL
POSTGRES_USER='POSTGRES_USER'
POSTGRES_PASSWORD='POSTGRES_PASSWORD'
POSTGRES_DB='POSTGRES_DB'

# Backend
DATABASE_URL='DATABASE_URL'

# Frontend
NEXT_API_URL='NEXT_API_URL'
```

### Configuration to run the application individually
#### Docker-Compose
Inside the **docker-compose.yml** file, you will need to leave only the following structure:
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
Inside the **backend** folder you need to create an **.env**
```
.
└── backend
   └── .env
```
Inside the **.env** we will have the following environment variables
```
DATABASE_URL='YOUR_DATABASE_URL'
```

#### Frontend
Inside the **frontend** folder you need to create an **.env**
```
.
└── frontend
   └── .env
```
Inside the **.env** we will have the following environment variables
```
NEXT_API_URL=http://localhost:3000
```
## ▶️ Running the Application
### Using Docker
With Docker installed you can build and run the application using the following command:
```
docker-compose up --build
```
### Using the terminal
#### Backend

To start the backend in the development environment, you need to install Node and run:

```
npm install
```

Then, you should run the Prisma migrations. Prisma is an ORM that helps make database queries. You can run the migrations in your terminal with this command:

```
npx prisma db push
```

Finally, just start the application:

```
npm run start:dev
```

### Frontend

The frontend can also be run via terminal. To do this, you need to navigate to the frontend directory and first install the dependencies:

```
npm install
```

Then run the application with the command:

```
npm run dev
```

## 🚪 API Endpoints

- GET /users
- GET /users?
- GET /users/{id}
- POST /users
- PUT /users/{id}
- DELETE /users/{id}

## 📂 Project Structure
```
.
├── backend
│   ├── Dockerfile
│   ├── prisma
│   │   └── *schema.prisma*
│   ├── src
│   │   ├── *main.ts*
│   │   ├── prisma
│   └── └── users
├── frontend
│   ├── Dockerfile
│   ├── src
│   │   ├── app
│   │   │   └── *page.tsx*
│   │   ├── components
│   │   ├── constants
│   │   ├── contexts
│   │   ├── hooks
│   └── └── types
└── docker-compose.yml
```