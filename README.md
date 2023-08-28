# Desafio Fullstack Angular/Node

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org) - Utilizado para executar o código JavaScript/TypeScript.
- [Angular CLI](https://angular.io/cli) - Interface de linha de comando do Angular.
- [Nest CLI](https://docs.nestjs.com/cli/overview) - Interface de linha de comando do Nest.js.
- [PostgreSQL](https://www.postgresql.org/) - Sistema de gerenciamento de banco de dados relacional.

## Configuração

1. Clone este repositório para o seu ambiente local.

2. Se assegure que tem um banco de dados postgres rodando com username "postgres" e password "docker". <br />
2.1 Como alternativa você pode navegar até o "server>src>app.module.ts" e configurar como desejar.

3. Crie um banco de dados chamado "postgres" <br />
3.1 Você também pode mudar o nome do banco em "server>src>app.module.ts".

2. Navegue para o diretório do projeto no terminal.


## Passo-a-passo

### Back-end (Nest.js)

1. Navegue para o diretório `server` usando o comando `cd server`.
2. Instale as dependências do projeto com o comando `yarn`.
3. Inicie o servidor do Nest.js com o comando `yarn start:dev`.
4. O servidor estará em execução em `http://localhost:3000`.

### Front-end (Angular)

1. Navegue para o diretório `client` usando o comando `cd client`.
2. Instale as dependências do projeto com o comando `yarn`.
3. Inicie o servidor de desenvolvimento do Angular com o comando `ng serve` ou `yarn start`.
4. Acesse a aplicação em seu navegador em `http://localhost:4200`.