interface IconProps {
    size?: number;
    className?: string;
}

export const DeleteIcon = ({
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
            <rect width="16" height="16" fill="url(#pattern0_18_15576)" />
            <defs>
                <pattern id="pattern0_18_15576" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_18_15576" transform="scale(0.01)" />
                </pattern>
                <image id="image0_18_15576" width="100" height="100" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDklEQVR4nO2dMWrcUBRFL95AsgG3JvA2kPQp7TJbcBmcKkVSTBVSxQuYHcwKvIh08ZTxOlz5B8EYTAhI2NLo/ptz4HUjofMOKgSDJAEAAAAAAMC/+CRp98IZzgEzsJHUZprvFPGJ0YjiF6P9D1HeSPo882wXjPE42wWue9jF6nw4wvJaJzPsYnUIIoI0g7uBO0TrL5wgWn/JBNH6iyWIwTJbSpD3kn4+mf2EC9//dYzj7J/hMezCjpogMvzGnQrxiBGpEI8YkQrxiBGpEI8YkQrxiBGpEI9ZRC5HHtqGPy2MsRs5x+URPCyYQ2QzcvzthOu4HTnH5ggeFhDEDIKYQRAzCGIGQcwgiBkEMYMgZhDEDIKYQRAzCGIGQcwgiBkEMYMgZhDEDIKYQRAzCGIGQcwgiBkEMYMgZhDEDIKYQRAzCGIGQcwgiBkEMYMgZhDEDIKYQRAzCGIGQcwgiBkEMYMgZhDEDIKYQRAzCGJGyktbKsQjRqRCPGJEKsQjRqRCPGJEKsQjRqRCPGJEKsQjRqRCPHQ2QeRmhk+p7haemwkeg6s9ryeIpMwrdcJvg2W1hedOHXFtsLC28PxQR5xKujdYWlto7g+OXXFlsLi20HxUp3yT9GCwwDbTPBycuuZiwnvYe5hfks4Vwomkd5K+Hj6bvetktpK+SHp7cAAAAAAAAFAafwD6vEsJM8RsvAAAAABJRU5ErkJggg==" />
            </defs>
        </svg>
    );
};
