
import { User, Video, Curriculum, Level, Subject, Quiz, WatchHistory, Cycle } from './types';
import { PlaceHolderImages } from './placeholder-images';

// This file now only contains functions to interact with the mock data.
// In a real application, this data would come from a database.
// The data itself is now considered deprecated and will be removed in future steps.

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? '';

export let users: User[] = [
  { id: 'user-1', name: 'Dr. Evelyn Reed', email: 'evelyn.reed@example.com', role: 'teacher', status: 'approved', profile_photo: getImage('user-avatar-1'), bio: 'Passionate about making quantum physics accessible to everyone.' },
  { id: 'user-2', name: 'Mr. Samuel Chen', email: 'samuel.chen@example.com', role: 'teacher', status: 'approved', profile_photo: getImage('user-avatar-2'), bio: 'Historian and educator focused on medieval Europe.' },
  { id: 'user-3', name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'student', status: 'approved', profile_photo: getImage('user-avatar-3'), bio: 'A curious student exploring the world of science and history.' },
  { id: 'user-4', name: 'Maria Garcia', email: 'maria.garcia@example.com', role: 'teacher', status: 'pending', profile_photo: getImage('user-avatar-4'), bio: 'Aspiring math and chemistry teacher.', subjects: ['Mathematics', 'Chemistry'], gradeLevels: ['Grade 9', 'Grade 10'] },
  { id: 'user-5', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'approved', profile_photo: getImage('user-avatar-5'), bio: 'Keeping the platform running smoothly.' }
];

export let curricula: Curriculum[] = []; // Will be fetched from Firestore
export let levels: Level[] = []; // Will be fetched from Firestore
export let subjects: Subject[] = []; // Will be fetched from Firestore
export let cycles: Cycle[] = []; // Will be fetched from Firestore
export let videos: Video[] = []; // Will be fetched from Firestore
export let quizzes: Quiz[] = []; // Will be fetched from Firestore
export let watchHistory: WatchHistory[] = []; // Will be fetched from Firestore


// Helper functions to simulate database interactions.
// These are now DEPRECATED and will be replaced by Firestore queries.

export function getUploader(userId: string, allUsers: User[]): User | undefined {
  return allUsers.find(u => u.id === userId);
}

export function getVideo(videoId: string): Video | undefined {
  return videos.find(v => v.id === videoId);
}

export function getQuiz(videoId: string): Quiz | undefined {
  return quizzes.find(q => q.video_id === videoId);
}

export const summaries: Record<string, { notes: string }> = {};

export function getSummary(videoId: string) {
  return summaries[videoId as keyof typeof summaries];
}
