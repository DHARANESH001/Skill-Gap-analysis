import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, GraduationCap, Users, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();

  const roles = [
    {
      value: 'student',
      label: 'Student',
      icon: GraduationCap,
      description: 'Start your learning journey',
    },
    {
      value: 'coordinator',
      label: 'Coordinator',
      icon: Users,
      description: 'Manage and track progress',
    },
    {
      value: 'admin',
      label: 'Administrator',
      icon: Shield,
      description: 'System administration',
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      if (result.success) {
        toast.success('Account created successfully!');
        navigate('/login');
      } else {
        toast.error(result.error || 'Signup failed');
      }
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="background-overlay"></div>
      <div className="left-panel">
        <div className="left-content">
          <h1>SKILL ANALYSIS</h1>
          <h2>Create Account</h2>
          <p>
            Join our platform to enhance your skills and track your progress.
            <b> SKILL ANALYSIS</b> helps you identify strengths, improve weaknesses, and
            achieve your career goals — ensuring professional growth and success.
          </p>
        </div>
      </div>
      <div className="right-panel">
        <div className="login-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="role-selection">
              <label className="role-label">Select Your Role</label>
              <div className="roles-grid">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: role.value }))}
                      className={`role-button ${formData.role === role.value ? 'active' : ''}`}
                    >
                      <div className="role-content">
                        <Icon className="role-icon" />
                        <div className="role-text">
                          <p className="role-name">{role.label}</p>
                          <p className="role-desc">{role.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.role && <p className="error-text">{errors.role}</p>}
            </div>

            {/* Name */}
            <div className="input-group">
              <div className="input-wrapper">
                <UserPlus className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`login-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="input-group">
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`login-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="input-group">
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`login-input ${errors.password ? 'error' : ''}`}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`login-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                >
                  {showConfirmPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="login-button">
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="button-icon" />
                  <span>Create Account</span>
                </>
              )}
            </button>

            <p className="signup-text">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
