import React from 'react';
import { 
  UserGroupIcon, 
  TrophyIcon, 
  StarIcon,
  BuildingOffice2Icon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Active Students', value: '2,500+', icon: UserGroupIcon },
  { name: 'Completed Projects', value: '1,200+', icon: TrophyIcon },
  { name: 'Expert Mentors', value: '50+', icon: StarIcon },
  { name: 'Partner Companies', value: '100+', icon: BuildingOffice2Icon },
];

const highlights = [
  {
    title: 'Expert-Led Cohorts',
    description: 'Learn from industry professionals with 5+ years of Web3 experience.',
    image: '👨‍💻',
  },
  {
    title: 'Real-World Projects',
    description: 'Build portfolio-worthy applications that solve actual problems.',
    image: '🚀',
  },
  {
    title: 'Global Community',
    description: 'Connect with learners and professionals from around the world.',
    image: '🌍',
  },
  {
    title: '24/7 Support',
    description: 'Get help whenever you need it through our community and mentors.',
    image: '💬',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Blockchain Developer at ConsenSys',
    content: 'Web3 University completely transformed my career. The hands-on approach and expert mentorship helped me land my dream job in just 6 months.',
    location: 'San Francisco, CA',
  },
  {
    name: 'Marcus Johnson',
    role: 'Smart Contract Engineer',
    content: 'The DeFi course was incredible. I went from zero knowledge to building my own protocol. The community support was amazing throughout the journey.',
    location: 'London, UK',
  },
  {
    name: 'Priya Patel',
    role: 'Web3 Frontend Developer',
    content: 'Amazing curriculum and teaching quality. The projects we built are now part of my professional portfolio. Highly recommend to anyone serious about Web3.',
    location: 'Mumbai, India',
  },
];

export const CommunityHighlights: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Join a Thriving Community
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Connect with thousands of Web3 enthusiasts, from beginners to experts, 
            all learning and building together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.name} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-web3-600 dark:bg-web3-500">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlights Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{highlight.image}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {highlight.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            What Our Students Say
          </h3>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-900 dark:shadow-gray-900/20">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
                <div className="mt-4">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-web3-600 dark:text-web3-400">
                    {testimonial.role}
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPinIcon className="h-3 w-3 mr-1" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-web3-600 px-6 py-12 text-center dark:bg-web3-700">
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Start Your Web3 Journey?
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-web3-100">
            Join thousands of students who are already building the future of the internet. 
            Start with our free introductory course.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-medium text-web3-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl">
              Start Free Course
            </button>
            <button className="inline-flex items-center rounded-lg border border-white/20 bg-transparent px-6 py-3 text-base font-medium text-white transition-all hover:bg-white/10">
              Talk to Advisor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};