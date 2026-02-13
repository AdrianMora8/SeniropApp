import { useForm } from '@tanstack/react-form';
import type { ArticleFormData } from './validation';

export const useArticleForm = (initialData?: Partial<ArticleFormData>) => {
    const form = useForm({
        defaultValues: {
            headline: initialData?.headline || '',
            author: initialData?.author || '',
            body: initialData?.body || '',
            publicationDate: initialData?.publicationDate || '',
            published: initialData?.published || false,
        },
        onSubmit: async ({ value }) => {
            console.log('Form submitted:', value);
        },
    });

    return form;
};
