import React from 'react';
import { useAuthStore } from '../../contexts/AuthContext';
import { UserRole } from '../../types/index';

export const CohortsPage: React.FC = () => {
  const { user } = useAuthStore();

  const mockCohort = {
    id: '1',
    name: 'Web3 Fundamentals - Q1 2024',
    description: 'Learn the basics of Web3 development with a focus on blockchain fundamentals, smart contracts, and DeFi protocols.',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    maxStudents: 25,
    currentStudents: 18,
    status: 'active',
    mentor: {
      id: 'mentor1',
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah@web3uni.com',
      avatar: '/api/placeholder/64/64',
      bio: 'Senior Blockchain Developer with 5+ years experience in DeFi and NFT projects.',
    },
    students: [
      {
        id: 'student1',
        firstName: 'Alice',
        lastName: 'Smith',
        username: 'alice_smith',
        avatar: '/api/placeholder/32/32',
        progress: 75,
        lastActive: '2024-01-10T14:30:00Z',
      },
      {
        id: 'student2',
        firstName: 'Bob',
        lastName: 'Johnson',
        username: 'bob_johnson',
        avatar: '/api/placeholder/32/32',
        progress: 60,
        lastActive: '2024-01-10T12:15:00Z',
      },
      {
        id: 'student3',
        firstName: 'Carol',
        lastName: 'Davis',
        username: 'carol_davis',
        avatar: '/api/placeholder/32/32',
        progress: 90,
        lastActive: '2024-01-10T16:45:00Z',
      },
    ],
  };

  const mockUpcomingEvents = [
    {
      id: 1,
      title: 'Weekly Cohort Meeting',
      date: '2024-01-12',
      time: '10:00 AM',
      type: 'meeting',
      description: 'Weekly sync and Q&A session',
    },
    {
      id: 2,
      title: 'Project Showcase',
      date: '2024-01-19',
      time: '2:00 PM',
      type: 'presentation',
      description: 'Present your DeFi project to the cohort',
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600 bg-green-100';
    if (progress >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Active now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Cohort</h1>
        <p className="mt-1 text-sm text-gray-600">
          Connect and learn with your fellow students
        </p>
      </div>

      {/* Cohort Overview */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-white">
          <h2 className="text-2xl font-bold mb-2">{mockCohort.name}</h2>
          <p className="text-indigo-100 mb-4">{mockCohort.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Duration:</span>
              <div>{formatDate(mockCohort.startDate)} - {formatDate(mockCohort.endDate)}</div>
            </div>
            <div>
              <span className="font-medium">Students:</span>
              <div>{mockCohort.currentStudents}/{mockCohort.maxStudents}</div>
            </div>
            <div>
              <span className="font-medium">Status:</span>
              <div className="capitalize">{mockCohort.status}</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Cohort Progress</span>
              <span className="text-sm text-gray-500">
                {Math.round((mockCohort.currentStudents / mockCohort.maxStudents) * 100)}% Full
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(mockCohort.currentStudents / mockCohort.maxStudents) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Mentor Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Mentor</h3>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400">👤</span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {mockCohort.mentor.firstName} {mockCohort.mentor.lastName}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{mockCohort.mentor.email}</p>
                <p className="text-sm text-gray-700">{mockCohort.mentor.bio}</p>
                <div className="mt-3 space-x-2">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
                    Send Message
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                    Schedule 1:1
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cohort Members */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Cohort Members</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockCohort.students.map((student) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-xs">
                        {student.firstName[0]}{student.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-sm text-gray-500">@{student.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getProgressColor(student.progress)}`}>
                      {student.progress}%
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {timeAgo(student.lastActive)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="/chat"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-center block hover:bg-indigo-700"
              >
                Join Cohort Chat
              </a>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockUpcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(event.date)} at {event.time}
                  </p>
                </div>
              ))}
            </div>
            
            {user?.role === UserRole.MENTOR && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                  + Schedule Event
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <a
            href="/chat"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <span className="text-2xl block mb-2">💬</span>
            <span className="text-sm font-medium text-gray-900">Join Chat</span>
          </a>
          <a
            href="/courses"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <span className="text-2xl block mb-2">📚</span>
            <span className="text-sm font-medium text-gray-900">Study Together</span>
          </a>
          <a
            href="/projects"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <span className="text-2xl block mb-2">🛠️</span>
            <span className="text-sm font-medium text-gray-900">Share Projects</span>
          </a>
          <a
            href="/help"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
          >
            <span className="text-2xl block mb-2">❓</span>
            <span className="text-sm font-medium text-gray-900">Get Help</span>
          </a>
        </div>
      </div>
    </div>
  );
};