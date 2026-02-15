import { type SubmitEvent } from 'react';
import { useStore } from '@tanstack/react-form';
import { FormField } from '@/shared/components/molecules/FormField';
import { Input } from '@/shared/components/atoms/Input';
import { Textarea } from '@/shared/components/atoms/Textarea';
import { DatePicker } from '@/shared/components/atoms/DatePicker';
import { Switch } from '@/shared/components/atoms/Switch';
import { Button } from '@/shared/components/atoms/Button';
import { useArticleForm } from '@/features/articles/application/hooks/useArticleForm';
import { articleSchema } from '@/features/articles/validation';
import type { ArticleFormData } from '@/features/articles/validation';

export interface ArticleFormProps {
    initialData?: Partial<ArticleFormData>;
    onSubmit: (data: ArticleFormData) => void;
    submitLabel?: string;
    title?: string;
}

export const ArticleForm = ({
    initialData,
    onSubmit,
    submitLabel = 'SAVE',
    title
}: ArticleFormProps) => {
    const form = useArticleForm(initialData);

    const isFormValid = useStore(form.store, (state) => {
        const v = state.values;
        return !!(v.headline && v.author && v.body && v.publicationDate);
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // const result = articleSchema.safeParse(form.state.values);

        // if (result.success) {
        onSubmit(form.state.values);
        // } else {
        // console.error('Validation errors:', result.error.flatten());
        // }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {title && (
                <div className="pb-2 mb-2 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                </div>
            )}
            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-12">

                    <form.Field name="headline">
                        {(field) => (
                            <FormField
                                label="Headline *"
                                htmlFor="headline"
                                error={field.state.meta.errors?.[0]?.message}
                            >
                                <Input
                                    id="headline"
                                    name="headline"
                                    value={field.state.value}
                                    onChange={(value) => field.handleChange(value)}
                                    placeholder="Enter article headline..."
                                />
                            </FormField>
                        )}
                    </form.Field>

                    <form.Field name="author">
                        {(field) => (
                            <FormField
                                label="Author *"
                                htmlFor="author"
                                error={field.state.meta.errors?.[0]?.message}
                            >
                                <Input
                                    id="author"
                                    name="author"
                                    value={field.state.value}
                                    onChange={(value) => field.handleChange(value)}
                                    placeholder="Enter author name..."
                                />
                            </FormField>
                        )}
                    </form.Field>

                    <form.Field name="body">
                        {(field) => (
                            <FormField
                                label="Body *"
                                htmlFor="body"
                                error={field.state.meta.errors?.[0]?.message}
                            >
                                <Textarea
                                    id="body"
                                    name="body"
                                    value={field.state.value}
                                    onChange={(value) => field.handleChange(value)}
                                    rows={10}
                                />
                            </FormField>
                        )}
                    </form.Field>

                    <form.Field name="publicationDate">
                        {(field) => (
                            <FormField
                                label="Publication Date *"
                                htmlFor="publicationDate"
                                error={field.state.meta.errors?.[0]?.message}
                            >
                                <DatePicker
                                    id="publicationDate"
                                    name="publicationDate"
                                    value={field.state.value}
                                    onChange={(value) => field.handleChange(value)}
                                />
                            </FormField>
                        )}
                    </form.Field>

                    <form.Field name="published">
                        {(field) => (
                            <Switch
                                checked={field.state.value}
                                onChange={(checked) => field.handleChange(checked)}
                                label="Publish"
                            />
                        )}
                    </form.Field>

                </div>

            </div>

            <div className="pt-8 pb-4 min-h-25 min-w-24 flex justify-end">

                <Button
                    type="submit"
                    variant={isFormValid ? 'active' : 'disabled'}
                >
                    {submitLabel}
                </Button>

            </div>
        </form>
    );
};
