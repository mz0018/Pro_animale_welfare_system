const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    vet_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    petOwner: { type: String, required: true },
    petName: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
    condition: { type: String, required: false },
    medications: { type: String, required: false },
    temperament: { type: String, required: false },
    vitalSigns: { type: String, required: false },
    healthTracking: { type: String, required: false },
    date_registered: { type: Date},

});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
