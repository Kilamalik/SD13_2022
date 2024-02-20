const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Admin = require("../../model/Admin");
const Instructor = require("../../model/Instructor");

// -----------------------------------------------------------------------------

// @route   GET api/auth
// @desc    Admin token authentication route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.admin.id);
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    authenticate admin & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "SLIIT employee email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    await Admin.updateMany({} , {$set : {userType :"admin" , department : "none"}})
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //ID taken out

    try {
      //see if the admin exists
      let admin = await Admin.findOne({
        email: { $regex: new RegExp("^" + req.body.email + "$", "i") },
      }); // the regex code is to make the search non case sensitive
      if (!admin) {
        return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      }

      //Return jsonwebtoken
      const payload = {
        admin: {
          id: admin.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 }, //token expires in an hour, for now we keep a higher val for testing purposes
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // can send user id as well
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/instructor", auth, async (req, res) => {
  try {
    console.log(req.instructor.id);
    const instructor = await Instructor.findById(req.instructor.id).select(
      "-password"
    );
    res.json(instructor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/instructor",
  [
    check("email", "SLIIT employee email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //ID taken out

    try {
      //see if the admin exists
      let instructor = await Instructor.findOne({
        email: { $regex: new RegExp("^" + req.body.email + "$", "i") },
      }); // the regex code is to make the search non case sensitive
      if (!instructor) {
        return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
      }

      const isMatch = await bcrypt.compare(password, instructor.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      }

      //Return jsonwebtoken
      const payload = {
        instructor: {
          id: instructor.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 }, //token expires in an hour, for now we keep a higher val for testing purposes
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // can send user id as well
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// -----------------------------------------------------------------------------

module.exports = router;
