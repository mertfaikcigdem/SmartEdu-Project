const Course = require("../models/Course");

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).render("courses", {
            courses,
            page_name: "courses",
        });
    } catch {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.createCourse = async (req, res) => {
    const course = await Course.create(req?.body);
    try {
    res.status(201).json({
            status: "success",
            course,
        });
    } catch {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};