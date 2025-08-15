
import * as yup from "yup";

export const loginSchema = yup.object({
  email:yup.string().required('email is required.').email('invalid email format'),
  password:yup.string().required('password is required')
})

export const signupSchema = yup.object({
  firstName:yup.string().required('First Name is required.'),
  lastName:yup.string().required('Last Name is required.'),
  email:yup.string().required('email is required.').email('invalid email format'),
  password:yup.string().required('password is required'),
  phone:yup.string().required('phone is required.')
})
