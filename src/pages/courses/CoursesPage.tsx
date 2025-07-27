import React, { useState, useEffect } from 'react';
import { courseService, type Course } from '../../supabaseClient';

interface CourseWithProgress extends Course {
  progress: number;
  enrolledStudents: number;
  rating: number;
}

export const CoursesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load courses from Supabase
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const supabaseCourses = await courseService.getCourses();
        
        // Transform Supabase courses to include additional UI data
        // In a real app, you'd calculate these from actual data
        const coursesWithProgress: CourseWithProgress[] = supabaseCourses.map(course => ({
          ...course,
          // Mock data for demonstration - in real app, these would come from database queries
          progress: Math.floor(Math.random() * 101), // Random progress for demo
          enrolledStudents: Math.floor(Math.random() * 50) + 10, // Random enrolled count
          rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // Random rating 3.5-5.0
        }));
        
        setCourses(coursesWithProgress);
      } catch (err) {
        console.error('Error loading courses:', err);
        setError('Failed to load courses. Please check your Supabase configuration.');
        
        // Fallback to mock data if Supabase fails
        const mockCourses: CourseWithProgress[] = [
          {
            id: '1',
            title: 'Introduction to Blockchain',
            description: 'Learn the fundamentals of blockchain technology and its applications.',
            thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
            status: 'published' as const,
            difficulty: 1,
            estimated_hours: 8,
            prerequisites: null,
            tags: ['blockchain', 'fundamentals', 'beginner'],
            created_by: 'mock',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            enrolledStudents: 45,
            rating: 4.8,
            progress: 25,
          },
          {
            id: '2',
            title: 'Smart Contract Development',
            description: 'Build and deploy smart contracts using Solidity and Ethereum.',
            thumbnail: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
            status: 'published' as const,
            difficulty: 3,
            estimated_hours: 16,
            prerequisites: null,
            tags: ['solidity', 'ethereum', 'smart-contracts'],
            created_by: 'mock',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            enrolledStudents: 32,
            rating: 4.9,
            progress: 60,
          },
        ];
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' || 
                         (filter === 'enrolled' && course.progress > 0) ||
                         (filter === 'completed' && course.progress === 100) ||
                         (filter === 'beginner' && course.difficulty <= 2) ||
                         (filter === 'advanced' && course.difficulty >= 3);
    return matchesSearch && matchesFilter;
  });

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return 'Beginner';
    if (difficulty <= 3) return 'Intermediate';
    return 'Advanced';
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <p className="mt-1 text-sm text-gray-600">
          Explore our comprehensive Web3 curriculum{' '}
          {courses.length > 0 && `(${courses.length} courses available)`}
        </p>
        {error && (
          <div className="mt-2 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md text-sm">
            <span className="font-semibold">Note:</span> {error} Showing sample data instead.
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Courses</option>
              <option value="enrolled">Enrolled</option>
              <option value="completed">Completed</option>
              <option value="beginner">Beginner</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600">Loading courses...</span>
        </div>
      )}

      {/* Course Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                {course.thumbnail ? (
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder on image error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<span class="text-gray-400">📚 Course Thumbnail</span>';
                    }}
                  />
                ) : (
                  <span className="text-gray-400">📚 Course Thumbnail</span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course.difficulty)}`}>
                    {getDifficultyLabel(course.difficulty)}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>⭐ {course.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>⏱️ {course.estimated_hours}h</span>
                  <span>👥 {course.enrolledStudents} students</span>
                </div>

                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mb-4">
                  {(course.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  {course.progress > 0 ? (
                    <a
                      href={`/courses/${course.id}`}
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-center hover:bg-indigo-700 transition-colors"
                    >
                      Continue
                    </a>
                  ) : (
                    <a
                      href={`/courses/${course.id}`}
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-center hover:bg-indigo-700 transition-colors"
                    >
                      Start Course
                    </a>
                  )}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <span className="text-4xl mb-4 block">📚</span>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">
            {courses.length === 0 
              ? 'No courses available. Please check your Supabase configuration and ensure you have created some courses.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          {courses.length === 0 && (
            <div className="mt-4 text-sm text-gray-500">
              <p>To get started:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Set up your Supabase project</li>
                <li>Configure your environment variables</li>
                <li>Run the database schema and seed data</li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};