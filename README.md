# Agenda Clientes Angular 17

## Requisitos

Certifique-se de ter as seguintes dependências instaladas em sua máquina:

- [Node.js](https://nodejs.org/)

## Executando

- Clone este repositório:

    ```bash
    git clone https://github.com/jnvbzs/agenda-clientes.app.git
    ```

- Navegue até o diretório do projeto:

    ```bash
    cd agenda-clientes.app
    ```

## Com docker

- Construa a imagem Docker:

    ```bash
    docker build -t agenda.app .
    ```
    
- Execute o contêiner Docker:

    ```bash
    docker run -p 4201:4200 agenda.app
    ```
    
Agora, você pode acessar a aplicacao em `http://localhost:4201`.

## Localmente

- Instale as dependências da aplicação

    ```bash
    npm install
    ```

- Inicie a aplicação com o npm

    ```bash
    npm start
    ```
    
- Inicie o json-server

    ```bash
    npm run start:json-server
    ```
    
Agora, você pode acessar a aplicacao em `http://localhost:4200` e o json-server em `http://localhost:3000`.
