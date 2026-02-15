import type { ArticleFormData } from '@/features/articles/validation';
import { articleSchema } from '@/features/articles/validation';
import { formatDate } from '@/shared/utils/dateFormatter';
import { useForm } from '@tanstack/react-form';

export const useArticleForm = (initialData?: Partial<ArticleFormData>) => {
    const form = useForm({
        defaultValues: {
            headline: initialData?.headline || '',
            author: initialData?.author || '',
            body: initialData?.body || '',
            publicationDate: initialData?.publicationDate
                ? formatDate(initialData.publicationDate)
                : '',
            published: initialData?.published ?? false,
        },
        onSubmit: async ({ value }) => {
            const result = articleSchema.safeParse(value);

            if (!result.success) {
                console.error('Validation errors:', result.error.flatten());
                throw new Error('Validation failed');
            }


        },
        validators: {
            onChange: articleSchema,
            onMount: articleSchema,
        },
    });

    return form;
};
