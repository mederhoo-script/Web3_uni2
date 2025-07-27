import React, { useState } from 'react';
import { UserRole } from '../../types/index';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockStats = {
    totalUsers: 150,
    totalCohorts: 8,
    totalCourses: 12,
    activeSessions: 45,
    newUsersThisWeek: 12,
    completionRate: 78,
    avgSessionDuration: 25,
    activeChats: 8,
  };

  const mockRecentActivity = [
    {
      id: 1,
      type: 'user_registered',
      message: 'New user Alice Smith registered',
      timestamp: '2024-01-10T14:30:00Z',
      icon: '👤',
    },
    {
      id: 2,
      type: 'cohort_completed',
      message: 'Cohort "Web3 Basics Q4 2023" completed',
      timestamp: '2024-01-10T12:00:00Z',
      icon: '🎓',
    },
    {
      id: 3,
      type: 'course_published',
      message: 'New course "Advanced DeFi" published',
      timestamp: '2024-01-10T10:15:00Z',
      icon: '📚',
    },
    {
      id: 4,
      type: 'error',
      message: 'Database connection timeout resolved',
      timestamp: '2024-01-10T09:30:00Z',
      icon: '⚠️',
    },
  ];

  const mockUsers = [
    {
      id: 'user1',
      email: 'alice@example.com',
      username: 'alice_smith',
      firstName: 'Alice',
      lastName: 'Smith',
      role: UserRole.STUDENT,
      cohortId: 'cohort1',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: '2024-01-10T14:30:00Z',
    },
    {
      id: 'user2',
      email: 'bob@example.com',
      username: 'bob_johnson',
      firstName: 'Bob',
      lastName: 'Johnson',
      role: UserRole.STUDENT,
      cohortId: 'cohort1',
      isActive: true,
      createdAt: '2024-01-02T00:00:00Z',
      lastLogin: '2024-01-10T12:15:00Z',
    },
    {
      id: 'user3',
      email: 'sarah@example.com',
      username: 'sarah_wilson',
      firstName: 'Sarah',
      lastName: 'Wilson',
      role: UserRole.MENTOR,
      cohortId: 'cohort1',
      isActive: true,
      createdAt: '2023-12-15T00:00:00Z',
      lastLogin: '2024-01-10T16:45:00Z',
    },
  ];

  const mockCohorts = [
    {
      id: 'cohort1',
      name: 'Web3 Fundamentals - Q1 2024',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      maxStudents: 25,
      currentStudents: 18,
      completionRate: 65,
      mentor: { id: 'mentor1', name: 'Sarah Wilson' },
    },
    {
      id: 'cohort2',
      name: 'Advanced Smart Contracts - Q1 2024',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      maxStudents: 20,
      currentStudents: 15,
      completionRate: 45,
      mentor: { id: 'mentor2', name: 'Mike Chen' },
    },
  ];

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'cohorts', name: 'Cohorts', icon: '🎓' },
    { id: 'courses', name: 'Courses', icon: '📚' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.totalUsers}</p>
              <p className="text-xs text-green-600">+{mockStats.newUsersThisWeek} this week</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">🎓</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Cohorts</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.totalCohorts}</p>
              <p className="text-xs text-gray-500">{mockStats.completionRate}% completion rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📚</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.totalCourses}</p>
              <p className="text-xs text-gray-500">3 published this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-2xl">💻</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStats.activeSessions}</p>
              <p className="text-xs text-gray-500">{mockStats.avgSessionDuration}min avg duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">📈 Chart Placeholder</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Completion Rates</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">📊 Chart Placeholder</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {mockRecentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <span className="text-lg">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{timeAgo(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Add User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cohort
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.cohortId || 'None'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.lastLogin)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCohorts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Cohort Management</h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + Create Cohort
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCohorts.map((cohort) => (
          <div key={cohort.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{cohort.name}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                cohort.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {cohort.status}
              </span>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{formatDate(cohort.startDate)} - {formatDate(cohort.endDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Students:</span>
                <span>{cohort.currentStudents}/{cohort.maxStudents}</span>
              </div>
              <div className="flex justify-between">
                <span>Completion Rate:</span>
                <span>{cohort.completionRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Mentor:</span>
                <span>{cohort.mentor.name}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700">
                  View Details
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'users': return renderUsers();
      case 'cohorts': return renderCohorts();
      case 'courses': return <div className="text-center py-12 text-gray-500">Course management coming soon...</div>;
      case 'analytics': return <div className="text-center py-12 text-gray-500">Advanced analytics coming soon...</div>;
      case 'settings': return <div className="text-center py-12 text-gray-500">System settings coming soon...</div>;
      default: return renderDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage users, cohorts, courses, and system settings
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};