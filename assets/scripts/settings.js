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

function applySavedSettings() {
    // Тема
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
    }
    
    // Обои
    const savedWallpaper = localStorage.getItem("wallpaper") || "background.jpg";
    document.body.style.backgroundImage = `url('/assets/background/${savedWallpaper}')`;

    // Цвет
    const savedColor = localStorage.getItem("primaryColor") || "42, 171, 238";
    window.updatePrimaryColor(savedColor);
}

applySavedSettings();

// =====================================================================
// 2. ЛОГИКА МЕНЮ НАСТРОЕК (Запускается после загрузки меню)
// =====================================================================
document.addEventListener("menuLoaded", () => {
    initThemeSettings();
    initColorSettings();
    initWallpaperSettings();
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

function initColorSettings() {
    const savedColor = localStorage.getItem("primaryColor") || "42, 171, 238";
    
    document.querySelectorAll(".color-option:not(.custom-color)").forEach((option) => {
        option.addEventListener("click", function () {
            const color = this.dataset.color;
            localStorage.setItem("primaryColor", color);
            window.updatePrimaryColor(color);
            window.updateColorUI(color);
            document.dispatchEvent(new Event("colorChanged"));
        });
    });

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
            document.body.style.backgroundImage = `url('/assets/background/${wp.file}')`;
            document.dispatchEvent(new Event("wallpaperChanged"));
        });
        
        grid.appendChild(div);
    });
}