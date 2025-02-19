# API Clean Architecture com Node.js, TypeScript, Express, Prisma e SQLite

Este projeto é uma API desenvolvida para estudo de Clean Architecture, utilizando Node.js, TypeScript, Express, Prisma e SQLite.

## 📁 Estrutura do Projeto

```
├── api-test           # Testes http
├── db                 # Arquivos do banco de dados SQLite
├── node_modules       # Dependências do projeto
├── src                # Código-fonte principal
│   ├── packeges       # Configurações de pacotes
│   ├── domain         # Entidades e interfaces
│   ├── infra          # Configuração do banco de dados e repositórios
│   ├── usecases       # Casos de uso e regras de negócio
│   ├── main.ts       # Ponto de entrada da aplicação
├── .env               # Variáveis de ambiente
├── .gitignore         # Arquivos e diretórios ignorados pelo Git
├── package.json       # Dependências e scripts do projeto
├── prisma             # Arquivos do Prisma ORM
│   ├── schema.prisma  # Modelo do banco de dados
└── tsconfig.json      # Configurações do TypeScript
```

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)

## 🚀 Como Rodar o Projeto

### 1️⃣ Clone o repositório
```sh
git clone https://github.com/dev-azevedo/clean-architecture-nodejs.git
cd clean-architecture-nodejs
```

### 2️⃣ Instale as dependências
```sh
npm install
```

### 3️⃣ Configure o banco de dados
Crie o arquivo `.env` na raiz do projeto e adicione:
```env
DATABASE_URL="file:./db/dev.db"
```
Em seguida, execute as migrações:
```sh
npx prisma db push
```

### 4️⃣ Inicie a aplicação
```sh
npm run start
```

A API estará rodando em `http://localhost:3000`

## 📌 Estrutura da API

### Rotas principais
# API de Produtos

Esta API permite cadastrar e listar produtos.

## Endpoints

### Criar um Produto

**Endpoint:**
```
POST /products
```

**Requisição:**
```json
{
    "name": "product2",
    "price": 100
}
```

**Resposta de Sucesso (201 Created):**
```json
{
    "id": "uuid",
}
```

### Listar Produtos

**Endpoint:**
```
GET /products
```

**Resposta de Sucesso (200 OK):**
```json
[
    {
        "id": "uuid",
        "name": "product2",
        "price": 100
        "quantity": 10
    }
]
```

