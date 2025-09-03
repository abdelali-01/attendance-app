# 📚 Attendance Management System

A comprehensive digital attendance tracking system designed for educational institutions, replacing traditional paper-based attendance management with a modern, efficient, and user-friendly solution.

## 🌟 Overview

This application simplifies student attendance management by providing:
- **Digital attendance tracking** for teachers and students
- **Real-time attendance monitoring** with WebSocket support
- **Automated attendance mark calculations**
- **Subscription-based plans** with different feature tiers
- **Email notifications and reminders**
- **Comprehensive reporting system**
- **Multi-role access** (Teachers and Students)

##  Features

### Core Features
- ✅ **Class Management**: Create, update, and manage multiple classes
- ✅ **Student Management**: Add students to classes with unique matricule numbers
- ✅ **Attendance Tracking**: Mark attendance and absences in real-time
- ✅ **Automatic Calculations**: Calculate attendance marks based on absences
- ✅ **Class Codes**: Generate shareable codes for students to join classes
- ✅ **Real-time Updates**: WebSocket integration for live attendance updates
- ✅ **Statistics Dashboard**: View attendance statistics and trends
- ✅ **Reports System**: Generate and share attendance reports

### Advanced Features
- 🔐 **Authentication System**: Secure login with email verification
- 📧 **Email Notifications**: Automated email reminders and notifications
- 💳 **Payment Integration**: Chargily payment gateway for subscriptions
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔄 **Session Management**: Secure session handling with Passport.js
- ️ **Security**: XSS protection, rate limiting, and data sanitization

### Subscription Plans
- **Free Plan**: 1 class, 15 students, basic features
- **Standard Plan**: 3 classes, 45 students per class, reports, email notifications
- **Premium Plan**: Unlimited classes and students, all features including reminders

## ️ Architecture

### Backend (Node.js/Express)
- **Framework**: Express.js with ES6 modules
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with local strategy
- **Security**: Helmet, XSS protection, rate limiting
- **Real-time**: WebSocket server for live updates
- **Payments**: Chargily payment gateway integration
- **Email**: Nodemailer for email notifications
- **Scheduling**: Node-cron for automated tasks

### Frontend (React.js)
- **Framework**: React 19 with Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Components**: Custom components with Bootstrap
- **Charts**: Recharts for data visualization
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios for API calls

## 📁 Project Structure

```
attendance-app/
├── backend/                    # Node.js/Express backend
│   ├── controllers/           # Route controllers
│   │   ├── classController.js
│   │   └── paymentController.js
│   ├── models/               # MongoDB models
│   │   ├── Class.js
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   ├── Payments.js
│   │   └── Report.js
│   ├── routers/              # API routes
│   │   ├── auth.js
│   │   ├── class.js
│   │   ├── user.js
│   │   ├── payment.js
│   │   └── report.js
│   ├── utils/                # Utility functions
│   │   ├── middlewares.js
│   │   ├── EmailSender.js
│   │   ├── EmailTemplates.js
│   │   ├── checkSubscribtions.js
│   │   └── reminder.js
│   ├── stratigies/           # Passport strategies
│   │   ├── config.js
│   │   └── local.js
│   ├── cron.js               # Scheduled tasks
│   └── index.js              # Main server file
├── my-app/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── cards/        # Card components
│   │   │   ├── charts/       # Chart components
│   │   │   ├── modals/       # Modal components
│   │   │   ├── ui/           # UI components
│   │   │   └── Toast/        # Toast notifications
│   │   ├── pages/            # Page components
│   │   │   ├── auth/         # Authentication pages
│   │   │   ├── dashboard/    # Dashboard pages
│   │   │   └── website/      # Landing pages
│   │   ├── store/            # Redux store
│   │   │   ├── auth/         # Authentication state
│   │   │   ├── class/        # Class state
│   │   │   └── students/     # Student state
│   │   ├── contexts/         # React contexts
│   │   ├── layout/           # Layout components
│   │   ├── utils/            # Utility functions
│   │   └── data/             # Static data
│   └── public/               # Static assets
└── README.md
```

##  API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/signup` - User registration (teacher/student)
- `POST /auth/login` - User login
- `GET /auth/verify/:token` - Email verification
- `GET /auth/user` - Get current user data
- `POST /auth/reset-pass` - Request password reset
- `POST /auth/reset-pass/:token` - Reset password with token
- `POST /auth/logout` - User logout

### Class Management Routes (`/class`)
- `POST /class` - Create new class (teacher only)
- `GET /class` - Get all classes for user
- `PUT /class` - Update class details (teacher only)
- `GET /class/:classId` - Get specific class status
- `PATCH /class/:classId` - Generate new class code (teacher only)
- `PUT /class/:classId` - Change class status (teacher only)
- `DELETE /class/:classId` - Delete class (teacher only)

### User Management Routes (`/user`)
- `GET /user/studentsList/:classId` - Get students in class (teacher only)
- `GET /user/classes/:studentId` - Get student's classes
- `GET /user/:id` - Get student details
- `PUT /user/checkattendance/:id` - Mark student attendance
- `PUT /user/updateStudentMark/:id` - Update student marks (teacher only)
- `PUT /user/absence/:id` - Mark student absent (teacher only)
- `PUT /user/enter/:studentId` - Join class with share code (student only)
- `PUT /user/unenroll/:studentId` - Leave class (student only)
- `PUT /user/reset/:classId` - Reset all absences (teacher only)
- `PUT /user/update/:id` - Update user profile

### Payment Routes (`/payment`)
- `POST /payment` - Create subscription payment (teacher only)
- `POST /payment/hook` - Payment webhook handler

### Report Routes (`/report`)
- `POST /report/share/:teacherId` - Share attendance report (teacher only)
- `GET /report/:userId` - Get user reports

## ️ Database Models

### Student Model
```javascript
{
  name: String,
  familyName: String,
  matricule: String (unique),
  email: String,
  password: String,
  phone: String,
  birth: Date,
  role: String,
  classes: [{
    classId: String,
    module: String,
    attendanceMark: Number,
    absences: Number,
    attendances: Number,
    d_AttendanceMark: Number,
    minusWithAbsence: Number
  }],
  TotalAttendance: Number,
  TotalAbsence: Number,
  isVerified: Boolean,
  verificationToken: String
}
```

### Teacher Model
```javascript
{
  name: String,
  familyName: String,
  email: String,
  password: String,
  role: String,
  isVerified: Boolean,
  verificationToken: String,
  plan: String (enum: ["free", "standard", "premium"])
}
```

### Class Model
```javascript
{
  teacherId: String,
  module: String,
  posibility: Boolean,
  class: String,
  speciality: String,
  system: String,
  shareCode: String (unique),
  deleugate: String,
  d_AttendanceMark: Number,
  minusWithAbsence: Number,
  absences: [{ date: String, count: Number }],
  attendances: [{ date: String, count: Number }],
  reminder: {
    active: Boolean,
    reminderDays: Array,
    reminderTime: String
  }
}
```

### Payment Model
```javascript
{
  teacherId: ObjectId,
  plan: String (enum: ["standard", "premium"]),
  amount: Number,
  transactionId: String (unique),
  paymentStatus: String,
  duration: Number,
  planStartDate: Date,
  planEndDate: Date,
  emailSent: Boolean
}
```

### Report Model
```javascript
{
  teacherId: String,
  report: String,
  classes: Array
}
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (>=16.0.0)
- MongoDB
- Git

### Backend Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/abdelali-01/attendance-app.git
   cd attendance-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL="mongodb://localhost:27017/attendance-app"
   PORT=4620
   FRONTEND_URL="http://localhost:5173"
   BASE_URL="http://localhost:3000"
   EMAIL="your_email@gmail.com"
   EMAIL_PASS="your_email_password"
   JWT_SECRET="your_jwt_secret_key"
   CHARGILY_SECRET_KEY="your_chargily_secret_key"
   NODE_ENV="development"
   ```

4. **Start the backend server**
   ```bash
   npm start
   ```

### Frontend Setup
1. **Navigate to frontend directory**
   ```bash
   cd ../my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the my-app directory:
   ```env
   VITE_BASE_URI="http://localhost:4620"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to platforms like:
- **Heroku**
- **Railway**
- **DigitalOcean**
- **AWS EC2**

### Frontend Deployment
The frontend is configured for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

The `vercel.json` file is included for Vercel deployment configuration.

##  Configuration

### Payment Gateway
The application uses Chargily payment gateway for subscription payments. Configure your Chargily credentials in the backend `.env` file.

### Email Service
Configure your email service (Gmail, Outlook, etc.) in the backend `.env` file for sending notifications and verification emails.

### Database
The application uses MongoDB. Ensure your MongoDB instance is running and accessible.

##  Features by Plan

| Feature | Free | Standard | Premium |
|---------|------|----------|---------|
| Classes | 1 | 3 | Unlimited |
| Students per Class | 15 | 45 | Unlimited |
| Statistics | ✅ | ✅ | ✅ |
| Attendance Tracking | ✅ | ✅ | ✅ |
| Reports | ❌ | ✅ | ✅ |
| Email Notifications | ❌ | ✅ | ✅ |
| Reminders | ❌ | ❌ | ✅ |
| Messages | ❌ | ❌ | ✅ |

## 🔐 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication tokens
- **XSS Protection**: Input sanitization and validation
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Configuration**: Cross-origin resource sharing setup
- **Helmet**: Security headers middleware
- **Session Management**: Secure session handling

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd my-app
npm run test
```

## 📝 Usage Examples

### Teacher Workflow
1. **Sign up** as a teacher
2. **Verify email** through the verification link
3. **Create classes** and configure attendance settings
4. **Generate share codes** for students to join
5. **Monitor attendance** in real-time
6. **Generate reports** and share with students

### Student Workflow
1. **Sign up** as a student with matricule
2. **Verify email** through the verification link
3. **Join classes** using share codes provided by teachers
4. **Check attendance** during class sessions
5. **View attendance records** and statistics


## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: aliaribi47@gmail.com

##  Version History

- **v1.0.0** - Initial release with basic attendance tracking
- **v1.1.0** - Added subscription plans and payment integration
- **v1.2.0** - Enhanced with real-time updates and reporting system

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Integration with learning management systems
- [ ] Multi-language support
- [ ] Advanced reporting features
- [ ] API documentation with Swagger

---

Thank you for contributing to the project!