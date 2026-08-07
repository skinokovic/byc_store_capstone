import Newsletter from "../models/newsletterModel.js";

// @desc    Subscribe an email to the newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({ message: "This email is already subscribed" });
    }

    await Newsletter.create({ email });

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to subscribe", error: error.message });
  }
};

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch subscribers", error: error.message });
  }
};

// @desc    Delete a subscriber
// @route   DELETE /api/subscriber/:id
// @access  Private/Admin
export const deleteSubscriber = async (req, res) => {
  try {
    const emailSubscriber = await Newsletter.findById(req.params.id);

    if (!emailSubscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    await emailSubscriber.deleteOne();
    res.status(200).json({ message: "Subscriber removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete message", error: error.message });
  }
};
