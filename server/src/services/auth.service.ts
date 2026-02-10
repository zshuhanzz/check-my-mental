import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/environment.js';
import { userRepository } from '../repositories/user.repository.js';
import { AppError } from '../middleware/error-handler.js';
import type { JwtPayload, UserRow } from '../types/index.js';

function makeToken(payload: JwtPayload, secret: string, expiry: string): string {
  return jwt.sign(payload, secret, { expiresIn: expiry } as jwt.SignOptions);
}

// strip out sensitive stuff from user before sending to client
function cleanUser(user: UserRow) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.display_name,
    avatarUrl: user.avatar_url,
    isAnonymous: user.is_anonymous,
    onboardingComplete: user.onboarding_complete,
    timezone: user.timezone,
    createdAt: user.created_at,
  };
}

export const authService = {
  async register(email: string, password: string, displayName: string) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new AppError(409, 'An account with this email already exists.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ email, passwordHash, displayName });

    const payload: JwtPayload = { userId: user.id, isAnonymous: false };
    return {
      user: cleanUser(user),
      accessToken: makeToken(payload, env.jwtAccessSecret, env.jwtAccessExpiry),
      refreshToken: makeToken(payload, env.jwtRefreshSecret, env.jwtRefreshExpiry),
    };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user || !user.password_hash) {
      throw new AppError(401, 'Invalid email or password.');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new AppError(401, 'Invalid email or password.');
    }

    await userRepository.updateLastActive(user.id);

    const payload: JwtPayload = { userId: user.id, isAnonymous: user.is_anonymous };
    return {
      user: cleanUser(user),
      accessToken: makeToken(payload, env.jwtAccessSecret, env.jwtAccessExpiry),
      refreshToken: makeToken(payload, env.jwtRefreshSecret, env.jwtRefreshExpiry),
    };
  },

  async createAnonymousSession() {
    const anonToken = crypto.randomBytes(32).toString('hex');
    const user = await userRepository.create({
      displayName: 'Anonymous',
      isAnonymous: true,
      anonymousToken: anonToken,
    });

    const payload: JwtPayload = { userId: user.id, isAnonymous: true };
    return {
      user: cleanUser(user),
      accessToken: makeToken(payload, env.jwtAccessSecret, env.jwtAccessExpiry),
      refreshToken: makeToken(payload, env.jwtRefreshSecret, env.jwtRefreshExpiry),
      anonymousToken: anonToken,
    };
  },

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, env.jwtRefreshSecret) as JwtPayload;
      const user = await userRepository.findById(payload.userId);
      if (!user) throw new AppError(401, 'User not found.');

      return {
        accessToken: makeToken({ userId: user.id, isAnonymous: user.is_anonymous }, env.jwtAccessSecret, env.jwtAccessExpiry),
      };
    } catch {
      throw new AppError(401, 'Invalid refresh token.');
    }
  },

  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError(404, 'User not found.');
    return cleanUser(user);
  },

  async convertAnonymousAccount(userId: string, email: string, password: string) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new AppError(409, 'Email already taken.');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userRepository.update(userId, {
      email,
      passwordHash,
      isAnonymous: false,
      anonymousToken: null,
    });
    if (!user) throw new AppError(404, 'User not found.');
    return cleanUser(user);
  },
};
