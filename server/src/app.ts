import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors.js';
import { errorHandler } from './middleware/error-handler.js';
import { generalLimiter } from './middleware/rate-limiter.js';
import { router } from './routes/index.js';

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(generalLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', router);
app.use(errorHandler);

export default app;
