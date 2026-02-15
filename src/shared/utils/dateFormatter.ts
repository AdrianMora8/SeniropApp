import { format, parseISO, isValid } from "date-fns";
export const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const date = parseISO(dateStr);
    if (!isValid(date)) return dateStr;
    return format(date, "dd/MM/yyyy");
};
