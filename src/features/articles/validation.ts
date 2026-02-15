import { z } from 'zod';
import { parse, isValid } from 'date-fns';

export const articleSchema = z.object({
    headline: z
        .string()
        .min(1, 'Headline is required')
        .max(100, 'Headline must be at most 100 characters long'),

    author: z
        .string()
        .min(1, 'Author is required')
        .max(100, 'Author must be at most 100 characters long'),

    body: z
        .string()
        .min(1, 'Body is required')
        .max(700, 'Body must be at most 700 characters long'),

    publicationDate: z
        .string()
        .min(1, 'Publication date is required')
        .refine((date) => {
            const parsed = parse(date, 'dd/MM/yyyy', new Date());
            return isValid(parsed);
        }, {
            message: 'Invalid date format (DD/MM/YYYY)',
        }),


    published: z.boolean(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;