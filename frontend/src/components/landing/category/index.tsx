import { useQuery } from "@tanstack/react-query";
import ComponentTitle from "../../common/title-component";
import CategoryCard from "./card";
import { getAllCategory } from "../../../api/category.api";
import type { ICategoryResponse } from "../../../types/category.types";

const CategoryList = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllCategory,
    queryKey: [`get_all_category`],
  });

  console.log(data);

  return (
    <div className="">
      <ComponentTitle
        title="Our Featured Categories"
        sub_title="Explore products by categories"
      />
      {isLoading && (
        <div className="flex justify-center items-center w-full h-full mt-6 min-h-[100px]">
          <p className="text-[16px] text-gray-700 text-center w-fit">
            Loading...
          </p>
        </div>
      )}

      {!isLoading && data?.data.length > 0 && (
        <div className=" mt-6 grid grid-cols-4 gap-5">
          {data?.data.map((category: ICategoryResponse) => (
            <CategoryCard category={category} />
          ))}
        </div>
      )}
      {!isLoading && data?.data.length === 0 && (
        <div className="flex justify-center items-center w-full h-full mt-6 min-h-[100px]">
          <p className="text-[16px] text-gray-700 text-center w-fit">
            No Categories Found
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
