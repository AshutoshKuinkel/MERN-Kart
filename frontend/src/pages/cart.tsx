
import withAuth from '../components/hoc/with-auth.hoc'
import { Role } from '../types/enum'

const CartPage = () => {
  return (
    <div>
      CartPage
    </div>
  )
}



const ProtectedCartPage = withAuth(CartPage,[Role.USER])
export default ProtectedCartPage
