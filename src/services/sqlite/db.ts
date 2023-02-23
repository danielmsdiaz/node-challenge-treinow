import { table } from 'console'
import sqlite3 from 'sqlite3'

const DBSOURCE = 'treinow-db.sqlite'

const usuarios = `
    CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        document TEXT,
        type TEXT,
        password TEXT
    );`

const alunos = `
    CREATE TABLE alunos (
        id INT PRIMARY KEY,
        user_id INT,
        personal_id INT,
        FOREIGN KEY (user_id) REFERENCES usuarios(id),
        FOREIGN KEY (personal_id) REFERENCES personais(id)
      );`

const personais = `
    CREATE TABLE personais (
        id INT PRIMARY KEY,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES usuarios(id)
      );`

const treinos = `
    CREATE TABLE treinos (
        id INTEGER PRIMARY KEY,
        duration TEXT,
        muscle TEXT,
        date DATE,
        id_personal INTEGER,
        FOREIGN KEY(id_personal) REFERENCES personais(id)
      );`

const horarios_treino = `
    CREATE TABLE horarios_treino (
        id INTEGER PRIMARY KEY,
        id_aluno INTEGER,
        id_treino INTEGER,
        horario TEXT,
        FOREIGN KEY(id_aluno) REFERENCES alunos(id)
        FOREIGN KEY(id_treino) REFERENCES treinos(id)
      );`

const avaliacao_personal = `
    CREATE TABLE avaliacao_personal (
        id INTEGER PRIMARY KEY,
        id_personal INTEGER,
        nota TEXT,
        FOREIGN KEY(id_personal) REFERENCES personais(id)
      );`

const tablesArray: string[] = [usuarios, alunos, personais, treinos, horarios_treino, avaliacao_personal];

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.');
        tablesArray.forEach(table => {
            database.run(table, (err) => {
                if (err) {
                    console.log(err);
                    // Possivelmente a tabela já foi criada
                } else {
                    console.log(`Tabela ${table} criada com sucesso.`)
                }
            })
        });
    }
})

export default database