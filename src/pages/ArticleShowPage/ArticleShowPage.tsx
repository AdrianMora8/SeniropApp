import { useState } from "react";
import { useArticles } from "@/features/articles/application/hooks/useArticles";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/shared/components/organisms/Header";

export const ArticleShowPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getArticleById } = useArticles();
    const article = id ? getArticleById(id) : undefined;

    const [imageIndex, setImageIndex] = useState(0);

    if (!article) {
        return <div className="flex items-center justify-center h-screen text-gray-500">Article not found</div>;
    }

    const images = article.images ?? [];
    const hasMultipleImages = images.length > 1;

    const formattedDate = article.publicationDate
        ? new Date(article.publicationDate).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        })
        : "";

    const goToPrev = () => setImageIndex((i) => Math.max(0, i - 1));
    const goToNext = () => setImageIndex((i) => Math.min(images.length - 1, i + 1));

    return (
        <div className="flex flex-col h-screen bg-[rgb(var(--color-bg-main))]">
            <Header label="Daily News" />

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto px-6 py-10">
                    {/* Date */}
                    <p className="text-sm text-gray-400 mb-4">{formattedDate}</p>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center text-gray-900 leading-tight mb-2">
                        {article.headline}
                    </h1>

                    {/* Author */}
                    <p className="text-center text-gray-400 mb-6">By {article.author}</p>

                    {/* Image */}
                    {images.length > 0 && (
                        <img
                            src={images[imageIndex]}
                            alt={article.headline}
                            className="w-full object-cover mb-4"
                        />
                    )}

                    {/* Image navigation — only shown when more than one image */}
                    {hasMultipleImages && (
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={goToPrev}
                                disabled={imageIndex === 0}
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <ArrowLeft size={14} />
                                <span>back</span>
                            </button>

                            <button
                                onClick={goToNext}
                                disabled={imageIndex === images.length - 1}
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                                <span>next</span>
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    )}

                    {/* Body */}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {article.body}
                    </p>
                </div>
            </div>
        </div>
    );
};
