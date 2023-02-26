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

### Caso o collections com os endpoins não funcione:
### Endpoints User -
`
{POST/REGISTER USER} - http://localhost:3201/api/register
{BODY/REGISTER USER} - Formato exemplo: {name: "name", email: "email", document: 123, type: "0", password: password}

{POST/LOG USER} - http://localhost:3201/api/auth
{BODY/LOG USER} - Formato exemplo: {email: "email", password: "password"}
`

### Endpoints Personal -
`
{POST/REGISTRAR TREINO} - http://localhost:3201/api/personal/workout
{BODY/REGISTER TREINO} - Formato exemplo: {duration: 90, muscle: "triceps", date: 2023-02-23}

{POST/REGISTRAR ALUNO} - http://localhost:3201/api/personal/student
{BODY/REGISTRAR ALUNO} - Formato exemplo: {id: 2}

{GET/LISTAR TREINOS} - http://localhost:3201/api/personal/workout
`

### Endpoints Aluno -
`
{POST/REGISTRAR TREINO} - http://localhost:3201/api/store/workout
{BODY/REGISTER TREINO} - Formato exemplo: {date: 2023-02-25, horario: 20:00, treino: 1}

Obs: Um aluno só consegue registrar um treino se ele tiver sido criado pelo seu personal!

{POST/AVALIAR PERSONAL} - http://localhost:3201/api/personal/{{personal_id}}/rating
{BODY/AVALIAR PERSONAL} - Formato exemplo: {rate: 4}
{HEADER/AVALIAR PERSONAL} - Formato exemplo: {personal_id: 2}

{DELETE/DELETAR CONTA} - http://localhost:3201/api/account/delete

Obs: Esse endpoint de deletar é exclusivo para alunos!
`