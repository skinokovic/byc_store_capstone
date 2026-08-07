import Arrival from "../models/arrivalModel.js";
import cloudinary from "../config/cloudinary.js";

// @desc   Create a new arrival
// @route  POST /api/arrivals
export const createArrival = async (req, res) => {
  try {
    const { title, subtitle, category, isActive, displayOrder } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const arrival = await Arrival.create({
      title,
      subtitle,
      category,
      isActive,
      displayOrder,
      image: {
        url: req.file.path, // secure_url from multer-storage-cloudinary
        public_id: req.file.filename, // public_id from multer-storage-cloudinary
      },
    });

    const populated = await arrival.populate("category", "name");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get all arrivals (admin table - all, or homepage - active only via query)
// @route  GET /api/arrivals?active=true
export const getArrivals = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === "true") filter.isActive = true;

    const arrivals = await Arrival.find(filter)
      .populate("category", "name")
      .sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json(arrivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get single arrival
// @route  GET /api/arrivals/:id
export const getArrivalById = async (req, res) => {
  try {
    const arrival = await Arrival.findById(req.params.id).populate(
      "category",
      "name",
    );
    if (!arrival) return res.status(404).json({ message: "Not found" });
    res.status(200).json(arrival);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update arrival (replaces image on Cloudinary if a new file is sent)
// @route  PUT /api/arrivals/:id
export const updateArrival = async (req, res) => {
  try {
    const arrival = await Arrival.findById(req.params.id);
    if (!arrival) return res.status(404).json({ message: "Not found" });

    const { title, subtitle, category, isActive, displayOrder } = req.body;

    if (title !== undefined) arrival.title = title;
    if (subtitle !== undefined) arrival.subtitle = subtitle;
    if (category !== undefined) arrival.category = category;
    if (isActive !== undefined) arrival.isActive = isActive;
    if (displayOrder !== undefined) arrival.displayOrder = displayOrder;

    if (req.file) {
      // delete old image from cloudinary, then attach new one
      if (arrival.image?.public_id) {
        await cloudinary.uploader.destroy(arrival.image.public_id);
      }
      arrival.image = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    await arrival.save();
    const populated = await arrival.populate("category", "name");
    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete arrival + its Cloudinary image
// @route  DELETE /api/arrivals/:id
export const deleteArrival = async (req, res) => {
  try {
    const arrival = await Arrival.findById(req.params.id);
    if (!arrival) return res.status(404).json({ message: "Not found" });

    if (arrival.image?.public_id) {
      await cloudinary.uploader.destroy(arrival.image.public_id);
    }
    await arrival.deleteOne();

    res.status(200).json({ message: "Arrival deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
