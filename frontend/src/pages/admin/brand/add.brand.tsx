import BrandForm from '../../../components/admin/brand/form'
import PageHeader from '../../../components/admin/header/page-header'

const CreateBrand = () => {
  return (
    <main className='h-full w-full tracking-wider'>
      <PageHeader
      key={'list-category'}
      title='Add New Brand'
      sub_title='All products categories'
      button_text='View List'
      link_to='/admin/brand'
      />

      <div className='p-3 mt-5 min-h-[500px] shadow rounded-md border border-gray-300'>
        <h1 className='font-bold text-lg text-violet-900 text-center mb-10 '>Brand Form</h1>
        <BrandForm/>
      </div>
    </main>
  )
}

export default CreateBrand
