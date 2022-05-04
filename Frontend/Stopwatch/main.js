window.onload = function () {
  var seconds = 00;
  var tens = 00;
  var mins = 00;
  var appendTens = document.getElementById("tens");
  var appendSeconds = document.getElementById("seconds");
  var appendMinutes = document.getElementById("mins");
  var buttonStart = document.getElementById("button-start");
  var buttonStop = document.getElementById("button-stop");
  var buttonReset = document.getElementById("button-reset");
  var Interval;

  buttonStart.onclick = function () {
    // The clearInterval() method clears a timer set with the setInterval() method
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
  };

  buttonStop.onclick = function () {
    clearInterval(Interval);
  };

  buttonReset.onclick = function () {
    clearInterval(Interval);
    mins = "00";
    tens = "00";
    seconds = "00";
    appendMinutes.innerHTML = mins;
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
  };

  function startTimer() {
    // the milliseconds
    tens++;
    
    // to continuously display the mseconds
    if (tens > 9) {
      appendTens.innerHTML = tens;
    }
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    // to avoid having another extra 0 digit
    if (seconds > 9) {
      appendSeconds.innerHTML = seconds;
    }
    if (seconds >= 60) {
        console.log("minutes");
        mins++;
        appendMinutes.innerHTML = "0" + mins;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
      }
    // to avoid having another extra 0 digit
    if (mins > 9) {
      appendSeconds.innerHTML = seconds;
    }
  }
};
