const express = require("express");
const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    toggleCloseJob,
    getJobsEmployer,
} = require("../controllers/jobController");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/")