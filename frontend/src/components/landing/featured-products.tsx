import { useQuery } from '@tanstack/react-query'
import ComponentTitle from '../common/title-component'
import ProductCard from '../product/card'
import { getAllProducts } from '../../api/product.api'
import type { IProduct } from '../../types/product.types'


const FeaturedProducts = () => {
  const {data,isLoading} = useQuery({
    queryFn:getAllProducts,
    queryKey:['get_all_product']
  })

  console.log(data)

  return (
    <div className='min-h-[500px]'>
      <ComponentTitle title='Featured Products' sub_title='Limited Stock- Shop Featured Favorites Today' link='#' />
      {
        isLoading && <div className='min-h-40 flex justify-center items-center'
        >
          <p className='text-xl text-violet-700'>Loading...</p>
        </div>
      }
      { !isLoading && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6'>
        {data?.data.map((product:IProduct)=>(
          <ProductCard product={product} key={product._id}/>
        ))}
      </div>}

    </div>
  )
}

export default FeaturedProducts
