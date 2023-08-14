const sections = {
    work: document.querySelector(".work__active"),
    talent: document.querySelector(".talent__active"),
    transation: document.querySelector(".transation__active"),
};

const buttons = {
    work: document.getElementById("trabajos"),
    talent: document.getElementById("talentos"),
    transation: document.getElementById("transations"),
};

const heroBanner = document.querySelector(".hero__banner");

function closeAllSections() {
    for (let section in sections) {
        sections[section].style.display = 'none';
    }
    heroBanner.style.zIndex = "900";
}

function openSection(sectionName) {
    closeAllSections();
    if (sections[sectionName]) {
        sections[sectionName].style.display = 'block';
        heroBanner.style.zIndex = "0";
    }
}

for (let button in buttons) {
    buttons[button].addEventListener("click", () => openSection(button));
}

document.querySelectorAll(".cancel__button").forEach(btn => {
    btn.addEventListener("click", closeAllSections);
});

document.getElementById("start").addEventListener("click", closeAllSections);

// Payment section
const buttonPay = document.querySelector(".message__active");
document.getElementById("active__pay").addEventListener("click", () => {
    buttonPay.style.display = "flex";
});
document.querySelector(".exit__pay").addEventListener("click", () => {
    buttonPay.style.display = "none";
});

// Register section
const ventanita = document.querySelector(".ventanita");
document.getElementById("register").addEventListener("click", () => {
    ventanita.style.display = "flex";
});
document.querySelector(".exit__register").addEventListener("click", () => {
    ventanita.style.display = "none";
});

// Job section
const jobWindow = document.querySelector(".job__window");
document.getElementById("getJob").addEventListener("click", () => {
    jobWindow.style.zIndex = "2";
});
document.querySelector(".exitClose").addEventListener("click", () => {
    jobWindow.style.zIndex = "-1";
});