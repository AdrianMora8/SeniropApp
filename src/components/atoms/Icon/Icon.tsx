import DotsIcon from '../../../assets/icons/IconDots.svg?react';
import SearchIconRaw from '../../../assets/icons/Search.svg?react';
import FocusSearchIconRaw from '../../../assets/icons/FocusSearch.svg?react';
import ViewIcon from '../../../assets/icons/Eye.svg?react';
import EditIcon from '../../../assets/icons/Edit_Pencil.svg?react';
import DeleteIcon from '../../../assets/icons/Trash.svg?react';

export { DotsIcon, ViewIcon, EditIcon, DeleteIcon };

export const SearchIcon = ({ isFocused = false, className = "" }: { isFocused?: boolean; className?: string }) => {
    return isFocused ? (
        <FocusSearchIconRaw className={className} />
    ) : (
        <SearchIconRaw className={className} />
    );
};
