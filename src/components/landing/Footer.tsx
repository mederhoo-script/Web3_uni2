import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-web3-600 flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold text-white">Web3 University</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Master the future of decentralized technology through hands-on learning.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-sm font-semibold text-white">Learn</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Courses</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-white">Community</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Forum</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
              © {currentYear} Web3 University. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-400">
                Built with ❤️ for the Web3 community
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};