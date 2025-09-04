import { Outlet } from "react-router";
import Sidebar from "../components/admin/sidebar";

const AdminLayout = () => {
  return (
    <main className="h-screen flex">
      {/* Sidebar */}
      <div className="w-[250px] border-r border-gray-300">
        <Sidebar/>
      </div>

      {/* nav & outlet */}
      <div className="flex-1 h-full flex flex-col overflow-auto">
        <div className="border-b border-gray-300 h-15 mb-3 shadow">
          Nav
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
