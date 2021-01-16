import mysql from 'mysql';
 
// con patron singleton para evitar varaias instancias de clase
export default class MySQL {
  private static _instance: MySQL;

  cnn: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    console.log('clase iniacializada');

    this.cnn = mysql.createConnection({
      host: 'localhost',
      user: 'usuario',
      password: '1234',
      database: 'node_db'
    });  
    
    this.conectarDB();
  }

  public static get instance() {
    // verifica si existe una instancia si no existe llama el constructor y lo inicializa
    // previene  creación de nuevas instancias
    return this._instance || (this._instance = new this());
  }

  static ejecutarQuery(query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log('Error en query');
        console.log(err);
        return callback(err);
      }
      if (results.length === 0) {
        callback('El registro solicitado no existe');
      } else {
        callback(null, results); 
      }      
    });
  }

  // metodo privado solo se accede desde la misma clase
  private conectarDB() {
    this.cnn.connect((err: mysql.MysqlError) => {

      if (err) {
        console.log(err.message);
        return;
      }

      this.conectado = true;
      console.log('Base de datos online');
    });
  }
}