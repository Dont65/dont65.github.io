// --- Праздники --- //
function getCurrentHoliday() {
    const now = new Date();
    const m = now.getMonth();
    const d = now.getDate();

    if ((m === 9 && d >= 24) || (m === 10 && d <= 7)) return "halloween";
    if ((m === 11 && d >= 25) || (m === 0 && d !== 2 && d <= 8)) return "newyear";

    if (m === 0 && d === 2) return "birthday";
    if (m === 1 && d === 14) return "valentines";
    if (m === 1 && d === 23) return "defenders";
    if (m === 2 && d === 8) return "womens";
    if (m === 3 && d === 12) return "space";
    if (m === 4 && d === 9) return "victory";

    return "default";
}

// --- Снег --- //
let snowCanvas, snowCtx;
let snowGrid = [],
    gridCols = 0,
    gridRows = 0;
const SNOW_BLOCK_SIZE = 4;

function initSnowLogic() {
    const snowToggle = document.getElementById("snowToggle");
    const now = new Date();
    const m = now.getMonth();
    const d = now.getDate();
    const isWinter = m === 11 || m === 0 || m === 1 || (m === 2 && d === 1);

    let shouldSnow = false;
    if (isWinter) {
        const winterSeasonId = "winter_" + (m === 11 ? now.getFullYear() : now.getFullYear() - 1);
        const lastSeenWinter = localStorage.getItem("lastSeenWinter");

        if (lastSeenWinter !== winterSeasonId) {
            shouldSnow = true;
            localStorage.setItem("lastSeenWinter", winterSeasonId);
            localStorage.setItem("snowEnabled", "true");
        } else {
            const manualSetting = localStorage.getItem("snowEnabled");
            shouldSnow = manualSetting !== null ? manualSetting === "true" : true;
        }
    } else {
        const manualSetting = localStorage.getItem("snowEnabled");
        shouldSnow = manualSetting !== null ? manualSetting === "true" : false;
    }

    if (snowToggle) {
        snowToggle.checked = shouldSnow;
        snowToggle.addEventListener("change", function () {
            localStorage.setItem("snowEnabled", this.checked);
            location.reload();
        });
    }

    if (shouldSnow) {
        initSnowCanvas();
        loopSnow();
    }
}

function initSnowCanvas() {
    snowCanvas = document.getElementById("snowCanvas");
    if (!snowCanvas) return;
    snowCtx = snowCanvas.getContext("2d");

    const resize = () => {
        snowCanvas.width = window.innerWidth;
        snowCanvas.height = window.innerHeight;
        gridCols = Math.ceil(snowCanvas.width / SNOW_BLOCK_SIZE);
        gridRows = Math.ceil(snowCanvas.height / SNOW_BLOCK_SIZE);
        snowGrid = new Array(gridCols * gridRows).fill(0);
    };

    window.addEventListener("resize", resize);
    resize();
}

function loopSnow() {
    const cellsPerFrame = Math.max(1, Math.ceil((gridCols * gridRows) / 400000));
    
    for (let i = 0; i < cellsPerFrame; i++) {
        const x = Math.floor(Math.random() * gridCols);
        if (x >= 0 && x < gridCols) snowGrid[x] = 1;
    }

    for (let y = gridRows - 2; y >= 0; y--) {
        for (let x = 0; x < gridCols; x++) {
            const i = y * gridCols + x;
            if (snowGrid[i] === 1) {
                const below = (y + 1) * gridCols + x;
                const left = (y + 1) * gridCols + (x - 1);
                const right = (y + 1) * gridCols + (x + 1);

                if (snowGrid[below] === 0) {
                    snowGrid[below] = 1;
                    snowGrid[i] = 0;
                } else {
                    const canLeft = x > 0 && snowGrid[left] === 0;
                    const canRight = x < gridCols - 1 && snowGrid[right] === 0;

                    if (canLeft && canRight) {
                        Math.random() > 0.5 ? (snowGrid[left] = 1) : (snowGrid[right] = 1);
                        snowGrid[i] = 0;
                    } else if (canLeft) {
                        snowGrid[left] = 1;
                        snowGrid[i] = 0;
                    } else if (canRight) {
                        snowGrid[right] = 1;
                        snowGrid[i] = 0;
                    }
                }
            }
        }
    }

    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    snowCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
    for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridCols; x++) {
            if (snowGrid[y * gridCols + x] === 1) {
                snowCtx.fillRect(
                    x * SNOW_BLOCK_SIZE,
                    y * SNOW_BLOCK_SIZE,
                    SNOW_BLOCK_SIZE,
                    SNOW_BLOCK_SIZE
                );
            }
        }
    }

    requestAnimationFrame(loopSnow);
}

// --- Конфетти --- //
const confettiColors = [
    "#fce18a",
    "#ff726d",
    "#b48def",
    "#f4306d",
    "#00ff00",
    "#00ccff",
    "#ffaa00",
];
let confettiParticles = [];
let confettiCanvas, confettiCtx;
let isConfettiActive = false;

function initConfettiLogic() {
    const confettiToggle = document.getElementById("confettiToggle");
    const holiday = getCurrentHoliday();
    const isHoliday = holiday !== "default" && holiday !== "halloween";

    if (isHoliday) {
        const now = new Date();
        let holidayYear = now.getFullYear();
        if (holiday === "newyear" && now.getMonth() <= 1) {
            holidayYear -= 1;
        }

        const holidayId = holiday + "_" + holidayYear;
        const lastSeenHoliday = localStorage.getItem("lastSeenHoliday");

        if (lastSeenHoliday !== holidayId) {
            isConfettiActive = true;
            localStorage.setItem("lastSeenHoliday", holidayId);
            localStorage.setItem("confettiEnabled", "true");
        } else {
            const manualSetting = localStorage.getItem("confettiEnabled");
            isConfettiActive = manualSetting !== null ? manualSetting === "true" : true;
        }
    } else {
        const manualSetting = localStorage.getItem("confettiEnabled");
        isConfettiActive = manualSetting !== null ? manualSetting === "true" : false;
    }

    if (confettiToggle) {
        confettiToggle.checked = isConfettiActive;
        confettiToggle.addEventListener("change", function () {
            localStorage.setItem("confettiEnabled", this.checked);
            location.reload();
        });
    }

    if (isConfettiActive) initConfettiCanvas();
}

function initConfettiCanvas() {
    confettiCanvas = document.getElementById("confettiCanvas");
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext("2d");

    const resizeConfetti = () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeConfetti);
    resizeConfetti();
    fireConfettiExplosion();
    requestAnimationFrame(loopConfetti);
}

function createConfettiParticle(x, y, isExplosion) {
    return {
        x: x || Math.random() * confettiCanvas.width,
        y: y || (isExplosion ? confettiCanvas.height : -20),
        r: Math.random() * 8 + 6,
        dx: isExplosion ? (Math.random() - 0.5) * 25 : (Math.random() - 0.5) * 2,
        dy: isExplosion ? -(Math.random() * 15 + 15) : Math.random() * 2 + 1,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0,
        tiltAngleInc: Math.random() * 0.07 + 0.05,
    };
}

function fireConfettiExplosion() {
    const centerX = window.innerWidth / 2;
    const bottomY = window.innerHeight;
    for (let i = 0; i < 250; i++) {
        confettiParticles.push(createConfettiParticle(centerX, bottomY, true));
    }
}

function loopConfetti() {
    if (!isConfettiActive) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    if (Math.random() < 0.25) {
        confettiParticles.push(createConfettiParticle(null, null, false));
    }

    for (let i = 0; i < confettiParticles.length; i++) {
        let p = confettiParticles[i];
        p.tiltAngle += p.tiltAngleInc;

        if (p.dy < 5) p.dy += 0.1;

        p.y += p.dy;
        p.x += Math.sin(p.tiltAngle) * 2 + p.dx;

        confettiCtx.beginPath();
        confettiCtx.lineWidth = p.r;
        confettiCtx.strokeStyle = p.color;
        confettiCtx.moveTo(p.x + p.tilt + p.r, p.y);
        confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        confettiCtx.stroke();

        if (p.y > confettiCanvas.height) {
            confettiParticles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(loopConfetti);
}

// --- Курсор-ластик --- //
function initCursorEraser() {
    const heater = document.getElementById("cursorHeater");
    const select = document.getElementById("cursorEraserSelect");

    let mode = localStorage.getItem("cursorEraserMode");
    if (!mode) {
        mode = localStorage.getItem("cursorHeaterEnabled") === "true" ? "warm" : "none";
    }

    function updateHeaterVisual() {
        if (!heater) return;
        if (mode === "none") {
            heater.style.display = "none";
        } else {
            heater.style.display = "block";
            if (mode === "warm")
                heater.style.background = "radial-gradient(circle, rgba(255, 100, 0, 0.4) 0%, transparent 70%)";
            else if (mode === "antiholiday")
                heater.style.background = "radial-gradient(circle, rgba(100, 100, 255, 0.4) 0%, transparent 70%)";
            else if (mode === "cleanup")
                heater.style.background = "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)";
        }
    }

    if (select) {
        select.value = mode;
        select.addEventListener("change", function () {
            mode = this.value;
            localStorage.setItem("cursorEraserMode", mode);
            updateHeaterVisual();
        });
    }

    updateHeaterVisual();

    document.addEventListener("mousemove", (e) => {
        if (mode === "none") return;
        
        if (heater) {
            heater.style.left = e.clientX + "px";
            heater.style.top = e.clientY + "px";
        }

        if ((mode === "warm" || mode === "cleanup") && snowGrid.length) {
            const gx = Math.floor(e.clientX / SNOW_BLOCK_SIZE);
            const gy = Math.floor(e.clientY / SNOW_BLOCK_SIZE);
            const r = Math.floor(40 / SNOW_BLOCK_SIZE);

            for (let y = gy - r; y <= gy + r; y++) {
                for (let x = gx - r; x <= gx + r; x++) {
                    if (x >= 0 && x < gridCols && y >= 0 && y < gridRows) {
                        if ((x - gx) ** 2 + (y - gy) ** 2 <= r * r) {
                            snowGrid[y * gridCols + x] = 0;
                        }
                    }
                }
            }
        }

        if ((mode === "antiholiday" || mode === "cleanup") && confettiParticles.length) {
            for (let i = 0; i < confettiParticles.length; i++) {
                let p = confettiParticles[i];
                if (Math.hypot(p.x - e.clientX, p.y - e.clientY) < 40) {
                    confettiParticles.splice(i, 1);
                    i--;
                }
            }
        }
    });
}

// --- Тема иконок --- //
const iconPacks = {
    default: { profile: "fa-user", skills: "fa-code", projects: "fa-project-diagram", terminal: "fa-terminal", achievements: "fa-trophy", settings: "fa-cog", palette: "fa-palette", emoji: "" },
    halloween: { profile: "fa-ghost", skills: "fa-skull", projects: "fa-spider", terminal: "fa-broom", achievements: "fa-crow", settings: "fa-spider", palette: "fa-mask", emoji: " 🎃" },
    newyear: { profile: "fa-snowman", skills: "fa-gift", projects: "fa-tree", terminal: "fa-sleigh", achievements: "fa-medal", settings: "fa-snowflake", palette: "fa-star", emoji: " 🎅" },
    birthday: { profile: "fa-user-astronaut", skills: "fa-birthday-cake", projects: "fa-fire-alt", terminal: "fa-gamepad", achievements: "fa-crown", settings: "fa-cogs", palette: "fa-paint-brush", emoji: " 🎂" },
    defenders: { profile: "fa-shield-halved", skills: "fa-crosshairs", projects: "fa-jet-fighter", terminal: "fa-walkie-talkie", achievements: "fa-medal", settings: "fa-cogs", palette: "fa-paint-roller", emoji: " 🎖️" },
    womens: { profile: "fa-venus", skills: "fa-spa", projects: "fa-seedling", terminal: "fa-heart", achievements: "fa-gem", settings: "fa-magic", palette: "fa-palette", emoji: " 🌷" },
    space: { profile: "fa-user-astronaut", skills: "fa-satellite", projects: "fa-rocket", terminal: "fa-meteor", achievements: "fa-star", settings: "fa-cogs", palette: "fa-moon", emoji: " 🚀" },
    victory: { profile: "fa-dove", skills: "fa-fire", projects: "fa-monument", terminal: "fa-star", achievements: "fa-award", settings: "fa-cog", palette: "fa-flag", emoji: " 🎇" },
    valentines: { profile: "fa-heart", skills: "fa-hand-holding-heart", projects: "fa-gifts", terminal: "fa-heart-pulse", achievements: "fa-ring", settings: "fa-cog", palette: "fa-palette", emoji: " 💘" }
};

function getIconType(className) {
    if (className.includes("fa-user") || className.includes("fa-ghost") || className.includes("fa-snowman") || className.includes("fa-user-astronaut") || className.includes("fa-shield-halved") || className.includes("fa-venus") || className.includes("fa-dove") || className.includes("fa-heart")) return "profile";
    if (className.includes("fa-code") || className.includes("fa-skull") || className.includes("fa-gift") || className.includes("fa-birthday-cake") || className.includes("fa-crosshairs") || className.includes("fa-spa") || className.includes("fa-satellite") || className.includes("fa-fire") || className.includes("fa-hand-holding-heart")) return "skills";
    if (className.includes("fa-project-diagram") || className.includes("fa-spider") || className.includes("fa-tree") || className.includes("fa-fire-alt") || className.includes("fa-jet-fighter") || className.includes("fa-seedling") || className.includes("fa-rocket") || className.includes("fa-monument") || className.includes("fa-gifts")) return "projects";
    if (className.includes("fa-terminal") || className.includes("fa-broom") || className.includes("fa-sleigh") || className.includes("fa-gamepad") || className.includes("fa-walkie-talkie") || className.includes("fa-meteor") || className.includes("fa-heart-pulse")) return "terminal";
    if (className.includes("fa-trophy") || className.includes("fa-crow") || className.includes("fa-medal") || className.includes("fa-crown") || className.includes("fa-gem") || className.includes("fa-star") || className.includes("fa-award") || className.includes("fa-ring")) return "achievements";
    if (className.includes("fa-cog") || className.includes("fa-snowflake") || className.includes("fa-cogs") || className.includes("fa-magic")) return "settings";
    if (className.includes("fa-palette") || className.includes("fa-mask") || className.includes("fa-paint-brush") || className.includes("fa-paint-roller") || className.includes("fa-moon") || className.includes("fa-flag")) return "palette";
    return null;
}

function applyIcons(packName) {
    let target = packName;
    if (packName === "auto") target = getCurrentHoliday();
    const pack = iconPacks[target] || iconPacks.default;

    document.querySelectorAll(".menu-item i, .settings-category-title i").forEach((icon) => {
        const type = getIconType(icon.className);
        if (type && pack[type]) {
            icon.className = `fas ${pack[type]}`;
        }
    });

    const emojiSpan = document.getElementById("usernameEmoji");
    if (emojiSpan) emojiSpan.textContent = pack.emoji;
    localStorage.setItem("iconPack", packName);
}

// --- Glitch Mode --- //
let isGlitchActive = false;
let glitchAudio = null;
let glitchIntervals = [];

function initGlitchMode() {
    const glitchToggle = document.getElementById("glitchToggle");
    if (!glitchToggle) return;

    if (localStorage.getItem("glitchEnabled") === "true") {
        glitchToggle.checked = true;
        setTimeout(() => {
            enableGlitchMode();
        }, 500);
    }

    glitchToggle.addEventListener("change", function () {
        if (this.checked) {
            localStorage.setItem("glitchEnabled", "true");
            enableGlitchMode();
        } else {
            localStorage.setItem("glitchEnabled", "false");
            setTimeout(() => {
                location.reload();
            }, 300);
        }
    });
}

function enableGlitchMode() {
    if (isGlitchActive) return;
    isGlitchActive = true;

    document.body.classList.add("hard-glitched");

    if (!document.querySelector(".glitch-noise-overlay")) {
        const noise = document.createElement("div");
        noise.className = "glitch-noise-overlay";
        noise.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/></filter><rect width="100" height="100" filter="url(%23n)" opacity="0.3"/></svg>');
            pointer-events: none; z-index: 99997; opacity: 0.4; mix-blend-mode: overlay;
        `;
        document.body.appendChild(noise);
    }

    playGlitchMusic();

    glitchIntervals.push(setInterval(() => {
        if (!isGlitchActive) return;
        if (Math.random() > 0.6) {
            const elements = document.querySelectorAll(".container, .menu-sidebar, .modal");
            elements.forEach(el => el.style.animation = "interface-disappear 0.2s forwards");
            setTimeout(() => {
                elements.forEach(el => el.style.display = "none");
                setTimeout(() => {
                    elements.forEach(el => {
                        el.style.display = "";
                        el.style.animation = "interface-appear 0.3s forwards";
                    });
                    setTimeout(() => {
                        elements.forEach(el => el.style.animation = "");
                    }, 100);
                }, 300);
            }, 200);
        }
    }, 3000));

    glitchIntervals.push(setInterval(() => {
        if (!isGlitchActive) return;
        const container = document.getElementById("glitchPixelsContainer");
        if (!container) return;
        for (let i = 0; i < Math.floor(Math.random() * 50) + 30; i++) {
            const pixel = document.createElement("div");
            const size = Math.random() * 15 + 3;
            const colors = ["#00ff00", "#ff0000", "#0000ff", "#ffff00"];
            const color = colors[Math.floor(Math.random() * colors.length)];
            pixel.style.cssText = `
                position: absolute; left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
                width: ${size}px; height: ${size}px; background-color: ${color};
                border-radius: ${Math.random() > 0.7 ? "50%" : "0"}; z-index: 99999;
                pointer-events: none; opacity: ${Math.random() * 0.9 + 0.1};
                box-shadow: 0 0 ${size * 5}px ${color};
            `;
            container.appendChild(pixel);
            setTimeout(() => pixel.remove(), Math.random() * 600 + 300);
        }
        if (Math.random() > 0.4) {
            const flashColors = ["#00ff00", "#ff0000", "#0000ff", "#ffff00"];
            document.body.style.backgroundColor = flashColors[Math.floor(Math.random() * flashColors.length)];
            setTimeout(() => { document.body.style.backgroundColor = ""; }, 30);
        }
    }, 40));

    glitchIntervals.push(setInterval(() => {
        if (!isGlitchActive) return;
        if (Math.random() > 0.5) {
            const textElements = document.querySelectorAll("h1, h2, h3, p, span, div:not(.modal):not(.container):not(.menu-sidebar)");
            if (textElements.length === 0) return;
            const target = textElements[Math.floor(Math.random() * textElements.length)];
            const originalText = target.textContent;
            if (!originalText || originalText.trim().length < 2) return;
            
            let distorted = "";
            const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
            for (let i = 0; i < originalText.length; i++) {
                distorted += Math.random() > 0.6 ? chars[Math.floor(Math.random() * chars.length)] : originalText[i];
            }
            target.textContent = distorted;
            
            const colors = ["#00ff00", "#ff0000", "#0000ff", "#ffff00"];
            target.style.color = colors[Math.floor(Math.random() * colors.length)];
            target.style.animation = "text-distortion 0.2s infinite";
            
            setTimeout(() => {
                target.textContent = originalText;
                target.style.color = "";
                target.style.animation = "";
            }, Math.random() * 400 + 150);
        }
    }, 400));
}

function playGlitchMusic() {
    if (glitchAudio) {
        glitchAudio.pause();
        glitchAudio = null;
    }
    try {
        glitchAudio = new Audio("/assets/music/effects/glitch_noise.mp3");
        glitchAudio.volume = 0.4;
        glitchAudio.playbackRate = 1.2;
        glitchAudio.loop = true;
        glitchAudio.play().catch(() => {
            document.addEventListener("click", () => glitchAudio.play(), { once: true });
        });
    } catch (e) {}
}

// --- Версия для слабовидящих (Шрифт Брайля) --- //
const brailleMap = {
    а: "⠁", б: "⠃", в: "⠺", г: "⠛", д: "⠙", е: "⠑", ё: "⠡", ж: "⠚", з: "⠵", и: "⠊", й: "⠯", к: "⠅", л: "⠇", м: "⠍", н: "⠝", о: "⠕", п: "⠏", р: "⠗", с: "⠎", т: "⠞", у: "⠥", ф: "⠋", х: "⠓", ц: "⠉", ч: "⠟", ш: "⠱", щ: "⠭", ъ: "⠷", ы: "⠮", ь: "⠾", э: "⠪", ю: "⠳", я: "⠫",
    a: "⠁", b: "⠃", c: "⠉", d: "⠙", e: "⠑", f: "⠋", g: "⠛", h: "⠓", i: "⠊", j: "⠚", k: "⠅", l: "⠇", m: "⠍", n: "⠝", o: "⠕", p: "⠏", q: "⠟", r: "⠗", s: "⠎", t: "⠞", u: "⠥", v: "⠧", w: "⠺", x: "⠭", y: "⠽", z: "⠵",
    1: "⠁", 2: "⠃", 3: "⠉", 4: "⠙", 5: "⠑", 6: "⠋", 7: "⠛", 8: "⠓", 9: "⠊", 0: "⠚"
};

function initBrailleMode() {
    const brailleToggle = document.getElementById("brailleToggle");
    if (!brailleToggle) return;

    if (localStorage.getItem("brailleEnabled") === "true") {
        brailleToggle.checked = true;
        enableBrailleMode();
    }

    brailleToggle.addEventListener("change", function () {
        if (this.checked) {
            localStorage.setItem("brailleEnabled", "true");
            enableBrailleMode();
        } else {
            localStorage.setItem("brailleEnabled", "false");
            location.reload();
        }
    });
}

function enableBrailleMode() {
    document.body.classList.add("braille-active");

    function traverse(node) {
        if (node.nodeType === 3) { // Текстовый узел
            const parent = node.parentNode;
            if (node.nodeValue.trim() !== "" && parent.tagName !== "SCRIPT" && parent.tagName !== "STYLE" && !parent.classList.contains("fas") && !parent.classList.contains("fab")) {
                let newText = "";
                for (let char of node.nodeValue) {
                    const lowerChar = char.toLowerCase();
                    newText += brailleMap[lowerChar] !== undefined ? brailleMap[lowerChar] : char;
                }
                node.nodeValue = newText;
            }
        } else {
            node.childNodes.forEach(traverse);
        }
    }
    traverse(document.body);
}

// Запуск после загрузки меню
document.addEventListener("menuLoaded", () => {
    initSnowLogic();
    initConfettiLogic();
    initCursorEraser();
    initGlitchMode();
    initBrailleMode();
    
    const savedPack = localStorage.getItem("iconPack") || "auto";
    const packSelect = document.getElementById("iconPackSelect");
    if (packSelect) {
        packSelect.value = savedPack;
        packSelect.addEventListener("change", function () {
            applyIcons(this.value);
            location.reload();
        });
    }
    applyIcons(savedPack);
});