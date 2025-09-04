import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <main className="h-screen flex">
      {/* Sidebar */}
      <div className="w-[250px] border-r border-gray-300">sidebar</div>

      {/* nav & outlet */}
      <div className="flex-1 h-full flex flex-col overflow-auto">
        <div className="border-b border-gray-300 h-15 mb-3 shadow">Nav</div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
