const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    const user = await User.create(req?.body);
    try {
    res.status(201).redirect("/login");
    } catch {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req?.body;  
        const user = await User.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    req.session.userId = user?._id;
                    res.status(200).redirect("/users/dashboard");
                }
            });
        } else {
            res.status(400).send("Kullanıcı bulunamadı!");
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error,
        });
    }
};  

exports.logoutUser = async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userId });
    res.status(200).render("dashboard", {
        page_name: "dashboard",
        user
    });
};