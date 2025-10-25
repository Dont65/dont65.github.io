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
    const savedWallpaper = localStorage.getItem('assets/wallpaper') || 'background.jpg';

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


let snowInterval = null;
let snowflakes = [];

function startSnow() {
    const snowContainer = document.getElementById('snowContainer');
    if (!snowContainer) return;
    

    stopSnow();
    

    const snowflakeCount = 100; 
    
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }
    

    snowInterval = setInterval(() => {
        moveSnowflakes();
    }, 50);
}

function stopSnow() {
    if (snowInterval) {
        clearInterval(snowInterval);
        snowInterval = null;
    }
    
    const snowContainer = document.getElementById('snowContainer');
    if (snowContainer) {
        snowContainer.innerHTML = '';
    }
    
    snowflakes = [];
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    

    const size = Math.random() * 15 + 10;
    snowflake.style.fontSize = `${size}px`;
    

    const startX = Math.random() * window.innerWidth;
    snowflake.style.left = `${startX}px`;
    snowflake.style.top = `-20px`;
    

    const speed = Math.random() * 3 + 2;
    const sway = Math.random() * 2 - 1;
    
    document.getElementById('snowContainer').appendChild(snowflake);
    
    snowflakes.push({
        element: snowflake,
        x: startX,
        y: -20,
        speed: speed,
        sway: sway,
        swayDirection: Math.random() > 0.5 ? 1 : -1
    });
}

function moveSnowflakes() {
    const container = document.getElementById('snowContainer');
    if (!container) return;
    
    for (let i = snowflakes.length - 1; i >= 0; i--) {
        const snowflake = snowflakes[i];
        
   
        snowflake.y += snowflake.speed;
        

        snowflake.x += snowflake.sway * snowflake.swayDirection;
        snowflake.swayDirection *= Math.random() > 0.99 ? -1 : 1;
        

        if (snowflake.y > window.innerHeight) {
            container.removeChild(snowflake.element);
            snowflakes.splice(i, 1);
            createSnowflake();
        } else {

            snowflake.element.style.transform = `translate(${snowflake.x}px, ${snowflake.y}px)`;
        }
    }
}

function initSnowSettings() {
    const snowToggle = document.getElementById('snowToggle');
    if (!snowToggle) return;
    

    const snowEnabled = localStorage.getItem('snowEnabled') === 'true';
    snowToggle.checked = snowEnabled;
    
    if (snowEnabled) {
        startSnow();
    }
    
    snowToggle.addEventListener('change', function() {
        if (this.checked) {
            startSnow();
        } else {
            stopSnow();
        }
        localStorage.setItem('snowEnabled', this.checked);
    });
}


function applyIconPack(packName) {
    const pack = iconPacks[packName];
    

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

function initIconPackSettings() {
    const iconPackSelect = document.getElementById('iconPackSelect');
    if (!iconPackSelect) return;
    
    // Проверяем, активирован ли режим разработчика
    const isDeveloperMode = localStorage.getItem('developerSectionActivated') === 'true';
    
    if (isDeveloperMode) {
        // В режиме разработчика используем сохраненную тему
        const savedIconPack = localStorage.getItem('iconPack') || 'default';
        iconPackSelect.value = savedIconPack;
        applyIconPack(savedIconPack);
    } else {
        // В обычном режиме проверяем сезонную тему
        const currentSeason = getCurrentSeason();
        if (currentSeason) {
            applyIconPack(currentSeason);
        } else {
            const savedIconPack = localStorage.getItem('iconPack') || 'default';
            applyIconPack(savedIconPack);
        }
    }
    
    iconPackSelect.addEventListener('change', function() {
        const selectedPack = this.value;
        applyIconPack(selectedPack);
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
        
        // Перезагружаем страницу через 1 секунду
        setTimeout(() => {
            location.reload();
        }, 1000);
    });
}

// Также обновляем функцию checkSeasonalTheme
function checkSeasonalTheme() {
    // Проверяем, активирован ли режим разработчика
    const isDeveloperMode = localStorage.getItem('developerSectionActivated') === 'true';
    
    // Если режим разработчика активирован, не применяем сезонные темы
    if (isDeveloperMode) return;
    
    const currentSeason = getCurrentSeason();
    
    if (currentSeason === 'halloween') {
        applyIconPack('halloween');
        if (localStorage.getItem('snowEnabled') !== 'true') {
            stopSnow();
        }
    } else if (currentSeason === 'newyear') {
        applyIconPack('newyear');
        startSnow();
        localStorage.setItem('snowEnabled', 'true');
        const snowToggle = document.getElementById('snowToggle');
        if (snowToggle) {
            snowToggle.checked = true;
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
        settings: 'candy-icon',
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
        icon: 'fa-sun',
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
        title: 'Смена облика',
        description: 'Сменить тему иконок',
        icon: 'fa-paint-brush',
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

document.addEventListener('DOMContentLoaded', function() {
    updateAgeDisplay();
    updateQuote();
    initColorSettings();
    initWallpaperSettings();
    checkAchievements();
    checkExistingDeveloperSection();
    initSnowSettings();
    
    // Проверяем и применяем сезонную тему
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