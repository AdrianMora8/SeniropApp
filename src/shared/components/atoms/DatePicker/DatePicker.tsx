import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon } from "@/shared/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    hasError?: boolean;
    id?: string;
    name?: string;
    placeholder?: string;
}

export const DatePicker = ({
    value,
    onChange,
    hasError,
    id,
    name,
    placeholder = "Pick a date"
}: DatePickerProps) => {
    const dateValue = React.useMemo(() => {
        if (!value) return undefined;
        const parsed = parse(value, 'dd/MM/yyyy', new Date());
        if (isValid(parsed)) return parsed;
        const fallback = new Date(value);
        return isValid(fallback) ? fallback : undefined;
    }, [value]);

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            onChange(format(date, 'dd/MM/yyyy'));
        } else {
            onChange('');
        }
    };


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    name={name}
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateValue && "text-muted-foreground",
                        hasError && "border-[rgb(var(--color-danger))] focus-visible:ring-[rgb(var(--color-danger))]"
                    )}
                >
                    <CalendarIcon />
                    {dateValue && isValid(dateValue) ? format(dateValue, "PPP") : <span>{placeholder}</span>}

                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={dateValue}
                    onSelect={handleSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};
