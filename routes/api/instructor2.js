const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Timetable = require('../../model/TimeTable');
const { check, validationResult } = require('express-validator');

//This page is to recongnize the empno else it identifies as get by id

router.get('/:empNo', async (req, res) => {
    try {
    
        const name = await Timetable.find({ empNo:req.params.empNo });
  
        if(!name) {
            return res.status(404).json({ msg: 'Employee not Allocated' });
        }
  
        res.json(name);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'String') {
            return res.status(404).json({ msg: 'employee not found' });
        }
        res.status(500).send('Server error');
    }
  });


module.exports = router;