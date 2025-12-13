const birthDate = new Date('2008-01-02');
const formattedBirthDate = '02.01.2008';

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
    const ageElement = document.getElementById('age');
    if (!ageElement) return;

    const calculatedAge = calculateAge();
    ageElement.textContent = calculatedAge;
    ageElement.dataset.hoverText = formattedBirthDate;

    ageElement.addEventListener('mouseover', () => {
        ageElement.textContent = ageElement.dataset.hoverText;
    });

    ageElement.addEventListener('mouseout', () => {
        ageElement.textContent = calculatedAge;
    });
}

const quotes = [
    {text: "Бог дал нам крылья, но мы их отрезали", author: "Неизвестный"},
    {text: "А чтобы я больше не ныл, ты ебани меня лопатой", author: "ЖЩ"},
    {text: "Я буду пить, пока не станет плохо", author: "ЖЩ"},
    {text: "Иногда мы притворяемся глупыми, чтобы ничего не делать", author:"Dont65"},
    {text:"Преждевременная оптимизация — корень всех зол.", author:"Дональд Кнут"},
    {text:"Лучший способ предсказать будущее — это изобрети его.", author:"Алан Кей"},
    {text:"Я использую Arch (btw).", author:"Интернет-мем"},
    {text:"Если долго всматриваться в бездну, бездна начнет всматриваться в тебя", author:"Ницше"},
    {text:"Ты существуешь только в настоящем — этом едином мгновении.", author:"Марк Аврелий"},
    {text:"Быть самим собой — значит быть тем, кто ты есть.", author:"Сёрен Кьеркегор"},
    {text:"Ты становишься ответственным навсегда за того, кого приручил.", author:"Антуан де Сент-Экзюпери"},
    {text:"Мы — это то, что мы делаем снова и снова.", author:"Аристотель"},
    {text:"Кто хочет, тот найдет тысячу возможностей. Кто не хочет, тот найдет тысячу причин", author:"Сократ"},
    {text:"Пархай как бабочка, жаль как пчела.", author:"Мухаммед Али"},
    {text:"Что разум человека может постигнуть и во что он может поверить, того он способен достичь.", author:"Наполеон Хилл"},
    {text:"Стремитесь не к успеху, а к ценностям, которые он дает​.", author:"Альберт Эйнштейн"},
    {text:"Сложнее всего начать действовать, все остальное зависит только от упорства", author:"Амелия Эрхарт"},
    {text:"Надо любить жизнь больше, чем смысл жизни.", author:"Федор Достоевский"},
    {text:"Дружба - дело святое, я бы даже сказал светлое, нефильтрованное.", author:"Джейсон Стетхем"},
    {text:"Omnes peccatores sumus coram Deo vero.", author:"Dont65"},
    {text:"Если жизнь одаривает вас лимонами — не делайте лимонад. Заставьте жизнь забрать их обратно! Разозлитесь! «Мне не нужны твои проклятые лимоны! Что мне с ними делать?» Требуйте встречи с менеджером, отвечающим за жизнь! Заставьте жизнь пожалеть о том дне, когда она решила одарить Кейва Джонсона лимонами! Вы знаете, кто я? Я тот, кто сожжёт ваш дом! Я заставлю своих инженеров изобрести зажигательный лимон, чтобы спалить ваш дом дотла!", author:"Кейв Джонсон"},
    {text:"Если из меня вытряхнуть прочитанное, что останется?", author:"Владимир Маяковский"},
    {text:"Если человека все устраивает, то он полный идиот. Здорового человека в нормальной памяти не может всегда и все устраивать.", author:"Владимир Путин"},
    {text:"Кто не жалеет о распаде Советского Союза, у того нет сердца; кто хочет воссоздать его в прежнем виде, у того нет головы.", author:"Владимир Путин"},
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateQuote() {
    const quoteElement = document.getElementById('randomQuote');
    const authorElement = document.getElementById('quoteAuthor');
    
    if (quoteElement && authorElement) {
        const randomQuote = getRandomQuote();
        
        quoteElement.style.opacity = '0';
        authorElement.style.opacity = '0';
        
        setTimeout(() => {
            quoteElement.textContent = randomQuote.text;
            authorElement.textContent = randomQuote.author;
            
            quoteElement.style.opacity = '1';
            authorElement.style.opacity = '1';
        }, 300);
    }
}

// Меню и модалки
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const menuSidebar = document.getElementById('menuSidebar');

menuBtn.addEventListener('click', () => {
    menuSidebar.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    menuSidebar.classList.remove('active');
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('active');
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        menuSidebar.classList.remove('active');
        localStorage.setItem(`modal_${modalId}_opened`, 'true');
        checkAllModalsAchievement();
    }
}

document.getElementById('openProfileModal').addEventListener('click', () => openModal('profileModal'));
document.getElementById('openSkillsModal').addEventListener('click', () => openModal('skillsModal'));
document.getElementById('openProjectsModal').addEventListener('click', () => openModal('projectsModal'));
document.getElementById('openSettingsModal').addEventListener('click', () => {
    openModal('settingsModal');
    unlockAchievement('settings_opened');
});
document.getElementById('openAchievementsModal').addEventListener('click', () => {
    openModal('achievementsModal');
    renderAchievements();
});
document.getElementById('openTerminal').addEventListener('click', () => {
    localStorage.setItem('terminal_visited', 'true');
    unlockAchievement('terminal_visited');
    window.location.href = '/terminal';
});
document.getElementById('openServer').addEventListener('click', () => {
    window.location.href = '/minecraft-server';
});
document.getElementById('openRules').addEventListener('click', () => {
    window.location.href = '/chat-rules';
});

// Цвета
function updatePrimaryColor(color) {
    let finalColor = color;
    if (document.body.classList.contains('light-theme') && color === '255, 255, 255') {
        finalColor = '0, 0, 0';
    }
    document.documentElement.style.setProperty('--primary-color', finalColor);
}

// Developer Mode (5 кликов)
let themeToggleCounter = 0;
let lastThemeToggleTime = 0;

function showActivationStar() {
    const star = document.getElementById('activationStar');
    if (!star) return;
    
    star.classList.remove('show');
    
    setTimeout(() => {
        star.classList.add('show');
        setTimeout(() => {
            star.classList.remove('show');
            activateDeveloperSection();
        }, 800);
    }, 50);
}

function activateDeveloperSection() {
    const devSection = document.getElementById('developerSettingsCategory');
    if (devSection) {
        devSection.style.display = 'block';
        localStorage.setItem('developerSectionActivated', 'true');
        unlockAchievement('developer_mode');
        setInterval(updateDeveloperTime, 1000);
        updateDeveloperTime();
    }
}

function checkDeveloperModeActivation() {
    const currentTime = Date.now();
    if (currentTime - lastThemeToggleTime > 3000) themeToggleCounter = 0;
    themeToggleCounter++;
    lastThemeToggleTime = currentTime;
    if (themeToggleCounter >= 5) {
        themeToggleCounter = 0;
        showActivationStar();
    }
}

function updateDeveloperTime() {
    const now = new Date();
    const timeEl = document.getElementById('currentTime');
    const dateEl = document.getElementById('currentDate');
    if (timeEl) timeEl.textContent = now.toLocaleTimeString();
    if (dateEl) dateEl.textContent = now.toLocaleDateString();
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('change', function() {
        checkDeveloperModeActivation();
        if (this.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
        const savedColor = localStorage.getItem('primaryColor') || '42, 171, 238';
        updatePrimaryColor(savedColor);
        unlockAchievement('theme_changed');
    });
}

function initColorSettings() {
    const savedColor = localStorage.getItem('primaryColor') || '42, 171, 238';
    updatePrimaryColor(savedColor);
    document.querySelectorAll('.color-option').forEach(option => {
        if (option.dataset.color === savedColor) option.classList.add('selected');
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            const color = this.dataset.color;
            localStorage.setItem('primaryColor', color);
            updatePrimaryColor(color);
            unlockAchievement('color_changed');
        });
    });
}

// Обои
const wallpapers = [
    { name: 'Стандартные', file: 'background.jpg' },
    { name: '2 девочки', file: '2girls.jpg' },
    { name: 'Горничная', file: 'made.png' },
    { name: 'Белый фон', file: 'white.jpg' },
    { name: 'Windows 11', file: 'windows11.jpg' },
    { name: 'Новый год', file: 'newyear.jpg' },
    { name: 'Девушка с пушкой', file: 'girl_gun.jpg'},
    { name: 'Город арт', file: 'city_art.jpg'},
    { name: 'Козел', file: 'goat.png'},
    { name: 'Милота', file:'cute.jpg'}
];

function initWallpaperSettings() {
    const grid = document.getElementById('wallpapersGrid');
    const savedWallpaper = localStorage.getItem('wallpaper') || 'background.jpg';
    wallpapers.forEach(wp => {
        const div = document.createElement('div');
        div.className = `wallpaper-option ${savedWallpaper === wp.file ? 'selected' : ''}`;
        div.innerHTML = `<img src="assets/background/${wp.file}" onerror="this.src='assets/background/background.jpg'" class="wallpaper-preview"><span class="wallpaper-name">${wp.name}</span>`;
        div.addEventListener('click', () => {
            document.querySelectorAll('.wallpaper-option').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            localStorage.setItem('wallpaper', wp.file);
            document.body.style.backgroundImage = `url('assets/background/${wp.file}')`;
            unlockAchievement('wallpaper_changed');
        });
        grid.appendChild(div);
    });
}

// Снег
let snowCanvas, snowCtx;
let snowGrid = [], gridCols = 0, gridRows = 0;
const SNOW_BLOCK_SIZE = 4;

function initSnowLogic() {
    const snowToggle = document.getElementById('snowToggle');
    const now = new Date();
    const m = now.getMonth(); 
    const d = now.getDate();
    
    const isWinter = (m === 11) || (m === 0) || (m === 1) || (m === 2 && d === 1);
    
    const manualSetting = localStorage.getItem('snowEnabled');
    let shouldSnow = false;

    if (manualSetting !== null) {
        shouldSnow = (manualSetting === 'true');
    } else {
        shouldSnow = isWinter;
    }

    if (snowToggle) {
        snowToggle.checked = shouldSnow;
        snowToggle.addEventListener('change', function() {
            localStorage.setItem('snowEnabled', this.checked);
            location.reload();
        });
    }

    if (shouldSnow) {
        initSnowCanvas();
        loopSnow();
    }
}

function initSnowCanvas() {
    snowCanvas = document.getElementById('snowCanvas');
    if (!snowCanvas) return;
    snowCtx = snowCanvas.getContext('2d');
    const resize = () => {
        snowCanvas.width = window.innerWidth;
        snowCanvas.height = window.innerHeight;
        gridCols = Math.ceil(snowCanvas.width / SNOW_BLOCK_SIZE);
        gridRows = Math.ceil(snowCanvas.height / SNOW_BLOCK_SIZE);
        snowGrid = new Array(gridCols * gridRows).fill(0);
    };
    window.addEventListener('resize', resize);
    resize();
    initCursorHeater();
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
                    snowGrid[below] = 1; snowGrid[i] = 0;
                } else {
                    const canLeft = x > 0 && snowGrid[left] === 0;
                    const canRight = x < gridCols - 1 && snowGrid[right] === 0;
                    if (canLeft && canRight) {
                        Math.random() > 0.5 ? (snowGrid[left]=1) : (snowGrid[right]=1);
                        snowGrid[i] = 0;
                    } else if (canLeft) { snowGrid[left]=1; snowGrid[i]=0; }
                    else if (canRight) { snowGrid[right]=1; snowGrid[i]=0; }
                }
            }
        }
    }
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    snowCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
    for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridCols; x++) {
            if (snowGrid[y * gridCols + x] === 1) {
                snowCtx.fillRect(x * SNOW_BLOCK_SIZE, y * SNOW_BLOCK_SIZE, SNOW_BLOCK_SIZE, SNOW_BLOCK_SIZE);
            }
        }
    }
    requestAnimationFrame(loopSnow);
}

function initCursorHeater() {
    const heater = document.getElementById('cursorHeater');
    const toggle = document.getElementById('cursorHeaterToggle');
    let active = localStorage.getItem('cursorHeaterEnabled') === 'true';
    if (toggle) {
        toggle.checked = active;
        toggle.addEventListener('change', function() {
            active = this.checked;
            localStorage.setItem('cursorHeaterEnabled', active);
            heater.style.display = active ? 'block' : 'none';
        });
    }
    if (active) heater.style.display = 'block';
    document.addEventListener('mousemove', (e) => {
        if (!active) return;
        heater.style.left = e.clientX + 'px';
        heater.style.top = e.clientY + 'px';
        if (snowGrid.length) {
            const gx = Math.floor(e.clientX / SNOW_BLOCK_SIZE);
            const gy = Math.floor(e.clientY / SNOW_BLOCK_SIZE);
            const r = Math.floor(40 / SNOW_BLOCK_SIZE);
            for(let y = gy - r; y <= gy + r; y++) {
                for(let x = gx - r; x <= gx + r; x++) {
                    if (x >= 0 && x < gridCols && y >= 0 && y < gridRows) {
                        if ((x-gx)**2 + (y-gy)**2 <= r*r) snowGrid[y*gridCols+x] = 0;
                    }
                }
            }
        }
    });
}

// Иконки
const iconPacks = {
    default: {
        profile: 'fa-user', skills: 'fa-code', projects: 'fa-project-diagram',
        terminal: 'fa-terminal', achievements: 'fa-trophy', settings: 'fa-cog',
        palette: 'fa-palette', emoji: ''
    },
    halloween: {
        profile: 'fa-ghost', skills: 'fa-skull', projects: 'fa-spider',
        terminal: 'fa-broom', achievements: 'fa-crow', settings: 'fa-spider',
        palette: 'fa-mask', emoji: ' 🎃'
    },
    newyear: {
        profile: 'fa-snowman', skills: 'fa-gift', projects: 'fa-tree',
        terminal: 'fa-sleigh', achievements: 'fa-medal', settings: 'fa-snowflake',
        palette: 'fa-star', emoji: ' 🎅'
    },
    birthday: {
        profile: 'fa-user-astronaut', skills: 'fa-birthday-cake', projects: 'fa-fire-alt',
        terminal: 'fa-gamepad', achievements: 'fa-crown', settings: 'fa-cogs',
        palette: 'fa-paint-brush', emoji: ' 🎂'
    }
};

function getIconType(className) {
    if (className.includes('fa-user')) return 'profile';
    if (className.includes('fa-code')) return 'skills';
    if (className.includes('fa-project-diagram')) return 'projects';
    if (className.includes('fa-terminal')) return 'terminal';
    if (className.includes('fa-trophy')) return 'achievements';
    if (className.includes('fa-cog')) return 'settings';
    if (className.includes('fa-palette')) return 'palette';
    return null;
}

function applyIcons(packName) {
    let target = packName;
    if (packName === 'auto') {
        const now = new Date();
        const m = now.getMonth();
        const d = now.getDate();
        target = 'default';
        if ((m===9 && d>=24) || (m===10 && d<=7)) target = 'halloween';
        if ((m===11 && d>=25) || (m===0 && d<=8)) target = 'newyear';
        if (m === 0 && d === 2) target = 'birthday';
    }
    const pack = iconPacks[target] || iconPacks.default;
    document.querySelectorAll('.menu-item i, .settings-category-title i').forEach(icon => {
        const type = getIconType(icon.className);
        if (type && pack[type]) icon.className = `fas ${pack[type]}`;
    });
    const emojiSpan = document.getElementById('usernameEmoji');
    if (emojiSpan) emojiSpan.textContent = pack.emoji;
    localStorage.setItem('iconPack', packName);
}

// УСИЛЕННЫЙ И УСКОРЕННЫЙ GLITCH MODE
let glitchIntervals = [];
let glitchAudio = null;
let isGlitchActive = false;
let originalColors = {};

function initGlitchMode() {
    const glitchToggle = document.getElementById('glitchToggle');
    if (!glitchToggle) return;
    
    if (localStorage.getItem('glitchEnabled') === 'true') {
        glitchToggle.checked = true;
        setTimeout(() => enableGlitchMode(), 500);
    }
    
    glitchToggle.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('glitchEnabled', 'true');
            enableGlitchMode();
        } else {
            localStorage.setItem('glitchEnabled', 'false');
            // Перезагружаем страницу при выключении
            setTimeout(() => {
                location.reload();
            }, 300);
        }
    });
}

function enableGlitchMode() {
    if (isGlitchActive) return;
    isGlitchActive = true;
    
    console.log('🔥 ВКЛЮЧЕН ЖЕСТКИЙ И УСКОРЕННЫЙ GLITCH MODE 🔥');
    
    saveOriginalColors();
    document.body.classList.add('hard-glitched');
    createGlitchElements();
    playGlitchMusic();
    
    // 1. ЭФФЕКТ ПРОПАДАНИЯ ИНТЕРФЕЙСА (ускорено: каждые 3-7 секунд)
    const disappearInterval = setInterval(() => {
        if (!isGlitchActive) return;
        
        if (Math.random() > 0.6) {
            // Анимация исчезновения (ускорено)
            document.querySelectorAll('.container, .menu-sidebar, .modal').forEach(el => {
                el.style.animation = 'interface-disappear 0.2s forwards';
            });
            
            // Полное исчезновение на 0.5 секунды (ускорено)
            setTimeout(() => {
                document.querySelectorAll('.container, .menu-sidebar, .modal').forEach(el => {
                    el.style.display = 'none';
                });
                
                // Восстановление (ускорено)
                setTimeout(() => {
                    document.querySelectorAll('.container, .menu-sidebar, .modal').forEach(el => {
                        el.style.display = '';
                        el.style.animation = 'interface-appear 0.3s forwards';
                    });
                    
                    setTimeout(() => {
                        document.querySelectorAll('.container, .menu-sidebar, .modal').forEach(el => {
                            el.style.animation = '';
                        });
                    }, 100);
                }, 300);
            }, 200);
        }
    }, 3000);
    glitchIntervals.push(disappearInterval);
    
    // 2. БИТЫЕ ПИКСЕЛИ (ТОЛЬКО САЛАТОВЫЕ) - ускорено
    const pixelInterval = setInterval(() => {
        if (!isGlitchActive) return;
        
        const pixelCount = Math.floor(Math.random() * 50) + 30; // Увеличено количество пикселей
        for (let i = 0; i < pixelCount; i++) {
            createGlitchPixel();
        }
        
        // Рандомные вспышки (учащены)
        if (Math.random() > 0.4) {
            const flashColors = ['#00ff00', '#ff0000', '#0000ff', '#ffff00'];
            const randomColor = flashColors[Math.floor(Math.random() * flashColors.length)];
            document.body.style.backgroundColor = randomColor;
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 30); // Более короткая вспышка
        }
    }, 40); // Ускорено с 60мс до 40мс
    glitchIntervals.push(pixelInterval);
    
    // 3. ЭФФЕКТ РАЗРЫВА КАДРОВ - ускорено
    const frameTearInterval = setInterval(() => {
        if (!isGlitchActive) return;
        
        if (Math.random() > 0.7) {
            const elements = document.querySelectorAll('.container, .modal-content');
            elements.forEach(el => {
                el.style.animation = 'frame-tear 0.3s linear';
                setTimeout(() => {
                    el.style.animation = '';
                }, 200);
            });
        }
    }, 300); // Ускорено с 500мс до 300мс
    glitchIntervals.push(frameTearInterval);
    
    // 4. ДРОЖАНИЕ И ХАОТИЧНЫЕ СДВИГИ - ускорено
    const shakeInterval = setInterval(() => {
        if (!isGlitchActive) return;
        
        const elements = document.querySelectorAll('.container, .modal-content, .menu-sidebar, .menu-item, .social-icon');
        elements.forEach(el => {
            if (Math.random() > 0.8) { // Увеличена вероятность
                const shakeX = (Math.random() - 0.5) * 60; // Усилено дрожание
                const shakeY = (Math.random() - 0.5) * 60;
                el.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
                
                setTimeout(() => {
                    el.style.transform = '';
                }, Math.random() * 100 + 50); // Ускорено
            }
        });
    }, 200); // Ускорено с 300мс до 200мс
    glitchIntervals.push(shakeInterval);
    
    // 5. ИСКАЖЕНИЕ ТЕКСТА - ускорено
    const textInterval = setInterval(() => {
        if (!isGlitchActive) return;
        
        if (Math.random() > 0.5) {
            distortRandomText();
        }
    }, 400); // Ускорено с 700мс до 400мс
    glitchIntervals.push(textInterval);
    
    // 6. ХАОТИЧНАЯ СМЕНА ЦВЕТОВ - ускорено
    const colorInterval = setInterval(() => {
        if (!isGlitchActive) return;
        
        if (Math.random() > 0.7) {
            const elements = document.querySelectorAll('.container, .menu-sidebar, .modal-content, .avatar, .social-icon');
            elements.forEach(el => {
                const hue = Math.floor(Math.random() * 360);
                el.style.backgroundColor = `hsl(${hue}, 100%, 20%)`;
                el.style.color = `hsl(${(hue + 180) % 360}, 100%, 80%)`;
                
                setTimeout(() => {
                    el.style.backgroundColor = '';
                    el.style.color = '';
                }, 100); // Ускорено
            });
        }
    }, 80); // Ускорено с 100мс до 80мс
    glitchIntervals.push(colorInterval);
    
    // 7. НОВЫЙ ЭФФЕКТ: СЛУЧАЙНЫЕ ВРАЩЕНИЯ - ускорено
    const rotationInterval = setInterval(() => {
        if (!isGlitchActive) return;
        
        if (Math.random() > 0.8) {
            const elements = document.querySelectorAll('.container, .modal-content');
            elements.forEach(el => {
                const rotation = (Math.random() - 0.5) * 15;
                el.style.transform = `rotate(${rotation}deg)`;
                
                setTimeout(() => {
                    el.style.transform = '';
                }, 150);
            });
        }
    }, 250); // Новый быстрый интервал
    glitchIntervals.push(rotationInterval);
}

function disableGlitchMode() {
    console.log('Отключен Glitch-режим');
    isGlitchActive = false;
    
    glitchIntervals.forEach(i => clearInterval(i));
    glitchIntervals = [];
    
    document.body.classList.remove('hard-glitched');
    removeGlitchElements();
    restoreOriginalColors();
    stopGlitchMusic();
    
    document.querySelectorAll('*').forEach(el => {
        el.style.transform = '';
        el.style.filter = '';
        el.style.color = '';
        el.style.backgroundColor = '';
        el.style.borderColor = '';
        el.style.animation = '';
        el.style.display = '';
    });
}

function saveOriginalColors() {
    const elements = document.querySelectorAll('.container, .menu-sidebar, .modal-content, .menu-item, .social-icon, .avatar');
    elements.forEach(el => {
        const style = window.getComputedStyle(el);
        originalColors[el] = {
            background: style.backgroundColor,
            color: style.color,
            borderColor: style.borderColor
        };
    });
}

function restoreOriginalColors() {
    for (const [el, colors] of Object.entries(originalColors)) {
        if (el.style) {
            el.style.backgroundColor = colors.background;
            el.style.color = colors.color;
            el.style.borderColor = colors.borderColor;
        }
    }
}

function createGlitchElements() {
    if (!document.getElementById('glitchPixelsContainer')) {
        const container = document.createElement('div');
        container.id = 'glitchPixelsContainer';
        container.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:99999;';
        document.body.appendChild(container);
    }
    
    if (!document.getElementById('glitchSectorsContainer')) {
        const container = document.createElement('div');
        container.id = 'glitchSectorsContainer';
        container.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:99998;';
        document.body.appendChild(container);
    }
    
    if (!document.querySelector('.glitch-noise-overlay')) {
        const noise = document.createElement('div');
        noise.className = 'glitch-noise-overlay';
        noise.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/></filter><rect width="100" height="100" filter="url(%23n)" opacity="0.3"/></svg>');
            pointer-events: none;
            z-index: 99997;
            opacity: 0;
            mix-blend-mode: overlay;
        `;
        document.body.appendChild(noise);
        
        setTimeout(() => {
            noise.style.opacity = '0.4';
        }, 100);
    }
}

function removeGlitchElements() {
    const elements = [
        'glitchPixelsContainer',
        'glitchSectorsContainer',
        '.glitch-noise-overlay',
        '.glitch-pixel',
        '.glitch-sector',
        '.text-glitch'
    ];
    
    elements.forEach(selector => {
        const el = selector.startsWith('.') 
            ? document.querySelector(selector)
            : document.getElementById(selector);
        if (el) el.remove();
    });
}

function createGlitchPixel() {
    const container = document.getElementById('glitchPixelsContainer');
    if (!container) return;
    
    const pixel = document.createElement('div');
    pixel.className = 'glitch-pixel';
    
    const size = Math.random() * 15 + 3; // Увеличен максимальный размер
    const colors = ['#00ff00', '#ff0000', '#0000ff', '#ffff00']; // Добавлены цвета
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    pixel.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: ${Math.random() > 0.7 ? '50%' : '0'};
        z-index: 99999;
        pointer-events: none;
        opacity: ${Math.random() * 0.9 + 0.1};
        box-shadow: 0 0 ${size*5}px ${color};
    `;
    
    container.appendChild(pixel);
    
    const duration = Math.random() * 600 + 300; // Ускорено
    let opacity = pixel.style.opacity;
    
    const flicker = setInterval(() => {
        pixel.style.opacity = Math.random() > 0.5 ? opacity : '0';
    }, 20); // Ускорено мерцание
    
    setTimeout(() => {
        clearInterval(flicker);
        pixel.remove();
    }, duration);
}

function distortRandomText() {
    const textElements = document.querySelectorAll('h1, h2, h3, p, span, div:not(.modal):not(.container):not(.menu-sidebar)');
    if (textElements.length === 0) return;
    
    const target = textElements[Math.floor(Math.random() * textElements.length)];
    const originalText = target.textContent;
    
    if (!originalText || originalText.trim().length < 2) return;
    
    let distorted = '';
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    
    for (let i = 0; i < originalText.length; i++) {
        if (Math.random() > 0.6) {
            distorted += chars[Math.floor(Math.random() * chars.length)];
        } else if (Math.random() > 0.3) {
            distorted += originalText[i].toUpperCase();
        } else if (Math.random() > 0.2) {
            distorted += originalText[i].toLowerCase();
        } else {
            distorted += originalText[i];
        }
    }
    
    const colors = ['#00ff00', '#ff0000', '#0000ff', '#ffff00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    target.style.color = randomColor;
    target.style.textShadow = `0 0 15px ${randomColor}`;
    target.style.animation = 'none';
    void target.offsetWidth;
    target.style.animation = 'text-distortion 0.2s infinite';
    target.textContent = distorted;
    
    setTimeout(() => {
        target.textContent = originalText;
        target.style.color = '';
        target.style.textShadow = '';
        target.style.animation = '';
    }, Math.random() * 400 + 150); // Ускорено
}

function playGlitchMusic() {
    if (glitchAudio) {
        glitchAudio.pause();
        glitchAudio = null;
    }
    
    try {
        glitchAudio = new Audio('/assets/music/glitch_noise.mp3');
        glitchAudio.volume = 0.4; // Увеличенная громкость
        glitchAudio.playbackRate = 1.2; // Ускоренное воспроизведение
        glitchAudio.loop = true;
        
        const playPromise = glitchAudio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Автовоспроизведение музыки заблокировано.');
                
                const enableOnClick = () => {
                    glitchAudio.play();
                    document.removeEventListener('click', enableOnClick);
                };
                document.addEventListener('click', enableOnClick);
            });
        }
    } catch (error) {
        console.log('Ошибка загрузки музыки:', error);
    }
}

function stopGlitchMusic() {
    if (glitchAudio) {
        glitchAudio.pause();
        glitchAudio.currentTime = 0;
        glitchAudio = null;
    }
}

// Braille Mode
const brailleMap = {
    'а': '⠁', 'б': '⠃', 'в': '⠺', 'г': '⠛', 'д': '⠙', 'е': '⠑', 'ё': '⠡',
    'ж': '⠚', 'з': '⠵', 'и': '⠊', 'й': '⠯', 'к': '⠅', 'л': '⠇', 'м': '⠍',
    'н': '⠝', 'о': '⠕', 'п': '⠏', 'р': '⠗', 'с': '⠎', 'т': '⠞', 'у': '⠥',
    'ф': '⠋', 'х': '⠓', 'ц': '⠉', 'ч': '⠟', 'ш': '⠱', 'щ': '⠭', 'ъ': '⠷',
    'ы': '⠮', 'ь': '⠾', 'э': '⠪', 'ю': '⠳', 'я': '⠫',
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
    'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
    'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
    'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', 
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚'
};

function initBrailleMode() {
    const brailleToggle = document.getElementById('brailleToggle');
    if (!brailleToggle) return;
    if (localStorage.getItem('brailleEnabled') === 'true') {
        brailleToggle.checked = true;
        enableBrailleMode();
    }
    brailleToggle.addEventListener('change', function() {
        localStorage.setItem('brailleEnabled', this.checked);
        this.checked ? enableBrailleMode() : location.reload();
    });
}

function enableBrailleMode() {
    document.body.classList.add('braille-active');
    function traverse(node) {
        if (node.nodeType === 3) {
            if (node.nodeValue.trim() && !['SCRIPT','STYLE'].includes(node.parentNode.tagName) && 
                !node.parentNode.classList.contains('fas') && !node.parentNode.classList.contains('fab')) {
                node.nodeValue = node.nodeValue.split('').map(c => brailleMap[c.toLowerCase()] || c).join('');
            }
        } else {
            node.childNodes.forEach(traverse);
        }
    }
    traverse(document.body);
}

// Достижения
const achievements = [
    {id: 'first_visit', title: 'Добро пожаловать!', description: 'Посетить сайт', icon: 'fa-door-open'},
    {id: 'settings_opened', title: 'Любопытство', description: 'Открыть настройки', icon: 'fa-cog'},
    {id: 'theme_changed', title: 'Светлая сторона', description: 'Включить светлую тему', icon: 'fa-sun'},
    {id: 'wallpaper_changed', title: 'Ремонт', description: 'Сменить обои', icon: 'fa-image'},
    {id: 'color_changed', title: 'Художник', description: 'Сменить цвет', icon: 'fa-palette'},
    {id: 'terminal_visited', title: 'Хакер', description: 'Зайти в терминал', icon: 'fa-terminal'},
    {id: 'developer_mode', title: 'Режим бога', description: 'Активировать настройки разработчика', icon: 'fa-code'},
    {id: 'all_modals', title: 'Исследователь', description: 'Открыть все окна', icon: 'fa-map'}
];

function checkAchievements() {
    if (!localStorage.getItem('first_visit')) {
        unlockAchievement('first_visit');
        localStorage.setItem('first_visit', 'true');
    }
    renderAchievements();
}

function unlockAchievement(id) {
    const unlocked = JSON.parse(localStorage.getItem('achievements_unlocked') || '[]');
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem('achievements_unlocked', JSON.stringify(unlocked));
        const ach = achievements.find(a => a.id === id);
        if (ach) showNotification(ach);
    }
}

function renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    if (!container) return;
    container.innerHTML = '';
    const unlocked = JSON.parse(localStorage.getItem('achievements_unlocked') || '[]');
    achievements.forEach(ach => {
        const isUnlocked = unlocked.includes(ach.id);
        const el = document.createElement('div');
        el.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
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
    const all = ['profileModal','skillsModal','projectsModal','settingsModal'];
    if (all.every(id => localStorage.getItem(`modal_${id}_opened`))) {
        unlockAchievement('all_modals');
    }
}

function showNotification(ach) {
    const notif = document.createElement('div');
    notif.className = 'achievement-notification';
    notif.innerHTML = `<i class="fas ${ach.icon}"></i> <div><b>Достижение!</b><br>${ach.title}</div>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 100);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => notif.remove(), 500);
    }, 3000);
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.checked = true;
    }
    const savedWallpaper = localStorage.getItem('wallpaper') || 'background.jpg';
    document.body.style.backgroundImage = `url('assets/background/${savedWallpaper}')`;
    
    updateAgeDisplay();
    updateQuote();
    initColorSettings();
    initWallpaperSettings();
    checkAchievements();
    initSnowLogic();
    
    const savedPack = localStorage.getItem('iconPack') || 'auto';
    const packSelect = document.getElementById('iconPackSelect');
    if (packSelect) {
        packSelect.value = savedPack;
        packSelect.addEventListener('change', function() {
            applyIcons(this.value);
            location.reload();
        });
    }
    applyIcons(savedPack);

    if (localStorage.getItem('developerSectionActivated')) activateDeveloperSection();
    
    initGlitchMode();
    initBrailleMode();
    
    document.getElementById('refreshQuoteBtn').addEventListener('click', function() {
        this.classList.add('rotating');
        updateQuote();
        setTimeout(()=>this.classList.remove('rotating'), 1000);
    });
});