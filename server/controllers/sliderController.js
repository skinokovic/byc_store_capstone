import HeroSlider from "../models/heroSliderModel.js";
import cloudinary from "../config/cloudinary.js";

/* ===========================
   CREATE SLIDER
=========================== */

export const createSlider = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      animatedWords,
      duration,
      order,
      isActive,

      primaryText,
      primaryLink,

      secondaryText,
      secondaryLink,
    } = req.body;
    console.log("data got here api", req.body);
    if (
      !req.files ||
      (!req.files.left && !req.files.center && !req.files.right)
    ) {
      return res.status(400).json({
        message: "Please upload all slider images",
      });
    }

    const images = {
      left: null,
      center: null,
      right: null,
    };

    ["left", "center", "right"].forEach((side) => {
      if (req.files[side]?.length) {
        images[side] = {
          url: req.files[side][0].path,
          public_id: req.files[side][0].filename,
        };
      }
    });

    const slider = await HeroSlider.create({
      title,

      subtitle,

      description,

      animatedWords: JSON.parse(animatedWords),

      duration,

      order,

      isActive,

      images,

      buttons: {
        primary: {
          text: primaryText,
          link: primaryLink,
        },

        secondary: {
          text: secondaryText,
          link: secondaryLink,
        },
      },
    });

    res.status(201).json(slider);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   GET ALL SLIDERS
=========================== */

export const getSliders = async (req, res) => {
  try {
    const sliders = await HeroSlider.find().sort({
      order: 1,
    });

    res.json(sliders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   GET SINGLE SLIDER
=========================== */

export const getSliderById = async (req, res) => {
  try {
    const slider = await HeroSlider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({
        message: "Slider not found",
      });
    }

    res.json(slider);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   UPDATE SLIDER
=========================== */

export const updateSlider = async (req, res) => {
  try {
    const slider = await HeroSlider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({
        message: "Slider not found",
      });
    }

    slider.title = req.body.title;
    slider.subtitle = req.body.subtitle;
    slider.description = req.body.description;
    slider.duration = req.body.duration;
    slider.order = req.body.order;
    slider.isActive = req.body.isActive;

    slider.animatedWords = JSON.parse(req.body.animatedWords);

    slider.buttons.primary.text = req.body.primaryText;
    slider.buttons.primary.link = req.body.primaryLink;

    slider.buttons.secondary.text = req.body.secondaryText;
    slider.buttons.secondary.link = req.body.secondaryLink;

    if (req.files?.length) {
      for (const file of req.files) {
        const key = file.fieldname;

        if (slider.images[key]?.public_id) {
          await cloudinary.uploader.destroy(slider.images[key].public_id);
        }

        slider.images[key] = {
          url: file.path,
          public_id: file.filename,
        };
      }
    }

    await slider.save();

    res.json(slider);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   DELETE SLIDER
=========================== */

export const deleteSlider = async (req, res) => {
  try {
    const slider = await HeroSlider.findById(req.params.id);

    if (!slider) {
      return res.status(404).json({
        message: "Slider not found",
      });
    }

    const imgs = Object.values(slider.images);

    for (const img of imgs) {
      if (img?.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await slider.deleteOne();

    res.json({
      message: "Slider deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
