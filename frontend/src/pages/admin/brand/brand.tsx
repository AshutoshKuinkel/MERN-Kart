
import PageHeader from "../../../components/admin/header/page-header";

const BrandPage = () => {
  return (
    <main className="h-full w-full tracking-wider">
      <PageHeader 
        title="Brand List"
        sub_title="All products Brands"
        button_text="Add Brand"
        link_to={'/admin/brand/add'}
      />
    </main>
  );
};

export default BrandPage;
