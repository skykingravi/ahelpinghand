// About page
let myTxt = document.querySelector(".abt-txt .my-txt");
let cursor = document.getElementById("cursor");
let txt = "One stop destination to all your Trivial yet Important Needs.";
let indx = 0;
function type() {
    if (indx < txt.length) {
        myTxt.textContent += txt.charAt(indx);
        indx++;
        cursor.style.animation = "none";
        setTimeout(type, 200);
    }
    else {
        cursor.style.animation = "blink 1s linear 0s infinite forwards";
        setTimeout(erase, 5000);
    }
}
function erase() {
    if (myTxt.textContent.length != 0) {
        myTxt.textContent = myTxt.textContent.substring(0, indx - 1);
        indx--;
        setTimeout(erase, 50);
        cursor.style.animation = "none";
    }
    else {
        cursor.style.animation = "blink 1s linear 0s infinite forwards";
        setTimeout(type, 1000);
    }
}
document.addEventListener("DOMContentLoaded", type());

let rootElement = document.querySelector(":root");
rootElement.style.setProperty("--pcolor", "#ECECEC");
rootElement.style.setProperty("--scolor", "#121212");
let toggleBtn = document.querySelector(".theme-toggle");
let menu = document.querySelector(".menu");
let menuBar = document.querySelector(".menu-bar");

document.querySelector(".app-container").style.background = "rgba(0, 0, 0, .2)";
toggleBtn.addEventListener("click", () => {
    let rs = getComputedStyle(rootElement);
    if (rs.getPropertyValue("--pcolor") == "#ECECEC") {
        toggleBtn.classList.toggle("dark");
        rootElement.style.setProperty("--pcolor", "#121212");
        rootElement.style.setProperty("--scolor", "#ECECEC");
        document.querySelector(".logo-img").src = "images/main-logo-dark.svg";
        document.querySelector(".app-container").style.background = "rgba(255, 255, 255, .2)";
    }
    else {
        toggleBtn.classList.toggle("dark");
        rootElement.style.setProperty("--pcolor", "#ECECEC");
        rootElement.style.setProperty("--scolor", "#121212");
        document.querySelector(".logo-img").src = "images/main-logo-light.svg";
        document.querySelector(".app-container").style.background = "rgba(0, 0, 0, .2)";
    }
});
menu.style.top = '5px';
menu.addEventListener("click", () => {
    if (menu.classList.contains("open")) {
        menu.classList.replace("open", "close");
        menuBar.classList.toggle("show");
        document.body.style.overflow = "hidden";
    }
    else {
        menu.classList.replace("close", "open");
        menuBar.classList.toggle("show");
        document.body.style.overflow = "hidden scroll";
    }
});
let remove = () => {
    document.querySelector('.menu-bar').classList.toggle('show');
    menu.classList.replace("close", "open");
    document.body.style.overflow = "hidden scroll";
};

// Clock page
let showClkTime = setInterval(() => {
    let date_now = new Date();

    let hr = date_now.getHours();
    let min = date_now.getMinutes();
    let sec = date_now.getSeconds();

    let timeData = date_now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

    document.querySelector(".time-data").innerHTML = `${timeData.substring(0, 5)}<span class="time-scs">${timeData.substring(6, 8)}</span><span class="time-abt">${timeData.substring(9, 11)}</span>`;

    let calc_hr = (hr * 30) + (min / 2);
    let calc_min = (min * 6) + (sec / 10);
    let calc_sec = sec * 6;

    document.querySelector(".hour-hand").style.transform = `rotate(${calc_hr}deg)`;
    document.querySelector(".minute-hand").style.transform = `rotate(${calc_min}deg)`;
    document.querySelector(".second-hand").style.transform = `rotate(${calc_sec}deg)`;

}, 1000);

// Stopwatch page
let swhr, swmn, swsc;
let afCall;
let h = m = s = 0;

let startSW = () => {
    s++;
    if (s == 60) {
        s = 0;
        m++;
    }
    if (m == 60) {
        m = 0;
        h++;
    }
    swhr = (h < 10) ? `0${h}` : h;
    swmn = (m < 10) ? `0${m}` : m;
    swsc = (s < 10) ? `0${s}` : s;
    document.querySelector(".hour-val").textContent = swhr;
    document.querySelector(".minute-val").textContent = swmn;
    document.querySelector(".second-val").textContent = swsc;
    afCall = setTimeout(startSW, 1000);
};

let stopSW = () => {
    clearTimeout(afCall);
    document.querySelector(".hour-val").textContent = swhr;
    document.querySelector(".minute-val").textContent = swmn;
    document.querySelector(".second-val").textContent = swsc;
};

let resetSW = () => {
    h = m = s = 0;
    swhr = (h < 10) ? `0${h}` : h;
    swmn = (m < 10) ? `0${m}` : m;
    swsc = (s < 10) ? `0${s}` : s;
    document.querySelector(".hour-val").textContent = swhr;
    document.querySelector(".minute-val").textContent = swmn;
    document.querySelector(".second-val").textContent = swsc;
};

// Calculator page
let keyArr = document.querySelectorAll(".key");
let audio = document.getElementById("keypress");
keyArr.forEach((e) => {
    e.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
    });
});

// Colorcode generator page
let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
let hexHead = document.getElementById("clr-code-heading");
let bgHex = document.getElementById("pg-4");
let hexCode;
function genclr() {
    hexCode = genhex();
    bgHex.style.background = hexCode;
    hexHead.textContent = hexCode;
    bgHex.style.color = lightOrDark(hexCode);
}
function genhex() {
    return `#${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}`;
}
genclr();

bgHex.addEventListener("click", () => {
    genclr();
});
hexHead.addEventListener("click", () => {
    navigator.clipboard.writeText(hexCode);
});

function lightOrDark(color) {
    var r, g, b, hsp;
    if (color.match(/^rgb/)) {
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));
        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
    if (hsp > 127.5) {

        return 'black';
    }
    else {

        return 'white';
    }
}

// Weather app page
const apiKey = "fbd986d49bd4ab7f776efb9673bb10e6";

let citytxt = document.querySelector(".city-name");
let apimssg = document.querySelector(".api-er-mssg");
let brmssg = document.querySelector(".br-er-mssg");
let citydetails = document.querySelector(".city-details");
let citytime = document.querySelector(".city-time");
let wimg = document.querySelector(".w-img");
let tempwrap = document.querySelector(".temp");
let tempval = document.querySelector(".temp-val");
let tempunit = document.querySelector(".temp-unit");
let tempabt = document.querySelector(".temp-abt");
let detailsbtn = document.querySelector(".details-btn");
let details = document.querySelector(".details-blog");
let detailscls = document.querySelector(".details-blog i");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(p => showlatlongWeather(p.coords.latitude, p.coords.longitude), e => brmssg.textContent = e.message);
}

citytxt.addEventListener("keypress", (k) => {
    if (k.key == "Enter" && citytxt.value != "") {
        showCityWeather(citytxt.value);
    }
});

tempwrap.addEventListener("click", () => {
    if (tempunit.textContent == "C" && tempval.textContent != "-") {
        let temp = (tempval.textContent * (9 / 5)) + 32;
        tempval.textContent = Math.round(temp);
        tempunit.textContent = "F";
    }
    else if (tempunit.textContent == "F" && tempval.textContent != "-") {
        let temp = (tempval.textContent - 32) * (5 / 9);
        tempval.textContent = Math.round(temp);
        tempunit.textContent = "C";
    }
});

detailsbtn.addEventListener("click", () => {
    details.classList.toggle("open");
    document.body.style.overflow = "hidden";
});

detailscls.addEventListener("click", () => {
    details.classList.toggle("open");
    document.body.style.overflow = "initial";
});

function showlatlongWeather(lat, long) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    fetch(api).then(res => res.json()).then(data => showDetails(data)).catch(() => apimssg.innerText = "Something went wrong");
};

function showCityWeather(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(api).then(res => res.json()).then(data => showDetails(data)).catch(() => apimssg.innerText = "Something went wrong");
};

function showDetails(d) {
    if (d.cod != 404) {
        let daysofWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let dt = new Date(d.dt * 1000);
        citydetails.textContent = `${d.name}, ${d.sys.country}`;
        citytime.textContent = `${daysofWeek[dt.getDay()]}, ${monthsOfYear[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
        tempval.textContent = Math.round(d.main.temp);
        tempunit.textContent = "C";
        tempabt.textContent = d.weather[0].main;
        apimssg.innerText = "";
        if (d.cod == 800) {
            wimg.src = "icons/clear.svg";
        } else if (d.cod >= 200 && d.cod <= 232) {
            wimg.src = "icons/storm.svg";
        } else if (d.cod >= 600 && d.cod <= 622) {
            wimg.src = "icons/snow.svg";
        } else if (d.cod >= 701 && d.cod <= 781) {
            wimg.src = "icons/haze.svg";
        } else if (d.cod >= 801 && d.cod <= 804) {
            wimg.src = "icons/cloud.svg";
        } else if ((d.cod >= 500 && d.cod <= 531) || (d.cod >= 300 && d.cod <= 321)) {
            wimg.src = "icons/rain.svg";
        }
        details.children[1].children[0].textContent = d.main.temp_min;
        details.children[2].children[0].textContent = d.main.temp_max;
        details.children[3].children[0].textContent = d.main.humidity;
        details.children[4].children[0].textContent = d.weather[0].description;
        details.children[5].children[0].textContent = d.wind.speed;
    }
    else {
        citydetails.textContent = citytime.textContent = tempval.textContent = tempabt.textContent = "-";
        wimg.src = "";
        tempunit.textContent = "C";
        details.children[1].children[0].textContent =
            details.children[2].children[0].textContent =
            details.children[3].children[0].textContent =
            details.children[4].children[0].textContent =
            details.children[5].children[0].textContent = "-";
        apimssg.innerText = `'${citytxt.value}' isn't a valid city`;
    }
};