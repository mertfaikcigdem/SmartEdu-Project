const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.route("/").get(roleMiddleware(["TEACHER", "ADMIN"]), courseController.getAllCourses);
router.route("/").post(courseController.createCourse);
router.route("/:slug").get(courseController.getCourse);

module.exports = router;