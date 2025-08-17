import { Link, useLocation } from "react-router";
const links:{label:string,link:string}[] = [
  {
    label:'Home',
    link:'/'
  },
  {
    label:'Products',
    link:'/products'
  },
  {
    label:'About Us',
    link:'/about-us'
  },
  {
    label:'Contact Us',
    link:'/contact-us'
  }
]

export const NavLinks = ()=>{
  const location = useLocation()
  const active_path = location.pathname
  return(
      <div className="flex gap-4">
        {
          links.map((item,index)=>(
            <Link key={`${item.link} -${index}`} to={item.link}>
              <span className={`hover:font-semibold w-[100px] transition-all duration-300 ${active_path === item.link ? 'font-semibold text-violet-500' : 'text-grey-500'}`}>{item.label}</span>
            </Link>
            
          ))
        }
      </div>
  )
}