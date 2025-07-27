import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const config: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(config);

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Closing database connection...');
  await pool.end();
  console.log('✅ Database connection closed');
  process.exit(0);
});

export default pool;