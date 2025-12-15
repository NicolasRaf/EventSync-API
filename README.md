# EventSync Backend

## 📋 Descrição
Backend da plataforma **EventSync**, desenvolvido para gerenciar eventos, inscrições e check-ins de participantes. O projeto segue os princípios de **Clean Architecture** e utiliza tecnologias modernas do ecossistema Node.js.

## 🚀 Tecnologias Integradas
- **Node.js** & **Express**: Base da aplicação.
- **TypeScript**: Tipagem estática e segura.
- **Prisma**: ORM moderno para interação com banco de dados (PostgreSQL).
- **TSyringe**: Injeção de dependência para desacoplamento.
- **Zod**: Validação robusta de dados de entrada.
- **JWT (JsonWebToken)**: Autenticação segura.
- **Swagger UI**: Documentação interativa da API.

## ✨ Funcionalidades
- **Autenticação**: Cadastro de usuários e Login (Geração de Token JWT).
- **Gestão de Eventos**: Criação e Listagem de eventos.
- **Inscrições**: Usuários autenticados podem se inscrever em eventos (controle de duplicidade).
- **Check-in**: Funcionalidade para registrar a presença do participante no evento.

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js
- PostgreSQL

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e configure as variáveis:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/eventsync?schema=public"
JWT_SECRET="sua_chave_secreta_super_segura"
PORT=3333
```

### 3. Banco de Dados
Execute as migrations para criar as tabelas no banco:
```bash
npx prisma migrate dev
```

## ▶️ Executando o Projeto

Para iniciar o servidor em ambiente de desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`.

## 📚 Documentação da API

A documentação interativa com Swagger está disponível em:
**http://localhost:3333/api-docs**

## 🏗️ Arquitetura
O projeto está organizado em:
- **Modules**: Contém a lógica de negócio (UseCases, Repositories, Entities).
- **Shared**: Recursos compartilhados (Container de DI, configs).
- **Presentation**: Camada HTTP (Controllers, Routes, Middlewares).
