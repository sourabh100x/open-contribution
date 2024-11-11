
import  { Pool, PoolClient } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = {
    query: <T = any>(text: string, params: (string | number | null |string[])[]) => 
      pool.query(text, params),
      
    getClient: (): Promise<PoolClient> => 
      pool.connect(),
  };
