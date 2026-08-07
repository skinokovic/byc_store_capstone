import Contact from "../models/contactModel.js";

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { phone, email, notes } = req.body;

    console.log("Contact body", req.body);

    const message = await Contact.create({ phone, email, notes });

    res.status(201).json({
      message: "Message sent — we'll get back to you soon.",
      contact: message,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to send message", error: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch messages", error: error.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const user = await Contact.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch contact messages",
        error: error.message,
      });
  }
};

// @desc    Update a message's status (e.g. mark as read/resolved)
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    if (req.body.status) message.status = req.body.status;
    const updated = await message.save();

    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update message", error: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete message", error: error.message });
  }
};
