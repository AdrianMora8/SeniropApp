import { type SubmitEvent } from 'react';
import { useStore } from '@tanstack/react-form';
import { FormField } from '@/shared/components/molecules/FormField';
import { Input } from '@/shared/components/atoms/Input';
import { Textarea } from '@/shared/components/atoms/Textarea';
import { DatePicker } from '@/shared/components/atoms/DatePicker';
import { Switch } from '@/shared/components/atoms/Switch';
import { Button } from '@/shared/components/atoms/Button';
import { useArticleForm } from '@/features/articles/application/hooks/useArticleForm';
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

    const canSubmit = useStore(form.store, (state) => state.canSubmit);

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit(form.state.values);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            {title && (
                <div className="pb-2 mb-2 border-b border-[rgb(var(--color-border-subtle))]">
                    <h2 className="text-xl font-bold text-[rgb(var(--color-text-main))]">{title}</h2>
                </div>
            )}
            <div className="flex-1">
                <div className="flex flex-col h-full gap-4">

                    <form.Field name="headline">
                        {(field) => (
                            <FormField
                                label="Headline *"
                                htmlFor="headline"
                                error={field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : undefined}
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
                                error={field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : undefined}
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
                                error={field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : undefined}
                                className="flex-1"
                            >
                                <Textarea
                                    id="body"
                                    name="body"
                                    value={field.state.value}
                                    onChange={(value) => field.handleChange(value)}
                                    placeholder="Enter article content..."
                                    rows={8}
                                    className="flex-1"
                                />

                            </FormField>
                        )}
                    </form.Field>

                    <form.Field name="publicationDate">
                        {(field) => (
                            <FormField
                                label="Publication Date *"
                                htmlFor="Publication Date"
                                error={field.state.meta.isTouched ? field.state.meta.errors?.[0]?.message : undefined}
                            >
                                <DatePicker
                                    id="Publication Date"
                                    name="Publication Date"
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

            <div className="pt-4 pb-4 min-h-25 min-w-24 flex justify-end">

                <Button
                    type="submit"
                    variant={canSubmit ? 'active' : 'disabled'}
                >
                    {submitLabel}
                </Button>

            </div>
        </form>
    );
};
