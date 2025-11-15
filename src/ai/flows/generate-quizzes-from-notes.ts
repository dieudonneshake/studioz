'use server';
/**
 * @fileOverview Generates quizzes from uploaded notes.
 *
 * - generateQuizzesFromNotes - A function that generates quizzes from notes.
 * - GenerateQuizzesFromNotesInput - The input type for the generateQuizzesFromNotes function.
 * - GenerateQuizzesFromNotesOutput - The return type for the generateQuizzesFromNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizzesFromNotesInputSchema = z.object({
  notesText: z.string().describe('The extracted text from the lesson notes.'),
  level: z.string().describe('The educational level of the content (e.g., Grade 10, University Year 2).'),
});
export type GenerateQuizzesFromNotesInput = z.infer<typeof GenerateQuizzesFromNotesInputSchema>;

const GenerateQuizzesFromNotesOutputSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string().describe('Unique identifier for the question.'),
      type: z.enum(['multiple_choice', 'true_false', 'short_answer']).describe('The type of question.'),
      prompt: z.string().describe('The question prompt.'),
      options: z.array(z.string()).optional().describe('The options for multiple choice questions.'),
      correct_answer: z.string().describe('The correct answer to the question.'),
      explanation: z.string().describe('A short explanation of the correct answer.'),
    })
  ).describe('An array of quiz questions generated from the lesson notes.'),
});
export type GenerateQuizzesFromNotesOutput = z.infer<typeof GenerateQuizzesFromNotesOutputSchema>;

export async function generateQuizzesFromNotes(input: GenerateQuizzesFromNotesInput): Promise<GenerateQuizzesFromNotesOutput> {
  return generateQuizzesFromNotesFlow(input);
}

const generateQuizzesPrompt = ai.definePrompt({
  name: 'generateQuizzesPrompt',
  input: {schema: GenerateQuizzesFromNotesInputSchema},
  output: {schema: GenerateQuizzesFromNotesOutputSchema},
  prompt: `You are an expert quiz generator for educational content.
Given the following extracted lesson notes, generate 7 quiz questions suitable for learners at the {level} level.
Types: multiple_choice (4 options), true_false, and short_answer.
For each question include: id, type, prompt, options[] (if applicable), correct_answer, explanation (short).
Ensure every correct answer has supporting text reference in the notes.
Output should be a JSON array of questions:

Lesson Notes:
{{{notesText}}}
`,
});

const generateQuizzesFromNotesFlow = ai.defineFlow(
  {
    name: 'generateQuizzesFromNotesFlow',
    inputSchema: GenerateQuizzesFromNotesInputSchema,
    outputSchema: GenerateQuizzesFromNotesOutputSchema,
  },
  async input => {
    const {output} = await generateQuizzesPrompt(input);
    return output!;
  }
);
