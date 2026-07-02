import { DashboardHeader } from "./DashboardHeader"
import { WishlistGrid } from "./WishlistGrid"

export function DashboardWishlist() {
  return (
    <>
      <DashboardHeader
        title="Wishlist"
        description="Keep track of your favorite styles and shop them whenever you’re ready."
      />
      <WishlistGrid />
    </>
  )
}
