import { config } from 'dotenv';
config();

import '@/ai/flows/generate-quizzes-from-notes.ts';
import '@/ai/flows/generate-video-summary.ts';
import '@/ai/flows/automatically-grade-quizzes.ts';
import '@/ai/flows/personalize-video-recommendations.ts';