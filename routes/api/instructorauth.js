const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Instructor = require("../../model/Instructor"); //importing admin model for line 24
//const Instructor = require('../../model/Instructor');

// @route   GET api/auth instructor
// @desc    Instructor token authentication route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const instrctor = await Instructor.findById(req.instrctor.id).select(
      "-password"
    );
    res.json(instrctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth instructor
// @desc    authenticate admin & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "SLIIT instructor email is required").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //ID taken out

    try {
      //see if the instructor exists
      let instrctor = await Instructor.findOne({
        email: { $regex: new RegExp("^" + req.body.email + "$", "i") },
      }); // the regex code is to make the search non case sensitive
      if (!instrctor) {
        return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
      }

      const isMatch = await bcrypt.compare(password, instrctor.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });
      }

      //Return jsonwebtoken
      const payload = {
        instrctor: {
          id: instrctor.id,
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

module.exports = router;
