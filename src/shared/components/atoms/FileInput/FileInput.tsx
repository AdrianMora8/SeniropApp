import * as React from 'react';
import { useRef, useState } from 'react';
import type { UploadedFile } from '@/features/articles/application/hooks/useImageUpload';
import { cn } from '@/shared/utils/utils';

// ---------- icons (inline SVG so no extra deps) ----------

function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-500"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

// ---------- types ----------

export interface FileInputProps {
  /** Controlled list of uploaded files */
  files: UploadedFile[];
  /** Called when the user picks / drops new files */
  onAddFiles: (files: File[]) => void;
  /** Called when the user clicks × on a file row */
  onRemoveFile: (id: string) => void;
  accept?: string;
  className?: string;
}

// ---------- component ----------

export function FileInput({
  files,
  onAddFiles,
  onRemoveFile,
  accept = 'image/jpeg, image/png, image/gif',
  className,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  // ---- native input handler ----
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length) onAddFiles(picked);
    // reset so the same file can be re-selected
    e.target.value = '';
  };

  // ---- drag & drop handlers ----
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) =>
      accept.split(',').map((t) => t.trim()).includes(f.type)
    );
    if (dropped.length) onAddFiles(dropped);
  };

  return (
    <div className={cn('flex flex-col gap-0 w-full', className)}>
      {/* ---- Drop Zone ---- */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'flex items-center gap-4 px-4 py-3 rounded-sm border-2 border-dashed transition-colors',
          dragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-blue-300 bg-[#eef2fb]'
        )}
      >
        {/* hidden native input */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleInputChange}
        />

        {/* SELECT FILES button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white text-sm font-semibold rounded transition-colors whitespace-nowrap"
        >
          SELECT FILES…
        </button>

        {/* drop hint */}
        <span className="text-blue-500 text-sm font-medium select-none">
          Drop files here to upload
        </span>
      </div>

      {/* ---- File List ---- */}
      {files.length > 0 && (
        <div className="flex flex-col divide-y divide-gray-100 border border-t-0 border-blue-200 rounded-b-sm">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-start gap-3 px-4 py-3 bg-white"
            >
              {/* thumbnail icon */}
              <div className="mt-0.5 shrink-0">
                <ImageIcon />
              </div>

              {/* info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-blue-600 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">{file.sizeKb} kb</p>
                {file.status === 'success' ? (
                  <p className="text-xs font-medium text-green-600 mt-0.5">
                    File successfully uploaded.
                  </p>
                ) : (
                  <p className="text-xs font-medium text-red-500 mt-0.5">
                    {file.errorMessage ?? 'File failed to upload'}
                  </p>
                )}
              </div>

              {/* remove button */}
              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="shrink-0 text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none mt-0.5"
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
