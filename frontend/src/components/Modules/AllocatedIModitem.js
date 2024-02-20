import React, { Fragment,useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import logo from '../../img/sllit logo.png'
import autoTable from 'jspdf-autotable';


var moduleName;
const pdfGenerate =(e)=>{
  var doc=new jsPDF('landscape','px','a4','false');

  autoTable(doc, { html: '#module-table' ,didDrawPage: function (data) {

    // Header
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("       Tutors Allocated : "+ `${moduleName}`, data.settings.margin.right, 22);
    doc.addImage(logo,'PNG',data.settings.margin.right,8, 20, 20)
    
    
    // Footer
    var str = "Page " + doc.internal.getNumberOfPages();
   
    doc.setFontSize(10);

    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    var pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height
      ? pageSize.height
      : pageSize.getHeight();
    doc.text(str, data.settings.margin.left, pageHeight - 10);
  }})
 
  doc.save('Alocated_Tutors_List.pdf')
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'File Downloaded',
    showConfirmButton: false,
    timer: 1500
  })
  var doc=new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',100,200,400,200);
  autoTable(doc, { html: '#module-table' })
  doc.save('Alocated_List.pdf')
}

const AllocatedIModitem = ({timetable1}) => {

  const navigate = useNavigate();
    const [value,SetValue]=useState('');
    const [dataSource,SetdataSource]=useState(timetable1);
    const [tableFilter,SetTableFilter]=useState([]);
    //const [sortvalue,SetsortValue]=useState('');
    
    const filterData=(e)=>{
      if(e.target.value!=""){
        SetValue(e.target.value);
        const filter=dataSource.filter(o=>Object.keys(o).some(k=>String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
        SetTableFilter([...filter]);
      }else{
        SetValue(e.target.value);
        SetdataSource([...dataSource]);
      }
  
    }



    const timetables =  value.length > 0 ? tableFilter.map((item) => (
      
        <tr key={item._id}>
        
          <td>{item.day}</td>
          <td>{item.startTime}</td>
          <td>{item.endTime}</td>
          <td>{item.venue}</td>
          <td>{item.empName}</td>
          <td>{item.empNo}</td>
          <td>{item.hours}</td>
          {moduleName= item.module}
          
          
        </tr>
      )):  timetable1.map((item) => (
        
        
        <tr key={item._id}>
          
          <td>{item.day}</td>
          <td>{item.startTime}</td>
          <td>{item.endTime}</td>
          <td>{item.venue}</td>
          <td>{item.empName}</td>
          <td>{item.empNo}</td>
          <td>{item.hours}</td>
          {moduleName= item.module}
          
          
        </tr>
      ))
      return (
    
        <Fragment>
         
         
                
                 
         

      <table className='table' id='module-table'>
        <thead>
          <tr>
            <th>Day</th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Start Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
             End Time
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Venue
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Instructor
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Instructor ID
            </th>
            <th className='hide-sm' style={{ textAlign: 'left' }}>
              Hours
            </th>
           
            
            
            
            
            
          </tr>
        </thead>
        <tbody>{timetables}</tbody>
      </table>
      <button className='btn btn-success' onClick={pdfGenerate}><i className='fas fa-file-download'></i> PDF</button>
      <Link to='/ListModules'>
      <button className='btn btn-success' ><i className='fas fa-backspace'></i> Back</button>
      </Link>
    </Fragment>
  );
};

AllocatedIModitem.propTypes = {
  timetable1: PropTypes.array.isRequired,
 
 
};

export default connect(null)(AllocatedIModitem);