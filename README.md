
# Treinow-node-challenge

API REST de aluno-personal, para o processo seletivo da empresa TREINOW.


## INFO

A fim de deixar o projeto mais dinâmico para simular, o token de auth, a cada login é salvo no servidor, ou seja, não é necessário mandar no header das requisições

### 1- O campo name do cadastro é apenas para o first name. Minimo 3 letras, sem caracteres especiais, nem números.


### 2- O campo email possui formato xxxx@xxxx.com. A quantidade de "x" não interfere.


### 3- O campo document (CPF) aceita 11 números. Sem letras, nem caracteres especiais


### 4- O campo type define se o user será aluno ou personal. A string "0" é para Aluno, a string "1" é para Personal


### 5- O campo password aceita no mínimo 6 digitos, somente letras ou números.


### 6- Para fazer qualquer requisição tirando o "Register" e o "Login" do usuário, é preciso fazer o login.


### 7- Caso esteja logado com um user do tipo "Aluno" não será possível acessar os endpoints voltados ao tipo "Personal"


### 8- Algumas requisições necessitam que sejam feitas outras antes. Ex: Um aluno só pode registrar um treino se ele tiver um personal vinculado; e se o treino que ele quer cadastrar tenha sido criado pelo seu personal.


### 9- O token de autenticação, a fim de deixar mais dinamico, é salvo numa variável global do servidor, quando é feito o login, o usuário já fica autorizado a acessar os outros endpoints.


### 10- A biblioteca "nodemon" restarta o servidor sempre que há alguma mudança nos arquivos .ts, ou .json, ou seja, caso o usuário faça login e mexa no código, o token de autenticação será resetado. Ou seja, terá que realizar o login novamente.

## Funcionalidades

- Registro e Login de Usuários
- Vinculação de alunos com personais
- Criação e listagem de treinos pelos personais
- Uso desses treinos pelos alunos
- Módulo de avaliação de personais
- Exclusão da conta


## Variáveis de Ambiente

O servidor está hospedado na porta 3201, caso queira alterar, vá no arquivo .env, mude o valor de "PORT". O JWT_SECRET_KEY é a key de descriptografia do token, também pode ser alterada.

`PORT`

`JWT_SECRET_KEY`


## Funcionamento

Clone o projeto

```bash
  git clone https://github.com/danielmsdiaz/node-challenge-treinow.git
```

Pré-requisitos globais

```bash
  npm i -g nodemon typescript ts-node
```

Instale as dependências

```bash
  npm install
```

Instale a extensão SQlite Viewer (vsCode windows)

```bash
  CTRL + P e cole esse código => ext install qwtel.sqlite-viewer
```

Inicie o servidor

```bash
  npm run start-dev
```


## Documentação da API

### Requisições tipo "User"
#### Registra um usuário

```http
  POST /api/register
```

| key   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Mínimo 3 letras, sem caracteres especiais|
| `email` | `string` | **Obrigatório**. formato xxxx@xxxx.com. A quantidade de "x" não interfere. |
| `document` | `string` | **Obrigatório**. (CPF) aceita 11 números. Sem letras, nem caracteres especiais|
| `type` | `string` | **Obrigatório**. A string "0" é para Aluno, a string "1" é para Personal |
| `password` | `string` | **Obrigatório**.aceita no mínimo 6 digitos, somente letras ou números. |


#### Loga o usuário

```http
  POST /api/auth
```

| key   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Mínimo 3 letras, sem caracteres especiais|
| `email` | `string` | **Obrigatório**. formato xxxx@xxxx.com. A quantidade de "x" não 


### Requisições tipo "Personal"
#### Cria um treino

```http
  POST /api/personal/workout
```

| key   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `duration` | `string` | **Obrigatório**. Duração em minutos|
| `muscle` | `string` | **Obrigatório**. Músculo trabalhado
| `muscle` | `string` | **Obrigatório**. Data da criação. Formato: (AAAA-MM-DD) 

#### Faz o vínculo do personal com algum aluno

```http
  POST /api/personal/student
```

| key   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `duration` | `string` | **Obrigatório**. Somente ID's de user cujo "type" é "0", ou seja, Alunos|

#### Lista os treinos do personal

```http
  GET /api/personal/workout
```

### Requisições tipo "Aluno"
#### Registra o início de um treino criado pelo seu Personal

```http
  POST /api/store/workout
```

| key   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `date` | `string` | **Obrigatório**. Data do início. Formato: (AAAA-MM-DD) |
| `horario` | `string` | **Obrigatório**. Horário de início. Formato HH:MM
| `treino` | `string` | **Obrigatório**. ID de um treino criado pelo seu Personal 

#### Avalia seu personal

```http
  POST /api/personal/:personal_id/rating
```

| key   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `rate` | `string` | **Obrigatório**. Nota de 0 a 5|

| HEADER   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `personal_id` | `string` | **Obrigatório**. ID do seu personal|

#### Exclui sua conta

```http
  DEL /api/account/delete
```






## Stack utilizada

**Back-end:** Node, Express, Typescript e SQlite

