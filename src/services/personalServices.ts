import { Training } from "../models/Training";
import database from "./sqlite/db";

// export const checkIfExistsTraining = (user: Training, cb: (row?: string) => void) => {
//     database.get("SELECT * FROM treinos WHERE document = ?", user.document, (err, row) => {
//         if (err) {
//             console.error(err.message);
//         } else if (!row) {
//             cb(row);
//             console.log('Não existe registro com o valor informado.');
//         } else {
//             cb(row);
//             console.log('Existe um registro com o valor informado:', row);
//         }
//     });
// }



