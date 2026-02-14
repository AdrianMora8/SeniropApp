import { type SubmitEvent } from 'react';
import { useStore } from '@tanstack/react-form';
import { FormField } from '../../molecules/FormField';
import { Input } from '../../atoms/Input';
import { Textarea } from '../../atoms/Textarea';
import { DatePicker } from '../../atoms/DatePicker';
import { Switch } from '../../atoms/Switch';
import { Button } from '../../atoms/Button';
import { useArticleForm } from '../../../features/articles/useArticleForm';
import { articleSchema } from '../../../features/articles/validation';
import type { ArticleFormData } from '../../../features/articles/validation';

export interface ArticleFormProps {
    initialData?: Partial<ArticleFormData>;
    onSubmit: (data: ArticleFormData) => void;
    submitLabel?: string;
}

export const ArticleForm = ({
    initialData,
    onSubmit,
    submitLabel = 'SAVE'
}: ArticleFormProps) => {
    const form = useArticleForm(initialData);

    const isFormValid = useStore(form.store, (state) => {
        const v = state.values;
        return !!(v.headline && v.author && v.body && v.publicationDate);
    });

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const result = articleSchema.safeParse(form.state.values);

        if (result.success) {
            onSubmit(result.data);
        } else {
            console.error('Validation errors:', result.error.flatten());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <form.Field
                name="headline"
                validators={{
                    onChange: ({ value }) => {
                        const result = articleSchema.shape.headline.safeParse(value);
                        return result.success ? undefined : result.error.issues[0]?.message;
                    }
                }}
            >
                {(field) => (
                    <FormField
                        label="Headline *"
                        error={field.state.meta.errors?.[0]}
                    >
                        <Input
                            value={field.state.value}
                            onChange={(value) => field.handleChange(value)}
                            placeholder="Enter article headline..."
                            hasError={field.state.meta.errors.length > 0}
                            type="text"
                        />
                    </FormField>
                )}
            </form.Field>

            <form.Field
                name="author"
                validators={{
                    onChange: ({ value }) => {
                        const result = articleSchema.shape.author.safeParse(value);
                        return result.success ? undefined : result.error.issues[0]?.message;
                    }
                }}
            >
                {(field) => (
                    <FormField
                        label="Author *"
                        error={field.state.meta.errors?.[0]}
                    >
                        <Input
                            value={field.state.value}
                            onChange={(value) => field.handleChange(value)}
                            placeholder="Enter author name..."
                            hasError={field.state.meta.errors.length > 0}
                            type="text"
                        />
                    </FormField>
                )}
            </form.Field>

            <form.Field
                name="body"
                validators={{
                    onChange: ({ value }) => {
                        const result = articleSchema.shape.body.safeParse(value);
                        return result.success ? undefined : result.error.issues[0]?.message;
                    }
                }}
            >
                {(field) => (
                    <FormField
                        label="Body *"
                        error={field.state.meta.errors?.[0]}
                    >
                        <Textarea
                            value={field.state.value}
                            onChange={(value) => field.handleChange(value)}
                            placeholder="Enter article content..."
                            hasError={field.state.meta.errors.length > 0}
                            rows={10}
                        />
                    </FormField>
                )}
            </form.Field>

            <form.Field
                name="publicationDate"
                validators={{
                    onChange: ({ value }) => {
                        const result = articleSchema.shape.publicationDate.safeParse(value);
                        return result.success ? undefined : result.error.issues[0]?.message;
                    }
                }}
            >
                {(field) => (
                    <FormField
                        label="Publication Date *"
                        error={field.state.meta.errors?.[0]}
                    >
                        <DatePicker
                            value={field.state.value}
                            onChange={(value) => field.handleChange(value)}
                            hasError={field.state.meta.errors.length > 0}
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

            <div className="flex justify-end">
                <Button variant={isFormValid ? 'active' : 'disabled'}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
};
