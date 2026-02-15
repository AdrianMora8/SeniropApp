import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
    // Convert string value to Date object
    const dateValue = value ? new Date(value) : undefined;

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            // Convert Date to ISO string format (YYYY-MM-DD)
            const isoString = date.toISOString().split('T')[0];
            onChange(isoString);
        } else {
            onChange('');
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateValue && "text-muted-foreground",
                        hasError && "border-red-500 focus-visible:ring-red-500"
                    )}
                >
                    <CalendarIcon />
                    {dateValue ? format(dateValue, "PPP") : <span>{placeholder}</span>}
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
