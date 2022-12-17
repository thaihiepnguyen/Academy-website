import knexObj from "knex";

export default knexObj({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    //password: "1234",
    //database: "ecdb_c",
    //password: reallyStrongPwd123
    password: "root",
    database: "academy-db"
  },
});
