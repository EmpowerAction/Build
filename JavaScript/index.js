const sections = {
    work: document.querySelector(".work__active"),
    talent: document.querySelector(".talent__active"),
    transation: document.querySelector(".transation__active")
};

const buttons = {
    work: document.getElementById("trabajos"),
    talent: document.getElementById("talentos"),
    transation: document.getElementById("transations")
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