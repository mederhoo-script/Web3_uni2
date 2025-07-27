import React from 'react';
import { 
  CodeBracketIcon, 
  CurrencyDollarIcon, 
  RocketLaunchIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Blockchain Fundamentals',
    description: 'Master the core concepts of blockchain technology, cryptography, and distributed systems.',
    icon: ShieldCheckIcon,
    level: 'Beginner',
    duration: '4 weeks',
    students: 850,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'Smart Contract Development',
    description: 'Learn Solidity programming and build secure smart contracts on Ethereum.',
    icon: CodeBracketIcon,
    level: 'Intermediate',
    duration: '6 weeks',
    students: 650,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    title: 'DeFi Protocols & Applications',
    description: 'Understand decentralized finance and build DeFi applications from scratch.',
    icon: CurrencyDollarIcon,
    level: 'Advanced',
    duration: '8 weeks',
    students: 420,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 4,
    title: 'Web3 Frontend Development',
    description: 'Create decentralized applications with React, Web3.js, and modern tools.',
    icon: GlobeAltIcon,
    level: 'Intermediate',
    duration: '6 weeks',
    students: 750,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 5,
    title: 'NFT & Metaverse Development',
    description: 'Build NFT marketplaces and explore metaverse development opportunities.',
    icon: RocketLaunchIcon,
    level: 'Advanced',
    duration: '10 weeks',
    students: 380,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 6,
    title: 'Blockchain Security',
    description: 'Learn security best practices and audit smart contracts for vulnerabilities.',
    icon: AcademicCapIcon,
    level: 'Expert',
    duration: '12 weeks',
    students: 220,
    color: 'from-red-500 to-red-600'
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'Advanced':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    case 'Expert':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export const CourseList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Comprehensive Web3 Curriculum
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            From blockchain basics to advanced DeFi development. Our courses are designed by industry experts 
            and updated with the latest technologies.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <div
                key={course.id}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-2xl dark:bg-gray-800 dark:shadow-gray-900/20 cursor-pointer"
                onClick={() => navigate(`/course`)}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 transition-opacity group-hover:opacity-5`}></div>
                
                <div className="relative">
                  <div className={`inline-flex rounded-lg bg-gradient-to-r ${course.color} p-3`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {course.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.students.toLocaleString()} students
                    </span>
                    <button
                      className="text-sm font-medium text-web3-600 hover:text-web3-700 dark:text-web3-400 dark:hover:text-web3-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course`);
                      }}
                    >
                      Learn more →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center rounded-lg border border-web3-600 bg-web3-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-web3-700 hover:shadow-xl dark:border-web3-500 dark:bg-web3-500 dark:hover:bg-web3-600">
            View All Courses
          </button>
        </div>
      </div>
    </div>
  );
};