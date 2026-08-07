import Category from "../models/Category.js";
// Referenced here even though Product.js may not be finalized on your end yet -
// used only to block deleting a category that products still point to.
import Product from "../models/Product.js";

// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parentCategory: null }).populate(
      "subcategories",
    );

    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch categories", error: error.message });
  }
};

// @desc    Get all categories (top-level, with their subcategories nested in)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("parentCategory", "name")
      .sort({ createdAt: 1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

// @desc    Get a single category by id or slug
// @route   GET /api/categories/:idOrSlug
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    // Allow lookup by either Mongo _id or the human-readable slug
    const isObjectId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: idOrSlug } : { slug: idOrSlug };

    const category = await Category.findOne(query).populate(
      "parentCategory",
      "name slug",
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch category", error: error.message });
  }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, parentCategory } = req.body;

    const categoryExists = await Category.findOne({
      $or: [{ name }, { slug }],
    });
    if (categoryExists) {
      return res
        .status(400)
        .json({ message: "Category name or slug already exists" });
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      parentCategory: parentCategory || null,
    });

    res.status(201).json(category);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create category", error: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
  console.log("UPDATE HIT***************");

  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    Object.assign(category, req.body);
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update category", error: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Guard against orphaning products - block deletion if any product still
    // references this category. Requires Product.js to exist with a
    // `category` field of type ObjectId ref 'Category' (set up in a prior step).
    const productCount = await Product.countDocuments({
      category: category._id,
    });
    if (productCount > 0) {
      return res.status(400).json({
        message: `Cannot delete category - ${productCount} product(s) still reference it`,
      });
    }

    await category.deleteOne();
    res.status(200).json({ message: "Category removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete category", error: error.message });
  }
};

/**
 * GET
 * /api/categories/parents
 */

export const getParentCategories = async (req, res) => {
  try {
    const parents = await Category.find({
      parentCategory: null,
    })
      .select("name slug image")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      categories: parents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET
 * /api/categories/:parentId/subcategories
 */

export const getSubCategories = async (req, res) => {
  try {
    const { parentId } = req.params;

    const categories = await Category.find({
      parentCategory: parentId,
    }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
