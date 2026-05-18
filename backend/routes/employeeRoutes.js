const authMiddleware =
require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const Employee = require("../models/Employee");


// ADD EMPLOYEE
router.post("/", async (req, res) => {

    try {

        const employee = await Employee.create(req.body);

        res.status(201).json(employee);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// GET ALL EMPLOYEES
router.get("/", async (req, res) => {

    try {

        const employees = await Employee.find();

        res.json(employees);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// SEARCH BY DEPARTMENT
router.get("/search", async (req, res) => {

    try {

        const department = req.query.department;

        const employees = await Employee.find({
            department
        });

        res.json(employees);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE EMPLOYEE
router.delete("/:id", async (req, res) => {

    try {

        await Employee.findByIdAndDelete(req.params.id);

        res.json({
            message: "Employee Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

router.put("/:id", async (req, res) => {

    try {

        const updatedEmployee =
            await Employee.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }
            );

        res.json(updatedEmployee);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;