const express = require("express");
const {
    applyToJob,
    getMyApplications,  // Fixed: was getMyapplications
    getApplicantsForJob,
    getApplicationById,
    updateStatus,
} = require("../controllers/applicationController")
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:jobId", protect, applyToJob);
router.get("/my", protect, getMyApplications);  // Fixed: was getMyapplications
router.get("/job/:jobId", protect, getApplicantsForJob);
router.get("/:id", protect, getApplicationById);
router.put("/:id/status", protect, updateStatus);

module.exports = router;