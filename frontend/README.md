# Data-Driven Department-Wise Skill Analysis & Skill Gap Analysis System

A comprehensive React-based web application for analyzing student performance, tracking skill gaps, and providing insights for educational institutions.

## 🚀 Features

### 🎯 Core Functionality
- **Role-Based Access Control**: Student, Coordinator, and Admin roles with tailored dashboards
- **Skill Analytics**: Comprehensive analysis of student performance across multiple skill categories
- **Progress Tracking**: Monitor learning progress and improvement over time
- **Interactive Charts**: Rich data visualization using Recharts
- **File Upload**: Excel/CSV data import for coordinators
- **Report Generation**: PDF and CSV export capabilities
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile

### 👥 User Roles

#### 🎓 Students
- Personal dashboard with performance metrics
- Skill progress tracking with visual charts
- Achievement badges and gamification
- AI-powered learning recommendations
- Profile management with detailed statistics

#### 👨‍🏫 Coordinators (Faculty)
- Department-level analytics dashboard
- Student data upload via Excel/CSV
- Skill gap analysis with recommendations
- Department comparison reports
- Performance trend analysis
- Exportable reports in multiple formats

#### 👨‍💼 Administrators
- System-wide analytics and monitoring
- User management (add/edit/delete users)
- Department management and configuration
- System health monitoring
- Security and access control
- Comprehensive reporting tools

## 🛠️ Technology Stack

### Frontend
- **React 19.2.0** - Modern React with hooks
- **Vite 8.0** - Fast development build tool
- **React Router DOM 6.22.3** - Client-side routing
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Recharts 2.12.7** - Data visualization library
- **Lucide React 0.363.0** - Icon library
- **Axios 1.6.8** - HTTP client
- **React Hot Toast 2.4.1** - Notification system
- **React Dropzone 14.2.3** - File upload component
- **jsPDF 2.5.1** - PDF generation
- **html2canvas 1.4.1** - HTML to image conversion

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
skill-analysis-react/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── RoleProtectedRoute.jsx
│   │   ├── charts/
│   │   │   ├── LineChartComponent.jsx
│   │   │   ├── BarChartComponent.jsx
│   │   │   ├── PieChartComponent.jsx
│   │   │   ├── RadarChartComponent.jsx
│   │   │   └── HeatMapGrid.jsx
│   │   ├── student/
│   │   │   ├── SkillProgressCard.jsx
│   │   │   ├── PerformanceTrend.jsx
│   │   │   ├── WeakSkillAlert.jsx
│   │   │   └── StudentProfileCard.jsx
│   │   ├── coordinator/
│   │   │   ├── FileUpload.jsx
│   │   │   ├── DepartmentSummary.jsx
│   │   │   ├── SkillGapCard.jsx
│   │   │   └── ReportDownload.jsx
│   │   └── admin/
│   │       ├── UserTable.jsx
│   │       ├── AddUserModal.jsx
│   │       ├── DepartmentTable.jsx
│   │       └── SystemAnalytics.jsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Unauthorized.jsx
│   │   ├── student/
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── SkillProgress.jsx
│   │   │   └── StudentProfile.jsx
│   │   ├── coordinator/
│   │   │   ├── CoordinatorDashboard.jsx
│   │   │   ├── UploadData.jsx
│   │   │   ├── SkillGapAnalysis.jsx
│   │   │   └── DepartmentReports.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   └── ManageDepartments.jsx
│   │   └── Home.jsx
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoute.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── studentService.js
│   │   ├── coordinatorService.js
│   │   └── adminService.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── StudentContext.jsx
│   │   ├── CoordinatorContext.jsx
│   │   └── AdminContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useRole.js
│   │   ├── useFetch.js
│   │   └── useChartData.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── calculateSkillGap.js
│   │   ├── formatPercentage.js
│   │   └── exportReport.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skill-analysis-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

##  Key Features

### 📈 Data Visualization
- **Line Charts**: Performance trends over time
- **Bar Charts**: Comparative analysis
- **Pie Charts**: Skill distribution
- **Radar Charts**: Multi-dimensional skill analysis
- **Heat Maps**: Student-skill performance matrix

### 📋 File Upload
- **Supported Formats**: CSV, Excel (.xlsx, .xls)
- **Drag & Drop Interface**
- **Progress Tracking**
- **Data Validation**
- **Template Download**

### 📄 Report Generation
- **PDF Reports**: Comprehensive analysis reports
- **CSV Export**: Data export for further analysis
- **Custom Reports**: Tailored report generation
- **Scheduled Reports**: Automated report generation

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Mobile-first responsive design
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: WCAG compliant components

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Skill Analysis System
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=false
VITE_DEV_MODE=true
```

### Tailwind CSS Configuration
The application uses Tailwind CSS with custom configuration:
- Extended color palette
- Custom animations
- Responsive breakpoints
- Dark mode support

## 🧪 Testing

The application is structured to support testing. Key testing considerations:

- **Component Testing**: Individual component testing
- **Integration Testing**: Route and context testing
- **E2E Testing**: Full user journey testing
- **Accessibility Testing**: Screen reader and keyboard navigation

## 📚 API Integration

The application is designed to work with a RESTful API. Key service files:

- `authService.js`: Authentication and authorization
- `studentService.js`: Student-related API calls
- `coordinatorService.js`: Coordinator functionality
- `adminService.js`: Administrative functions

## 🔄 State Management

The application uses React Context for state management:

- **AuthContext**: Authentication state
- **StudentContext**: Student-specific state
- **CoordinatorContext**: Coordinator-specific state
- **AdminContext**: Admin-specific state

## 🎯 Skill Categories

The system tracks performance across multiple skill categories:

- **Data Structures & Algorithms (DSA)**
- **Database Management Systems (DBMS)**
- **Web Development**
- **Algorithms**
- **System Design**
- **Cloud Computing**
- **Machine Learning**

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🔒 Security Features

- **Role-Based Access Control**
- **JWT Authentication**
- **Protected Routes**
- **Input Validation**
- **XSS Protection**
- **CSRF Protection**

## 🚀 Performance Optimization

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized image loading
- **Bundle Analysis**: Optimized bundle size
- **Caching Strategy**: Efficient caching mechanisms
- **Tree Shaking**: Dead code elimination

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🗺️ Roadmap

- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with learning platforms
- [ ] AI-powered recommendations
- [ ] Gamification enhancements

## 📊 Analytics & Monitoring

The application includes:

- **Performance Monitoring**: Real-time performance tracking
- **Error Tracking**: Comprehensive error logging
- **User Analytics**: Usage patterns and insights
- **System Health**: Infrastructure monitoring

---

**Built with ❤️ for educational excellence**
