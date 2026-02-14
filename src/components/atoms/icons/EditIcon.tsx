interface IconProps {
    size?: number;
    className?: string;
}

export const EditIcon = ({
    size = 16,
    className = ''
}: IconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
        >
            <rect width="16" height="16" fill="url(#pattern0_18_15561)" />
            <defs>
                <pattern id="pattern0_18_15561" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_18_15561" transform="scale(0.01)" />
                </pattern>
                <image id="image0_18_15561" width="100" height="100" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVElEQVR4nO3csUocQRzH8V/S2JoiTRANeYNwGJw+nYWd5AFCXuHaS4ogPoEKgj6CPkAKQYuQInmC40AsA9MmkAsHK4hFyszN7/d+X5g+h2/97/ubs6TAAAAAADuNiR9kLQv6VTSsaRPkt5Jelb64mrxRNKOpG+S5v9YvyWdS3pd+oKH7IWki/+EuL/+SDqUtFL64odmJOn6kTHurktJz0tvYkgxfnaIcbuumJTutiTFBDFu10GCa6rWKNFk3L+ncKM3mIy766zNBdVsLWOMxvolabX0JvtmkjHIYu2W3mAfjTMG+Vh6c301zhTkqPTG+mySIchJ6U313ThxkM+lN+ToacFJeZ9pT73+0Pdd0qtCk7KeaV+9/9A3lfRyyZPyNdO+BvM4ZLbkSdnOtLdBPQ6ZLmlSvmTa2yAfFM4yT8pNc8hVva1HPJvKNSmxeVFUb9TiEXrqSYnNi6J6ow7nGamiEKMREjxC7xqFGAljdI1CjIwnfW1u9ItDruqFjCd9bSalaiHzsStRzGIQxTAGUQxjEKXA96Yeun60OOQapGAQg88ZDWIYCUyGj0AMH4EYPgIxfARi+AjE8BGI4YMYRohhhBhGiGGEGEaIYYQYRohhhBhGiGGEGEaIYYQYRohhhBhGiGGEGEaIYYQYRohhhBhGNk2+HRJK/yFq+eXOOf8S0J8gkZ+r8AkSieEzIZEYPm9ZkRg+95BIDJ+beiSGT5BIDJ8gkRg+QSIxfIJEYvgEIYZREGIYBSGGURBiGAUhRkJvJe11XG9SXhAAAAAAAAAALd1fJKc8EqgmEE4AAAAASUVORK5CYII=" />
            </defs>
        </svg>
    );
};
