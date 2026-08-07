import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// @desc    Get all products (supports ?keyword= and ?category= filters)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find({ ...keyword, ...category }).populate(
      "category",
      "name slug",
    );
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// @desc    Get a single product by id
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name slug",
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // console.log(product);

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin

// export const createProduct = async (req, res) => {
//   console.log("Create product controller reached");

//   try {
//     const { name, sku, description, price, category, stock } = req.body;

//     const images = req.files
//       ? req.files.map((file) => ({
//           url: file.path,
//           public_id: file.filename,
//         }))
//       : [];

//     const product = await Product.create({
//       name,
//       sku,
//       description,
//       price,
//       category,
//       stock,
//       images,
//     });

//     res.status(201).json(product);
//   } catch (error) {
//     console.error("CREATE PRODUCT ERROR:", error);

//     res.status(400).json({
//       message: "Failed to create product",
//       error: error.message,
//     });
//   }
// };

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      short_description,
      long_description,
      price,
      category,
      stock,
      sizes,
      colors,
    } = req.body;

    const images = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    const product = await Product.create({
      name,
      sku,
      short_description,
      long_description,
      price,
      category,
      stock,
      images,
      sizes: sizes ? JSON.parse(sizes) : [],
      colors: colors ? JSON.parse(colors) : [],
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(400).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// // @desc    Update an existing product
// // @route   PUT /api/products/:id
// // @access  Private/Admin

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name;
    product.sku = req.body.sku;
    product.short_description = req.body.short_description;
    product.long_description = req.body.long_description;
    product.price = req.body.price;
    product.category = req.body.category;
    product.stock = req.body.stock;

    if (req.body.sizes) product.sizes = JSON.parse(req.body.sizes);
    if (req.body.colors) product.colors = JSON.parse(req.body.colors);

    // keepImages = public_ids of EXISTING images the user did not remove
    // (sent as a JSON array string from the frontend)
    const keepImageIds = req.body.keepImages
      ? JSON.parse(req.body.keepImages)
      : product.images.map((img) => img.public_id); // default: keep all

    // Delete from Cloudinary any existing image NOT in keepImageIds
    const imagesToRemove = product.images.filter(
      (img) => !keepImageIds.includes(img.public_id),
    );
    for (const image of imagesToRemove) {
      try {
        await cloudinary.uploader.destroy(image.public_id);
      } catch (err) {
        console.log(`Failed to delete ${image.public_id}:`, err.message);
      }
    }

    const keptImages = product.images.filter((img) =>
      keepImageIds.includes(img.public_id),
    );

    const newImages = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    product.images = [...keptImages, ...newImages];

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(400).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};
// // @desc    Update an existing product
// // @route   PUT /api/products/:id
// // @access  Private/Admin

// export const updateProduct = async (req, res) => {
//   console.log("===== UPDATE REQUEST =====");
//   console.log("Body:", req.body);
//   console.log("Files:", req.files);

//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         message: "Product not found",
//       });
//     }

//     // Update product details
//     product.name = req.body.name;
//     product.sku = req.body.sku;
//     product.description = req.body.description;
//     product.price = req.body.price;
//     product.category = req.body.category;
//     product.stock = req.body.stock;

//     // If new images were uploaded, replace the old ones
//     if (req.files && req.files.length > 0) {
//       // Delete old images from Cloudinary
//       for (const image of product.images) {
//         try {
//           await cloudinary.uploader.destroy(image.public_id);
//           console.log(`Deleted: ${image.public_id}`);
//         } catch (err) {
//           console.log(`Failed to delete ${image.public_id}:`, err.message);
//         }
//       }

//       // Save the new images
//       product.images = req.files.map((file) => ({
//         url: file.path,
//         public_id: file.filename,
//       }));
//     }

//     const updatedProduct = await product.save();

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     console.log("========== UPDATE PRODUCT ERROR ==========");
//     console.error(error);

//     res.status(400).json({
//       message: "Failed to update product",
//       error: error.message,
//     });
//   }
// };

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Delete all product images from Cloudinary
    if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map(async (image) => {
          if (image.public_id) {
            try {
              await cloudinary.uploader.destroy(image.public_id);
            } catch (err) {
              console.error(
                `Failed to delete ${image.public_id} from Cloudinary`,
                err.message,
              );
            }
          }
        }),
      );
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

/**
 * GET
 * /api/products/by-category/:categoryId
 */

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({
      category: categoryId,
    })
      .populate("category", "name slug")
      .sort({
        createdAt: -1,
      })
      .limit(12);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// controllers/productController.js

// @route POST /api/products/:id/reviews
// @access Private (logged-in users)
export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString(),
    );
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name, // adjust to your User schema's name field
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/products/by-ids
// @access Public
export const getProductsByIds = async (req, res) => {
  try {
    const { ids = [] } = req.body;
    if (!ids.length) return res.json([]);

    const products = await Product.find({ _id: { $in: ids } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products related to a given product (same category,
//          excluding itself)
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const limit = Number(req.query.limit) || 8;

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }, // exclude the current product itself
    })
      .populate("category", "name slug")
      .sort({ rating: -1, createdAt: -1 }) // best-rated first, then newest
      .limit(limit);

    res.status(200).json(relatedProducts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch related products",
      error: error.message,
    });
  }
};
