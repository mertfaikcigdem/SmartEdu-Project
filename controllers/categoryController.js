const Category = require("../models/Category");

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).render("categories", {
            courses,
            page_name: "categories",
        });
    } catch {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.createCategory = async (req, res) => {
    const category = await Category.create(req?.body);
    try {
    res.status(201).json({
            status: "success",
            category,
        });
    } catch {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.getCategory = async (req, res) => {
    const category = await Category.findOne({ slug: req.params.slug });

    try {
        res.status(200).render("category", {
            course,
            page_name: "categories"
        });
    } catch {
        res.status(400).json({
            status: "fail",
            error
        });
    }
};