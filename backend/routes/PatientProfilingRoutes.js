const express = require('express');
const router = express.Router();
const PatientProfiling = require('../models/ProfilingSchema'); 

router.post("/savepatient/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const {
            petOwner,
            petName,
            species,
            breed,
            age,
            sex,
            condition,
            medications,
            temperament,
            vitalSigns,
            healthTracking
        } = request.body;
        
        if (!id) {
            return response.status(400).json({
                errors: { id: "User ID is required." }
            });
        }
        if (!petOwner) {
            return response.status(400).json({
                errors: { petOwner: "Pet Owner's name is required." }
            });
        }
        if (!petName) {
            return response.status(400).json({
                errors: { petName: "Pet Name is required." }
            });
        }
        if (!species) {
            return response.status(400).json({
                errors: { species: "Please select the pet species." }
            });
        }
        if (!breed) {
            return response.status(400).json({
                errors: { breed: "Please specify your pet's breed"}
            });
        }
        if (!age) {
            return response.status(400).json({
                errors: { age: "Pet Age is required." }
            });
        }
        if (!sex) {
            return response.status(400).json({
                errors: { sex: "Pet Gender is required." }
            });
        }

        const newProfile = new PatientProfiling({
            vet_id: id,
            petOwner: petOwner,
            petName: petName,
            species: species,
            breed: breed,
            age: age,
            sex: sex,
            condition: condition,
            medications: medications,
            temperament: temperament,
            vitalSigns: vitalSigns,
            healthTracking: healthTracking,
            date_registered: new Date()
        });

        await newProfile.save();

        return response.status(200).json({ message: "Successfully saved." });
    } catch (error) {
        console.error("Error saving patient:", error);
        return response.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.get("/patients/:id", async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({ errors: { no_user: "No user found." }});
        }

        const patients = await PatientProfiling.find({
            vet_id: id
        });

        if (patients.length > 0) {
            return response.status(200).json({
                message: "fetch success",
                patients
            });
        } else {
            return response.status(400).json({
                errors: { no_patients: "No patients found for this user."}
            });
        }
    } catch (error) {
        return response.status(500).json({ message: "Server error", error});
    }
});

module.exports = router;
