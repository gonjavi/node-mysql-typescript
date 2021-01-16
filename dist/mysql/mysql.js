"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// con patron singleton
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('clase iniacializada');
        this.cnn = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'usuario',
            password: '1234',
            database: 'node_db'
        });
        this.conectarDB();
    }
    // metodo privado solo se accede desde la misma clase
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos online');
        });
    }
}
exports.default = MySQL;
