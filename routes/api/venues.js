const express = require('express');
const router = express.Router();

const config = require('config');
const { check, validationResult } = require('express-validator');

//importing venues model for line 24
const Venues = require('../../model/Venues');
// @route   POST api/module
// @desc    Register a module
// @access  Public
router.post(
  '/',
  [
    check('vName', 'Venue Name I Required').not().isEmpty(), //route validation
    check('vID', 'Enter Valid Venue Code').not().isEmpty(),
    check('type', 'Type Of Venue Is Required').not().isEmpty(),
    check('size', 'Size Is Required').not().isEmpty(),
    check('floor', 'Floor Is Required').not().isEmpty(),
    check('faculty', 'Faculty Is Required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vName, vID, type, size, floor, faculty } = req.body;

    try {
      //see if the module exists
      let venue = await Venues.findOne({ vName });
      if (venue) {
        res.status(400).json({ errors: [{ msg: 'Venue Already Exists' }] });
      }

      //initilize the admin variable(takes val from req,res body)
      venue = new Venues({
        vName,
        vID,
        type,
        size,
        floor,
        faculty,
      });

      await venue.save(); //saving module

      //Return jsonwebtoken

      res.send('Venue Added Succesfully');
    } catch (err) {
      console.error(err.message);
      //res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/venue/:id
// @desc    Update module by ID
// @access  private
router.put(
  '/:id',
  [
    check('vName', 'Venue Name is required').not().isEmpty(), //route validation
    check('vID', 'Enter valid Venue code').not().isEmpty(),
    check('type', 'Type of venue is required').not().isEmpty(),
    check('size', 'Size is required').not().isEmpty(),
    check('floor', 'Floor is required').not().isEmpty(),
    check('faculty', 'Faculty is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { vName, vID, type, size, floor, faculty } = req.body;
    //let modules = req.body.type;

    try {
      let venue = await Venues.findById(req.params.id);

      if (venue) {
        //type = type.split(',').map(type => type.trim());
        const updateVenue = { vName, type, size, floor, faculty };

        //Update
        venue = await Venues.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updateVenue },
          { new: true }
        );
      } else
        return res
          .status(400)
          .json({ errors: [{ msg: 'Venue does not exist' }] });

      res.json(venue);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Venue does not exist' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/module
//@desc get all module details
// @access  Public

router.get('/', async (req, res) => {
  try {
    const venues = await Venues.find();
    res.json(venues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/venue
//@desc get all venue details
// @access  Public

router.delete('/:id', async (req, res) => {
  try {
    const venues = await Venues.findById(req.params.id);
    if (!venues) {
      return res.status(404).json({ msg: 'Venue Not Found' });
    }

    await venues.remove();
    res.json({ msg: 'venues Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route   GET api/module/:name
// @desc    Get medicine by name
// @access  private
router.get('/:VenueID', async (req, res) => {
  try {
    const venue = await Venues.findOne({
      VenueID: { $regex: new RegExp('^' + req.params.VenueID + '$', 'i') },
    });

    if (!venue) {
      return res.status(404).json({ msg: 'Venue not found' });
    }

    res.json(venue);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'String') {
      return res.status(404).json({ msg: 'Venue not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
