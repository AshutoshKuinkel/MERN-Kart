import CategoryForm from '../../../components/admin/category/form'
import PageHeader from '../../../components/admin/header/page-header'

const CreateCategory = () => {
  return (
    <main className='h-full w-full tracking-wider'>
      <PageHeader
      key={'list-category'}
      title='Add New Category'
      sub_title='All products categories'
      button_text='View List'
      link_to='/admin/category'
      />

      <div className='p-3 mt-5 min-h-[500px] shadow rounded-md border border-gray-300'>
        <h1 className='font-bold text-lg text-violet-900 text-center mb-10 '>Category Form</h1>
        <CategoryForm/>
      </div>
    </main>
  )
}

export default CreateCategory
