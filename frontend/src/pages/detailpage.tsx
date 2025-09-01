import { useParams } from "react-router"
import ComponentTitle from "../components/common/title-component"
import { useQuery } from "@tanstack/react-query"
import { getById } from "../api/product.api"

const ProductDetailPage = () => {

  const {id} = useParams()
  

  const {data,isLoading} = useQuery({
    queryFn:()=>{return getById(id as string)},
    queryKey:['get_product_by_id',id]
  })

  if(isLoading){
    return <div className="h-[80vh] w-full flex justify-center items-center">
      <p className="">Loading</p>
    </div>
  }

  console.log(data)

  return (
    <div className="min-h-screen px-36">
      <ComponentTitle
        title={data?.data.name}
        sub_title={data?.data.description}
      />
    </div>
  )
}

export default ProductDetailPage
