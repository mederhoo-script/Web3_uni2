import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { HeroSlideshow } from '../components/landing/HeroSlideshow';
import { CourseList } from '../components/landing/CourseList';
import { CommunityHighlights } from '../components/landing/CommunityHighlights';
import { Footer } from '../components/landing/Footer';
import { useThemeStore } from '../contexts/ThemeContext';
import Web3UniLogo from '../assets/web3uni-logo.svg';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on component mount
    const savedTheme = localStorage.getItem('web3uni-theme');
    if (savedTheme) {
      const themeData = JSON.parse(savedTheme);
      setTheme(themeData.state?.isDark || false);
    }
  }, [setTheme]);

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navigation */}
      <nav className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={Web3UniLogo} 
                alt="Web3 University" 
                className="h-8 w-auto text-web3-600 dark:text-web3-400"
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Courses
              </a>
              <a href="#community" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Community
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                About
              </a>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <button
                onClick={handleSignIn}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Sign In
              </button>
              
              <button
                onClick={handleGetStarted}
                className="rounded-lg bg-web3-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:bg-web3-700 hover:shadow-xl dark:bg-web3-500 dark:hover:bg-web3-600"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSlideshow />
        <div id="courses">
          <CourseList />
        </div>
        <div id="community">
          <CommunityHighlights />
        </div>
      </main>

      {/* Footer */}
      <div id="about">
        <Footer />
      </div>
    </div>
  );
};