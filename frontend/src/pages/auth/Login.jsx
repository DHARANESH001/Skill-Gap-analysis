import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap, Users, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const roles = [
    {
      value: 'student',
      label: 'Student',
      icon: GraduationCap,
      description: 'Access your learning dashboard',
    },
    {
      value: 'coordinator',
      label: 'Coordinator',
      icon: Users,
      description: 'Manage department analytics',
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
      const result = await login(formData);
      if (result.success) {
        toast.success('Login successful!');
        navigate(`/${formData.role}/dashboard`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
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
          <h2>Welcome Back</h2>
          <p>
            Empower your skill development with intelligent monitoring and analytics.
            <b> SKILL ANALYSIS</b> helps you track progress, identify gaps, and
            achieve your learning goals — ensuring better career outcomes and smarter development.
          </p>
        </div>
      </div>
      <div className="right-panel">
        <div className="login-card">
          <h2>Sign In</h2>
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
                  placeholder="Enter your password"
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

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="login-button">
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <User className="button-icon" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            <p className="signup-text">
              Don't have an account? <a href="/register">Create an Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;