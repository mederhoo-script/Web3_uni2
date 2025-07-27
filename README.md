# Web3 University - Full-Stack Learning Platform

A comprehensive Web3 education platform built with modern technologies, featuring cohort-based learning, real-time chat, and role-based access control.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization** - JWT-based auth with role management (Student, Mentor, Admin)
- **Cohort-Based Learning** - Students learn in structured groups with dedicated mentors
- **Course Management** - Comprehensive course creation, lesson organization, and progress tracking
- **Real-Time Chat** - Socket.IO powered chat rooms for cohorts, courses, and general discussion
- **Admin Panel** - Complete administrative interface for user, cohort, and course management
- **Mentor Dashboard** - Tools for mentors to manage their cohorts and students
- **Mobile-Responsive Design** - Optimized for all devices with Tailwind CSS

### User Roles & Permissions
- **Students** - Access courses, participate in cohorts, chat with peers, track progress
- **Mentors** - Manage cohorts, create content, monitor student progress, facilitate discussions
- **Admins** - Full system access, user management, analytics, system configuration

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Zustand
- **API Client**: Axios with React Query
- **Real-time**: Socket.IO Client
- **Forms**: React Hook Form with Zod validation
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL with pg driver
- **Authentication**: JWT with bcryptjs
- **Real-time**: Socket.IO
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer

### Database
- **Primary**: PostgreSQL 14+
- **Features**: UUID primary keys, JSONB for metadata, triggers for auto-updates
- **Indexing**: Optimized indexes for performance

## 📁 Project Structure

```
Web3_uni2/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── auth/                # Authentication components
│   │   ├── common/              # Shared components (Header, Sidebar)
│   │   ├── dashboard/           # Dashboard-specific components
│   │   ├── courses/             # Course-related components
│   │   ├── cohorts/             # Cohort management components
│   │   ├── chat/                # Chat components
│   │   ├── admin/               # Admin panel components
│   │   └── ui/                  # UI primitives
│   ├── pages/                   # Page components
│   │   ├── auth/                # Login, Register pages
│   │   ├── dashboard/           # Dashboard page
│   │   ├── courses/             # Course pages
│   │   ├── cohorts/             # Cohort pages
│   │   ├── chat/                # Chat page
│   │   └── admin/               # Admin pages
│   ├── layouts/                 # Layout components
│   ├── hooks/                   # Custom React hooks
│   ├── services/                # API service layer
│   ├── contexts/                # React contexts (Auth)
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Utility functions
├── server/                      # Backend source code
│   ├── src/
│   │   ├── controllers/         # Route handlers
│   │   ├── middleware/          # Custom middleware
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Utility functions
│   │   ├── config/              # Configuration files
│   │   └── types/               # TypeScript types
│   ├── package.json             # Backend dependencies
│   └── tsconfig.json            # Backend TypeScript config
├── database/                    # Database files
│   ├── schema.sql              # Database schema
│   └── seed.sql                # Sample data
├── package.json                # Frontend dependencies
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/mederhoo-script/Web3_uni2.git
cd Web3_uni2
```

### 2. Database Setup
```bash
# Create PostgreSQL database
createdb web3_uni_db

# Run schema migration
psql -d web3_uni_db -f database/schema.sql

# (Optional) Load sample data
psql -d web3_uni_db -f database/seed.sql
```

### 3. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env file with your database credentials and other settings
nano .env

# Build TypeScript
npm run build

# Start development server
npm run dev
```

### 4. Frontend Setup
```bash
# Return to root directory
cd ..

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
echo "VITE_SOCKET_URL=http://localhost:5000" >> .env.local

# Start development server
npm run dev
```

### 5. Run Both Frontend and Backend
```bash
# Install concurrently if not already installed
npm install -g concurrently

# Run both frontend and backend
npm run dev:full
```

## 🌐 API Routes Overview

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh` - Refresh JWT token
- `POST /logout` - User logout
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password

### User Routes (`/api/users`)
- `GET /profile` - Get current user profile
- `PUT /profile` - Update user profile
- `GET /:userId` - Get user by ID (admin/mentor only)
- `PUT /:userId` - Update user by ID
- `DELETE /:userId` - Delete user (admin only)
- `GET /cohort/:cohortId` - Get users in cohort
- `POST /change-password` - Change password

### Cohort Routes (`/api/cohorts`)
- `GET /` - Get cohorts (filtered by role)
- `POST /` - Create cohort (admin only)
- `GET /:cohortId` - Get cohort details
- `PUT /:cohortId` - Update cohort
- `DELETE /:cohortId` - Delete cohort (admin only)
- `POST /:cohortId/students` - Add student to cohort
- `DELETE /:cohortId/students/:studentId` - Remove student
- `GET /:cohortId/progress` - Get cohort progress overview

### Course Routes (`/api/courses`)
- `GET /` - Get published courses
- `POST /` - Create course (admin/mentor)
- `GET /:courseId` - Get course details
- `PUT /:courseId` - Update course
- `DELETE /:courseId` - Delete course (admin only)
- `GET /:courseId/lessons` - Get course lessons
- `POST /:courseId/lessons` - Create lesson
- `GET /:courseId/lessons/:lessonId` - Get lesson details
- `PUT /:courseId/lessons/:lessonId` - Update lesson
- `POST /:courseId/lessons/:lessonId/complete` - Mark lesson complete
- `GET /:courseId/progress` - Get user's course progress

### Chat Routes (`/api/chat`)
- `GET /rooms` - Get user's chat rooms
- `POST /rooms` - Create chat room (admin/mentor)
- `GET /rooms/:roomId` - Get room details
- `GET /rooms/:roomId/messages` - Get messages
- `POST /rooms/:roomId/messages` - Send message
- `PUT /messages/:messageId` - Edit message
- `DELETE /messages/:messageId` - Delete message
- `POST /rooms/:roomId/join` - Join room
- `POST /rooms/:roomId/leave` - Leave room
- `GET /rooms/:roomId/participants` - Get participants
- `POST /rooms/:roomId/upload` - Upload file

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Admin dashboard data
- `GET /users` - Get all users with filters
- `PUT /users/:userId/role` - Update user role
- `PUT /users/:userId/status` - Activate/deactivate user
- `GET /cohorts` - Get all cohorts with details
- `GET /courses` - Get all courses with stats
- `GET /analytics` - System analytics
- `GET /logs` - System logs
- `POST /backup` - Create system backup
- `GET /settings` - Get system settings
- `PUT /settings` - Update system settings
- `POST /notifications/broadcast` - Send broadcast notification

## 🗄 Database Schema

### Core Tables
- **users** - User accounts with roles and profiles
- **cohorts** - Learning groups with mentors and schedules
- **courses** - Course content and metadata
- **lessons** - Individual lessons within courses
- **user_progress** - Student progress tracking
- **assignments** - Course assignments and projects
- **submissions** - Student assignment submissions
- **chat_rooms** - Chat room configurations
- **chat_messages** - Real-time messaging
- **notifications** - User notifications

### Key Relationships
- Users belong to cohorts (many-to-one)
- Cohorts have mentors (one-to-many)
- Courses contain lessons (one-to-many)
- Users have progress per lesson (many-to-many)
- Chat rooms can be cohort or course-specific

### Security Features
- UUID primary keys for security
- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Rate limiting on API endpoints
- Input validation and sanitization

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```bash
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/web3_uni_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=web3_uni_db
DB_USER=username
DB_PASSWORD=password

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_REFRESH_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Socket.IO
SOCKET_CORS_ORIGIN=http://localhost:5173
```

#### Frontend (.env.local)
```bash
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

Key mobile features:
- Collapsible sidebar navigation
- Touch-friendly chat interface
- Responsive grid layouts
- Optimized typography scaling

## 🔒 Security

- JWT authentication with refresh tokens
- Role-based access control (RBAC)
- Rate limiting to prevent abuse
- CORS configuration
- Input validation and sanitization
- SQL injection prevention
- XSS protection via Helmet.js

## 🧪 Testing

```bash
# Frontend tests
npm run test

# Backend tests
cd server && npm run test

# E2E tests
npm run test:e2e
```

## 📈 Development Workflow

1. **Feature Development**
   - Create feature branch from main
   - Implement frontend components
   - Add backend API endpoints
   - Update database schema if needed
   - Add tests

2. **Code Review**
   - Create pull request
   - Ensure all tests pass
   - Code review by team members
   - Address feedback

3. **Deployment**
   - Merge to main branch
   - Run database migrations
   - Deploy backend services
   - Deploy frontend application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **Real-time**: Socket.IO
- **Authentication**: JWT

## 🆘 Support

For support, email support@web3uni.com or join our Discord server.

## 🗺 Roadmap

- [ ] Video streaming integration
- [ ] Advanced analytics dashboard
- [ ] Mobile application (React Native)
- [ ] AI-powered learning recommendations
- [ ] Blockchain integration for certificates
- [ ] Payment integration for premium courses
- [ ] Advanced assignment grading system
- [ ] Integration with Web3 development tools

---

Built with ❤️ for the Web3 education community
