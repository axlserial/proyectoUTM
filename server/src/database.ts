import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);
pool.getConnection()
	.then((connection: any) => {
		pool.releaseConnection(connection);
		console.log("Conexión exitosa con la base de datos");
	});

export default pool;