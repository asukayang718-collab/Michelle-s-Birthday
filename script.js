const PERSONAL_MESSAGE = `Makasihh yaa sudah hadir dan membuat banyak hal terasa lebih indah.
Semoga di usia baru ini, semua hal baik selalu menemukan jalan ke kamu.
Tetap jadi Michelle yang aku kenal. Happyyyy birthdayyyyy! ♡`;

document.getElementById("personalMessage").textContent = PERSONAL_MESSAGE;

const intro = document.getElementById("intro");
const page = document.getElementById("birthdayPage");
const giftButton = document.getElementById("openGift");
const music = document.getElementById("Music");
const musicToggle = document.getElementById("musicToggle");
const musicText = musicToggle.querySelector(".music-text");

giftButton.addEventListener("click", () => {
    intro.classList.add("hidden");
    page.classList.add("visible");
    page.setAttribute("aria-hidden", "false");
    window.setTimeout(() => {
        document.getElementById("message").scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 900);
    }, 650);
});

musicToggle.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicToggle.classList.add("playing");
            musicText.textContent = "music on";
            musicToggle.setAttribute("aria-label", "Matikan musik");
        } catch (error) {
            musicText.textContent = "add music";
        }
    } else {
        music.pause();
        musicToggle.classList.remove("playing");
        musicText.textContent = "music off";
        musicToggle.setAttribute("aria-label", "Putar musik");
    }
});

const finalObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    },
    { threshold: 0.35 }
);

finalObserver.observe(
    document.querySelector(".final-content")
  );

// THEME TRANSITION MENUJU FINAL SCENE
const birthdayPage = document.querySelector(".birthday-page");
const finalScene = document.querySelector(".final-scene");

function hexToRgb(hex) {
    const value = hex.replace("#", "");

    return [
        parseInt(value.slice(0, 2), 16),
        parseInt(value.slice(2, 4), 16),
        parseInt(value.slice(4, 6), 16)
    ];
}

function mixColor(start, end, progress) {
    const a = hexToRgb(start);
    const b = hexToRgb(end);

    const result = a.map((v, i) =>
        Math.round(v + (b[i] - v) * progress)
    );

    return "#" + result.map(v =>
        v.toString(16).padStart(2, "0")
    ).join("");
}

function updateTheme() {
    const finalTop =
        finalScene.getBoundingClientRect().top + window.scrollY;

    // Mulai berubah saat mendekati bagian terakhir
    const start = finalTop - window.innerHeight;
    const end = finalTop - window.innerHeight * 0.1;

    let progress =
        (window.scrollY - start) / (end - start);

    progress = Math.max(0, Math.min(progress, 1));

    const colors = {
        "--page-bg": ["#f7f2f8", "#100b16"],
        "--page-text": ["#2a2030", "#f4eafa"],
        "--muted-text": ["#766a7b", "#b5a2bd"],
        "--strip-bg": ["#eae0ee", "#241a2b"],
        "--message-bg": ["#f1eaf2", "#19111f"],
        "--letter-bg": ["#fffdfd", "#30243a"],
        "--letter-text": ["#655b68", "#e1d4e8"]
    };

    Object.entries(colors).forEach(([property, values]) => {
        birthdayPage.style.setProperty(
            property,
            mixColor(values[0], values[1], progress)
        );
    });
}

window.addEventListener("scroll", updateTheme, { passive: true });
window.addEventListener("resize", updateTheme);

updateTheme();