import app from './app.js';
import { env } from './config/environment.js';
import logger from './utils/logger.js';
import pool from './config/database.js';
import { initializeScheduler } from './services/scheduler.service.js';

async function start() {
  let dbConnected = false;
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    console.log('Connected to database');
    dbConnected = true;
  } catch (err) {
    console.warn('Database not available, running without it');
  }

  if (dbConnected) {
    initializeScheduler();
  }

  app.listen(env.port, () => {
    console.log(`My Mind server running on port ${env.port}`);
  });
}

start();
