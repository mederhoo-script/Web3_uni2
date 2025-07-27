-- Sample data for Web3 University

-- Insert sample users
INSERT INTO users (id, email, username, password_hash, first_name, last_name, role) VALUES
('11111111-1111-1111-1111-111111111111', 'admin@web3uni.com', 'admin', '$2b$10$hash', 'System', 'Admin', 'admin'),
('22222222-2222-2222-2222-222222222222', 'sarah@web3uni.com', 'sarah_wilson', '$2b$10$hash', 'Sarah', 'Wilson', 'mentor'),
('33333333-3333-3333-3333-333333333333', 'alice@example.com', 'alice_smith', '$2b$10$hash', 'Alice', 'Smith', 'student'),
('44444444-4444-4444-4444-444444444444', 'bob@example.com', 'bob_johnson', '$2b$10$hash', 'Bob', 'Johnson', 'student'),
('55555555-5555-5555-5555-555555555555', 'carol@example.com', 'carol_davis', '$2b$10$hash', 'Carol', 'Davis', 'student');

-- Insert sample cohorts
INSERT INTO cohorts (id, name, description, start_date, end_date, max_students, mentor_id, status) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Web3 Fundamentals - Q1 2024', 'Learn the basics of Web3 development with a focus on blockchain fundamentals, smart contracts, and DeFi protocols.', '2024-01-15', '2024-04-15', 25, '22222222-2222-2222-2222-222222222222', 'active'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Advanced Smart Contracts - Q1 2024', 'Advanced course covering complex smart contract patterns, security, and optimization.', '2024-02-01', '2024-05-01', 20, '22222222-2222-2222-2222-222222222222', 'active');

-- Update users with cohort assignments
UPDATE users SET cohort_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' WHERE id IN ('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555');

-- Insert sample courses
INSERT INTO courses (id, title, description, difficulty, estimated_hours, tags, created_by, status) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Introduction to Blockchain', 'Learn the fundamentals of blockchain technology and its applications.', 1, 8, ARRAY['blockchain', 'fundamentals', 'beginner'], '22222222-2222-2222-2222-222222222222', 'published'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Smart Contract Development', 'Build and deploy smart contracts using Solidity and Ethereum.', 3, 16, ARRAY['solidity', 'ethereum', 'smart-contracts'], '22222222-2222-2222-2222-222222222222', 'published'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'DeFi Protocols Deep Dive', 'Understand decentralized finance protocols and their mechanisms.', 4, 12, ARRAY['defi', 'protocols', 'advanced'], '22222222-2222-2222-2222-222222222222', 'published');

-- Insert sample lessons
INSERT INTO lessons (course_id, title, description, content, type, order_index, duration) VALUES
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'What is Blockchain?', 'Introduction to blockchain concepts', 'This lesson covers the basic concepts of blockchain technology...', 'video', 1, 15),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Blockchain Architecture', 'Understanding how blockchains work', 'Learn about the technical architecture of blockchain systems...', 'text', 2, 20),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Consensus Mechanisms', 'Proof of Work vs Proof of Stake', 'Explore different consensus mechanisms used in blockchain networks...', 'interactive', 3, 25),

('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Solidity Basics', 'Introduction to Solidity programming', 'Learn the basics of Solidity programming language...', 'video', 1, 30),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Writing Your First Contract', 'Hands-on smart contract development', 'Create your first smart contract from scratch...', 'interactive', 2, 45),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Contract Deployment', 'Deploy contracts to testnet', 'Learn how to deploy and interact with smart contracts...', 'assignment', 3, 60);

-- Insert sample chat rooms
INSERT INTO chat_rooms (id, name, description, type, cohort_id) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'General Discussion', 'General chat for all students', 'general', NULL),
('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Web3 Fundamentals Q1 2024', 'Chat room for the Web3 Fundamentals cohort', 'cohort', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- Insert sample chat messages
INSERT INTO chat_messages (chat_room_id, sender_id, message, type) VALUES
('ffffffff-ffff-ffff-ffff-ffffffffffff', '33333333-3333-3333-3333-333333333333', 'Hey everyone! How is the course going?', 'text'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '44444444-4444-4444-4444-444444444444', 'Really enjoying the blockchain fundamentals! The smart contract lesson was particularly enlightening.', 'text'),
('gggggggg-gggg-gggg-gggg-gggggggggggg', '55555555-5555-5555-5555-555555555555', 'Great lesson today! Looking forward to the next one.', 'text');

-- Insert sample user progress
INSERT INTO user_progress (user_id, course_id, lesson_id, completed, score, time_spent) VALUES
('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', (SELECT id FROM lessons WHERE course_id = 'cccccccc-cccc-cccc-cccc-cccccccccccc' AND order_index = 1), true, 95, 18),
('33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', (SELECT id FROM lessons WHERE course_id = 'cccccccc-cccc-cccc-cccc-cccccccccccc' AND order_index = 2), true, 88, 25),
('44444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', (SELECT id FROM lessons WHERE course_id = 'cccccccc-cccc-cccc-cccc-cccccccccccc' AND order_index = 1), true, 92, 20);

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message) VALUES
('33333333-3333-3333-3333-333333333333', 'course_update', 'New Lesson Available', 'A new lesson has been added to "Introduction to Blockchain"'),
('44444444-4444-4444-4444-444444444444', 'assignment_due', 'Assignment Due Tomorrow', 'Your smart contract assignment is due tomorrow at 11:59 PM'),
('55555555-5555-5555-5555-555555555555', 'cohort_announcement', 'Weekly Meeting', 'Don\'t forget about our weekly cohort meeting on Friday at 10 AM');