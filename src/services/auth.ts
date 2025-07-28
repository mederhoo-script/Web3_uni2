import type { User, UserRole } from '../types/index';
import { dataService } from './data';

// Create a user profile from wallet address
const createUserFromAddress = (address: string): User => {
  // Check if we have existing user data
  const existingUser = dataService.getUserData();
  if (existingUser && existingUser.id === address) {
    return existingUser;
  }

  // Create new user profile
  const newUser: User = {
    id: address,
    email: `${address.slice(0, 8)}@web3uni.com`,
    username: `user_${address.slice(0, 8)}`,
    firstName: 'Web3',
    lastName: 'User',
    role: 'student' as UserRole,
    avatar: '',
    bio: 'Web3 University Student',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Save to localStorage
  dataService.saveUserData(newUser);
  return newUser;
};

export const authService = {
  // Create user from address (used by context)
  createUserFromAddress,

  // Update user profile
  updateProfile: async (data: Partial<User>, currentAddress: string): Promise<User> => {
    if (!currentAddress) throw new Error('No wallet connected');

    const currentUser = dataService.getUserData() || createUserFromAddress(currentAddress);
    const updatedUser = { ...currentUser, ...data, updatedAt: new Date().toISOString() };
    
    dataService.saveUserData(updatedUser);
    return updatedUser;
  },

  // Clear user data on logout
  logout: () => {
    dataService.clearUserData();
  },
};