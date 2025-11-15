'use server';

/**
 * @fileOverview Automatically grades quizzes using AI and provides feedback.
 *
 * - automaticallyGradeQuizzes - A function that handles the quiz grading process.
 * - AutomaticallyGradeQuizzesInput - The input type for the automaticallyGradeQuizzes function.
 * - AutomaticallyGradeQuizzesOutput - The return type for the automaticallyGradeQuizzes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomaticallyGradeQuizzesInputSchema = z.object({
  quizId: z.string().describe('The ID of the quiz to be graded.'),
  studentId: z.string().describe('The ID of the student taking the quiz.'),
  answers: z.record(z.string(), z.string()).describe('A map of question IDs to student answers.'),
  questions: z.array(
    z.object({
      id: z.string().describe('The ID of the question.'),
      type: z.enum(['multiple_choice', 'true_false', 'short_answer']).describe('The type of question.'),
      prompt: z.string().describe('The question prompt.'),
      options: z.array(z.string()).optional().describe('The options for multiple choice questions.'),
      correct_answer: z.string().describe('The correct answer to the question.'),
      explanation: z.string().describe('The explanation for the correct answer.'),
    })
  ).describe('The questions in the quiz with their details.'),
  notesText: z.string().describe('The text of the notes associated with the quiz.'),
});
export type AutomaticallyGradeQuizzesInput = z.infer<typeof AutomaticallyGradeQuizzesInputSchema>;

const AutomaticallyGradeQuizzesOutputSchema = z.object({
  score: z.number().describe('The student score on the quiz (0-100).'),
  feedback: z.record(z.string(), z.string()).describe('Feedback for each question in the quiz.'),
});
export type AutomaticallyGradeQuizzesOutput = z.infer<typeof AutomaticallyGradeQuizzesOutputSchema>;

export async function automaticallyGradeQuizzes(input: AutomaticallyGradeQuizzesInput): Promise<AutomaticallyGradeQuizzesOutput> {
  return automaticallyGradeQuizzesFlow(input);
}

const automaticallyGradeQuizzesPrompt = ai.definePrompt({
  name: 'automaticallyGradeQuizzesPrompt',
  input: {schema: AutomaticallyGradeQuizzesInputSchema},
  output: {schema: AutomaticallyGradeQuizzesOutputSchema},
  prompt: `You are an AI quiz grader. You will be given a quiz, the student\'s answers, and the correct answers. You will grade the quiz and provide feedback.

Quiz ID: {{{quizId}}}
Student ID: {{{studentId}}}

Here are the quiz questions and the student\'s answers:
{{#each questions}}
Question ID: {{{id}}}
Question Type: {{{type}}}
Question: {{{prompt}}}
{{#if options}}
Options:
{{#each options}}
- {{{this}}}
{{/each}}
{{/if}}
Correct Answer: {{{correct_answer}}}
Student Answer: {{{../answers.[id]}}}
Explanation: {{{explanation}}}

{{/each}}

Notes Text: {{{notesText}}}

Based on the student\'s answers and the correct answers, calculate the student\'s score as a percentage (0-100) and provide feedback for each question. The feedback should be short and concise, explaining why the answer was correct or incorrect. Use the notes text to validate that generated quiz answers align with explicit phrases. Return the score and feedback in JSON format.`, 
});

const automaticallyGradeQuizzesFlow = ai.defineFlow(
  {
    name: 'automaticallyGradeQuizzesFlow',
    inputSchema: AutomaticallyGradeQuizzesInputSchema,
    outputSchema: AutomaticallyGradeQuizzesOutputSchema,
  },
  async input => {
    const {output} = await automaticallyGradeQuizzesPrompt(input);
    return output!;
  }
);
