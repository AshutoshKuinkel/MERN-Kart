import SidebarLinks from "./sidebar-links"


const Sidebar = () => {
  return (
    <div className="h-full w-full p-2">
      <div className="flex gap-2 items-center justify-center">
        <img className='border border-gray-300' src='/logo.svg'/>
        <div>
          <p className="font-bold text-2xl italic text-indigo-500">Shop Kart</p>
        </div>
      </div>

      {/* Links section */}
      <SidebarLinks/>
    </div>
  )
}

export default Sidebar
