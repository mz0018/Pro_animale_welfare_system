const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    selectedVetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: {type: String, required: true},
    contact_number: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    reason: {type: String, required: true},
    status: {type: String},
    date_created: {type: Date, default: Date.now},
    status_update_time: {type: Date},
});

const AppointmenModel = mongoose.model("appointment_tbl", AppointmentSchema);

module.exports = AppointmenModel;