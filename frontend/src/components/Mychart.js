import React, { useState, useEffect } from 'react';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js';
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

function MyChart({ empNo }) {
  const [hours, setHours] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(`/api/timetable/getEmployeeTimeTable/${empNo}`)
      .then((body) => {
        console.log(body.data.hours);
        setHours(body.data.hours);
        setData({
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          datasets: [
            {
              label: 'Hours per day',
              data: body.data.hours,
              min: 0,
              borderColor: 'green',
              tension: 0.5,

              pointStyle: 'circle',
              pointBorderColor: 'black',
              pointBackgroundColor: 'black',
              showLine: true,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  }, [empNo]);

  const pdfGenerate = (e) => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');

    let chart = document.getElementById(`chart-${empNo}`);
    htmlToImage
      .toPng(chart)
      .then(function (dataUrl) {
        console.log('here in pdf');
        var img = new Image();
        img.src = dataUrl;
        doc.addImage(img, 'PNG', 100, 200, 400, 200);
        doc.save('Allocated_Slots.pdf');
      })
      .catch(function (error) {
        console.error('oops, something wents wrong!', error);
      });
  };

  return (
    <>
      {data && (
        <div className='MyChart' style={{ width: '100%', height: '800px' }}>
          <h3>{empNo}'s hours per week chart</h3>
          <h4>X-axis represents Days, Y-axis represents Hours</h4>
          <div id={`chart-${empNo}`}>
            <Line
              data={data}
              options={{
                scales: {
                  yAxis: {
                    max: 10,
                    min: 0,
                  },
                },
              }}
            >
              Hello
            </Line>
          </div>
          <button className='btn btn-success' onClick={pdfGenerate}>
            <i className='fas fa-file-download'></i> PDF
          </button>
        </div>
      )}
    </>
  );
}

export default MyChart;
