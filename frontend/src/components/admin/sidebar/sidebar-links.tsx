import { RxDashboard } from "react-icons/rx";
import { Link, useLocation } from "react-router";

const links = [
  {
    lable: "Dashboard",
    link: "/admin",
    icon: <RxDashboard />,
  },
  {
    lable: "Brands",
    link: "/admin/brands",
    icon: <RxDashboard />,
  },
  {
    lable: "Category",
    link: "/admin/category",
    icon: <RxDashboard />,
  },
  {
    lable: "Products",
    link: "/admin/products",
    icon: <RxDashboard />,
  },
  {
    lable: "Users",
    link: "/admin/users",
    icon: <RxDashboard />,
  },
  {
    lable: "Orders",
    link: "/admin/orders",
    icon: <RxDashboard />,
  },
];

const SidebarLinks = () => {
  const location = useLocation();
  const active_path = location.pathname;
  return (
    <div className="flex flex-col gap-1 mt-6">
      {links.map((item) => (
        <Link
          key={item.link}
          to={item.link}
          className={` text-indigo-900 hover:text-white flex items-center gap-2 border border-indigo-300 p-2 rounded-md hover:bg-indigo-200 transition-all duration-200 ${
            active_path === item.link ? "bg-indigo-300 text-white" : ""
          }`}
        >
          <div>{item.icon}</div>
          <p className="text-lg font-semibold">{item.lable}</p>
        </Link>
      ))}
    </div>
  );
};

export default SidebarLinks;
