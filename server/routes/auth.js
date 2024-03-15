const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign-up route
router.post('/signup', async (req, res) => {
    console.log("auth"); 
    const { email, username, password } = req.body;

    try {
        // Check if the email or username is already taken
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Email or username already exists." });
        }

        // Create a new user and save to the database
        const newUser = new User({ email, username, password });
        await newUser.save();

        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Error signing up. Please try again later." });
    }
});

// Assuming we're continuing from the previous file

// Sign-in route
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username and password
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(404).json({ message: "Invalid username or password." });
        }

        // Return success message upon successful sign-in
        res.json({ message: "Sign-in successful." });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Error signing in. Please try again later." });
    }
});

module.exports = router;
