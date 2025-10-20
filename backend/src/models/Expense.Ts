import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ExpenseAttributes {
    id: number;
    userId: number;
    title: string;
    amount: number;
    category: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ExpenseCreationAttributes extends Omit<ExpenseAttributes, "id" | "createdAt" | "updatedAt"> {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
    public id!: number;
    public userId!: number;
    public title!: string;
    public amount!: number;
    public category!: string;
    public date!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "expenses",
        timestamps: true,
    }
);

export default Expense;
