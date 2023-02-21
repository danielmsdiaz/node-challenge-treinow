import sqlite3 from 'sqlite3'

const DBSOURCE = 'db.sqlite'

const SQL_USER_CREATE = `
    CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        document TEXT,
        type TEXT,
        password TEXT
    );`

const SQL_ALUNO_CREATE = `
    CREATE TABLE alunos (
        id INT PRIMARY KEY,
        user_id INT,
        personal_id INT,
        FOREIGN KEY (user_id) REFERENCES usuarios(id),
        FOREIGN KEY (personal_id) REFERENCES personais(id)
      );`

const SQL_PERSONAL_CREATE = `
    CREATE TABLE personais (
        id INT PRIMARY KEY,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES usuarios(id)
      );`

const SQL_TREINO_CREATE = `
    CREATE TABLE treinos (
        id INTEGER PRIMARY KEY,
        duration TEXT,
        muscle TEXT,
        date DATE,
        id_personal INTEGER,
        FOREIGN KEY(id_personal) REFERENCES personais(id)
      );`

const SQL_ALUNO_TREINO_CREATE = `
    CREATE TABLE horarios_treino (
        id INTEGER PRIMARY KEY,
        id_aluno INTEGER,
        id_treino INTEGER,
        horario TEXT,
        FOREIGN KEY(id_aluno) REFERENCES alunos(id)
        FOREIGN KEY(id_treino) REFERENCES treinos(id)
      );`

const SQL_AVALICAO_PERSONAL_CREATE = `
    CREATE TABLE avaliacao_personal (
        id INTEGER PRIMARY KEY,
        id_personal INTEGER,
        nota TEXT,
        FOREIGN KEY(id_personal) REFERENCES personais(id)
      );`

const SQL_TABLES_CREATE = SQL_USER_CREATE + SQL_ALUNO_CREATE + SQL_PERSONAL_CREATE + SQL_TREINO_CREATE + SQL_ALUNO_TREINO_CREATE + SQL_AVALICAO_PERSONAL_CREATE;

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.')
        database.run(SQL_TABLES_CREATE, (err) => {
            if (err) {
                // Possivelmente a tabela já foi criada
            } else {
                console.log('Tabela itens criada com sucesso.')
            }
        })
    }
})

export default database