// let hours = document.getElementById('hours');
// let minutes = document.getElementById('minutes');
// let seconds = document.getElementById('seconds');
// let ampm = document.getElementById('ampm');

// setInterval is a function that makes the code below
// ran continuously like the usecase of having a clock
// instead of refreshing to get updated values
setInterval(() => {
    // jQuery version:
let hours = $('#hours')[0];
let minutes = $('#minutes')[0];
let seconds = $('#seconds')[0];
let ampm = $('#ampm')[0];
// if you don't put [0] it'll return
// a jQuery object, not DOM object

// new Date() objects
let h = new Date().getHours();
let m = new Date().getMinutes();
let s = new Date().getSeconds();
let am = h >= 12 ? "PM" : "AM";


// Conver 24 hour clock to 12 hour clock
if (h > 12){
    h = h - 12;
}
// add zero digit number (ex: 21 turns to 09);
// and if there are single digits for mins and secs it adds
h = (h < 10) ? "0" + h : h;
m = (m < 10) ? "0" + m : m;
s = (s < 10) ? "0" + s : s;

// set them into the HTML
hours.innerHTML = h;
minutes.innerHTML = m;
seconds.innerHTML = s;
ampm.innerHTML = am;
})