import { User } from "../models/User";
import database from "./sqlite/db";

export const checkIfExists = (user: User, cb: (row?: string) => void) => {
    database.get("SELECT * FROM usuarios WHERE document = ? OR email = ?", [user.document, user.email], (err, row) => {
        if (err) {
            console.error(err.message);
        } else if (!row) {
            cb(row);
            console.log('Não existe registro com o valor informado.');
        } else {
            cb(row);
            console.log('Existe um registro com o valor informado:', row);
        }
    });
}

export const checkLoginCredentials = (user: User, cb: (row?: string) => void) => {
    database.get("SELECT * FROM usuarios WHERE email = ? AND password = ?", [user.email, user.password], (err, row) => {
        if (err) {
            console.error(err.message);
        } else if (!row) {
            cb(row);
            console.log('Não existe registro com o valor informado.');
        } else {
            cb(row.id);
            console.log('Existe um registro com o valor informado:', row);
        }
    });
}

export const validateBody = (user: User, cb: (arr?: string[]) => void) => {
    const arrValues = Object.entries(user);
    const arrTemp: string[] = [];

    arrValues.forEach(element => {
        if (element[0] == "name" && element[1].length < 2) {
            arrTemp.push(`${element[0]} com menos de 2 caracteres`);
        }
        else if (element[0] == "type" && (element[1] !== "0" && element[1] !== "1")) {
            arrTemp.push(`${element[0]} diferente de 1 ou 0`);
        }
        else if (element[0] == "password" && element[1].length < 6) {
            arrTemp.push(`${element[0]} com menos de 6 caracteres`);
        }
    });

    cb(arrTemp);
}

export const checkUserFields = (user: User, cb: (row?: string | boolean | string[]) => void) => {
    const arrValues = Object.entries(user);
    let tempArr: string[] = [];

    arrValues.forEach(element => {
        if (!element[0] || !element[1]) {
            tempArr.push(element[0]);
            return;
        }
    });

    if (tempArr.length == 0) {
        cb(true);
    }
    else {
        cb(tempArr[0]);
    }
}

export const checkUserType = (id: string, cb: (row?: string | boolean) => void) => {
    database.get("SELECT type FROM usuarios WHERE id = ?", parseInt(id), (err, row) => {
        if (err) {
            console.error(err.message);
        } else if (!row) {
            console.log('Não existe registro com o valor informado.');
        } else {
            cb(row.type);
        }
    });
}

export const closeAccount = (id: string, cb: (row?: any) => void) => {
    const sql = `DELETE FROM usuarios WHERE id = ?`
    const params = [id];

    database.run(sql, params, function (_err) {
        if (_err) {
            cb(_err)
        }
        else {
            cb(true);
        }
    });
}
