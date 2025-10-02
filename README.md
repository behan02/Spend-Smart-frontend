# 💰 SpendSmart - Personal Finance Management System

SpendSmart is a comprehensive personal finance management application built with React, TypeScript, and Material-UI. It helps users track expenses, manage budgets, set financial goals, and generate detailed financial reports.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Material-UI](https://img.shields.io/badge/MUI-7.0.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.1-purple)

## ✨ Features

### 👤 User Management

- **User Authentication**: Secure login and registration system
- **Password Recovery**: Forgot password and reset password functionality
- **Email Verification**: Email verification for new accounts
- **Admin Portal**: Separate admin login and management system

### 📊 Dashboard

- **Overview Cards**: Quick view of financial summary
- **Interactive Charts**: Bar graphs and pie charts for expense visualization
- **Budget Tracking**: Monitor budget usage and spending patterns
- **Goal Progress**: Track progress towards financial goals
- **Recent Transactions**: View latest transaction activities

### 💸 Transaction Management

- **Add Transactions**: Record income and expenses
- **Category Management**: Organize transactions by 43+ predefined categories
- **Transaction History**: View and filter transaction records
- **Search & Filter**: Find specific transactions quickly

### 🎯 Goal Management

- **Create Goals**: Set financial goals with target amounts and deadlines
- **Track Progress**: Monitor goal completion with visual progress bars
- **Savings Records**: Add and manage saving records for each goal
- **Goal Details**: Detailed view of individual goals with history

### 💰 Budget Management

- **Create Budgets**: Set monthly budgets for different categories
- **Budget Tracking**: Monitor spending against budget limits
- **Category Budgets**: Detailed budget breakdown by category
- **Budget Alerts**: Visual indicators for budget utilization

### 📈 Report Generation

- **Financial Reports**: Generate comprehensive financial reports
- **Date Range Selection**: Custom date range for report generation
- **Export Options**: Export reports as PDF or CSV
- **Visual Analytics**: Charts and graphs for better insights
- **Monthly Breakdown**: Detailed monthly expense analysis

### ⚙️ Settings

- **Profile Management**: Update user profile information
- **Preferences**: Customize application settings

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/behan02/Spend-Smart-frontend.git
cd Spend-Smart-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:5173
```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.0** - UI library
- **TypeScript 5.7.2** - Type-safe JavaScript
- **Vite 6.3.1** - Build tool and dev server

### UI Framework

- **Material-UI 7.0.2** - Component library
- **@mui/icons-material** - Icon components
- **@emotion/react & @emotion/styled** - CSS-in-JS styling

### Routing & Forms

- **React Router DOM 7.5.1** - Client-side routing
- **React Hook Form 7.60.0** - Form management and validation

### Charts & Visualization

- **@mui/x-charts 7.27.1** - Material-UI charts
- **Recharts 3.1.0** - Composable charting library

### Data Handling

- **Axios 1.10.0** - HTTP client
- **date-fns 2.29.3** - Date utility library
- **Day.js 1.11.13** - Date manipulation

### Reports & Export

- **jsPDF 3.0.1** - PDF generation
- **jspdf-autotable 5.0.2** - PDF table generation
- **html2canvas 1.4.1** - Screenshot/canvas rendering

### Notifications

- **Notistack 3.0.2** - Toast notifications

## 📁 Project Structure

```
src/
├── api/                    # API service configurations
│   ├── budgetApi.ts
│   ├── categoryApi.ts
│   ├── config.ts
│   ├── goalApi.ts
│   └── transactionApi.ts
├── assets/                 # Static assets
│   ├── categoryIcons/      # Category icon definitions
│   ├── images/            # Images and logos
│   └── styles/            # Theme configuration
├── components/            # Reusable components
│   ├── AdminLoginComponents/
│   ├── AdminRegisterComponents/
│   ├── Budget/
│   ├── DashboardComponents/
│   ├── GoalDetailsPageComponents/
│   ├── GoalsPageComponents/
│   ├── ReportComponents/
│   ├── Transaction/
│   ├── footer/
│   ├── header/
│   └── sidebar/
├── context/               # React Context providers
│   ├── GoalContext.tsx
│   └── UserContext.tsx
├── pages/                 # Page components
│   ├── AdminLogin/
│   ├── AdminRegister/
│   ├── Budgets/
│   ├── Dashboard/
│   ├── Goals/
│   ├── Report/
│   ├── Transaction/
│   ├── UserLogin/
│   ├── UserRegister/
│   └── UserSettings/
├── services/              # Business logic services
│   ├── budgetService.ts
│   ├── GoalDetailsService.ts
│   ├── goalService.ts
│   └── savingRecordService.ts
├── types/                 # TypeScript type definitions
│   └── budgetTypes.ts
├── utils/                 # Utility functions
│   └── categoryUtils.ts
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## 🎨 Features in Detail

### Category Icons

The application includes 43+ predefined categories including:

- **Income**: Salary, Business, Freelance, Investments, etc.
- **Expenses**: Food, Transportation, Entertainment, Healthcare, etc.
- **Utilities**: Electricity, Water, Internet, Phone, etc.
- **Personal**: Shopping, Education, Fitness, etc.

### User Routes

- `/` - User Login
- `/register` - User Registration
- `/dashboard` - Main Dashboard
- `/report` - Report Overview
- `/goals` - Goals Management
- `/goals/:id` - Goal Details
- `/transaction` - Transaction Management
- `/budget` - Budget Overview
- `/budgets/:id` - Budget Details
- `/forgetpassword` - Password Recovery
- `/resetpassword` - Reset Password
- `/verify-email` - Email Verification

### Admin Routes

- `/admin/login` - Admin Login
- `/admin/register` - Admin Registration
- `/admin/forgetpassword` - Admin Password Recovery
- `/admin/resetpassword` - Admin Reset Password
- `/admin/verification` - Admin Email Verification

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_backend_api_url
```

### Theme Customization

The application uses Material-UI theming. Customize the theme in:

```
src/assets/styles/theme.ts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Authors

- **behan02** - [GitHub Profile](https://github.com/behan02)

## 🐛 Known Issues

- 7 security vulnerabilities detected (1 critical, 4 high, 2 low)
- Run `npm audit fix` to address vulnerabilities

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Built with ❤️ using React, TypeScript, and Material-UI
