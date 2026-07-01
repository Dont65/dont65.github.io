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

const quotes = [
    { text: "Бог дал нам крылья, но мы их отрезали", author: "Неизвестный" },
    { text: "А чтобы я больше не ныл, ты ебани меня лопатой", author: "ЖЩ" },
    { text: "Я буду пить, пока не станет плохо", author: "ЖЩ" },
    { text: "Иногда мы притворяемся глупыми, чтобы ничего не делать", author: "Dont65" },
    { text: "Преждевременная оптимизация — корень всех зол.", author: "Дональд Кнут" },
    { text: "Лучший способ предсказать будущее — это изобрети его.", author: "Алан Кей" },
    { text: "Я использую Arch (btw).", author: "Интернет-мем" },
    { text: "Если долго всматриваться в бездну, бездна начнет всматриваться в тебя", author: "Ницше" },
    { text: "Ты существуешь только в настоящем — этом едином мгновении.", author: "Марк Аврелий" },
    { text: "Быть самим собой — значит быть тем, кто ты есть.", author: "Сёрен Кьеркегор" },
    { text: "Ты становишься ответственным навсегда за того, кого приручил.", author: "Антуан де Сент-Экзюпери" },
    { text: "Мы — это то, что мы делаем снова и снова.", author: "Аристотель" },
    { text: "Кто хочет, тот найдет тысячу возможностей. Кто не хочет, тот найдет тысячу причин", author: "Сократ" },
    { text: "Пархай как бабочка, жаль как пчела.", author: "Мухаммед Али" },
    { text: "Что разум человека может постигнуть и во что он может поверить, того он способен достичь.", author: "Наполеон Хилл" },
    { text: "Стремитесь не к успеху, а к ценностям, которые он дает​.", author: "Альберт Эйнштейн" },
    { text: "Сложнее всего начать действовать, все остальное зависит только от упорства", author: "Амелия Эрхарт" },
    { text: "Надо любить жизнь больше, чем смысл жизни.", author: "Федор Достоевский" },
    { text: "Дружба - дело святое, я бы даже сказал светлое, нефильтрованное.", author: "Джейсон Стетхем" },
    { text: "Omnes peccatores sumus coram Deo vero.", author: "Dont65" },
    { text: "Если жизнь одаривает вас лимонами — не делайте лимонад. Заставьте жизнь забрать их обратно! Разозлитесь! «Мне не нужны твои проклятые лимоны! Что мне с ними делать?» Требуйте встречи с менеджером, отвечающим за жизнь! Заставьте жизнь пожалеть о том дне, когда она решила одарить Кейва Джонсона лимонами! Вы знаете, кто я? Я тот, кто сожжёт ваш дом! Я заставлю своих инженеров изобрести зажигательный лимон, чтобы спалить ваш дом дотла!", author: "Кейв Джонсон" },
    { text: "Если из меня вытряхнуть прочитанное, что останется?", author: "Владимир Маяковский" },
    { text: "Если человека все устраивает, то он полный идиот. Здорового человека в нормальной памяти не может всегда и все устраивать.", author: "Владимир Путин" },
    { text: "Кто не жалеет о распаде Советского Союза, у того нет сердца; кто хочет воссоздать его в прежнем виде, у того нет головы.", author: "Владимир Путин" },
    { text: "Такой милый, хочу домой забрать", author: "Рена Рюгу" },
    { text: "Это не свалка! Для Рены это горы сокровищ! О новая гора, ура-ура~", author: "Рена Рюгу" },
    { text: "МОЮ СЕМЬЮ УБИЛИ И ПОРАБОТИЛИ ПАРАЗИТЫ, ОНИ ПРИТВОРЯЮТСЯ МОЕЙ СЕМЬЕЙ", author: "KUNISA12" },
    { text: "Зато тепленько в животике", author: "Запахалов Дима" },
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

let quoteTimerAnimation;
let quoteStartTime;
let currentQuoteDuration;

function startQuoteTimer(durationMs) {
    if (quoteTimerAnimation) cancelAnimationFrame(quoteTimerAnimation);
    quoteStartTime = Date.now();
    currentQuoteDuration = durationMs;

    const timerBar = document.getElementById("quoteTimerBar");

    function animateTimer() {
        const now = Date.now();
        const elapsed = now - quoteStartTime;
        let progress = 1 - elapsed / currentQuoteDuration;

        if (progress <= 0) {
            progress = 0;
            if (timerBar) timerBar.style.transform = `scaleX(0)`;
            updateQuote();
            return;
        }
        if (timerBar) timerBar.style.transform = `scaleX(${progress})`;
        quoteTimerAnimation = requestAnimationFrame(animateTimer);
    }
    quoteTimerAnimation = requestAnimationFrame(animateTimer);
}

function updateQuote() {
    const quoteElement = document.getElementById("randomQuote");
    const authorElement = document.getElementById("quoteAuthor");

    if (quoteElement && authorElement) {
        const randomQuote = getRandomQuote();
        const charsCount = randomQuote.text.length;
        const calculatedTime = Math.max(charsCount * 200, 5000);

        quoteElement.style.opacity = "0";
        authorElement.style.opacity = "0";

        setTimeout(() => {
            quoteElement.textContent = randomQuote.text;
            authorElement.textContent = randomQuote.author;
            quoteElement.style.opacity = "1";
            authorElement.style.opacity = "1";
        }, 300);

        startQuoteTimer(calculatedTime);
    }
}

function updateBirthdayCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextBirthday = new Date(currentYear, 0, 2);
    if (now > nextBirthday) nextBirthday.setFullYear(currentYear + 1);
    const diff = nextBirthday - now;
    
    const countdownEl = document.getElementById("birthdayCountdown");
    if(!countdownEl) return;

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

document.addEventListener("menuLoaded", () => {
    updateAgeDisplay();
    updateQuote();
    
    if (document.getElementById("birthdayCountdown")) {
        updateBirthdayCountdown();
        setInterval(updateBirthdayCountdown, 1000);
    }

    const refreshQuoteBtn = document.getElementById("refreshQuoteBtn");
    if (refreshQuoteBtn) {
        refreshQuoteBtn.addEventListener("click", function () {
            this.classList.add("rotating");
            updateQuote();
            setTimeout(() => this.classList.remove("rotating"), 1000);
        });
    }
});