import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  BookOpen,
  ArrowRight,
  Star,
  Award,
  Target
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: 'Skill Analytics',
      description: 'Comprehensive analysis of student performance and skill gaps',
      color: 'primary',
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Different interfaces for students, coordinators, and administrators',
      color: 'success',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor learning progress and improvement over time',
      color: 'warning',
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access to study materials and practice problems',
      color: 'secondary',
    },
  ];

  const stats = [
    { label: 'Active Students', value: '450+', icon: Users },
    { label: 'Departments', value: '5', icon: Award },
    { label: 'Skills Tracked', value: '12', icon: Target },
    { label: 'Success Rate', value: '85%', icon: TrendingUp },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Student',
      content: 'This platform helped me identify my weak areas and improve my coding skills significantly.',
      rating: 5,
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Coordinator',
      content: 'Excellent tool for tracking student progress and providing targeted support.',
      rating: 5,
    },
    {
      name: 'Prof. Lisa Anderson',
      role: 'Administrator',
      content: 'Comprehensive analytics and easy-to-use interface for department management.',
      rating: 5,
    },
  ];

  const getStarted = () => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Data-Driven Skill Analysis
              <span className="block text-primary-600 dark:text-primary-400">
                & Learning Platform
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Empower students with personalized learning insights, help coordinators track department performance, 
              and enable administrators with comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="btn btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
              >
                <span>Login</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn btn-secondary text-lg px-8 py-3"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Every Role
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform provides tailored experiences for students, coordinators, and administrators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-8 h-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Role-Based Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Designed for Every User
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Specialized dashboards and tools for different user roles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Students
              </h3>
              <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Personal skill assessment</li>
                <li>• Progress tracking dashboard</li>
                <li>• Performance analytics</li>
                <li>• Learning recommendations</li>
                <li>• Achievement badges</li>
              </ul>
            </div>
            
            <div className="card text-center">
              <div className="w-20 h-20 bg-success-100 dark:bg-success-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-success-600 dark:text-success-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Coordinators
              </h3>
              <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Department analytics</li>
                <li>• Student performance tracking</li>
                <li>• Skill gap analysis</li>
                <li>• Report generation</li>
                <li>• Data import/export</li>
              </ul>
            </div>
            
            <div className="card text-center">
              <div className="w-20 h-20 bg-warning-100 dark:bg-warning-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-warning-600 dark:text-warning-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Administrators
              </h3>
              <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
                <li>• User management</li>
                <li>• Department administration</li>
                <li>• System analytics</li>
                <li>• Security monitoring</li>
                <li>• System configuration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real feedback from students, coordinators, and administrators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Learning Analytics?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students and educators already using our platform
          </p>
          <button
            onClick={getStarted}
            className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-3 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
