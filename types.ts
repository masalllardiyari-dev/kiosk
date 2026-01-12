
export enum KioskView {
  LANDING = 'LANDING',
  MAIN = 'MAIN',
  FEEDBACK = 'FEEDBACK',
  SUCCESS = 'SUCCESS'
}

export interface FeedbackData {
  rating: number;
  comment: string;
  category: string;
  timestamp: string;
}

export interface GeminiResponse {
  message: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}
