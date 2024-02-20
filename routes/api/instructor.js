const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Instructor = require("../../model/Instructor"); //importing admin model for line 24
//const Instructor = require('../../model/Instructor');

// @route   POST api/instructor
// @desc    Register an Instructor
// @access  Public
router.post(
  "/",
  [
    check("userName", "Username is required").not().isEmpty(), //route validation
    check("ID", "SLIIT instrcutor ID is required").not().isEmpty(),
    check("email", "SLIIT instructor email is required")
      .not()
      .isEmpty()
      .isEmail(),
    check("department", "SLIIT department is required").not().isEmpty(),
    check("password", "A password should have minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, ID, email, department, password, initialLogin } =
      req.body;

    try {
      //see if the instructor exists
      let instructor = await Instructor.findOne({ email });
      if (instructor) {
        res
          .status(400)
          .json({ errors: [{ msg: "Instructor already exists" }] });
      }

      //initilize the instructor variable(takes val from req,res body)
      instructor = new Instructor({
        userName,
        ID,
        email,
        department,
        password,
        initialLogin,
      });

      //get users gravatar

      //encrypt password

      const salt = await bcrypt.genSalt(10); //hasing intilzied

      instructor.password = await bcrypt.hash(password, salt); //hasing assgined, next is saving to database

      await instructor.save(); //saving

      //Return jsonwebtoken
      const payload = {
        instrctor: {
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

router.get("/", async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const value = { ID: req.params.id };
    await Instructor.deleteOne(value);
    res.json({ msg: "Instructor Removed" });
  } catch (err) {
    console.error(err.message);
    res.json({ msg: "Error Removing Instructor" });
    res.status(500).send("Server Error");
  }
});

//Update instructor
router.put(
  "/:id",
  [
    check("userName", "Username is required").not().isEmpty(), //route validation
    check("ID", "SLIIT instrcutor ID is required").not().isEmpty(),
    check("email", "SLIIT instructor email is required")
      .not()
      .isEmpty()
      .isEmail(),
    check("department", "SLIIT department is required").not().isEmpty(),
    check("password", "A password should have minimum 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, ID, email, department, password, initialLogin } =
      req.body;

    try {
      const instructors = await Instructor.find();
      const instructorUserName = instructors.find(
        (o) => o.userName === userName
      );
      const instructorEmail = instructors.find((o) => o.email === email);
      let instructor = instructors.find((o) => o.ID === req.params.id);

      if (
        instructorUserName &&
        instructor &&
        instructorUserName != instructor
      ) {
        return res.status(400).json({
          errors: [
            {
              msg: "The Username is already used by " + instructorUserName.ID,
            },
          ],
        });
      } else if (
        instructorEmail &&
        instructor &&
        instructorEmail != instructor
      ) {
        return res.status(400).json({
          errors: [
            {
              msg: "The email in already used by " + instructorEmail.ID,
            },
          ],
        });
      }

      if (instructor) {
        const updatedInstructor = {
          userName,
          ID,
          email,
          department,
          password,
          initialLogin,
        };

        const salt = await bcrypt.genSalt(10); //hasing intilzied

        updatedInstructor.password = await bcrypt.hash(password, salt);

        instructor = await Instructor.findOneAndUpdate(
          { ID: req.params.id },
          { $set: updatedInstructor },
          { new: true }
        );
      } else
        return res
          .status(400)
          .json({ errors: [{ msg: "Instructor does not exist" }] });
      console.log(instructor);
      res.json(instructor);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Instructor does not exist" });
      }
      res.status(500).send("Server error");
    }
  }
);



router.get('/:id', async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({ msg: 'instructor not found' });
    }

    res.json(instructor);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'String') {
      return res.status(404).json({ msg: 'instructor not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
