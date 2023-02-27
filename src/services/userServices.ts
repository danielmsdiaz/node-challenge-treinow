import { User } from "../models/User";
import database from "./sqlite/db";
import * as EmailValidator from 'email-validator';
import * as Validator from "../utils/validator";
import * as crypt from "../utils/crypt";

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

    database.get("SELECT * FROM usuarios WHERE email = ?", [user.email], async (err, row) => {
        if (err) {
            console.error(err.message);
        } else if (!row) {
            cb(row);
            console.log('Não existe registro com o valor informado.');
        } else {
            const result = await crypt.comparePassword(user.password, row.password);
            if(result){
                cb(row.id);
                console.log('Existe um registro com o valor informado:', row);
            }
            else{
                cb("false");
            }
        }
    });
}

export const validateBody = (user: User, cb: (arr?: string[]) => void) => {
    const arrValues = Object.entries(user);
    const arrTemp: string[] = [];

    arrValues.forEach(element => {
        if (element[0] == "name" && !Validator.isValidFirstname(element[1])) {
            arrTemp.push(`${element[0]} inváldo, deve ter no mínimo 3 carateres, sem números, nem caracteres especiais`);
        }
        else if (element[0] == "email" && !EmailValidator.validate(element[1])) {
            arrTemp.push(`${element[0]} inválido, formato desejado: xxxx@xxxx.com`);
        }
        else if (element[0] == "document" && !Validator.isValidDocument(element[1])) {
            arrTemp.push(`${element[0]} inválido, deve ter 11 caracteres!`);
        }
        else if (element[0] == "type" && (element[1] !== "0" && element[1] !== "1")) {
            arrTemp.push(`${element[0]} diferente de 1 ou 0`);
        }
        else if (element[0] == "password" && !Validator.isValidPassword(element[1])) {
            arrTemp.push(`${element[0]} inválido, deve ter no mínimo 6 caracteres, sem dígitos especiais`);
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
    if(id === "false"){
        cb("Inexistente");
    }
    else{
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
