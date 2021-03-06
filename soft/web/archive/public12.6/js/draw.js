﻿// by Chtiwi Malek on CODICODE.COM

var mousePressed = false; 
var lastX, lastY;
var ctx;
var z = false;
// var points = new Array();

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) { 
        mousePressed = true;
        // points = [];
        var x = Math.round(e.pageX - $(this).offset().left);
        var y = Math.round(e.pageY - $(this).offset().top);
        Draw(x, y, false);
        z = true;
        sendToSocket({"z":z});
        sendToSocket({"x":x,"y":y});
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            var x = Math.round(e.pageX - $(this).offset().left);
            var y = Math.round(e.pageY - $(this).offset().top);
            Draw(x, y, true);
            //console.log(e.timeStamp);
            // points.push({"x":x,"y":y});
            sendToSocket({"x":x,"y":y});

        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        z = false;
        sendToSocket({"z":z});
        // console.log(points.length);
        // if (points.length > 0) sendToSocket(points);
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
        if (z == true){
            z = false;
            sendToSocket({"z":z});
        }
        
        // console.log(points.length);
        // if (points.length > 0) sendToSocket(points);
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "3";
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function sendToPHP(data) {
    $.post('socket.php', 
    {
        coords: data
    }, 
    function(data) 
    {
        $("#coordsResponse").html(data).fadeIn('80');

    }, 
    'text');   
}

function sendToSocket(point) {
    // $.ajax({
    //     url: '/dl',
    //     type: 'PUT',
    //     contentType: 'application/json',
    //     data: JSON.stringify({ url: url }),
    //     dataType: 'json',
    //     statusCode: {
    //         200: function() {
    //             callback(true);
    //         },
    //         400: function() {
    //             callback(false);
    //         }
    //     }
    // });
    $.ajax({
        url: '/dl',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(point),
        dataType: 'json',
        statusCode: {
        }
    });

    // points = [];
}
