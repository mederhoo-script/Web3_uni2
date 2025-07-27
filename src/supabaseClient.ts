import { createClient } from '@supabase/supabase-js';

// Supabase configuration using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL and Anon Key are required. Please check your environment variables.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Database types based on our schema
export interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  status: 'draft' | 'published' | 'archived';
  difficulty: number;
  estimated_hours: number;
  prerequisites: string[] | null;
  tags: string[] | null;
  created_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  content: string;
  type: 'video' | 'text' | 'interactive' | 'assignment' | 'quiz';
  order_index: number;
  duration: number | null;
  resources: string[] | null;
  is_required: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: 'student' | 'mentor' | 'admin';
  avatar: string | null;
  bio: string | null;
  cohort_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  completed: boolean;
  score: number | null;
  time_spent: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Course service functions
export const courseService = {
  // Get all published courses
  async getCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }

    return data || [];
  },

  // Get course by ID with lessons
  async getCourseById(courseId: string): Promise<Course & { lessons?: Lesson[] }> {
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .eq('is_active', true)
      .single();

    if (courseError) {
      console.error('Error fetching course:', courseError);
      throw courseError;
    }

    // Also fetch lessons for this course
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', courseId)
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
      // Don't throw error for lessons, just log it
    }

    return {
      ...course,
      lessons: lessons || []
    };
  },

  // Get user's progress for a course
  async getUserProgress(userId: string, courseId: string): Promise<UserProgress[]> {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }

    return data || [];
  },

  // Calculate course progress percentage
  async getCourseProgress(userId: string, courseId: string): Promise<number> {
    try {
      // Get total lessons for the course
      const { data: lessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('id')
        .eq('course_id', courseId)
        .eq('is_active', true);

      if (lessonsError) throw lessonsError;

      const totalLessons = lessons?.length || 0;
      if (totalLessons === 0) return 0;

      // Get completed lessons
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('completed', true);

      if (progressError) throw progressError;

      const completedLessons = progress?.length || 0;
      return Math.round((completedLessons / totalLessons) * 100);
    } catch (error) {
      console.error('Error calculating course progress:', error);
      return 0;
    }
  }
};

export default supabase;