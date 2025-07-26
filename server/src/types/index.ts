export enum UserRole {
  STUDENT = 'student',
  MENTOR = 'mentor',
  ADMIN = 'admin',
}

export enum CohortStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

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

export enum ChatMessageType {
  TEXT = 'text',
  FILE = 'file',
  IMAGE = 'image',
  SYSTEM = 'system',
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
  createdAt: Date;
  updatedAt: Date;
}

export interface Cohort {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  maxStudents: number;
  currentStudents: number;
  mentorId: string;
  status: CohortStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  chatRoomId: string;
  senderId: string;
  message: string;
  type: ChatMessageType;
  metadata?: Record<string, any>;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  type: 'cohort' | 'course' | 'general' | 'direct';
  cohortId?: string;
  courseId?: string;
  participants: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // in minutes
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: Date;
  maxScore: number;
  resources: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  content: string;
  files: string[];
  submittedAt: Date;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: Date;
}