import React from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
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
        <h2 className="text-2xl font-bold text-gray-900">Connect Your Wallet</h2>
        <p className="mt-2 text-sm text-gray-600">
          Connect your Web3 wallet to access Web3 University. No traditional registration required!
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Web3 Authentication</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Connect your wallet to authenticate securely without passwords. Your wallet address will be your unique identifier.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ConnectWallet 
            theme="light"
            btnTitle="Connect Wallet to Login"
            modalTitle="Choose Your Wallet"
            modalSize="wide"
            welcomeScreen={{
              title: "Welcome to Web3 University",
              subtitle: "Connect your wallet to get started",
            }}
          />
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            New to Web3?{' '}
            <a 
              href="https://metamask.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Get MetaMask
            </a>{' '}
            or another wallet to get started.
          </p>
        </div>
      </div>
    </div>
  );
};