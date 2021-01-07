
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var change=false;

var slider = document.getElementById("slider");
var slidervalue= slider.value;
var theta_begin= (slider.value-270) * Math.PI/180.0;
var theta=theta_begin;
var theta0= (slider.value) * Math.PI/180.0;

var x1=250;
var y1=250;
var l=160;
var g=9.81;

var x= x1 + l * Math.cos(theta);
var y= y1 + l * Math.sin(theta);

var t=0;
var lastRender;

button= document.getElementById("button");


window.onload=draw;

function stop(){
    theta_begin= (slider.value-270) * Math.PI/180.0;
    slidervalue= slider.value;
    theta=theta_begin;
    change=false;
    t=0;
    x= x1 + l * Math.cos(theta);
    y= y1 + l * Math.sin(theta);

    button.innerHTML="Start";
}

function start(){
    change=true;
    t=0;
    lastRender= (new Date()).getTime();
    button.innerHTML="Stop";
}

function show_value(x)
{
    document.getElementById("slider_value").innerHTML=x;
    stop();

}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(change){
        theta0= slidervalue * Math.PI/180.0;
        theta=(theta0)*Math.cos(Math.sqrt(l/g)*t) - (270*Math.PI/180.0);
        x= x1 + l * Math.cos(theta);
        y= y1 + l * Math.sin(theta);
        t = (lastRender - (new Date()).getTime() )/1000;
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();

    ctx.closePath();

    window.requestAnimationFrame(draw);
}

function startorstop(){
    button= document.getElementById("button");
    if(change){
        stop();
    }
    else{
        start();
    }
}