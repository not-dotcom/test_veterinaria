import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",  
    database: "pernvet",
    password: "hola1234",
    port: 5433,

});

export default pool;