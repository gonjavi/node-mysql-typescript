"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
// con patron singleton para evitar varaias instancias de clase
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
    static get instance() {
        // verifica si existe una instancia si no existe llama el constructor y lo inicializa
        // previene  creación de nuevas instancias
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
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
