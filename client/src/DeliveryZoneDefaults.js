/**
 * Mirrors DEFAULT_FEES in seedDeliveryZones.js so the frontend can:
 *   1. Render the full list of Nigerian states (Object.keys)
 *   2. Suggest a starting fee when an admin creates/edits a zone,
 *      based on the same placeholder rates used to seed the DB.
 *
 * Keep this in sync with the backend script if you tweak the defaults there.
 */
export const DEFAULT_FEES = {
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

export const NIGERIAN_STATES = Object.keys(DEFAULT_FEES);
