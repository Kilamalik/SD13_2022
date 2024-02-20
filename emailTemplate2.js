const tempelate2 = (notice)=>
{
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
        <div style="display : block ;  width: 80%; color : black ; border : 1px solid black ; ">
            <h1 style="margin: 50px;">Notice reminder : Please find the details of the notice below</h1><br>
            <div style="width : 100%; display : block; margin : 50px ">
                <span><bold>Notice no</bold> :${notice.noticeNo} </span><br><br>
                <span><bold>Heading</bold> :${notice.heading} </span><br><br>
                <span><bold>Author</bold> : ${notice.author}</span><br><br>
                <span><bold>Start</bold> : ${notice.start} </span><br><br>
                <span><bold>End</bold> : ${notice.end}</span>

            </div>

            <p style="margin: 50px; letter-spacing : 2px ;">
            ${notice.content}
            </p>
            <br>
        </div>
    </body>
    </html>
    `
}

module.exports = tempelate2