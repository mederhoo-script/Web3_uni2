import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../contexts/AuthContext';
import { UserRole } from '../../types/index';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      roles: [UserRole.STUDENT, UserRole.MENTOR, UserRole.ADMIN],
    },
    {
      name: 'Courses',
      href: '/courses',
      icon: '📚',
      roles: [UserRole.STUDENT, UserRole.MENTOR, UserRole.ADMIN],
    },
    {
      name: 'My Cohort',
      href: '/cohorts',
      icon: '👥',
      roles: [UserRole.STUDENT, UserRole.MENTOR, UserRole.ADMIN],
    },
    {
      name: 'Chat',
      href: '/chat',
      icon: '💬',
      roles: [UserRole.STUDENT, UserRole.MENTOR, UserRole.ADMIN],
    },
    {
      name: 'Progress',
      href: '/progress',
      icon: '📈',
      roles: [UserRole.STUDENT],
    },
    {
      name: 'Mentor Panel',
      href: '/mentor',
      icon: '🎓',
      roles: [UserRole.MENTOR],
    },
    {
      name: 'Admin Panel',
      href: '/admin',
      icon: '⚙️',
      roles: [UserRole.ADMIN],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role as UserRole)
  );

  return (
    <aside className="fixed top-16 left-0 w-64 h-full bg-white shadow-sm border-r border-gray-200 z-40">
      <nav className="p-4">
        <div className="space-y-2">
          {filteredNavItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>

        {/* User Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {user?.role}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <a
              href="/courses/new"
              className="block text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              📝 Create Course
            </a>
            <a
              href="/chat/new"
              className="block text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              💬 Start Chat
            </a>
            <a
              href="/help"
              className="block text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              ❓ Get Help
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
};