import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const heroSliderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    animatedWords: [
      {
        type: String,
        trim: true,
      },
    ],

    images: {
      left: imageSchema,
      center: imageSchema,
      right: imageSchema,
    },

    buttons: {
      primary: {
        text: {
          type: String,
          default: "Shop Now",
        },
        link: {
          type: String,
          default: "/shop",
        },
      },

      secondary: {
        text: {
          type: String,
          default: "Learn More",
        },
        link: {
          type: String,
          default: "/about",
        },
      },
    },

    duration: {
      type: Number,
      default: 5000,
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("HeroSlider", heroSliderSchema);
