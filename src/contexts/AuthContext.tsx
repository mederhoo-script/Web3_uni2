import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
// Removed unused createUserFromAddress function

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