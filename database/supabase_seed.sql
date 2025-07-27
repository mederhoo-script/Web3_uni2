-- Web3 University Sample Seed Data for Supabase
-- Note: This assumes users are already created through Supabase Auth

-- Sample users (these would typically be created through Supabase Auth first)
-- Then you'd insert additional profile data:

-- Insert sample user profiles (assuming auth.users already exist)
-- You'll need to replace these UUIDs with actual user IDs from your Supabase Auth
INSERT INTO users (id, email, username, first_name, last_name, role, bio, is_active) VALUES
    ('00000000-0000-0000-0000-000000000001', 'admin@web3uni.com', 'admin', 'Admin', 'User', 'admin', 'Platform administrator with full access to all features.', true),
    ('00000000-0000-0000-0000-000000000002', 'mentor1@web3uni.com', 'mentor_alice', 'Alice', 'Johnson', 'mentor', 'Experienced blockchain developer and educator with 5+ years in Web3.', true),
    ('00000000-0000-0000-0000-000000000003', 'mentor2@web3uni.com', 'mentor_bob', 'Bob', 'Smith', 'mentor', 'DeFi specialist and smart contract auditor.', true),
    ('00000000-0000-0000-0000-000000000004', 'student1@web3uni.com', 'student_charlie', 'Charlie', 'Brown', 'student', 'Computer science student passionate about blockchain technology.', true),
    ('00000000-0000-0000-0000-000000000005', 'student2@web3uni.com', 'student_diana', 'Diana', 'Wilson', 'student', 'Former frontend developer transitioning to Web3.', true),
    ('00000000-0000-0000-0000-000000000006', 'student3@web3uni.com', 'student_eve', 'Eve', 'Davis', 'student', 'Business analyst learning Web3 for career advancement.', true)
ON CONFLICT (id) DO NOTHING;

-- Sample cohorts
INSERT INTO cohorts (id, name, description, start_date, end_date, max_students, mentor_id, status) VALUES
    ('10000000-0000-0000-0000-000000000001', 'Web3 Fundamentals - Spring 2024', 'Comprehensive introduction to blockchain and Web3 technologies for beginners.', '2024-03-01', '2024-05-31', 25, '00000000-0000-0000-0000-000000000002', 'active'),
    ('10000000-0000-0000-0000-000000000002', 'DeFi Development Bootcamp', 'Intensive program focused on building decentralized finance applications.', '2024-04-15', '2024-07-15', 20, '00000000-0000-0000-0000-000000000003', 'upcoming'),
    ('10000000-0000-0000-0000-000000000003', 'Advanced Smart Contracts', 'Deep dive into advanced Solidity patterns and security best practices.', '2024-02-01', '2024-04-30', 15, '00000000-0000-0000-0000-000000000002', 'active')
ON CONFLICT (id) DO NOTHING;

-- Update users to assign them to cohorts
UPDATE users SET cohort_id = '10000000-0000-0000-0000-000000000001' WHERE id = '00000000-0000-0000-0000-000000000004';
UPDATE users SET cohort_id = '10000000-0000-0000-0000-000000000001' WHERE id = '00000000-0000-0000-0000-000000000005';
UPDATE users SET cohort_id = '10000000-0000-0000-0000-000000000003' WHERE id = '00000000-0000-0000-0000-000000000006';

-- Sample courses
INSERT INTO courses (id, title, description, thumbnail, status, difficulty, estimated_hours, prerequisites, tags, created_by) VALUES
    ('20000000-0000-0000-0000-000000000001', 
     'Introduction to Blockchain', 
     'Learn the fundamentals of blockchain technology, including how it works, its key features, and real-world applications. Perfect for beginners with no prior experience.',
     'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
     'published', 
     1, 
     8, 
     ARRAY[]::text[], 
     ARRAY['blockchain', 'fundamentals', 'beginner', 'cryptocurrency'], 
     '00000000-0000-0000-0000-000000000002'),
     
    ('20000000-0000-0000-0000-000000000002', 
     'Smart Contract Development with Solidity', 
     'Build and deploy smart contracts using Solidity and Ethereum. Learn best practices, testing, and security considerations.',
     'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
     'published', 
     3, 
     16, 
     ARRAY['Basic programming knowledge', 'Introduction to Blockchain'], 
     ARRAY['solidity', 'ethereum', 'smart-contracts', 'development'], 
     '00000000-0000-0000-0000-000000000002'),
     
    ('20000000-0000-0000-0000-000000000003', 
     'DeFi Protocols Deep Dive', 
     'Understand decentralized finance protocols, their mechanisms, and how to interact with them. Covers liquidity pools, yield farming, and more.',
     'https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop',
     'published', 
     4, 
     12, 
     ARRAY['Smart Contract Development', 'Ethereum fundamentals'], 
     ARRAY['defi', 'protocols', 'advanced', 'liquidity', 'yield-farming'], 
     '00000000-0000-0000-0000-000000000003'),
     
    ('20000000-0000-0000-0000-000000000004', 
     'Web3 Frontend Development', 
     'Build decentralized applications (dApps) using React, Web3.js, and Ethers.js. Learn to connect your frontend to smart contracts.',
     'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&h=300&fit=crop',
     'published', 
     3, 
     14, 
     ARRAY['React knowledge', 'JavaScript', 'Smart Contract Development'], 
     ARRAY['react', 'web3js', 'ethersjs', 'dapp', 'frontend'], 
     '00000000-0000-0000-0000-000000000002'),
     
    ('20000000-0000-0000-0000-000000000005', 
     'NFT Development and Marketplace', 
     'Create and deploy NFT contracts, build marketplaces, and understand the NFT ecosystem. Includes ERC-721 and ERC-1155 standards.',
     'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=300&fit=crop',
     'published', 
     3, 
     10, 
     ARRAY['Smart Contract Development', 'Token standards'], 
     ARRAY['nft', 'erc721', 'erc1155', 'marketplace', 'tokens'], 
     '00000000-0000-0000-0000-000000000003'),
     
    ('20000000-0000-0000-0000-000000000006', 
     'Blockchain Security and Auditing', 
     'Learn to identify and prevent common smart contract vulnerabilities. Covers security best practices and auditing techniques.',
     'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
     'published', 
     5, 
     18, 
     ARRAY['Advanced Smart Contract Development', 'Security fundamentals'], 
     ARRAY['security', 'auditing', 'vulnerabilities', 'best-practices', 'advanced'], 
     '00000000-0000-0000-0000-000000000003'),
     
    ('20000000-0000-0000-0000-000000000007', 
     'Layer 2 Solutions and Scaling', 
     'Explore Ethereum Layer 2 solutions including Polygon, Arbitrum, and Optimism. Learn about rollups and sidechains.',
     'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
     'draft', 
     4, 
     15, 
     ARRAY['Ethereum fundamentals', 'Smart contracts'], 
     ARRAY['layer2', 'scaling', 'polygon', 'arbitrum', 'rollups'], 
     '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Sample lessons for "Introduction to Blockchain" course
INSERT INTO lessons (id, course_id, title, description, content, type, order_index, duration, resources) VALUES
    ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'What is Blockchain?', 'Introduction to blockchain technology and its core concepts.', 
     'A blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography...', 
     'text', 1, 45, ARRAY['https://bitcoin.org/bitcoin.pdf', 'https://ethereum.org/whitepaper/']),
     
    ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Cryptographic Fundamentals', 'Understanding hash functions, digital signatures, and cryptographic security.', 
     'Cryptography is the foundation of blockchain security. In this lesson, we will explore hash functions, digital signatures, and how they secure blockchain networks...', 
     'text', 2, 60, ARRAY['https://en.wikipedia.org/wiki/Cryptographic_hash_function']),
     
    ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Consensus Mechanisms', 'Learn about Proof of Work, Proof of Stake, and other consensus algorithms.', 
     'Consensus mechanisms are protocols that ensure all nodes in a blockchain network agree on the validity of transactions...', 
     'text', 3, 75, ARRAY[]),
     
    ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 'Bitcoin Deep Dive', 'Detailed exploration of Bitcoin and its innovative features.', 
     'Bitcoin was the first successful implementation of blockchain technology. In this lesson, we explore its architecture, features, and impact...', 
     'text', 4, 90, ARRAY[]),
     
    ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', 'Blockchain Quiz', 'Test your understanding of blockchain fundamentals.', 
     'This quiz covers all topics from the previous lessons. Make sure you understand the key concepts before proceeding.', 
     'quiz', 5, 30, ARRAY[])
ON CONFLICT (id) DO NOTHING;

-- Sample lessons for "Smart Contract Development" course
INSERT INTO lessons (id, course_id, title, description, content, type, order_index, duration, resources) VALUES
    ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000002', 'Introduction to Solidity', 'Getting started with Solidity programming language.', 
     'Solidity is a high-level programming language designed for implementing smart contracts on Ethereum...', 
     'text', 1, 60, ARRAY['https://docs.soliditylang.org/']),
     
    ('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000002', 'Your First Smart Contract', 'Write and deploy your first smart contract.', 
     'In this hands-on lesson, you will create a simple smart contract using Remix IDE...', 
     'interactive', 2, 90, ARRAY['https://remix.ethereum.org/']),
     
    ('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000002', 'Contract Assignment', 'Build a voting smart contract.', 
     'Create a smart contract that allows users to vote on proposals. Implement proper access controls and vote counting.', 
     'assignment', 3, 120, ARRAY[])
ON CONFLICT (id) DO NOTHING;

-- Sample user progress
INSERT INTO user_progress (user_id, course_id, lesson_id, completed, score, time_spent) VALUES
    ('00000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', true, 95, 50),
    ('00000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', true, 88, 65),
    ('00000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000003', false, null, 30),
    ('00000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', true, 92, 48),
    ('00000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000011', true, 85, 70),
    ('00000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000011', true, 78, 75),
    ('00000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000012', false, null, 45)
ON CONFLICT (user_id, lesson_id) DO NOTHING;

-- Sample assignments
INSERT INTO assignments (id, lesson_id, title, description, instructions, due_date, max_score) VALUES
    ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000013', 'Voting Contract Implementation', 
     'Build a decentralized voting system using Solidity.', 
     'Create a smart contract that allows:\n1. Adding proposals\n2. Voting on proposals\n3. Viewing results\n4. Proper access control\n\nSubmit your contract code and deployment instructions.',
     '2024-12-31 23:59:59+00', 100)
ON CONFLICT (id) DO NOTHING;

-- Sample chat rooms
INSERT INTO chat_rooms (id, name, description, type, cohort_id, participants) VALUES
    ('50000000-0000-0000-0000-000000000001', 'Web3 Fundamentals General', 'General discussion for Web3 Fundamentals cohort', 'cohort', '10000000-0000-0000-0000-000000000001', 
     ARRAY['00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000005']),
    ('50000000-0000-0000-0000-000000000002', 'Smart Contracts Q&A', 'Questions and answers about smart contract development', 'course', null, 
     ARRAY['00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000006'])
ON CONFLICT (id) DO NOTHING;

-- Sample notifications
INSERT INTO notifications (user_id, type, title, message, metadata) VALUES
    ('00000000-0000-0000-0000-000000000004', 'course_progress', 'Course Progress Update', 'Great job! You have completed 40% of Introduction to Blockchain course.', 
     '{"course_id": "20000000-0000-0000-0000-000000000001", "progress": 40}'),
    ('00000000-0000-0000-0000-000000000005', 'assignment_due', 'Assignment Due Soon', 'Your Voting Contract Implementation assignment is due in 3 days.', 
     '{"assignment_id": "40000000-0000-0000-0000-000000000001", "due_date": "2024-12-31"}'),
    ('00000000-0000-0000-0000-000000000006', 'new_lesson', 'New Lesson Available', 'A new lesson "Advanced Solidity Patterns" has been added to your course.', 
     '{"course_id": "20000000-0000-0000-0000-000000000002", "lesson_id": "30000000-0000-0000-0000-000000000014"}')
ON CONFLICT (id) DO NOTHING;