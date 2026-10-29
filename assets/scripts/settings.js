// =====================================================================
// 1. МГНОВЕННОЕ ПРИМЕНЕНИЕ НАСТРОЕК (Предотвращает мигание)
// =====================================================================
window.updatePrimaryColor = function(color) {
    let finalColor = color;
    if (document.body.classList.contains("light-theme") && color === "255, 255, 255") {
        finalColor = "0, 0, 0";
    }
    document.documentElement.style.setProperty("--primary-color", finalColor);
};

window.getWallpaperUrl = function(wallpaper) {
    if (/^https?:\/\//i.test(wallpaper)) return wallpaper;
    return `/assets/background/${wallpaper}`;
};

window.applyWallpaper = function(wallpaper) {
    document.body.style.backgroundImage = `url("${window.getWallpaperUrl(wallpaper)}")`;
};

function parseRgbColor(color) {
    const values = String(color).split(",").map((value) => Number(value.trim()));
    return values.length === 3 && values.every((value) => Number.isInteger(value) && value >= 0 && value <= 255)
        ? values
        : null;
}

function rgbToHex(color) {
    const values = parseRgbColor(color) || [42, 171, 238];
    return `#${values.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function hexToRgb(hex) {
    const normalized = hex.replace("#", "");
    return [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16));
}

function applySavedSettings() {
    // Тема
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
    }
    
    // Обои
    const savedWallpaper = localStorage.getItem("wallpaper") || "background.jpg";
    window.applyWallpaper(savedWallpaper);

    // Цвет
    const savedColor = localStorage.getItem("primaryColor") || "42, 171, 238";
    window.updatePrimaryColor(savedColor);

    // Покачивание блока
    if (localStorage.getItem("blockSway") === "off") {
        document.body.classList.add("no-sway");
    }
}

applySavedSettings();

// =====================================================================
// 2. ЛОГИКА МЕНЮ НАСТРОЕК (Запускается после загрузки меню)
// =====================================================================
document.addEventListener("menuLoaded", () => {
    initThemeSettings();
    initColorSettings();
    initWallpaperSettings();
    initWallhavenSettings();
    initSwaySettings();
    initSiteWarningSettings();
});

let themeToggleCounter = 0;
let lastThemeToggleTime = 0;

function initThemeSettings() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    themeToggle.checked = localStorage.getItem("theme") === "light";

    themeToggle.addEventListener("change", function () {
        // Проверка на активацию режима разработчика (5 быстрых кликов)
        const currentTime = Date.now();
        if (currentTime - lastThemeToggleTime > 3000) themeToggleCounter = 0;
        themeToggleCounter++;
        lastThemeToggleTime = currentTime;
        
        if (themeToggleCounter >= 5) {
            themeToggleCounter = 0;
            document.dispatchEvent(new Event("developerModeTriggered"));
        }

        if (this.checked) {
            document.body.classList.add("light-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
        }
        
        const savedColor = localStorage.getItem("primaryColor") || "42, 171, 238";
        window.updatePrimaryColor(savedColor);
        document.dispatchEvent(new Event("themeChanged"));
    });
}

window.updateColorUI = function(color) {
    const colorOptionsContainer = document.getElementById("colorOptions");
    if (!colorOptionsContainer) return;

    const standardColors = [
        "42, 171, 238", "88, 101, 242", "87, 242, 135", "254, 231, 92",
        "235, 69, 158", "237, 66, 69", "155, 89, 182", "230, 126, 34", "255, 255, 255"
    ];

    let customOption = document.getElementById("customColorOption");

    if (!standardColors.includes(color)) {
        if (!customOption) {
            customOption = document.createElement("div");
            customOption.className = "color-option custom-color";
            customOption.id = "customColorOption";
            colorOptionsContainer.appendChild(customOption);

            customOption.addEventListener("click", function () {
                const c = this.dataset.color;
                localStorage.setItem("primaryColor", c);
                window.updatePrimaryColor(c);
                window.updateColorUI(c);
                document.dispatchEvent(new Event("colorChanged"));
            });
        }
        customOption.style.backgroundColor = `rgb(${color})`;
        customOption.dataset.color = color;
    } else {
        if (customOption) customOption.remove();
    }

    document.querySelectorAll(".color-option").forEach((opt) => {
        opt.classList.remove("selected");
        if (opt.dataset.color === color) opt.classList.add("selected");
    });
};

function randomizeColor() {
    const color = [0, 0, 0].map(() => Math.floor(Math.random() * 256)).join(", ");
    localStorage.setItem("primaryColor", color);
    window.updatePrimaryColor(color);
    window.updateColorUI(color);
    document.dispatchEvent(new Event("colorChanged"));
    return color;
}

function initColorSettings() {
    const savedColor = localStorage.getItem("primaryColor") || "42, 171, 238";
    const customColorBtn = document.getElementById("customColorBtn");
    const customColorPicker = document.getElementById("customColorPicker");
    const customColorInput = document.getElementById("customColorInput");
    const rgbInputs = [
        document.getElementById("redInput"),
        document.getElementById("greenInput"),
        document.getElementById("blueInput"),
    ];
    const applyCustomColorBtn = document.getElementById("applyCustomColorBtn");

    function setPickerValues(color) {
        const values = parseRgbColor(color) || [42, 171, 238];
        rgbInputs.forEach((input, index) => {
            if (input) input.value = values[index];
        });
        if (customColorInput) customColorInput.value = rgbToHex(color);
    }

    function setCustomColor(color) {
        const values = parseRgbColor(color);
        if (!values) return;
        const normalized = values.join(", ");
        localStorage.setItem("primaryColor", normalized);
        window.updatePrimaryColor(normalized);
        window.updateColorUI(normalized);
        setPickerValues(normalized);
        document.dispatchEvent(new Event("colorChanged"));
    }

    document.querySelectorAll(".color-option:not(.custom-color)").forEach((option) => {
        option.addEventListener("click", function () {
            setCustomColor(this.dataset.color);
        });
    });

    if (customColorBtn && customColorPicker) {
        customColorBtn.addEventListener("click", () => {
            customColorPicker.hidden = !customColorPicker.hidden;
            setPickerValues(localStorage.getItem("primaryColor") || savedColor);
        });
    }

    if (customColorInput) {
        customColorInput.addEventListener("input", () => {
            const values = hexToRgb(customColorInput.value);
            rgbInputs.forEach((input, index) => {
                if (input) input.value = values[index];
            });
        });
    }

    rgbInputs.forEach((input) => {
        if (!input) return;
        input.addEventListener("input", () => {
            const values = rgbInputs.map((field) => Number(field.value));
            if (values.every((value) => Number.isInteger(value) && value >= 0 && value <= 255)) {
                if (customColorInput) customColorInput.value = rgbToHex(values.join(", "));
            }
        });
    });

    if (applyCustomColorBtn) {
        applyCustomColorBtn.addEventListener("click", () => {
            const values = rgbInputs.map((input) => Number(input && input.value));
            if (!values.every((value) => Number.isInteger(value) && value >= 0 && value <= 255)) {
                showHyprlandError("RGB values must be between 0 and 255");
                return;
            }
            setCustomColor(values.join(", "));
            customColorPicker.hidden = true;
        });
    }

    const randomColorBtn = document.getElementById("randomColorBtn");
    if (randomColorBtn) {
        randomColorBtn.addEventListener("click", () => {
            const color = randomizeColor();
            setPickerValues(color);
        });
    }

    setPickerValues(savedColor);
    window.updateColorUI(savedColor);
}

function initWallpaperSettings() {
    const grid = document.getElementById("wallpapersGrid");
    if (!grid) return;

    const wallpapers = [
        { name: "Стандартные", file: "background.jpg" },
        { name: "2 девочки", file: "2girls.jpg" },
        { name: "Горничная", file: "made.png" },
        { name: "Белый фон", file: "white.jpg" },
        { name: "Windows 11", file: "windows11.jpg" },
        { name: "Новый год", file: "newyear.jpg" },
        { name: "Девушка с пушкой", file: "girl_gun.jpg" },
        { name: "Город арт", file: "city_art.jpg" },
        { name: "Козел", file: "goat.png" },
        { name: "Милота", file: "cute.jpg" }
    ];

    const savedWallpaper = localStorage.getItem("wallpaper") || "background.jpg";
    
    wallpapers.forEach((wp) => {
        const div = document.createElement("div");
        div.className = `wallpaper-option ${savedWallpaper === wp.file ? "selected" : ""}`;
        div.dataset.file = wp.file;
        div.innerHTML = `<img src="/assets/background/${wp.file}" onerror="this.src='/assets/background/background.jpg'" class="wallpaper-preview"><span class="wallpaper-name">${wp.name}</span>`;
        
        div.addEventListener("click", () => {
            document.querySelectorAll(".wallpaper-option").forEach((el) => el.classList.remove("selected"));
            div.classList.add("selected");
            localStorage.setItem("wallpaper", wp.file);
            window.applyWallpaper(wp.file);
            document.dispatchEvent(new Event("wallpaperChanged"));
        });
        
        grid.appendChild(div);
    });
}

const WALLHAVEN_PARAMS = "categories=111&purity=100&sorting=random";

function buildWallhavenRequests() {
    const api = `https://wallhaven.cc/api/v1/search?${WALLHAVEN_PARAMS}`;
    return [
        { url: api, proxied: false },
        { url: `https://r.jina.ai/${api}`, proxied: true },
        { url: `https://api.allorigins.win/raw?url=${encodeURIComponent(api)}`, proxied: false },
        { url: `https://corsproxy.io/?url=${encodeURIComponent(api)}`, proxied: false }
    ];
}

async function fetchWallhavenData() {
    let lastError;
    for (const request of buildWallhavenRequests()) {
        try {
            const response = await fetch(request.url);
            if (!response.ok) throw new Error(`Wallhaven API: ${response.status}`);
            let data;
            if (request.proxied) {
                const text = await response.text();
                const jsonText = text.trim().startsWith("{") ? text : text.match(/(\{"data":.*\})/s)?.[1];
                if (!jsonText) throw new Error("Некорректный ответ Wallhaven API");
                data = JSON.parse(jsonText);
            } else {
                data = await response.json();
            }
            const wallpapers = Array.isArray(data?.data) ? data.data.filter((item) => item?.path) : [];
            if (wallpapers.length) return wallpapers;
            lastError = new Error("API не вернул обои");
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError || new Error("Не удалось получить обои от Wallhaven");
}

function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(url);
        image.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${url}`));
        image.src = url;
    });
}

async function loadRandomWallhavenWallpaper() {
    const button = document.getElementById("randomWallpaperBtn");
    if (!button || localStorage.getItem("developerSectionActivated") !== "true") return;

    const originalContent = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка обоев...';

    try {
        const wallpapers = await fetchWallhavenData();
        const shuffled = wallpapers.slice().sort(() => Math.random() - 0.5);
        let applied = null;
        for (const candidate of shuffled) {
            try {
                applied = await preloadImage(candidate.path);
                break;
            } catch (_) {
                continue;
            }
        }
        if (!applied) throw new Error("Ни одни обои не загрузились");

        localStorage.setItem("wallpaper", applied);
        window.applyWallpaper(applied);
        document.querySelectorAll(".wallpaper-option").forEach((option) => option.classList.remove("selected"));
        document.dispatchEvent(new Event("wallpaperChanged"));
    } catch (error) {
        console.error("Ошибка загрузки обоев Wallhaven:", error);
        if (typeof showHyprlandError === "function") {
            showHyprlandError("Не удалось загрузить случайные обои Wallhaven");
        }
    } finally {
        button.disabled = false;
        button.innerHTML = originalContent;
    }
}

function initWallhavenSettings() {
    const button = document.getElementById("randomWallpaperBtn");
    if (button) button.addEventListener("click", loadRandomWallhavenWallpaper);
}

// =====================================================================
// 3. ПОКАЧИВАНИЕ БЛОКА (Включение/выключение анимации float у .container)
// =====================================================================
function initSwaySettings() {
    const swayToggle = document.getElementById("swayToggle");
    if (!swayToggle) return;

    swayToggle.checked = localStorage.getItem("blockSway") !== "off";

    swayToggle.addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.remove("no-sway");
            localStorage.setItem("blockSway", "on");
        } else {
            document.body.classList.add("no-sway");
            localStorage.setItem("blockSway", "off");
        }
        document.dispatchEvent(new Event("swayChanged"));
    });
}

// =====================================================================
// 4. ПРЕДУПРЕЖДЕНИЕ ПРИ ЗАХОДЕ НА САЙТ (Настройка видимости)
// =====================================================================
function initSiteWarningSettings() {
    const warningToggle = document.getElementById("siteWarningToggle");
    if (!warningToggle) return;

    warningToggle.checked = localStorage.getItem("siteWarningDismissed") !== "true";

    warningToggle.addEventListener("change", function () {
        if (this.checked) {
            localStorage.removeItem("siteWarningDismissed");
        } else {
            localStorage.setItem("siteWarningDismissed", "true");
        }
    });
}