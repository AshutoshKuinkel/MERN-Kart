import { BiCategoryAlt } from "react-icons/bi";
import type { ICategoryResponse } from "../../../types/category.types";

interface IProps{
  category:ICategoryResponse
}

const CategoryCard:React.FC<IProps> = ({category}) => {
  return (
    <div className=" cursor-pointer flex gap-2 items-center border shadow-sm border-violet-300 p-2 rounded-sm bg-[#f8f8f8] transition-all duration-300 hover:bg-white hover:translate-y-1">
      <div>
        <BiCategoryAlt size={28} className="text-violet-500"/>
      </div>
      <div>
        <h2 className="font-bold text-[18px] text-violet-800">{category.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-1">
          {category.description ?? '-'}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
