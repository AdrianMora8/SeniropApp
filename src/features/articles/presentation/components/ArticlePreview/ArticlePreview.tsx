
export interface ImageThumbnail {
    src: string;
    name: string;
    sizeKb: string;
}

function parseImageThumbnail(image: string, index: number): ImageThumbnail {
    // Derive name and size from base64 data URI or plain URL
    let name = `Image_${index + 1}.jpg`;
    let sizeKb = '';

    if (image.startsWith('data:')) {
        // base64 data URI: data:[mime];base64,[data]
        const mimeMatch = image.match(/^data:([^;]+);/);
        const ext = mimeMatch ? mimeMatch[1].split('/')[1] : 'jpg';
        name = `Document_${index + 1}.${ext}`;

        const base64Data = image.split(',')[1] ?? '';
        const bytes = Math.round((base64Data.length * 3) / 4);
        sizeKb = `${(bytes / 1024).toFixed(2)} kb`;
    } else {
        // Plain URL: extract last segment as filename
        const segments = image.split('/').filter(Boolean);
        name = segments[segments.length - 1] ?? name;
    }

    return { src: image, name, sizeKb };
}

export const ArticlePreview = ({ images }: { images: string[] }) => {
    if (!images || images.length === 0) return null;

    const thumbnails = images.map(parseImageThumbnail);

    return (
        <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-[rgb(var(--color-text-main))]">
                Images
            </span>

            <div className="flex flex-col gap-2">
                {thumbnails.map((thumb, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 border border-[rgb(var(--color-border))] rounded p-2"
                    >
                        {/* Thumbnail */}
                        <img
                            src={thumb.src}
                            alt={thumb.name}
                            className="w-20 h-14 object-cover rounded shrink-0"
                        />

                        {/* Info */}
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-[rgb(var(--color-text-link))] truncate">
                                {thumb.name}
                            </span>
                            {thumb.sizeKb && (
                                <span className="text-xs text-[rgb(var(--color-text-muted))]">
                                    {thumb.sizeKb}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
