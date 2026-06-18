import Razorpay from "razorpay";

// ✅ Safety check to avoid silent 401 failures
const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  throw new Error(
    "Razorpay keys missing. Check your .env.local file."
  );
}
console.log("KEY:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET ? "LOADED" : "MISSING");

// ✅ Razorpay instance (server-side only)
export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});