const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Admin = require("../../model/Admin"); //importing admin model for line 24

// @route   POST api/admin
// @desc    Register an Admin
// @access  Public
router.post(
  "/",
  [
    check("userName", "Username is required").not().isEmpty(), //route validation
    check("ID", "SLIIT employee ID is required").not().isEmpty(),
    check("email", "SLIIT employee email is required")
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
      //see if the admin exists
      let admin = await Admin.findOne({ email });
      if (admin) {
        res.status(400).json({ errors: [{ msg: "Admin already exists" }] });
      }

      //initilize the admin variable(takes val from req,res body)
      admin = new Admin({
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

      admin.password = await bcrypt.hash(password, salt); //hasing assgined, next is saving to database

      await admin.save(); //saving admin

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

router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const value = { ID: req.params.id };
    await Admin.deleteOne(value);
    res.json({ msg: "Admin Removed" });
  } catch (err) {
    console.error(err.message);
    res.json({ msg: "Error Removing Admin" });
    res.status(500).send("Server Error");
  }
});

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
      const admins = await Admin.find();
      const adminUserName = admins.find((o) => o.userName === userName);
      const adminEmail = admins.find((o) => o.email === email);
      let admin = admins.find((o) => o.ID === req.params.id);

      if (adminUserName && admin && adminUserName != admin) {
        return res.status(400).json({
          errors: [
            {
              msg: "The Username is already used by " + adminUserName.ID,
            },
          ],
        });
      } else if (adminEmail && admin && adminEmail != admin) {
        return res.status(400).json({
          errors: [
            {
              msg: "The email in already used by " + adminEmail.ID,
            },
          ],
        });
      }

      if (admin) {
        const updatedAdmin = {
          userName,
          ID,
          email,
          department,
          password,
          initialLogin,
        };

        const salt = await bcrypt.genSalt(10); //hasing intilzied

        updatedAdmin.password = await bcrypt.hash(password, salt);

        admin = await Admin.findOneAndUpdate(
          { ID: req.params.id },
          { $set: updatedAdmin },
          { new: true }
        );
      } else
        return res
          .status(400)
          .json({ errors: [{ msg: "Instructor does not exist" }] });

      res.json(admin);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Instructor does not exist" });
      }
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
