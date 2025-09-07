import * as yup from 'yup';

export const categorySchema = yup.object({
  name:yup.string().required('Category Name is required.'),
  description:yup.string().required('Category Description is required.').min(25,'Description must be greater than 25 characters,')
})