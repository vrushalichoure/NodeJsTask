import * as mysql from 'mysql';


const pool = mysql.createConnection({
    host: 'localhost',
    database: 'demodb',
    user: 'root',
    password: 'root'
});

class Database {

    constructor() {
        this.getConnection();
    }

    getConnection() {
        pool.connect((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                console.log('Db-Connected');
                connection.release();
            }
            return;
        });
    }


    static query(sql, args = null) {
        return new Promise((resolve, reject) => {
            pool.query(sql, args, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static Execute(procedureName, args = null) {
        return this.queryDB(this.formatProcedure(procedureName, args), args);
    }

    static formatProcedure(
        procedureName,
        args,
        result = false
    ) {
        let procedure = `call ${procedureName}(`;
        if (args != null) {
            args.forEach((value, index) => {
                procedure += index === args.length - 1 ? `?` : `?, `;
            });
        }

        if (result) {
            procedure += `, @result);select @result`;
        } else {
            procedure += `);`;
        }
        return procedure;
    }

    static queryDB(sql, args = null) {
        return new Promise((resolve, reject) => {
            pool.query(sql, args, (err, rows, cols) => {
                if (err) return reject(err);
                rows = this.removeByKey(rows, {
                    key: 'protocol41'
                });
                const result =
                    rows.length > 1
                        ? JSON.parse(JSON.stringify(rows))
                        : JSON.parse(JSON.stringify(rows[0]));
                resolve(result);
            });
        });
    }

    static removeByKey(array, params) {
        if (array.length) {
            array.some(function (item, index) {
                return array[index][params.key] ? !!array.splice(index, 1) : false;
            });

            return array;
        }
        return [{ result: 1 }];
    }

}
export default Database;
