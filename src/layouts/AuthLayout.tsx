import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex min-h-screen">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900">Web3 University</h1>
              <p className="mt-4 text-lg text-gray-600">
                Master the future of decentralized technology through hands-on learning
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900">Expert Mentors</div>
                <div>Learn from industry professionals</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900">Cohort Learning</div>
                <div>Collaborate with peers</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900">Real Projects</div>
                <div>Build portfolio-worthy apps</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="font-semibold text-gray-900">24/7 Support</div>
                <div>Get help when you need it</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="mb-8 text-center lg:hidden">
                <h1 className="text-2xl font-bold text-gray-900">Web3 University</h1>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};