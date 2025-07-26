// User types
export enum UserRole {
  STUDENT = 'student',
  MENTOR = 'mentor',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  cohortId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Cohort types
export enum CohortStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Cohort {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  mentorId: string;
  mentor?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  status: CohortStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Course types
export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum LessonType {
  VIDEO = 'video',
  TEXT = 'text',
  INTERACTIVE = 'interactive',
  ASSIGNMENT = 'assignment',
  QUIZ = 'quiz',
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  status: CourseStatus;
  difficulty: number; // 1-5
  estimatedHours: number;
  prerequisites: string[];
  tags: string[];
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  type: LessonType;
  order: number;
  duration?: number; // in minutes
  resources: string[];
  isRequired: boolean;
  isActive: boolean;
  completed?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  timeSpent: number; // in minutes
  lastAccessed: string | null;
}

// Chat types
export enum ChatMessageType {
  TEXT = 'text',
  FILE = 'file',
  IMAGE = 'image',
  SYSTEM = 'system',
}

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  type: ChatMessageType;
  metadata?: Record<string, any>;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  type: 'cohort' | 'course' | 'general' | 'direct';
  cohortId?: string;
  courseId?: string;
  participantCount: number;
  unreadCount: number;
  lastMessage?: {
    id: string;
    content: string;
    senderName: string;
    timestamp: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    message: string;
    stack?: string;
  };
  timestamp?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination?: PaginationMeta;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
}

export interface ProfileUpdateForm {
  firstName: string;
  lastName: string;
  bio?: string;
  avatar?: File;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<any>;
  current?: boolean;
  children?: NavItem[];
}

// Notification types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Socket.IO types
export interface SocketEvents {
  // Client to server
  join_chat_room: (roomId: string) => void;
  leave_chat_room: (roomId: string) => void;
  send_message: (data: {
    chatRoomId: string;
    message: string;
    type: string;
  }) => void;
  typing_start: (chatRoomId: string) => void;
  typing_stop: (chatRoomId: string) => void;
  status_update: (status: 'online' | 'away' | 'busy') => void;

  // Server to client
  new_message: (message: ChatMessage) => void;
  user_typing: (data: { userId: string; chatRoomId: string }) => void;
  user_stopped_typing: (data: { userId: string; chatRoomId: string }) => void;
  user_status_changed: (data: { userId: string; status: string }) => void;
  notification: (notification: Notification) => void;
  joined_chat_room: (roomId: string) => void;
  left_chat_room: (roomId: string) => void;
}