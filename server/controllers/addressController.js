import Address from "../models/AddressModel.js";
import { resolveDeliveryFee } from "./deliveryZoneController.js";

// @desc    Get the logged-in user's addresses
// @route   GET /api/addresses
// @access  Private
export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({
      isDefault: -1,
      createdAt: -1,
    });
    res.status(200).json(addresses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch addresses", error: error.message });
  }
};

// @desc    Get a single address (must belong to the requesting user)
// @route   GET /api/addresses/:id
// @access  Private
export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!address) return res.status(404).json({ message: "Address not found" });

    res.status(200).json(address);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch address", error: error.message });
  }
};

// @desc    Create a new address for the logged-in user. deliveryFee is
//          auto-computed from the state, not accepted from the client.
// @route   POST /api/addresses/create
// @access  Private
export const createAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      phone,
      street,
      city,
      state,
      country,
      postalCode,
      isDefault,
    } = req.body;
    console.log("API HIT", req.body);
    console.log("req.user:", req.user);
    const deliveryFee = await resolveDeliveryFee(state);

    // if this is being set as default (or it's the user's first address),
    // unset any existing default first so there's never more than one
    const existingCount = await Address.countDocuments({ user: req.user._id });
    const shouldBeDefault = isDefault || existingCount === 0;

    if (shouldBeDefault) {
      await Address.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } },
      );
    }

    const address = await Address.create({
      user: req.user._id,
      label,
      fullName,
      phone,
      street,
      city,
      state,
      country,
      postalCode,
      deliveryFee,
      isDefault: shouldBeDefault,
    });
    console.log("API HIT AFTER SAVING", address);
    res.status(201).json(address);
  } catch (error) {
    console.log("create Address error", error);

    res
      .status(400)
      .json({ message: "Failed to create address", error: error.message });
  }
};

// @desc    Update an address. Re-resolves deliveryFee if the state changed.
// @route   PUT /api/addresses/update/:id
// @access  Private
export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!address) return res.status(404).json({ message: "Address not found" });

    const {
      label,
      fullName,
      phone,
      street,
      city,
      state,
      country,
      postalCode,
      isDefault,
    } = req.body;

    if (label !== undefined) address.label = label;
    if (fullName !== undefined) address.fullName = fullName;
    if (phone !== undefined) address.phone = phone;
    if (street !== undefined) address.street = street;
    if (city !== undefined) address.city = city;
    if (country !== undefined) address.country = country;
    if (postalCode !== undefined) address.postalCode = postalCode;

    if (state !== undefined && state !== address.state) {
      address.state = state;
      address.deliveryFee = await resolveDeliveryFee(state);
    }

    if (isDefault) {
      await Address.updateMany(
        { user: req.user._id, _id: { $ne: address._id } },
        { $set: { isDefault: false } },
      );
      address.isDefault = true;
    }

    const updated = await address.save();
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update address", error: error.message });
  }
};

// @desc    Delete an address. If it was the default and other addresses
//          remain, promotes the most recently created one to default.
// @route   DELETE /api/addresses/delete/:id
// @access  Private
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!address) return res.status(404).json({ message: "Address not found" });

    const wasDefault = address.isDefault;
    await address.deleteOne();

    if (wasDefault) {
      const nextDefault = await Address.findOne({ user: req.user._id }).sort({
        createdAt: -1,
      });
      if (nextDefault) {
        nextDefault.isDefault = true;
        await nextDefault.save();
      }
    }

    res.status(200).json({ message: "Address deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete address", error: error.message });
  }
};
