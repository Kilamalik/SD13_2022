const express = require('express');
const router = express.Router();
//The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Employee = require('../../model/Employee');
/* const e = require('express'); */

// @route   POST api/employee
// @desc    Add employee
// @access  private
//router.post(1,2,3,4);
router.post(
  '/',
  auth,
  [
    check('empName', 'Must provide an employee name').not().isEmpty(),
    check('empNo', 'Must provide a valid SLIIT employee number')
      .not()
      .isEmpty()
      .toLowerCase(),
    check('sliitEmail', 'Must provide a valid SLIIT employee email')
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
    check(
      'phone',
      'Must provide a valid phone number. Valid examples: 0771234567, 0763453565, 071-3453455, +94764310985'
    )
      .not()
      .isEmpty()
      .isMobilePhone(),
    check('department', 'Must be assigned a department').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
      req.body;

    try {
      //see if the employee exists
      let employeeNo = await Employee.findOne({ empNo });
      let employeeEmail = await Employee.findOne({ sliitEmail });
      let employeePhone = await Employee.findOne({ phone });
      if (employeeNo) {
        res.status(400).json({ errors: [{ msg: 'Employee already exists' }] });
      }
      if (employeeEmail) {
        res.status(400).json({ errors: [{ msg: 'Employee email is used' }] });
      }
      if (employeePhone) {
        res
          .status(400)
          .json({ errors: [{ msg: 'Employee phone number is used' }] });
      }

      let employee = new Employee({
        vacancyStatus,
        empName,
        sliitEmail,
        phone,
        department,
        empNo,
      });

      await employee.save();

      res.json(employee);
      /* console.log(employee); */
    } catch (error) {
      /* console.error(error.message); */
      res.status(500).send('Server error');
      /* return; */
    }
  }
);

// @route   GET api/employee
// @desc    Get all employees
// @access  private
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    /* console.error(err.message); */
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/employee/:id
// @desc    Delete employee by ID
// @access  private
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee Not Found' });
    }
    await employee.remove();
    res.json({ msg: 'Employee Removed' });
  } catch (err) {
    /* console.error(err.message); */
    res.status(500).send('Server Error');
  }
});

// @route   GET api/employee/:id
// @desc    Get employee by ID
// @access  private
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee Not Found' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'String') {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/employee/:id
// @desc    Update employee by ID
// @access  private
router.put(
  '/:id',
  [
    check('empName', 'Must provide an employee name').not().isEmpty(),
    check('sliitEmail', 'Must provide a valid SLIIT employee email')
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),
    check(
      'phone',
      'Must provide a valid phone number. Valid examples: 0771234567, 0763453565, 071-3453455, +94764310985'
    )
      .not()
      .isEmpty()
      .isMobilePhone(),
    check('department', 'Must be assigned a department').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { empName, sliitEmail, phone, department } = req.body;

    try {
      const employees = await Employee.find();
      const employeePhone = employees.find((o) => o.phone === phone);
      const employeeEmail = employees.find((o) => o.sliitEmail === sliitEmail);
      let employee = employees.find((o) => o.id === req.params.id);

      /* These "if" validations are in place to allow primary keys to be changed while at the same time ensuring
      it is not changed to an existing primary key value. 
      For the loop body to be executed an object connected to the primary key value and the object being updated should exist but the former should not be the same object as the one being updated. 
      So if we were to leave the primary key value as it was retrieved, the program knows the object connected to the primary key value is the same as the one being updated and hence does not execute the loop body. */
      if (employeePhone && employee && employeePhone != employee) {
        return res.status(400).json({
          errors: [
            {
              msg: 'The phone number is already used by ' + employeePhone.empNo,
            },
          ],
        });
      } else if (employeeEmail && employee && employeeEmail != employee) {
        return res.status(400).json({
          errors: [
            {
              msg: 'The sliit email is already used by ' + employeeEmail.empNo,
            },
          ],
        });
      }

      if (employee) {
        const updatedEmployee = {
          empName,
          sliitEmail,
          phone,
          department,
        };
        employee = await Employee.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedEmployee },
          { new: true }
        );
        // If `new` isn't true, `findOneAndUpdate()` will return the document as it was _before_ it was updated.
      } else
        return res
          .status(400)
          .json({ errors: [{ msg: 'Employee does not exist' }] });

      res.json(employee);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Employee does not exist' });
      }
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/employee/employees v1 [Has try catch in and outside the map]
// @desc    Add employees
// @access  private
router.post('/employees', auth, async (req, res) => {
  const sheet = req.body;
  const skippedEntries = [];
  try {
    //forEach version
    for (employee in sheet) {
      const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
        sheet[employee];

      let employeeNo = await Employee.findOne({ empNo });
      let employeeEmail = await Employee.findOne({ sliitEmail });
      let employeePhone = await Employee.findOne({ phone });
      if (employeeNo) {
        /* skippedEntries.push('This employee no ' + empNo + ' already exists'); */
        continue;
      }
      if (employeeEmail) {
        /* skippedEntries.push(
          'This employee email ' + sliitEmail + ' already exists'
        ); */
        continue;
      }
      if (employeePhone) {
        /* skippedEntries.push('This phone number ' + phone + ' already exists'); */
        continue;
      }

      employee = new Employee({
        empNo: empNo,
        empName: empName,
        sliitEmail: sliitEmail,
        phone: phone,
        department: department,
        vacancyStatus: vacancyStatus,
      });

      await employee.save();
    }
    //forEach version ends

    //map version
    /* const filteredSheet = await sheet.filter(async (employee) => {
      const { empNo, sliitEmail, phone } = employee;

      try {
        console.log(1);
        let employeeNo = await Employee.findOne({ empNo });
        console.log(12);
        let employeeEmail = await Employee.findOne({ sliitEmail });
        let employeePhone = await Employee.findOne({ phone });

        if (employeeNo) {
          skippedEntries.push('This employee no ' + empNo + ' already exists');
          return false;
        }
        if (employeeEmail) {
          skippedEntries.push(
            'This employee email ' + sliitEmail + ' already exists'
          );
          return false;
        }
        if (employeePhone) {
          skippedEntries.push('This phone number ' + phone + ' already exists');
          return false;
        }
      } catch (error) {
        console.error(error.message);
      }
    });
    await filteredSheet.map(async (employee) => {
      const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
        employee;

      try {
        employee = new Employee({
          empNo: empNo,
          empName: empName,
          sliitEmail: sliitEmail,
          phone: phone,
          department: department,
          vacancyStatus: vacancyStatus,
        });

        console.log(2);

        await employee.save();
      } catch (error) {
        console.log(22);
        console.error(error.message);
      }
    }); */

    /* await sheet.map(async (employee) => {
      const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
        employee;

      try {
        let employeeNo = await Employee.findOne({ empNo });
        let employeeEmail = await Employee.findOne({ sliitEmail });
        let employeePhone = await Employee.findOne({ phone });
        if (employeeNo) {
          skippedEntries.push('This employee no ' + empNo + ' already exists');
        }
        if (employeeEmail) {
          skippedEntries.push(
            'This employee email ' + sliitEmail + ' already exists'
          );
        }
        if (employeePhone) {
          skippedEntries.push('This phone number ' + phone + ' already exists');
        }

        employee = new Employee({
          empNo: empNo,
          empName: empName,
          sliitEmail: sliitEmail,
          phone: phone,
          department: department,
          vacancyStatus: vacancyStatus,
        });
        await employee.save();
      } catch (error) {
        console.error(error.message);
      }
    }); */
    //map version ends

    async function end() {
      await console.log(skippedEntries);
      await res.json(skippedEntries);
    }
    await end();
  } catch (error) {
    console.error(error.message);
  }
});

// @route   POST api/employee/employees v2 [Has try catch only within map]
// @desc    Add employees
// @access  private
/* router.post('/employees', auth, async (req, res) => {
  const sheet = req.body;
  sheet.map(async (employee) => {
    const { empNo, empName, sliitEmail, phone, department, vacancyStatus } =
      employee;
    try {
      let employeeNo = await Employee.findOne({ empNo });
      let employeeEmail = await Employee.findOne({ sliitEmail });
      let employeePhone = await Employee.findOne({ phone });
      if (employeeNo) {
        res.status(400).json({ errors: [{ msg: 'Employee already exists' }] });
      }
      if (employeeEmail) {
        res.status(400).json({ errors: [{ msg: 'Employee email is used' }] });
      }
      if (employeePhone) {
        res
          .status(400)
          .json({ errors: [{ msg: 'Employee phone number is used' }] });
      }

      employee = new Employee({
        empNo: empNo,
        empName: empName,
        sliitEmail: sliitEmail,
        phone: phone,
        department: department,
        vacancyStatus: vacancyStatus,
      });

      await employee.save();
    } catch (error) {
      console.error(error.message);
    }
  });
}); */

module.exports = router;
