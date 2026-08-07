/**
 * One-off seed script for default delivery fees per Nigerian state.
 * Run with: node seedDeliveryZones.js
 *
 * These are placeholder rates (higher for far-from-hub states, lower for
 * Rivers/nearby states, moderate default elsewhere) - edit freely via the
 * admin "Delivery Zones" page after seeding, or edit this file and re-run
 * before your first deploy.
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import DeliveryZone from "./models/deliveryZoneModel.js";

dotenv.config();

const DEFAULT_FEES = {
  Rivers: 1500,
  Bayelsa: 2000,
  "Akwa Ibom": 2000,
  "Cross River": 2200,
  Abia: 2000,
  Imo: 2200,
  Delta: 2200,
  Anambra: 2500,
  Enugu: 2500,
  Ebonyi: 2500,
  Lagos: 3000,
  Ogun: 2800,
  Oyo: 3000,
  Osun: 3000,
  Ondo: 2800,
  Ekiti: 3000,
  Kwara: 3200,
  Kogi: 3000,
  Edo: 2500,
  "FCT (Abuja)": 3500,
  Niger: 3500,
  Nasarawa: 3500,
  Plateau: 3800,
  Benue: 3200,
  Taraba: 4000,
  Adamawa: 4200,
  Gombe: 4200,
  Bauchi: 4200,
  Borno: 4500,
  Yobe: 4500,
  Jigawa: 4200,
  Kano: 4000,
  Katsina: 4200,
  Kaduna: 3800,
  Zamfara: 4200,
  Sokoto: 4500,
  Kebbi: 4500,
};

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  for (const [state, fee] of Object.entries(DEFAULT_FEES)) {
    await DeliveryZone.updateOne(
      { state },
      { $setOnInsert: { state, fee, isActive: true } },
      { upsert: true },
    );
  }

  console.log(`Seeded ${Object.keys(DEFAULT_FEES).length} delivery zones.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
