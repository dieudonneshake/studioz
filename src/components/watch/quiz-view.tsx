'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { type Quiz, type QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { automaticallyGradeQuizzes } from '@/ai/flows/automatically-grade-quizzes';
import { getSummary } from '@/lib/data';
import { useAuthStore } from '@/store/auth';

interface QuizViewProps {
  quiz: Quiz;
}

const createSchema = (questions: QuizQuestion[]) => {
  const schemaObject = questions.reduce((acc, q) => {
    acc[q.id] = z.string().min(1, { message: 'Please select an answer.' });
    return acc;
  }, {} as Record<string, z.ZodString>);
  return z.object(schemaObject);
};

export default function QuizView({ quiz }: QuizViewProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<{ score: number, feedback: Record<string, string>, userAnswers: Record<string,string> } | null>(null);
  const { user } = useAuthStore();

  const formSchema = createSchema(quiz.questions);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const summary = getSummary(quiz.video_id);
    if (!user || !summary) {
        // Handle error: user or notes not found
        setIsSubmitting(false);
        return;
    }

    try {
        const gradingResult = await automaticallyGradeQuizzes({
            quizId: quiz.id,
            studentId: user.id,
            answers: values,
            questions: quiz.questions,
            notesText: summary.notes,
        });

        const transformedFeedback: Record<string, string> = {};
        let correctCount = 0;

        Object.keys(gradingResult.feedback).forEach(questionId => {
            const isCorrect = gradingResult.feedback[questionId].toLowerCase().startsWith('correct');
            if (isCorrect) correctCount++;
            transformedFeedback[questionId] = gradingResult.feedback[questionId];
        });
        
        setResults({ score: gradingResult.score, feedback: transformedFeedback, userAnswers: values });
        setSubmitted(true);

    } catch (error) {
        console.error("Error grading quiz:", error);
        // Optionally, show a toast or error message to the user
    } finally {
        setIsSubmitting(false);
    }
  }

  if (submitted && results) {
    return (
       <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-headline">Quiz Results</CardTitle>
          <p className="text-2xl font-bold text-primary">{results.score}%</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {quiz.questions.map((q) => (
            <div key={q.id}>
              <p className="font-semibold">{q.prompt}</p>
              <p className="text-sm text-muted-foreground">Your answer: {results.userAnswers[q.id]}</p>
              <Alert variant={results.feedback[q.id].startsWith('Correct') ? 'default' : 'destructive'} className="mt-2">
                {results.feedback[q.id].startsWith('Correct') 
                    ? <CheckCircle2 className="h-4 w-4" /> 
                    : <XCircle className="h-4 w-4" />
                }
                <AlertTitle>{results.feedback[q.id].startsWith('Correct') ? 'Correct' : 'Incorrect'}</AlertTitle>
                <AlertDescription>{results.feedback[q.id]}</AlertDescription>
              </Alert>
            </div>
          ))}
        </CardContent>
        <CardFooter>
            <Button onClick={() => { setSubmitted(false); setResults(null); form.reset(); }}>Retake Quiz</Button>
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
                    
                      {q.type === 'multiple_choice' && q.options && (
                        <FormControl>
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
                        </FormControl>
                      )}
                      {q.type === 'true_false' && (
                        <FormControl>
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
                        </FormControl>
                      )}
                      {q.type === 'short_answer' && 
                        <FormControl>
                          <Input {...field} />
                        </FormControl>}
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Grading...' : 'Submit Quiz'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
