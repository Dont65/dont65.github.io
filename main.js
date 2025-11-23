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
    {text:"Лучший способ предсказать будущее — это изобрести его.", author:"Алан Кей"},
    {text:"Я использую Arch (btw).", author:"Интернет-мем"},
    {text:"Если долго всматриваться в бездну, бездна начнет всматриваться в тебя", author:"Ницше"},
    {text:"Ты существуешь только в настоящем — этом едином мгновении, — и ты лишь неразумно расточаешь его, словно тебе уготованы целые тысячелетия.", author:"Марк Аврелий"},
    {text:"Быть самим собой — значит быть тем, кто ты есть, в самой глубинной своей основе, тоесть надеждой и страхом.", author:"Сёрен Кьеркегор"},
    {text:"Ты становишься ответственным навсегда за того, кого приручил.", author:"Антуан де Сент-Экзюпери"},
    {text:"Мы — это то, что мы делаем снова и снова. Таким образом, совершенство — это не действие, а привычка.", author:"Аристотель"},
    {text:"Тот, кто смотрит вовне — спит, тот, кто смотрит в себя — пробуждается.", author:"Карл Густав Юнг"},
    {text:"Свобода состоит в том, чтобы полагаться на законы, которые мы сами для себя установили.", author:"Жан-Жак Руссо"},
    {text:"Безумие — это точное повторение одного и того же действия, раз за разом, в надежде на изменение. Это и есть безумие", author:"Ваас Монтенегро"},
    {text:"Порно — лучший учитель жизни. Оно показывает в каких позах и в какие щели жизнь долбить будет", author:"Dont65"},
    {text:"За свою жизнь я промахнулся много тысяч раз... Я терплю поражения день за днем — и именно поэтому я ЧЕМПИОН!", author:"Майкл Джордан"},
    {text:"Когда ты поднимаешься, друзья узнают, кто ты. Когда ты падаешь, ты узнаешь, кто друзья.", author:"Майкл Тайсон"},
    {text:"Умей пережить ту минута, когда кажется что всё уже потеряно.", author:"Уэйн Руни"},
    {text:"Бог не дал нам крылья, но подарил мяч... Он знал, что нам это понравится больше.", author:"Мирослав Клозе"},
    {text:"Я могу принять поражение, но я не могу принять отсутствие попыток.", author:"Майкл Джордан"},
    {text:"Если ты не сделал ни одной попытки попасть в цель, то промахнулся на все сто.", author:"Уэйн Дуглас Гретцки"},
    {text:"Кто хочет, тот найдет тысячу возможностей. Кто не хочет, тот найдет тысячу причин", author:"Сократ"},
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
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

const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const menuSidebar = document.getElementById('menuSidebar');

menuBtn.addEventListener('click', () => {
    menuSidebar.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    menuSidebar.classList.remove('active');
});

const profileModal = document.getElementById('profileModal');
const skillsModal = document.getElementById('skillsModal');
const projectsModal = document.getElementById('projectsModal');
const settingsModal = document.getElementById('settingsModal');
const achievementsModal = document.getElementById('achievementsModal');

document.getElementById('openProfileModal').addEventListener('click', () => {
    profileModal.classList.add('active');
    menuSidebar.classList.remove('active');
    localStorage.setItem('modal_profileModal_opened', 'true');
    checkAllModalsAchievement();
});

document.getElementById('openSkillsModal').addEventListener('click', () => {
    skillsModal.classList.add('active');
    menuSidebar.classList.remove('active');
    localStorage.setItem('modal_skillsModal_opened', 'true');
    checkAllModalsAchievement();
});

document.getElementById('openProjectsModal').addEventListener('click', () => {
    projectsModal.classList.add('active');
    menuSidebar.classList.remove('active');
    localStorage.setItem('modal_projectsModal_opened', 'true');
    checkAllModalsAchievement();
});

document.getElementById('openSettingsModal').addEventListener('click', () => {
    settingsModal.classList.add('active');
    menuSidebar.classList.remove('active');
    unlockAchievement('settings_opened');
    checkAllModalsAchievement();
});

document.getElementById('openAchievementsModal').addEventListener('click', () => {
    achievementsModal.classList.add('active');
    menuSidebar.classList.remove('active');
    renderAchievements();
});

document.getElementById('openTerminal').addEventListener('click', () => {
    localStorage.setItem('terminal_visited', 'true');
    unlockAchievement('terminal_visited');
    window.location.href = '/terminal';
    menuSidebar.classList.remove('active');
});
 document.getElementById('openServer').addEventListener('click', () => {
    window.location.href = '/minecraft-server';
    menuSidebar.classList.remove('active');
});

// Обработчик для кнопки правил
document.getElementById('openRules').addEventListener('click', () => {
    window.location.href = '/chat-rules';
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


function adjustColorForTheme(color) {
    if (document.body.classList.contains('light-theme') && color === '255, 255, 255') {
        return '0, 0, 0'; 
    }
    return color;
}


function updatePrimaryColor(color) {
    const adjustedColor = adjustColorForTheme(color);
    document.documentElement.style.setProperty('--primary-color', adjustedColor);
}


let themeToggleCounter = 0;
let lastThemeToggleTime = 0;


function showActivationStar() {
    const star = document.getElementById('activationStar');
    if (star) {
        star.classList.add('show');
        setTimeout(() => {
            star.classList.remove('show');
           
            activateDeveloperSection();
        }, 500);
    }
}


function activateDeveloperSection() {
    const developerSettingsCategory = document.getElementById('developerSettingsCategory');
    if (developerSettingsCategory) {
        developerSettingsCategory.style.display = 'block';
        localStorage.setItem('developerSectionActivated', 'true');

        unlockAchievement('developer_mode');
        
        updateDeveloperTime();
        setInterval(updateDeveloperTime, 1000);
        
        initIconPackSettings();
        initGlitchMode();
        initBrailleMode();
    }
}

function checkDeveloperModeActivation() {
    const currentTime = Date.now();
    

    if (currentTime - lastThemeToggleTime > 3000) {
        themeToggleCounter = 0;
    }
    
    themeToggleCounter++;
    lastThemeToggleTime = currentTime;
    
    console.log(`Переключение темы: ${themeToggleCounter}/5`);
    

    if (themeToggleCounter >= 5) {
        themeToggleCounter = 0;
        showActivationStar();
    }
}


function updateDeveloperTime() {
    const now = new Date();
    const currentTimeElement = document.getElementById('currentTime');
    const currentDateElement = document.getElementById('currentDate');
    
    if (currentTimeElement) {
        currentTimeElement.textContent = now.toLocaleTimeString();
    }
    
    if (currentDateElement) {
        currentDateElement.textContent = now.toLocaleDateString('ru-RU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}


function checkExistingDeveloperSection() {
    if (localStorage.getItem('developerSectionActivated') === 'true') {
        activateDeveloperSection();
    }
}

const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.checked = true;
}

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


function initColorSettings() {
    const colorOptions = document.getElementById('colorOptions');
    const savedColor = localStorage.getItem('primaryColor') || '42, 171, 238';

    updatePrimaryColor(savedColor);
    

    document.querySelectorAll('.color-option').forEach(option => {
        if (option.dataset.color === savedColor) {
            option.classList.add('selected');
        }
        
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            const selectedColor = this.dataset.color;
            localStorage.setItem('primaryColor', selectedColor);
            updatePrimaryColor(selectedColor);
            unlockAchievement('color_changed');
        });
    });
}

const wallpapers = [
    { name: 'Стандартные', file: 'background.jpg' },
    { name: '2 девочки', file: '2girls.jpg' },
    { name: 'Горничная', file: 'made.png' },
    { name: 'Белый фон', file: 'white.jpg' },
    { name: 'Windows 11', file: 'windows11.jpg' },
    { name: 'Новый год', file: 'newyear.jpg' },
    { name: 'Девушка с пушкой', file: 'girl_gun.jpg'},
    { name: 'Нарисованный город', file: 'city_art.jpg'},
    { name: 'Козел симулятор', file: 'goat.png'},
    {name: 'Милота', file:'cute.jpg'}
];

function initWallpaperSettings() {
    const wallpapersGrid = document.getElementById('wallpapersGrid');
    const savedWallpaper = localStorage.getItem('wallpaper') || 'background.jpg';

    wallpapers.forEach(wallpaper => {
        const wallpaperOption = document.createElement('div');
        wallpaperOption.className = `wallpaper-option ${savedWallpaper === wallpaper.file ? 'selected' : ''}`;
        wallpaperOption.dataset.file = wallpaper.file;
        
        const img = document.createElement('img');
        img.className = 'wallpaper-preview';
        img.src = `assets/background/${wallpaper.file}`;
        img.alt = wallpaper.name;
        img.onerror = function() {
            this.src = 'assets/background/background.jpg';
        };
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'wallpaper-name';
        nameSpan.textContent = wallpaper.name;
        
        wallpaperOption.appendChild(img);
        wallpaperOption.appendChild(nameSpan);
        
        wallpaperOption.addEventListener('click', function() {
            document.querySelectorAll('.wallpaper-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            
            const selectedFile = this.dataset.file;
            localStorage.setItem('wallpaper', selectedFile);
            document.body.style.backgroundImage = `url('assets//background/${selectedFile}')`;
            unlockAchievement('wallpaper_changed');
        });
        
        wallpapersGrid.appendChild(wallpaperOption);
    });
}

// --- ОБНОВЛЕННАЯ ЛОГИКА СНЕГА (ФИЗИКА СЫПУЧЕСТИ И ОПТИМИЗАЦИЯ) ---
let snowCanvas = null;
let snowCtx = null;
let snowAccumulationFrame = null;
let isHeaterActive = false;

// Физическая сетка снега
let snowGrid = [];
const SNOW_BLOCK_SIZE = 4; // Размер "пикселя" снега. 4 - компромисс между качеством и нагрузкой.
let gridCols = 0;
let gridRows = 0;
let frameSkipper = 0; // Счетчик для пропуска кадров

function initSnowCanvas() {
    snowCanvas = document.getElementById('snowCanvas');
    if (snowCanvas) {
        snowCtx = snowCanvas.getContext('2d');
        resizeSnowCanvas();
        window.addEventListener('resize', resizeSnowCanvas);
    }
    
    initCursorHeater();
}

function resizeSnowCanvas() {
    if (snowCanvas) {
        snowCanvas.width = window.innerWidth;
        snowCanvas.height = window.innerHeight;
        
        gridCols = Math.ceil(snowCanvas.width / SNOW_BLOCK_SIZE);
        gridRows = Math.ceil(snowCanvas.height / SNOW_BLOCK_SIZE);
        
        // Пересоздаем сетку при ресайзе
        snowGrid = new Array(gridCols * gridRows).fill(0);
    }
}

function startSnow() {
    // Гарантируем, что канвас инициализирован
    if (!snowCanvas) {
        initSnowCanvas();
    }

    stopSnow(); // Сброс перед запуском

    // Запуск физического накопления (Canvas)
    if (snowCtx) {
        updateSnowLoop();
    }
}

function stopSnow() {
    if (snowAccumulationFrame) {
        cancelAnimationFrame(snowAccumulationFrame);
        snowAccumulationFrame = null;
    }
    // Очистка сетки не требуется, так как мы перезагружаем страницу
}


// Физика снега (клеточный автомат) с замедлением
function updateSnowLoop() {
    // ОПТИМИЗАЦИЯ: Пропускаем каждый второй кадр
    // Это снижает FPS физики с 60 до 30, делая снег медленнее и легче для процессора
    frameSkipper++;
    if (frameSkipper % 2 !== 0) {
         snowAccumulationFrame = requestAnimationFrame(updateSnowLoop);
         return;
    }

    // 1. Добавляем новый снег сверху
    // Рассчитываем интенсивность, чтобы заполнить за час очень медленно.
    const totalCells = gridCols * gridRows;
    // Делим на большее число, чтобы снег падал реже
    const cellsPerFrame = Math.max(1, Math.ceil(totalCells / 400000)); 
    
    for (let i = 0; i < cellsPerFrame; i++) {
        const x = Math.floor(Math.random() * gridCols);
        // Добавляем снег в верхний ряд
        if (x >= 0 && x < gridCols) {
            snowGrid[x] = 1; // index = y * cols + x, где y=0
        }
    }

    // 2. Обновляем физику (снизу вверх)
    for (let y = gridRows - 2; y >= 0; y--) {
        for (let x = 0; x < gridCols; x++) {
            const idx = y * gridCols + x;
            
            if (snowGrid[idx] === 1) {
                const belowIdx = (y + 1) * gridCols + x;
                
                // Если внизу пусто -> падаем
                if (snowGrid[belowIdx] === 0) {
                    snowGrid[belowIdx] = 1;
                    snowGrid[idx] = 0;
                } else {
                    // Внизу занято, пробуем скатиться влево или вправо
                    const leftIdx = (y + 1) * gridCols + (x - 1);
                    const rightIdx = (y + 1) * gridCols + (x + 1);
                    
                    const canGoLeft = x > 0 && snowGrid[leftIdx] === 0;
                    const canGoRight = x < gridCols - 1 && snowGrid[rightIdx] === 0;

                    if (canGoLeft && canGoRight) {
                        if (Math.random() > 0.5) {
                            snowGrid[leftIdx] = 1;
                            snowGrid[idx] = 0;
                        } else {
                            snowGrid[rightIdx] = 1;
                            snowGrid[idx] = 0;
                        }
                    } else if (canGoLeft) {
                        snowGrid[leftIdx] = 1;
                        snowGrid[idx] = 0;
                    } else if (canGoRight) {
                        snowGrid[rightIdx] = 1;
                        snowGrid[idx] = 0;
                    }
                }
            }
        }
    }

    // 3. Рисуем
    drawSnowGrid();

    snowAccumulationFrame = requestAnimationFrame(updateSnowLoop);
}

function drawSnowGrid() {
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    snowCtx.fillStyle = "rgba(255, 255, 255, 0.8)";

    for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridCols; x++) {
            if (snowGrid[y * gridCols + x] === 1) {
                snowCtx.fillRect(x * SNOW_BLOCK_SIZE, y * SNOW_BLOCK_SIZE, SNOW_BLOCK_SIZE, SNOW_BLOCK_SIZE);
            }
        }
    }
}

function initSnowSettings() {
    const snowToggle = document.getElementById('snowToggle');
    if (!snowToggle) return;
    
    const snowEnabled = localStorage.getItem('snowEnabled') === 'true';
    snowToggle.checked = snowEnabled;
    
    // Сначала инициализируем канвас
    initSnowCanvas();
    
    if (snowEnabled) {
        startSnow();
    }
    
    snowToggle.addEventListener('change', function() {
        localStorage.setItem('snowEnabled', this.checked);
        // ПЕРЕЗАГРУЗКА СТРАНИЦЫ ДЛЯ ПОЛНОЙ ОЧИСТКИ
        location.reload();
    });
}

// --- ЛОГИКА ТЕПЛОГО КУРСОРА (ВЫЖИГАНИЕ СЕТКИ) ---
function initCursorHeater() {
    const toggle = document.getElementById('cursorHeaterToggle');
    const heater = document.getElementById('cursorHeater');
    
    if (!toggle || !heater) return;
    
    const savedState = localStorage.getItem('cursorHeaterEnabled') === 'true';
    toggle.checked = savedState;
    isHeaterActive = savedState;
    
    if (isHeaterActive) {
        heater.style.display = 'block';
    }
    
    toggle.addEventListener('change', function() {
        isHeaterActive = this.checked;
        localStorage.setItem('cursorHeaterEnabled', isHeaterActive);
        
        if (isHeaterActive) {
            heater.style.display = 'block';
        } else {
            heater.style.display = 'none';
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isHeaterActive) {
            // Двигаем визуальный эффект
            heater.style.left = e.clientX + 'px';
            heater.style.top = e.clientY + 'px';
            
            // Топим снег в сетке
            if (snowGrid.length > 0) {
                meltSnowAt(e.clientX, e.clientY, 40); // Радиус таяния
            }
        }
    });
}

function meltSnowAt(mouseX, mouseY, radius) {
    // Переводим координаты мыши в координаты сетки
    const gridX = Math.floor(mouseX / SNOW_BLOCK_SIZE);
    const gridY = Math.floor(mouseY / SNOW_BLOCK_SIZE);
    const gridRadius = Math.floor(radius / SNOW_BLOCK_SIZE);

    // Очищаем квадрат/круг вокруг курсора
    for (let y = gridY - gridRadius; y <= gridY + gridRadius; y++) {
        for (let x = gridX - gridRadius; x <= gridX + gridRadius; x++) {
            if (x >= 0 && x < gridCols && y >= 0 && y < gridRows) {
                // Простая проверка на круг
                const dx = x - gridX;
                const dy = y - gridY;
                if (dx*dx + dy*dy <= gridRadius*gridRadius) {
                    snowGrid[y * gridCols + x] = 0;
                }
            }
        }
    }
}


// --- НОВАЯ ЛОГИКА ИКОНОК ---
function applyIconPack(packName) {
    // Если передан 'auto', вычисляем актуальный пак
    let actualPackName = packName;
    
    if (packName === 'auto') {
        const season = getCurrentSeason();
        actualPackName = season ? season : 'default';
    }

    const pack = iconPacks[actualPackName] || iconPacks['default'];

    document.querySelectorAll('.menu-item').forEach(item => {
        const icon = item.querySelector('i');
        if (icon) {
            const iconType = getIconTypeFromClass(icon.className);
            if (pack[iconType]) {
                icon.className = `fas ${pack[iconType]}`;
            }
        }
    });
    
    document.querySelectorAll('.settings-category-title i, .setting-label i').forEach(icon => {
        const iconType = getIconTypeFromClass(icon.className);
        if (pack[iconType]) {
            icon.className = `fas ${pack[iconType]}`;
        }
    });
    
    document.querySelectorAll('.modal-header i').forEach(icon => {
        const iconType = getIconTypeFromClass(icon.className);
        if (pack[iconType]) {
            icon.className = `fas ${pack[iconType]}`;
        }
    });
    
    const usernameEmoji = document.getElementById('usernameEmoji');
    if (usernameEmoji) {
        usernameEmoji.textContent = pack.usernameEmoji;
    }
    
    // В localStorage сохраняем то, что выбрал пользователь (например, 'auto' или 'halloween')
    localStorage.setItem('iconPack', packName);
}

function getIconTypeFromClass(className) {
    if (className.includes('fa-user')) return 'profile';
    if (className.includes('fa-code')) return 'skills';
    if (className.includes('fa-project-diagram')) return 'projects';
    if (className.includes('fa-terminal')) return 'terminal';
    if (className.includes('fa-trophy')) return 'achievements';
    if (className.includes('fa-cog')) return 'settings';
    if (className.includes('fa-image')) return 'image';
    if (className.includes('fa-fill-drip')) return 'fill';
    return '';
}

function loadAndApplyIconPack() {
    const savedChoice = localStorage.getItem('iconPack');
    
    // Если нет сохраненного выбора, используем автоматический режим
    if (!savedChoice) {
        applyIconPack('auto');
        // Сохраняем автоматический режим как значение по умолчанию
        localStorage.setItem('iconPack', 'auto');
    } else {
        applyIconPack(savedChoice);
    }
}

function initIconPackSettings() {
    const iconPackSelect = document.getElementById('iconPackSelect');
    if (!iconPackSelect) return;
    
    // Загружаем сохраненный выбор или ставим 'auto' по умолчанию
    const savedChoice = localStorage.getItem('iconPack') || 'auto';
    
    // Устанавливаем значение селекта (визуально)
    iconPackSelect.value = savedChoice;
    
    // Применяем пак
    applyIconPack(savedChoice);
    
    // Обработчик изменений
    iconPackSelect.addEventListener('change', function() {
        const selectedChoice = this.value;
        applyIconPack(selectedChoice);
        localStorage.setItem('iconPack', selectedChoice);
        unlockAchievement('icon_pack_changed');
        
        // Показываем уведомление о перезагрузке
        const notification = document.createElement('div');
        notification.className = 'reload-notification';
        notification.innerHTML = `
            <i class="fas fa-sync-alt fa-spin" style="margin-bottom: 10px; font-size: 24px;"></i>
            <div>Тема иконок применена</div>
            <div style="font-size: 0.8em; margin-top: 5px; opacity: 0.8;">Страница перезагрузится через 1 секунду...</div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            location.reload();
        }, 1000);
    });
}

function checkSeasonalTheme() {
    const savedChoice = localStorage.getItem('iconPack') || 'auto';
    
    // Если стоит авто-выбор, проверяем, нужно ли включить снег (для Нового года)
    if (savedChoice === 'auto') {
        const currentSeason = getCurrentSeason();
        
        if (currentSeason === 'newyear') {
            // В Новый год включаем снег, если пользователь явно не отключил его раньше
            if (localStorage.getItem('snowEnabled') === null) {
                const snowToggle = document.getElementById('snowToggle');
                if (snowToggle) snowToggle.checked = true;
                localStorage.setItem('snowEnabled', 'true');
                // Перезагрузка для применения (так как это происходит при загрузке, можно вызвать старт)
                startSnow();
            }
        }
    }
}

// Вспомогательная функция для определения текущего сезона
function getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    const date = now.getDate();
    
    // Хэллоуин: с 24.10 по 07.11
    if ((month === 10 && date >= 24) || (month === 11 && date <= 7)) {
        return 'halloween';
    }
    
    // Новый год: с 25.12 по 08.01
    if ((month === 12 && date >= 25) || (month === 1 && date <= 8)) {
        return 'newyear';
    }
    
    return null;
}


const iconPacks = {
    default: {
        profile: 'fas fa-user',
        skills: 'fas fa-code',
        projects: 'fas fa-project-diagram',
        terminal: 'fas fa-terminal',
        achievements: 'fas fa-trophy',
        settings: 'fas fa-cog',
        palette: 'fas fa-palette',
        image: 'fas fa-image',
        tools: 'fas fa-tools',
        fill: 'fas fa-fill-drip',
        usernameEmoji: ''
    },
    halloween: {
        profile: 'fas fa-ghost',
        skills: 'fas fa-skull',
        projects: 'fas fa-spider',
        terminal: 'fas fa-broom',
        achievements: 'fa-solid fa-crow', 
        settings: 'cobweb-icon',
        image: 'fas fa-bat',
        fill: 'fas fa-fill',
        usernameEmoji: ' 🎃'
    },
    newyear: {
        profile: 'fas fa-snowman',
        skills: 'fas fa-gift',
        projects: 'fas fa-tree',
        terminal: 'fas fa-star',
        achievements: 'fas fa-medal',
        settings: 'fas fa-snowflake',
        image: 'fas fa-snowflake',
        fill: 'fas fa-fill-drip',
        usernameEmoji: ' 🎅'
    }
};


const achievements = [
    {
        id: 'first_visit',
        title: 'Добро пожаловать!',
        description: 'Посетить сайт',
        icon: 'fa-door-open',
        unlocked: false,
        date: null
    },
    {
        id: 'settings_opened',
        title: 'Любопытство',
        description: 'Открыть настройки',
        icon: 'fa-cog',
        unlocked: false,
        date: null
    },
    {
        id: 'theme_changed',
        title: 'Ааа, флешка',
        description: 'Изменить тему на белую',
        icon: 'flash_bank-icon',
        unlocked: false,
        date: null
    },
    {
        id: 'wallpaper_changed',
        title: 'Тут есть фоны?',
        description: 'Сменить фон',
        icon: 'fa-image',
        unlocked: false,
        date: null
    },
    {
        id: 'color_changed',
        title: 'Я дизайнер, я так вижу',
        description: 'Изменить основной цвет',
        icon: 'fa-palette',
        unlocked: false,
        date: null
    },
    {
        id: 'terminal_visited',
        title: 'Командная строка',
        description: 'Посетить терминал',
        icon: 'fa-terminal',
        unlocked: false,
        date: null
    },
    {
        id: 'developer_mode',
        title: 'Режим разработчика',
        description: 'Активировать режим разработчика',
        icon: 'fa-tools',
        unlocked: false,
        date: null
    },
    {
        id: 'icon_pack_changed',
        title: 'Иконки?',
        description: 'Сменить тему иконок',
        icon: 'icons-icon',
        unlocked: false,
        date: null
    },
    {
        id: 'glitch_mode',
        title: 'MATRIX HAS YOU',
        description: 'Активировать глитч-режим',
        icon: 'fa-bug',
        unlocked: false,
        date: null
    }
];

function checkAchievements() {
    const savedAchievements = JSON.parse(localStorage.getItem('achievements')) || achievements;
    

    if (!localStorage.getItem('first_visit')) {
        unlockAchievement('first_visit');
        localStorage.setItem('first_visit', new Date().toISOString());
    }
    

    achievements.forEach(ach => {
        const savedAch = savedAchievements.find(a => a.id === ach.id);
        if (savedAch) {
            ach.unlocked = savedAch.unlocked;
            ach.date = savedAch.date;
        }
    });
    
    renderAchievements();
}

function unlockAchievement(id) {
    const achievement = achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.date = new Date().toISOString();
        localStorage.setItem('achievements', JSON.stringify(achievements));
        

        showAchievementNotification(achievement);
        
        return true;
    }
    return false;
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-notification-content">
            <i class="fas ${achievement.icon}"></i>
            <div>
                <div class="achievement-notification-title">Достижение разблокировано!</div>
                <div class="achievement-notification-name">${achievement.title}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

function renderAchievements() {
    const container = document.getElementById('achievementsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        
        achievementCard.innerHTML = `
            <div class="achievement-icon">
                <i class="fas ${achievement.icon}"></i>
            </div>
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-desc">${achievement.description}</div>
            ${achievement.unlocked ? `<div class="achievement-date">${new Date(achievement.date).toLocaleDateString()}</div>` : ''}
        `;
        
        container.appendChild(achievementCard);
    });
}

function checkAllModalsAchievement() {
    const allModalsOpened = ['profileModal', 'skillsModal', 'projectsModal', 'settingsModal']
        .every(id => localStorage.getItem(`modal_${id}_opened`));
    
    if (allModalsOpened) {
        unlockAchievement('all_modals');
    }
}

// --- ЦИФРОВОЙ GLITCH РЕЖИМ (ОБНОВЛЕННЫЙ) ---

let glitchIntervals = []; // Хранилище для всех таймеров глитча
let glitchAudio = null; // Глобальный объект для звука

function initGlitchMode() {
    const glitchToggle = document.getElementById('glitchToggle');
    if (!glitchToggle) return;

    const glitchEnabled = localStorage.getItem('glitchEnabled') === 'true';
    glitchToggle.checked = glitchEnabled;
    
    if (glitchEnabled) {
        enableGlitchMode();
    }
    
    glitchToggle.addEventListener('change', function() {
        if (this.checked) {
            enableGlitchMode();
            // unlockAchievement('glitch_mode'); // Раскомментируйте, если используете
        } else {
            disableGlitchMode();
        }
        localStorage.setItem('glitchEnabled', this.checked);
    });
}

function playGlitchSounds() {
    // Файл должен быть: assets/music/glitch_noise.mp3
    if (glitchAudio) stopGlitchSounds(); 

    glitchAudio = new Audio('assets/music/glitch_noise.mp3');
    glitchAudio.loop = true;
    glitchAudio.volume = 0.4; // Не слишком громко

    // Пытаемся проиграть звук. Если браузер блокирует, он покажет ошибку в консоли.
    glitchAudio.play().catch(e => console.warn("Не удалось воспроизвести glitch audio, требуется взаимодействие с пользователем.", e));
}

function stopGlitchSounds() {
    // Останавливаем HTML5 Audio
    if (glitchAudio) {
        glitchAudio.pause();
        glitchAudio.currentTime = 0;
        glitchAudio = null;
    }
    
    // Останавливаем Web Audio API
    if (glitchAudioContext) {
        glitchAudioContext.close();
        glitchAudioContext = null;
    }
}

function enableGlitchMode() {
    document.body.classList.add('glitched');
    
    // Создаем слой для цифрового шума
    let pixelNoise = document.querySelector('.pixel-noise');
    if (!pixelNoise) {
        pixelNoise = document.createElement('div');
        pixelNoise.className = 'pixel-noise';
        document.body.appendChild(pixelNoise);
    }
    
    // Включаем эффекты на тексте
    document.querySelectorAll('.username, .menu-item span, .modal-header h3, .project-title').forEach(element => {
        const text = element.textContent;
        element.classList.add('glitched-text');
        element.setAttribute('data-text', text);
    });
    
    // Запускаем генераторы хаоса
    startDigitalChaos();
    
    // Звук
    playGlitchSounds();
}

function disableGlitchMode() {
    document.body.classList.remove('glitched');
    
    // Удаляем шум
    const pixelNoise = document.querySelector('.pixel-noise');
    if (pixelNoise) pixelNoise.remove();
    
    // Удаляем битые сектора, если остались
    document.querySelectorAll('.glitch-block-artifact').forEach(el => el.remove());
    
    // Чистим текст
    document.querySelectorAll('.glitched-text').forEach(element => {
        element.classList.remove('glitched-text');
        element.removeAttribute('data-text');
        // Восстанавливаем оригинальный текст если он был искажен
        if (element.dataset.originalText) {
             element.textContent = element.dataset.originalText;
             delete element.dataset.originalText;
        }
    });
    
    // Останавливаем все эффекты и звуки
    stopDigitalChaos();
    stopGlitchSounds();
    stopRandomGlitches();
    cleanupGlitchMode();
}

function startDigitalChaos() {
    // 1. Генерация битых секторов (квадратов)
    glitchIntervals.push(setInterval(() => {
        if (Math.random() > 0.3) spawnGlitchBlock(); // 70% шанс спавна блока
    }, 150));

    // 2. Искажение текста (Text Corruption)
    glitchIntervals.push(setInterval(() => {
        if (Math.random() > 0.7) corruptRandomText();
    }, 500));
    
    // 3. Резкие сдвиги контента
    glitchIntervals.push(setInterval(() => {
        if (Math.random() > 0.95) { // Редко
            const container = document.querySelector('.container');
            if(container) {
                const originalTransform = container.style.transform;
                const shiftX = (Math.random() - 0.5) * 10 + 'px'; // Сильный сдвиг
                container.style.transform = `translateX(${shiftX})`;
                
                // Возвращаем на место мгновенно (эффект пропущенного кадра)
                setTimeout(() => {
                     container.style.transform = originalTransform;
                }, 50);
            }
        }
    }, 2000));
}

function stopDigitalChaos() {
    glitchIntervals.forEach(interval => clearInterval(interval));
    glitchIntervals = [];
}

// Создает визуальный артефакт "Битый сектор"
function spawnGlitchBlock() {
    const block = document.createElement('div');
    block.className = 'glitch-block-artifact';
    
    // Случайные размеры и позиция
    const width = Math.floor(Math.random() * 200) + 20;
    const height = Math.floor(Math.random() * 50) + 5;
    const top = Math.floor(Math.random() * 100);
    const left = Math.floor(Math.random() * 100);
    
    block.style.width = width + 'px';
    block.style.height = height + 'px';
    block.style.top = top + '%';
    block.style.left = left + '%';
    
    // 90% шанс, что блок будет ядрено-зеленым (цвет по умолчанию из CSS)
    // 10% шанс на другой, более "жесткий" цвет.
    if (Math.random() > 0.9) {
        const colors = ['#ff00c1', '#00fff9', '#ffff00', '#000000', '#ffffff'];
        block.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        block.style.mixBlendMode = 'normal';
    } else {
        // Оставляем цвет по умолчанию (#39FF14) и режим exclusion из CSS
    }

    document.body.appendChild(block);
    
    // Удаляем блок очень быстро
    setTimeout(() => {
        block.remove();
    }, Math.random() * 200 + 50);
}

// Временно заменяет текст на "мусор"
function corruptRandomText() {
    const elements = document.querySelectorAll('.glitched-text');
    if (elements.length === 0) return;
    
    const target = elements[Math.floor(Math.random() * elements.length)];
    const originalText = target.textContent;
    
    // Сохраняем оригинал, если еще не сохранен
    if (!target.dataset.originalText) {
        target.dataset.originalText = originalText;
    }
    
    // Генерируем мусор
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*<>[]{}";
    let corrupted = "";
    for(let i=0; i < originalText.length; i++) {
        corrupted += (Math.random() > 0.5) ? chars[Math.floor(Math.random() * chars.length)] : originalText[i];
    }
    
    target.textContent = corrupted;
    
    // Восстанавливаем очень быстро
    setTimeout(() => {
        target.textContent = originalText;
    }, 100);
}

function resetAllElementsStyles() {
    // Сбрасываем стили всех элементов, которые могли быть затронуты
    const affectedElements = document.querySelectorAll(
        '.container, .menu-sidebar, .modal-content, .social-icon, .avatar, .quote-container'
    );
    
    affectedElements.forEach(el => {
        el.style.transform = '';
        el.style.opacity = '';
        el.style.animation = '';
        el.style.filter = '';
        el.style.transition = '';
    });
    
    // Сбрасываем основной цвет
    const savedColor = localStorage.getItem('primaryColor') || '42, 171, 238';
    document.documentElement.style.setProperty('--primary-color', savedColor);
    
    // Принудительно перерисовываем страницу
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
}

let glitchInterval;

function startRandomGlitches() {
    glitchInterval = setInterval(() => {
        // Случайное подрагивание элементов
        const elements = document.querySelectorAll('.container, .modal-content, .social-icon');
        elements.forEach(el => {
            if (Math.random() > 0.7) {
                el.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                
                // Временное исчезновение
                if (Math.random() > 0.9) {
                    el.style.opacity = '0.3';
                    setTimeout(() => {
                        el.style.opacity = '1';
                    }, 100);
                }
            }
        });
        
        // Случайное изменение цвета
        if (Math.random() > 0.8) {
            document.documentElement.style.setProperty('--primary-color', 
                `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`);
            setTimeout(() => {
                const savedColor = localStorage.getItem('primaryColor') || '42, 171, 238';
                document.documentElement.style.setProperty('--primary-color', savedColor);
            }, 200);
        }
        
    }, 300);
}

function stopRandomGlitches() {
    if (glitchInterval) {
        clearInterval(glitchInterval);
        glitchInterval = null;
    }
    
    // Возвращаем элементы в нормальное состояние
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        el.style.transform = '';
        el.style.opacity = '';
        el.style.animation = '';
        el.style.filter = '';
    });
}

// Звуковые эффекты (опционально)
let glitchAudioContext;


function cleanupGlitchMode() {
    // Останавливаем все интервалы
    if (glitchInterval) {
        clearInterval(glitchInterval);
        glitchInterval = null;
    }
    
    // Удаляем все добавленные элементы
    document.querySelectorAll('.scan-line, .pixel-noise').forEach(el => el.remove());
    
    // Сбрасываем все стили
    resetAllElementsStyles();
    
    // Убираем классы глитча
    document.body.classList.remove('glitched');
    document.querySelectorAll('.glitched-text').forEach(el => {
        el.classList.remove('glitched-text');
        el.removeAttribute('data-text');
    });
    
    // Останавливаем звуки
    stopGlitchSounds();
}

// Логика шрифта Брайля
const brailleMap = {
    // Русский
    'а': '⠁', 'б': '⠃', 'в': '⠺', 'г': '⠛', 'д': '⠙', 'е': '⠑', 'ё': '⠡',
    'ж': '⠚', 'з': '⠵', 'и': '⠊', 'й': '⠯', 'к': '⠅', 'л': '⠇', 'м': '⠍',
    'н': '⠝', 'о': '⠕', 'п': '⠏', 'р': '⠗', 'с': '⠎', 'т': '⠞', 'у': '⠥',
    'ф': '⠋', 'х': '⠓', 'ц': '⠉', 'ч': '⠟', 'ш': '⠱', 'щ': '⠭', 'ъ': '⠷',
    'ы': '⠮', 'ь': '⠾', 'э': '⠪', 'ю': '⠳', 'я': '⠫',
    // Английский
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
    'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
    'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
    'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
    // Цифры (упрощенно, без цифрового знака для интерфейса)
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', 
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
    // Символы
    ' ': ' ', '.': '⠲', ',': '⠂', '!': '⠖', '?': '⠦', '-': '⠤'
};

function initBrailleMode() {
    const brailleToggle = document.getElementById('brailleToggle');
    if (!brailleToggle) return;

    const brailleEnabled = localStorage.getItem('brailleEnabled') === 'true';
    brailleToggle.checked = brailleEnabled;

    if (brailleEnabled) {
        enableBrailleMode();
    }

    brailleToggle.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('brailleEnabled', 'true');
            enableBrailleMode();
            unlockAchievement('developer_mode');
        } else {
            localStorage.setItem('brailleEnabled', 'false');
            // Для корректного возврата текста проще всего перезагрузить страницу,
            // так как мы меняем текстовые узлы напрямую
            location.reload();
        }
    });
}

function enableBrailleMode() {
    document.body.classList.add('braille-active');
    
    // Рекурсивная функция для обхода всех текстовых узлов
    function traverseAndTranslate(node) {
        if (node.nodeType === 3) { // Text node
            // Пропускаем пустые узлы и скрипты
            if (node.nodeValue.trim() !== '' && node.parentNode.tagName !== 'SCRIPT' && node.parentNode.tagName !== 'STYLE') {
                node.nodeValue = translateTextToBraille(node.nodeValue);
            }
        } else {
            for (let i = 0; i < node.childNodes.length; i++) {
                traverseAndTranslate(node.childNodes[i]);
            }
        }
    }

    traverseAndTranslate(document.body);
}

function translateTextToBraille(text) {
    return text.split('').map(char => {
        const lowerChar = char.toLowerCase();
        return brailleMap[lowerChar] || char;
    }).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    updateAgeDisplay();
    updateQuote();
    initColorSettings();
    initWallpaperSettings();
    checkAchievements();
    checkExistingDeveloperSection();
    initSnowSettings(); 
    
    // Автоматически применяем иконки в зависимости от даты при первой загрузке
    loadAndApplyIconPack();
    
    // Инициализируем настройки иконок (для селекта в настройках)
    initIconPackSettings();
    
    checkSeasonalTheme();
    
    const savedWallpaper = localStorage.getItem('wallpaper') || 'background.jpg';
    document.body.style.backgroundImage = `url('assets/background/${savedWallpaper}')`;
    
    document.getElementById('profileLink').addEventListener('click', function() {
        window.open('https://t.me/dont65', '_blank');
    });
});

document.getElementById('refreshQuoteBtn').addEventListener('click', function() {
    updateQuote();
   
    this.classList.add('rotating');
    setTimeout(() => {
        this.classList.remove('rotating');
    }, 1000);
});
