const sections = {
    work: document.querySelector(".work__active"),
    talent: document.querySelector(".talent__active"),
    transation: document.querySelector(".transation__active"),
    aboutUs: document.querySelector(".about__us")
};

const buttons = {
    work: document.getElementById("trabajos"),
    talent: document.getElementById("talentos"),
    transation: document.getElementById("transations"),
    aboutUs: document.getElementById("quienes-somos")
};

const closeBtns = document.querySelectorAll(".cancel__button");
const startBtn = document.getElementById("start");
const heroBanner = document.querySelector(".hero__banner");

function closeAllSections() {
    for (let section in sections) {
        sections[section].style.display = 'none';
        heroBanner.style.zIndex = "900";
    }
}

function openSection(sectionName) {
    closeAllSections(); // Cierra todas las secciones primero
    if (sections[sectionName]) {
        sections[sectionName].style.display = 'block';
        heroBanner.style.zIndex = "0";
    }
}

for (let button in buttons) {
    buttons[button].addEventListener("click", () => { openSection(button); });
}

closeBtns.forEach(btn => {
    btn.addEventListener("click", closeAllSections);
});

startBtn.addEventListener("click", closeAllSections);


const pay = document.getElementById("active__pay");
const buttonPay = document.querySelector(".message__active");
const exitPay = document.querySelector(".exit__pay");

pay.addEventListener("click", () => {buttonPay.style.display = "flex"});
exitPay.addEventListener("click", () => {buttonPay.style.display = "none"});


const reg = document.getElementById("register");
const ventanita = document.querySelector(".ventanita");

reg.addEventListener("click", () => {
    ventanita.style.display = "flex"
});

const getJob = document.getElementById("getJob");
const jobWindow = document.querySelector(".job__window");
const exitClose = document.querySelector(".exitClose")

getJob.addEventListener("click", () => {
    jobWindow.style.zIndex = "2";
});

exitClose.addEventListener("click", () => {
    jobWindow.style.zIndex = "-1";
});
















