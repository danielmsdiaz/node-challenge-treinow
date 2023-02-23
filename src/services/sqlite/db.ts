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

const mapQueries = new Map<string, string>([
    ["usuarios", usuarios],
    ["alunos", alunos],
    ["personais", personais],
    ["treinos", treinos],
    ["horarios_treino", horarios_treino],
    ["avaliacao_personal", avaliacao_personal]
]);

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err
    } else {
        console.log('Base de dados conectada com sucesso.');
        mapQueries.forEach((element, key) => {
            database.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${key}'`, (err, row) => {
                if (err) {
                    console.log(err.message);
                } else if (row) {

                } else {
                    database.run(element, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Tabela ${key} criada com sucesso.`)
                        }
                    })
                }
            });
        });

        try {
            const nomeDoTrigger = 'inserir_usuario';
            const sql = `SELECT name FROM sqlite_master WHERE type='trigger' AND name='${nomeDoTrigger}'`;

            database.get(sql, (err, row) => {
                if (err) {
                    throw err;
                }
                if (row) {
                    console.log(`O trigger ${nomeDoTrigger} existe no banco de dados.`);
                } else {
                    console.log(`O trigger ${nomeDoTrigger} não existe no banco de dados.`);
                    database.run(`CREATE TRIGGER inserir_usuario AFTER INSERT ON usuarios
                                        BEGIN
                                            INSERT INTO alunos (user_id)
                                            SELECT id FROM usuarios WHERE type = '0' AND id = NEW.id;
    
                                            INSERT INTO personais (user_id)
                                            SELECT id FROM usuarios WHERE type = '1' AND id = NEW.id;
                                        END;`);
                }
            });
        }
        catch (err) {
            console.log(err);
        }

    }
})

export default database