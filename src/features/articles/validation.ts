import { z } from 'zod';

export const articleSchema = z.object({
    headline: z
        .string()
        .min(1, 'Headline is required')
        .max(200, 'Headline must be at most 200 characters long'),

    author: z
        .string()
        .min(1, 'Author is required')
        .max(100, 'Author must be at most 100 characters long'),

    body: z
        .string()
        .min(1, 'Body is required')
        .max(5000, 'Body must be at most 5000 characters long'),

    publicationDate: z
        .string()
        .min(1, 'Publication date is required')
        .refine((date) => !isNaN(Date.parse(date)), {
            message: 'Invalid date format',
        }),

    published: z.boolean(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;