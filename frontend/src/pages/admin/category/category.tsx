
import PageHeader from "../../../components/admin/header/page-header";

const CategoryPage = () => {
  return (
    <main className="h-full w-full tracking-wider">
      <PageHeader 
        title="Category List"
        sub_title="All products categories"
        button_text="Add Category"
        link_to={'/admin/category/add'}
      />
    </main>
  );
};

export default CategoryPage;
