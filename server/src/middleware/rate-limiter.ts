import rateLimit from 'express-rate-limit';

// basic rate limiting
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, try again later' },
});

export const authLimiter = generalLimiter;
export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Slow down, try again in a bit' },
});
