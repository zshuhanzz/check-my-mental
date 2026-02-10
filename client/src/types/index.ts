export interface User {
  id: string;
  email: string | null;
  displayName: string;
  avatarUrl: string | null;
  isAnonymous: boolean;
  onboardingComplete: boolean;
  timezone: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isCrisisFlagged: boolean;
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  title: string | null;
  content: string;
  tags: string[];
  isFavorite: boolean;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string | null;
}

// dashboard stuff
export interface DashboardSummary {
  currentStreak: number;
  weeklyAverage: number | null;
  topEmotions: { name: string; count: number }[];
}

export interface MoodTrend {
  date: string;
  avg_rating: number;
}
