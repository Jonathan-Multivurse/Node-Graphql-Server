const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhoneAuthCodeSchema = new Schema(
  {
    name: { type: String, required: false, trim: true },
    phoneNumber: { type: String, required: false, trim: true },
    countryCode: { type: String, required: false, trim: true },
    code: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("phoneauthcode", PhoneAuthCodeSchema);
