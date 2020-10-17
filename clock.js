const clockContainer = document.querySelector(".js_clock_container"),
  clockTitle = clockContainer.querySelector(".js_clock"),
  clockAmPm = clockContainer.querySelector(".js_ampm");

// hour hand
let hourHand = document.querySelector(".hour");
// minute hand
let minuteHand = document.querySelector(".minute");
// second hand
let secondHand = document.querySelector(".second");

function plus_zero(num) {
  return num > 9 ? num : "0" + num;
}

function hourSet(num) {
  return num > 12 ? num-12 : num;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();  
  const seconds = date.getSeconds();
  clockAmPm.innerText = `${hours > 12 ? `PM`: `AM`}`;
  clockTitle.innerText = `${plus_zero(hourSet(hours))}:${plus_zero(minutes)}:${plus_zero(seconds)}`;
  
  const secondsFraction = seconds / 60;
  const minutesFraction = (secondsFraction + minutes) / 60;
  const hoursFraction = (minutesFraction + hours) / 12;
  
  const secondsRotate = secondsFraction * 360;
  const minutesRotate = minutesFraction * 360;
  const hoursRotate = hoursFraction * 360;

  secondHand.style.transform = `rotate(${secondsRotate}deg)`;
  minuteHand.style.transform = `rotate(${minutesRotate}deg)`;
  hourHand.style.transform = `rotate(${hoursRotate}deg)`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
