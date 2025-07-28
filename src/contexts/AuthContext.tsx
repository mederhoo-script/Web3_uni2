import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAddress, useConnectionStatus } from '@thirdweb-dev/react';
import type { User, AuthState } from '../types/index';
import { authService } from '../services/auth';

interface AuthStore extends AuthState {
  // Actions
  connectWallet: () => void;
  disconnectWallet: () => void;
  logout: () => void; // Add alias for disconnectWallet
  updateProfile: (data: Partial<User>) => Promise<void>;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

// Create user from wallet address
const createUserFromAddress = (address: string): User => {
  return authService.createUserFromAddress(address);
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      connectWallet: () => {
        // This will be handled by Thirdweb ConnectWallet button
        // The actual connection logic is in the initialize function
      },

      disconnectWallet: () => {
        authService.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      logout: () => {
        // Alias for disconnectWallet for backwards compatibility
        const { disconnectWallet } = get();
        disconnectWallet();
      },

      updateProfile: async (data: Partial<User>) => {
        try {
          const { user } = get();
          if (!user) throw new Error('No user found');

          const updatedUser = await authService.updateProfile(data, user.id);
          set({ user: updatedUser });
        } catch (error) {
          throw error;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      initialize: () => {
        // This function will be called from a component that has access to Thirdweb hooks
        // We'll create a separate hook for this
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

// Custom hook to handle Thirdweb authentication
export const useThirdwebAuth = () => {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const { setLoading, disconnectWallet } = useAuthStore();

  const initialize = () => {
    if (connectionStatus === 'connecting') {
      setLoading(true);
      return;
    }

    if (address && connectionStatus === 'connected') {
      const user = createUserFromAddress(address);
      useAuthStore.setState({
        user,
        token: address, // Use address as token
        isAuthenticated: true,
        isLoading: false,
      });
    } else if (connectionStatus === 'disconnected') {
      disconnectWallet();
    } else {
      setLoading(false);
    }
  };

  return {
    address,
    connectionStatus,
    initialize,
  };
};