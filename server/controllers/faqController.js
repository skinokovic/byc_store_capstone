import Faq from "../models/faqModel.js";

// @desc    Get all active FAQs, grouped-ready (sorted by category, then order)
// @route   GET /api/faqs
// @access  Public
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({ isActive: true }).sort({
      category: 1,
      order: 1,
    });
    res.status(200).json(faqs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch FAQs", error: error.message });
  }
};

// @desc    Get every FAQ, including inactive ones
// @route   GET /api/faqs/admin
// @access  Private/Admin
export const getAllFaqsAdmin = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ category: 1, order: 1 });
    res.status(200).json(faqs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch FAQs", error: error.message });
  }
};

// @desc    Create a new FAQ
// @route   POST /api/faqs
// @access  Private/Admin
export const createFaq = async (req, res) => {
  try {
    const { question, answer, category, order, isActive } = req.body;

    const faq = await Faq.create({
      question,
      answer,
      category,
      order: order ?? 0,
      isActive: isActive ?? true,
    });

    res.status(201).json(faq);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create FAQ", error: error.message });
  }
};

// @desc    Update an FAQ
// @route   PUT /api/faqs/:id
// @access  Private/Admin
export const updateFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    const { question, answer, category, order, isActive } = req.body;

    if (question !== undefined) faq.question = question;
    if (answer !== undefined) faq.answer = answer;
    if (category !== undefined) faq.category = category;
    if (order !== undefined) faq.order = order;
    if (isActive !== undefined) faq.isActive = isActive;

    const updated = await faq.save();
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update FAQ", error: error.message });
  }
};

// @desc    Delete an FAQ
// @route   DELETE /api/faqs/:id
// @access  Private/Admin
export const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: "FAQ not found" });

    await faq.deleteOne();
    res.status(200).json({ _id: req.params.id });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete FAQ", error: error.message });
  }
};
