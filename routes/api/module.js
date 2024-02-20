const express = require('express');
const router = express.Router();

const config = require('config');
const { check, validationResult } = require('express-validator');

const Module = require('../../model/modules'); //importing admin model for line 24

// @route   POST api/module
// @desc    Register a module
// @access  Public
router.post(
  '/',
  [
    check('moduleName', 'Enter a module name').not().isEmpty(), //route validation
   
    check('specialization', 'Select a specialization ').not().isEmpty(),
    check('year', ' Select the year of study ').not().isEmpty(),
    check('semester', 'Select a semester of study ').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { moduleName, ModuleID, specialization, year, semester } = req.body;

    try {
      //see if the module exists
      let module = await Module.findOne({ moduleName });
      if (module) {
        res.status(400).json({ errors: [{ msg: 'Module already exists' }] });
      }

      //initilize the admin variable(takes val from req,res body)
      module = new Module({
        moduleName,
        ModuleID,
        specialization,
        year,
        semester,
      });

      await module.save(); //saving module

      //Return jsonwebtoken

      res.send('Module Added Succesfully');
    } catch (err) {
      console.error(err.message);
      //res.status(500).send('Server error')
    }
  }
);

// @route   PUT api/module/:id
// @desc    Update module by ID
// @access  private
router.put(
  '/:id',
  [
    check('moduleName', 'Enter a module name').not().isEmpty(), //route validation
    check('specialization', 'Select a specialization').not().isEmpty(),
    check('year', 'Select a year of study ').not().isEmpty(),
    check('semester', 'Select a semester of study').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { moduleName, specialization, year, semester } = req.body;
    //let modules = req.body.type;

    try {
      let module = await Module.findById(req.params.id);

      if (module) {
        //type = type.split(',').map(type => type.trim());
        const updateModule = { moduleName, specialization, year, semester };

        //Update
        module = await Module.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updateModule },
          { new: true }
        );
      } else
        return res
          .status(400)
          .json({ errors: [{ msg: 'Module does not exist' }] });

      res.json(module);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Module does not exist' });
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
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/module
//@desc get all module details
// @access  Public

router.delete('/:id', async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({ msg: 'Module Not Found' });
    }

    await module.remove();
    res.json({ msg: 'module Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/module/:name
// @desc    Get module by name
// @access  private
router.get('/:id', async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({ msg: 'Module not found' });
    }

    res.json(module);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'String') {
      return res.status(404).json({ msg: 'Module not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
