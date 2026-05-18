const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");


// SIGNUP
router.post("/signup", async (req, res) => {

    try {

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const user = await User.create({
            email: req.body.email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User Registered",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {

            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;