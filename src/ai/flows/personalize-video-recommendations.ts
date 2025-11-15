'use server';

/**
 * @fileOverview A personalized video recommendation AI agent.
 *
 * - personalizeVideoRecommendations - A function that returns video recommendations for a given user.
 * - PersonalizeVideoRecommendationsInput - The input type for the personalizeVideoRecommendations function.
 * - PersonalizeVideoRecommendationsOutput - The return type for the personalizeVideoRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeVideoRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to generate recommendations.'),
  context: z
    .enum(['home', 'video_page'])
    .describe('The context in which recommendations are being requested (e.g., home page or video page).'),
  watchHistory: z.array(z.string()).optional().describe('List of video IDs the user has watched.'),
  quizScores: z
    .record(z.number())
    .optional()
    .describe('A map of subject IDs to quiz scores for the user.'),
  preferredSubjects: z.array(z.string()).optional().describe('List of subject IDs the user prefers.'),
});
export type PersonalizeVideoRecommendationsInput = z.infer<
  typeof PersonalizeVideoRecommendationsInputSchema
>;

const PersonalizeVideoRecommendationsOutputSchema = z.array(
  z.object({
    videoId: z.string().describe('The ID of the recommended video.'),
    reason: z.string().describe('The reason for recommending this video.'),
  })
);
export type PersonalizeVideoRecommendationsOutput = z.infer<
  typeof PersonalizeVideoRecommendationsOutputSchema
>;

export async function personalizeVideoRecommendations(
  input: PersonalizeVideoRecommendationsInput
): Promise<PersonalizeVideoRecommendationsOutput> {
  return personalizeVideoRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeVideoRecommendationsPrompt',
  input: {schema: PersonalizeVideoRecommendationsInputSchema},
  output: {schema: PersonalizeVideoRecommendationsOutputSchema},
  prompt: `You are an expert video recommendation system for an educational platform.

Based on the user's history, quiz scores, and preferred subjects, provide a list of video recommendations.

User ID: {{{userId}}}
Context: {{{context}}}

{{#if watchHistory}}
User Watch History: {{watchHistory}}
{{/if}}

{{#if quizScores}}
User Quiz Scores: {{quizScores}}
{{/if}}

{{#if preferredSubjects}}
User Preferred Subjects: {{preferredSubjects}}
{{/if}}

Format your response as a JSON array of objects with videoId and reason fields.
`,
});

const personalizeVideoRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizeVideoRecommendationsFlow',
    inputSchema: PersonalizeVideoRecommendationsInputSchema,
    outputSchema: PersonalizeVideoRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
