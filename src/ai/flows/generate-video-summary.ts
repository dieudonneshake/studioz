'use server';

/**
 * @fileOverview A flow to generate video summaries in English and French from uploaded notes.
 *
 * - generateVideoSummary - A function that handles the video summary generation process.
 * - GenerateVideoSummaryInput - The input type for the generateVideoSummary function.
 * - GenerateVideoSummaryOutput - The return type for the generateVideoSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoSummaryInputSchema = z.object({
  notesText: z
    .string()
    .describe('The extracted text content from the video lesson notes.'),
});
export type GenerateVideoSummaryInput = z.infer<typeof GenerateVideoSummaryInputSchema>;

const GenerateVideoSummaryOutputSchema = z.object({
  summary_en: z.string().describe('The video summary in English.'),
  summary_fr: z.string().describe('The video summary in French.'),
});
export type GenerateVideoSummaryOutput = z.infer<typeof GenerateVideoSummaryOutputSchema>;

export async function generateVideoSummary(input: GenerateVideoSummaryInput): Promise<GenerateVideoSummaryOutput> {
  return generateVideoSummaryFlow(input);
}

const generateVideoSummaryPrompt = ai.definePrompt({
  name: 'generateVideoSummaryPrompt',
  input: {schema: GenerateVideoSummaryInputSchema},
  output: {schema: GenerateVideoSummaryOutputSchema},
  prompt: `You are an educational content summarizer. Given the following extracted lesson notes, produce a concise, accurate summary aimed at learners. Output JSON: {summary_en, summary_fr}. Use factual tone, avoid hallucinations.\n\nLesson Notes: {{{notesText}}}`,
});

const generateVideoSummaryFlow = ai.defineFlow(
  {
    name: 'generateVideoSummaryFlow',
    inputSchema: GenerateVideoSummaryInputSchema,
    outputSchema: GenerateVideoSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateVideoSummaryPrompt(input);
    return output!;
  }
);
