export const formatDate = (dateStr: string): string => {
    return dateStr.split('T')[0].split('-').reverse().join('/');
};
