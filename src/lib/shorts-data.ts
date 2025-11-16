
import { PlaceHolderImages } from './placeholder-images';
import { Short, User } from './types';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? '';

export const shorts: Short[] = [
  { id: 'short-1', title: "Quantum Entanglement in 60 Seconds", uploaderId: 'user-1', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', likes: 1.2, comments: 890, shares: 500, thumbnail_path: getImage('thumbnail-1') },
  { id: 'short-2', title: "The REAL reason Rome fell", uploaderId: 'user-2', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', likes: 2.5, comments: 1200, shares: 600, thumbnail_path: getImage('thumbnail-2') },
  { id: 'short-3', title: "Math trick you NEED to know!", uploaderId: 'user-1', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', likes: 1.8, comments: 950, shares: 450, thumbnail_path: getImage('thumbnail-3') },
  { id: 'short-4', title: "Hamlet's BIG mistake", uploaderId: 'user-2', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', likes: 3.1, comments: 2100, shares: 900, thumbnail_path: getImage('thumbnail-4') },
  { id: 'short-5', title: "What is Time Dilation?", uploaderId: 'user-1', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', likes: 4.2, comments: 3000, shares: 1200, thumbnail_path: getImage('thumbnail-5') },
  { id: 'short-6', title: "Da Vinci's secret", uploaderId: 'user-2', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', likes: 950, comments: 400, shares: 200, thumbnail_path: getImage('thumbnail-6') },
  { id: 'short-7', title: "Physics of a black hole", uploaderId: 'user-1', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', likes: 1.5, comments: 700, shares: 300, thumbnail_path: getImage('thumbnail-7')},
  { id: 'short-8', title: "How big is the ocean?", uploaderId: 'user-2', videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', likes: 2.2, comments: 1100, shares: 550, thumbnail_path: getImage('thumbnail-8')},
];


export function getShortById(id: string): Short | undefined {
  return shorts.find(s => s.id === id);
}

export function getUploader(userId: string, allUsers: User[]): User | undefined {
  return allUsers.find(u => u.id === userId);
}
