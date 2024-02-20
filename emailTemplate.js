const template = (item) => {
    return `
        
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>


<body>
    <h2 style="text-align: center; margin: 50px;">You have been assigned the following slot</h2>
    <div style="margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);">
        <table style = "width: 100%; border : 1px solid black ">
            <thead style="width: 100%;  ">
                <tr>
                    <th scope="col" style="margin: 10px 70px 70px;
        box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2); border: 1px solid black ;">#</th>
                    <th scope="col" style="margin: 10px 70px 70px;
        box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2); border: 1px solid black ;">Module</th>
                    <th scope="col" style="margin: 10px 70px 70px;
        box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2); border: 1px solid black ;">Start Time</th>
                    <th scope="col" style="margin: 10px 70px 70px;
        box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2); border: 1px solid black ;">End Time</th>
                    <th scope="col" style="margin: 10px 70px 70px;
        box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2); border: 1px solid black ;">Day</th>
                    <th style="margin: 10px 70px 70px;
                    box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2); border: 1px solid black ;">Duration</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td style="border: 1px solid gray;">${item.module}</td>
                    <td style="border: 1px solid gray;">${item.startTime}</td>
                    <td style="border: 1px solid gray;">${item.endTime}</td>
                    <td style="border: 1px solid gray;">${item.dayOfTheWeek}</td>
                    <td style="border: 1px solid gray;">${item.hours}</td>
                </tr>

            <tbody>
        </table>
    </div>
</body>

</html>
    `
}

module.exports = template