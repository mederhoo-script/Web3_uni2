import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole, AuthState } from '../types/index';
import { authService } from '../services/auth';
import { setAuthToken } from '../services/api';
import { socketService } from '../services/socket';

interface AuthStore extends AuthState {
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: UserRole;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  setLoading: (loading: boolean) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          
          const { user, token } = await authService.login({ email, password });
          
          // Set token for API requests
          setAuthToken(token);
          
          // Connect to Socket.IO
          socketService.connect(token);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (data) => {
        try {
          set({ isLoading: true });
          
          const { user, token } = await authService.register({
            ...data,
            confirmPassword: data.password, // For validation
          });
          
          // Set token for API requests
          setAuthToken(token);
          
          // Connect to Socket.IO
          socketService.connect(token);
          
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        // Clear API token
        setAuthToken(null);
        
        // Disconnect from Socket.IO
        socketService.disconnect();
        
        // Clear auth service logout (optional API call)
        authService.logout().catch(console.error);
        
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateProfile: async (data) => {
        try {
          const updatedUser = await authService.updateProfile(data);
          set((state) => ({
            user: updatedUser,
          }));
        } catch (error) {
          throw error;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      initialize: async () => {
        const { token } = get();
        
        if (!token) {
          return;
        }

        try {
          set({ isLoading: true });
          
          // Set token for API requests
          setAuthToken(token);
          
          // Get current user profile
          const user = await authService.getProfile();
          
          // Connect to Socket.IO
          socketService.connect(token);
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          // Clear invalid token
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          setAuthToken(null);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);