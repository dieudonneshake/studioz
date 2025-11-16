
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  status?: 'approved' | 'pending' | 'rejected';
  profile_photo: string;
  bio?: string;
  phone?: string;
  subjects?: string[];
  gradeLevels?: string[];
};

export type Curriculum = {
  id: string;
  name: string;
  description: string;
};

export type Cycle = {
  id: string;
  name: string;
  curriculumId: string;
  levels: Level[];
};

export type Level = {
  id: string;
  name: string;
  age?: string;
  subjects?: Subject[];
  streams?: Stream[];
};

export type Stream = {
  id: string;
  name: string;
  subjects: Subject[];
}

export type Subject = {
  id: string;
  name: string;
};

export type Video = {
  id: string;
  title: string;
  description: string;
  shortSummary: string;
  uploaded_by: string; // user id
  thumbnail_path: string;
  video_url: string;
  duration_seconds: number;
  views_count: number;
  created_at: string;
  curriculum: string;
  level: string;
  subject: string;
  unit?: string;
};

export type Short = {
    id: string;
    title: string;
    uploaderId: string;
    videoUrl: string;
    thumbnail_path: string;
    likes: number;
    comments: number;
    shares: number;
};

export type QuizQuestion = {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  prompt: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
};

export type Quiz = {
  id: string;
  video_id: string;
  questions: QuizQuestion[];
};

export type QuizResult = {
  id: string;
  quiz_id: string;
  student_id: string;
  answers: Record<string, string>;
  score: number;
  feedback: Record<string, string>;
  created_at: string;
};

export type WatchHistory = {
  id: string;
  student_id: string;
  video_id: string;
  watched_at: string;
};
