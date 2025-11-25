# WebVehicles - Sistema de Gerenciamento de Veículos

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

Este é o repositório do **WebVehicles**, uma API REST para gerenciamento de vendas de veículos automotores.

O sistema é responsável por conectar **Lojas (Stores)** e **Clientes (Clients)**, permitindo que lojas gerenciem seu inventário de **veículos** e clientes possam buscar e visualizar as ofertas disponíveis.

Construído com Node.js e JavaScript, este projeto utiliza o padrão **MVC (Model-View-Controller)** para garantir uma organização clara e escalável, com autenticação via JWT e upload de imagens local.

O repositório da interface para interagir com a API WebVehicles está disponível em: https://github.com/ViniciusAlves03/WebVehiclesFront.

## ✨ Principais Funcionalidades

* **Gerenciamento de Lojas (Stores):**
    * Cadastro e Autenticação (Login) de estabelecimentos.
    * CRUD completo de dados da loja.
    * Upload de imagem de perfil da loja.
* **Gerenciamento de Clientes (Clients):**
    * Registro e Autenticação de usuários finais.
    * Consulta e atualização de perfil.
* **Catálogo de Veículos:**
    * Cadastro de veículos vinculados a uma loja específica.
    * Suporte a upload de múltiplas imagens (até 3) por veículo.
    * Filtragem de veículos por categoria, busca por nome e listagem geral.
    * Validação de campos obrigatórios (Chassi, Placa, Preço, etc.).
* **Segurança e Autenticação:**
    * Proteção de rotas sensíveis utilizando **JSON Web Tokens (JWT)**.
    * Hash de senhas utilizando **Bcrypt**.
    * Middlewares para verificação de token e propriedade do recurso.
* **Upload de Arquivos:**
    * Integração com **Multer** para armazenamento de imagens em disco.

## 🚀 Tecnologias Utilizadas

* **Core:** Node.js, JavaScript
* **Framework API:** Express.js
* **Banco de Dados:** MySQL
* **ORM:** Sequelize
* **Autenticação:** JWT & Bcrypt
* **Uploads:** Multer

## 📋 Pré-requisitos

Para executar este projeto localmente, você precisará ter os seguintes serviços instalados e em execução:

* Node.js (v14.x ou superior)
* MySQL

## ⚙️ Instalação e Execução

Abaixo estão as instruções para rodar o projeto em seu ambiente local.

### Configuração Inicial

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ViniciusAlves03/WebVehicles.git
    cd WebVehicles
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e preencha com as credenciais do seu banco de dados MySQL, conforme utilizado no arquivo `src/db.js`:
    ```env
    DB_NAME=nome_do_banco
    DB_USER=seu_usuario
    DB_HOST=localhost
    DB_PASSWORD=sua_senha
    ```

### Rodando a Aplicação

1.  **Inicie o servidor:**
    Para rodar a aplicação, utilize o comando padrão do Node ou scripts definidos no `package.json`.
    ```bash
    npm start
    # ou, se estiver, usando nodemon
    npm run dev
    ```

2.  **Acesse a API:**
    O servidor iniciará e estará pronto para receber requisições.

## 🏗️ Estrutura do Projeto

```sh
src/
├── controllers/     # Lógica de controle (Client, Store, Vehicle)
├── models/          # Modelos do Sequelize (Client, Store, Vehicle)
├── routes/          # Definição das rotas da API
├── utils/           # Utilitários (Upload de imagem, Helpers de JWT)
│   ├── jwt/         # Scripts de criação, recuperação e verificação de tokens
│   └── image-upload.js
├── db.js            # Configuração e conexão com o Banco de Dados
└── app.js           # Ponto de entrada da aplicação
```

## 📖 Visão Geral da API (Endpoints)

Abaixo está um resumo dos principais endpoints disponíveis neste serviço.

### 🚗 Vehicles

Rotas para consultar despesas de forma global.

| Método | Rota (Path) | Descrição |
| :--- | :--- | :--- |
| ``POST`` | ``/vehicles/{type}/store/{id}`` |	Cadastra um veículo em uma loja (Requer Token + Imagens).
| ``GET``	| ``/vehicles``	| Lista todos os veículos cadastrados. |
| ``GET``	| ``/vehicles/category/{type}`` |	Lista veículos filtrados por categoria (tipo). |
| ``GET``	| ``/vehicles/search/{name}`` |	Busca veículos pelo nome. |
| ``GET``	| ``/vehicles/{id}`` |	Obtém detalhes de um veículo específico pelo ID. |
| ``GET``	| ``/vehicles/store/{id}`` |	Lista todos os veículos pertencentes a uma loja específica. |
| ``PUT``	| ``/vehicles/{id}/store/{store_id}`` |	Atualiza os dados de um veículo (Requer Token da Loja dona). |
| ``DELETE``	| ``/vehicles/{id}/store/{store_id}`` |	Remove um veículo (Requer Token da Loja dona). |

---

### 🏪 Stores

Rotas para gerenciamento de despesas vinculadas a um usuário específico.

| Método | Rota (Path) | Descrição |
| :--- | :--- | :--- |
| ``GET``	| ``/stores`` |	Lista todas as lojas cadastradas. |
| ``POST`` |	``/stores/register`` |	Registra uma nova loja no sistema. |
| ``POST`` |	``/stores/login`` |	Realiza login da loja e retorna o Token JWT. |
| ``GET`` |	``/stores/{id}`` |	Obtém dados públicos de uma loja específica. |
| ``PUT`` |	``/stores/{id}`` |	Atualiza dados cadastrais da loja (Requer Token). |
| ``DELETE`` |	``/stores/{id}`` |	Remove a loja e todos os seus veículos (Requer Token). |
---

### 👤 Clients

Rotas para gerenciamento de despesas vinculadas a um usuário específico.

| Método | Rota (Path) | Descrição |
| :--- | :--- | :--- |
| ``GET``	| ``/clients`` |	Lista todos os clientes cadastrados (Admin/Debug). |
| ``POST`` | ``/clients/register`` |	Registra um novo cliente no sistema. |
| ``POST`` | ``/clients/login`` |	Realiza login do cliente e retorna o Token JWT. |
| ``GET`` | ``/clients/{id}`` |	Obtém dados do perfil do cliente (Requer Token). |
| ``PUT`` | ``/clients/{id}`` |	Atualiza dados do perfil do cliente (Requer Token). |
| ``DELETE`` | ``/clients/{id}`` |	Remove a conta do cliente (Requer Token). |

---

## 🧑‍💻 Autor <a id="autor"></a>

<p align="center">Desenvolvido por Vinícius Alves <strong><a href="https://github.com/ViniciusAlves03">(eu)</a></strong>.</p>

---
