import { useState } from 'react';

export type UploadedFileStatus = 'success' | 'error';

export interface UploadedFile {
    id: string;
    name: string;
    sizeKb: string;
    status: UploadedFileStatus;
    dataUrl?: string;
    errorMessage?: string;
}

const VALID_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e.target?.error?.message ?? 'Error al cargar la imagen');
        reader.readAsDataURL(file);
    });
}

export const useImageUpload = () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const addFiles = async (rawFiles: File[]) => {
        const pending: UploadedFile[] = rawFiles.map((f) => ({
            id: `${f.name}-${Date.now()}-${Math.random()}`,
            name: f.name,
            sizeKb: (f.size / 1024).toFixed(2),
            status: 'success' as UploadedFileStatus,
        }));

        // Optimistically add entries so the list appears immediately
        setFiles((prev) => [...prev, ...pending]);

        const results = await Promise.allSettled(
            rawFiles.map(async (f, i) => {
                if (!VALID_TYPES.includes(f.type)) {
                    throw new Error('Tipo de archivo no soportado');
                }
                const dataUrl = await readFileAsDataUrl(f);
                return { id: pending[i].id, dataUrl };
            })
        );

        setFiles((prev) =>
            prev.map((entry) => {
                const match = results.find(
                    (_, i) => pending[i]?.id === entry.id
                );
                if (!match) return entry;

                const idx = pending.findIndex((p) => p.id === entry.id);
                const result = results[idx];

                if (!result) return entry;

                if (result.status === 'fulfilled') {
                    return { ...entry, status: 'success', dataUrl: result.value.dataUrl };
                } else {
                    return {
                        ...entry,
                        status: 'error',
                        errorMessage: result.reason?.message ?? 'Error al cargar la imagen',
                    };
                }
            })
        );
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    const clearFiles = () => setFiles([]);

    const successfulDataUrls = files
        .filter((f) => f.status === 'success' && f.dataUrl)
        .map((f) => f.dataUrl as string);

    return {
        files,
        addFiles,
        removeFile,
        clearFiles,
        successfulDataUrls,
    };
};