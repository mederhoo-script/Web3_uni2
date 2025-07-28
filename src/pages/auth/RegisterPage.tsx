import React from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../contexts/AuthContext';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Join Web3 University</h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have a wallet connected?{' '}
          <a href="/login" className="text-indigo-600 hover:text-indigo-500">
            Sign in here
          </a>
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Welcome to the Future of Education</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-medium">1</span>
                </div>
              </div>
              <div className="ml-3">
                <p>Connect your Web3 wallet (MetaMask, WalletConnect, etc.)</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-medium">2</span>
                </div>
              </div>
              <div className="ml-3">
                <p>Your wallet address becomes your unique identity</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                  <span className="text-blue-600 font-medium">3</span>
                </div>
              </div>
              <div className="ml-3">
                <p>Start learning Web3 development immediately!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ConnectWallet 
            theme="light"
            btnTitle="Connect Wallet to Join"
            modalTitle="Choose Your Wallet"
            modalSize="wide"
            welcomeScreen={{
              title: "Join Web3 University",
              subtitle: "Connect your wallet to start your Web3 journey",
            }}
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Don't have a wallet?{' '}
            <a 
              href="https://metamask.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Download MetaMask
            </a>{' '}
            to get started with Web3.
          </p>
        </div>

        <div className="bg-gray-50 rounded-md p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Why Web3 Authentication?</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• No passwords to remember or forget</li>
            <li>• Complete control over your identity</li>
            <li>• Secure and decentralized authentication</li>
            <li>• Connect with the same wallet across all Web3 apps</li>
          </ul>
        </div>
      </div>
    </div>
  );
};