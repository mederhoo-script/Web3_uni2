import React, { useState } from 'react';

export const ChatPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState('general');
  const [message, setMessage] = useState('');

  const mockRooms = [
    {
      id: 'general',
      name: 'General Discussion',
      type: 'general',
      unreadCount: 3,
      lastMessage: {
        content: 'Hey everyone! How is the course going?',
        senderName: 'Alice Smith',
        timestamp: '2024-01-10T14:30:00Z',
      },
    },
    {
      id: 'cohort-q1-2024',
      name: 'Web3 Fundamentals Q1 2024',
      type: 'cohort',
      unreadCount: 0,
      lastMessage: {
        content: 'Great lesson today!',
        senderName: 'Bob Johnson',
        timestamp: '2024-01-10T12:15:00Z',
      },
    },
    {
      id: 'blockchain-basics',
      name: 'Blockchain Basics Course',
      type: 'course',
      unreadCount: 1,
      lastMessage: {
        content: 'Question about consensus mechanisms',
        senderName: 'Carol Davis',
        timestamp: '2024-01-10T10:45:00Z',
      },
    },
    {
      id: 'project-help',
      name: 'Project Help',
      type: 'general',
      unreadCount: 0,
      lastMessage: {
        content: 'Thanks for the help with smart contracts!',
        senderName: 'David Wilson',
        timestamp: '2024-01-09T16:20:00Z',
      },
    },
  ];

  const mockMessages = [
    {
      id: 'msg1',
      senderId: 'user1',
      senderName: 'Alice Smith',
      senderAvatar: '/api/placeholder/32/32',
      message: 'Hey everyone! How is the course going?',
      timestamp: '2024-01-10T14:30:00Z',
      type: 'text',
      isOwn: false,
    },
    {
      id: 'msg2',
      senderId: 'user2',
      senderName: 'Bob Johnson',
      senderAvatar: '/api/placeholder/32/32',
      message: 'Really enjoying the blockchain fundamentals! The smart contract lesson was particularly enlightening.',
      timestamp: '2024-01-10T14:32:00Z',
      type: 'text',
      isOwn: false,
    },
    {
      id: 'msg3',
      senderId: 'current-user',
      senderName: 'You',
      senderAvatar: '/api/placeholder/32/32',
      message: 'Same here! I\'m working on the DeFi assignment now. Anyone want to collaborate?',
      timestamp: '2024-01-10T14:35:00Z',
      type: 'text',
      isOwn: true,
    },
    {
      id: 'msg4',
      senderId: 'user3',
      senderName: 'Carol Davis',
      senderAvatar: '/api/placeholder/32/32',
      message: 'I\'d love to collaborate! I\'m also working on understanding liquidity pools.',
      timestamp: '2024-01-10T14:38:00Z',
      type: 'text',
      isOwn: false,
    },
  ];

  const mockOnlineUsers = [
    { id: 'user1', name: 'Alice Smith', status: 'online' },
    { id: 'user2', name: 'Bob Johnson', status: 'online' },
    { id: 'user3', name: 'Carol Davis', status: 'away' },
    { id: 'user4', name: 'David Wilson', status: 'busy' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // TODO: Implement actual message sending via Socket.IO
    console.log('Sending message:', message);
    setMessage('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'general': return '💬';
      case 'cohort': return '👥';
      case 'course': return '📚';
      default: return '💬';
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg shadow">
      {/* Sidebar - Room List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Chat Rooms</h2>
          <p className="text-sm text-gray-600">Connect with your cohort</p>
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {mockRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`w-full p-3 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                  selectedRoom === room.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getRoomIcon(room.type)}</span>
                    <span className="font-medium text-gray-900 text-sm">{room.name}</span>
                  </div>
                  {room.unreadCount > 0 && (
                    <span className="bg-indigo-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {room.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {room.lastMessage.senderName}: {room.lastMessage.content}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTime(room.lastMessage.timestamp)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Online Users */}
        <div className="border-t border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Online Now</h3>
          <div className="space-y-2">
            {mockOnlineUsers.slice(0, 4).map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}></div>
                </div>
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{getRoomIcon(mockRooms.find(r => r.id === selectedRoom)?.type || 'general')}</span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {mockRooms.find(r => r.id === selectedRoom)?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {mockOnlineUsers.length} members online
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                🔍
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-3 max-w-xs lg:max-w-md ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!msg.isOwn && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">👤</span>
                  </div>
                )}
                <div>
                  {!msg.isOwn && (
                    <p className="text-sm font-medium text-gray-900 mb-1">{msg.senderName}</p>
                  )}
                  <div className={`p-3 rounded-lg ${
                    msg.isOwn 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-12"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                📎
              </button>
            </div>
            <button
              type="submit"
              disabled={!message.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};