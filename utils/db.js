import knexObj from "knex";

export default knexObj({
	client: "mysql2",
	connection: {
		host: "127.0.0.1",
		port: 3306,
		user: "root",
		database: "academy-db",
		password: "root",
		//password: "1234",
		//reallyStrongPwd123
	},
});
