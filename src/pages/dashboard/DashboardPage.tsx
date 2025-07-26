import React from 'react';
import { useAuthStore } from '../../contexts/AuthContext';
import { UserRole } from '../../types/index';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  const mockStats = {
    courses: 3,
    completedLessons: 12,
    totalLessons: 45,
    chatMessages: 28,
    cohortMembers: 18,
  };

  const mockRecentActivity = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Completed "Introduction to Blockchain"',
      time: '2 hours ago',
      icon: '✅',
    },
    {
      id: 2,
      type: 'chat_message',
      title: 'New message in General Discussion',
      time: '3 hours ago',
      icon: '💬',
    },
    {
      id: 3,
      type: 'assignment_due',
      title: 'Assignment due in 2 days',
      time: '1 day ago',
      icon: '📝',
    },
  ];

  const mockUpcomingEvents = [
    {
      id: 1,
      title: 'Weekly Cohort Meeting',
      date: '2024-01-12',
      time: '10:00 AM',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Smart Contracts Assignment Due',
      date: '2024-01-15',
      time: '11:59 PM',
      type: 'assignment',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="mt-2 text-indigo-100">
          Ready to continue your Web3 learning journey?
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.courses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockStats.completedLessons}/{mockStats.totalLessons}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">💬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chat Messages</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.chatMessages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cohort Members</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.cohortMembers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              <span className="text-sm text-gray-500">
                {Math.round((mockStats.completedLessons / mockStats.totalLessons) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{
                  width: `${(mockStats.completedLessons / mockStats.totalLessons) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <span className="text-lg">{activity.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {mockUpcomingEvents.map((event) => (
              <div key={event.id} className="border-l-4 border-indigo-500 pl-4">
                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                <p className="text-xs text-gray-500">
                  {event.date} at {event.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/courses"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <span className="text-2xl block mb-2">📚</span>
            <span className="text-sm font-medium text-gray-900">Browse Courses</span>
          </a>
          <a
            href="/chat"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <span className="text-2xl block mb-2">💬</span>
            <span className="text-sm font-medium text-gray-900">Join Chat</span>
          </a>
          <a
            href="/cohorts"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <span className="text-2xl block mb-2">👥</span>
            <span className="text-sm font-medium text-gray-900">View Cohort</span>
          </a>
        </div>
      </div>
    </div>
  );
};