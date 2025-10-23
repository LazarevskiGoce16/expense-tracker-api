# 🗄️ Database Inspection Guide

Quick guide to inspect your expense tracker database.

## 🐳 Docker Environment (SQLite)

### Access SQLite Database
```bash
# Copy database file to local machine
docker cp expense-tracker-backend:/app/data/database.sqlite ./database.sqlite
```

**Then open with:**
- **DB Browser for SQLite:** https://sqlitebrowser.org/ (Recommended)
- **DBeaver:** https://dbeaver.io/ (Professional)
- **VS Code SQLite Viewer** extension

---

## 💻 Local Development (SQL Server)

### Connection Details
- **Server:** `localhost\SQLEXPRESS`
- **Database:** `ExpenseTracker`
- **Authentication:** Windows Authentication

### Tools
1. **SQL Server Management Studio (SSMS)** - Full-featured GUI
2. **Azure Data Studio** - Lightweight, cross-platform

---

## 🔍 Database Schema

```sql
-- Users Table
Users: id, email, password, createdAt, updatedAt

-- Expenses Table  
Expenses: id, userId, title, amount, category, date, createdAt, updatedAt
```

---

## 🔧 Quick Commands

```bash
# Refresh database copy
docker cp expense-tracker-backend:/app/data/database.sqlite ./database.sqlite

# Backup database
docker cp expense-tracker-backend:/app/data/database.sqlite ./backup.sqlite

# Check container logs
docker logs expense-tracker-backend

# Restart containers
docker-compose -f docker-compose.simple.yml down
docker-compose -f docker-compose.simple.yml up
```

---

**Happy Database Exploring! 🎯**

### SQLite Commands
```sql
.tables                           # List tables
.schema Users                     # Show table structure
SELECT * FROM Users;              # View users
SELECT * FROM Expenses;           # View expenses
SELECT COUNT(*) FROM Expenses;    # Count records
.quit                            # Exit
```

---

## 💻 Local Development (SQL Server)

### Connection Details
- **Server:** `localhost\SQLEXPRESS`
- **Database:** `ExpenseTracker`
- **Authentication:** Windows Authentication

### Tools
1. **SQL Server Management Studio (SSMS)** - Full-featured GUI
2. **Azure Data Studio** - Lightweight, cross-platform

---

## 🔍 Database Schema

```sql
-- Users Table
Users: id, email, password, createdAt, updatedAt

-- Expenses Table  
Expenses: id, userId, title, amount, category, date, createdAt, updatedAt
```

---

## 🚀 Quick Debug Endpoint

Add to `backend/src/app.ts` for development:

```typescript
app.get('/debug/database', async (req, res) => {
    const stats = {
        users: await User.count(),
        expenses: await Expense.count(),
        totalAmount: await Expense.sum('amount')
    };
    
    const recentExpenses = await Expense.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [{ model: User, attributes: ['email'] }]
    });
    
    res.json({ stats, recentExpenses });
});
```

**Access:** `http://localhost:5000/debug/database`

---

## � Quick Commands

```bash
# Docker database backup
docker cp expense-tracker-backend:/app/data/database.sqlite ./backup.sqlite

# Check container logs
docker logs expense-tracker-backend

# Restart containers
docker-compose -f docker-compose.simple.yml down
docker-compose -f docker-compose.simple.yml up
```

---

**Happy Database Exploring! 🎯**