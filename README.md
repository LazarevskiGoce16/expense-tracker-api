# 💰 Expense Tracker Application

A full-stack expense tracking application built with modern web technologies. Track your expenses, categorize them, and get insights into your spending patterns with beautiful charts and reports.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQL Server](https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 🌟 Features

### 💳 Expense Management
- ✅ Add, edit, and delete expenses
- ✅ Categorize expenses (Food, Transport, Entertainment, Shopping, Bills, Health, Education, Travel, Other)
- ✅ Set amounts and dates for each expense
- ✅ Real-time expense tracking

### 🔍 Advanced Filtering & Search
- ✅ Search expenses by title (partial text matching)
- ✅ Filter by category
- ✅ Filter by date range (from/to dates)
- ✅ Clear all filters to show all expenses
- ✅ Combined filtering (multiple filters at once)

### 📊 Reports & Analytics
- ✅ Monthly spending charts using Recharts
- ✅ Category-wise expense breakdown
- ✅ Total spending summary
- ✅ Visual spending patterns

### 🔐 User Authentication
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Secure password hashing with bcrypt

### 📱 User Interface
- ✅ Professional and responsive design
- ✅ Clean, modern CSS styling
- ✅ Intuitive navigation
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Pagination for large datasets

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Sequelize** - ORM for database operations
- **SQLite** - Lightweight database (Docker) / **SQL Server Express** - Database (local dev)
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling system

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server (production)
- **ESLint** - Code linting
- **Nodemon** - Development auto-reload

## 📁 Project Structure

```
expense-tracker-api/
├── 📁 backend/                     # Backend API server
│   ├── 📁 src/
│   │   ├── 📄 app.ts              # Express app configuration
│   │   ├── 📁 config/
│   │   │   └── 📄 database.ts     # Database connection setup
│   │   ├── 📁 controllers/
│   │   │   ├── 📄 authController.ts    # Authentication logic
│   │   │   └── 📄 expenseController.ts # Expense CRUD operations
│   │   ├── 📁 middleware/
│   │   │   └── 📄 auth.ts         # JWT authentication middleware
│   │   ├── 📁 models/
│   │   │   ├── 📄 User.ts         # User model
│   │   │   ├── 📄 Expense.ts      # Expense model
│   │   │   └── 📄 index.ts        # Model associations
│   │   └── 📁 routes/
│   │       ├── 📄 authRoutes.ts   # Authentication routes
│   │       └── 📄 expenseRoutes.ts # Expense routes
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 Dockerfile              # Production Docker image
│   └── 📄 .env.docker             # Docker environment variables
│
├── 📁 frontend/                    # React frontend application
│   ├── 📁 src/
│   │   ├── 📄 App.tsx             # Main App component
│   │   ├── 📄 main.tsx            # React app entry point
│   │   ├── 📁 components/
│   │   │   ├── 📁 Auth/           # Authentication components
│   │   │   │   ├── 📄 Login.tsx
│   │   │   │   ├── 📄 Register.tsx
│   │   │   │   └── 📄 ProtectedRoute.tsx
│   │   │   ├── 📁 Common/         # Reusable components
│   │   │   │   ├── 📄 ErrorMessage.tsx
│   │   │   │   ├── 📄 LoadingSpinner.tsx
│   │   │   │   └── 📄 Toast.tsx
│   │   │   ├── 📁 Expenses/       # Expense-related components
│   │   │   │   ├── 📄 ExpenseForm.tsx
│   │   │   │   ├── 📄 ExpenseList.tsx
│   │   │   │   ├── 📄 ExpenseItem.tsx
│   │   │   │   └── 📄 ExpenseFilter.tsx
│   │   │   ├── 📁 Layout/         # Layout components
│   │   │   │   ├── 📄 Layout.tsx
│   │   │   │   └── 📄 Navbar.tsx
│   │   │   └── 📁 Reports/        # Analytics components
│   │   │       ├── 📄 Summary.tsx
│   │   │       └── 📄 MonthlyChart.tsx
│   │   ├── 📁 context/
│   │   │   └── 📄 AuthContext.tsx # Authentication context
│   │   ├── 📁 hooks/
│   │   │   ├── 📄 useExpenses.ts  # Expense management hook
│   │   │   └── 📄 useToast.ts     # Toast notifications hook
│   │   ├── 📁 services/
│   │   │   └── 📄 api.ts          # API service layer
│   │   ├── 📁 styles/             # CSS styling system
│   │   │   ├── 📄 auth.css
│   │   │   ├── 📄 expenses.css
│   │   │   ├── 📄 forms.css
│   │   │   ├── 📄 globals.css
│   │   │   └── 📄 layout.css
│   │   ├── 📁 types/
│   │   │   └── 📄 index.ts        # TypeScript type definitions
│   │   └── 📁 utils/
│   │       ├── 📄 formatters.ts   # Utility functions
│   │       └── 📄 validation.ts   # Form validation helpers
│   ├── 📄 package.json
│   ├── 📄 vite.config.ts
│   ├── 📄 Dockerfile              # Production Docker image
│   ├── 📄 nginx.conf              # Nginx configuration
│   └── 📄 .env.docker             # Docker environment variables
│
├── 📁 docs/                       # Documentation
├── 📄 docker-compose.simple.yml   # Docker setup with SQLite
├── 📄 README.md                   # This file
├── 📄 README.docker.md            # Docker setup guide
└── 📄 DATABASE_INSPECTION.md      # Database access guide
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Microsoft SQL Server Express** (for local development) or **Docker** (recommended)
- **Git**

### Option 1: Traditional Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/LazarevskiGoce16/expense-tracker-api.git
cd expense-tracker-api
```

#### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.docker .env
# Edit .env with your database credentials

# Start the backend
npm run dev
```

#### 3. Frontend Setup
```bash
cd frontend
npm install

# Start the frontend
npm run dev
```

#### 4. Database Setup
- Install Microsoft SQL Server Express
- Create a database named `ExpenseTracker`
- Update database credentials in backend `.env` file

### Option 2: Docker Setup (Recommended)

#### Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/LazarevskiGoce16/expense-tracker-api.git
cd expense-tracker-api

# Run with Docker Compose (SQLite database)
docker-compose -f docker-compose.simple.yml up --build
```

Access the application at: http://localhost

For detailed Docker setup instructions, see [README.docker.md](./README.docker.md)

## 🌐 API Endpoints

### Authentication
```http
POST /auth/register          # Register new user
POST /auth/login            # User login
```

### Expenses
```http
GET    /expenses            # Get all expenses (with filtering)
POST   /expenses            # Create new expense
GET    /expenses/:id        # Get expense by ID
PUT    /expenses/:id        # Update expense
DELETE /expenses/:id        # Delete expense
GET    /expenses/summary    # Get expense summary
```

### Query Parameters for GET /expenses
- `search` - Search by expense title
- `category` - Filter by category
- `from` - Start date (YYYY-MM-DD)
- `to` - End date (YYYY-MM-DD)
- `page` - Page number for pagination
- `limit` - Items per page

Example:
```http
GET /expenses?search=coffee&category=food&from=2024-01-01&to=2024-12-31&page=1&limit=10
```

## 🎯 Usage Guide

### 1. User Registration/Login
- Navigate to the registration page
- Create an account with email and password
- Login with your credentials

### 2. Adding Expenses
- Click "Add New Expense" button
- Fill in the expense details:
  - Title (e.g., "Coffee at Starbucks")
  - Amount (e.g., 4.50)
  - Category (select from dropdown)
  - Date (defaults to today)
- Click "Add Expense" to save

### 3. Managing Expenses
- View all expenses in the main list
- Edit expenses by clicking the edit button
- Delete expenses with the delete button
- Use pagination to navigate through many expenses

### 4. Filtering & Search
- Use the search bar to find expenses by title
- Filter by category using the dropdown
- Set date ranges with from/to date pickers
- Click "Apply Filters" to filter results
- Click "Clear Filters" to reset and show all expenses

### 5. Reports & Analytics
- Navigate to the Reports section
- View monthly spending charts
- See category breakdown
- Analyze spending patterns over time

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database Configuration (Local Development - SQL Server)
DB_HOST=localhost
DB_PORT=1433
DB_NAME=ExpenseTracker
DB_USER=sa
DB_PASSWORD=your_password
DB_ENCRYPT=false
DB_TRUST_CERT=true

# For Docker deployment, SQLite is used automatically

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### Frontend
- API URL is configured in `src/services/api.ts`
- Default: `http://localhost:5000` for both local and Docker development

## 🚦 Available Scripts

### Backend
```bash
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server
npm run lint        # Run ESLint
npm test           # Run tests
```

### Frontend
```bash
npm run dev         # Start Vite development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🐳 Docker Commands

```bash
# Production build (SQLite)
docker-compose -f docker-compose.simple.yml up --build

# Run in background
docker-compose -f docker-compose.simple.yml up -d

# Stop services
docker-compose -f docker-compose.simple.yml down

# View logs
docker-compose -f docker-compose.simple.yml logs [service-name]

# Rebuild specific service
docker-compose -f docker-compose.simple.yml build [service-name]
```

## 🧪 Testing

The application has been thoroughly tested with:
- ✅ User registration and authentication
- ✅ Expense CRUD operations
- ✅ Filtering and search functionality
- ✅ Data persistence
- ✅ Responsive design across devices
- ✅ Error handling and validation

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Input Validation** - Comprehensive input sanitization
- **CORS Protection** - Configured cross-origin policies
- **Helmet Security** - Security headers and protection
- **SQL Injection Prevention** - Sequelize ORM parameterized queries

## 🚀 Deployment

### Production Checklist
- [ ] Update JWT_SECRET with a strong random key
- [ ] Configure production database credentials
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL
- [ ] Set up proper CORS origins
- [ ] Configure database backup strategy
- [ ] Set up monitoring and logging
- [ ] Configure reverse proxy (Nginx)

### Deployment Options
1. **Docker Deployment** - Use the provided Docker files
2. **Cloud Platforms** - Deploy to AWS, Azure, or Google Cloud
3. **VPS Deployment** - Traditional server deployment
4. **Container Orchestration** - Kubernetes deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Goce Lazarevski**
- GitHub: [@LazarevskiGoce16](https://github.com/LazarevskiGoce16)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community for the robust backend framework
- Microsoft for SQL Server Express
- Recharts for beautiful data visualization
- All open-source contributors who made this project possible

## 📞 Support

If you have any questions or need help with the application:

1. Check the [Docker Setup Guide](./README.docker.md) for containerization help
2. See [Database Inspection Guide](./DATABASE_INSPECTION.md) for database access
3. Review the API documentation above
4. Open an issue on GitHub
5. Contact the author

---

**Happy Expense Tracking! 💰📊**