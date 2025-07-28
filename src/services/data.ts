// Mock data service to replace backend API calls
import type { User, Course, Cohort, ChatRoom, ChatMessage, UserRole } from '../types/index';

// Mock user data
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'admin@web3uni.com',
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin' as UserRole,
    avatar: '',
    bio: 'Platform administrator',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user-2',
    email: 'mentor@web3uni.com',
    username: 'mentor1',
    firstName: 'John',
    lastName: 'Mentor',
    role: 'mentor' as UserRole,
    avatar: '',
    bio: 'Web3 Expert and Mentor',
    cohortId: 'cohort-1',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock course data
const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Web3',
    description: 'Learn the fundamentals of Web3 development',
    thumbnail: '',
    status: 'published',
    difficulty: 1,
    estimatedHours: 10,
    prerequisites: [],
    tags: ['blockchain', 'web3', 'beginner'],
    createdBy: 'user-2',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'course-2',
    title: 'Smart Contract Development',
    description: 'Advanced smart contract development with Solidity',
    thumbnail: '',
    status: 'published',
    difficulty: 3,
    estimatedHours: 25,
    prerequisites: ['course-1'],
    tags: ['solidity', 'smart-contracts', 'advanced'],
    createdBy: 'user-2',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock cohort data
const mockCohorts: Cohort[] = [
  {
    id: 'cohort-1',
    name: 'Web3 Bootcamp 2024',
    description: 'Intensive 12-week Web3 development bootcamp',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 84 * 24 * 60 * 60 * 1000).toISOString(), // 12 weeks from now
    maxStudents: 30,
    currentStudents: 15,
    mentorId: 'user-2',
    mentor: {
      id: 'user-2',
      firstName: 'John',
      lastName: 'Mentor',
      email: 'mentor@web3uni.com',
    },
    status: 'active',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock chat data
const mockChatRooms: ChatRoom[] = [
  {
    id: 'chat-1',
    name: 'General Discussion',
    description: 'General chat for all students',
    type: 'general',
    participantCount: 25,
    unreadCount: 3,
    lastMessage: {
      id: 'msg-1',
      content: 'Welcome to Web3 University!',
      senderName: 'John Mentor',
      timestamp: new Date().toISOString(),
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    chatRoomId: 'chat-1',
    senderId: 'user-2',
    senderName: 'John Mentor',
    senderAvatar: '',
    message: 'Welcome to Web3 University!',
    type: 'text',
    isEdited: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Data service functions
export const dataService = {
  // Users
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockUsers), 100));
  },

  getUserById: async (id: string): Promise<User | null> => {
    return new Promise((resolve) => 
      setTimeout(() => resolve(mockUsers.find(user => user.id === id) || null), 100)
    );
  },

  // Courses
  getCourses: async (): Promise<Course[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockCourses), 100));
  },

  getCourseById: async (id: string): Promise<Course | null> => {
    return new Promise((resolve) => 
      setTimeout(() => resolve(mockCourses.find(course => course.id === id) || null), 100)
    );
  },

  // Cohorts
  getCohorts: async (): Promise<Cohort[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockCohorts), 100));
  },

  getCohortById: async (id: string): Promise<Cohort | null> => {
    return new Promise((resolve) => 
      setTimeout(() => resolve(mockCohorts.find(cohort => cohort.id === id) || null), 100)
    );
  },

  // Chat
  getChatRooms: async (): Promise<ChatRoom[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockChatRooms), 100));
  },

  getChatMessages: async (chatRoomId: string): Promise<ChatMessage[]> => {
    return new Promise((resolve) => 
      setTimeout(() => resolve(mockChatMessages.filter(msg => msg.chatRoomId === chatRoomId)), 100)
    );
  },

  sendMessage: async (chatRoomId: string, message: string, senderId: string): Promise<ChatMessage> => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      chatRoomId,
      senderId,
      senderName: mockUsers.find(u => u.id === senderId)?.firstName + ' ' + mockUsers.find(u => u.id === senderId)?.lastName || 'Unknown',
      senderAvatar: '',
      message,
      type: 'text',
      isEdited: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockChatMessages.push(newMessage);
    return new Promise((resolve) => setTimeout(() => resolve(newMessage), 100));
  },

  // Local storage helpers for user data
  saveUserData: (user: User) => {
    localStorage.setItem('user_profile', JSON.stringify(user));
  },

  getUserData: (): User | null => {
    const userData = localStorage.getItem('user_profile');
    return userData ? JSON.parse(userData) : null;
  },

  clearUserData: () => {
    localStorage.removeItem('user_profile');
  },
};