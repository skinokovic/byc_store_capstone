import Collection from "../models/collectionModel.js";
import cloudinary from "../config/cloudinary.js";

// @desc   Create a new collection tile
// @route  POST /collection/create
export const createCollection = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      order,
      isActive,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const collection = await Collection.create({
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      order,
      isActive,
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all collections (admin table - all, or homepage - active only via query)
// @route  GET /collection/collections?active=true
export const getCollections = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === "true") filter.isActive = true;

    const collections = await Collection.find(filter).sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single collection
// @route  GET /collection/collections/:id
export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Not found" });
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update collection (replaces image on Cloudinary if a new file is sent)
// @route  PUT /collection/update/:id
export const updateCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Not found" });

    const {
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      order,
      isActive,
    } = req.body;

    if (title !== undefined) collection.title = title;
    if (subtitle !== undefined) collection.subtitle = subtitle;
    if (description !== undefined) collection.description = description;
    if (buttonText !== undefined) collection.buttonText = buttonText;
    if (buttonLink !== undefined) collection.buttonLink = buttonLink;
    if (order !== undefined) collection.order = order;
    if (isActive !== undefined) collection.isActive = isActive;

    if (req.file) {
      if (collection.image?.public_id) {
        await cloudinary.uploader.destroy(collection.image.public_id);
      }
      collection.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await collection.save();
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete collection + its Cloudinary image
// @route  DELETE /collection/delete/:id
export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Not found" });

    if (collection.image?.public_id) {
      await cloudinary.uploader.destroy(collection.image.public_id);
    }
    await collection.deleteOne();

    res.status(200).json({ message: "Collection deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
