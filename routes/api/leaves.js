const express = require('express');
const router = express.Router();

const config = require('config');
const { check, validationResult } = require('express-validator');

const Leave = require('../../model/Leave');

// @route   POST api/leave
// @desc    Register a module
// @access  Public

router.post(
    '/',[

    check('empNo', 'Employee number is required').not().isEmpty(), //route validation
    check('empName', 'Enter Valid name').not().isEmpty(),
    check('CordinatorEmail', 'Coordinator email is required').not().isEmpty().normalizeEmail(),
    check('date', 'Date of leave').not().isEmpty(),
    check('Message', ' Message is required').not().isEmpty(),


    
    ],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { empNo , empName, CordinatorEmail, date,starttimeoff,Endtimeoff,  Message, NumberofDays,status } = req.body;
    
    try{//Set status to pending which will be changed by coordinator if approved
   

    let leave = new Leave ({
        empNo , 
        empName, 
        CordinatorEmail, 
        date, 
        starttimeoff,
        Endtimeoff,
        Message, 
        NumberofDays,
        status

    });

    await leave.save();
    res.send('Leave Request has been Sent');
} catch (err) {
  console.error(err.message);
  
}

    
});



// @route   GET api/leaves
//@desc get all leave details
// @access  Public

router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/leave
//@desc delete leave details
// @access  Public

router.delete('/:id', async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ msg: 'Leave Not Found' });
    }

    await leave.remove();
    res.json({ msg: 'Leave Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route   PUT api/leaves/:id
// @desc    Update leave by ID
// @access  private
router.put(
  '/:id',
  [
    check('status', 'status is required').not().isEmpty(), //route validation
    
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {status} = req.body;
    //let modules = req.body.type;

    try {
      let leave = await Leave.findById(req.params.id);

      if (leave) {
        //type = type.split(',').map(type => type.trim());
        const updateleave = {status};
       
        //Update
        leave = await Leave.findOneAndUpdate(
          { _id: req.params.id },
          { $set:{status: req.body.status} },
          { new: true }
        );
      } else
        return res
          .status(400)
          .json({ errors: [{ msg: 'Status cannot be updated' }] });

      res.json(module);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'status cannot be updated' });
      }
      res.status(500).send('Server error');
    }
  }
);



router.post('/:id', async (req, res) => {
  try {
    console.log(req.body);
    const test3 = await Leave.findByIdAndUpdate(req.params.id, {
      $set: { status: req.body.status },
    });
    const test4 = await Leave.findById(req.params.id);
    console.log(test4)
    res.status(200).send('status update');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})


router.get('/:id', async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ msg: 'leave not found' });
    }

    res.json(leave);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'String') {
      return res.status(404).json({ msg: 'Leave not found' });
    }
    res.status(500).send('Server error');
  }
});


router.get('/empName', async (req, res) => {
  try {
  
      const leave = await Leave.findOne({ empName:req.params.empName });

      if(!leave) {
          return res.status(404).json({ msg: 'leave not found' });
      }

      res.json(leave);
  } catch (err) {
      console.error(err.message);
      if(err.kind === 'String') {
          return res.status(404).json({ msg: 'leave not found' });
      }
      res.status(500).send('Server error');
  }
});

module.exports = router;