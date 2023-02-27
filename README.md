# node-challenge-treinow

### Pré-requisitos globais:
`npm i -g nodemon typescript ts-node`
### Após instalar os pré-requisitos
`npm install`
### Gerenciador de BDD
`Pressione CTRL + P, cole esse código => ext install qwtel.sqlite-viewer e pressione ENTER`
### Comando para rodar o projeto
`npm run start-dev`
### PORTA
`a porta do servidor está no arquivo .env, caso haja conflito, pode mudar lá o PORT, está configurado na 3201`

### Collections com os endpoints
`https://www.postman.com/security-cosmologist-49346345/workspace/treinow/collection/13848887-08ecf366-8f4a-4480-8255-f5f85429d15f?action=share&creator=13848887`

Obs: caso for usar o POSTMAN ou Insomnia, não use a versão web.

### Caso o collections com os endpoins não funcione, copie e cole os endpoints abaixo para testar:

`Obs: caso mande o body em formato json, os id's, os id's devem ser em formato de string!`
### Endpoints User -
`
{POST/REGISTER USER} - http://localhost:3201/api/register
{BODY/REGISTER USER} - Formato exemplo: {"name": "name", "email": "email@teste.com", "document": "12345678988", "type": "0", "password": "123456"}

{POST/LOG USER} - http://localhost:3201/api/auth
{BODY/LOG USER} - Formato exemplo: {"email": "email@teste.com", "password": "123456"}
`

### Endpoints Personal -
`
{POST/REGISTRAR TREINO} - http://localhost:3201/api/personal/workout
{BODY/REGISTER TREINO} - Formato exemplo: {"duration": "90", "muscle": "triceps", "date": "2023-02-23"}

{POST/REGISTRAR ALUNO} - http://localhost:3201/api/personal/student
{BODY/REGISTRAR ALUNO} - Formato exemplo: {"id": "2"}

{GET/LISTAR TREINOS} - http://localhost:3201/api/personal/workout
`

### Endpoints Aluno -
`
{POST/REGISTRAR TREINO} - http://localhost:3201/api/store/workout
{BODY/REGISTER TREINO} - Formato exemplo: {"date": "2023-02-25", "horario": "20:00", "treino": 1}

Obs: Um aluno só consegue registrar um treino se ele tiver sido criado pelo seu personal!

{POST/AVALIAR PERSONAL} - http://localhost:3201/api/personal/{{personal_id}}/rating
{BODY/AVALIAR PERSONAL} - Formato exemplo: {"rate": "4"}
{HEADER/AVALIAR PERSONAL} - Formato exemplo: {personal_id: 2}

{DELETE/DELETAR CONTA} - http://localhost:3201/api/account/delete

Obs: Esse endpoint de deletar é exclusivo para alunos!
`

### OBS:

`
### 1- O campo name do cadastro é apenas para o first name. Minimo 3 letras, sem caracteres especiais, nem números.


### 2- O campo email possui formato xxxx@xxxx.com. A quantidade de "x" não interfere.


### 3- O campo document (CPF) aceita 11 números. Sem letras, nem caracteres especiais


### 4- O campo type define se o user será aluno ou personal. A string "0" é para Aluno, a string "1" é para Personal


### 5- O campo password aceita no mínimo 6 digitos, somente letras ou números.


### 6- Para fazer qualquer requisição tirando o "Register" e o "Login" do usuário, é preciso fazer o login.


### 7- Caso esteja logado com um user do tipo "Aluno" não será possível acessar os endpoints voltados ao tipo "Personal"


### 8- Algumas requisições necessitam que sejam feitas outras antes. Ex: Para avaliar um personal é necessário que o aluno tenha um personal.


### 9- O token de autenticação, a fim de deixar mais dinamico, é salvo numa variável global do servidor, quando é feito o login, o usuário já fica autorizado a acessar os outros endpoints.


### 10- A biblioteca "nodemon" restarta o servidor sempre que há alguma mudança nos arquivos .ts, ou .json, ou seja, caso o usuário faça login e mexa no código, o token de autenticação será resetado. Ou seja, terá que realizar o login novamente.
`