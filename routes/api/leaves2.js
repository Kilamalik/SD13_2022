const express = require('express');
const router = express.Router();

const config = require('config');
const { check, validationResult } = require('express-validator');

const Leave = require('../../model/Leave');

router.get('/:empNo', async (req, res) => {
    try {
    
        const leave = await Leave.find({ empNo:req.params.empNo });
  
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