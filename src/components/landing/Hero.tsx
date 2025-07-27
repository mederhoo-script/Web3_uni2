import React from 'react';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

export const Hero: React.FC = () => {
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
              <span className="block">Master the</span>
              <span className="block text-web3-600 dark:text-web3-400">Future of Web</span>
            </h1>
            
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Learn, Apply and Earn in the world of Web3, blockchain, and decentralized technologies. 
              Join our expert-led cohorts and build real-world projects that matter.
            </p>
            
            <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group inline-flex items-center justify-center rounded-lg bg-web3-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-web3-700 hover:shadow-xl dark:bg-web3-500 dark:hover:bg-web3-600">
                  Start Learning
                  <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button className="group inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-md transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  <PlayIcon className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Free to start • No credit card required • Join 1000+ learners
              </p>
            </div>
          </div>
          
          <div className="mt-12 relative sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:max-w-none lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
              {/* Hero illustration/image placeholder */}
              <div className="relative aspect-square w-full rounded-lg bg-gradient-to-br from-web3-100 to-blue-100 p-8 dark:from-web3-900/20 dark:to-blue-900/20">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-24 w-24 rounded-full bg-web3-600 flex items-center justify-center mb-4">
                      <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Hands-on Learning</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Build real Web3 applications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};