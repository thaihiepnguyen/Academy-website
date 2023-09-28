import knexService from "knex";

const knex = knexService({
	client: "mysql2",
	connection: {
		host: "127.0.0.1",
		port: 3306,
		user: "root",
		password: "root",
		//reallyStrongPwd123
		database: "academy-db",
	},
});

export default knex;
