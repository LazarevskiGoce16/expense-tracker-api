import User from "./User";
import Expense from "./Expense";

User.hasMany(Expense, { 
    foreignKey: "userId", 
    as: "expenses" 
});

Expense.belongsTo(User, { 
    foreignKey: "userId", 
    as: "user" 
});

export { User, Expense };
