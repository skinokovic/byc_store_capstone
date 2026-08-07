import DeliveryZone from "../models/deliveryZoneModel.js";

// @desc    Get all delivery zones/fees
// @route   GET /api/delivery-zones
// @access  Public (needed at checkout/address-entry time to show the fee
//          before an address is saved)
export const getDeliveryZones = async (req, res) => {
  try {
    const zones = await DeliveryZone.find().sort({ state: 1 });
    res.status(200).json(zones);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch delivery zones",
        error: error.message,
      });
  }
};

// @desc    Create a delivery zone
// @route   POST /api/delivery-zones/create
// @access  Private/Admin
export const createDeliveryZone = async (req, res) => {
  try {
    const { state, fee, isActive } = req.body;

    const exists = await DeliveryZone.findOne({ state });
    if (exists) {
      return res
        .status(400)
        .json({ message: "A delivery zone for this state already exists" });
    }

    const zone = await DeliveryZone.create({ state, fee, isActive });
    res.status(201).json(zone);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Failed to create delivery zone",
        error: error.message,
      });
  }
};

// @desc    Update a delivery zone
// @route   PUT /api/delivery-zones/update/:id
// @access  Private/Admin
export const updateDeliveryZone = async (req, res) => {
  try {
    const zone = await DeliveryZone.findById(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });

    const { state, fee, isActive } = req.body;
    if (state !== undefined) zone.state = state;
    if (fee !== undefined) zone.fee = fee;
    if (isActive !== undefined) zone.isActive = isActive;

    const updated = await zone.save();
    res.status(200).json(updated);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Failed to update delivery zone",
        error: error.message,
      });
  }
};

// @desc    Delete a delivery zone
// @route   DELETE /api/delivery-zones/delete/:id
// @access  Private/Admin
export const deleteDeliveryZone = async (req, res) => {
  try {
    const zone = await DeliveryZone.findById(req.params.id);
    if (!zone) return res.status(404).json({ message: "Zone not found" });

    await zone.deleteOne();
    res.status(200).json({ message: "Delivery zone deleted" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to delete delivery zone",
        error: error.message,
      });
  }
};

// Internal helper (not a route handler) - used by addressController to
// auto-compute a fee from a state name. Falls back to a flat default if no
// matching/active zone exists, rather than failing address creation outright.
const FALLBACK_FEE = 3500;

export async function resolveDeliveryFee(state) {
  const zone = await DeliveryZone.findOne({ state, isActive: true });
  return zone ? zone.fee : FALLBACK_FEE;
}
