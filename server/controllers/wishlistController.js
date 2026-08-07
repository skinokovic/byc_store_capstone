import Wishlist from "../models/wishlistModel.js";
import Product from "../models/Product.js";

async function getPopulatedWishlist(userId) {
  return Wishlist.findOne({ user: userId }).populate(
    "products",
    "name price images stock",
  );
}

// @desc    Get the logged-in user's wishlist (creates an empty one if it
//          doesn't exist yet)
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await getPopulatedWishlist(req.user._id);

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch wishlist", error: error.message });
  }
};

// @desc    Add a product to the wishlist (no-op if it's already in there)
// @route   POST /api/wishlist/add
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    const alreadyIn = wishlist.products.some(
      (id) => String(id) === String(productId),
    );

    if (!alreadyIn) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.status(200).json(await getPopulatedWishlist(req.user._id));
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add to wishlist", error: error.message });
  }
};

// @desc    Remove a product from the wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      (id) => String(id) !== String(req.params.productId),
    );

    await wishlist.save();
    res.status(200).json(await getPopulatedWishlist(req.user._id));
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to remove from wishlist",
        error: error.message,
      });
  }
};
