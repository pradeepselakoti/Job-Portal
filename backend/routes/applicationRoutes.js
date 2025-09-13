const express = require("express");
const {
    applyToJob,
    getMyapplications,
    getApplicantsForJob,
    getApplicationById,
    updateStatus,

} = require("../controllers/applicationController")
const {protect} =require ("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:jobId",protect,applyToJob);
router.get("/my",protect, getMyapplications);
router.get("/job/:jobId", protect, getApplicantsForJob);
router.get("/:id",protect, getApplicationById);
router.put("/:id/status", protect, updateStatus);

module.exports = router;