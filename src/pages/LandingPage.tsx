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
    const savedTheme = localStorage.getItem('web3uni-theme');
    if (savedTheme) {
      const themeData = JSON.parse(savedTheme);
      setTheme(themeData.state?.isDark || false);
      if (themeData.state?.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      setTheme(true); // Default to dark mode
      document.documentElement.classList.add('dark');
    }
  }, [setTheme]);

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-yellow-50 dark:bg-purple-950 transition-colors">
      {/* Navigation */}
      <nav className="relative bg-yellow-100/90 dark:bg-purple-900/90 backdrop-blur-md border-b border-yellow-200 dark:border-purple-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={Web3UniLogo} 
                alt="Web3 University" 
                className="h-8 w-auto"
              />
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="text-purple-700 hover:text-yellow-600 dark:text-yellow-300 dark:hover:text-purple-200 transition-colors">
                Courses
              </a>
              <a href="#community" className="text-purple-700 hover:text-yellow-600 dark:text-yellow-300 dark:hover:text-purple-200 transition-colors">
                Community
              </a>
              <a href="#about" className="text-purple-700 hover:text-yellow-600 dark:text-yellow-300 dark:hover:text-purple-200 transition-colors">
                About
              </a>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <button
                onClick={handleSignIn}
                className="text-purple-700 hover:text-yellow-600 dark:text-yellow-300 dark:hover:text-purple-200 transition-colors"
              >
                Sign In
              </button>
              
              <button
                onClick={handleGetStarted}
                className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-medium text-yellow-300 shadow-lg transition-all hover:bg-yellow-400 hover:text-purple-900 hover:shadow-xl dark:bg-yellow-400 dark:text-purple-900 dark:hover:bg-purple-700 dark:hover:text-yellow-300"
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