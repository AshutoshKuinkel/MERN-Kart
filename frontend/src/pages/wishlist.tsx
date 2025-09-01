import ComponentTitle from "../components/common/title-component"
import withAuth from "../components/hoc/with-auth.hoc"
import Wishlist from "../components/wishlist/list"
import { Role } from "../types/enum"


const WishlistPage = () => {
  return (
    <div className="w-full h-full px-36 mt-3">
      <ComponentTitle
        title="Saved for later"
        sub_title="You've got great taste. Here's everything you've been eyeing."
      />

      {/* product list */}
      <div className="flex w-full">
        <Wishlist/>
      </div>
    </div>
  )
}

export default withAuth(WishlistPage,[Role.USER])
