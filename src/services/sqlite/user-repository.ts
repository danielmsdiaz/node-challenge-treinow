import { User } from '../../models/User'
import { checkIfExists, checkLoginCredentials } from '../userServices'
import database from './db'
import * as crypt from "../../utils/crypt";

const UserRepository = {
    criar: (user: User, callback: (id?: number) => void) => { 
        checkIfExists(user, async (row) => {
            if (!row) {
                const hashedPassword = await crypt.hashPassword(user.password);
                const sql = 'INSERT INTO usuarios (name, email, document, type, password) VALUES (?, ?, ?, ?, ?)'
                const params = [user.name, user.email, user.document, user.type, hashedPassword];
                database.run(sql, params, function (_err) {
                    callback(this?.lastID)
                });
            }
            else{
                callback(-1);
            }
        });
    },
    logar: (login: any, callback: (id?: string) => void) => {
        checkLoginCredentials(login, (row) => {
           callback(row);
        });
    }

}

export default UserRepository
