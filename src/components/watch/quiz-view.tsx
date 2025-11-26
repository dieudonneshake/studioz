
'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { type Video, type QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Loader2, RefreshCw, BrainCircuit } from 'lucide-react';
import { automaticallyGradeQuizzes } from '@/ai/flows/automatically-grade-quizzes';
import { generateQuizzesFromNotes, GenerateQuizzesFromNotesOutput } from '@/ai/flows/generate-quizzes-from-notes';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';


interface QuizViewProps {
  video: Video;
}

const createSchema = (questions: QuizQuestion[]) => {
  if (questions.length === 0) {
    return z.object({});
  }
  const schemaObject = questions.reduce((acc, q) => {
    acc[q.id] = z.string().min(1, { message: 'Please select an answer.' });
    return acc;
  }, {} as Record<string, z.ZodString>);
  return z.object(schemaObject);
};

export default function QuizView({ video }: QuizViewProps) {
  const [quizState, setQuizState] = useState<'idle' | 'generating' | 'taking' | 'grading' | 'results'>('idle');
  const [quiz, setQuiz] = useState<GenerateQuizzesFromNotesOutput | null>(null);
  const [results, setResults] = useState<{ score: number, feedback: Record<string, string>, userAnswers: Record<string,string> } | null>(null);
  const { user } = useUser();
  const firestore = useFirestore();

  const [notes, setNotes] = useState<string | null>(null);
  const [levelName, setLevelName] = useState<string>('High School');

   useMemo(async () => {
    if (!firestore || !video.id) return;
    const notesQuery = query(collection(firestore, `videos/${video.id}/notes`));
    const notesSnapshot = await getDocs(notesQuery);
    if (!notesSnapshot.empty) {
      const noteDoc = notesSnapshot.docs[0];
      setNotes(noteDoc.data().textExtracted as string);
    }

    const levelQuery = query(collection(firestore, 'levels'), where('name', '==', video.level));
    const levelSnapshot = await getDocs(levelQuery);
    if(!levelSnapshot.empty) {
        setLevelName(levelSnapshot.docs[0].data().name);
    }
  }, [firestore, video.id, video.level]);
  
  const formSchema = useMemo(() => createSchema(quiz?.questions || []), [quiz]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleGenerateQuiz = async () => {
    if (!notes) return;
    setQuizState('generating');
    try {
      const generatedQuiz = await generateQuizzesFromNotes({
        notesText: notes,
        level: levelName,
      });
      setQuiz(generatedQuiz);
      form.reset();
      setQuizState('taking');
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      setQuizState('idle'); // Or show an error state
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || !notes || !quiz) return;
    setQuizState('grading');
    
    try {
        const gradingResult = await automaticallyGradeQuizzes({
            quizId: video.id, // Using video id as a proxy for quiz id
            studentId: user.uid,
            answers: values,
            questions: quiz.questions,
            notesText: notes,
        });

        setResults({ score: gradingResult.score, feedback: gradingResult.feedback, userAnswers: values });
        setQuizState('results');
    } catch (error) {
        console.error("Error grading quiz:", error);
        setQuizState('taking'); // Revert to taking state on error
    }
  }

  const resetQuiz = () => {
    setQuiz(null);
    setResults(null);
    form.reset();
    setQuizState('idle');
  };

  if (quizState === 'idle' || quizState === 'generating') {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="font-headline">Test Your Knowledge</CardTitle>
                <CardDescription>Click below to generate a new AI-powered quiz based on the lesson notes.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[300px]">
                {quizState === 'generating' ? (
                     <div className="flex flex-col items-center gap-4 text-muted-foreground">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <p className="font-semibold">Generating your quiz...</p>
                        <p className="text-sm">The AI is crafting questions right now.</p>
                    </div>
                ) : (
                    <Button size="lg" onClick={handleGenerateQuiz} disabled={!notes}>
                        <BrainCircuit className="mr-2 h-5 w-5" />
                        {notes ? 'Generate AI Quiz' : 'No Notes Available for Quiz'}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
  }

  if (quizState === 'results' && results) {
    return (
       <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline">Quiz Results</CardTitle>
          <CardDescription>You scored:</CardDescription>
          <p className="text-4xl font-bold text-primary">{results.score}%</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {quiz?.questions.map((q) => (
            <div key={q.id}>
              <p className="font-semibold">{q.prompt}</p>
              <p className="text-sm text-muted-foreground">Your answer: {results.userAnswers[q.id]}</p>
              <Alert variant={results.feedback[q.id].toLowerCase().startsWith('correct') ? 'default' : 'destructive'} className="mt-2">
                {results.feedback[q.id].toLowerCase().startsWith('correct') 
                    ? <CheckCircle2 className="h-4 w-4" /> 
                    : <XCircle className="h-4 w-4" />
                }
                <AlertTitle>{results.feedback[q.id].toLowerCase().startsWith('correct') ? 'Correct' : 'Incorrect'}</AlertTitle>
                <AlertDescription>{results.feedback[q.id]}</AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
        <CardFooter>
            <Button onClick={resetQuiz}>
                <RefreshCw className="mr-2 h-4 w-4"/>
                Take a New Quiz
            </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">Test Your Knowledge</CardTitle>
      </CardHeader>
      <CardContent>
        {quiz ? (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {quiz.questions.map((q, index) => (
                <FormField
                    key={q.id}
                    control={form.control}
                    name={q.id}
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-semibold">{index + 1}. {q.prompt}</FormLabel>
                        <FormControl>
                        {q.type === 'multiple_choice' && q.options ? (
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                                {q.options.map(option => (
                                <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value={option} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option}</FormLabel>
                                </FormItem>
                                ))}
                            </RadioGroup>
                        ) : q.type === 'true_false' ? (
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2">
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="True" /></FormControl>
                                    <FormLabel className="font-normal">True</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><RadioGroupItem value="False" /></FormControl>
                                    <FormLabel className="font-normal">False</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        ) : ( // short_answer
                            <Input {...field} placeholder="Your answer..."/>
                        )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                ))}
                <Button type="submit" className="w-full" disabled={quizState === 'grading'}>
                {quizState === 'grading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {quizState === 'grading' ? 'Grading...' : 'Submit Quiz'}
                </Button>
            </form>
            </Form>
        ) : (
            // Should not happen if logic is correct, but good fallback
            <p>Loading quiz...</p>
        )}
      </CardContent>
    </Card>
  );
}
