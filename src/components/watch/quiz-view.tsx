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
import { CheckCircle2, XCircle } from 'lucide-react';

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
  const [results, setResults] = useState<{ score: number, feedback: Record<string, string>, userAnswers: Record<string,string> } | null>(null);

  const formSchema = createSchema(quiz.questions);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mocking AI grading
    let correctAnswers = 0;
    const feedback: Record<string, string> = {};

    quiz.questions.forEach(q => {
      if (values[q.id].toLowerCase() === q.correct_answer.toLowerCase()) {
        correctAnswers++;
        feedback[q.id] = `Correct! ${q.explanation}`;
      } else {
        feedback[q.id] = `Incorrect. The correct answer is ${q.correct_answer}. ${q.explanation}`;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    setResults({ score, feedback, userAnswers: values });
    setSubmitted(true);
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
                    <FormControl>
                      {q.type === 'multiple_choice' && q.options && (
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
                      )}
                      {q.type === 'true_false' && (
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
                      )}
                      {q.type === 'short_answer' && <Input {...field} />}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full">Submit Quiz</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
