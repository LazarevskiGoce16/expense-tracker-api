import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelize: Sequelize;

if (process.env.DB_DIALECT === 'sqlite') {
    // SQLite configuration for Docker
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE || ':memory:',
        logging: false,
    });
} else {
    // SQL Server configuration for local development
    sequelize = new Sequelize({
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        // host: process.env.DB_HOST,
        // port: parseInt(process.env.DB_PORT || '1433'),
        dialect: "mssql",
        dialectOptions: {
            server: process.env.DB_HOST,
            options: {
                encrypt: process.env.DB_ENCRYPT === "true",
                trustServerCertificate: process.env.DB_TRUST_CERT === "true",
                instanceName: process.env.DB_INSTANCE || "SQLEXPRESS",
                // ...(process.env.DB_INSTANCE && { instanceName: process.env.DB_INSTANCE }),
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
}

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
