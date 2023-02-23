import { User } from '../../models/User'
import database from './db'

const UserRepository = {
    criar: (user: User, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO usuarios (name, email, document, type, password) VALUES (?, ?, ?, ?, ?)'
        const params = [user.name, user.email, user.document, user.type, user.password]
        console.log(params);
        database.run(sql, params, function(_err) {
            callback(this?.lastID)
        })
    },
}

export default UserRepository
