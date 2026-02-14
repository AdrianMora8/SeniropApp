import { type SubmitEvent } from 'react';
import { useStore } from '@tanstack/react-form';
import { FormField } from '../../molecules/FormField';
import { Input } from '../../atoms/Input';
import { Textarea } from '../../atoms/Textarea';
import { DatePicker } from '../../atoms/DatePicker';
import { Switch } from '../../atoms/Switch';
import { Button } from '../../atoms/Button';
import { useArticleForm } from '../../../features/articles/useArticleForm';
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

        if (isFormValid) {
            onSubmit(form.state.values as ArticleFormData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <form.Field
                name="headline"
                validators={{
                    onChange: ({ value }) =>
                        !value ? 'Headline is required' :
                            value.length > 200 ? 'Headline must be at most 200 characters' :
                                undefined
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
                    onChange: ({ value }) =>
                        !value ? 'Author is required' :
                            value.length > 100 ? 'Author must be at most 100 characters' :
                                undefined
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
                    onChange: ({ value }) =>
                        !value ? 'Body is required' :
                            value.length > 5000 ? 'Body must be at most 5000 characters' :
                                undefined
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
                    onChange: ({ value }) =>
                        !value ? 'Publication date is required' :
                            isNaN(Date.parse(value)) ? 'Invalid date format' :
                                undefined
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
