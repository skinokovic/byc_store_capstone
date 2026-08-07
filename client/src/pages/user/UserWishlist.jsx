import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import UserHeader from "../../components/user/dashboard/UserHeader";
import WishlistTable from "../../components/user/dashboard/tables/WishlistTable";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../../redux/slice/wishlistSlice";
import { addToCart } from "../../redux/slice/cartSlice";

function UserWishlist() {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  const products = wishlist?.products || [];

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  async function handleRemove(productId) {
    const result = await dispatch(removeFromWishlist(productId));

    if (removeFromWishlist.fulfilled.match(result)) {
      toast.success("Removed from wishlist");
    } else {
      toast.error(result.payload || "Failed to remove item");
    }
  }

  async function handleAddToCart(productId) {
    const cartResult = await dispatch(addToCart({ productId, quantity: 1 }));

    if (!addToCart.fulfilled.match(cartResult)) {
      toast.error(cartResult.payload || "Failed to add to cart");
      return;
    }

    const wishlistResult = await dispatch(removeFromWishlist(productId));

    if (removeFromWishlist.fulfilled.match(wishlistResult)) {
      toast.success("Moved to cart");
    } else {
      // item is in the cart either way - just flag that the wishlist
      // cleanup didn't go through, rather than implying the whole action failed
      toast.error("Added to cart, but couldn't remove from wishlist");
    }
  }

  return (
    <div>
      <UserHeader title="Wishlist" subtitle="Items you've saved for later" />

      <div className="ud-card">
        {loading ? (
          <p className="text-secondary small mb-0">Loading wishlist...</p>
        ) : error ? (
          <p className="text-danger small mb-0">{error}</p>
        ) : (
          <>
            <p className="text-secondary small mb-3">
              {products.length} item{products.length !== 1 ? "s" : ""}
            </p>
            <WishlistTable
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
              products={products}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UserWishlist;
