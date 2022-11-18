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
        setTimeout(type, 80);
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
        setTimeout(erase, 40);
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
        document.querySelector(".logo-img g").setAttribute("fill", "#ECECEC");
        document.querySelector(".app-container").style.background = "rgba(255, 255, 255, .2)";
    }
    else {
        toggleBtn.classList.toggle("dark");
        rootElement.style.setProperty("--pcolor", "#ECECEC");
        rootElement.style.setProperty("--scolor", "#121212");
        document.querySelector(".logo-img g").setAttribute("fill", "#121212");
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
let swaudio = document.getElementById("keypress");
document.querySelectorAll(".swbtn").forEach((e) => {
    e.addEventListener("click", () => {
        audio.currentTime = 0;
        audio.play();
    });
});
let swhr = swmn = swsc = swms = 0;
let swInterval;
document.querySelector(".start").addEventListener("click", function () {
    if (this.classList.contains("st")) {
        this.textContent = "STOP";
        this.classList.replace("st", "sp");
        swInterval = setInterval(swCntrl, 10);
    }
    else {
        this.textContent = "START";
        this.classList.replace("sp", "st");
        clearInterval(swInterval);
    }
});
document.querySelector(".reset").addEventListener("click", function () {
    clearInterval(swInterval);
    swhr = swmn = swsc = swms = 0;
    document.querySelector(".sw-hr").textContent = (swhr < 10) ? `0${swhr}` : swhr;
    document.querySelector(".sw-mn").textContent = (swmn < 10) ? `0${swmn}` : swmn;
    document.querySelector(".sw-sc").textContent = (swsc < 10) ? `0${swsc}` : swsc;
    document.querySelector(".sw-ms").textContent = (swms < 10) ? `0${swms}` : swms;
    if (document.querySelector(".start").classList.contains("sp")) {
        document.querySelector(".start").textContent = "START";
        document.querySelector(".start").classList.replace("sp", "st");
    }
});

let swCntrl = () => {
    swms++;
    if (swms == 100) {
        swms = 0;
        swsc++;
    }
    if (swsc == 60) {
        swsc = 0;
        swmn++;
    }
    if (swmn == 60) {
        swmn = 0;
        swhr++;
    }
    document.querySelector(".sw-hr").textContent = (swhr < 10) ? `0${swhr}` : swhr;
    document.querySelector(".sw-mn").textContent = (swmn < 10) ? `0${swmn}` : swmn;
    document.querySelector(".sw-sc").textContent = (swsc < 10) ? `0${swsc}` : swsc;
    document.querySelector(".sw-ms").textContent = (swms < 10) ? `0${swms}` : swms;
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
let hexObj = { '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15, };
let hexHead = document.getElementById("clr-code-heading");
let bgHex = document.querySelector(".bg-hex");
let bgHexBfr = document.querySelector(".clr-code-temp");
var hexCode;
function genclr() {
    hexCode = genhex();
    bgHex.style.background = hexCode;
    hexHead.textContent = hexCode;
    hexHead.style.color = lightOrDark(hexCode);
    bgHexBfr.style.background = lightOrDark(hexCode);
    bgHexBfr.style.opacity = '0';
}
function genhex() {
    // math functions - floor and random
    return `#${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}${hex[Math.floor(Math.random() * hex.length)]}`;
}
genclr();

bgHex.addEventListener("click", () => {
    genclr();
});
hexHead.addEventListener("click", () => {
    // copy to clipboard
    navigator.clipboard.writeText(hexCode);
    bgHexBfr.style.opacity = '.1';
});

function lightOrDark(color) {

    // hexadecimal to decimal conversion
    var r = (16 * hexObj[color[1]]) + hexObj[color[2]];
    var g = (16 * hexObj[color[3]]) + hexObj[color[4]];
    var b = (16 * hexObj[color[5]]) + hexObj[color[6]];

    // use this to differentiate between dark and light colors
    var hsp = Math.sqrt(
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
document.querySelector(".search").addEventListener("click", function () {
    if (document.querySelector(".city-name").value != "") {
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