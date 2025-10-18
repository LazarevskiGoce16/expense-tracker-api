import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME || "expense_tracker",
    username: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "1433"),
    dialect: "mssql",
    dialectOptions: {
        options: {
            encrypt: process.env.DB_ENCRYPT === 'true',
            trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
            enableArithAbort: true,
        },
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection successfully established!");
        return sequelize;
    } catch (error) {
        console.error("Unable to connect to the database: " + error);
        throw error;
    }
};

export default sequelize;
