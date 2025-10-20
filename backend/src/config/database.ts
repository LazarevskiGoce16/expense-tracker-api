import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: "mssql",
    dialectOptions: {
        server: process.env.DB_HOST,
        options: {
            encrypt: process.env.DB_ENCRYPT === "true",
            trustServerCertificate: process.env.DB_TRUST_CERT === "true",
            instanceName: process.env.DB_INSTANCE || "SQLEXPRESS",
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
});

export const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection successfully established!");
        return sequelize;
    } catch (error) {
        console.error("Unable to connect to the database:" + error);
        throw error;
    }
};

export default sequelize;
