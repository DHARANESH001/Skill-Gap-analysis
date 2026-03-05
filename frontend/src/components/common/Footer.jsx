import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <GraduationCap className="w-8 h-8 text-primary-400 mr-2" />
              <span className="text-xl font-bold">Skill Analysis</span>
            </div>
            <p className="text-gray-400 text-sm">
              Empower your skill development with intelligent monitoring and analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Dashboard Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Dashboards</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/student/dashboard" className="hover:text-white transition-colors">Student</Link></li>
              <li><Link to="/coordinator/dashboard" className="hover:text-white transition-colors">Coordinator</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                support@skillanalysis.com
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                123 Education St, Tech City
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Skill Analysis System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
