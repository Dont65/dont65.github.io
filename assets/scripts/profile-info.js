// =====================================================================
// Информация профиля (возраст, счётчик до ДР)
// Раньше жила только в home.js (главная страница), из-за чего в модалке
// "Информация о профиле" на других страницах с меню (chat-rules и т.д.)
// возраст и счётчик до ДР не отображались.
// Теперь это отдельный общий скрипт — подключай его на любой странице,
// где подключено меню (menu.js), и данные будут появляться сами.
// =====================================================================

const birthDate = new Date("2008-01-02");
const formattedBirthDate = "02.01.2008";

function calculateAge() {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function updateAgeDisplay() {
    const ageElement = document.getElementById("age");
    if (!ageElement) return;

    const calculatedAge = calculateAge();
    ageElement.textContent = calculatedAge;
    ageElement.dataset.hoverText = formattedBirthDate;

    ageElement.addEventListener("mouseover", () => {
        ageElement.textContent = ageElement.dataset.hoverText;
    });

    ageElement.addEventListener("mouseout", () => {
        ageElement.textContent = calculatedAge;
    });
}

function updateBirthdayCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextBirthday = new Date(currentYear, 0, 2);
    if (now > nextBirthday) nextBirthday.setFullYear(currentYear + 1);
    const diff = nextBirthday - now;

    const countdownEl = document.getElementById("birthdayCountdown");
    if (!countdownEl) return;

    if (diff <= 0) {
        countdownEl.textContent = "🎉 С Днем Рождения! 🎉";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    let countdownStr = "";
    if (days > 0) countdownStr += `${days}д `;
    if (hours > 0 || days > 0) countdownStr += `${hours}ч `;
    if (minutes > 0 || hours > 0 || days > 0) countdownStr += `${minutes}м `;
    countdownStr += `${seconds}с`;

    countdownEl.textContent = countdownStr;
}

// menuLoaded диспатчится menu.js на КАЖДОЙ странице после вставки меню,
// поэтому этот блок сработает везде, где подключено меню.
document.addEventListener("menuLoaded", () => {
    updateAgeDisplay();

    if (document.getElementById("birthdayCountdown")) {
        updateBirthdayCountdown();
        setInterval(updateBirthdayCountdown, 1000);
    }
});
