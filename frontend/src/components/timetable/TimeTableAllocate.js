import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
/* import 'bootstrap/dist/css/bootstrap.min.css'; */
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/employee';
import { Link } from 'react-router-dom';
import { getSlots, deleteSlots } from '../../actions/timetable';
import TimetableItem from './TimetableItem';
import AllocatedTime from './AllocatedTime ';
import axios from 'axios';

const TimeTableAllocate = ({
  getSlots,
  deleteSlots,
  timetable: { slots },
  getEmployees,
  employee: { employees },
  auth: { admin }
}) => {
  const [value, setvalue] = useState('');
  const [batch, setBatch] = useState([]);
  const [day, setDay] = useState([]);
  const [module, setModule] = useState('');
  const [modules, setModules] = useState([]);
  const [timetable, setTimeTable] = useState([]);
  const [batches, setBatches] = useState([]);
  const [TimeTable2, setTimeTable2] = useState([]);
  useEffect(() => {
    getSlots();
    getEmployees();
  }, []);
  let i = 0
  //submit the generated slots to the db
  const SubmitData = () => {

    axios
      .post('/api/timetable/createTimeTable', { timetable: timetable })
      .then(document.location.reload())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('/api/timetable/getTimeTable')
      .then((body) => setTimeTable2(body.data))
      .catch((err) => console.log(err));
  }, []);

  const convertToTime = (item) => {
    return (
      parseInt(item) + ':' + parseInt((item % 1).toFixed(2).substring(2)) * 0.6
    );
  };
  //function to convert time to no
  //for comparing
  const convertToNo = (item) => {
    return Number(item.split(':')[0]) + Number(item.split(':')[1] / 60);
  };


  const [emphour, setemphours] = useState([]);
  

useEffect(() => {
  TimeTable2.forEach((item) => {
    let hours = 0;
    hours = item.hours
    let index = emphour.findIndex((item2) => item2.empNo === item.empNo)
    if (index === -1) {
      if (hours > 1) {
        hours = 1;
      }
      emphour.push({ empNo: item.empNo, hours: item.hours })
    }
    else {
      if (hours > 1) {
        hours = 1;
      }
      let new_hours = emphour[index].hours + hours
      emphour[index] = {
        empNo: item.empNo,
        hours: new_hours
      }
    }
  })
}, [TimeTable2, emphour])
  //main function for the logic
  const handleEvent = (item, item2) => {
    const heading = document.getElementById(item._id);
    const name = document.getElementById(item2.empNo);
    const box = document.getElementById(
      item.startTime + '-' + item2.empNo + item._id
    );
    //helping functions
    //for enabling and disabling the checkboxes
    const disable = (item3) => {
      const box2 = document.getElementById(
        item3.startTime + '-' + item2.empNo + item3._id
      );
      if (box2.disabled === true) {
        box2.disabled = true;
      } else {
        box2.disabled = true;
      }
    };
    const enable = (item3) => {
      const box2 = document.getElementById(
        item3.startTime + '-' + item2.empNo + item3._id
      );
      if (box2.disabled === true) {
        box2.disabled = false;
      } else {
        box2.disabled = true;
      }
    };
    //conditions

    //when the box is checked
    if (box.checked) {
      //saving the values of the selected box
      setTimeTable([
        ...timetable,
        {
          module: module,
          startTime: item.startTime,
          endTime: item.endTime,
          empName: item2.empName,
          empNo: item2.empNo,
          hours: convertToNo(item.endTime) - convertToNo(item.startTime),
          _id: item._id,
          dayOfTheWeek: item.dayOfTheWeek,
          sessionType: item.sessionType,
          venue: item.venue,
        },
      ]);
      if (heading.style.background === 'orange') {
        name.style.background = 'orange';
      } else {
        name.style.background = 'orange';
        heading.style.background = 'orange';
      }

      //cheching if the slots clash or not
      slots.forEach((item3) => {
        if (
          module === item3.module &&
          item.dayOfTheWeek === item3.dayOfTheWeek &&
          item3.assigned === false
        ) {
          if (
            convertToNo(item3.startTime) < convertToNo(item.startTime) &&
            convertToNo(item3.endTime) > convertToNo(item.startTime)
          ) {
            disable(item3);
          } else if (
            convertToNo(item3.startTime) > convertToNo(item.startTime) &&
            convertToNo(item3.startTime) < convertToNo(item.endTime)
          ) {
            disable(item3);
          } else if (
            convertToNo(item3.startTime) === convertToNo(item.startTime) &&
            !document.getElementById(
              item3.startTime + '-' + item2.empNo + item3._id
            ).checked
          ) {
            disable(item3);
          } else {
            i++;
            //if the slots don' clash
          }
        }
      });

      //if the required faculty members are achieved
      //blocking the other options

      if (
        timetable.filter(
          (timetable) =>
            timetable.startTime === item.startTime && timetable._id === item._id
        ).length ===
        (slots.find(
          (timeSlot) =>
            timeSlot.startTime === item.startTime && timeSlot._id === item._id
        ).staffRequirement -
        1) - TimeTable2.filter((item9) => {
          return item9.slotID === item._id
        }).length
      ) {
        heading.style.background = 'grey';
        name.style.background = 'grey';
        employees.forEach((item4) => {
          if (
            !document.getElementById(
              item.startTime + '-' + item4.empNo + item._id
            ).checked
          ) {
            document.getElementById(
              item.startTime + '-' + item4.empNo + item._id
            ).disabled = true;

          } else {
            document.getElementById(item4.empNo).style.background = 'grey';
          }
        });
      }
    }

    //if the box is unchecked
    else {
      //removing the value of the unchecked box
      const index = timetable.findIndex(
        (t) =>
          convertToNo(t.startTime) === convertToNo(item.startTime) &&
          t.empNo === item2.empNo
      );
      setTimeTable([
        ...timetable.slice(0, index),
        ...timetable.slice(index + 1, timetable.length),
      ]);

      name.style.background = 'white';
      heading.style.background = '#5CD197';

      //enabling the other options
      //when the box is unchecked
      employees.forEach((teacher) => {
        if (
          document.getElementById(
            item.startTime + '-' + teacher.empNo + item._id
          ).checked &&
          teacher.empNo !== item2.empNo
        ) {
          heading.style.background = 'orange';
          document.getElementById(teacher.empNo).style.background = 'orange';
        }
      });

      slots.forEach((item3) => {
        if (
          module === item3.module &&
          item.dayOfTheWeek === item3.dayOfTheWeek &&
          item3.assigned === false
        ) {
          if (
            convertToNo(item3.startTime) < convertToNo(item.startTime) &&
            convertToNo(item3.endTime) > convertToNo(item.startTime)
          ) {
            enable(item3);
          } else if (
            convertToNo(item3.startTime) > convertToNo(item.startTime) &&
            convertToNo(item3.startTime) < convertToNo(item.endTime)
          ) {
            enable(item3);
          } else if (
            convertToNo(item3.startTime) === convertToNo(item.startTime) &&
            !document.getElementById(
              item3.startTime + '-' + item2.empNo + item3._id
            ).checked
          ) {
            enable(item3);
          } else {
            // if the slots don't clash
          }
        }
        employees.forEach((item4) => {
          if (
            document.getElementById(
              item.startTime + '-' + item4.empNo + item._id
            ).disabled
          ) {
            document.getElementById(
              item.startTime + '-' + item4.empNo + item._id
            ).disabled = false;
          }
        });
      });
    }
  };
  const [test, settest] = useState([])
  const [sortDay, setsortDay] = useState([]);
  const [emp, setemp] = useState([null])
  const [cond, setCond] = useState(true);

  let fls = true;
  const selectBatch = (e) => {
    setsortDay([]);
    setModules([]);
    setModule('');
    setBatch(e.target.value);
    //console.log(batch);
   
    //document.getElementById("day").disabled = false;
  }
  const selectDay = (e) => {
    setModules([]);
    setModule('');
    setDay(e.target.value);
    //console.log(day);
    
    

  }
  const empSearch = (e) => {
    setemp(e.target.value)
    console.log(emp);
  }


  const handleChange = (e) => {
    setvalue(e.target.value);

  }

  const onSearch = (search) => {
    setvalue(search);
    console.log("Search", search)
    setemp(search);
    setCond(false);

  }
  
  let a = 0;

  return (
    <>

      {
        slots.forEach((item) => {
          if (test.indexOf(item.group) === -1) {
            //console.log(test);
            test.push(item.group);
          }
        })
      }

      {
        slots.forEach((item) => {
          if (item.group === batch && sortDay.indexOf(item.dayOfTheWeek) === -1) {
            //console.log(sortDay);
            sortDay.push(item.dayOfTheWeek);
          }
        })
      }

      {slots.forEach((item) => {
        if (day === 'all') {
          if (item.group === batch && modules.indexOf(item.module) === -1) {
            modules.push(item.module);
          }
        }
        else if (item.dayOfTheWeek === day) {
          if (item.group === batch && item.dayOfTheWeek === day && modules.indexOf(item.module) === -1) {
            modules.push(item.module);
          }
        }
      })}

      {modules && <div style={{ display: "flex" }}>
        <div className="custom-select" style={{ width: '930px' }}>
          <select id="batch" onChange={(e) => { selectBatch(e) }}>
            <option>Select Batch:</option>
            {test.map((item) => {
               //Barrak - add ur if-else for admin access level
                return (
                  <option value={item}>{item}</option>
                )
            })}

          </select>
        </div>
        <div className="custom-select" style={{ width: '150px' }}>
          <select id="day" onChange={(e) => { selectDay(e) }}>
            <option value ='all'>Select Day:</option>
            <option value='all'>All</option>
            {sortDay.map((item) => {
              //console.log(item.group);
              //if (item.group === batch) 
              return (
                <option value={item}>{item}</option>
              )


            })
            }

          </select>
        </div>
      </div>}


      {modules &&
        modules.map((item) => {
          
          return (
            <button
              className='btn btn-primary'
              onClick={() => {
                setModule(item);
              }}
            >
              {item}
            </button>
          );
        })}


      {

        slots.forEach(function loop(item) {
          if (item.group === batch && item.module === module) {

            if (loop.stop) { return; }
            if (item.staffRequirement > TimeTable2.filter((yakki) => {
              return yakki.slotID === item._id
            }).length) {
              fls = false;
            }
            
          }
        })

      }



      {module && !(fls)? (
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>
              <div className="search-container">

                <div className="search-inner">
                <label>Search Name:</label>
                <input type="text" value={value} onChange={handleChange} />
               
              </div>
              <div className="dropdown">
                {employees.filter(
                  item => {
                    const searchTerm = value.toLowerCase();
                    const empName = item.empName.toLowerCase();

                    return searchTerm && empName.startsWith(searchTerm) && empName !== searchTerm
                  }
                ).map((item3) => {
                  return (
                    <div className="dropdown-row" onClick={() => {
                      onSearch(item3.empName)
                    }}>
                      {item3.empName}
                    </div>)


                })
                }
              </div>
              </div>
              </th>
              <th scope='col'>Total Allocated Hours</th>
              <th scope='col'>Currently Allocated Hours</th>
              {/* {displaying the available slots on the table head} */}
              {slots.map((item) => {
                if (day === 'all') {
                  if (item.module === module && item.staffRequirement > TimeTable2.filter((yakki) => {

                    return yakki.slotID === item._id
                  }).length && item.group === batch) {
                    return (
                      <th
                        style={{ background: '#5CD197', color: 'white'}}
                        id={item._id}
                        key={item._id}
                      >
                        <tr style={{ background: '#5CD197', color: 'white'}} className='d-flex justify-content-center'>
                          {item.startTime}-{item.endTime}
                        </tr>
                        <tr  style={{ background: '#5CD197', color: 'white'}} className='d-flex justify-content-center'>
                          {item.dayOfTheWeek}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}} className='d-flex justify-content-center'>
                          {item.venue}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          {item.module}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          {item.group}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          <p>Max: </p>
                          {item.staffRequirement}
                        </tr>
                      </th>
                    );
                  }
                }
                else if (item.dayOfTheWeek === day)
                  if (item.module === module && item.staffRequirement > TimeTable2.filter((yakki) => {

                    return yakki.slotID === item._id
                  }).length && item.group === batch) {
                    return (
                      <th
                        style={{ background: '#5CD197', color: 'white' }}
                        id={item._id}
                        key={item._id}
                      >
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          {item.startTime}-{item.endTime}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          {item.dayOfTheWeek}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          {item.venue}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          {item.module}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          {item.group}
                        </tr>
                        <tr style={{ background: '#5CD197', color: 'white'}}className='d-flex justify-content-center'>
                          <p>Max: </p>
                          {item.staffRequirement}
                        </tr>
                      </th>
                    );
                  }
              })}
            </tr>
          </thead>
          <tbody>
            {employees.map((item2) => {

              if (item2.empName === emp && cond === false) {
                return (
                  <tr key={item2.empNo}>
                    <td id={item2.empNo} style={{ background: 'white' }}>
                      {item2.empName}
                    </td>
                    <td>
                      {
                        emphour.map((item3) => {
                          if (item2.empNo === item3.empNo) {
                            return (<p>
                              {item3.hours}
                            </p>)
                          }
                        })
                      }
                    </td>
                    <td>
                    {timetable.find((teacher) => teacher.empNo === item2.empNo)
                        ? timetable.find(
                          (teacher) => teacher.empNo === item2.empNo
                        ).hours
                        : '0'}
                    </td>
                    {slots.map((item) => {
                      if (day === 'all') {
                        if (item.module === module && item.staffRequirement > TimeTable2.filter((yakki) => {
                          return yakki.slotID === item._id
                        }).length && item.group === batch)
                          return (
                            <td className='flex-row justify-content-center'>
                              <input
                                className={'form' + '-check' + '-input'}
                                type='checkbox'
                                value=''
                                id={item.startTime + '-' + item2.empNo + item._id}
                                onInput={() => {
                                  handleEvent(item, item2);
                                }}
                              ></input>
                            </td>
                          );
                      }
                      else if (item.dayOfTheWeek === day)
                        if (item.module === module && item.staffRequirement > TimeTable2.filter((yakki) => {
                          return yakki.slotID === item._id
                        }).length && item.group === batch)
                          return (
                            <td className='flex-row justify-content-center'>
                              <input
                                className={'form' + '-check' + '-input'}
                                type='checkbox'
                                value=''
                                id={item.startTime + '-' + item2.empNo + item._id}
                                onInput={() => {
                                  handleEvent(item, item2);
                                }}
                              ></input>
                            </td>
                          );
                    })}
                  </tr>
                );
              }
              else if (cond === true) {
                return (
                  <tr key={item2.empNo}>
                    <td id={item2.empNo} style={{ background: 'white' }}>
                      {item2.empName}
                    </td>
                    <td>
                      {
                        emphour.map((item3) => {
                          if (item2.empNo === item3.empNo) {
                            return (<p>
                              {item3.hours}
                            </p>)
                          }
                        })
                      }
                    </td>
                    <td>
                    {timetable.find((teacher) => teacher.empNo === item2.empNo)
                        ? timetable.find(
                          (teacher) => teacher.empNo === item2.empNo
                        ).hours
                        : '0'}
                    </td>
                    {slots.map((item) => {
                      if (day == 'all') {
                        if (item.module === module && item.staffRequirement > TimeTable2.filter((yakki) => {
                          return yakki.slotID === item._id
                        }).length && item.group === batch)
                          return (
                            <td className='flex-row justify-content-center'>
                              <input
                                className={'form' + '-check' + '-input'}
                                type='checkbox'
                                value=''
                                id={item.startTime + '-' + item2.empNo + item._id}
                                onInput={() => {
                                  handleEvent(item, item2);
                                }}
                              ></input>
                            </td>
                          );

                      } else if (item.dayOfTheWeek === day)
                        if (item.module === module && item.staffRequirement > TimeTable2.filter((yakki) => {
                          return yakki.slotID === item._id
                        }).length && item.group === batch && item.dayOfTheWeek === day)
                          return (
                            <td className='flex-row justify-content-center'>
                              <input
                                className={'form' + '-check' + '-input'}
                                type='checkbox'
                                value=''
                                id={item.startTime + '-' + item2.empNo + item._id}
                                onInput={() => {
                                  handleEvent(item, item2);
                                }}
                              ></input>
                            </td>
                          );
                    })}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      ) : module &&

      <div className="slots-allocated">
        <p><strong>All Slots are Allocated!!</strong></p>
      </div>
      }
      {module && (<button
        className='btn btn-success'
        onClick={() => {
          SubmitData();
        }}
      >
        Generate
      </button>
      )}
      <Link to='/allocatedSlot'>
        {module && (<button className='btn btn-success'>Allocated Slots</button>)}
      </Link>

      <h2 className='d-flex justify-content-center m-1'>Selected Slots</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Instructor Name</th>
            <th>Hours</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {timetable
            ? timetable.map((item) => {
              return (
                <tr key={item.emp}>
                  <td>{item.startTime}</td>
                  <td>{item.endTime}</td>
                  <td>{item.empName}</td>
                  <td>{item.hours}</td>
                  <td>{item.module}</td>
                </tr>
              );
            })
            : 'hello'}
        </tbody>
      </table>
      <AllocatedTime></AllocatedTime>
    </>
  );
};

TimeTableAllocate.propTypes = {
  getSlots: PropTypes.func.isRequired,
  deleteSlots: PropTypes.func.isRequired,
  timetable: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  Confirm: PropTypes.any,
};

const mapStateToProps = (state) => ({
  timetable: state.timetable,
  auth: state.auth,
  employee: state.employee,
});

export default connect(mapStateToProps, {
  getSlots,
  deleteSlots,
  getEmployees,
})(TimeTableAllocate);
