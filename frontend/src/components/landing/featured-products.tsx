import ComponentTitle from '../common/title-component'
import ProductCard from '../product/card'


const FeaturedProducts = () => {
  return (
    <div className='min-h-[500px]'>
      <ComponentTitle title='Featured Products' sub_title='Limited Stock- Shop Featured Favorites Today' link='#' />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-6'>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>

    </div>
  )
}

export default FeaturedProducts
