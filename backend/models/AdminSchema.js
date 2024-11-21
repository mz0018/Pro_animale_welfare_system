const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  admin_name: { type: String, required: true },
  admin_user: { type: String, required: true, unique: true },
  admin_pwd: { type: String, required: true },
  contact_number: { type: String, required: true },
  admin_info: {
    profile_picture: { type: Buffer },
    clinic_address: { type: String },
    about_me: { type: String },
  },
  clinic_schedule: {
    opening_time: { type: String },
    closing_time: { type: String },
  },
  request_status: { type: String, default: 'pending' },
  date_created: { type: Date, default: Date.now }
});

const AdminModel = mongoose.model("admin_tbl", AdminSchema);

module.exports = AdminModel;
