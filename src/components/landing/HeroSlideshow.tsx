import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, PlayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Web3UniLogo from '../../assets/web3uni-logo.svg';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    action: 'register' | 'login';
  };
  secondaryCTA: {
    text: string;
    action: 'register' | 'login' | 'demo';
  };
  highlight: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Master the",
    subtitle: "Future of Web",
    description: "Learn, Apply and Earn in the world of Web3, blockchain, and decentralized technologies. Join our expert-led cohorts and build real-world projects that matter.",
    primaryCTA: { text: "Start Learning", action: "register" },
    secondaryCTA: { text: "Watch Demo", action: "demo" },
    highlight: "Free to start • No credit card required • Join 1000+ learners"
  },
  {
    id: 2,
    title: "Build Real",
    subtitle: "Web3 Projects",
    description: "Get hands-on experience building DeFi protocols, NFT marketplaces, and decentralized applications. Learn from industry experts with proven track records.",
    primaryCTA: { text: "View Projects", action: "register" },
    secondaryCTA: { text: "Sign In", action: "login" },
    highlight: "100+ real projects • Expert mentorship • Portfolio ready"
  },
  {
    id: 3,
    title: "Join Elite",
    subtitle: "Web3 Cohorts",
    description: "Connect with like-minded developers in small, focused cohorts. Collaborate on cutting-edge projects and build your professional network in Web3.",
    primaryCTA: { text: "Join Cohort", action: "register" },
    secondaryCTA: { text: "Learn More", action: "login" },
    highlight: "Small cohorts • Peer learning • Lifetime network"
  },
  {
    id: 4,
    title: "Earn While",
    subtitle: "You Learn",
    description: "Get paid for completing projects and contributing to the Web3 ecosystem. Our unique learn-and-earn model helps you transition to Web3 careers.",
    primaryCTA: { text: "Start Earning", action: "register" },
    secondaryCTA: { text: "View Opportunities", action: "login" },
    highlight: "Paid projects • Career placement • Industry connections"
  },
  {
    id: 5,
    title: "Become a",
    subtitle: "Web3 Expert",
    description: "Master blockchain fundamentals, smart contract development, and DeFi protocols. Transform your career with the most in-demand skills in tech.",
    primaryCTA: { text: "Get Started", action: "register" },
    secondaryCTA: { text: "Browse Courses", action: "login" },
    highlight: "Expert instructors • Industry certifications • Job guarantee"
  }
];

export const HeroSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleSlideClick = (action: string) => {
    switch (action) {
      case 'register':
        navigate('/register');
        break;
      case 'login':
        navigate('/login');
        break;
      case 'demo':
        // Could be implemented later or scroll to demo section
        break;
    }
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-web3-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-web3-100 opacity-20 dark:bg-web3-900"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-100 opacity-20 dark:bg-blue-900"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">{currentSlideData.title}</span>
              <span className="block text-web3-600 dark:text-web3-400">{currentSlideData.subtitle}</span>
            </h1>
            
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              {currentSlideData.description}
            </p>
            
            <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleSlideClick(currentSlideData.primaryCTA.action)}
                  className="group inline-flex items-center justify-center rounded-lg bg-web3-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-web3-700 hover:shadow-xl dark:bg-web3-500 dark:hover:bg-web3-600"
                >
                  {currentSlideData.primaryCTA.text}
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button 
                  onClick={() => handleSlideClick(currentSlideData.secondaryCTA.action)}
                  className="group inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-md transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {currentSlideData.secondaryCTA.action === 'demo' && <PlayIcon className="mr-2 h-5 w-5" />}
                  {currentSlideData.secondaryCTA.text}
                </button>
              </div>
              
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                {currentSlideData.highlight}
              </p>
            </div>
          </div>
          
          <div className="mt-12 relative sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:max-w-none lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
              {/* Hero logo/branding */}
              <div className="relative aspect-square w-full rounded-lg bg-gradient-to-br from-web3-100 to-blue-100 p-8 dark:from-web3-900/20 dark:to-blue-900/20">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src={Web3UniLogo} 
                        alt="Web3 University" 
                        className="h-20 w-auto text-web3-600 dark:text-web3-400"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Slide {currentSlide + 1} of {slides.length}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Swipe or click to navigate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 flex items-center justify-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? 'bg-web3-600 dark:bg-web3-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Auto-play indicator */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className={`h-2 w-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};