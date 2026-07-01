// --- Developer Mode ---
function showActivationStar() {
    const star = document.getElementById("activationStar");
    if (!star) return;

    star.classList.remove("show");
    
    setTimeout(() => {
        star.classList.add("show");
        setTimeout(() => {
            star.classList.remove("show");
            activateDeveloperSection();
        }, 800);
    }, 50);
}

function activateDeveloperSection() {
    const devSection = document.getElementById("developerSettingsCategory");
    if (devSection) {
        devSection.style.display = "block";
        localStorage.setItem("developerSectionActivated", "true");
        
        if (typeof unlockAchievement === "function") {
            unlockAchievement("developer_mode");
        }
        
        setInterval(updateDeveloperTime, 1000);
        updateDeveloperTime();
    }
}

function updateDeveloperTime() {
    const now = new Date();
    const timeEl = document.getElementById("currentTime");
    const dateEl = document.getElementById("currentDate");
    if (timeEl) timeEl.textContent = now.toLocaleTimeString();
    if (dateEl) dateEl.textContent = now.toLocaleDateString();
}

// --- Достижения ---
const achievements = [
    { id: "first_visit", title: "Добро пожаловать!", description: "Посетить сайт", icon: "fa-door-open" },
    { id: "settings_opened", title: "Любопытство", description: "Открыть настройки", icon: "fa-cog" },
    { id: "theme_changed", title: "Светлая сторона", description: "Включить светлую тему", icon: "fa-sun" },
    { id: "wallpaper_changed", title: "Ремонт", description: "Сменить обои", icon: "fa-image" },
    { id: "color_changed", title: "Художник", description: "Сменить цвет", icon: "fa-palette" },
    { id: "terminal_visited", title: "Хакер", description: "Зайти в терминал", icon: "fa-terminal" },
    { id: "developer_mode", title: "Режим бога", description: "Активировать настройки разработчика", icon: "fa-code" },
    { id: "all_modals", title: "Исследователь", description: "Открыть все окна", icon: "fa-map" }
];

function checkAchievements() {
    if (!localStorage.getItem("first_visit")) {
        unlockAchievement("first_visit");
        localStorage.setItem("first_visit", "true");
    }
    renderAchievements();
}

function unlockAchievement(id) {
    const unlocked = JSON.parse(localStorage.getItem("achievements_unlocked") || "[]");
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem("achievements_unlocked", JSON.stringify(unlocked));
        const ach = achievements.find((a) => a.id === id);
        if (ach) showNotification(ach);
    }
}

function renderAchievements() {
    const container = document.getElementById("achievementsContainer");
    if (!container) return;
    container.innerHTML = "";
    
    const unlocked = JSON.parse(localStorage.getItem("achievements_unlocked") || "[]");
    
    achievements.forEach((ach) => {
        const isUnlocked = unlocked.includes(ach.id);
        const el = document.createElement("div");
        el.className = `achievement-card ${isUnlocked ? "unlocked" : "locked"}`;
        el.innerHTML = `
            <div class="ach-icon"><i class="fas ${ach.icon}"></i></div>
            <div class="ach-info">
                <div class="ach-title">${ach.title}</div>
                <div class="ach-desc">${ach.description}</div>
            </div>
        `;
        container.appendChild(el);
    });
}

function checkAllModalsAchievement() {
    const allModals = ["profileModal", "skillsModal", "projectsModal", "settingsModal"];
    let allOpened = true;
    allModals.forEach((id) => {
        if (!localStorage.getItem(`modal_${id}_opened`)) {
            allOpened = false;
        }
    });
    if (allOpened) unlockAchievement("all_modals");
}

function showNotification(ach) {
    const notif = document.createElement("div");
    notif.className = "achievement-notification";
    notif.innerHTML = `
        <i class="fas ${ach.icon}"></i>
        <div>
            <b>Достижение!</b><br>${ach.title}
        </div>
    `;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.classList.add("show");
    }, 100);

    setTimeout(() => {
        notif.classList.remove("show");
        setTimeout(() => {
            notif.remove();
        }, 500);
    }, 3000);
}

// --- Конфиг разработчика (dont65.conf) ---
function generateConfigText() {
    const color = localStorage.getItem("primaryColor") || "42, 171, 238";
    
    let snowState = localStorage.getItem("snowEnabled");
    if (snowState === null) {
        const now = new Date();
        const m = now.getMonth();
        const d = now.getDate();
        const isWinter = m === 11 || m === 0 || m === 1 || (m === 2 && d === 1);
        snowState = isWinter ? "true" : "false";
    }

    let confettiState = localStorage.getItem("confettiEnabled");
    if (confettiState === null) {
        const holiday = (typeof getCurrentHoliday === 'function') ? getCurrentHoliday() : "default";
        const isHoliday = holiday !== "default" && holiday !== "halloween";
        confettiState = isHoliday ? "true" : "false";
    }

    const bg = localStorage.getItem("wallpaper") || "background.jpg";
    const theme = localStorage.getItem("theme") || "dark";
    const glitch = localStorage.getItem("glitchEnabled") || "false";
    const icons = localStorage.getItem("iconPack") || "auto";
    const eraser = localStorage.getItem("cursorEraserMode") || "none";
    const blind = localStorage.getItem("brailleEnabled") || "false";

    return `// Цвета\ncolor = ${color}\n\n// Снег\nsnow = ${snowState}\n\n// Конфетти\nconfetti = ${confettiState}\n\n// Обои\nbackground = ${bg}\n\n// Тема\ntheme = ${theme}\n\n// Glich mod\nglich = ${glitch}\n\n// Иконки\nicons = ${icons}\n\n// Курсор-ластик\neraser = ${eraser}\n\n// Версия для слабовидящих\nblind = ${blind}`;
}

let hyprlandErrorTimeout;

function showHyprlandError(message) {
    const bar = document.getElementById("hyprlandErrorBar");
    const text = document.getElementById("hyprlandErrorText");
    if (bar && text) {
        text.textContent = message;
        bar.classList.add("show");

        clearTimeout(hyprlandErrorTimeout);
        hyprlandErrorTimeout = setTimeout(() => {
            bar.classList.remove("show");
        }, 5000);
    }
}

function initConfigEditor() {
    const openBtn = document.getElementById("openConfigBtn");
    const closeBtn = document.getElementById("closeConfigBtn");
    const resetBtn = document.getElementById("resetConfigBtn");
    const applyBtn = document.getElementById("applyConfigBtn");
    const editorContainer = document.getElementById("configEditorContainer");
    const textarea = document.getElementById("configTextarea");

    if (!openBtn || !editorContainer) return;

    openBtn.addEventListener("click", () => {
        if (editorContainer.classList.contains("open")) {
            editorContainer.classList.remove("open");
        } else {
            textarea.value = generateConfigText();
            editorContainer.classList.add("open");
            
            setTimeout(() => {
                const modalContent = document.querySelector("#settingsModal .modal-content");
                if (modalContent) {
                    modalContent.scrollTo({
                        top: modalContent.scrollHeight,
                        behavior: "smooth"
                    });
                }
            }, 50);
        }
    });

    closeBtn.addEventListener("click", () => {
        editorContainer.classList.remove("open");
    });

    resetBtn.addEventListener("click", () => {
        textarea.value = generateConfigText();
    });

    applyBtn.addEventListener("click", () => {
        const text = textarea.value;
        const lines = text.split("\n");
        let errors = [];
        let parsedConfig = {};

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (!line || line.startsWith("//")) continue;

            const parts = line.split("=");
            if (parts.length < 2) {
                errors.push(`Config error in line ${i + 1}: invalid syntax. Use key = value`);
                continue;
            }

            const key = parts[0].trim().toLowerCase();
            const value = parts.slice(1).join("=").trim();

            switch (key) {
                case "color":
                    if (!/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/.test(value)) {
                        errors.push(`Config error in line ${i + 1}: Invalid color format. Use R, G, B`);
                    } else {
                        const [r, g, b] = value.split(",").map((v) => parseInt(v.trim()));
                        if (r > 255 || g > 255 || b > 255) {
                            errors.push(`Config error in line ${i + 1}: RGB values must be between 0 and 255`);
                        } else {
                            parsedConfig.color = `${r}, ${g}, ${b}`;
                        }
                    }
                    break;
                case "snow":
                case "confetti":
                case "blind":
                case "glich":
                case "glitch":
                    if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
                        if (key === "glich") parsedConfig["glitch"] = value.toLowerCase();
                        else parsedConfig[key] = value.toLowerCase();
                    } else {
                        errors.push(`Config error in line ${i + 1}: '${key}' must be 'true' or 'false'`);
                    }
                    break;
                case "background":
                    parsedConfig.background = value;
                    break;
                case "theme":
                    if (["dark", "light"].includes(value.toLowerCase())) {
                        parsedConfig.theme = value.toLowerCase();
                    } else {
                        errors.push(`Config error in line ${i + 1}: 'theme' must be 'dark' or 'light'`);
                    }
                    break;
                case "icons":
                    if (["auto", "default", "halloween", "newyear", "birthday", "valentines", "defenders", "womens", "space", "victory"].includes(value.toLowerCase())) {
                        parsedConfig.icons = value.toLowerCase();
                    } else {
                        errors.push(`Config error in line ${i + 1}: unknown icon pack '${value}'`);
                    }
                    break;
                case "eraser":
                    if (["none", "warm", "antiholiday", "cleanup"].includes(value.toLowerCase())) {
                        parsedConfig.eraser = value.toLowerCase();
                    } else {
                        errors.push(`Config error in line ${i + 1}: 'eraser' must be 'none', 'warm', 'antiholiday' or 'cleanup'`);
                    }
                    break;
                default:
                    errors.push(`Config error in line ${i + 1}: Unknown variable '${key}'`);
            }
        }

        if (errors.length > 0) {
            showHyprlandError(errors[0]);
            return;
        }

        let requiresReload = false;

        if (parsedConfig.color) {
            localStorage.setItem("primaryColor", parsedConfig.color);
            if (window.updatePrimaryColor) window.updatePrimaryColor(parsedConfig.color);
            if (window.updateColorUI) window.updateColorUI(parsedConfig.color);
        }

        if (parsedConfig.theme) {
            localStorage.setItem("theme", parsedConfig.theme);
            if (parsedConfig.theme === "light") {
                document.body.classList.add("light-theme");
                if (document.getElementById("themeToggle")) document.getElementById("themeToggle").checked = true;
            } else {
                document.body.classList.remove("light-theme");
                if (document.getElementById("themeToggle")) document.getElementById("themeToggle").checked = false;
            }
            if (window.updatePrimaryColor) window.updatePrimaryColor(localStorage.getItem("primaryColor") || "42, 171, 238");
        }

        if (parsedConfig.background) {
            localStorage.setItem("wallpaper", parsedConfig.background);
            document.body.style.backgroundImage = `url('/assets/background/${parsedConfig.background}')`;
            document.querySelectorAll(".wallpaper-option").forEach((el) => {
                el.classList.remove("selected");
                if (el.dataset.file === parsedConfig.background) {
                    el.classList.add("selected");
                }
            });
        }

        if (parsedConfig.icons) {
            localStorage.setItem("iconPack", parsedConfig.icons);
            if (document.getElementById("iconPackSelect")) document.getElementById("iconPackSelect").value = parsedConfig.icons;
            if (typeof applyIcons === 'function') applyIcons(parsedConfig.icons);
        }

        if (parsedConfig.eraser) {
            localStorage.setItem("cursorEraserMode", parsedConfig.eraser);
            requiresReload = true;
        }

        const toggles = [
            { key: "snow", storage: "snowEnabled" },
            { key: "confetti", storage: "confettiEnabled" },
            { key: "glitch", storage: "glitchEnabled" },
            { key: "blind", storage: "brailleEnabled" }
        ];

        toggles.forEach((t) => {
            if (parsedConfig[t.key] && localStorage.getItem(t.storage) !== parsedConfig[t.key]) {
                localStorage.setItem(t.storage, parsedConfig[t.key]);
                requiresReload = true;
            }
        });

        if (requiresReload) {
            location.reload();
        } else {
            editorContainer.classList.remove("open");
        }
    });
}

// Привязка событий из других компонентов
document.addEventListener("themeChanged", () => unlockAchievement("theme_changed"));
document.addEventListener("colorChanged", () => unlockAchievement("color_changed"));
document.addEventListener("wallpaperChanged", () => unlockAchievement("wallpaper_changed"));
document.addEventListener("terminalVisited", () => unlockAchievement("terminal_visited"));
document.addEventListener("developerModeTriggered", showActivationStar);

document.addEventListener("modalOpened", (e) => {
    const modalId = e.detail;
    localStorage.setItem(`modal_${modalId}_opened`, "true");
    checkAllModalsAchievement();

    if (modalId === "settingsModal") unlockAchievement("settings_opened");
    if (modalId === "achievementsModal") renderAchievements();
});

document.addEventListener("menuLoaded", () => {
    checkAchievements();
    initConfigEditor();

    if (localStorage.getItem("developerSectionActivated") === "true") {
        activateDeveloperSection();
    }
});